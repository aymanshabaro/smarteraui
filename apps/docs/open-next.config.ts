import { defineCloudflareConfig } from "@opennextjs/cloudflare";

/**
 * OpenNext Cloudflare adapter configuration.
 *
 * The docs site is fully prerendered (every page and every `/r/*.json` registry entry is
 * static), so no incremental cache, tag cache or queue override is needed — the defaults
 * serve the prerendered output straight from Workers static assets.
 */
export default defineCloudflareConfig();
