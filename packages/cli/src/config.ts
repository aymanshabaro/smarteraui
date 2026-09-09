/**
 * `components.json` — written by `init`, read by every other command.
 * Shape is fixed by docs/cli.md.
 */
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { detectAlias, parseJsonc } from "./detect.js";

export const CONFIG_FILE = "components.json";
export const CONFIG_SCHEMA_URL = "https://smarteraui.com/schema.json";

export interface ComponentsConfig {
    $schema: string;
    style: string;
    tsx: boolean;
    tailwind: {
        /** Global stylesheet, relative to the project root. */
        css: string;
        /** Theme token file, relative to the project root. */
        theme: string;
        prefix: string;
    };
    aliases: {
        components: string;
        utils: string;
        ui: string;
        hooks: string;
    };
    registry: string;
}

export function configPath(cwd: string): string {
    return path.join(cwd, CONFIG_FILE);
}

export function readConfig(cwd: string): ComponentsConfig | null {
    const file = configPath(cwd);
    if (!existsSync(file)) return null;
    const parsed = parseJsonc<ComponentsConfig>(readFileSync(file, "utf8"));
    if (!parsed?.aliases?.components) return null;
    return parsed;
}

export function writeConfig(cwd: string, config: ComponentsConfig): string {
    const file = configPath(cwd);
    writeFileSync(file, `${JSON.stringify(config, null, 2)}\n`, "utf8");
    return file;
}

/**
 * `@/components` → `@/`. Falls back to `@/` for aliases without a `/` (e.g. `~components`),
 * which the caller reports as un-rewritable.
 */
export function aliasPrefixOf(alias: string): string {
    const slash = alias.indexOf("/");
    return slash === -1 ? `${alias}/` : alias.slice(0, slash + 1);
}

/**
 * Absolute directory the config's aliases resolve to (`src/` in a typical Vite or
 * Next `src` project), re-derived from tsconfig paths on every run so the two cannot drift.
 */
export function aliasBaseDir(cwd: string, config: ComponentsConfig): string {
    const prefix = aliasPrefixOf(config.aliases.components);
    const detected = detectAlias(cwd, existsSync(path.join(cwd, "src")));
    if (detected.declared && detected.prefix === prefix) return detected.base;
    return path.join(cwd, existsSync(path.join(cwd, "src")) ? "src" : ".");
}
