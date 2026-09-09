import { Badge } from "@/components/base/badges/badges";
import { Button } from "@/components/base/buttons/button";
import { SmarteraLogo } from "@/components/foundations/logo/smartera-logo";

interface FooterLink {
    label: string;
    href: string;
    isNew?: boolean;
}

const columns: { title: string; items: FooterLink[] }[] = [
    {
        title: "Product",
        items: [
            { label: "Overview", href: "/product/overview" },
            { label: "Features", href: "/product/features" },
            { label: "Solutions", href: "/product/solutions", isNew: true },
            { label: "Tutorials", href: "/product/tutorials" },
            { label: "Pricing", href: "/pricing" },
            { label: "Releases", href: "/releases" },
        ],
    },
    {
        title: "Company",
        items: [
            { label: "About us", href: "/about" },
            { label: "Careers", href: "/careers" },
            { label: "Press", href: "/press" },
            { label: "News", href: "/news" },
            { label: "Media kit", href: "/media-kit" },
            { label: "Contact", href: "/contact" },
        ],
    },
    {
        title: "Resources",
        items: [
            { label: "Blog", href: "/blog" },
            { label: "Newsletter", href: "/newsletter" },
            { label: "Events", href: "/events" },
            { label: "Help centre", href: "/help" },
            { label: "Tutorials", href: "/tutorials" },
            { label: "Support", href: "/support" },
        ],
    },
    {
        title: "Use cases",
        items: [
            { label: "Startups", href: "/use-cases/startups" },
            { label: "Enterprise", href: "/use-cases/enterprise" },
            { label: "Government", href: "/use-cases/government" },
            { label: "SaaS centre", href: "/use-cases/saas" },
            { label: "Marketplaces", href: "/use-cases/marketplaces" },
            { label: "Ecommerce", href: "/use-cases/ecommerce" },
        ],
    },
    {
        title: "Social",
        items: [
            { label: "X", href: "https://x.com/" },
            { label: "LinkedIn", href: "https://www.linkedin.com/" },
            { label: "Facebook", href: "https://www.facebook.com/" },
            { label: "GitHub", href: "https://github.com/" },
            { label: "AngelList", href: "https://angel.co/" },
            { label: "Dribbble", href: "https://dribbble.com/" },
        ],
    },
    {
        title: "Legal",
        items: [
            { label: "Terms", href: "/terms" },
            { label: "Privacy", href: "/privacy" },
            { label: "Cookies", href: "/cookies" },
            { label: "Licenses", href: "/licenses" },
            { label: "Settings", href: "/settings" },
            { label: "Contact", href: "/contact" },
        ],
    },
];

/** Six-column link footer with the logo and copyright on a divider row underneath. */
export const FooterLarge01 = () => (
    <footer className="bg-primary py-12 md:pt-16">
        <div className="max-w-container mx-auto px-4 md:px-8">
            <nav>
                <ul className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-6">
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
                                            iconTrailing={
                                                item.isNew ? (
                                                    <Badge type="modern" size="sm" className="ms-1">
                                                        New
                                                    </Badge>
                                                ) : undefined
                                            }
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
                <SmarteraLogo className="h-7 w-min" />
                <p className="text-quaternary text-sm">© 2077 Smartera. All rights reserved.</p>
            </div>
        </div>
    </footer>
);
