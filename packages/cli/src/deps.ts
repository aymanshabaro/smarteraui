/**
 * npm dependency handling for `add` / `init`.
 */
import { spawnSync } from "node:child_process";
import { type PackageManager, allDependencies, readPackageJson } from "./detect.js";

/** Peers a React project already has; never installed by the CLI. */
const ASSUMED = new Set(["react", "react-dom", "next"]);

/**
 * Packages the component source imports under a name that is not (yet) on npm, mapped to
 * the spec that actually installs them. `@properui/icons` is how every component imports
 * its icons, but the published package is `@untitledui/icons` (MIT); an alias install puts
 * it in the project's package.json under the name the source expects. npm, pnpm, yarn and
 * bun all accept `name@npm:real@range`.
 */
const INSTALL_SPECS: Record<string, string> = {
    "@properui/icons": "@properui/icons@npm:@untitledui/icons@^0.0.22",
};

/** The argument handed to the package manager for a dependency name. */
export const installSpec = (name: string): string => INSTALL_SPECS[name] ?? name;

export function missingDependencies(cwd: string, required: string[]): string[] {
    const installed = allDependencies(readPackageJson(cwd));
    return [...new Set(required)].filter((name) => !ASSUMED.has(name) && !installed[name]).sort();
}

export function installCommand(manager: PackageManager, packages: string[]): string {
    const verb = manager === "npm" ? "install" : "add";
    return `${manager} ${verb} ${packages.map(installSpec).join(" ")}`;
}

export function installDependencies(cwd: string, manager: PackageManager, packages: string[]): { ok: boolean; command: string } {
    const verb = manager === "npm" ? "install" : "add";
    const command = installCommand(manager, packages);
    const result = spawnSync(manager, [verb, ...packages.map(installSpec)], { cwd, stdio: "inherit" });
    return { ok: result.status === 0, command };
}
