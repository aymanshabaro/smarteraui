import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { repoRoot } from "./content";

/** Shape we rely on from `packages/registry/dist/<slug>.json` (spec 09-cli-and-distribution.md). */
export type RegistryEntry = {
    name?: string;
    files?: string[];
    dependencies?: string[];
    registryDependencies?: string[];
};

const asStringArray = (value: unknown): string[] =>
    Array.isArray(value)
        ? value.flatMap((item) => {
              if (typeof item === "string") return [item];
              if (item && typeof item === "object" && "path" in item && typeof (item as { path: unknown }).path === "string") {
                  return [(item as { path: string }).path];
              }
              return [];
          })
        : [];

/** Returns undefined until `pnpm registry:build` has produced the entry. */
export const getRegistryEntry = (slug: string): RegistryEntry | undefined => {
    const file = path.join(repoRoot(), "packages", "registry", "dist", `${slug}.json`);
    if (!existsSync(file)) return undefined;

    try {
        const parsed: unknown = JSON.parse(readFileSync(file, "utf8"));
        if (!parsed || typeof parsed !== "object") return undefined;
        const record = parsed as Record<string, unknown>;
        return {
            name: typeof record.name === "string" ? record.name : undefined,
            files: asStringArray(record.files),
            dependencies: asStringArray(record.dependencies),
            registryDependencies: asStringArray(record.registryDependencies),
        };
    } catch {
        return undefined;
    }
};
