"use client";

import { ChartBreakoutSquare, MessageChatCircle, PlayCircle, Zap } from "@smarteraui/icons";
import { Button } from "@/components/base/buttons/button";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";
import { BackgroundPattern } from "@/components/shared-assets/background-patterns";
import { cx } from "@/utils/cx";
import { IMAGES } from "@/utils/demo-assets";

const features = [
    {
        title: "Share team inboxes",
        subtitle: "Whether you have a team of 2 or 200, our shared team inboxes keep everyone on the same page and in the loop.",
        subtitleDesktopSuffix: "Leverage automation to move fast, while always giving customers a human, helpful experience.",
        icon: MessageChatCircle,
        image: IMAGES.landscape[0],
        patternClassName: "right-0 bottom-0 translate-x-1/3 translate-y-1/4",
    },
    {
        title: "Deliver instant answers",
        subtitle: "An all-in-one customer service platform that helps you balance everything your customers need to be happy.",
        subtitleDesktopSuffix: null,
        icon: Zap,
        image: IMAGES.landscape[1],
        patternClassName: "bottom-0 left-0 -translate-x-1/3 md:translate-y-12 lg:translate-y-1/4",
    },
    {
        title: "Manage your team with reports",
        subtitle: "Measure what matters with Smartera's easy-to-use reports. You can filter, export, and drilldown on the data in a couple clicks.",
        subtitleDesktopSuffix: null,
        icon: ChartBreakoutSquare,
        image: IMAGES.landscape[2],
        patternClassName: "top-0 right-0 translate-x-1/3 -translate-y-1/4",
    },
];

export const FeaturesAlternatingLayout02 = () => (
    <section className="bg-primary flex flex-col gap-12 py-16 sm:gap-16 md:gap-20 md:py-24 lg:gap-24">
        <div className="max-w-container mx-auto w-full px-4 md:px-8">
            <div className="mx-auto flex w-full max-w-3xl flex-col items-center text-center">
                <span className="text-brand-secondary md:text-md text-sm font-semibold">Features</span>
                <h2 className="text-display-sm text-primary md:text-display-md mt-3 font-semibold">Beautiful analytics to grow smarter</h2>
                <p className="text-tertiary mt-4 text-lg md:mt-5 md:text-xl">
                    Powerful, self-serve product and growth analytics to help you convert, engage, and retain more users. Trusted by over 4,000 startups.
                </p>
            </div>
        </div>

        <div className="max-w-container mx-auto flex w-full flex-col gap-12 px-4 sm:gap-16 md:gap-20 md:px-8 lg:gap-24">
            {features.map((feature, index) => {
                const isReversed = index % 2 === 1;

                return (
                    <div key={feature.title} className="grid grid-cols-1 gap-10 md:gap-20 lg:grid-cols-2 lg:gap-24">
                        <div className={cx("max-w-xl flex-1 self-center", isReversed && "lg:order-last")}>
                            <FeaturedIcon icon={feature.icon} size="lg" color="brand" theme="light" />
                            <h2 className="text-display-xs text-primary md:text-display-sm mt-5 font-semibold">{feature.title}</h2>
                            <p className="text-md text-tertiary mt-2 md:mt-4 md:text-lg">
                                {feature.subtitle}
                                {feature.subtitleDesktopSuffix && <span className="hidden md:inline"> {feature.subtitleDesktopSuffix}</span>}
                            </p>
                            <div className="mt-8 flex gap-3.5">
                                <Button color="secondary" size="xl" iconLeading={PlayCircle}>
                                    Demo
                                </Button>
                                <Button color="primary" size="xl">
                                    Learn more
                                </Button>
                            </div>
                        </div>

                        <div className="bg-tertiary relative -ms-4 w-screen px-4 py-6 md:ms-0 md:h-140 md:w-auto md:rounded-3xl md:p-10 lg:h-100">
                            <div className="relative flex h-full w-full">
                                <img
                                    src={feature.image.src}
                                    alt={feature.image.alt}
                                    className="ring-screen-mockup-border z-10 size-full rounded-md object-cover object-left-top ring-4 md:absolute"
                                />
                            </div>
                            <BackgroundPattern
                                pattern="grid"
                                size="md"
                                className={cx("text-fg-brand-secondary absolute hidden md:block", feature.patternClassName)}
                            />
                        </div>
                    </div>
                );
            })}
        </div>
    </section>
);
