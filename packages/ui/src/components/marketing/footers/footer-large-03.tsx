import { Badge } from "@/components/base/badges/badges";
import { AppStoreButton, GooglePlayButton } from "@/components/base/buttons/app-store-buttons";
import { Button } from "@/components/base/buttons/button";
import { SmarteraLogo } from "@/components/foundations/logo/smartera-logo";
import { sortCx } from "@/utils/cx";

const styles = sortCx({
    columnTitle: "text-primary text-sm font-semibold",
});

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
 * Five link columns beside an app-store column, closed by a divider carrying the logo and the
 * copyright line.
 */
export const FooterLarge03 = () => {
    return (
        <footer className="bg-primary py-12 md:pt-16">
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
                                                className="max-h-5"
                                                iconTrailing={
                                                    item.badge ? (
                                                        <Badge type="modern" size="sm" className="ms-1">
                                                            {item.badge}
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

                    <div className="w-full md:max-w-[135px]">
                        <h3 className={styles.columnTitle}>Get the app</h3>

                        <div className="mt-4 flex w-max flex-row gap-4 md:flex-col">
                            <AppStoreButton className="w-[135px]" />
                            <GooglePlayButton className="w-[135px]" />
                        </div>
                    </div>
                </nav>

                <div className="border-secondary mt-12 flex flex-col justify-between gap-6 border-t pt-8 md:mt-16 md:flex-row md:items-center">
                    <SmarteraLogo className="h-7 w-min" />

                    <p className="text-quaternary text-sm">© 2077 Smartera. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};
