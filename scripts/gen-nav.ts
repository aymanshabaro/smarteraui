/**
 * Rebuilds apps/docs/lib/nav.ts from apps/docs/content/**.mdx front-matter.
 * Group order is fixed by the spec (docs/spec/00-foundation/08-docs-site.md).
 */
import { existsSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import path from "node:path";

const CONTENT = path.resolve("apps/docs/content");

const GROUPS: { title: string; dir: string; route: string; filter?: (slug: string) => boolean }[] = [
    { title: "Documentation", dir: "docs", route: "/docs" },
    { title: "Integrations", dir: "integrations", route: "/integrations" },
    { title: "Base components", dir: "components", route: "/components" },
    { title: "Application UI components", dir: "components", route: "/components" },
    { title: "Marketing components", dir: "marketing", route: "/marketing" },
];

const frontTitle = (file: string) => {
    const src = readFileSync(file, "utf8");
    const m = src.match(/^---[\s\S]*?\ntitle:\s*(.+)\n/);
    return m ? m[1].replace(/^["']|["']$/g, "").trim() : path.basename(file, ".mdx");
};

const out: string[] = [
    "// GENERATED FILE — do not edit by hand. Run `pnpm gen:nav`.",
    "export type NavItem = { title: string; href: string };",
    "export type NavGroup = { title: string; items: NavItem[]; collapsible?: boolean };",
    "",
    "export const nav: NavGroup[] = [",
];

for (const g of GROUPS) {
    const dir = path.join(CONTENT, g.dir);
    if (!existsSync(dir)) continue;
    const items = readdirSync(dir)
        .filter((f) => f.endsWith(".mdx"))
        .map((f) => ({ slug: f.replace(/\.mdx$/, ""), title: frontTitle(path.join(dir, f)) }))
        .sort((a, b) => a.title.localeCompare(b.title));
    if (!items.length) continue;
    out.push(`    { title: ${JSON.stringify(g.title)}, items: [`);
    for (const it of items) out.push(`        { title: ${JSON.stringify(it.title)}, href: "${g.route}/${it.slug}" },`);
    out.push("    ] },");
}
out.push("];", "");
writeFileSync(path.resolve("apps/docs/lib/nav.ts"), out.join("\n"));
console.log("gen:nav — nav.ts rebuilt");
