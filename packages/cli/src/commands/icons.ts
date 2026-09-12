/**
 * `properui icons <query>` (also `properui search <query> --icons`) — fuzzy search over the
 * registry's icon export index (`dist/icons.json`), printing the import line for each match.
 *
 * The index is optional: registries built before it existed simply don't have the file, and
 * this prints a plain "not available" notice instead of failing.
 */
import path from "node:path";
import { readConfig } from "../config.js";
import { fuzzyScore } from "../fuzzy.js";
import { Registry, RegistryError, resolveRegistrySource } from "../registry.js";
import { kleur, log } from "../ui.js";

export interface IconsOptions {
    limit?: string;
    registry?: string;
    cwd?: string;
}

export async function runIcons(query: string, options: IconsOptions): Promise<void> {
    const cwd = path.resolve(options.cwd ?? process.cwd());
    const registry = new Registry(resolveRegistrySource(options.registry, readConfig(cwd)?.registry));

    if (!query) {
        log.error("Which icon? e.g. `properui icons arrow-right`");
        process.exitCode = 1;
        return;
    }

    let icons;
    try {
        icons = await registry.icons();
    } catch (error) {
        log.error(error instanceof RegistryError ? error.message : (error as Error).message);
        process.exitCode = 1;
        return;
    }

    if (!icons || icons.length === 0) {
        log.warn(`Icon index not available from ${registry.describe()} yet.`);
        return;
    }

    const limit = Number(options.limit ?? 20);
    const matches = icons
        .flatMap((set) => set.names.map((name) => ({ set, name })))
        .map((candidate) => ({ ...candidate, score: fuzzyScore(candidate.name, query) }))
        .filter((match) => match.score > 0.3)
        .sort((a, b) => b.score - a.score || a.name.localeCompare(b.name))
        .slice(0, Number.isFinite(limit) && limit > 0 ? limit : 20);

    if (matches.length === 0) {
        log.warn(`no match for "${query}"`);
        return;
    }

    const width = Math.max(...matches.map((match) => match.name.length));
    log.title(`${matches.length} icon${matches.length === 1 ? "" : "s"} matching "${query}"`);
    for (const { set, name } of matches) {
        log.plain(`  ${kleur.bold(name.padEnd(width))}  ${kleur.dim(`import { ${name} } from "${set.alias}";`)}`);
    }
}
