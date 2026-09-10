/**
 * Re-captures the routes in tests/visual/routes.ts and diffs them against the committed baseline
 * in tests/visual/baseline (written by scripts/visual-baseline.ts). Exits non-zero if any capture
 * exceeds the diff threshold (kept in step with scripts/diff-shots.ts's ~8% layout-regression
 * cutoff) or its baseline is missing/size-mismatched. Diff images go to the gitignored
 * tests/visual/.diff/ for inspection.
 *
 *   pnpm visual:check
 *
 * Needs the docs site built and served — see scripts/visual-baseline.ts's header for the commands.
 */
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";
import pixelmatch from "pixelmatch";
import { chromium } from "playwright";
import { PNG } from "pngjs";
import sharp from "sharp";
import { BASELINE_DIR, DIFF_DIR, DIFF_THRESHOLD_PCT, PIXELMATCH_THRESHOLD, ROUTES, VIEWPORTS, type ViewportName } from "../tests/visual/routes";

const BASE = process.env.DOCS_URL ?? "http://localhost:3000";

type Pass = { theme: "light" | "dark"; rtl: boolean };

const passesFor = (rtlCapable: boolean | undefined): Pass[] => {
    const base: Pass[] = [
        { theme: "light", rtl: false },
        { theme: "dark", rtl: false },
    ];
    return rtlCapable ? [...base, { theme: "light", rtl: true }] : base;
};

const fileName = (viewport: ViewportName, pass: Pass) => `${viewport}-${pass.theme}${pass.rtl ? "-rtl" : ""}.webp`;

type Row = { name: string; verdict: "ok" | "CHECK" | "MISSING"; detail: string };

const run = async () => {
    rmSync(DIFF_DIR, { recursive: true, force: true });
    mkdirSync(DIFF_DIR, { recursive: true });

    const browser = await chromium.launch();
    const rows: Row[] = [];

    for (const r of ROUTES) {
        for (const [viewportName, viewport] of Object.entries(VIEWPORTS) as [ViewportName, { width: number; height: number }][]) {
            const ctx = await browser.newContext({ viewport, deviceScaleFactor: 1 });
            const page = await ctx.newPage();
            await page.goto(BASE + r.route, { waitUntil: "networkidle" });

            for (const pass of passesFor(r.rtl)) {
                const name = `${r.slug}/${fileName(viewportName, pass)}`;
                const baselinePath = path.join(BASELINE_DIR, name);

                await page.evaluate(
                    ({ dark, dir }) => {
                        document.documentElement.classList.toggle("dark-mode", dark);
                        document.documentElement.dir = dir;
                    },
                    { dark: pass.theme === "dark", dir: pass.rtl ? "rtl" : "ltr" },
                );
                await page.waitForTimeout(300);

                // Matches scripts/visual-baseline.ts: viewport-only, not fullPage.
                const png = await page.screenshot({ fullPage: false });
                const currentWebp = await sharp(png).webp({ quality: 90 }).toBuffer();

                if (!existsSync(baselinePath)) {
                    rows.push({ name, verdict: "MISSING", detail: "no baseline committed" });
                    continue;
                }

                // Compare via PNG (pixelmatch needs raw RGBA) — decode both sides fresh so a
                // baseline re-encode doesn't quietly change the comparison.
                const currentPng = PNG.sync.read(await sharp(currentWebp).png().toBuffer());
                const baselinePng = PNG.sync.read(await sharp(readFileSync(baselinePath)).png().toBuffer());

                if (currentPng.width !== baselinePng.width || currentPng.height !== baselinePng.height) {
                    rows.push({
                        name,
                        verdict: "CHECK",
                        detail: `size mismatch: ${currentPng.width}x${currentPng.height} vs baseline ${baselinePng.width}x${baselinePng.height}`,
                    });
                    continue;
                }

                const diff = new PNG({ width: currentPng.width, height: currentPng.height });
                const diffPixels = pixelmatch(currentPng.data, baselinePng.data, diff.data, currentPng.width, currentPng.height, {
                    threshold: PIXELMATCH_THRESHOLD,
                });
                const pct = (100 * diffPixels) / (currentPng.width * currentPng.height);
                const verdict = pct > DIFF_THRESHOLD_PCT ? "CHECK" : "ok";
                rows.push({ name, verdict, detail: `${pct.toFixed(2)}% differing pixels` });

                if (verdict === "CHECK") {
                    const diffOut = path.join(DIFF_DIR, name.replace(/\//g, "__").replace(/\.webp$/, ".png"));
                    mkdirSync(path.dirname(diffOut), { recursive: true });
                    writeFileSync(diffOut, PNG.sync.write(diff));
                }
            }

            await ctx.close();
        }
    }

    await browser.close();

    const failing = rows.filter((r) => r.verdict !== "ok");
    console.log("| Route | Verdict | Detail |");
    console.log("|---|---|---|");
    for (const r of rows) console.log(`| ${r.name} | ${r.verdict} | ${r.detail} |`);

    if (failing.length) {
        console.error(`\nvisual:check — ${failing.length}/${rows.length} capture(s) failed. Diff images in ${DIFF_DIR}/`);
        process.exitCode = 1;
    } else {
        console.log(`\nvisual:check — all ${rows.length} captures within threshold.`);
    }
};

run();
