/**
 * Renders our own gallery thumbnails for every section/page variant
 * (never ship docs/spec/reference/thumbs — those are the reference's).
 * Renders /preview/variant/<section>/<slug>/<variant> in a 1440-wide tab (light
 * mode — see below), crops to the actual rendered content (not the whole preview
 * viewport — see "Cropped to content" below), downsamples to THUMB_WIDTH and
 * writes apps/docs/public/thumbs/<section>/<slug>/<variant>.webp
 *
 * Light mode only: with ~780 variants, a dark pass would double render time and
 * repo/asset-bundle bytes for a thumbnail whose job is just "recognize the layout
 * at a glance". <VariantGridClient> already falls back to the light thumb for the
 * dark <img> (`card.dark ?? card.light`), so nothing breaks — the gallery just
 * doesn't re-skin thumbnails for dark mode yet.
 *
 * Cropped to content: the preview route centers the component in a `min-h-screen`
 * flex box (apps/docs/app/preview/[...path]/page.tsx), for a nicely-framed "open in
 * new tab" view. A full 1440x900 screenshot of that isn't what the gallery wants
 * though: <VariantGridClient> lays cards out as a CSS-columns masonry with plain
 * `w-full` images and no fixed aspect ratio — it already expects each thumbnail's
 * natural aspect ratio to describe that variant's real shape. So this script
 * screenshots only the union of `.min-h-screen`'s children (usually one element,
 * but some variants render a nav header alongside the section — verified on
 * hero-header-sections/hero-split-image-01, where the first child alone was only
 * the nav bar), growing the tab's viewport first when that content is taller than
 * the default 900px (verified against a multi-screen-tall dashboard example —
 * `page.screenshot({ clip })` only rasterizes what's within the current viewport).
 *
 * Every variant here — a marketing page section, a full app-example page, a full
 * marketing-example page — is a full-width component on the real site (verified:
 * on the real /marketing/... docs page the component is a direct block child of
 * `<body>`, so it naturally fills the viewport). But the preview wrapper's
 * `items-center` (instead of the default `stretch`) shrinks any child that relies
 * on a definite container width to grow into (e.g. a `flex-1` truncating text
 * column) down to its content's collapsed size — verified on `banner-slim-default`,
 * which rendered at 96x52 instead of full-width. Rather than touch the shared
 * preview route (used by more than this script) this script neutralizes that one
 * property on its own captured page before measuring/screenshotting, restoring the
 * real site's layout for the capture without changing the route itself.
 *
 * Needs the docs site *built and served in production mode* — see
 * scripts/visual-baseline.ts's header for why (the dev server's error overlay is
 * exactly what poisoned a prior run of this script; a broken/dev server must fail
 * loudly, never get screenshotted as if it were a real page):
 *
 *   pnpm exec turbo run build --filter=docs...
 *   pnpm -F docs start &
 *   DOCS_URL=http://localhost:3000 pnpm shots:thumbs
 *
 * Guards (mirroring scripts/visual-baseline.ts's assertRealPage, extended per the
 * incident writeup): a non-200 navigation, a rendered error page (client-side
 * exception overlay, 404, 500, unhandled runtime error, a visible stack trace),
 * the Next.js dev error overlay DOM node, a missing/zero-size render target, or a
 * suspiciously small output file, all throw and stop the ENTIRE run immediately —
 * they do not get skipped, retried into silence, or saved as a placeholder. A run
 * that can't produce a real thumbnail for one route can't be trusted for the rest
 * of them either.
 */
import { existsSync, mkdirSync, readFileSync, statSync, unlinkSync } from "node:fs";
import path from "node:path";
import { type Page, type Response, chromium } from "playwright";
import sharp from "sharp";

const BASE = process.env.DOCS_URL ?? "http://localhost:3000";
const OUT = path.resolve("apps/docs/public/thumbs");
const VARIANTS_FILE = path.resolve("apps/docs/lib/variants.ts");

const VIEWPORT_WIDTH = 1440;
const BASE_VIEWPORT_HEIGHT = 900;

/** Downsized to this width for the gallery (cards top out well under this); small components are
 *  enlarged up to it too, so every thumbnail shares a comparable resolution. */
const THUMB_WIDTH = 640;
const WEBP_QUALITY = 75;

