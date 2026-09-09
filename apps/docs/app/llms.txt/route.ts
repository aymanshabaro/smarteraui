import { getAllContentPages } from "~/lib/content";
import { SITE_NAME, absoluteUrl, markdownUrl } from "~/lib/site";

/**
 * `/llms.txt` — the index an LLM can crawl to find the plain-markdown twin of every
 * page (spec 08-docs-site.md § "Copy page as Markdown" / LLM integrations).
 */
export const dynamic = "force-static";

export function GET() {
    const pages = getAllContentPages();

    const body = [
        `# ${SITE_NAME}`,
        "",
        `> React components built with React Aria and Tailwind CSS. Every page below is available as plain markdown.`,
        "",
        "## Pages",
        "",
        // Overview routes are generated, so they have no markdown twin — link the pages themselves.
        ...["/", "/components", "/application-ui", "/marketing"].map((route) => `- [${route}](${absoluteUrl(route)})`),
        ...pages.map(
            (page) =>
                `- [${page.frontmatter.title}](${absoluteUrl(markdownUrl(page.href))})${page.frontmatter.description ? `: ${page.frontmatter.description}` : ""}`,
        ),
        "",
    ].join("\n");

    return new Response(body, { headers: { "content-type": "text/plain; charset=utf-8" } });
}
