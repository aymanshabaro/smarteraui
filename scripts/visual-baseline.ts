/**
 * Captures the committed visual-regression baseline: a curated ~25-route sample of the docs site
 * (see tests/visual/routes.ts for the list and why those routes), in light and dark, at two
 * viewports (1280x800 desktop, 390x844 mobile), plus a handful of dir="rtl" passes.
 *
 * Builds on the conventions in scripts/shot.ts (toggling the `dark-mode` class, full-page PNG via
 * Playwright) rather than reimplementing them — the difference here is a fixed, small route set,
 * two fixed viewports, an RTL pass, and WebP output sized to keep the whole baseline small enough
 * to commit.
 *
 *   pnpm visual:baseline
 *
 * Needs the docs site built and served — see README in tests/visual or run:
 *   pnpm -F docs build && pnpm -F docs start &
 *   DOCS_URL=http://localhost:3000 pnpm visual:baseline
 */
import { mkdirSync, rmSync } from "node:fs";
import path from "node:path";
import { chromium } from "playwright";
import sharp from "sharp";
import { BASELINE_DIR, ROUTES, VIEWPORTS, type ViewportName, WEBP_QUALITY } from "../tests/visual/routes";

const BASE = process.env.DOCS_URL ?? "http://localhost:3000";

type Pass = { theme: "light" | "dark"; rtl: boolean };

const passesFor = (rtlCapable: boolean | undefined): Pass[] => {
    const base: Pass[] = [
        { theme: "light", rtl: false },
        { theme: "dark", rtl: false },
    ];
    // RTL is captured light-only, on the handful of routes flagged in tests/visual/routes.ts — it
    // exists to catch a physical-property leak, not to double the whole light/dark matrix.
    return rtlCapable ? [...base, { theme: "light", rtl: true }] : base;
};

const fileName = (viewport: ViewportName, pass: Pass) => `${viewport}-${pass.theme}${pass.rtl ? "-rtl" : ""}.webp`;

// Guards against silently baselining a broken capture — a non-200 response or a rendered error
// page (Next.js 404 / client-side exception overlay) must fail the whole run, not get saved as
// if it were a real screenshot. See the CI incident this was added for: a 3 KB "screenshot" that
// was actually an error page slipping into a check.
const ERROR_PAGE_MARKERS = [/application error: a client-side exception has occurred/i, /this page could not be found/i];

const assertRealPage = async (page: import("playwright").Page, response: import("playwright").Response | null, slug: string, route: string) => {
    if (!response) {
        throw new Error(`${slug}: navigation to ${route} produced no response`);
    }
    if (!response.ok()) {
        throw new Error(`${slug}: ${route} returned HTTP ${response.status()} ${response.statusText()}`);
    }
    const bodyText = await page.evaluate(() => document.body.innerText);
    const marker = ERROR_PAGE_MARKERS.find((re) => re.test(bodyText));
    if (marker) {
        throw new Error(`${slug}: ${route} rendered an error page (matched ${marker})`);
    }
};

const run = async () => {
    rmSync(BASELINE_DIR, { recursive: true, force: true });
    mkdirSync(BASELINE_DIR, { recursive: true });

    const browser = await chromium.launch();
    let shot = 0;
    let bytes = 0;

    for (const r of ROUTES) {
        const dir = path.join(BASELINE_DIR, r.slug);
        mkdirSync(dir, { recursive: true });

        for (const [viewportName, viewport] of Object.entries(VIEWPORTS) as [ViewportName, { width: number; height: number }][]) {
            const ctx = await browser.newContext({ viewport, deviceScaleFactor: 1 });
            const page = await ctx.newPage();
            const response = await page.goto(BASE + r.route, { waitUntil: "networkidle" });
            await assertRealPage(page, response, r.slug, r.route);

            for (const pass of passesFor(r.rtl)) {
                await page.evaluate(
                    ({ dark, dir }) => {
                        document.documentElement.classList.toggle("dark-mode", dark);
                        document.documentElement.dir = dir;
                    },
                    { dark: pass.theme === "dark", dir: pass.rtl ? "rtl" : "ltr" },
                );
                await page.waitForTimeout(300);

                // Viewport-only (not fullPage): keeps every capture bounded to a fixed size — both for
                // WebP's 16383px dimension ceiling on very long pages and for the baseline's byte budget.
                const png = await page.screenshot({ fullPage: false });
                const webp = await sharp(png).webp({ quality: WEBP_QUALITY }).toBuffer();
                const out = path.join(dir, fileName(viewportName, pass));
                await sharp(webp).toFile(out);
                bytes += webp.byteLength;
                shot += 1;
                console.log(`${r.slug}/${fileName(viewportName, pass)}`);
            }

            await ctx.close();
        }
    }

    await browser.close();
    console.log(`\nwrote ${shot} images to ${BASELINE_DIR} — ${(bytes / 1024 / 1024).toFixed(2)} MB total`);
};

run().catch((err) => {
    console.error(err instanceof Error ? err.message : err);
    process.exit(1);
});
