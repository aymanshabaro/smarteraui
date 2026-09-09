/**
 * npm dependency handling for `add` / `init`.
 */
import { spawnSync } from "node:child_process";
import { type PackageManager, allDependencies, readPackageJson } from "./detect.js";

/** Peers a React project already has; never installed by the CLI. */
const ASSUMED = new Set(["react", "react-dom", "next"]);

export function missingDependencies(cwd: string, required: string[]): string[] {
    const installed = allDependencies(readPackageJson(cwd));
    return [...new Set(required)].filter((name) => !ASSUMED.has(name) && !installed[name]).sort();
}

export function installCommand(manager: PackageManager, packages: string[]): string {
    const verb = manager === "npm" ? "install" : "add";
    return `${manager} ${verb} ${packages.join(" ")}`;
}

export function installDependencies(cwd: string, manager: PackageManager, packages: string[]): { ok: boolean; command: string } {
    const verb = manager === "npm" ? "install" : "add";
    const command = installCommand(manager, packages);
    const result = spawnSync(manager, [verb, ...packages], { cwd, stdio: "inherit" });
    return { ok: result.status === 0, command };
}
