/**
 * `properui why <file|entry>` — prints the dependency chain that brought a file or registry
 * entry into the project, walking `registryDependencies` (and `optionalRegistryDependencies`)
 * from the installed roots recorded in components.json's `installed` manifest (2.10).
 *
 * An "installed root" is an entry nobody else already installed depends on — everything else
 * arrived transitively, and this traces the path back to whichever root pulled it in.
 */
import path from "node:path";
import { type InstalledManifest, readConfig } from "../config.js";
import { Registry, resolveRegistrySource } from "../registry.js";
import { kleur, log } from "../ui.js";

export interface WhyOptions {
    registry?: string;
    cwd?: string;
}

/** Resolves a `file` or `entry` argument to the installed entry that owns it. */
function resolveEntryName(target: string, installed: InstalledManifest): string | null {
    if (installed[target]) return target;
    const normalized = target.replace(/^\.?\//, "");
    for (const [name, record] of Object.entries(installed)) {
        if (record.files.some((file) => file === normalized || file.endsWith(`/${normalized}`) || path.basename(file) === normalized)) {
            return name;
        }
    }
    return null;
}

export async function runWhy(target: string, options: WhyOptions): Promise<void> {
    const cwd = path.resolve(options.cwd ?? process.cwd());
    const config = readConfig(cwd);
    if (!config) {
        log.error("No components.json found. Run `properui init` first.");
        process.exitCode = 1;
        return;
    }

    const installed = config.installed ?? {};
    const names = Object.keys(installed);
    if (names.length === 0) {
        log.info("Nothing installed yet: components.json has no `installed` manifest. Run `properui add` first.");
        return;
    }

    if (!target) {
        log.error("Which file or entry? e.g. `properui why badges` or `properui why badges.tsx`");
        process.exitCode = 1;
        return;
    }

    const entryName = resolveEntryName(target, installed);
    if (!entryName) {
        log.error(`"${target}" does not match any installed entry or file. Try \`properui info\`.`);
        process.exitCode = 1;
        return;
    }

    const registry = new Registry(resolveRegistrySource(options.registry, config.registry));

    const dependsOn = new Map<string, string[]>();
    for (const name of names) {
        try {
            const entry = await registry.item(name);
            dependsOn.set(name, [...entry.registryDependencies, ...(entry.optionalRegistryDependencies ?? [])]);
        } catch {
            dependsOn.set(name, []);
        }
    }

    const dependedOn = new Set<string>();
    for (const deps of dependsOn.values()) for (const dep of deps) dependedOn.add(dep);
    const roots = names.filter((name) => !dependedOn.has(name));

    if (roots.includes(entryName)) {
        log.success(`"${entryName}" was installed directly.`);
        return;
    }

    for (const root of roots) {
        const chain = findChain(root, entryName, dependsOn, new Set(names));
        if (chain) {
            log.title(`"${entryName}" came in via:`);
            log.plain(`  ${chain.map((name, index) => (index === 0 ? kleur.bold(name) : name)).join(kleur.dim(" -> "))}`);
            return;
        }
    }

    log.warn(
        `Could not trace how "${entryName}" was installed. It may predate the installed manifest (run \`properui add ${entryName} --overwrite\` to refresh it).`,
    );
}

/** Depth-first search for a path from `root` to `target` over the installed dependency graph. */
function findChain(root: string, target: string, dependsOn: Map<string, string[]>, known: Set<string>): string[] | null {
    const visited = new Set<string>();
    const path_: string[] = [];

    const dfs = (name: string): boolean => {
        if (visited.has(name)) return false;
        visited.add(name);
        path_.push(name);
        if (name === target) return true;
        for (const dependency of dependsOn.get(name) ?? []) {
            if ((known.has(dependency) || dependency === target) && dfs(dependency)) return true;
        }
        path_.pop();
        return false;
    };

    return dfs(root) ? [...path_] : null;
}
