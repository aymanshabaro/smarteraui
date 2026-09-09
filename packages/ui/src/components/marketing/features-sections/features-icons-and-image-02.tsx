"use client";

import { ArrowRight, ChartBreakoutSquare, MessageChatCircle, Zap } from "@smarteraui/icons";
import { Button } from "@/components/base/buttons/button";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";
import { IMAGES } from "@/utils/demo-assets";

const features = [
    {
        title: "Share team inboxes",
        subtitle: "Whether you have a team of 2 or 200, our shared team inboxes keep everyone on the same page and in the loop.",
        icon: MessageChatCircle,
    },
    {
        title: "Deliver instant answers",
        subtitle: "An all-in-one customer service platform that helps you balance everything your customers need to be happy.",
        icon: Zap,
    },
    {
        title: "Manage your team with reports",
        subtitle: "Measure what matters with Smartera's easy-to-use reports. You can filter, export, and drilldown on the data in a couple clicks.",
        icon: ChartBreakoutSquare,
    },
];

export const FeaturesIconsAndImage02 = () => (
    <section className="bg-primary py-16 md:py-24">
        <div className="max-w-container mx-auto w-full px-4 md:px-8">
            <div className="flex w-full flex-col lg:max-w-3xl">
                <span className="text-brand-secondary md:text-md text-sm font-semibold">Features</span>
                <h2 className="text-display-sm text-primary md:text-display-md mt-3 font-semibold">Overflowing with useful features</h2>
                <p className="text-tertiary mt-4 text-lg md:mt-5 md:text-xl">
                    Powerful, self-serve product and growth analytics to help you convert, engage, and retain more users. Trusted by over 4,000 startups.
                </p>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-12 md:mt-16 md:gap-16 lg:grid-cols-2 lg:items-center">
                <ul className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-12 lg:grid-cols-1">
                    {features.map((feature) => (
                        <li key={feature.title}>
                            <div className="flex max-w-140 gap-4">
                                <FeaturedIcon icon={feature.icon} size="lg" color="gray" theme="modern" className="hidden md:inline-flex" />
                                <FeaturedIcon icon={feature.icon} size="md" color="gray" theme="modern" className="inline-flex md:hidden" />
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

                <div className="h-60 md:-ml-4 md:h-140">
                    <img src={IMAGES.landscape[3].src} alt={IMAGES.landscape[3].alt} className="size-full object-cover" />
                </div>
            </div>
        </div>
    </section>
);
