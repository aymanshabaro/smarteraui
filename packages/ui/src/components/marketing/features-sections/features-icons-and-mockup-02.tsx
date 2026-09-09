"use client";

import type { FC } from "react";
import { ArrowRight, ChartBreakoutSquare, MessageSmileCircle, Zap } from "@smarteraui/icons";
import { Button } from "@/components/base/buttons/button";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";
import { IPhoneMockup } from "@/components/shared-assets/mockups/iphone-mockup";
import { sortCx } from "@/utils/cx";
import { IMAGES } from "@/utils/demo-assets";

const styles = sortCx({
    section: "overflow-hidden bg-primary pt-16 lg:py-24",
    container: "mx-auto w-full max-w-container px-4 md:px-8",
    grid: "mt-12 grid grid-cols-1 gap-12 md:mt-16 md:gap-16 lg:grid-cols-2 lg:items-center",
});

const features: { icon: FC<{ className?: string }>; title: string; subtitle: string }[] = [
    {
        icon: MessageSmileCircle,
        title: "Share team inboxes",
        subtitle: "Whether you have a team of 2 or 200, our shared team inboxes keep everyone on the same page and in the loop.",
    },
    {
        icon: Zap,
        title: "Deliver instant answers",
        subtitle: "An all-in-one customer service platform that helps you balance everything your customers need to be happy.",
    },
    {
        icon: ChartBreakoutSquare,
        title: "Manage your team with reports",
        subtitle: "Measure what matters with Smartera's easy-to-use reports. You can filter, export, and drilldown on the data in a couple clicks.",
    },
];

/** A stacked icon-and-copy list beside an iPhone mockup floating over a soft backdrop shape. */
export const FeaturesIconsAndMockup02 = () => (
    <section className={styles.section}>
        <div className={styles.container}>
            <div className="flex w-full flex-col lg:max-w-3xl">
                <span className="text-brand-secondary md:text-md text-sm font-semibold">Features</span>
                <h2 className="text-display-sm text-primary md:text-display-md mt-3 font-semibold">Overflowing with useful features</h2>
                <p className="text-tertiary mt-4 text-lg md:mt-5 md:text-xl">
                    Powerful, self-serve product and growth analytics to help you convert, engage, and retain more users. Trusted by over 4,000 startups.
                </p>
            </div>

            <div className={styles.grid}>
                <ul className="grid grid-cols-1 gap-x-8 gap-y-10 md:gap-y-12">
                    {features.map((feature) => (
                        <li key={feature.title}>
                            <div className="flex max-w-140 gap-4">
                                <FeaturedIcon icon={feature.icon} size="lg" theme="modern" color="gray" className="hidden md:flex" />
                                <FeaturedIcon icon={feature.icon} size="md" theme="modern" color="gray" className="flex md:hidden" />

                                <div className="flex flex-col items-start gap-4">
                                    <div>
                                        <h3 className="text-primary mt-1.5 text-lg font-semibold md:mt-2.5">{feature.title}</h3>
                                        <p className="text-md text-tertiary mt-1">{feature.subtitle}</p>
                                    </div>

                                    <Button color="link-color" size="lg" href="#" iconTrailing={ArrowRight}>
                                        Learn more
                                    </Button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>

                <div className="relative flex h-104 w-full justify-center md:-ms-4 md:items-center lg:flex lg:h-160 lg:w-128">
                    <IPhoneMockup
                        image={IMAGES.landscape[0].src}
                        className="drop-shadow-iphone-mockup absolute top-0 z-10 w-71 md:w-78.5 md:drop-shadow-none"
                    />
                    {/* Soft backdrop shape behind the phone. */}
                    <span aria-hidden="true" className="bg-secondary flex h-120 w-105 rounded-[120px] sm:relative md:w-120 lg:w-133" />
                </div>
            </div>
        </div>
    </section>
);
