/**
 * Token storage for private registries — `~/.smarteraui/auth.json`.
 * Spec: docs/cli.md (`login`).
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { homedir } from "node:os";
import path from "node:path";

export interface AuthFile {
    token: string;
    registry?: string;
    createdAt?: string;
}

export const authDir = () => path.join(homedir(), ".smarteraui");
export const authFile = () => path.join(authDir(), "auth.json");

export function readAuth(): AuthFile | null {
    const file = authFile();
    if (!existsSync(file)) return null;
    try {
        const parsed = JSON.parse(readFileSync(file, "utf8")) as AuthFile;
        return typeof parsed?.token === "string" && parsed.token.length > 0 ? parsed : null;
    } catch {
        return null;
    }
}

export const readAuthToken = (): string | null => process.env.SMARTERAUI_TOKEN ?? readAuth()?.token ?? null;

export function writeAuth(auth: AuthFile): string {
    mkdirSync(authDir(), { recursive: true, mode: 0o700 });
    const file = authFile();
    writeFileSync(file, `${JSON.stringify({ ...auth, createdAt: auth.createdAt ?? new Date().toISOString() }, null, 2)}\n`, { mode: 0o600 });
    return file;
}
