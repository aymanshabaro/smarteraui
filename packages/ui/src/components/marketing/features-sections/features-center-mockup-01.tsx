"use client";

import type { FC } from "react";
import { ArrowRight, ChartBreakoutSquare, MessageSmileCircle, Zap } from "@properui/icons";
import { sortCx } from "../../../utils/cx";
import { IMAGES } from "../../../utils/demo-assets";
import { BadgeWithDot } from "../../base/badges/badges";
import { Button } from "../../base/buttons/button";
import { FeaturedIcon } from "../../foundations/featured-icon/featured-icon";

const styles = sortCx({
    section: "bg-primary py-16 md:py-24",
    container: "mx-auto w-full max-w-container px-4 md:px-8",
    // The "modern" device frame: three nested rounded shells around the screenshot.
    frameOuter:
        "size-full rounded-[9.03px] bg-primary p-[0.9px] shadow-modern-mockup-outer-md ring-[0.56px] ring-utility-neutral-300 ring-inset md:rounded-[32px] md:p-1 md:shadow-modern-mockup-outer-lg md:ring-[2px]",
    frameInner: "size-full rounded-[7.9px] bg-primary p-0.5 shadow-modern-mockup-inner-md md:rounded-[28px] md:p-[5.4px] md:shadow-modern-mockup-inner-lg",
    frameScreen: "relative size-full overflow-hidden rounded-[6.77px] ring-[0.56px] ring-utility-neutral-200 md:rounded-[24px] md:ring-[2px]",
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
        subtitle: "Measure what matters with Proper UI's easy-to-use reports. You can filter, export, and drilldown on the data in a couple clicks.",
    },
];

/** A centered heading over a full-width device mockup, with a three-up feature row underneath. */
export const FeaturesCenterMockup01 = () => (
    <section className={styles.section}>
        <div className={styles.container}>
            <div className="mx-auto flex w-full max-w-3xl flex-col items-center text-center">
                <BadgeWithDot type="modern" size="lg" color="brand" className="hidden md:flex">
                    Features
                </BadgeWithDot>
                <BadgeWithDot type="modern" size="md" color="brand" className="flex md:hidden">
                    Features
                </BadgeWithDot>

                <h2 className="text-display-sm text-primary md:text-display-md mt-4 font-semibold">Cutting-edge features for advanced analytics</h2>
                <p className="text-tertiary mt-4 text-lg md:mt-5 md:text-xl">
                    Powerful, self-serve product and growth analytics to help you convert, engage, and retain more users. Trusted by over 4,000 startups.
                </p>
            </div>

            <div className="mt-12 flex flex-col gap-12 md:mt-16 md:gap-24 lg:items-center">
                <div className="flex h-full w-full items-center justify-center md:max-h-204 md:w-full">
                    <div className={styles.frameOuter}>
                        <div className={styles.frameInner}>
                            <div className={styles.frameScreen}>
                                <img alt="Dashboard mockup showing application interface" src={IMAGES.landscape[0].src} className="size-full object-cover" />
                            </div>
                        </div>
                    </div>
                </div>

                <ul className="flex flex-1 flex-wrap justify-center gap-x-8 gap-y-10 lg:flex-nowrap">
                    {features.map((feature) => (
                        <li key={feature.title}>
                            <div className="flex max-w-sm flex-col items-center gap-4 text-center">
                                <FeaturedIcon icon={feature.icon} size="lg" theme="modern" color="gray" className="hidden md:flex" />
                                <FeaturedIcon icon={feature.icon} size="md" theme="modern" color="gray" className="flex md:hidden" />

                                <div>
                                    <h3 className="text-primary text-lg font-semibold">{feature.title}</h3>
                                    <p className="text-md text-tertiary mt-1">{feature.subtitle}</p>
                                </div>

                                <Button color="link-color" size="lg" href="#" iconTrailing={ArrowRight}>
                                    Learn more
                                </Button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    </section>
);
