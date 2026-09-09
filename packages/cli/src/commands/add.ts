/**
 * `smarteraui add <component...>` and `smarteraui add example <name>`.
 *
 * Resolves each component plus its `registryDependencies` recursively, copies the files to
 * the targets from components.json, rewrites `@/` imports to the project alias, installs
 * missing npm dependencies and prints what changed. A second run without `--overwrite`
 * reports no changes.
 *
 * Spec: docs/cli.md
 */
import path from "node:path";
import { type ComponentsConfig, aliasBaseDir, aliasPrefixOf, configPath, readConfig } from "../config.js";
import { installCommand, installDependencies, missingDependencies } from "../deps.js";
import { detectPackageManager } from "../detect.js";
import { type WriteResult, prepareFile, writeSourceFile } from "../files.js";
import { nearestNames } from "../fuzzy.js";
import { confirm } from "../prompt.js";
import { Registry, type RegistryEntry, RegistryError, resolveRegistrySource } from "../registry.js";
import { kleur, log, spinner } from "../ui.js";

export interface AddOptions {
    all?: boolean;
    overwrite?: boolean;
    path?: string;
    dryRun?: boolean;
    yes?: boolean;
    registry?: string;
    cwd?: string;
}

const STATUS_ORDER: WriteResult["status"][] = ["created", "updated", "skipped", "unchanged"];

const statusLabel = (status: WriteResult["status"]): string => {
    if (status === "created") return kleur.green("added ");
    if (status === "updated") return kleur.yellow("update");
    if (status === "skipped") return kleur.dim("skip  ");
    return kleur.dim("same  ");
};

export async function runAdd(names: string[], options: AddOptions): Promise<void> {
    const cwd = path.resolve(options.cwd ?? process.cwd());
    const config = readConfig(cwd);
    if (!config) {
        log.error(`No ${path.relative(cwd, configPath(cwd)) || "components.json"} found. Run \`smarteraui init\` first.`);
        process.exitCode = 1;
        return;
    }

    // `add example <name>` — the example entry already lists the components it uses as
    // registryDependencies, so resolution is identical from here on.
    const exampleMode = names[0] === "example";
    const requested = exampleMode ? names.slice(1) : names;

    const registry = new Registry(resolveRegistrySource(options.registry, config.registry));

    if (!options.all && requested.length === 0) {
        log.error(exampleMode ? "Which example? e.g. `smarteraui add example settings-01`" : "Nothing to add. Pass component names or --all.");
        process.exitCode = 1;
        return;
    }

    let targets: string[];
    try {
        const index = await registry.index();
        if (options.all) {
            targets = index.filter((entry) => entry.type === "component").map((entry) => entry.name);
        } else {
            const known = new Set(index.map((entry) => entry.name));
            const unknown = requested.filter((name) => !known.has(name));
            if (unknown.length > 0) {
                for (const name of unknown) {
                    const hints = nearestNames([...known], name);
                    log.error(`Unknown component "${name}".${hints.length > 0 ? ` Did you mean: ${hints.join(", ")}?` : ""}`);
                }
                process.exitCode = 1;
                return;
            }
            if (exampleMode) {
                const notExamples = requested.filter((name) => index.find((entry) => entry.name === name)?.type !== "example");
                for (const name of notExamples) log.warn(`"${name}" is not a page example — adding it as a component.`);
            }
            targets = requested;
        }
    } catch (error) {
        log.error(error instanceof RegistryError ? error.message : (error as Error).message);
        process.exitCode = 1;
        return;
    }

    const resolveSpinner = spinner(`Resolving ${targets.length} component${targets.length === 1 ? "" : "s"} from ${registry.describe()}`);
    let entries: RegistryEntry[];
    try {
        entries = await registry.resolveTree(targets);
        resolveSpinner.succeed(`Resolved ${entries.length} registry item${entries.length === 1 ? "" : "s"} (including dependencies).`);
    } catch (error) {
        resolveSpinner.fail(error instanceof RegistryError ? error.message : (error as Error).message);
        process.exitCode = 1;
        return;
    }

    const aliasBase = aliasBaseDir(cwd, config);
    const resolveOptions = { cwd, aliasBase, pathOverride: options.path };
    const writeOptions = { cwd, overwrite: Boolean(options.overwrite), dryRun: Boolean(options.dryRun) };

    const results: { entry: RegistryEntry; writes: WriteResult[] }[] = [];
    for (const entry of entries) {
        const writes = entry.files.map((file) => {
            const { target, content } = prepareFile(file, config, resolveOptions);
            return writeSourceFile(target, content, writeOptions);
        });
        results.push({ entry, writes });
    }

    reportWrites(results, config, options);

    const npmDependencies = missingDependencies(
        cwd,
        entries.flatMap((entry) => entry.dependencies),
    );
    if (npmDependencies.length > 0) {
        const manager = detectPackageManager(cwd);
        log.plain();
        log.title("Dependencies");
        for (const dependency of npmDependencies) log.step(`${kleur.cyan("need  ")} ${dependency}`);

        if (options.dryRun) {
            log.info(`Dry run — would run: ${kleur.bold(installCommand(manager, npmDependencies))}`);
        } else {
            const shouldInstall = await confirm(
                `Install ${npmDependencies.length} missing package${npmDependencies.length === 1 ? "" : "s"} with ${manager}?`,
                {
                    yes: options.yes,
                    fallback: Boolean(options.yes),
                },
            );
            if (shouldInstall) {
                const { ok, command } = installDependencies(cwd, manager, npmDependencies);
                if (ok) log.success(`Installed with \`${command}\`.`);
                else log.error(`\`${command}\` failed — install the packages above manually.`);
            } else {
                log.info(`Skipped install. Run: ${kleur.bold(installCommand(manager, npmDependencies))}`);
            }
        }
    }
}

function reportWrites(results: { entry: RegistryEntry; writes: WriteResult[] }[], config: ComponentsConfig, options: AddOptions): void {
    const all = results.flatMap((result) => result.writes);
    const counts = Object.fromEntries(STATUS_ORDER.map((status) => [status, all.filter((write) => write.status === status).length])) as Record<
        WriteResult["status"],
        number
    >;

    log.plain();
    log.title(options.dryRun ? "Files (dry run — nothing was written)" : "Files");
    for (const { entry, writes } of results) {
        const changed = writes.some((write) => write.status === "created" || write.status === "updated");
        log.plain(`  ${changed ? kleur.bold(entry.name) : kleur.dim(entry.name)}`);
        for (const write of writes) log.plain(`    ${statusLabel(write.status)} ${write.relative}`);
    }

    const aliasPrefix = aliasPrefixOf(config.aliases.components);
    log.plain();
    if (aliasPrefix !== "@/") log.info(`Rewrote \`@/\` imports to \`${aliasPrefix}\`.`);
    if (options.path) log.info(`Component files were placed under \`${options.path}\` — check the imports if that folder is outside your alias.`);

    if (counts.created + counts.updated === 0) {
        log.success(
            counts.skipped > 0
                ? `No changes — ${counts.skipped} file${counts.skipped === 1 ? "" : "s"} already exist. Pass --overwrite to replace them.`
                : "No changes — everything is already up to date.",
        );
        return;
    }

    const parts = [`${counts.created} added`, `${counts.updated} updated`, `${counts.skipped} skipped`, `${counts.unchanged} unchanged`];
    log.success(options.dryRun ? `Would apply: ${parts.join(", ")}.` : parts.join(", ") + ".");
}
