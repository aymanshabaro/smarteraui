import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { repoRoot } from "./content";

/**
 * Reads the source of one demo export out of the library so the Preview block's
 * "Code" tab shows real, copy-pasteable code (spec 08-docs-site.md § Preview block).
 */

const COMPONENTS_DIR = () => path.join(repoRoot(), "packages", "ui", "src", "components");

const fileCache = new Map<string, string | undefined>();

const walk = (dir: string): string[] => {
    if (!existsSync(dir)) return [];
    return readdirSync(dir).flatMap((entry) => {
        const full = path.join(dir, entry);
        return statSync(full).isDirectory() ? walk(full) : [full];
    });
};

/** Absolute path of `<demoFile>.demo.tsx`, wherever it lives under components/. */
export const findDemoFile = (demoFile: string): string | undefined => {
    const cached = fileCache.get(demoFile);
    if (cached !== undefined || fileCache.has(demoFile)) return cached;

    const found = walk(COMPONENTS_DIR()).find((file) => path.basename(file) === `${demoFile}.demo.tsx`);
    fileCache.set(demoFile, found);
    return found;
};

const extractImports = (source: string) => source.match(/^import[\s\S]*?from\s*["'][^"']*["'];?/gm) ?? [];

/**
 * Slices `export const <name> = …` up to the semicolon that closes it, ignoring
 * delimiters that appear inside strings, template literals, comments or regexes.
 */
const extractStatement = (source: string, name: string): string | undefined => {
    const start = source.search(new RegExp(`^export\\s+const\\s+${name}\\b`, "m"));
    if (start === -1) return undefined;

    let depth = 0;
    let index = start;
    let quote: string | undefined;

    while (index < source.length) {
        const char = source[index];
        const next = source[index + 1];

        if (quote) {
            if (char === "\\") index += 1;
            else if (char === quote) quote = undefined;
            index += 1;
            continue;
        }

        if (char === "/" && next === "/") {
            index = source.indexOf("\n", index);
            if (index === -1) break;
            continue;
        }
        if (char === "/" && next === "*") {
            const end = source.indexOf("*/", index + 2);
            index = end === -1 ? source.length : end + 2;
            continue;
        }
        if (char === '"' || char === "'" || char === "`") {
            quote = char;
            index += 1;
            continue;
        }
        if (char === "{" || char === "(" || char === "[") depth += 1;
        if (char === "}" || char === ")" || char === "]") depth -= 1;
        if (char === ";" && depth === 0) return source.slice(start, index + 1);

        index += 1;
    }

    return source.slice(start);
};

export type DemoSource = { code: string; filePath: string };

/** `demo` is always `"<demoFile>:<Export>"`; returns undefined when either half is missing. */
export const getDemoSource = (demoKey: string): DemoSource | undefined => {
    const [demoFile, exportName] = demoKey.split(":");
    if (!demoFile || !exportName) return undefined;

    const filePath = findDemoFile(demoFile);
    if (!filePath) return undefined;

    const source = readFileSync(filePath, "utf8");
    const statement = extractStatement(source, exportName);
    if (!statement) return undefined;

    const imports = extractImports(source);
    const code = [imports.join("\n"), statement].filter(Boolean).join("\n\n");
    return { code: `${code.trim()}\n`, filePath: path.relative(repoRoot(), filePath) };
};
