import { Button } from "@smarteraui/ui/components/base/buttons/button";
import { REPO_URL } from "./content";
import { LandingLogo } from "./landing-logo";

/**
 * Footer.
 *
 * Copied from `marketing/footers/footer-large-01` — the link-column grid and the divider row
 * that carries the logo and the copyright — narrowed from six demo columns to the three this
 * site actually has. Every internal href is a route that exists.
 */

const columns: { title: string; items: { label: string; href: string; external?: boolean }[] }[] = [
    {
        title: "Documentation",
        items: [
            { label: "Introduction", href: "/docs/introduction" },
            { label: "Installation", href: "/docs/installation" },
            { label: "Theming", href: "/docs/theming" },
            { label: "Dark mode", href: "/docs/dark-mode" },
            { label: "Right-to-left", href: "/docs/rtl" },
            { label: "CLI tool", href: "/docs/cli" },
        ],
    },
    {
        title: "Components",
        items: [
            { label: "Base components", href: "/components" },
            { label: "Application UI", href: "/application-ui" },
            { label: "Marketing", href: "/marketing" },
            { label: "Typography", href: "/docs/typography" },
            { label: "Icons", href: "/docs/icons" },
            { label: "All documentation", href: "/docs" },
        ],
    },
    {
        title: "Project",
        items: [
            { label: "GitHub", href: REPO_URL, external: true },
            { label: "Issues", href: `${REPO_URL}/issues`, external: true },
            { label: "MIT licence", href: `${REPO_URL}/blob/main/LICENSE`, external: true },
            { label: "Upgrade guide", href: "/docs/upgrade" },
        ],
    },
];

export const LandingFooter = () => (
    <footer className="bg-primary py-12 md:pt-16">
        <div className="max-w-container mx-auto px-4 md:px-8">
            <nav aria-label="Footer">
                <ul className="grid grid-cols-2 gap-8 md:grid-cols-3">
                    {columns.map((column) => (
                        <li key={column.title}>
                            <h3 className="text-quaternary text-sm font-semibold">{column.title}</h3>
                            <ul className="mt-4 flex flex-col gap-3">
                                {column.items.map((item) => (
                                    <li key={item.label} className="flex">
                                        <Button
                                            href={item.href}
                                            color="link-gray"
                                            size="md"
                                            className="max-h-5"
                                            target={item.external ? "_blank" : undefined}
                                            rel={item.external ? "noopener noreferrer" : undefined}
                                        >
                                            {item.label}
                                        </Button>
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            </nav>

            <div className="border-secondary mt-12 flex flex-col justify-between gap-6 border-t pt-8 md:mt-16 md:flex-row md:items-center">
                <LandingLogo className="h-7" />
                <p className="text-quaternary text-sm">MIT licensed. Copyright 2026 Ayman Shabaro.</p>
            </div>
        </div>
    </footer>
);
