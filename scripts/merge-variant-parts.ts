/**
 * Merges `variants.<part>.ts` files (written by the parallel marketing/page agents) into the
 * folder's `variants.ts`, which `gen-variants.ts` reads. Orchestrator-only: pnpm gen:variant-parts
 *
 * Keys are emitted explicitly (not spread) because `gen-variants.ts` parses this file statically
 * with a regex and cannot resolve `...variantsA`.
 */
import { existsSync, readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import path from "node:path";

const ROOT = path.resolve("packages/ui/src/components");
const LAYERS = ["marketing", "app-examples", "marketing-examples"];

/** Reads the quoted keys of `export const variantsX = { "…": … }` without executing the module. */
const keysOf = (source: string): string[] => {
    const block = source.match(/export\s+const\s+variants[A-Z]\s*=\s*\{([\s\S]*?)\}\s*as\s+const/);
    if (!block) return [];
    return [...block[1].matchAll(/["'`]([^"'`]+)["'`]\s*:/g)].map((m) => m[1]);
};

let merged = 0;
let totalKeys = 0;
for (const layer of LAYERS) {
    const dir = path.join(ROOT, layer);
    if (!existsSync(dir)) continue;
    for (const group of readdirSync(dir)) {
        const folder = path.join(dir, group);
        if (!statSync(folder).isDirectory()) continue;
        const parts = readdirSync(folder)
            .filter((f) => /^variants\.[a-z]\.ts$/.test(f))
            .sort();
        if (!parts.length) continue;

        const imports: string[] = [];
        const entries: string[] = [];
        for (const file of parts) {
            const part = file.slice("variants.".length, -3);
            const name = `variants${part.toUpperCase()}`;
            imports.push(`import { ${name} } from "./variants.${part}";`);
            for (const key of keysOf(readFileSync(path.join(folder, file), "utf8"))) {
                entries.push(`    "${key}": ${name}["${key}"],`);
            }
        }
        if (!entries.length) {
            console.warn(`  ! ${layer}/${group}: no variant keys parsed from ${parts.join(", ")}`);
            continue;
        }
        writeFileSync(
            path.join(folder, "variants.ts"),
            [
                "// GENERATED FILE — do not edit by hand. Run `pnpm gen:variant-parts`.",
                ...imports,
                "",
                "export const variants = {",
                ...entries,
                "} as const;",
                "",
            ].join("\n"),
        );
        merged++;
        totalKeys += entries.length;
    }
}
console.log(`gen:variant-parts — ${merged} folder(s), ${totalKeys} variants`);
