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
        `> Open-source React 19 component library built for AI-generated code. Behaviour comes from React Aria Components;`,
        `> styling is Tailwind CSS v4 resolved through semantic tokens. MIT licensed. Every page below is plain markdown.`,
        "",
        "## Conventions",
        "",
        "- React Aria props: `onPress` not `onClick`, `isDisabled` not `disabled`.",
        "- Semantic tokens only: `bg-primary`, `text-tertiary`, `bg-brand-solid`. Never a raw palette or arbitrary value.",
        "- No `dark:` utilities: a `.dark-mode` ancestor class repoints every token.",
        "- Logical properties for direction: `ms-*`, `pe-*`, `start-*`, `text-start`.",
        "- Icons are passed as component references: `<Button iconLeading={ArrowRight}>`.",
        "",
        "## Machine-readable endpoints",
        "",
        `- [Registry index](${absoluteUrl("/r/index.json")}): every component, its layer, type and dependencies.`,
        `- Component entry: \`${absoluteUrl("/r")}/<name>.json\` (includes the component's source).`,
        `- [components.json schema](${absoluteUrl("/schema.json")}).`,
        `- Semantic manifest: entries also carry optional \`intent\`, \`avoid_when\`, \`composes_with\`, \`a11y_contract\`, \`responsive_contract\`, \`token_contract\` and \`requires_data\` fields for choosing a component, not just installing it: see [Registry metadata for agents](${absoluteUrl(markdownUrl("/docs/registry-metadata"))}).`,
        "- CLI: `npx @properui/cli@latest add <component>` writes the files and resolves dependencies.",
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
