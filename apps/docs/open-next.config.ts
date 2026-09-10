import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import staticAssetsIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache";

/**
 * OpenNext Cloudflare adapter configuration.
 *
 * Every page and every `/r/*.json` registry entry is prerendered at build time, and nothing
 * revalidates, so the read-only static-assets cache is the right incremental cache here: it
 * serves prerendered output through the `ASSETS` binding with no KV or R2 to provision.
 *
 * It is not optional. Next.js resolves a prerendered route through the incremental cache
 * rather than from disk, so without an override every page but `/` answers 404 — the default
 * cache has nowhere to read from. `populateCache` writes the prerendered payloads into
 * `.open-next/assets/cdn-cgi/_next_cache`, a prefix only the Worker itself can fetch.
 */
export default defineCloudflareConfig({
    incrementalCache: staticAssetsIncrementalCache,
});
