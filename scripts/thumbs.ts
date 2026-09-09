/**
 * Renders our own gallery thumbnails for every section/page variant
 * (never ship docs/spec/reference/thumbs — those are the reference's).
 * Renders /preview/variant/<section>/<slug>/<variant> at 1440x900, light + dark,
 * and writes apps/docs/public/thumbs/<section>/<slug>/<variant>[-dark].{webp,png}
 *
 * Playwright can only encode PNG/JPEG, so WebP is produced only when `sharp` is
 * already installed; otherwise PNG is written and <VariantGrid> falls back to it.
 */
import { existsSync, mkdirSync, readFileSync, unlinkSync } from "node:fs";
import path from "node:path";
import { chromium } from "playwright";

const BASE = process.env.DOCS_URL ?? "http://localhost:3000";
const OUT = path.resolve("apps/docs/public/thumbs");
const VARIANTS_FILE = path.resolve("apps/docs/lib/variants.ts");

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

/** Only used when `sharp` is already a dependency; never installed by this script. */
const loadWebpEncoder = async (): Promise<Encoder> => {
    try {
        const sharp = (await import("sharp")).default as unknown as (input: Buffer) => {
            webp: (o: { quality: number }) => { toFile: (p: string) => Promise<unknown> };
        };
        return async (png, to) => {
            await sharp(png).webp({ quality: 82 }).toFile(to);
        };
    } catch {
        return undefined;
    }
};

const run = async () => {
    const variants = readVariants();
    if (!variants.length) {
        console.log("shots:thumbs — no variants generated yet; run `pnpm gen:variants` first");
        return;
    }

    const toWebp = await loadWebpEncoder();
    const browser = await chromium.launch();
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
    const page = await ctx.newPage();

    for (const v of variants) {
        for (const dark of [false, true]) {
            const dir = path.join(OUT, v.section, v.slug);
            mkdirSync(dir, { recursive: true });

            await page.goto(`${BASE}/preview/variant/${v.section}/${v.slug}/${v.variant}`, { waitUntil: "networkidle" });
            await page.evaluate((d) => document.documentElement.classList.toggle("dark-mode", d), dark);
            await page.waitForTimeout(250);

            const base = path.join(dir, `${v.variant}${dark ? "-dark" : ""}`);
            const png = await page.screenshot({ type: "png" });

            if (toWebp) {
                await toWebp(png, `${base}.webp`);
                if (existsSync(`${base}.png`)) unlinkSync(`${base}.png`);
            } else {
                await page.screenshot({ path: `${base}.png`, type: "png" });
            }
            console.log(`${v.section}/${v.slug}/${v.variant}${dark ? "-dark" : ""}`);
        }
    }

    await browser.close();
};

run();
