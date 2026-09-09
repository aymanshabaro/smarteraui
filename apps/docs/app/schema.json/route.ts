import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { repoRoot } from "~/lib/content";

/**
 * `https://smarteraui.com/schema.json` — the JSON Schema for a project's `components.json`.
 *
 * `smarteraui init` writes this URL into the `$schema` field of every `components.json` it
 * creates (see `CONFIG_SCHEMA_URL` in packages/cli/src/config.ts), so editors can validate and
 * autocomplete the file. The payload is `packages/registry/schema.json`, read at build time and
 * served verbatim — prerendered, so on Cloudflare Workers it is a plain static asset.
 */

export const dynamic = "force-static";

export function GET() {
    const file = path.join(repoRoot(), "packages", "registry", "schema.json");

    if (!existsSync(file)) {
        // The schema ships with the repo; a miss means `packages/registry` was not checked out.
        return new Response(JSON.stringify({ error: "Schema not available in this build." }), {
            status: 404,
            headers: { "content-type": "application/json; charset=utf-8" },
        });
    }

    return new Response(readFileSync(file, "utf8"), {
        headers: {
            "content-type": "application/schema+json; charset=utf-8",
            "cache-control": "public, max-age=3600, s-maxage=86400",
        },
    });
}
