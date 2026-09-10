import { ChevronRight } from "@properui/icons";
import { Badge } from "@/components/base/badges/badges";
import { Button } from "@/components/base/buttons/button";
import { Form } from "@/components/base/form/form";
import { Input } from "@/components/base/input/input";
import { ProperLogo } from "@/components/foundations/logo/proper-logo";
import { sortCx } from "@/utils/cx";
import { LOGOS } from "@/utils/demo-assets";

const styles = sortCx({
    legalLink:
        "text-quaternary outline-focus-ring hover:text-tertiary rounded-xs text-sm transition duration-100 ease-linear focus-visible:outline-2 focus-visible:outline-offset-2",
    companyLogo: "-ms-1 size-6 rounded-full object-cover outline-[0.5px] -outline-offset-[0.5px] outline-black/16 ring-[1.5px] ring-white first:ms-0",
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

const legalLinks = [
    { label: "Terms", href: "/terms" },
    { label: "Privacy", href: "/privacy" },
    { label: "Cookies", href: "/cookies" },
];

/** Brand column with a social-proof pill, two link columns and a newsletter sign-up. */
export const FooterLarge04 = () => (
    <footer className="bg-primary py-12 md:pt-16">
        <div className="max-w-container mx-auto px-4 md:px-8">
            <div className="flex flex-col gap-12 md:gap-16 xl:flex-row">
                <div className="flex w-full flex-col gap-6 md:max-w-xs">
                    <ProperLogo className="h-7 w-min shrink-0" />
                    <p className="text-tertiary text-md">Design amazing digital experiences that create more happy in the world.</p>

                    <a
                        href="/customers"
                        className="bg-primary_alt ring-secondary_alt hover:bg-primary_hover flex w-max items-center gap-3 rounded-full py-1.5 ps-1.5 pe-2 shadow-xs ring-1 transition duration-100 ease-linear"
                    >
                        <div className="flex items-start">
                            {LOGOS.slice(0, 4).map((logo) => (
                                <img key={logo.name} src={logo.src} alt={logo.name} className={styles.companyLogo} />
                            ))}
                        </div>
                        <hr className="bg-border-secondary h-4 w-px rounded-full border-none" />
                        <div className="flex items-center gap-1.5">
                            <p className="text-primary text-sm font-semibold">Join 2,000+ companies</p>
                            <ChevronRight aria-hidden="true" className="text-fg-quaternary size-4 rtl:-scale-x-100" />
                        </div>
                    </a>
                </div>

                <nav className="flex flex-1 flex-col-reverse gap-12 md:flex-row md:gap-8 xl:justify-end">
                    <ul className="grid w-full grid-cols-2 gap-8 md:max-w-xs">
                        {columns.map((column) => (
                            <li key={column.title}>
                                <h3 className="text-primary text-sm font-semibold">{column.title}</h3>
                                <ul className="mt-4 flex flex-col gap-3">
                                    {column.items.map((item) => (
                                        <li key={item.label} className="flex">
                                            <Button
                                                href={item.href}
                                                color="link-color"
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

                    <Form className="flex w-full flex-col gap-4 md:max-w-90">
                        <p className="text-primary text-sm font-semibold">Stay up to date</p>
                        <div className="flex flex-col gap-4 sm:flex-row">
                            <Input isRequired size="lg" name="email" type="email" placeholder="Enter your email" wrapperClassName="flex-1" />
                            <Button type="submit" size="lg">
                                Subscribe
                            </Button>
                        </div>
                    </Form>
                </nav>
            </div>

            <div className="border-secondary mt-12 flex flex-col-reverse justify-between gap-4 border-t pt-8 md:mt-16 md:flex-row md:gap-6">
                <p className="text-quaternary text-sm">© 2077 Proper UI. All rights reserved.</p>
                <ul className="flex gap-3">
                    {legalLinks.map((link) => (
                        <li key={link.label}>
                            <a href={link.href} className={styles.legalLink}>
                                {link.label}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    </footer>
);
