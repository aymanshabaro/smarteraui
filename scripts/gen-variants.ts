/**
 * Rebuilds apps/docs/lib/variants.ts from every
 * packages/ui/src/components/{marketing,app-examples,marketing-examples}/<slug>/variants.ts
 * (each of which exports `variants = { "<variant-slug>": Component }`).
 *
 * The docs shell uses the result for <VariantGrid slug="…" /> and for the
 * /marketing/<slug>/<variant> and /components/<slug>/<variant> routes.
 */
import { existsSync, readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import path from "node:path";

const SECTIONS = ["marketing", "app-examples", "marketing-examples"] as const;

const SRC = path.resolve("packages/ui/src/components");
const OUT = path.resolve("apps/docs/lib/variants.ts");

/** "hero-split-image-01" -> "Hero Split Image 01" */
const titleCase = (slug: string) =>
    slug
        .split("-")
        .map((word) => (/^\d+$/.test(word) ? word : word.charAt(0).toUpperCase() + word.slice(1)))
        .join(" ");

/** Reads the keys of `export const variants = { "…": … }` without executing the module. */
const readVariantKeys = (file: string): string[] => {
    const source = readFileSync(file, "utf8");
    const block = source.match(/export\s+const\s+variants\s*=\s*\{([\s\S]*?)\}\s*as\s+const|export\s+const\s+variants\s*=\s*\{([\s\S]*?)\n\}/);
    const body = block?.[1] ?? block?.[2];
    if (!body) return [];
    return [...body.matchAll(/["']([a-z0-9-]+)["']\s*:/g)].map((match) => match[1]!);
};

const imports: string[] = [];
const groups = new Map<string, string[]>();
let index = 0;

for (const section of SECTIONS) {
    const sectionDir = path.join(SRC, section);
    if (!existsSync(sectionDir)) continue;

    for (const slug of readdirSync(sectionDir).sort()) {
        const dir = path.join(sectionDir, slug);
        if (!statSync(dir).isDirectory()) continue;

        const file = path.join(dir, "variants.ts");
        if (!existsSync(file)) continue;

        const keys = readVariantKeys(file);
        if (!keys.length) continue;

        const namespace = `v${index++}`;
        imports.push(`import { variants as ${namespace} } from "../../../packages/ui/src/components/${section}/${slug}/variants";`);

        const entries = keys.map(
            (variant) =>
                `    { slug: ${JSON.stringify(slug)}, variant: ${JSON.stringify(variant)}, title: ${JSON.stringify(titleCase(variant))}, ` +
                `section: ${JSON.stringify(section)}, component: ${namespace}[${JSON.stringify(variant)}] as ComponentType },`,
        );
        groups.set(slug, [...(groups.get(slug) ?? []), ...entries]);
    }
}

const body = [...groups.entries()].map(([slug, entries]) => [`    ${JSON.stringify(slug)}: [`, ...entries.map((e) => `    ${e}`), "    ],"].join("\n"));

writeFileSync(
    OUT,
    [
        "// GENERATED FILE — do not edit by hand. Run `pnpm gen:variants`.",
        'import type { ComponentType } from "react";',
        ...imports,
        "",
        "export type VariantEntry = {",
        "    slug: string;",
        "    variant: string;",
        "    title: string;",
        "    section: string;",
        "    component: ComponentType;",
        "};",
        "",
        "/** Every page/section variant, grouped by the docs page slug that shows them. */",
        ...(body.length
            ? ["export const variants: Record<string, VariantEntry[]> = {", ...body, "};"]
            : ["export const variants: Record<string, VariantEntry[]> = {};"]),
        "",
    ].join("\n"),
);

const total = [...groups.values()].reduce((sum, entries) => sum + entries.length, 0);
console.log(`gen:variants — ${total} variants across ${groups.size} pages`);
