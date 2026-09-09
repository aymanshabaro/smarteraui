"use client";

import { PlayCircle } from "@smarteraui/icons";
import { Button } from "@/components/base/buttons/button";
import { SmarteraLogoMinimal } from "@/components/foundations/logo/smartera-logo-minimal";
import { sortCx } from "@/utils/cx";

const styles = sortCx({
    legalLink:
        "text-quaternary_on-brand outline-focus-ring hover:text-tertiary_on-brand rounded-xs text-sm transition duration-100 ease-linear focus-visible:outline-2 focus-visible:outline-offset-2",
});

const legalItems = ["Terms", "Privacy", "Cookies"];

/**
 * A brand call-to-action footer: the mark, a headline pair and two buttons centred from `md`
 * up, with the copyright and legal links split across a divider underneath.
 */
export const FooterLarge13Brand = () => {
    return (
        <footer className="bg-brand-section py-12 md:pt-16">
            <div className="max-w-container mx-auto px-4 md:px-8">
                <div className="flex flex-col md:items-center md:text-center">
                    <SmarteraLogoMinimal className="size-8 origin-center scale-[1.2] drop-shadow" />

                    <h2 className="text-display-xs text-primary_on-brand md:text-display-sm mt-8 font-semibold md:mt-12">
                        Let's get started on something great
                    </h2>
                    <p className="text-md text-tertiary_on-brand mt-2 md:mt-4 md:text-xl">Join over 4,000+ startups already growing with Smartera.</p>

                    <div className="mt-8 flex flex-col-reverse gap-3 md:mt-12 md:flex-row">
                        {/* The secondary button loses its ring on the brand background. */}
                        <Button size="xl" color="secondary" iconLeading={PlayCircle} className="shadow-xs! ring-0">
                            View demo
                        </Button>
                        <Button size="xl">Get started</Button>
                    </div>
                </div>

                <div className="border-brand_alt mt-12 flex flex-col-reverse justify-between gap-4 border-t pt-8 md:mt-16 md:flex-row md:gap-6">
                    <p className="text-quaternary_on-brand text-sm">© 2077 Smartera. All rights reserved.</p>

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
