/**
 * `properui info [--json]` — everything an agent (or a human) needs to know about this
 * project's Proper UI setup before touching UI code: framework, Tailwind version,
 * `components.json` aliases, the theme CSS path, which registry entries are already
 * installed, and the installed package versions.
 *
 * "Installed registry entries" are computed the same way `diff` finds them: for every
 * non-example entry in the registry index, check whether any of its target files already
 * exist in the project.
 *
 * Spec: docs/cli.md, docs/spec/strategy/2026-09-plan.md §3 P1.3.
 */
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { type ComponentsConfig, aliasBaseDir, configPath, readConfig } from "../config.js";
import { allDependencies, detectProject, readPackageJson } from "../detect.js";
import { prepareFile } from "../files.js";
import { Registry, RegistryError, resolveRegistrySource } from "../registry.js";
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

interface InstalledEntry {
    name: string;
    layer: string;
    type: string;
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
        properui: PackageVersions;
    };
    registrySource: string;
    registryReachable: boolean;
    installed: InstalledEntry[];
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

    const installed: InstalledEntry[] = [];
    let registryReachable = true;

    if (config) {
        const aliasBase = aliasBaseDir(cwd, config);
        const resolveOptions = { cwd, aliasBase };
        try {
            const index = await registry.index();
            for (const meta of index) {
                if (meta.type === "example") continue;
                const entry = await registry.item(meta.name);
                const present = entry.files.some((file) => existsSync(prepareFile(file, config, resolveOptions).target));
                if (present) installed.push({ name: meta.name, layer: meta.layer, type: meta.type });
            }
        } catch {
            registryReachable = false;
        }
    } else {
        registryReachable = false;
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
            properui: packageVersions(cwd, "properui", deps),
        },
        registrySource,
        registryReachable,
        installed: installed.sort((a, b) => a.name.localeCompare(b.name)),
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
    log.step(`properui (CLI)    ${formatVersions(snapshot.packages.properui)}`);
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
    log.step(`Registry            ${snapshot.registrySource}`);
    log.plain();

    if (!snapshot.registryReachable) {
        log.warn(`Could not reach the registry. Installed entries below may be incomplete.`);
    }

    if (snapshot.installed.length === 0) {
        log.info("No registry entries installed yet.");
        return;
    }

    log.title(`${snapshot.installed.length} installed entr${snapshot.installed.length === 1 ? "y" : "ies"}`);
    const width = Math.max(...snapshot.installed.map((entry) => entry.name.length));
    for (const entry of snapshot.installed) {
        log.plain(`  ${kleur.bold(entry.name.padEnd(width))}  ${kleur.dim(entry.layer)}`);
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
