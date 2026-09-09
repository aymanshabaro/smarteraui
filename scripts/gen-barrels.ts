/**
 * Regenerates packages/ui/src/index.ts from the component tree.
 * Owned by the orchestrator — component agents must never edit index.ts by hand.
 *
 * Uses the TypeScript compiler API to inspect each candidate module's real
 * exports (value vs. type-only) so the generated barrel type-checks: only
 * PascalCase, unambiguous names are re-exported explicitly.
 */
import { readdirSync, statSync, writeFileSync } from "node:fs";
import path from "node:path";
import ts from "typescript";

const UI_ROOT = path.resolve("packages/ui");
const SRC = path.join(UI_ROOT, "src");
const TSCONFIG_PATH = path.join(UI_ROOT, "tsconfig.json");
const LAYERS = ["base", "application", "marketing", "app-examples", "marketing-examples", "foundations", "shared-assets"];

const PASCAL_CASE = /^[A-Z][A-Za-z0-9]*$/;

const isCandidateFile = (full: string): boolean => {
    if (!full.endsWith(".tsx") && !full.endsWith(".ts")) return false;
    const base = path.basename(full);
    if (base === "index.ts" || base === "index.tsx") return false;
    if (full.split(path.sep).includes("internal")) return false;
    if (/\.(demo|story|test)\.tsx?$/.test(base)) return false;
    if (/variants(\.[a-z])?\.ts$/.test(base)) return false;
    if (/-data\.ts$/.test(base)) return false;
    if (/\.d\.ts$/.test(base)) return false;
    return true;
};

const walk = (dir: string): string[] =>
    readdirSync(dir).flatMap((entry) => {
        const full = path.join(dir, entry);
        if (statSync(full).isDirectory()) return walk(full);
        if (!isCandidateFile(full)) return [];
        return [full];
    });

const configFile = ts.readConfigFile(TSCONFIG_PATH, ts.sys.readFile);
if (configFile.error) {
    throw new Error(ts.flattenDiagnosticMessageText(configFile.error.messageText, "\n"));
}
const parsed = ts.parseJsonConfigFileContent(configFile.config, ts.sys, path.dirname(TSCONFIG_PATH));

const program = ts.createProgram({ rootNames: parsed.fileNames, options: parsed.options });
const checker = program.getTypeChecker();

type ModuleExports = { values: string[]; types: string[] };

const getModuleExports = (file: string): ModuleExports => {
    const sourceFile = program.getSourceFile(file);
    const empty: ModuleExports = { values: [], types: [] };
    if (!sourceFile) return empty;
    const moduleSymbol = checker.getSymbolAtLocation(sourceFile);
    if (!moduleSymbol) return empty;

    const values: string[] = [];
    const types: string[] = [];
    for (const symbol of checker.getExportsOfModule(moduleSymbol)) {
        const name = symbol.getName();
        if (!PASCAL_CASE.test(name)) continue;
        let resolved = symbol;
        if (resolved.flags & ts.SymbolFlags.Alias) {
            resolved = checker.getAliasedSymbol(resolved);
        }
        if (resolved.flags & ts.SymbolFlags.Value) {
            values.push(name);
        } else {
            types.push(name);
        }
    }
    return { values, types };
};

type ModuleInfo = { file: string; rel: string; values: string[]; types: string[] };

const modules: ModuleInfo[] = [];
for (const layer of LAYERS) {
    const dir = path.join(SRC, "components", layer);
    let files: string[] = [];
    try {
        files = walk(dir);
    } catch {
        continue;
    }
    for (const f of files) {
        const rel = "./" + path.relative(SRC, f).replace(/\.tsx?$/, "");
        const { values, types } = getModuleExports(f);
        modules.push({ file: f, rel, values, types });
    }
}

// Detect names exported by more than one module (value or type — either counts)
// and drop them from every module that exports them.
const nameToFiles = new Map<string, Set<string>>();
for (const mod of modules) {
    for (const name of [...mod.values, ...mod.types]) {
        if (!nameToFiles.has(name)) nameToFiles.set(name, new Set());
        nameToFiles.get(name)!.add(mod.file);
    }
}
const ambiguousNames = new Set<string>();
for (const [name, files] of nameToFiles) {
    if (files.size > 1) ambiguousNames.add(name);
}
for (const name of [...ambiguousNames].sort()) {
    const files = [...nameToFiles.get(name)!].map((f) => path.basename(f)).sort();
    console.warn(`gen:barrels — skipped ambiguous export ${name} (${files.join(", ")})`);
}

let valueCount = 0;
let typeCount = 0;

const lines: string[] = ["// GENERATED FILE — do not edit by hand. Run `pnpm gen:barrels`.", ""];
for (const layer of LAYERS) {
    const dir = path.join(SRC, "components", layer);
    const layerModules = modules.filter((m) => m.file.startsWith(dir + path.sep)).sort((a, b) => a.file.localeCompare(b.file));
    if (!layerModules.length) continue;

    const layerLines: string[] = [];
    for (const mod of layerModules) {
        const values = mod.values.filter((n) => !ambiguousNames.has(n)).sort();
        const types = mod.types.filter((n) => !ambiguousNames.has(n)).sort();
        if (values.length) {
            layerLines.push(`export { ${values.join(", ")} } from "${mod.rel}";`);
            valueCount += values.length;
        }
        if (types.length) {
            layerLines.push(`export type { ${types.join(", ")} } from "${mod.rel}";`);
            typeCount += types.length;
        }
    }
    if (!layerLines.length) continue;
    lines.push(`// ${layer}`);
    lines.push(...layerLines);
    lines.push("");
}

lines.push('export { useBreakpoint } from "./hooks/use-breakpoint";');
lines.push('export { cx, sortCx } from "./utils/cx";');
lines.push('export * from "./providers";');

writeFileSync(path.join(SRC, "index.ts"), lines.join("\n") + "\n");
console.log(`gen:barrels — ${valueCount} value exports, ${typeCount} type exports`);
