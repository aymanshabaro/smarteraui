import { Button } from "@/components/base/buttons/button";
import { Form } from "@/components/base/form/form";
import { Input } from "@/components/base/input/input";
import { SmarteraLogo } from "@/components/foundations/logo/smartera-logo";
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

/** Brand-tinted newsletter sign-up above six link columns and a logo/copyright row. */
export const FooterLarge05Brand = () => (
    <footer className="bg-brand-section py-12 md:pt-16">
        <div className="max-w-container mx-auto px-4 md:px-8">
            <div className="border-brand_alt flex flex-col items-start justify-between gap-8 md:flex-row md:border-b md:pb-16">
                <div className="flex flex-col gap-2">
                    <p className="text-primary_on-brand text-lg font-semibold md:text-xl">Join our newsletter</p>
                    <p className="text-tertiary_on-brand text-md">We&apos;ll send you a nice letter once per week. No spam.</p>
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

            <div className="border-brand_alt mt-12 flex flex-col justify-between gap-6 border-t pt-8 md:mt-16 md:flex-row md:items-center">
                <SmarteraLogo className="dark-mode" />
                <p className="text-quaternary_on-brand text-sm">© 2077 Smartera. All rights reserved.</p>
            </div>
        </div>
    </footer>
);
