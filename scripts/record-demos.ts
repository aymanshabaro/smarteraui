/**
 * Records the hero product video for the Proper UI landing page: a real Claude Code session
 * building a production page with Proper UI, not the landing page itself and not any other AI
 * platform. Muted autoplay, no voice, Apple-style (slow push-in zoom, crossfades, short title
 * cards).
 *
 * The session comes from a real, separately-run transcript, not anything this script drives
 * itself (nested `claude` runs hang from inside this repo's own session). The owner runs, in a
 * scratch Next.js app that already has Proper UI installed:
 *
 *   cd ~/properui-demo && claude -p "<OWNER_PROMPT below>" --output-format stream-json --verbose \
 *     --dangerously-skip-permissions > claude-demo-transcript.jsonl
 *
 * This script then:
 *   1. reads that transcript (scripts/demo/transcript.ts) and replays it, time-compressed, in
 *      Claude Code's own terminal style;
 *   2. builds and starts the scratch app and records the actual page Claude built.
 *
 * Flags:
 *   --transcript <path>   default ~/properui-demo/claude-demo-transcript.jsonl
 *   --demo-dir <path>     default ~/properui-demo
 *   --fixture             use the bundled synthetic transcript (scripts/demo/fixture-transcript.
 *                          jsonl) instead of a real one, and skip building/recording the real
 *                          result page (there isn't one) in favor of a placeholder title card —
 *                          for testing this pipeline end to end without a real session.
 *   --no-post              skip the ffmpeg post-production pass (raw clips only)
 *   --help                 print this usage and exit
 *
 * Six segments, crossfaded 0.5s into each other, assembled at 1280x800 30fps:
 *   1. Title card: "One prompt. Claude Code. Proper UI." (1.2s)
 *   2. A local dark-terminal HTML page (no fake app chrome beyond the window dots) typing
 *      `$ cd ~/properui-demo`, `$ claude`, then the real owner prompt at the `>` prompt, at
 *      ~35ms/char.
 *   3. The transcript replayed in Claude Code's own terminal style (assistant text as plain
 *      lines, tool calls as `⏺ Bash(...)` etc. with their first result line(s) beneath, dimmed,
 *      long results collapsed to a trailing "+N lines" line), time-compressed to about 18s with
 *      a slow push-in zoom toward the newest line. No title card between this and clip 2.
 *   4. Title card: "Built. Now look at it." (1.0s)
 *   5. The real result: `cd <demo-dir> && pnpm build && pnpm start -p 3300`, then a slow scroll
 *      of http://localhost:3300/settings/billing top to bottom with the cursor hovering a button
 *      or two, ending on the cancel-subscription confirmation dialog if one exists (found by
 *      role; skipped gracefully if not). The server is stopped afterward. In `--fixture` mode, or
 *      if the build/server/page don't cooperate, this becomes a placeholder title card instead
 *      ("Result clip pending the real session") with a loud console warning, so the pipeline
 *      still assembles end to end.
 *   6. End card: "properui.dev" / "Open source. MIT. Works with Claude Code, Codex, Cursor and
 *      Lovable." (1.5s)
 *
 * ffmpeg: this machine has two builds. /Users/aymanshabaro/opt/anaconda3/bin/ffmpeg (4.3) has no
 * libx264 and no libvpx/libvpx-vp9 — verified via `-encoders` while writing this script. /opt/
 * homebrew/bin/ffmpeg (7.1.1, also verified) has both, so it's preferred when present: real
 * libx264 (crf 26, preset slow) for hero.mp4, and libvpx-vp9 for hero.webm. If only the Anaconda
 * build (or none) is found, hero.mp4 falls back to h264_videotoolbox/libopenh264 with a
 * dynamically chosen bitrate (neither supports -crf) and hero.webm is skipped with a console
 * warning rather than producing a broken file — re-run on a machine with a libvpx-enabled ffmpeg
 * to get it.
 */
