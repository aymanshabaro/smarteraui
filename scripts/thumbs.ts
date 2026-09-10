/**
 * Renders our own gallery thumbnails for every section/page variant
 * (never ship docs/spec/reference/thumbs — those are the reference's).
 * Renders /preview/variant/<section>/<slug>/<variant> at 1440x900 (light mode —
 * see below), downsamples to THUMB_WIDTH and writes
 * apps/docs/public/thumbs/<section>/<slug>/<variant>.{webp,png}
 *
 * Light mode only: with ~780 variants, a dark pass would double render time and
 * repo/asset-bundle bytes for a thumbnail whose job is just "recognize the layout
 * at a glance". <VariantGridClient> already falls back to the light thumb for the
 * dark <img> (`card.dark ?? card.light`), so nothing breaks — the gallery just
 * doesn't re-skin thumbnails for dark mode yet.
 *
 * Playwright can only encode PNG/JPEG, so WebP + resizing is produced only when
 * `sharp` is installed (it's a devDependency); otherwise a full-size PNG is
 * written and <VariantGrid> falls back to it.
 */
import { existsSync, mkdirSync, readFileSync, unlinkSync } from "node:fs";
import path from "node:path";
import { chromium } from "playwright";

const BASE = process.env.DOCS_URL ?? "http://localhost:3000";
const OUT = path.resolve("apps/docs/public/thumbs");
const VARIANTS_FILE = path.resolve("apps/docs/lib/variants.ts");

/** Rendered at 1440x900; downsized to this width for the gallery (cards top out well under this). */
const THUMB_WIDTH = 640;
const WEBP_QUALITY = 75;

type Variant = { section: string; slug: string; variant: string };

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

type Encoder = ((png: Buffer, to: string) => Promise<void>) | undefined;

/** Only used when `sharp` is installed (it's a devDependency; never installed by this script). */
const loadWebpEncoder = async (): Promise<Encoder> => {
    try {
        const sharp = (await import("sharp")).default;
        return async (png, to) => {
            await sharp(png).resize({ width: THUMB_WIDTH }).webp({ quality: WEBP_QUALITY }).toFile(to);
        };
    } catch {
        return undefined;
    }
};

const run = async () => {
    const limit = process.env.THUMBS_LIMIT ? Number(process.env.THUMBS_LIMIT) : undefined;
    const variants = readVariants().slice(0, limit);
    if (!variants.length) {
        console.log("shots:thumbs — no variants generated yet; run `pnpm gen:variants` first");
        return;
    }

    const toWebp = await loadWebpEncoder();
    const browser = await chromium.launch();
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
    const page = await ctx.newPage();

    for (const v of variants) {
        const dir = path.join(OUT, v.section, v.slug);
        mkdirSync(dir, { recursive: true });

        // A couple of retries absorb a dev-server hiccup mid-run (e.g. a concurrent
        // rebuild of apps/docs) without losing the whole batch.
        let png: Buffer | undefined;
        let lastError: unknown;
        for (let attempt = 0; attempt < 3 && !png; attempt++) {
            try {
                if (attempt > 0) await page.waitForTimeout(2000);
                await page.goto(`${BASE}/preview/variant/${v.section}/${v.slug}/${v.variant}`, { waitUntil: "networkidle" });
                await page.evaluate(() => document.documentElement.classList.remove("dark-mode"));
                await page.waitForTimeout(250);
                png = await page.screenshot({ type: "png" });
            } catch (error) {
                lastError = error;
            }
        }
        if (!png) {
            console.error(`shots:thumbs — giving up on ${v.section}/${v.slug}/${v.variant}:`, lastError);
            continue;
        }

        const base = path.join(dir, v.variant);
        if (toWebp) {
            await toWebp(png, `${base}.webp`);
            if (existsSync(`${base}.png`)) unlinkSync(`${base}.png`);
        } else {
            const { writeFileSync } = await import("node:fs");
            writeFileSync(`${base}.png`, png);
        }
        console.log(`${v.section}/${v.slug}/${v.variant}`);
    }

    await browser.close();
};

run();
