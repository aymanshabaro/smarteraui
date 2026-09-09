import { AREAS, type Area, getContentPage, readMdxSource, stripFrontmatter } from "~/lib/content";
import { mdxToMarkdown } from "~/lib/markdown";

/**
 * Serves the plain-markdown twin of a docs route. Reached through the `/:path*.md`
 * rewrite in next.config.ts, which is what the "Copy page as Markdown" action and the
 * `Open in ChatGPT` / `Open in Claude` links point at.
 */

const notFound = () => new Response("Not found", { status: 404, headers: { "content-type": "text/plain; charset=utf-8" } });

const markdown = (body: string) => new Response(body, { headers: { "content-type": "text/markdown; charset=utf-8" } });

export async function GET(_request: Request, { params }: { params: Promise<{ path: string[] }> }) {
    const { path } = await params;
    const [first, second] = path;
    if (!first) return notFound();

    const area = AREAS.find((candidate) => candidate === first);
    if (!area || !second) return notFound();

    const page = getContentPage(area as Area, second);
    const source = readMdxSource(area, second);
    if (!page || !source) return notFound();

    const body = [`# ${page.frontmatter.title}`, "", page.frontmatter.description ?? "", "", mdxToMarkdown(stripFrontmatter(source)), ""].join("\n");
    return markdown(body);
}
