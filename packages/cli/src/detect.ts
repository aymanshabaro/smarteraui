/**
 * Auto-detection for `init`: framework, TypeScript, `src/`, the `@/` alias from
 * tsconfig paths, Tailwind version and the package manager.
 *
 * Spec: docs/cli.md ("Auto-detection rules").
 */
import { existsSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

export type Framework = "next-app" | "next-pages" | "vite" | "remix" | "react";
export type PackageManager = "pnpm" | "npm" | "yarn" | "bun";

export interface ProjectInfo {
    cwd: string;
    framework: Framework;
    typescript: boolean;
    /** True when application source lives under `src/`. */
    srcDir: boolean;
    /** Import prefix the project already uses, e.g. `@/`. Always ends with `/`. */
    aliasPrefix: string;
    /** Absolute directory `aliasPrefix` maps to. */
    aliasBase: string;
    /** False when no tsconfig/jsconfig `paths` entry backs `aliasPrefix`. */
    aliasDeclared: boolean;
    /** Tailwind major version, or null when Tailwind is not installed yet. */
    tailwindVersion: number | null;
    /** Existing global stylesheet, relative to cwd, or null when none was found. */
    cssFile: string | null;
    packageManager: PackageManager;
}

export const FRAMEWORK_LABEL: Record<Framework, string> = {
    "next-app": "Next.js (App Router)",
    "next-pages": "Next.js (Pages Router)",
    vite: "Vite",
    remix: "Remix",
    react: "React",
};

const isFile = (target: string) => existsSync(target) && statSync(target).isFile();
const isDir = (target: string) => existsSync(target) && statSync(target).isDirectory();

/** Strips `//` and block comments plus trailing commas so tsconfig.json parses as JSON. */
export function parseJsonc<T>(source: string): T | null {
    const withoutComments = source
        .replace(/\\"|"(?:\\"|[^"])*"|(\/\/.*$)|(\/\*[\s\S]*?\*\/)/gm, (match, lineComment, blockComment) => (lineComment || blockComment ? "" : match))
        .replace(/,(\s*[}\]])/g, "$1");
    try {
        return JSON.parse(withoutComments) as T;
    } catch {
        return null;
    }
}

function readJsonc<T>(file: string): T | null {
    if (!isFile(file)) return null;
    return parseJsonc<T>(readFileSync(file, "utf8"));
}

export interface PackageJson {
    dependencies?: Record<string, string>;
    devDependencies?: Record<string, string>;
    peerDependencies?: Record<string, string>;
}

export function readPackageJson(cwd: string): PackageJson | null {
    return readJsonc<PackageJson>(path.join(cwd, "package.json"));
}

export function allDependencies(pkg: PackageJson | null): Record<string, string> {
    return { ...pkg?.dependencies, ...pkg?.devDependencies, ...pkg?.peerDependencies };
}

interface TsConfig {
    extends?: string;
    compilerOptions?: { baseUrl?: string; paths?: Record<string, string[]> };
    references?: { path: string }[];
}

/**
 * Collects tsconfig-like files worth inspecting: the root config, anything it extends
 * or references (Vite's `tsconfig.app.json` split), and jsconfig.json.
 */
function tsConfigChain(cwd: string): { file: string; config: TsConfig }[] {
    const found: { file: string; config: TsConfig }[] = [];
    const seen = new Set<string>();

    const visit = (file: string, depth: number) => {
        const resolved = path.resolve(file);
        if (depth > 4 || seen.has(resolved)) return;
        seen.add(resolved);
        const config = readJsonc<TsConfig>(resolved);
        if (!config) return;
        found.push({ file: resolved, config });
        const dir = path.dirname(resolved);
        if (config.extends && config.extends.startsWith(".")) {
            const target = config.extends.endsWith(".json") ? config.extends : `${config.extends}.json`;
            visit(path.join(dir, target), depth + 1);
        }
        for (const reference of config.references ?? []) {
            const target = path.join(dir, reference.path);
            visit(isDir(target) ? path.join(target, "tsconfig.json") : target, depth + 1);
        }
    };

    visit(path.join(cwd, "tsconfig.json"), 0);
    visit(path.join(cwd, "tsconfig.app.json"), 0);
    visit(path.join(cwd, "jsconfig.json"), 0);
    return found;
}

export interface DetectedAlias {
    prefix: string;
    base: string;
    declared: boolean;
}

/**
 * Reads the first wildcard `paths` entry (preferring `@/*`) and turns it into an import
 * prefix plus the absolute directory it points at.
 */
