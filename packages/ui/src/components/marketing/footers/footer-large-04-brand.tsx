import type { ReactNode } from "react";
import { sortCx } from "../../../utils/cx";
import { Button } from "../../base/buttons/button";
import { Form } from "../../base/form/form";
import { Input } from "../../base/input/input";
import { ProperLogo } from "../../foundations/logo/proper-logo";

const styles = sortCx({
    columnTitle: "text-quaternary_on-brand text-sm font-semibold",
    navLink: "max-h-5 text-footer-button-fg hover:text-footer-button-fg_hover",
    // The badge sits on the solid brand fill, where the neutral badge tokens have no contrast.
    badge: "ms-1 rounded-md bg-white/10 px-1.5 py-0.5 text-xs font-medium text-white ring-1 ring-white/30 ring-inset",
    legalLink:
        "text-quaternary_on-brand outline-focus-ring hover:text-tertiary_on-brand rounded-xs text-sm transition duration-100 ease-linear focus-visible:outline-2 focus-visible:outline-offset-2",
});

const emailId = "footer-large-04-brand-email";

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
        title: "Resources",
        items: [{ label: "Blog" }, { label: "Newsletter" }, { label: "Events" }, { label: "Help centre" }, { label: "Tutorials" }, { label: "Support" }],
    },
];

const legalItems = ["Terms", "Privacy", "Cookies"];

/**
 * A brand footer that pairs a logo-and-mission column with two link columns and a newsletter
 * form, closed by a divider carrying the copyright and legal links.
 */
export const FooterLarge04Brand = () => {
    return (
        <footer className="bg-brand-section py-12 md:pt-16">
            <div className="max-w-container mx-auto px-4 md:px-8">
                <div className="flex flex-col gap-12 md:gap-16 xl:flex-row">
                    <div className="flex w-full flex-col gap-6 md:max-w-xs">
                        {/* The mark is always the light lockup on the solid brand background. */}
                        <ProperLogo className="dark-mode" />

                        <p className="text-tertiary_on-brand text-md">Design amazing digital experiences that create more happy in the world.</p>
                    </div>

                    <nav className="flex flex-1 flex-col-reverse gap-12 md:flex-row md:gap-8 xl:justify-end">
                        <ul className="grid w-full grid-cols-2 gap-8 md:max-w-xs">
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

                        <Form className="flex w-full flex-col gap-4 md:max-w-90">
                            <label htmlFor={emailId} className="text-primary_on-brand text-sm font-semibold">
                                Stay up to date
                            </label>

                            <div className="flex flex-col gap-4 sm:flex-row">
                                <Input isRequired id={emailId} size="lg" name="email" type="email" placeholder="Enter your email" wrapperClassName="flex-1" />
                                <Button type="submit" size="lg">
                                    Subscribe
                                </Button>
                            </div>
                        </Form>
                    </nav>
                </div>

                <div className="border-brand_alt mt-12 flex flex-col-reverse justify-between gap-4 border-t pt-8 md:mt-16 md:flex-row md:gap-6">
                    <p className="text-quaternary_on-brand text-sm">© 2077 Proper UI. All rights reserved.</p>

                    <ul className="flex gap-3">
                        {legalItems.map((item) => (
                            <li key={item}>
                                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid -- placeholder href for a marketing section */}
                                <a href="#" className={styles.legalLink}>
                                    {item}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </footer>
    );
};
