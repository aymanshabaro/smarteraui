import { Button } from "@/components/base/buttons/button";
import { Form } from "@/components/base/form/form";
import { Input } from "@/components/base/input/input";
import { SmarteraLogo } from "@/components/foundations/logo/smartera-logo";

const navItems = [
    { label: "Overview", href: "/product/overview" },
    { label: "Features", href: "/product/features" },
    { label: "Pricing", href: "/pricing" },
    { label: "Careers", href: "/careers" },
    { label: "Help", href: "/help" },
    { label: "Privacy", href: "/privacy" },
];

/** Centred logo and navigation over a newsletter sign-up and copyright row. */
export const FooterLarge16 = () => (
    <footer className="bg-primary py-12 md:pt-16">
        <div className="max-w-container mx-auto px-4 md:px-8">
            <div className="flex flex-col gap-8 md:items-center">
                <SmarteraLogo className="h-7 w-min shrink-0" />

                <nav>
                    <ul className="grid grid-cols-2 gap-x-8 gap-y-3 sm:grid-cols-[repeat(6,max-content)]">
                        {navItems.map((item) => (
                            <li key={item.label} className="flex">
                                <Button href={item.href} color="link-gray" size="md" className="max-h-5">
                                    {item.label}
                                </Button>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>

            <div className="relative mt-12 flex flex-col justify-between gap-8 pt-8 md:mt-16 md:flex-row md:items-center">
                {/* Hairline divider drawn as an overlay so it spans the row without adding a border box. */}
                <div className="bg-border-secondary absolute start-0 top-0 h-px w-full" />

                <Form className="flex w-full flex-col gap-4 sm:flex-row md:max-w-100">
                    <Input isRequired size="lg" name="email" type="email" placeholder="Enter your email" wrapperClassName="flex-1" />
                    <Button type="submit" size="lg">
                        Subscribe
                    </Button>
                </Form>

                <p className="text-quaternary text-sm">© 2077 Smartera. All rights reserved.</p>
            </div>
        </div>
    </footer>
);
