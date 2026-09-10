/**
 * Registry access for the CLI.
 *
 * A registry source is either an HTTP(S) base (`https://properui.dev/r`) or a
 * directory on disk (`packages/registry/dist`). Both expose the same shape:
 * `index.json` plus one `<name>.json` per entry.
 *
 * Spec: docs/cli.md
 */
import { existsSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { readAuthToken } from "./auth.js";

/** Fallback used when neither `--registry` nor `REGISTRY_URL` nor components.json says otherwise. */
export const DEFAULT_REGISTRY_URL = "https://properui.dev/r";

export type RegistryFileType = "component" | "util" | "hook" | "style";
export type RegistryEntryType = "component" | "example" | "util" | "hook" | "style";

export interface RegistryFile {
    /** Path inside `packages/ui/src`, e.g. `components/base/badges/badges.tsx`. */
    path: string;
    /** Path relative to the consuming project's alias base, e.g. `components/base/badges/badges.tsx`. */
    target: string;
    type: RegistryFileType;
    content: string;
}

/** Fields shared by `index.json` rows and full `<name>.json` entries. */
export interface RegistryMeta {
    name: string;
    layer: string;
    type: RegistryEntryType;
    title: string;
    description: string;
    registryDependencies: string[];
    dependencies: string[];
    cssVars: string[];
    examples: string[];
    docs?: string;
}

export interface RegistryIndexEntry extends RegistryMeta {
    fileCount: number;
}

export interface RegistryEntry extends RegistryMeta {
    files: RegistryFile[];
}

export interface RegistryIndex {
    $schema?: string;
    components: RegistryIndexEntry[];
}

export class RegistryError extends Error {}

const isHttp = (source: string) => /^https?:\/\//i.test(source);

/**
 * Picks the registry source, highest precedence first:
 * `--registry` flag, `REGISTRY_URL` env var, `registry` in components.json, built-in default.
 */
export function resolveRegistrySource(flag?: string, fromConfig?: string): string {
    const source = flag ?? process.env.REGISTRY_URL ?? fromConfig ?? DEFAULT_REGISTRY_URL;
    return isHttp(source) ? source.replace(/\/+$/, "") : path.resolve(source);
}

export class Registry {
    readonly source: string;
    readonly remote: boolean;

    private indexCache: RegistryIndexEntry[] | null = null;
    private readonly entryCache = new Map<string, RegistryEntry>();

    constructor(source: string) {
        this.source = source;
        this.remote = isHttp(source);
    }

    describe(): string {
        return this.remote ? this.source : `${this.source} (local)`;
    }

    private async readJson<T>(file: string): Promise<T | null> {
        if (!this.remote) {
            const full = path.join(this.source, file);
            if (!existsSync(full) || !statSync(full).isFile()) return null;
            try {
                return JSON.parse(readFileSync(full, "utf8")) as T;
            } catch (error) {
                throw new RegistryError(`${full} is not valid JSON: ${(error as Error).message}`);
            }
        }

        const url = `${this.source}/${file}`;
        const token = readAuthToken();
        let response: Response;
        try {
            response = await fetch(url, { headers: token ? { authorization: `Bearer ${token}` } : {} });
        } catch (error) {
            throw new RegistryError(`Could not reach ${url} — ${(error as Error).message}`);
        }
        if (response.status === 404) return null;
        if (response.status === 401 || response.status === 403) {
            throw new RegistryError(`${url} requires authentication. Run \`properui login\` first.`);
        }
        if (!response.ok) throw new RegistryError(`${url} responded ${response.status} ${response.statusText}`);
        return (await response.json()) as T;
    }

    async index(): Promise<RegistryIndexEntry[]> {
        if (this.indexCache) return this.indexCache;
        const index = await this.readJson<RegistryIndex>("index.json");
        if (!index) throw new RegistryError(`No index.json at ${this.source}. Is the registry source correct?`);
        this.indexCache = index.components ?? [];
        return this.indexCache;
    }

    async find(name: string): Promise<RegistryIndexEntry | undefined> {
        return (await this.index()).find((entry) => entry.name === name);
    }

    async item(name: string): Promise<RegistryEntry> {
        const cached = this.entryCache.get(name);
        if (cached) return cached;
        const entry = await this.readJson<RegistryEntry>(`${name}.json`);
        if (!entry) throw new RegistryError(`Unknown component "${name}". Run \`properui list\` to see what is available.`);
        this.entryCache.set(name, entry);
        return entry;
    }

    /**
     * Resolves `names` plus every `registryDependencies` edge, depth-first, so that a
     * dependency always appears before the entry that needs it.
     */
    async resolveTree(names: string[]): Promise<RegistryEntry[]> {
        const ordered: RegistryEntry[] = [];
        const seen = new Set<string>();

        const visit = async (name: string) => {
            if (seen.has(name)) return;
            seen.add(name);
            const entry = await this.item(name);
            for (const dependency of entry.registryDependencies) await visit(dependency);
            ordered.push(entry);
        };

        for (const name of names) await visit(name);
        return ordered;
    }
}
