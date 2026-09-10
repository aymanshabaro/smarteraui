import { Button } from "@/components/base/buttons/button";
import { ProperLogo } from "@/components/foundations/logo/proper-logo";
import { sortCx } from "@/utils/cx";

const styles = sortCx({
    footerLink: "max-h-5 text-footer-button-fg hover:text-footer-button-fg_hover",
    newBadge: "ms-1 rounded-md bg-white/10 px-1.5 py-0.5 text-xs font-medium text-white ring-1 ring-white/30 ring-inset",
});

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

/** Brand-tinted logo row beside three link columns, closed by a positioning statement and copyright. */
export const FooterLarge14Brand = () => (
    <footer className="bg-brand-section py-12 md:pt-16">
        <div className="max-w-container mx-auto px-4 md:px-8">
            <div className="flex flex-col justify-between gap-12 md:gap-16 lg:flex-row">
                <ProperLogo className="dark-mode" />

                <nav className="max-w-(--breakpoint-sm) flex-1">
                    <ul className="grid grid-cols-2 gap-8 md:grid-cols-3">
                        {columns.map((column) => (
                            <li key={column.title}>
                                <h3 className="text-quaternary_on-brand text-sm font-semibold">{column.title}</h3>
                                <ul className="mt-4 flex flex-col gap-3">
                                    {column.items.map((item) => (
                                        <li key={item.label} className="flex">
                                            <Button
                                                href={item.href}
                                                color="link-color"
                                                size="md"
                                                className={styles.footerLink}
                                                iconTrailing={item.isNew ? <span className={styles.newBadge}>New</span> : undefined}
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

            <div className="border-brand_alt mt-12 flex flex-col gap-y-8 border-t pt-8 md:mt-16 md:flex-row md:items-end md:justify-between">
                <div className="max-w-3xl">
                    <p className="text-primary_on-brand text-lg font-semibold">Move faster with Proper UI</p>
                    <p className="text-tertiary_on-brand text-md mt-1">Save countless hours of design and ship great looking designs faster.</p>
                </div>
                <p className="text-quaternary_on-brand text-sm">© 2077 Proper UI. All rights reserved.</p>
            </div>
        </div>
    </footer>
);