export function detectAlias(cwd: string, srcDir: boolean): DetectedAlias {
    const candidates: { prefix: string; base: string }[] = [];

    for (const { file, config } of tsConfigChain(cwd)) {
        const paths = config.compilerOptions?.paths;
        if (!paths) continue;
        const configDir = path.dirname(file);
        const baseUrl = config.compilerOptions?.baseUrl ?? ".";
        for (const [pattern, targets] of Object.entries(paths)) {
            const target = targets[0];
            if (!pattern.endsWith("/*") || !target || !target.endsWith("/*")) continue;
            candidates.push({
                prefix: `${pattern.slice(0, -1)}`,
                base: path.resolve(configDir, baseUrl, target.slice(0, -2)),
            });
        }
    }

    const preferred = candidates.find((candidate) => candidate.prefix === "@/") ?? candidates[0];
    if (preferred) return { ...preferred, declared: true };

    return { prefix: "@/", base: path.join(cwd, srcDir ? "src" : "."), declared: false };
}

function detectFramework(cwd: string, deps: Record<string, string>): Framework {
    if (deps["@remix-run/react"] || deps["@react-router/dev"]) return "remix";
    if (deps.next || isFile(path.join(cwd, "next.config.ts")) || isFile(path.join(cwd, "next.config.js")) || isFile(path.join(cwd, "next.config.mjs"))) {
        if (isDir(path.join(cwd, "app")) || isDir(path.join(cwd, "src", "app"))) return "next-app";
        if (isDir(path.join(cwd, "pages")) || isDir(path.join(cwd, "src", "pages"))) return "next-pages";
        return "next-app";
    }
    const viteConfig = ["vite.config.ts", "vite.config.js", "vite.config.mts", "vite.config.mjs"].some((name) => isFile(path.join(cwd, name)));
    if (deps.vite || viteConfig) return "vite";
    return "react";
}

/** First integer in a semver range, ignoring `^`, `~`, `>=` and friends. */
export function majorVersion(range: string | undefined): number | null {
    if (!range) return null;
    const match = /(\d+)\./.exec(range) ?? /(\d+)/.exec(range);
    return match?.[1] ? Number(match[1]) : null;
}

function detectTailwindVersion(cwd: string, deps: Record<string, string>): number | null {
    const installed = readJsonc<{ version?: string }>(path.join(cwd, "node_modules", "tailwindcss", "package.json"));
    return majorVersion(installed?.version) ?? majorVersion(deps.tailwindcss);
}

const CSS_CANDIDATES = [
    "app/globals.css",
    "src/app/globals.css",
    "src/styles/globals.css",
    "styles/globals.css",
    "src/index.css",
    "src/main.css",
    "src/App.css",
    "src/global.css",
    "app/global.css",
];

function detectCssFile(cwd: string): string | null {
    return CSS_CANDIDATES.find((candidate) => isFile(path.join(cwd, candidate))) ?? null;
}

/** Default stylesheet location when the project has none yet. */
export function defaultCssFile(framework: Framework, srcDir: boolean): string {
    if (framework === "next-app") return srcDir ? "src/app/globals.css" : "app/globals.css";
    if (framework === "next-pages") return srcDir ? "src/styles/globals.css" : "styles/globals.css";
    return "src/index.css";
}

const LOCKFILES: [string, PackageManager][] = [
    ["pnpm-lock.yaml", "pnpm"],
    ["bun.lockb", "bun"],
    ["bun.lock", "bun"],
    ["yarn.lock", "yarn"],
    ["package-lock.json", "npm"],
];

/** Walks up from `cwd` so workspace packages inherit the root lockfile's manager. */
export function detectPackageManager(cwd: string): PackageManager {
    let dir = path.resolve(cwd);
    for (;;) {
        for (const [lockfile, manager] of LOCKFILES) {
            if (isFile(path.join(dir, lockfile))) return manager;
        }
        const parent = path.dirname(dir);
        if (parent === dir) return "npm";
        dir = parent;
    }
}

export function detectProject(cwd: string, frameworkOverride?: Framework): ProjectInfo {
    const pkg = readPackageJson(cwd);
    const deps = allDependencies(pkg);
    const srcDir = isDir(path.join(cwd, "src"));
    const alias = detectAlias(cwd, srcDir);

    return {
        cwd,
        framework: frameworkOverride ?? detectFramework(cwd, deps),
        typescript: isFile(path.join(cwd, "tsconfig.json")) || Boolean(deps.typescript),
        srcDir,
        aliasPrefix: alias.prefix,
        aliasBase: alias.base,
        aliasDeclared: alias.declared,
        tailwindVersion: detectTailwindVersion(cwd, deps),
        cssFile: detectCssFile(cwd),
        packageManager: detectPackageManager(cwd),
    };
}
