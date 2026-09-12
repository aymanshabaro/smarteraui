/**
 * `properui info [--json]` — everything an agent (or a human) needs to know about this
 * project's Proper UI setup before touching UI code: framework, Tailwind version,
 * `components.json` aliases, the theme CSS path, which registry entries are already
 * installed, and the installed package versions.
 *
 * The registry reachability probe (2.7) runs unconditionally — even with no `components.json`,
 * which is exactly when the Skill tells an agent to run `info` first — so `registryReachable`
 * reflects the network, not whether `init` has run yet.
 *
 * "Installed" entries come from components.json's `installed` manifest (2.10) when present.
 * Projects from before that manifest existed fall back to the old file-existence probe: for
 * every non-example entry in the registry index, check whether any of its target files already
 * exist in the project.
 *
 * Spec: docs/cli.md, docs/spec/strategy/2026-09-plan.md §3 P1.3.
 */
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { type ComponentsConfig, aliasBaseDir, configPath, readConfig } from "../config.js";
import { allDependencies, detectProject, readPackageJson } from "../detect.js";
import { prepareFile } from "../files.js";
import { Registry, RegistryError, type RegistryIndexEntry, resolveRegistrySource } from "../registry.js";
import { kleur, log } from "../ui.js";

export interface InfoOptions {
    json?: boolean;
    registry?: string;
    cwd?: string;
}

interface PackageVersions {
    /** Version actually installed in node_modules, when it can be read. */
    installed: string | null;
    /** Version range declared in package.json (dependencies/devDependencies/peerDependencies). */
    declared: string | null;
}

/** Mirrors components.json's `installed` manifest row, annotated with index metadata when known. */
interface InstalledSnapshotEntry {
    version: string;
    files: string[];
    installedAt: string;
    layer?: string;
    type?: string;
}

export interface ProjectSnapshot {
    cwd: string;
    framework: string;
    typescript: boolean;
    tailwindVersion: number | null;
    packageManager: string;
    config: {
        present: boolean;
        file: string;
        aliases: ComponentsConfig["aliases"] | null;
        theme: string | null;
        css: string | null;
        registry: string | null;
    };
    packages: {
        "@properui/ui": PackageVersions;
        "@properui/cli": PackageVersions;
    };
    registrySource: string;
    registryReachable: boolean;
    installed: Record<string, InstalledSnapshotEntry>;
}

/** Reads a package's declared version from package.json and its actually-installed version from node_modules. */
function packageVersions(cwd: string, name: string, deps: Record<string, string>): PackageVersions {
    const pkgPath = path.join(cwd, "node_modules", ...name.split("/"), "package.json");
    let installed: string | null = null;
    if (existsSync(pkgPath)) {
        try {
            installed = (JSON.parse(readFileSync(pkgPath, "utf8")) as { version?: string }).version ?? null;
        } catch {
            installed = null;
        }
    }
    return { installed, declared: deps[name] ?? null };
}

export async function collectSnapshot(options: InfoOptions): Promise<ProjectSnapshot> {
    const cwd = path.resolve(options.cwd ?? process.cwd());
    const project = detectProject(cwd);
    const config = readConfig(cwd);
    const deps = allDependencies(readPackageJson(cwd));

    const registrySource = resolveRegistrySource(options.registry, config?.registry);
    const registry = new Registry(registrySource);

    // Probe the registry regardless of whether components.json exists yet (2.7) — a fresh
    // project with network access must report `registryReachable: true`.
    let registryReachable = true;
    let index: RegistryIndexEntry[] = [];
    try {
        index = await registry.index();
    } catch {
        registryReachable = false;
    }

    const installed: Record<string, InstalledSnapshotEntry> = {};
    if (config) {
        const manifest = config.installed ?? {};
        if (Object.keys(manifest).length > 0) {
            for (const [name, record] of Object.entries(manifest)) {
                const meta = index.find((entry) => entry.name === name);
                installed[name] = { ...record, layer: meta?.layer, type: meta?.type };
            }
        } else if (registryReachable) {
            const aliasBase = aliasBaseDir(cwd, config);
            const resolveOptions = { cwd, aliasBase };
            for (const meta of index) {
                if (meta.type === "example") continue;
                try {
                    const entry = await registry.item(meta.name);
                    const presentFiles = entry.files.filter((file) => existsSync(prepareFile(file, config, resolveOptions).target));
                    if (presentFiles.length > 0) {
                        installed[meta.name] = {
                            version: "unknown",
                            files: presentFiles.map((file) => path.relative(cwd, prepareFile(file, config, resolveOptions).target)),
                            installedAt: "unknown",
                            layer: meta.layer,
                            type: meta.type,
                        };
                    }
                } catch {
                    // one bad item shouldn't sink the whole report
                }
            }
        }
    }

    return {
        cwd,
        framework: project.framework,
        typescript: project.typescript,
        tailwindVersion: project.tailwindVersion,
        packageManager: project.packageManager,
        config: {
            present: Boolean(config),
            file: path.relative(cwd, configPath(cwd)) || "components.json",
            aliases: config?.aliases ?? null,
            theme: config?.tailwind.theme ?? null,
            css: config?.tailwind.css ?? null,
            registry: config?.registry ?? null,
        },
        packages: {
            "@properui/ui": packageVersions(cwd, "@properui/ui", deps),
            "@properui/cli": packageVersions(cwd, "@properui/cli", deps),
        },
        registrySource,
        registryReachable,
        installed,
    };
}

