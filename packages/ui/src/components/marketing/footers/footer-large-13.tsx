"use client";

import { PlayCircle } from "@properui/icons";
import { Button } from "@/components/base/buttons/button";
import { ProperLogoMinimal } from "@/components/foundations/logo/proper-logo-minimal";
import { sortCx } from "@/utils/cx";

const styles = sortCx({
    legalLink:
        "text-quaternary outline-focus-ring hover:text-tertiary flex rounded-xs text-sm transition duration-100 ease-linear focus-visible:outline-2 focus-visible:outline-offset-2",
});

const legalLinks = [
    { label: "Terms", href: "/terms" },
    { label: "Privacy", href: "/privacy" },
    { label: "Cookies", href: "/cookies" },
];

/** Centred sign-off with the logo mark, a headline and a pair of calls to action. */
export const FooterLarge13 = () => (
    <footer className="bg-primary py-12 md:pt-16">
        <div className="max-w-container mx-auto px-4 md:px-8">
            <div className="flex flex-col md:items-center md:text-center">
                <ProperLogoMinimal className="origin-center scale-[1.2] drop-shadow" />
                <h2 className="text-primary text-display-xs md:text-display-sm mt-8 font-semibold md:mt-12">Let&apos;s get started on something great</h2>
                <p className="text-tertiary text-md mt-2 md:mt-4 md:text-xl">Join over 4,000+ startups already growing with Proper UI.</p>
                <div className="mt-8 flex flex-col-reverse gap-3 md:mt-12 md:flex-row">
                    <Button size="xl" color="secondary" iconLeading={PlayCircle}>
                        View demo
                    </Button>
                    <Button size="xl">Get started</Button>
                </div>
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
