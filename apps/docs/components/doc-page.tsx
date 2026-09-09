import type { ReactNode } from "react";
import type { Area, Frontmatter } from "~/lib/content";
import { getBreadcrumbs, getSiblings } from "~/lib/site-nav";
import { getToc } from "~/lib/toc";
import { DocsShell } from "./docs-shell";
import { DocsPageProvider } from "./page-context";
import { PageHeader } from "./page-header";
import { PrevNext } from "./prev-next";

/**
 * Component page template (spec 08-docs-site.md § Component page template):
 * header → description → resource links → MDX body → prev/next.
 */
export const DocPage = ({
    area,
    slug,
    frontmatter,
    source,
    children,
}: {
    area: Area;
    slug: string;
    frontmatter: Frontmatter;
    source: string;
    children: ReactNode;
}) => {
    const pathname = `/${area}/${slug}`;
    const siblings = getSiblings(pathname);

    return (
        <DocsShell crumbs={getBreadcrumbs(pathname, frontmatter.title, area)} toc={getToc(source)}>
            <DocsPageProvider
                value={{ pathname, title: frontmatter.title, install: frontmatter.install, source: frontmatter.source, demoFile: frontmatter.demoFile ?? slug }}
            >
                <PageHeader frontmatter={frontmatter} pathname={pathname} siblings={siblings} />
                <div data-docs="true" className="w-full max-w-none">
                    {children}
                </div>
                <PrevNext siblings={siblings} />
            </DocsPageProvider>
        </DocsShell>
    );
};
