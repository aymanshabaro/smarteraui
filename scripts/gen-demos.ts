/**
 * Rebuilds apps/docs/lib/demos.ts: a map of "<slug>:<ExportName>" -> demo component,
 * by scanning every *.demo.tsx in the library. <Preview demo="PillColor" /> resolves through this.
 */
import { readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import path from "node:path";

const SRC = path.resolve("packages/ui/src/components");
const walk = (dir: string): string[] =>
    readdirSync(dir).flatMap((e) => {
        const full = path.join(dir, e);
        return statSync(full).isDirectory() ? walk(full) : full.endsWith(".demo.tsx") ? [full] : [];
    });

const imports: string[] = [];
const entries: string[] = [];
let i = 0;
for (const file of walk(SRC).sort()) {
    const rel = "@properui/ui/components/" + path.relative(SRC, file).replace(/\.tsx$/, "");
    const ns = `d${i++}`;
    imports.push(`import * as ${ns} from "${rel}";`);
    const slug = path.basename(file, ".demo.tsx");
    const src = readFileSync(file, "utf8");
    for (const m of src.matchAll(/export const ([A-Z]\w*)\s*[:=]/g)) {
        entries.push(`    "${slug}:${m[1]}": ${ns}.${m[1]} as ComponentType,`);
    }
}

writeFileSync(
    path.resolve("apps/docs/lib/demos.ts"),
    [
        "// GENERATED FILE — do not edit by hand. Run `pnpm gen:demos`.",
        'import type { ComponentType } from "react";',
        ...imports,
        "",
        "export const demos: Record<string, ComponentType> = {",
        ...entries,
        "};",
        "",
    ].join("\n"),
);
console.log(`gen:demos — ${entries.length} demo exports`);
