/**
 * `properui remove <entry...>` — deletes an installed entry's files, using components.json's
 * `installed` manifest (2.10) to know what was written and by whom. A file is only deleted
 * when no other installed entry's manifest record still lists it, so a shared util (`cx`,
 * `is-react-component`, …) survives removing one of its consumers. Reports npm dependencies
 * the removed entries declared that no remaining installed entry still needs — informational
 * only, nothing is uninstalled automatically.
 *
 * Spec: docs/spec/feedback/2026-09-11-agent-feedback-map.md 2.10.
 */
import { existsSync, rmSync } from "node:fs";
import path from "node:path";
import { type ComponentsConfig, readConfig, writeConfig } from "../config.js";
import { Registry, resolveRegistrySource } from "../registry.js";
import { kleur, log } from "../ui.js";

export interface RemoveOptions {
    registry?: string;
    cwd?: string;
    dryRun?: boolean;
}

export async function runRemove(names: string[], options: RemoveOptions): Promise<void> {
    const cwd = path.resolve(options.cwd ?? process.cwd());
    const config = readConfig(cwd);
    if (!config) {
        log.error("No components.json found. Run `properui init` first.");
        process.exitCode = 1;
        return;
    }

    if (names.length === 0) {
        log.error("Which entry? e.g. `properui remove badges`");
        process.exitCode = 1;
        return;
    }

    const installed = { ...(config.installed ?? {}) };
    const unknown = names.filter((name) => !installed[name]);
    for (const name of unknown) log.warn(`"${name}" is not recorded as installed (nothing to remove). Try \`properui info\`.`);

    const targets = names.filter((name) => installed[name]);
    if (targets.length === 0) {
        process.exitCode = 1;
        return;
    }

    const remainingNames = Object.keys(installed).filter((name) => !targets.includes(name));
    const stillNeeded = new Set(remainingNames.flatMap((name) => installed[name]?.files ?? []));

    const registry = new Registry(resolveRegistrySource(options.registry, config.registry));
    const removedDependencies = new Set<string>();

    log.title(options.dryRun ? "Removing (dry run: nothing was deleted)" : "Removing");
    let removedFiles = 0;
    for (const name of targets) {
        const record = installed[name];
        if (!record) continue;
        const filesToRemove = record.files.filter((file) => !stillNeeded.has(file));
        const skipped = record.files.filter((file) => stillNeeded.has(file));

        log.plain(`  ${kleur.bold(name)}`);
        for (const relative of filesToRemove) {
            const absolute = path.resolve(cwd, relative);
            if (existsSync(absolute)) {
                if (!options.dryRun) rmSync(absolute);
                removedFiles += 1;
                log.plain(`    ${kleur.red("remove")} ${relative}`);
            }
        }
        for (const relative of skipped) log.plain(`    ${kleur.dim("keep  ")} ${relative} (still used by another installed entry)`);

        try {
            const entry = await registry.item(name);
            for (const dependency of entry.dependencies) removedDependencies.add(dependency);
        } catch {
            // registry unreachable or the entry no longer exists there — dependency report is best-effort
        }

        delete installed[name];
    }

    if (!options.dryRun) {
        const updated: ComponentsConfig = { ...config, installed };
        writeConfig(cwd, updated);
    }

    let stillRequired = new Set<string>();
    for (const name of remainingNames) {
        try {
            const entry = await registry.item(name);
            stillRequired = new Set([...stillRequired, ...entry.dependencies]);
        } catch {
            // ignore
        }
    }
    const orphaned = [...removedDependencies].filter((dependency) => !stillRequired.has(dependency)).sort();

    log.plain();
    log.success(
        options.dryRun ? `Would remove ${removedFiles} file${removedFiles === 1 ? "" : "s"}.` : `Removed ${removedFiles} file${removedFiles === 1 ? "" : "s"}.`,
    );

    if (orphaned.length > 0) {
        log.plain();
        log.title("Possibly orphaned npm dependencies");
        for (const dependency of orphaned) log.step(`${kleur.yellow("check ")} ${dependency}`);
        log.info("Not uninstalled automatically: remove them yourself if nothing else needs them.");
    }
}