/**
 * A hard floor on the written file, expressed per pixel rather than as one absolute number, and
 * combined with an absolute floor for very small crops where per-pixel math alone isn't meaningful
 * (WebP's fixed header/chunk overhead dominates at tiny sizes). Content here spans a huge range of
 * shapes and densities — a one-line slim banner resizes to ~640x23, a full landing page to
 * ~640x2700, and a plain "forgot password" form is legitimately mostly blank canvas — so this was
 * calibrated empirically against this script's own output rather than against one assumed shape:
 *   - genuinely blank renders (solid background, nothing mounted) measured 98-516 bytes absolute
 *     and 0.002-0.007 bytes/px, across several tested sizes from a 640x23 sliver to a 640x400 page.
 *   - every confirmed real render measured at least 784 bytes absolute and 0.0092 bytes/px, down to
 *     the sparsest real content seen (a mostly-blank single-purpose auth page).
 * Both floors below sit with margin inside that gap. See the incident this guards against: 781
 * "thumbnails" averaging 3 KB that were full-viewport screenshots of error pages.
 */
const MIN_FILE_BYTES = 550;
const MIN_BYTES_PER_PIXEL = 0.006;

type Variant = { section: string; slug: string; variant: string };
type Rect = { x: number; y: number; width: number; height: number };

/**
 * Reads the generated map without importing it — importing would pull the whole
 * component library into this script.
 */
