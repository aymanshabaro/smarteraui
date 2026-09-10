import { Badge } from "@/components/base/badges/badges";
import { Button } from "@/components/base/buttons/button";
import { ProperLogo } from "@/components/foundations/logo/proper-logo";
import { sortCx } from "@/utils/cx";

const styles = sortCx({
    columnTitle: "text-quaternary text-sm font-semibold",
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
 * A centred call-to-action above six link columns, closed by a divider carrying the logo and
 * the copyright line.
 */
export const FooterLarge09 = () => {
    return (
        <footer className="bg-primary py-12 md:pt-16">
            <div className="max-w-container mx-auto px-4 md:px-8">
                <div className="flex flex-col justify-center text-center">
                    <h2 className="text-display-xs text-primary md:text-display-sm font-semibold">Let's get started on something great</h2>
                    <p className="text-md text-tertiary mt-2 md:mt-4 md:text-xl">Join over 4,000+ startups already growing with Proper UI.</p>

                    <div className="mt-8 flex flex-col-reverse gap-3 self-stretch md:mt-12 md:flex-row md:self-center">
                        <Button size="xl" color="secondary">
                            Chat to us
                        </Button>
                        <Button size="xl">Get started</Button>
                    </div>
                </div>

                <nav className="mt-12 md:mt-16">
                    <ul className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-6">
                        {columns.map((column) => (
                            <li key={column.title}>
                                {/* h3, not h4: the call-to-action above is the h2, and heading levels must not skip. */}
                                <h3 className={styles.columnTitle}>{column.title}</h3>

                                <ul className="mt-4 flex flex-col gap-3">
                                    {column.items.map((item) => (
                                        <li key={item.label} className="flex">
                                            <Button
                                                href="#"
                                                size="md"
                                                color="link-gray"
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
                </nav>

                <div className="border-secondary mt-12 flex flex-col justify-between gap-6 border-t pt-8 md:mt-16 md:flex-row md:items-center">
                    <ProperLogo className="h-7 w-min" />

                    <p className="text-quaternary text-sm">© 2077 Proper UI. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};
