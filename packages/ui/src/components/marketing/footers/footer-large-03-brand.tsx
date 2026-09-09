import type { ReactNode } from "react";
import { AppStoreButton, GooglePlayButton } from "@/components/base/buttons/app-store-buttons-outline";
import { Button } from "@/components/base/buttons/button";
import { SmarteraLogo } from "@/components/foundations/logo/smartera-logo";
import { sortCx } from "@/utils/cx";

const styles = sortCx({
    columnTitle: "text-quaternary_on-brand text-sm font-semibold",
    navLink: "max-h-5 text-footer-button-fg hover:text-footer-button-fg_hover",
    // The badge sits on the solid brand fill, where the neutral badge tokens have no contrast.
    badge: "ml-1 rounded-md bg-white/10 px-1.5 py-0.5 text-xs font-medium text-white ring-1 ring-white/30 ring-inset",
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
        title: "Social",
        items: [{ label: "X" }, { label: "LinkedIn" }, { label: "Facebook" }, { label: "GitHub" }, { label: "AngelList" }, { label: "Dribbble" }],
    },
    {
        title: "Legal",
        items: [{ label: "Terms" }, { label: "Privacy" }, { label: "Cookies" }, { label: "Licenses" }, { label: "Settings" }, { label: "Contact" }],
    },
];

/**
 * The brand-background twin of `FooterLarge03`: five link columns beside an app-store column,
 * closed by a divider carrying the logo and the copyright line.
 */
export const FooterLarge03Brand = () => {
    return (
        <footer className="bg-brand-section py-12 md:pt-16">
            <div className="max-w-container mx-auto px-4 md:px-8">
                <nav className="flex flex-col-reverse gap-12 md:flex-row md:gap-16">
                    <ul className="grid flex-1 grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-5">
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

                    <div className="w-full md:max-w-[135px]">
                        <h3 className="text-primary_on-brand text-sm font-semibold">Get the app</h3>

                        <div className="mt-4 flex w-max flex-row gap-4 md:flex-col">
                            {/* The outline badges are scoped dark so they read as light-on-brand. */}
                            <AppStoreButton className="dark-mode w-[135px]" />
                            <GooglePlayButton className="dark-mode w-[135px]" />
                        </div>
                    </div>
                </nav>

                <div className="border-brand_alt mt-12 flex flex-col justify-between gap-6 border-t pt-8 md:mt-16 md:flex-row md:items-center">
                    {/* The mark is always the light lockup on the solid brand background. */}
                    <SmarteraLogo className="dark-mode" />

                    <p className="text-quaternary_on-brand text-sm">© 2077 Smartera. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};
