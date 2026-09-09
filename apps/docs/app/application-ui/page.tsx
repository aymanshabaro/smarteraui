import type { Metadata } from "next";
import { DocsShell } from "~/components/docs-shell";
import { Overview } from "~/components/overview";
import { getContentPages } from "~/lib/content";
import { SITE_NAME, absoluteUrl } from "~/lib/site";

const TITLE = "Application UI";
const DESCRIPTION = "Application components and full page examples — dashboards, settings, tables, modals and the shared authentication screens.";

/** Same split the sidebar uses (spec 08-docs-site.md § Global chrome, groups 6 and 7). */
const APP_EXAMPLE_SLUGS = ["dashboards", "dashboards-02", "settings-pages", "settings-pages-02", "informational-pages", "informational-pages-02"];
const SHARED_EXAMPLE_SLUGS = ["log-in-pages", "sign-up-pages", "verification-pages", "forgot-password-pages", "404-sections", "email-templates"];

export const metadata: Metadata = {
    title: TITLE,
    description: DESCRIPTION,
    alternates: { canonical: absoluteUrl("/application-ui") },
    openGraph: { title: `${TITLE} | ${SITE_NAME}`, description: DESCRIPTION, url: absoluteUrl("/application-ui"), siteName: SITE_NAME },
};

export default function ApplicationUiOverviewPage() {
    const components = getContentPages("components");
    const examples = [...APP_EXAMPLE_SLUGS, ...SHARED_EXAMPLE_SLUGS];

    return (
        <DocsShell crumbs={[{ title: "Application UI components", href: "/application-ui" }, { title: "Overview" }]}>
            <Overview
                title={TITLE}
                description={DESCRIPTION}
                groups={[
                    {
                        title: "Application UI components",
                        pages: components.filter((page) => page.frontmatter.section === "application" && !examples.includes(page.slug)),
                    },
                    { title: "Application UI examples", pages: components.filter((page) => APP_EXAMPLE_SLUGS.includes(page.slug)) },
                    { title: "Shared page examples", pages: components.filter((page) => SHARED_EXAMPLE_SLUGS.includes(page.slug)) },
                ]}
            />
        </DocsShell>
    );
}
