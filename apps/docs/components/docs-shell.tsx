import type { ReactNode } from "react";
import { getSearchIndex } from "~/lib/search-index";
import { getSiteNav } from "~/lib/site-nav";
import type { Crumb } from "~/lib/site-nav";
import type { TocEntry } from "~/lib/toc";
import { SearchProvider } from "./search";
import { Sidebar } from "./sidebar";
import { TableOfContents } from "./toc";
import { TopBar } from "./top-bar";

/**
 * Global chrome: sidebar, top bar, centred content column and the "On this page" rail.
 * Layout classes mirror docs/spec/reference/html/uui__base__buttons.html.
 */
export const DocsShell = ({ crumbs, toc = [], children }: { crumbs: Crumb[]; toc?: TocEntry[]; children: ReactNode }) => {
    const nav = getSiteNav();

    return (
        <SearchProvider index={getSearchIndex()}>
            <Sidebar nav={nav} />
            <TopBar crumbs={crumbs} nav={nav} />

            <div className="h-15 w-full" />

            <div className="lg:pl-62">
                <div className="flex items-start px-4 py-16 lg:px-8 2xl:py-20">
                    <main className="relative mx-auto flex w-full max-w-304 min-w-0 flex-1 flex-col lg:flex-row">
                        <div className="text-tertiary size-full">{children}</div>
                    </main>
                    <TableOfContents entries={toc} />
                </div>
            </div>
        </SearchProvider>
    );
};
