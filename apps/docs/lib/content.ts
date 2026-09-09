import { existsSync, readFileSync, readdirSync } from "node:fs";
import path from "node:path";

/**
 * Server-only helpers over `apps/docs/content/**.mdx`.
 *
 * The MDX modules themselves export their front-matter (remark-mdx-frontmatter), but the
 * sidebar, the search index, the sitemap and `generateStaticParams` need the whole set
 * without importing every module, so they read it straight off disk.
 */

/** Content directories, one per URL area. */
export const AREAS = ["docs", "integrations", "components", "marketing"] as const;
export type Area = (typeof AREAS)[number];

/** `section` front-matter values, used to place a page in the sidebar. */
export const SECTIONS = ["base", "application", "app-examples", "marketing", "marketing-examples"] as const;
export type Section = (typeof SECTIONS)[number];

export type Frontmatter = {
    title: string;
    section?: Section;
    description?: string;
    metaTitle?: string;
    metaDescription?: string;
    install?: string;
    source?: string;
    demoFile?: string;
    figma?: string;
};

export type ContentPage = {
    area: Area;
    slug: string;
    href: string;
    filePath: string;
    frontmatter: Frontmatter;
};

const appRoot = () => {
    const cwd = process.cwd();
    if (existsSync(path.join(cwd, "content"))) return cwd;
    return path.join(cwd, "apps", "docs");
};

/** Repository root, so we can read `packages/**` at build time. */
export const repoRoot = () => path.resolve(appRoot(), "..", "..");

export const contentDir = (area: Area) => path.join(appRoot(), "content", area);

const unquote = (value: string) =>
    value
        .trim()
        .replace(/^["']|["']$/g, "")
        .trim();

/** Minimal front-matter reader — the contract in AGENT-BRIEF §5 is scalar keys only. */
export const parseFrontmatter = (source: string): Record<string, string> => {
    const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---/);
    if (!match?.[1]) return {};

    const result: Record<string, string> = {};
    for (const line of match[1].split(/\r?\n/)) {
        if (!line.trim() || line.trimStart().startsWith("#")) continue;
        const separator = line.indexOf(":");
        if (separator === -1) continue;
        const key = line.slice(0, separator).trim();
        const value = unquote(line.slice(separator + 1));
        if (key && value) result[key] = value;
    }
    return result;
};

const toFrontmatter = (raw: Record<string, string>, fallbackTitle: string): Frontmatter => ({
    ...raw,
    title: raw.title ?? fallbackTitle,
    section: SECTIONS.find((section) => section === raw.section),
});

export const hrefFor = (area: Area, slug: string) => `/${area}/${slug}`;

/** Every MDX page in one area, sorted by title. */
export const getContentPages = (area: Area): ContentPage[] => {
    const dir = contentDir(area);
    if (!existsSync(dir)) return [];

    return readdirSync(dir)
        .filter((file) => file.endsWith(".mdx"))
        .map((file) => {
            const slug = file.replace(/\.mdx$/, "");
            const filePath = path.join(dir, file);
            return {
                area,
                slug,
                href: hrefFor(area, slug),
                filePath,
                frontmatter: toFrontmatter(parseFrontmatter(readFileSync(filePath, "utf8")), slug),
            };
        })
        .sort((a, b) => a.frontmatter.title.localeCompare(b.frontmatter.title));
};

export const getAllContentPages = (): ContentPage[] => AREAS.flatMap(getContentPages);

export const getContentPage = (area: Area, slug: string): ContentPage | undefined => getContentPages(area).find((page) => page.slug === slug);

/** Raw MDX text, used by the `.md` route handlers and the search index. */
export const readMdxSource = (area: Area, slug: string): string | undefined => {
    const filePath = path.join(contentDir(area), `${slug}.mdx`);
    return existsSync(filePath) ? readFileSync(filePath, "utf8") : undefined;
};

/** MDX body with the front-matter block removed. */
export const stripFrontmatter = (source: string) => source.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/, "");
