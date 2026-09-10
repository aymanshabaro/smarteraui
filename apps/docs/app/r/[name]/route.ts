import { existsSync, readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { repoRoot } from "~/lib/content";

/**
 * Public registry endpoint — `https://properui.dev/r/<name>.json` plus the
 * `https://properui.dev/r/index.json` catalogue. This is what the `properui` CLI talks
 * to when no `--registry` flag, `REGISTRY_URL` or `components.json` override is set
 * (see `DEFAULT_REGISTRY_URL` in packages/cli/src/registry.ts).
 *
 * The payloads are the files `pnpm registry:build` writes to `packages/registry/dist`, read
 * at build time and served verbatim. Every entry is prerendered, so on Cloudflare Workers
 * these are plain static assets — no filesystem access happens at request time.
 */

export const dynamic = "force-static";
export const dynamicParams = false;

/** Registry file names are slugs produced by `registry:build`; anything else is rejected. */
const FILE_NAME = /^[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.json$/;

const registryDir = () => path.join(repoRoot(), "packages", "registry", "dist");

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
