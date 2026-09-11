import { Button } from "../../base/buttons/button";
import { ProperLogo } from "../../foundations/logo/proper-logo";

const navItems = [
    { label: "Overview", href: "/product/overview" },
    { label: "Features", href: "/product/features" },
    { label: "Pricing", href: "/pricing" },
    { label: "Careers", href: "/careers" },
    { label: "Help", href: "/help" },
    { label: "Privacy", href: "/privacy" },
];

/** Compact footer: logo, one row of links and the copyright, all on a single line at desktop. */
export const FooterSmall01 = () => (
    <footer className="bg-primary py-12">
        <div className="max-w-container mx-auto px-4 md:px-8">
            <div className="flex flex-col justify-between lg:flex-row lg:items-center">
                <div className="lg:w-40">
                    <ProperLogo className="h-7 w-min shrink-0" />
                </div>

                <ul className="mt-8 grid grid-cols-2 gap-x-8 gap-y-3 sm:grid-cols-[repeat(6,max-content)] lg:mt-0">
                    {navItems.map((item) => (
                        <li key={item.label} className="flex">
                            <Button href={item.href} color="link-gray" size="md" className="max-h-5">
                                {item.label}
                            </Button>
                        </li>
                    ))}
                </ul>

                <p className="text-quaternary mt-12 text-sm lg:mt-0 lg:w-40 lg:text-end">
                    © 2077 Proper UI
                    <span className="ms-1 md:hidden">All rights reserved.</span>
                </p>
            </div>
        </div>
    </footer>
);
