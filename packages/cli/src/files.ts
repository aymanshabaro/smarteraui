/**
 * Target resolution, `@/` import rewriting and idempotent writes.
 *
 * Registry file targets are relative to the project's alias base:
 *   components/base/badges/badges.tsx · utils/cx.ts · hooks/use-clipboard.ts · styles/theme.css
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import type { ComponentsConfig } from "./config.js";
import { aliasPrefixOf } from "./config.js";
import type { RegistryFile } from "./registry.js";

/** Matches the module specifier of `from "…"`, `import "…"`, `import("…")` and `require("…")`. */
const IMPORT_SPECIFIER = /((?:\bfrom\s+)|(?:\bimport\s+)|(?:\bimport\s*\(\s*)|(?:\brequire\s*\(\s*))(["'])([^"']+)\2/g;

/**
 * Rewrites the library's own `@/` imports to the consuming project's alias.
 * A no-op when the project also uses `@/`.
 */
export function rewriteImports(content: string, aliasPrefix: string): string {
    if (aliasPrefix === "@/") return content;
    return content.replace(IMPORT_SPECIFIER, (match, lead: string, quote: string, specifier: string) =>
        specifier.startsWith("@/") ? `${lead}${quote}${aliasPrefix}${specifier.slice(2)}${quote}` : match,
    );
}

export interface ResolveOptions {
    cwd: string;
    /** Absolute directory the project alias points at. */
    aliasBase: string;
    /** `--path <dir>`, relative to cwd, overriding where `components/**` files land. */
    pathOverride?: string;
}

/** Absolute destination for one registry file. */
export function resolveTarget(file: RegistryFile, options: ResolveOptions): string {
    const target = file.target.replace(/^\.?\//, "");
    if (options.pathOverride && target.startsWith("components/")) {
        return path.resolve(options.cwd, options.pathOverride, target.slice("components/".length));
    }
    return path.resolve(options.aliasBase, target);
}

export type WriteStatus = "created" | "updated" | "unchanged" | "skipped";

export interface WriteResult {
    /** Absolute path written (or that would have been written). */
    file: string;
    /** Path relative to cwd, for printing. */
    relative: string;
    status: WriteStatus;
}

export interface WriteFileOptions {
    cwd: string;
    overwrite: boolean;
    dryRun: boolean;
}

/**
 * Writes `content` to `file`, reporting what it did. Existing files are left alone unless
 * `--overwrite` is set, which is what makes a second `add` a no-op.
 */
export function writeSourceFile(file: string, content: string, options: WriteFileOptions): WriteResult {
    const relative = path.relative(options.cwd, file) || path.basename(file);
    const exists = existsSync(file);

    if (exists) {
        const current = readFileSync(file, "utf8");
        if (current === content) return { file, relative, status: "unchanged" };
        if (!options.overwrite) return { file, relative, status: "skipped" };
    }

    if (!options.dryRun) {
        mkdirSync(path.dirname(file), { recursive: true });
        writeFileSync(file, content, "utf8");
    }
    return { file, relative, status: exists ? "updated" : "created" };
}

/** `.tsx` → `.jsx` for the (rare) JavaScript project. Types are not stripped — see init's warning. */
export function targetForLanguage(target: string, tsx: boolean): string {
    if (tsx) return target;
    return target.replace(/\.tsx$/, ".jsx").replace(/\.ts$/, ".js");
}

/** Prepares one registry file for the project: language-adjusted target + rewritten imports. */
export function prepareFile(file: RegistryFile, config: ComponentsConfig, options: ResolveOptions): { target: string; content: string } {
    const aliasPrefix = aliasPrefixOf(config.aliases.components);
    const adjusted: RegistryFile = { ...file, target: targetForLanguage(file.target, config.tsx) };
    return {
        target: resolveTarget(adjusted, options),
        content: rewriteImports(file.content, aliasPrefix),
    };
}
