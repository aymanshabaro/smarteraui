import type { Metadata } from "next";
import { DocsShell } from "~/components/docs-shell";
import { Overview } from "~/components/overview";
import { getContentPages } from "~/lib/content";
import { SITE_NAME, absoluteUrl } from "~/lib/site";

const TITLE = "Marketing";
const DESCRIPTION = "Marketing sections and complete marketing pages — heroes, pricing, testimonials, footers and the landing pages built from them.";

export const metadata: Metadata = {
    title: TITLE,
    description: DESCRIPTION,
    alternates: { canonical: absoluteUrl("/marketing") },
    openGraph: { title: `${TITLE} | ${SITE_NAME}`, description: DESCRIPTION, url: absoluteUrl("/marketing"), siteName: SITE_NAME },
};

export default function MarketingOverviewPage() {
    const marketing = getContentPages("marketing");

    return (
        <DocsShell crumbs={[{ title: "Marketing components", href: "/marketing" }, { title: "Overview" }]}>
            <Overview
                title={TITLE}
                description={DESCRIPTION}
                groups={[
                    { title: "Marketing components", pages: marketing.filter((page) => page.frontmatter.section === "marketing") },
                    { title: "Marketing examples", pages: marketing.filter((page) => page.frontmatter.section === "marketing-examples") },
                ]}
            />
        </DocsShell>
    );
}
