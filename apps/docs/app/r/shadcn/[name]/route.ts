import { existsSync, readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { repoRoot } from "~/lib/content";

/**
 * The shadcn-format mirror of `https://properui.dev/r/<name>.json` — served at
 * `https://properui.dev/r/shadcn/<name>.json`, plus `https://properui.dev/r/shadcn/registry.json`
 * (the index shadcn's own MCP server reads to discover this namespace's items, per
 * https://ui.shadcn.com/docs/registry/mcp). This is what a consumer's `components.json` points
 * the `@properui` namespace at (see /integrations/shadcn) so `npx shadcn@latest add
 * @properui/<name>` resolves here instead of `/r/<name>.json`.
 *
 * The payloads are the files `pnpm registry:build` writes to `packages/registry/dist/shadcn`
 * (via `src/shadcn.ts`, which translates the native registry — the one this route's sibling,
 * `app/r/[name]/route.ts`, serves — into shadcn's registry-item.json / registry.json shapes).
 * Every entry is prerendered, so on Cloudflare Workers these are plain static assets — no
 * filesystem access happens at request time.
 */

export const dynamic = "force-static";
export const dynamicParams = false;

/** Registry file names are slugs produced by `registry:build` (or the literal "registry"); anything else is rejected. */
const FILE_NAME = /^[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.json$/;

const registryDir = () => path.join(repoRoot(), "packages", "registry", "dist", "shadcn");

export function generateStaticParams() {
    const dir = registryDir();
    if (!existsSync(dir)) return [];
    return readdirSync(dir)
        .filter((name) => FILE_NAME.test(name))
        .map((name) => ({ name }));
}

export async function GET(_request: Request, { params }: { params: Promise<{ name: string }> }) {
    const { name } = await params;
    if (!FILE_NAME.test(name)) return new Response("Not found", { status: 404 });

    const file = path.join(registryDir(), name);
    if (!existsSync(file)) return new Response("Not found", { status: 404 });

    return new Response(readFileSync(file, "utf8"), {
        headers: {
            "content-type": "application/json; charset=utf-8",
            "cache-control": "public, max-age=0, must-revalidate",
        },
    });
}
