import { ChevronRight } from "@properui/icons";
import { Badge } from "@/components/base/badges/badges";
import { Button } from "@/components/base/buttons/button";
import { Form } from "@/components/base/form/form";
import { Input } from "@/components/base/input/input";
import { ProperLogo } from "@/components/foundations/logo/proper-logo";
import { AngelList, Dribbble, Facebook, GitHub, Layers, LinkedIn, X } from "@/components/foundations/social-icons";
import { sortCx } from "@/utils/cx";
import { LOGOS } from "@/utils/demo-assets";

const styles = sortCx({
    columnTitle: "text-quaternary text-sm font-semibold",
    socialLink:
        "text-fg-quaternary outline-focus-ring hover:text-fg-quaternary_hover flex rounded-xs transition duration-100 ease-linear focus-visible:outline-2 focus-visible:outline-offset-2",
    companyAvatar: "-ms-1 size-6 rounded-full object-cover ring-[1.5px] ring-white outline-[0.5px] -outline-offset-[0.5px] outline-black/16 first:ms-0",
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

const socialLinks = [
    { label: "X", href: "https://x.com/", icon: X },
    { label: "LinkedIn", href: "https://www.linkedin.com/", icon: LinkedIn },
    { label: "Facebook", href: "https://www.facebook.com/", icon: Facebook },
    { label: "GitHub", href: "https://github.com/", icon: GitHub },
    { label: "AngelList", href: "https://angel.co/", icon: AngelList },
    { label: "Dribbble", href: "https://dribbble.com/", icon: Dribbble },
    { label: "Layers", href: "https://layers.com/", icon: Layers },
];

const companies = LOGOS.slice(0, 4);

/**
 * A launch-notification band above a five-column footer whose first column carries the logo,
 * the mission statement and a social-proof pill, closed by the copyright and social row.
 */
export const FooterLarge12 = () => {
    return (
        <footer className="bg-primary">
            <div className="bg-secondary_alt py-10 md:py-12">
                <div className="max-w-container mx-auto px-4 md:px-8">
                    <div className="flex flex-col items-start justify-between gap-8 md:flex-row">
                        <div className="flex flex-col gap-4">
                            <div className="flex flex-col gap-2 md:gap-4">
                                <p className="text-display-xs text-primary md:text-display-sm font-semibold">Get notified when we launch</p>
                                <p className="text-tertiary text-md md:text-xl">Stay up to date with the latest news, announcements, and articles.</p>
                            </div>
                        </div>

                        <Form className="w-full sm:w-100">
                            <div className="flex flex-col gap-4 sm:flex-row">
                                <Input isRequired size="lg" name="email" type="email" placeholder="Enter your email" wrapperClassName="flex-1" />
                                <Button type="submit" size="lg">
                                    Subscribe
                                </Button>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>

            <div className="max-w-container mx-auto px-4 py-12 md:px-8 md:pt-16">
                <div className="flex flex-col gap-12 md:gap-16 xl:flex-row">
                    <div className="flex flex-col gap-6 md:w-80">
                        <ProperLogo className="h-7 w-min shrink-0" />

                        <p className="text-tertiary text-md">Design amazing digital experiences that create more happy in the world.</p>

                        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid -- placeholder href for a marketing section */}
                        <a
                            href="#"
                            className="bg-primary_alt ring-secondary_alt hover:bg-primary_hover flex w-max items-center gap-3 rounded-full py-1.5 ps-1.5 pe-2 shadow-xs ring-1 transition duration-100 ease-linear"
                        >
                            <div className="flex items-start">
                                {companies.map((company) => (
                                    <img key={company.name} src={company.src} alt={company.name} className={styles.companyAvatar} />
                                ))}
                            </div>

                            <hr className="bg-border-secondary h-4 w-px rounded-full border-none" />

                            <div className="flex items-center gap-1.5">
                                <p className="text-primary text-sm font-semibold">Join 2,000+ companies</p>
                                <ChevronRight aria-hidden="true" className="text-fg-quaternary size-4" />
                            </div>
                        </a>
                    </div>

                    <nav className="flex-1">
                        <ul className="grid flex-1 grid-cols-2 gap-8 md:grid-cols-5">
                            {columns.map((column) => (
                                <li key={column.title}>
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
                </div>

                <div className="border-secondary mt-12 flex flex-col-reverse justify-between gap-6 border-t pt-8 md:mt-16 md:flex-row">
                    <p className="text-quaternary text-sm">© 2077 Proper. All rights reserved.</p>

                    <ul className="flex gap-4">
                        {socialLinks.map(({ label, href, icon: Icon }) => (
                            <li key={label}>
                                <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className={styles.socialLink}>
                                    <Icon aria-hidden="true" className="size-5" />
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </footer>
    );
};
