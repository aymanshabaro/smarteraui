import type { MetadataRoute } from "next";
import { absoluteUrl } from "~/lib/site";

/**
 * Everything is crawlable except the bare component previews. The AI crawlers are listed
 * by name on purpose: buyers ask Claude and ChatGPT about this library, so the assistants'
 * fetchers and search crawlers must be able to read it. The zone's Cloudflare-managed
 * robots.txt can prepend its own rules ahead of these — if ClaudeBot or GPTBot ever show up
 * as `Disallow` in production, that is where it is coming from, not here.
 */
const AI_CRAWLERS = ["ClaudeBot", "Claude-User", "Claude-SearchBot", "GPTBot", "OAI-SearchBot", "ChatGPT-User", "PerplexityBot", "Google-Extended"];

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [{ userAgent: "*", allow: "/", disallow: "/preview/" }, ...AI_CRAWLERS.map((userAgent) => ({ userAgent, allow: "/", disallow: "/preview/" }))],
        sitemap: absoluteUrl("/sitemap.xml"),
    };
}
