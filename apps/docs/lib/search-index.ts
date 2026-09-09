import { getAllContentPages, readMdxSource } from "./content";
import { getSiteNav } from "./site-nav";

/**
 * Build-time index for the ⌘K menu: every MDX page plus every `<Preview>` inside it,
 * grouped by the sidebar group the page belongs to.
 */

export type SearchEntry = {
    id: string;
    title: string;
    href: string;
    group: string;
    description?: string;
};

const PREVIEW_TAG = /<Preview\b[^>]*>/g;
const attribute = (tag: string, name: string) => tag.match(new RegExp(`${name}=["']([^"']+)["']`))?.[1];

export const getSearchIndex = (): SearchEntry[] => {
    const nav = getSiteNav();
    const groupOf = new Map<string, string>();
    for (const group of nav) {
        for (const item of group.items) {
            groupOf.set(item.href, group.title);
            for (const child of item.items ?? []) groupOf.set(child.href, group.title);
        }
    }

    // Ids double as React keys, and a page may repeat a `<Preview id>`, so keep the first.
    const seen = new Set<string>();
    const entries: SearchEntry[] = [];
    const push = (entry: SearchEntry) => {
        if (seen.has(entry.id)) return;
        seen.add(entry.id);
        entries.push(entry);
    };

    for (const page of getAllContentPages()) {
        const group = groupOf.get(page.href) ?? "Documentation";
        push({
            id: page.href,
            title: page.frontmatter.title,
            href: page.href,
            group,
            description: page.frontmatter.description,
        });

        const source = readMdxSource(page.area, page.slug) ?? "";
        for (const match of source.matchAll(PREVIEW_TAG)) {
            const id = attribute(match[0], "id");
            const title = attribute(match[0], "title");
            if (!id || !title) continue;
            push({ id: `${page.href}#${id}`, title, href: `${page.href}#${id}`, group: page.frontmatter.title });
        }
    }

    return entries;
};
