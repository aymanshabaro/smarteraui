/**
 * `properui search <query>` — local fuzzy search over name + description + example names.
 * Scored subsequence match; no network beyond the registry index, no extra dependency.
 */
import path from "node:path";
import { readConfig } from "../config.js";
import { fuzzyScore } from "../fuzzy.js";
import { Registry, RegistryError, type RegistryIndexEntry, resolveRegistrySource } from "../registry.js";
import { kleur, log } from "../ui.js";

export interface SearchOptions {
    limit?: string;
    registry?: string;
    cwd?: string;
}

/** Best score across the fields the spec calls out, weighted so a name hit outranks a description hit. */
export function scoreEntry(entry: RegistryIndexEntry, query: string): number {
    return Math.max(
        fuzzyScore(entry.name, query),
        0.85 * fuzzyScore(entry.title, query),
        0.6 * fuzzyScore(entry.description, query),
        0.7 * Math.max(0, ...entry.examples.map((example) => fuzzyScore(example, query))),
    );
}

export async function runSearch(query: string, options: SearchOptions): Promise<void> {
    const cwd = path.resolve(options.cwd ?? process.cwd());
    const registry = new Registry(resolveRegistrySource(options.registry, readConfig(cwd)?.registry));

    let entries: RegistryIndexEntry[];
    try {
        entries = await registry.index();
    } catch (error) {
        log.error(error instanceof RegistryError ? error.message : (error as Error).message);
        process.exitCode = 1;
        return;
    }

    const limit = Number(options.limit ?? 20);
    const matches = entries
        .map((entry) => ({ entry, score: scoreEntry(entry, query) }))
        .filter((match) => match.score > 0.2)
        .sort((a, b) => b.score - a.score || a.entry.name.localeCompare(b.entry.name))
        .slice(0, Number.isFinite(limit) && limit > 0 ? limit : 20);

    if (matches.length === 0) {
        log.warn(`Nothing matched "${query}".`);
        return;
    }

    const width = Math.max(...matches.map((match) => match.entry.name.length));
    log.title(`${matches.length} match${matches.length === 1 ? "" : "es"} for "${query}"`);
    for (const { entry } of matches) {
        const examples = entry.examples.length > 0 ? kleur.dim(` · ${entry.examples.length} examples`) : "";
        log.plain(`  ${kleur.bold(entry.name.padEnd(width))}  ${kleur.dim(entry.layer.padEnd(18))}  ${entry.title}${examples}`);
    }
}