import { type ChildProcess, execFileSync, spawn, spawnSync } from "node:child_process";
import { existsSync, mkdirSync, mkdtempSync, readFileSync, renameSync, statSync, writeFileSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { type Browser, type Locator, type Page, chromium } from "playwright";
import { OUT_SIZE, RECORD_SIZE, endCardHtml, replayHtml, terminalIntroHtml, titleCardHtml } from "./demo/templates";
import { type ReplayLine, parseTranscript } from "./demo/transcript";

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.resolve(process.env.OUT_DIR ?? "apps/docs/public/demo/hero");
const FIXTURE_TRANSCRIPT = path.join(SCRIPT_DIR, "demo", "fixture-transcript.jsonl");
const DEFAULT_TRANSCRIPT = path.join(os.homedir(), "properui-demo", "claude-demo-transcript.jsonl");
const DEFAULT_DEMO_DIR = path.join(os.homedir(), "properui-demo");

const HOMEBREW_FFMPEG_CANDIDATES = ["/opt/homebrew/bin/ffmpeg", "/usr/local/bin/ffmpeg"];
const ANACONDA_FFMPEG = "/Users/aymanshabaro/opt/anaconda3/bin/ffmpeg";

function resolveFfmpeg(): string {
    for (const candidate of HOMEBREW_FFMPEG_CANDIDATES) if (existsSync(candidate)) return candidate;
    if (existsSync(ANACONDA_FFMPEG)) return ANACONDA_FFMPEG;
    return "ffmpeg";
}
function resolveFfprobe(ffmpegPath: string): string {
    const candidate = path.join(path.dirname(ffmpegPath), "ffprobe");
    return ffmpegPath !== "ffmpeg" && existsSync(candidate) ? candidate : "ffprobe";
}
const FFMPEG = resolveFfmpeg();
const FFPROBE = resolveFfprobe(FFMPEG);

const FPS = 30;
const XFADE_OVERLAP = 0.5;
const TARGET_MAX_BYTES = 5 * 1024 * 1024;

const TITLE_1 = "One prompt. Claude Code. Proper UI.";
const TITLE_1_DURATION = 1.2;
const TITLE_2 = "Built. Now look at it.";
const TITLE_2_DURATION = 1.0;
const END_TITLE = "properui.dev";
const END_SUBTITLE = "Open source. MIT. Works with Claude Code, Codex, Cursor and Lovable.";
const END_DURATION = 1.5;
const PLACEHOLDER_RESULT_TEXT = "Result clip pending the real session";
const PLACEHOLDER_RESULT_DURATION = 2.5;

const CHAR_DELAY_MS = 35;
// The exact prompt the owner runs against the scratch app (see this file's header). Not read from
// the transcript: `claude -p "<prompt>"` doesn't echo the prompt back as a stream-json event, it's
// the input, so this has to be the known invocation rather than something parsed out.
const OWNER_PROMPT =
    "Build a billing settings page at /settings/billing: current plan with usage, payment method on file, an invoice history table, and a cancel-subscription confirmation dialog. Use Proper UI components only, keep it production quality, then run next build.";

const REPLAY_TARGET_SECONDS = 18;
const REPLAY_LINE_MIN_MS = 350;
const REPLAY_LINE_MAX_MS = 1400;

const RESULT_URL = "http://localhost:3300/settings/billing";
const RESULT_PORT = 3300;

// ---------------------------------------------------------------------------------------------
// CLI args
// ---------------------------------------------------------------------------------------------

function printHelp() {
    console.log(`Usage: tsx scripts/record-demos.ts [--transcript <path>] [--demo-dir <path>] [--fixture] [--no-post] [--help]

  --transcript <path>  default ${DEFAULT_TRANSCRIPT}
  --demo-dir <path>    default ${DEFAULT_DEMO_DIR}
  --fixture            use the bundled synthetic transcript and a placeholder result clip
  --no-post            skip the ffmpeg post-production pass (raw clips only)

Env: OUT_DIR (default apps/docs/public/demo/hero)`);
}

function expandHome(p: string): string {
    const home = os.homedir();
    if (p === "~") return home;
    if (p.startsWith("~/")) return path.join(home, p.slice(2));
    return p;
}

type Args = { noPost: boolean; fixture: boolean; transcriptPath: string; demoDir: string };

function parseArgs(argv: string[]): Args {
    let noPost = false;
    let fixture = false;
    let transcriptPath = DEFAULT_TRANSCRIPT;
    let demoDir = DEFAULT_DEMO_DIR;
    for (let i = 0; i < argv.length; i++) {
        const arg = argv[i]!;
        if (arg === "--help" || arg === "-h") {
            printHelp();
            process.exit(0);
        } else if (arg === "--no-post") {
            noPost = true;
        } else if (arg === "--fixture") {
            fixture = true;
        } else if (arg === "--transcript") {
            const value = argv[++i];
            if (!value) throw new Error("--transcript requires a path");
            transcriptPath = value;
        } else if (arg.startsWith("--transcript=")) {
            transcriptPath = arg.slice("--transcript=".length);
        } else if (arg === "--demo-dir") {
            const value = argv[++i];
            if (!value) throw new Error("--demo-dir requires a path");
            demoDir = value;
        } else if (arg.startsWith("--demo-dir=")) {
            demoDir = arg.slice("--demo-dir=".length);
        } else {
            throw new Error(`Unknown argument "${arg}". Run with --help for usage.`);
        }
    }
    return { noPost, fixture, transcriptPath: path.resolve(expandHome(transcriptPath)), demoDir: path.resolve(expandHome(demoDir)) };
}

// ---------------------------------------------------------------------------------------------
// Cursor overlay (reused for the result clip's hovers and its confirm-dialog click)
// ---------------------------------------------------------------------------------------------

type PuiCursorWindow = Window & {
    __puiCursorMove: (x: number, y: number, d: number) => Promise<void>;
    __puiCursorClick: (x: number, y: number) => Promise<void>;
};

const installCursor = () => {
    if (document.getElementById("__pui_cursor")) return;
    const style = document.createElement("style");
    style.textContent = [
        "#__pui_cursor{position:fixed;left:-100px;top:-100px;width:18px;height:18px;margin:-9px 0 0 -9px;border-radius:50%;background:#0c0e12;box-shadow:0 0 0 3px rgba(127,86,217,.35),0 2px 8px rgba(0,0,0,.35);pointer-events:none;z-index:2147483647;}",
        ".__pui_ripple{position:fixed;width:18px;height:18px;margin:-9px 0 0 -9px;border-radius:50%;border:2px solid #7f56d9;pointer-events:none;z-index:2147483646;}",
    ].join("\n");
    document.head.appendChild(style);
    const cursor = document.createElement("div");
    cursor.id = "__pui_cursor";
    document.body.appendChild(cursor);

    (window as unknown as PuiCursorWindow).__puiCursorMove = (x: number, y: number, duration: number) => {
        const startX = parseFloat(cursor.style.left) || x;
        const startY = parseFloat(cursor.style.top) || y;
        const anim = cursor.animate(
            [
                { left: `${startX}px`, top: `${startY}px` },
                { left: `${x}px`, top: `${y}px` },
            ],
            { duration, easing: "cubic-bezier(.22,.61,.36,1)", fill: "forwards" },
        );
        cursor.style.left = `${x}px`;
        cursor.style.top = `${y}px`;
        return anim.finished.then(() => undefined);
    };
    (window as unknown as PuiCursorWindow).__puiCursorClick = (x: number, y: number) => {
        const ripple = document.createElement("div");
        ripple.className = "__pui_ripple";
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        document.body.appendChild(ripple);
        const anim = ripple.animate(
            [
                { transform: "scale(1)", opacity: "0.9" },
                { transform: "scale(2.4)", opacity: "0" },
            ],
            {
                duration: 380,
                easing: "ease-out",
            },
        );
        return anim.finished.then(() => ripple.remove());
    };
};

/**
 * Environment for processes spawned inside the demo app. When this script itself runs under
 * `pnpm exec`, pnpm leaves `npm_config_*` / `PNPM_*` / `INIT_CWD` in the environment; a nested
 * pnpm in another project then believes it is inside this monorepo's workspace and fails with
 * "packages field missing or empty". Strip those, and go through `corepack pnpm` so the demo app's
 * own `packageManager` version is used rather than whichever pnpm is first on this repo's PATH.
 */
const demoEnv = (): NodeJS.ProcessEnv => Object.fromEntries(Object.entries(process.env).filter(([key]) => !/^(npm_|PNPM_|INIT_CWD$|NODE_OPTIONS$)/.test(key)));

async function installCursorOn(page: Page) {
    await page.evaluate(installCursor);
}

async function moveAndClick(page: Page, locator: Locator, opts: { duration?: number } = {}): Promise<{ x: number; y: number } | null> {
    const duration = opts.duration ?? 450;
    await installCursorOn(page);
    const box = await locator.boundingBox();
    if (!box) return null;
    const x = box.x + box.width / 2;
    const y = box.y + box.height / 2;
    await page.evaluate(([px, py, d]) => (window as unknown as PuiCursorWindow).__puiCursorMove(px, py, d), [x, y, duration] as const);
    await page.evaluate(([px, py]) => (window as unknown as PuiCursorWindow).__puiCursorClick(px, py), [x, y] as const);
    await locator.click().catch(() => undefined);
    return { x, y };
}

async function hoverWithCursor(page: Page, locator: Locator, duration = 400): Promise<{ x: number; y: number } | null> {
    await installCursorOn(page);
    const box = await locator.boundingBox();
    if (!box) return null;
    const x = box.x + box.width / 2;
    const y = box.y + box.height / 2;
    await page.evaluate(([px, py, d]) => (window as unknown as PuiCursorWindow).__puiCursorMove(px, py, d), [x, y, duration] as const);
    await locator.hover().catch(() => undefined);
    return { x, y };
}

const clamp01 = (n: number) => Math.min(1, Math.max(0, n));
const toFileUrl = (p: string) => `file://${p}`;
const shortenHome = (p: string) => {
    const home = os.homedir();
    return p === home ? "~" : p.startsWith(home + path.sep) ? `~${p.slice(home.length)}` : p;
};

// ---------------------------------------------------------------------------------------------
// Transcript replay timing
// ---------------------------------------------------------------------------------------------

type TimedLine = { text: string; dim: boolean; ms: number };

/** Scales every line's nominal (length-based) reading time so the whole replay lands around
 *  REPLAY_TARGET_SECONDS regardless of how many lines the real transcript has, then clamps each
 *  line individually to [REPLAY_LINE_MIN_MS, REPLAY_LINE_MAX_MS] so no single line flashes by
 *  unreadably fast or lingers too long. */
function computeReplayTimings(lines: ReplayLine[]): TimedLine[] {
    const nominal = lines.map((l) => 300 + l.text.length * 15);
    const totalNominal = nominal.reduce((a, b) => a + b, 0) || 1;
    const scale = (REPLAY_TARGET_SECONDS * 1000) / totalNominal;
    return lines.map((l, i) => ({
        text: l.text,
        dim: l.dim,
        ms: Math.min(REPLAY_LINE_MAX_MS, Math.max(REPLAY_LINE_MIN_MS, Math.round(nominal[i]! * scale))),
    }));
}

// ---------------------------------------------------------------------------------------------
// ffmpeg helpers
// ---------------------------------------------------------------------------------------------

function runFfmpeg(args: string[]) {
    const result = spawnSync(FFMPEG, ["-y", "-hide_banner", "-loglevel", "error", ...args], { encoding: "utf8" });
    if (result.status !== 0) throw new Error(`ffmpeg failed (args: ${args.join(" ")})\n${result.stderr}`);
}

function probeDuration(file: string): number {
    const out = execFileSync(FFPROBE, ["-v", "error", "-show_entries", "format=duration", "-of", "default=noprint_wrappers=1:nokey=1", file], {
        encoding: "utf8",
    });
    const value = Number.parseFloat(out.trim());
    return Number.isFinite(value) ? value : 0;
}

let encoderListCache: string | null = null;
function hasEncoder(name: string): boolean {
    if (encoderListCache === null) encoderListCache = spawnSync(FFMPEG, ["-hide_banner", "-encoders"], { encoding: "utf8" }).stdout ?? "";
    return new RegExp(`\\b${name}\\b`).test(encoderListCache);
}

function pickH264Encoder(): { name: string; args: string[]; degraded: boolean } {
    if (hasEncoder("libx264")) return { name: "libx264", args: ["-preset", "slow", "-crf", "26"], degraded: false };
    if (hasEncoder("h264_videotoolbox")) return { name: "h264_videotoolbox", args: [], degraded: true };
    if (hasEncoder("libopenh264")) return { name: "libopenh264", args: [], degraded: true };
    throw new Error("No usable H.264 encoder found in this ffmpeg build (checked libx264, h264_videotoolbox, libopenh264).");
}

function pickVp9Encoder(): { name: string; args: string[] } | null {
    if (hasEncoder("libvpx-vp9")) return { name: "libvpx-vp9", args: ["-crf", "34", "-b:v", "0"] };
    if (hasEncoder("libvpx")) return { name: "libvpx", args: ["-crf", "10", "-b:v", "1M"] };
    return null;
}

/** zoompan pushing 1.0 -> 1.08 over the whole clip, centred on the given focal point (0-1
 *  fraction of frame width/height). `d=1` advances one input frame per output frame so the
 *  source motion keeps playing instead of freezing on a single frame — which only produces the
 *  requested duration if the input truly has `FPS` frames per second of content, so an explicit
 *  `fps=FPS` filter runs first to normalize Playwright's own (often lower/variable) recording
 *  rate; without it zoompan simply runs out of input frames early and the clip comes out short
 *  (verified while building this script: a 12.3s raw recording produced a 10.2s zoompan'd clip
 *  before this filter was added). */
function zoompanFilter(fx: number, fy: number, durationSec: number): string {
    const frames = Math.max(1, Math.round(durationSec * FPS));
    const inc = 0.08 / frames;
    const z = `min(zoom+${inc.toFixed(6)},1.08)`;
    const x = `(iw-iw/zoom)*${fx.toFixed(4)}`;
    const y = `(ih-ih/zoom)*${fy.toFixed(4)}`;
    return `fps=${FPS},zoompan=z='${z}':x='${x}':y='${y}':d=1:s=${OUT_SIZE.width}x${OUT_SIZE.height}:fps=${FPS}`;
}

function encodeSegment(inputArgs: string[], filter: string | null, durationSec: number, encoder: { name: string; args: string[] }, outPath: string) {
    const args = [...inputArgs];
    if (filter) args.push("-vf", filter);
    args.push("-t", durationSec.toFixed(3), "-an", "-pix_fmt", "yuv420p", "-c:v", encoder.name, ...encoder.args, outPath);
    runFfmpeg(args);
}

function buildXfadeChain(durations: number[]): string {
    let cumulative = durations[0]!;
    let last = "[0:v]";
    const parts: string[] = [];
    for (let i = 1; i < durations.length; i++) {
        const offset = Math.max(0, cumulative - XFADE_OVERLAP);
        const outLabel = i === durations.length - 1 ? "[vout]" : `[vx${i}]`;
        parts.push(`${last}[${i}:v]xfade=transition=fade:duration=${XFADE_OVERLAP}:offset=${offset.toFixed(3)}${outLabel}`);
        last = outLabel;
        cumulative = cumulative + durations[i]! - XFADE_OVERLAP;
    }
    return parts.join(";");
}

function concatWithXfade(segments: string[], durations: number[], encoder: { name: string; args: string[] }, outPath: string) {
    const inputArgs = segments.flatMap((s) => ["-i", s]);
    const chain = buildXfadeChain(durations);
    runFfmpeg([
        ...inputArgs,
        "-filter_complex",
        chain,
        "-map",
        "[vout]",
        "-an",
        "-pix_fmt",
        "yuv420p",
        "-c:v",
        encoder.name,
        ...encoder.args,
        "-movflags",
        "+faststart",
        outPath,
    ]);
}

function concatPlain(segments: string[], tmpDir: string, encoder: { name: string; args: string[] }, outPath: string) {
    const listFile = path.join(tmpDir, "concat-list.txt");
    writeFileSync(listFile, segments.map((s) => `file '${s.replace(/'/g, "'\\''")}'`).join("\n"), "utf8");
    runFfmpeg([
        "-f",
        "concat",
        "-safe",
        "0",
        "-i",
        listFile,
        "-an",
        "-pix_fmt",
        "yuv420p",
        "-c:v",
        encoder.name,
        ...encoder.args,
        "-movflags",
        "+faststart",
        outPath,
    ]);
}

// ---------------------------------------------------------------------------------------------
// Playwright: rendering title cards and recording the two terminal-style clips
// ---------------------------------------------------------------------------------------------

async function renderCardPng(browser: Browser, html: string, outPath: string, tmpDir: string) {
    const context = await browser.newContext({ viewport: OUT_SIZE, deviceScaleFactor: 1 });
    const page = await context.newPage();
    try {
        const file = path.join(tmpDir, `card-${Math.random().toString(36).slice(2)}.html`);
        writeFileSync(file, html, "utf8");
        await page.goto(toFileUrl(file));
        await page.evaluate(() => document.fonts.ready);
        await page.screenshot({ path: outPath });
    } finally {
        await context.close();
    }
}

async function recordLocalHtmlClip(browser: Browser, rawDir: string, tmpDir: string, name: string, html: string, run: (page: Page) => Promise<void>) {
    const context = await browser.newContext({ viewport: RECORD_SIZE, deviceScaleFactor: 1, recordVideo: { dir: rawDir, size: RECORD_SIZE } });
    const page = await context.newPage();
    const file = path.join(tmpDir, `${name}.html`);
    writeFileSync(file, html, "utf8");
    await page.goto(toFileUrl(file));
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(200);
    await run(page);
    const video = page.video();
    await page.close();
    await context.close();
    if (!video) throw new Error(`${name}: Playwright produced no video`);
    const tmpPath = await video.path();
    const outPath = path.join(rawDir, `${name}.webm`);
    renameSync(tmpPath, outPath);
    return { file: outPath, duration: probeDuration(outPath) };
}

// ---------------------------------------------------------------------------------------------
// The result clip: build + start the scratch app, record the real page it produced
// ---------------------------------------------------------------------------------------------

async function waitForServer(url: string, timeoutMs: number): Promise<void> {
    const start = Date.now();
    while (Date.now() - start < timeoutMs) {
        try {
            const res = await fetch(url, { signal: AbortSignal.timeout(2000) });
            if (res.status < 500) return;
        } catch {
            // not up yet
        }
        await new Promise((r) => setTimeout(r, 500));
    }
    throw new Error(`Server at ${url} did not respond within ${timeoutMs}ms`);
}

function stopServer(server: ChildProcess): Promise<void> {
    return new Promise((resolve) => {
        if (server.exitCode !== null || server.killed) {
            resolve();
            return;
        }
        server.once("exit", () => resolve());
        server.kill("SIGTERM");
        setTimeout(() => {
            if (server.exitCode === null) server.kill("SIGKILL");
            resolve();
        }, 2000);
    });
}

type ResultRecording = { file: string; duration: number; focal: { x: number; y: number } };

async function recordResultClip(browser: Browser, rawDir: string, url: string): Promise<ResultRecording> {
    const context = await browser.newContext({ viewport: RECORD_SIZE, deviceScaleFactor: 1, recordVideo: { dir: rawDir, size: RECORD_SIZE } });
    const page = await context.newPage();
    let focal = { x: 0.5, y: 0.3 };
    try {
        const response = await page.goto(url, { waitUntil: "load", timeout: 45000 });
        if (!response || !response.ok()) throw new Error(`${url}: returned HTTP ${response?.status()}`);
        await page.evaluate(() => document.fonts.ready);
        await page.waitForTimeout(400);
        await installCursorOn(page);

        const scrollable = await page.evaluate(() => Math.max(0, document.documentElement.scrollHeight - window.innerHeight));
        const steps = 30;
        const scrollWindowMs = 6500;
        for (let i = 1; i <= steps; i++) {
            await page.evaluate((y) => window.scrollTo({ top: y }), Math.round((scrollable * i) / steps));
            await page.waitForTimeout(scrollWindowMs / steps);
        }

        const buttons = page.getByRole("button");
        const buttonCount = await buttons.count();
        for (let i = 0; i < Math.min(2, buttonCount); i++) {
            const hovered = await hoverWithCursor(page, buttons.nth(i));
            if (hovered) focal = { x: clamp01(hovered.x / RECORD_SIZE.width), y: clamp01(hovered.y / RECORD_SIZE.height) };
            await page.waitForTimeout(700);
        }

        const cancelButton = page.getByRole("button", { name: /cancel subscription/i }).first();
        if (await cancelButton.count()) {
            const clicked = await moveAndClick(page, cancelButton);
            if (clicked) {
                await page.waitForTimeout(400);
                const dialog = page.getByRole("dialog").first();
                const alertDialog = page.getByRole("alertdialog").first();
                const opened = (await dialog.count()) ? dialog : (await alertDialog.count()) ? alertDialog : null;
                if (opened) {
                    await page.waitForTimeout(1600);
                    const box = await opened.boundingBox();
                    if (box) focal = { x: clamp01((box.x + box.width / 2) / RECORD_SIZE.width), y: clamp01((box.y + box.height / 2) / RECORD_SIZE.height) };
                } else {
                    await page.waitForTimeout(1200);
                }
            }
        } else {
            console.warn(`result: no "cancel subscription" button found by role — skipping the confirmation-dialog beat`);
            await page.waitForTimeout(1200);
        }
    } finally {
        // fallthrough to close below regardless of what happened above
    }
    const video = page.video();
    await page.close();
    await context.close();
    if (!video) throw new Error("result: Playwright produced no video");
    const tmpPath = await video.path();
    const outPath = path.join(rawDir, "result.webm");
    renameSync(tmpPath, outPath);
    return { file: outPath, duration: probeDuration(outPath), focal };
}

type ResultOutcome = ({ recorded: true } & ResultRecording) | { recorded: false; reason: string };

async function buildResultSegment(browser: Browser, demoDir: string, rawDir: string): Promise<ResultOutcome> {
    if (!existsSync(demoDir)) return { recorded: false, reason: `demo dir not found: ${demoDir}` };

    console.log(`result: building ${demoDir} ...`);
    const build = spawnSync("corepack", ["pnpm", "build"], { cwd: demoDir, stdio: "inherit", env: demoEnv() });
    if (build.status !== 0) return { recorded: false, reason: `pnpm build failed in ${demoDir} (exit code ${build.status})` };

    console.log(`result: starting pnpm start -p ${RESULT_PORT} ...`);
    const server = spawn("corepack", ["pnpm", "start", "-p", String(RESULT_PORT)], { cwd: demoDir, stdio: "ignore", env: demoEnv() });
    try {
        await waitForServer(`http://localhost:${RESULT_PORT}`, 30000);
        const recording = await recordResultClip(browser, rawDir, RESULT_URL);
        return { recorded: true, ...recording };
    } catch (err) {
        return { recorded: false, reason: err instanceof Error ? err.message : String(err) };
    } finally {
        await stopServer(server);
    }
}

// ---------------------------------------------------------------------------------------------
// Segment assembly
// ---------------------------------------------------------------------------------------------

type Encoder = { name: string; args: string[] };
type SegmentInfo = { name: string; kind: "title" | "clip"; durationSec: number };

async function addTitleSegment(
    titleBrowser: Browser,
    tmpDir: string,
    encoder: Encoder,
    html: string,
    duration: number,
    nameHint: string,
    segments: string[],
    durations: number[],
    infos: SegmentInfo[],
) {
    const png = path.join(tmpDir, `${nameHint}-title.png`);
    await renderCardPng(titleBrowser, html, png, tmpDir);
    const seg = path.join(tmpDir, `${nameHint}-title.mp4`);
    encodeSegment(["-loop", "1", "-i", png, "-r", String(FPS)], null, duration, encoder, seg);
    segments.push(seg);
    durations.push(duration);
    infos.push({ name: nameHint, kind: "title", durationSec: duration });
}

function addClipSegment(
    rawFile: string,
    duration: number,
    focal: { x: number; y: number },
    encoder: Encoder,
    tmpDir: string,
    nameHint: string,
    segments: string[],
    durations: number[],
    infos: SegmentInfo[],
) {
    const seg = path.join(tmpDir, `${nameHint}-clip.mp4`);
    const filter = zoompanFilter(focal.x, focal.y, duration);
    encodeSegment(["-i", rawFile], filter, duration, encoder, seg);
    segments.push(seg);
    durations.push(duration);
    infos.push({ name: nameHint, kind: "clip", durationSec: duration });
}

// ---------------------------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------------------------

async function main() {
    const opts = parseArgs(process.argv.slice(2));
    mkdirSync(OUT_DIR, { recursive: true });
    const tmpDir = mkdtempSync(path.join(os.tmpdir(), "pui-hero-"));
    const rawDir = path.join(tmpDir, "raw");
    mkdirSync(rawDir, { recursive: true });

    const transcriptPath = opts.fixture ? FIXTURE_TRANSCRIPT : opts.transcriptPath;
    console.log(`Transcript: ${transcriptPath}${opts.fixture ? " (fixture)" : ""}`);
    console.log(`Demo dir: ${opts.demoDir}`);
    console.log(`Scratch dir: ${tmpDir}`);
    console.log(`ffmpeg: ${FFMPEG}`);

    if (!existsSync(transcriptPath)) {
        throw new Error(
            `Transcript not found at ${transcriptPath}. Run the real Claude session first (see this file's header), pass --transcript <path>, or pass --fixture to test against the bundled synthetic transcript.`,
        );
    }
    const { lines: replayLines, warnings } = parseTranscript(readFileSync(transcriptPath, "utf8"));
    for (const w of warnings) console.warn(`transcript: ${w}`);
    if (replayLines.length === 0) throw new Error(`${transcriptPath}: produced no replayable lines`);
    console.log(`transcript: ${replayLines.length} replay lines`);

    const encoder = pickH264Encoder();
    if (encoder.degraded) console.warn(`hero.mp4: using ${encoder.name} (this ffmpeg build has no libx264) — see this file's header comment.`);
    const vp9 = pickVp9Encoder();
    if (!vp9) console.warn("hero.webm: SKIPPED — this ffmpeg build has no libvpx/libvpx-vp9 encoder compiled in.");

    const browser = await chromium.launch();
    const segments: string[] = [];
    const durations: number[] = [];
    const infos: SegmentInfo[] = [];
    let resultOutcome: ResultOutcome = { recorded: false, reason: "not attempted" };
    let resultSegmentFile: string | null = null;

    try {
        // 1. Title card
        await addTitleSegment(browser, tmpDir, encoder, titleCardHtml(TITLE_1), TITLE_1_DURATION, "title-1", segments, durations, infos);

        // 2. Terminal intro
        const cdCommand = `cd ${shortenHome(opts.demoDir)}`;
        const intro = await recordLocalHtmlClip(browser, rawDir, tmpDir, "terminal-intro", terminalIntroHtml(cdCommand, OWNER_PROMPT, CHAR_DELAY_MS), (page) =>
            page.evaluate((delayMs) => (window as unknown as { playIntro: (d: number) => Promise<void> }).playIntro(delayMs), CHAR_DELAY_MS),
        );
        console.log(`terminal-intro: recorded ${intro.duration.toFixed(2)}s`);
        addClipSegment(intro.file, intro.duration, { x: 0.5, y: 0.72 }, encoder, tmpDir, "terminal-intro", segments, durations, infos);

        // 3. Session replay (no title card between this and clip 2)
        const timings = computeReplayTimings(replayLines);
        const replay = await recordLocalHtmlClip(browser, rawDir, tmpDir, "replay", replayHtml(timings), (page) =>
            page.evaluate(() => (window as unknown as { playReplay: () => Promise<void> }).playReplay()),
        );
        console.log(`replay: recorded ${replay.duration.toFixed(2)}s (${replayLines.length} lines)`);
        addClipSegment(replay.file, replay.duration, { x: 0.5, y: 0.72 }, encoder, tmpDir, "replay", segments, durations, infos);

        // 4. Title card
        await addTitleSegment(browser, tmpDir, encoder, titleCardHtml(TITLE_2), TITLE_2_DURATION, "title-2", segments, durations, infos);

        // 5. Result
        if (opts.fixture) {
            resultOutcome = { recorded: false, reason: "--fixture mode: no real page to record" };
        } else {
            resultOutcome = await buildResultSegment(browser, opts.demoDir, rawDir);
        }
        if (resultOutcome.recorded) {
            console.log(`result: recorded ${resultOutcome.duration.toFixed(2)}s at http://localhost:${RESULT_PORT}/settings/billing`);
            addClipSegment(resultOutcome.file, resultOutcome.duration, resultOutcome.focal, encoder, tmpDir, "result", segments, durations, infos);
            resultSegmentFile = segments[segments.length - 1]!;
        } else {
            console.warn(`result: SKIPPED (using placeholder title card) — ${resultOutcome.reason}`);
            await addTitleSegment(
                browser,
                tmpDir,
                encoder,
                titleCardHtml(PLACEHOLDER_RESULT_TEXT),
                PLACEHOLDER_RESULT_DURATION,
                "result-placeholder",
                segments,
                durations,
                infos,
            );
            resultSegmentFile = segments[segments.length - 1]!;
        }

        // 6. End card
        await addTitleSegment(browser, tmpDir, encoder, endCardHtml(END_TITLE, END_SUBTITLE), END_DURATION, "end", segments, durations, infos);
    } finally {
        await browser.close();
    }

    let heroInfo: { mp4Bytes: number; webmBytes: number | null; durationSec: number; webmSkippedReason: string | null } | null = null;

    if (!opts.noPost) {
        const mp4Path = path.join(OUT_DIR, "hero.mp4");
        const totalDuration = durations.reduce((a, b) => a + b, 0) - XFADE_OVERLAP * (durations.length - 1);
        const bitrateEncoder =
            encoder.name === "libx264"
                ? encoder
                : {
                      name: encoder.name,
                      args: (() => {
                          const kbps = Math.min(1400, Math.max(500, Math.floor((TARGET_MAX_BYTES * 8) / totalDuration / 1000)));
                          return [...encoder.args, "-b:v", `${kbps}k`, "-maxrate", `${Math.round(kbps * 1.2)}k`, "-bufsize", `${kbps * 2}k`];
                      })(),
                  };

        try {
            concatWithXfade(segments, durations, bitrateEncoder, mp4Path);
        } catch (err) {
            console.warn(`xfade concat failed, falling back to a plain concat without crossfades: ${err instanceof Error ? err.message : err}`);
            concatPlain(segments, tmpDir, bitrateEncoder, mp4Path);
        }

        let webmBytes: number | null = null;
        const webmSkippedReason = vp9 ? null : "no VP8/VP9 encoder in this ffmpeg build";
        if (vp9) {
            const webmPath = path.join(OUT_DIR, "hero.webm");
            try {
                concatWithXfade(segments, durations, vp9, webmPath);
            } catch {
                concatPlain(segments, tmpDir, vp9, webmPath);
            }
            webmBytes = statSync(webmPath).size;
        }

        const posterSource = resultSegmentFile ?? segments[segments.length - 1]!;
        const posterPath = path.join(OUT_DIR, "hero-poster.jpg");
        const posterAt = Math.min(1.5, probeDuration(posterSource) * 0.4);
        runFfmpeg(["-ss", posterAt.toFixed(2), "-i", posterSource, "-frames:v", "1", "-q:v", "2", posterPath]);

        heroInfo = { mp4Bytes: statSync(mp4Path).size, webmBytes, durationSec: probeDuration(mp4Path), webmSkippedReason };
    }

    writeFileSync(
        path.join(OUT_DIR, "clips.json"),
        JSON.stringify(
            {
                generatedAt: new Date().toISOString(),
                mode: opts.fixture ? "fixture" : "real",
                transcriptPath,
                transcriptLineCount: replayLines.length,
                transcriptWarnings: warnings,
                demoDir: opts.demoDir,
                segments: infos,
                result: resultOutcome,
                hero: heroInfo,
            },
            null,
            2,
        ),
        "utf8",
    );

    console.log(`\nWrote ${path.join(OUT_DIR, "clips.json")}`);
    if (heroInfo) {
        console.log(`hero.mp4: ${(heroInfo.mp4Bytes / 1024 / 1024).toFixed(2)} MB, ${heroInfo.durationSec.toFixed(1)}s`);
        if (heroInfo.webmBytes !== null) console.log(`hero.webm: ${(heroInfo.webmBytes / 1024 / 1024).toFixed(2)} MB`);
        else console.warn(`hero.webm: SKIPPED — ${heroInfo.webmSkippedReason}`);
    }
}

main().catch((err) => {
    console.error(err instanceof Error ? (err.stack ?? err.message) : err);
    process.exit(1);
});
