/** "On this page" entries, derived from the MDX source at build time. */
export type TocEntry = { id: string; title: string; depth: 2 | 3 };

/** Same shape as rehype-slug's output for the headings we author. */
export const slugify = (text: string) =>
    text
        .trim()
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-");

const PREVIEW_TAG = /^<Preview\b[^>]*>/;
const attribute = (tag: string, name: string) => tag.match(new RegExp(`${name}=["']([^"']+)["']`))?.[1];

/**
 * h2/h3 headings plus the `<Preview>` blocks that no h3 speaks for, in document order —
 * this is exactly what the reference page's rail lists. A preview above the first `##`
 * (the hero example) is skipped, and so is one that sits under an `###`, because that
 * heading already names it.
 */
export const getToc = (source: string): TocEntry[] => {
    const entries: TocEntry[] = [];
    let inFence = false;
    let lastHeadingDepth: 2 | 3 | undefined;

    for (const rawLine of source.split(/\r?\n/)) {
        const line = rawLine.trim();

        if (line.startsWith("```")) {
            inFence = !inFence;
            continue;
        }
        if (inFence || !line) continue;

        const heading = line.match(/^(#{2,3})\s+(.+?)\s*$/);
        if (heading?.[1] && heading[2]) {
            lastHeadingDepth = heading[1].length === 2 ? 2 : 3;
            entries.push({ id: slugify(heading[2]), title: heading[2], depth: lastHeadingDepth });
            continue;
        }

        const preview = line.match(PREVIEW_TAG);
        if (preview && lastHeadingDepth === 2) {
            const id = attribute(preview[0], "id");
            const title = attribute(preview[0], "title");
            if (id && title) entries.push({ id, title, depth: 3 });
        }
    }

    return entries;
};
