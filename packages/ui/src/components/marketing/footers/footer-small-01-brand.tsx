import { Button } from "@/components/base/buttons/button";
import { ProperLogo } from "@/components/foundations/logo/proper-logo";
import { sortCx } from "@/utils/cx";

const styles = sortCx({
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

/** Brand-tinted compact footer: logo, one row of links and the copyright. */
export const FooterSmall01Brand = () => (
    <footer className="bg-brand-section py-12">
        <div className="max-w-container mx-auto px-4 md:px-8">
            <div className="flex flex-col justify-between lg:flex-row lg:items-center">
                <div className="lg:w-40">
                    <ProperLogo className="dark-mode" />
                </div>

                <ul className="mt-8 grid grid-cols-2 gap-x-8 gap-y-3 sm:grid-cols-[repeat(6,max-content)] lg:mt-0">
                    {navItems.map((item) => (
                        <li key={item.label} className="flex">
                            <Button href={item.href} color="link-color" size="md" className={styles.footerLink}>
                                {item.label}
                            </Button>
                        </li>
                    ))}
                </ul>

                <p className="text-quaternary_on-brand mt-12 text-sm lg:mt-0 lg:w-40 lg:text-end">
                    © 2077 Proper
                    <span className="ms-1 md:hidden">All rights reserved.</span>
                </p>
            </div>
        </div>
    </footer>
);
