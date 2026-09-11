import type { ReactNode } from "react";
import { sortCx } from "../../../utils/cx";
import { Button } from "../../base/buttons/button";
import { ProperLogo } from "../../foundations/logo/proper-logo";

const styles = sortCx({
    columnTitle: "text-quaternary_on-brand text-sm font-semibold",
    navLink: "max-h-5 text-footer-button-fg hover:text-footer-button-fg_hover",
    // The badge sits on the solid brand fill, where the neutral badge tokens have no contrast.
    badge: "ms-1 rounded-md bg-white/10 px-1.5 py-0.5 text-xs font-medium text-white ring-1 ring-white/30 ring-inset",
});

const badge = (label: string): ReactNode => <span className={styles.badge}>{label}</span>;

const columns = [
    {
        title: "Product",
        items: [
            { label: "Overview" },
            { label: "Features" },
            { label: "Solutions", badge: "New" },
            { label: "Tutorials" },
            { label: "Pricing" },
            { label: "Releases" },
        ],
    },
    {
        title: "Company",
        items: [{ label: "About us" }, { label: "Careers" }, { label: "Press" }, { label: "News" }, { label: "Media kit" }, { label: "Contact" }],
    },
    {
        title: "Resources",
        items: [{ label: "Blog" }, { label: "Newsletter" }, { label: "Events" }, { label: "Help centre" }, { label: "Tutorials" }, { label: "Support" }],
    },
    {
        title: "Use cases",
        items: [
            { label: "Startups" },
            { label: "Enterprise" },
            { label: "Government" },
            { label: "SaaS centre" },
            { label: "Marketplaces" },
            { label: "Ecommerce" },
        ],
    },
    {
        title: "Social",
        items: [{ label: "X" }, { label: "LinkedIn" }, { label: "Facebook" }, { label: "GitHub" }, { label: "AngelList" }, { label: "Dribbble" }],
    },
    {
        title: "Legal",
        items: [{ label: "Terms" }, { label: "Privacy" }, { label: "Cookies" }, { label: "Licenses" }, { label: "Settings" }, { label: "Contact" }],
    },
];

/**
 * A brand footer built from six link columns, closed by a divider carrying the logo and the
 * copyright line. The grid steps from two columns on mobile to three, then six.
 */
export const FooterLarge01Brand = () => {
    return (
        <footer className="bg-brand-section py-12 md:pt-16">
            <div className="max-w-container mx-auto px-4 md:px-8">
                <nav>
                    <ul className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-6">
                        {columns.map((column) => (
                            <li key={column.title}>
                                <h3 className={styles.columnTitle}>{column.title}</h3>

                                <ul className="mt-4 flex flex-col gap-3">
                                    {column.items.map((item) => (
                                        <li key={item.label} className="flex">
                                            <Button
                                                href="#"
                                                size="md"
                                                color="link-color"
                                                className={styles.navLink}
                                                iconTrailing={item.badge ? badge(item.badge) : undefined}
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

                <div className="border-brand_alt mt-12 flex flex-col justify-between gap-6 border-t pt-8 md:mt-16 md:flex-row md:items-center">
                    {/* The mark is always the light lockup on the solid brand background. */}
                    <ProperLogo className="dark-mode" />

                    <p className="text-quaternary_on-brand text-sm">© 2077 Proper UI. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};
