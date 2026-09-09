/**
 * Screenshots docs pages for visual parity against docs/spec/reference/screenshots.
 *   pnpm docs:shot <slug>      one page
 *   pnpm docs:shot --all       every page in the nav
 * Writes .shots/<section>/<slug>/{page,<example-id>}[-dark].png at 1600x1000.
 */
import { existsSync, mkdirSync, readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { chromium } from "playwright";
import { nav } from "../apps/docs/lib/nav";

const BASE = process.env.DOCS_URL ?? "http://localhost:3000";
const args = process.argv.slice(2);
const all = args.includes("--all");
const only = args.find((a) => !a.startsWith("--"));

const CONTENT = path.resolve("apps/docs/content");

/** Content areas whose pages are screenshotted, and the fallback section name per area. */
const AREAS: { dir: string; route: string; fallbackSection: string }[] = [
    { dir: "docs", route: "/docs", fallbackSection: "docs" },
    { dir: "integrations", route: "/integrations", fallbackSection: "integrations" },
    { dir: "components", route: "/components", fallbackSection: "base" },
    { dir: "marketing", route: "/marketing", fallbackSection: "marketing" },
];

const frontmatterSection = (file: string) => readFileSync(file, "utf8").match(/^---[\s\S]*?\nsection:\s*([\w-]+)/)?.[1];

/** Every MDX page on disk, keyed by its route so the generated nav can order them. */
const fromContent = () =>
    AREAS.flatMap(({ dir, route, fallbackSection }) => {
        const areaDir = path.join(CONTENT, dir);
        if (!existsSync(areaDir)) return [];
        return readdirSync(areaDir)
            .filter((file) => file.endsWith(".mdx"))
            .map((file) => {
                const slug = file.replace(/\.mdx$/, "");
                return {
                    section: frontmatterSection(path.join(areaDir, file)) ?? fallbackSection,
                    slug,
                    url: `${route}/${slug}`,
                };
            });
    });

const byUrl = new Map(fromContent().map((page) => [page.url, page]));

/** `lib/nav.ts` fixes the order; anything it does not know about is appended. */
const navUrls = nav.flatMap((group) => group.items.map((item) => item.href));
const pages = [
    ...navUrls.flatMap((href) => {
        const page = byUrl.get(href);
        return page ? [page] : [];
    }),
    ...[...byUrl.values()].filter((page) => !navUrls.includes(page.url)),
];

const run = async () => {
    const selected = pages.filter((p) => all || p.slug === only);
    if (!selected.length) {
        console.error(only ? `docs:shot — no page matches "${only}"` : "docs:shot — pass a slug or --all");
        process.exitCode = 1;
        return;
    }

    const browser = await chromium.launch();
    const ctx = await browser.newContext({ viewport: { width: 1600, height: 1000 }, deviceScaleFactor: 1 });
    const page = await ctx.newPage();
    for (const p of selected) {
        for (const dark of [false, true]) {
            const dir = path.join(".shots", p.section, p.slug);
            mkdirSync(dir, { recursive: true });
            await page.goto(BASE + p.url, { waitUntil: "networkidle" });
            await page.evaluate((d) => document.documentElement.classList.toggle("dark-mode", d), dark);
            await page.waitForTimeout(300);
            const s = dark ? "-dark" : "";
            await page.screenshot({ path: path.join(dir, `page${s}.png`), fullPage: true });
            for (const el of await page.$$("[data-preview]")) {
                const id = await el.getAttribute("id");
                if (!id) continue;
                await el.scrollIntoViewIfNeeded();
                await el.screenshot({ path: path.join(dir, `${id}${s}.png`) });
            }
            console.log(`${p.section}/${p.slug}${s}`);
        }
    }
    await browser.close();
};

run();
