import { Button } from "@/components/base/buttons/button";
import { Form } from "@/components/base/form/form";
import { Input } from "@/components/base/input/input";
import { ProperLogo } from "@/components/foundations/logo/proper-logo";
import { sortCx } from "@/utils/cx";

const styles = sortCx({
    legalLink:
        "text-quaternary_on-brand outline-focus-ring hover:text-tertiary_on-brand rounded-xs text-sm transition duration-100 ease-linear focus-visible:outline-2 focus-visible:outline-offset-2",
    footerLink: "max-h-5 text-footer-button-fg hover:text-footer-button-fg_hover",
});

const navItems = [
    { label: "Overview", href: "/product/overview" },
    { label: "Features", href: "/product/features" },
    { label: "Pricing", href: "/pricing" },
    { label: "Careers", href: "/careers" },
    { label: "Help", href: "/help" },
    { label: "Privacy", href: "/privacy" },
];

const legalLinks = [
    { label: "Terms", href: "/terms" },
    { label: "Privacy", href: "/privacy" },
    { label: "Cookies", href: "/cookies" },
];

/** Brand-tinted single-row navigation beside a newsletter sign-up, over a legal bar. */
export const FooterLarge08Brand = () => (
    <footer className="bg-brand-section py-12 md:pt-16">
        <div className="max-w-container mx-auto px-4 md:px-8">
            <div className="flex flex-col justify-between gap-x-8 gap-y-12 lg:flex-row">
                <div className="flex flex-col gap-8 md:items-start">
                    <ProperLogo className="dark-mode" />

                    <nav>
                        <ul className="grid grid-cols-2 gap-x-8 gap-y-3 sm:grid-cols-[repeat(6,max-content)]">
                            {navItems.map((item) => (
                                <li key={item.label} className="flex">
                                    <Button href={item.href} color="link-color" size="md" className={styles.footerLink}>
                                        {item.label}
                                    </Button>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>

                <Form className="flex w-full flex-col gap-4 sm:max-w-90">
                    <p className="text-primary_on-brand text-sm font-medium">Stay up to date</p>
                    <div className="flex flex-col gap-4 sm:flex-row">
                        <Input isRequired size="lg" name="email" type="email" placeholder="Enter your email" wrapperClassName="flex-1" />
                        <Button type="submit" size="lg">
                            Subscribe
                        </Button>
                    </div>
                </Form>
            </div>

            <div className="border-brand_alt mt-12 flex flex-col-reverse justify-between gap-4 border-t pt-8 md:mt-16 md:flex-row md:gap-6">
                <p className="text-quaternary_on-brand text-sm">© 2077 Proper. All rights reserved.</p>
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