function formatVersions(versions: PackageVersions): string {
    if (versions.installed) return versions.installed;
    if (versions.declared) return `${versions.declared} (not installed)`;
    return "not found";
}

function printHuman(snapshot: ProjectSnapshot): void {
    log.title("Proper UI project info");
    log.step(`Framework           ${snapshot.framework}`);
    log.step(`Language            ${snapshot.typescript ? "TypeScript" : "JavaScript"}`);
    log.step(`Tailwind            ${snapshot.tailwindVersion ? `v${snapshot.tailwindVersion}` : "not installed"}`);
    log.step(`Package manager     ${snapshot.packageManager}`);
    log.step(`@properui/ui      ${formatVersions(snapshot.packages["@properui/ui"])}`);
    log.step(`@properui/cli     ${formatVersions(snapshot.packages["@properui/cli"])}`);
    log.step(`Registry            ${snapshot.registrySource}`);
    log.step(`Registry reachable  ${snapshot.registryReachable ? "yes" : "no"}`);
    log.plain();

    if (!snapshot.config.present) {
        log.warn(`No ${snapshot.config.file} found. Run \`npx @properui/cli@latest init\` before installing components.`);
        return;
    }

    log.step(`Config file         ${snapshot.config.file}`);
    log.step(`Components alias    ${snapshot.config.aliases?.components}`);
    log.step(`Utils alias         ${snapshot.config.aliases?.utils}`);
    log.step(`UI alias            ${snapshot.config.aliases?.ui}`);
    log.step(`Hooks alias         ${snapshot.config.aliases?.hooks}`);
    log.step(`Theme CSS           ${snapshot.config.theme}`);
    log.step(`Global CSS          ${snapshot.config.css}`);
    log.plain();

    if (!snapshot.registryReachable) {
        log.warn(`Could not reach the registry. Installed entries below may be incomplete.`);
    }

    const names = Object.keys(snapshot.installed).sort();
    if (names.length === 0) {
        log.info("No registry entries installed yet.");
        return;
    }

    log.title(`${names.length} installed entr${names.length === 1 ? "y" : "ies"}`);
    const width = Math.max(...names.map((name) => name.length));
    for (const name of names) {
        const record = snapshot.installed[name];
        if (!record) continue;
        const detail = [record.layer, record.version !== "unknown" ? `v${record.version}` : null].filter(Boolean).join(" · ");
        log.plain(`  ${kleur.bold(name.padEnd(width))}  ${kleur.dim(detail)}`);
    }
}

export async function runInfo(options: InfoOptions): Promise<void> {
    let snapshot: ProjectSnapshot;
    try {
        snapshot = await collectSnapshot(options);
    } catch (error) {
        log.error(error instanceof RegistryError ? error.message : (error as Error).message);
        process.exitCode = 1;
        return;
    }

    if (options.json) {
        log.plain(JSON.stringify(snapshot, null, 2));
        return;
    }

    printHuman(snapshot);
}
