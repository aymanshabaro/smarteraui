import type { Metadata } from "next";
import Link from "next/link";
import { DocsShell } from "~/components/docs-shell";
import { buttonClasses } from "~/components/primitives";
import { SITE_NAME, absoluteUrl } from "~/lib/site";

const TITLE = "Documentation";
const DESCRIPTION = "The Proper design system — React components built with React Aria and Tailwind CSS, documented example by example.";

export const metadata: Metadata = {
    title: TITLE,
    description: DESCRIPTION,
    alternates: { canonical: absoluteUrl("/docs") },
    openGraph: { title: `${TITLE} | ${SITE_NAME}`, description: DESCRIPTION, url: absoluteUrl("/docs"), siteName: SITE_NAME },
};

const ENTRY_POINTS = [
    { title: "Installation", href: "/docs/installation", description: "Add the package, the Tailwind layer and the providers to a new or existing app." },
    { title: "Base components", href: "/components", description: "Buttons, inputs, badges, avatars and the other primitives." },
    { title: "Application UI", href: "/application-ui", description: "Dashboards, tables, modals, navigation and full page examples." },
    { title: "Marketing", href: "/marketing", description: "Heroes, pricing, testimonials, footers and complete marketing pages." },
];

export default function DocsHomePage() {
    return (
        <DocsShell crumbs={[{ title: "Documentation" }, { title: "Overview" }]}>
            <div className="mb-10">
                <h1 className="text-primary md:text-display-xs max-w-3xl text-xl font-semibold text-balance md:text-wrap">{SITE_NAME}</h1>
                <p className="text-md text-tertiary mt-3 max-w-3xl">{DESCRIPTION}</p>
                <div className="mt-6 flex flex-wrap items-center gap-2.5">
                    <Link href="/docs/installation" className={buttonClasses("primary")}>
                        <span className="px-0.5">Get started</span>
                    </Link>
                    <Link href="/components" className={buttonClasses("secondary")}>
                        <span className="px-0.5">Browse components</span>
                    </Link>
                </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {ENTRY_POINTS.map((entry) => (
                    <Link
                        key={entry.href}
                        href={entry.href}
                        className="bg-primary outline-focus-ring ring-secondary hover:bg-primary_hover flex flex-col gap-1 rounded-xl p-5 ring-1 transition duration-100 ease-linear ring-inset focus-visible:outline-2 focus-visible:outline-offset-2"
                    >
                        <span className="text-md text-primary font-semibold">{entry.title}</span>
                        <span className="text-tertiary text-sm">{entry.description}</span>
                    </Link>
                ))}
            </div>
        </DocsShell>
    );
}