const readVariants = (): Variant[] => {
    if (!existsSync(VARIANTS_FILE)) return [];
    const source = readFileSync(VARIANTS_FILE, "utf8");
    return [...source.matchAll(/slug:\s*"([^"]+)",\s*variant:\s*"([^"]+)",\s*title:\s*"[^"]*",\s*section:\s*"([^"]+)"/g)].map((match) => ({
        slug: match[1]!,
        variant: match[2]!,
        section: match[3]!,
    }));
};

// Same family of markers as scripts/visual-baseline.ts / scripts/visual-check.ts, extended with the
// additional error shapes called out for this generator: a bare 500 page, an unhandled runtime
// error, and a visible stack trace, on top of the client-exception overlay and 404 they already
// cover. A non-200 response and the Next.js dev error overlay DOM node are asserted separately.
const ERROR_PAGE_MARKERS = [
    /application error: a client-side exception has occurred/i,
    /this page could not be found/i,
    /internal server error/i,
    /unhandled runtime error/i,
    /call stack/i,
];

const assertRealPage = async (page: Page, response: Response | null, route: string) => {
    if (!response) {
        throw new Error(`${route}: navigation produced no response`);
    }
    if (!response.ok()) {
        throw new Error(`${route}: returned HTTP ${response.status()} ${response.statusText()}`);
    }
    const bodyText = await page.evaluate(() => document.body.innerText);
    const marker = ERROR_PAGE_MARKERS.find((re) => re.test(bodyText));
    if (marker) {
        throw new Error(`${route}: rendered an error page (matched ${marker})`);
    }
    const hasDevOverlay = await page.evaluate(() => !!document.querySelector("nextjs-portal, [data-nextjs-dialog]"));
    if (hasDevOverlay) {
        throw new Error(`${route}: rendered the Next.js dev error overlay — is this a dev server? thumbs must run against a production build`);
    }
};

/** Union of `.min-h-screen`'s direct children's boxes — see "Cropped to content" above for why it's
 *  a union rather than just the first child. Returns null if the wrapper has no sized children. */
const contentRect = async (page: Page): Promise<Rect | null> =>
    page.evaluate(() => {
        const wrapper = document.querySelector(".min-h-screen");
        if (!wrapper || wrapper.children.length === 0) return null;
        let top = Infinity;
        let left = Infinity;
        let right = -Infinity;
        let bottom = -Infinity;
        for (const child of wrapper.children) {
            const r = child.getBoundingClientRect();
            if (r.width < 1 || r.height < 1) continue;
            top = Math.min(top, r.top);
            left = Math.min(left, r.left);
            right = Math.max(right, r.right);
            bottom = Math.max(bottom, r.bottom);
        }
        if (!Number.isFinite(top)) return null;
        return { x: left, y: top, width: right - left, height: bottom - top };
    });

const run = async () => {
    const limit = process.env.THUMBS_LIMIT ? Number(process.env.THUMBS_LIMIT) : undefined;
    // THUMBS_FILTER narrows to routes whose "section/slug/variant" contains this substring — handy
    // for re-checking one tricky variant without re-running the whole batch.
    const filter = process.env.THUMBS_FILTER;
    const variants = readVariants()
        .filter((v) => !filter || `${v.section}/${v.slug}/${v.variant}`.includes(filter))
        .slice(0, limit);
    if (!variants.length) {
        console.log("shots:thumbs — no variants generated yet; run `pnpm gen:variants` first");
        return;
    }

    // Fail fast, before touching any output file, if the target isn't actually answering — the
    // incident this script guards against was a server that was broken for the *entire* run.
    const preflight = await fetch(BASE).catch((error: unknown) => error as Error);
    if (preflight instanceof Error || !preflight.ok) {
        const detail = preflight instanceof Error ? preflight.message : `HTTP ${preflight.status} ${preflight.statusText}`;
        throw new Error(`shots:thumbs — ${BASE} is not answering 200 (${detail}). Build and start the docs site first (see this file's header).`);
    }

    const browser = await chromium.launch();
    const ctx = await browser.newContext({ viewport: { width: VIEWPORT_WIDTH, height: BASE_VIEWPORT_HEIGHT }, deviceScaleFactor: 1 });
    const page = await ctx.newPage();

    let written = 0;
    let bytes = 0;

    for (const v of variants) {
        const route = `/preview/variant/${v.section}/${v.slug}/${v.variant}`;
        const dir = path.join(OUT, v.section, v.slug);
        mkdirSync(dir, { recursive: true });

        // Reset to the baseline viewport before every navigation — a previous, taller variant may
        // have grown it (see below) and left it that way.
        await page.setViewportSize({ width: VIEWPORT_WIDTH, height: BASE_VIEWPORT_HEIGHT });

        const response = await page.goto(`${BASE}${route}`, { waitUntil: "networkidle" });
        await assertRealPage(page, response, route);
        await page.evaluate(() => {
            document.documentElement.classList.remove("dark-mode");
            // See "Every variant here ... is a full-width component" above: restores the real
            // site's block-layout width behavior for this capture only.
            const wrapper = document.querySelector(".min-h-screen");
            if (wrapper instanceof HTMLElement) wrapper.style.alignItems = "stretch";
        });
        await page.waitForTimeout(250);

        const rect = await contentRect(page);
        if (!rect) {
            throw new Error(`${route}: no rendered content found (.min-h-screen has no sized child) — nothing mounted`);
        }

        // page.screenshot({ clip }) only rasterizes what's within the current viewport — grow it to
        // fit content taller than the default 900px before capturing (verified against a
        // multi-screen-tall dashboard example: without this, the clip silently truncated at 900px).
        const neededHeight = Math.ceil(rect.y + rect.height);
        if (neededHeight > BASE_VIEWPORT_HEIGHT) {
            await page.setViewportSize({ width: VIEWPORT_WIDTH, height: neededHeight });
            await page.waitForTimeout(100);
        }

        const png = await page.screenshot({ type: "png", clip: rect });
        const out = path.join(dir, `${v.variant}.webp`);
        const info = await sharp(png).resize({ width: THUMB_WIDTH }).webp({ quality: WEBP_QUALITY }).toFile(out);

        const size = statSync(out).size;
        const bytesPerPixel = size / (info.width * info.height);
        if (size < MIN_FILE_BYTES || bytesPerPixel < MIN_BYTES_PER_PIXEL) {
            unlinkSync(out);
            throw new Error(
                `${route}: wrote ${size} bytes at ${info.width}x${info.height} (${bytesPerPixel.toFixed(4)} bytes/px, need >= ${MIN_BYTES_PER_PIXEL} bytes/px and >= ${MIN_FILE_BYTES}B) — looks like a blank or error render, not a real thumbnail. Stopping the whole run; no partial file left behind for this route.`,
            );
        }

        written += 1;
        bytes += size;
        console.log(`${v.section}/${v.slug}/${v.variant} (${(size / 1024).toFixed(1)} KB, ${info.width}x${info.height})`);
    }

    await browser.close();
    console.log(`\nshots:thumbs — wrote ${written} thumbnails to ${OUT} — ${(bytes / 1024 / 1024).toFixed(2)} MB total`);
};

run().catch((err) => {
    console.error(err instanceof Error ? err.message : err);
    process.exit(1);
});
