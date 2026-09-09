/**
 * `smarteraui login` — stores a registry token at `~/.smarteraui/auth.json`.
 * Only needed for a private registry; the public one is anonymous.
 *
 * Spec: docs/cli.md
 */
import path from "node:path";
import { authFile, readAuth, writeAuth } from "../auth.js";
import { readConfig } from "../config.js";
import { askSecret, canPrompt } from "../prompt.js";
import { resolveRegistrySource } from "../registry.js";
import { kleur, log } from "../ui.js";

export interface LoginOptions {
    token?: string;
    registry?: string;
    yes?: boolean;
    cwd?: string;
}

/** Masks all but the last four characters of a stored token. */
const mask = (token: string) => `${"•".repeat(Math.max(0, Math.min(token.length, 24) - 4))}${token.slice(-4)}`;

export async function runLogin(options: LoginOptions): Promise<void> {
    const cwd = path.resolve(options.cwd ?? process.cwd());
    const registrySource = resolveRegistrySource(options.registry, readConfig(cwd)?.registry);

    const existing = readAuth();
    if (existing && !options.token) log.info(`Existing token for ${existing.registry ?? "the default registry"}: ${mask(existing.token)}`);

    let token = options.token ?? "";
    if (!token) {
        if (!canPrompt() || options.yes) {
            log.error("No token given. Pass --token <token>, or run `smarteraui login` in an interactive terminal.");
            process.exitCode = 1;
            return;
        }
        log.plain();
        log.info(`Create a token at ${kleur.underline(`${registrySource.replace(/\/r$/, "")}/account/tokens`)} and paste it below.`);
        token = await askSecret("Registry token");
    }

    if (!token) {
        log.error("No token entered.");
        process.exitCode = 1;
        return;
    }

    const file = writeAuth({ token, registry: registrySource });
    log.success(`Token saved to ${file} (mode 0600).`);
    log.info(`Delete ${authFile()} to log out.`);
}
