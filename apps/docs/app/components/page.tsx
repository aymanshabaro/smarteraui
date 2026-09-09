import type { Metadata } from "next";
import { DocsShell } from "~/components/docs-shell";
import { Overview } from "~/components/overview";
import { getContentPages } from "~/lib/content";
import { SITE_NAME, absoluteUrl } from "~/lib/site";

const TITLE = "Base components";
const DESCRIPTION = "Free and open-source React base components — the buttons, inputs, badges and other primitives every screen is built from.";

export const metadata: Metadata = {
    title: TITLE,
    description: DESCRIPTION,
    alternates: { canonical: absoluteUrl("/components") },
    openGraph: { title: `${TITLE} | ${SITE_NAME}`, description: DESCRIPTION, url: absoluteUrl("/components"), siteName: SITE_NAME },
};

export default function ComponentsOverviewPage() {
    const components = getContentPages("components");

    return (
        <DocsShell crumbs={[{ title: TITLE, href: "/components" }, { title: "Overview" }]}>
            <Overview
                title={TITLE}
                description={DESCRIPTION}
                groups={[{ title: TITLE, pages: components.filter((page) => page.frontmatter.section === "base") }]}
            />
        </DocsShell>
    );
}
