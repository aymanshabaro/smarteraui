import { Badge } from "../../base/badges/badges";
import { Button } from "../../base/buttons/button";
import { ProperLogo } from "../../foundations/logo/proper-logo";

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
];

/** Logo beside three link columns, closed by a positioning statement and copyright. */
export const FooterLarge14 = () => (
    <footer className="bg-primary py-12 md:pt-16">
        <div className="max-w-container mx-auto px-4 md:px-8">
            <div className="flex flex-col justify-between gap-12 md:gap-16 lg:flex-row">
                <ProperLogo className="h-7 w-min shrink-0" />

                <nav className="max-w-(--breakpoint-sm) flex-1">
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
            </div>

            <div className="border-secondary mt-12 flex flex-col gap-y-8 border-t pt-8 md:mt-16 md:flex-row md:items-end md:justify-between">
                <div className="max-w-3xl">
                    <p className="text-primary text-lg font-semibold">Move faster with Proper UI</p>
                    <p className="text-tertiary text-md mt-1">Save countless hours of design and ship great looking designs faster.</p>
                </div>
                <p className="text-quaternary text-sm">© 2077 Proper UI. All rights reserved.</p>
            </div>
        </div>
    </footer>
);
