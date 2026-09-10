import { ChevronRight } from "@properui/icons";
import { Badge } from "@/components/base/badges/badges";
import { Button } from "@/components/base/buttons/button";
import { Form } from "@/components/base/form/form";
import { Input } from "@/components/base/input/input";
import { ProperLogo } from "@/components/foundations/logo/proper-logo";
import { sortCx } from "@/utils/cx";
import { LOGOS } from "@/utils/demo-assets";

const styles = sortCx({
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

/** Newsletter sign-up above six link columns, closed by a logo and copyright row. */
export const FooterLarge05 = () => (
    <footer className="bg-primary py-12 md:pt-16">
        <div className="max-w-container mx-auto px-4 md:px-8">
            <div className="border-secondary flex flex-col items-start justify-between gap-8 md:flex-row md:border-b md:pb-16">
                <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                        <p className="text-primary text-lg font-semibold md:text-xl">Join our newsletter</p>
                        <p className="text-tertiary text-md">We&apos;ll send you a nice letter once per week. No spam.</p>
                    </div>

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

                <Form className="w-full sm:w-100">
                    <div className="flex flex-col gap-4 sm:flex-row">
                        <Input isRequired size="lg" name="email" type="email" placeholder="Enter your email" wrapperClassName="flex-1" />
                        <Button type="submit" size="lg">
                            Subscribe
                        </Button>
                    </div>
                </Form>
            </div>

            <nav className="mt-12 md:mt-16">
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
                <ProperLogo className="h-7 w-min" />
                <p className="text-quaternary text-sm">© 2077 Proper UI. All rights reserved.</p>
            </div>
        </div>
    </footer>
);
