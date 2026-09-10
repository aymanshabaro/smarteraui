"use client";

import { ArrowRight, ChartBreakoutSquare, MessageChatCircle, Zap } from "@properui/icons";
import { Button } from "@/components/base/buttons/button";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";
import { CreditCard } from "@/components/shared-assets/credit-card/credit-card";
import { AVATARS } from "@/utils/demo-assets";

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
        subtitle: "Measure what matters with Proper's easy-to-use reports. You can filter, export, and drilldown on the data in a couple clicks.",
        icon: ChartBreakoutSquare,
    },
];

export const FeaturesIconsAndMockup06 = () => (
    <section className="bg-primary overflow-hidden py-16 md:py-24">
        <div className="max-w-container mx-auto w-full px-4 md:px-8">
            <div className="flex w-full flex-col lg:max-w-3xl">
                <span className="text-brand-secondary md:text-md text-sm font-semibold">Features</span>
                <h2 className="text-display-sm text-primary md:text-display-md mt-3 font-semibold">Overflowing with useful features</h2>
                <p className="text-tertiary mt-4 text-lg md:mt-5 md:text-xl">
                    Powerful, self-serve product and growth analytics to help you convert, engage, and retain more users. Trusted by over 4,000 startups.
                </p>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-12 md:mt-16 md:gap-16 lg:grid-cols-2 lg:items-center">
                <ul className="grid grid-cols-1 gap-x-8 gap-y-10 md:gap-y-12">
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

                <div className="bg-tertiary relative -mx-4 flex h-80 items-center justify-center md:me-0 md:h-120 lg:h-160">
                    <div className="-translate-x-0.5 -space-y-[106px] md:translate-x-0 md:-space-y-16 lg:-space-y-8">
                        <div className="relative z-1 [transform:scale(var(--scale))_rotate(60deg)_translate(38px,-53px)] [--scale:0.84] md:[--scale:1.3] lg:[--scale:1.57]">
                            <CreditCard type="transparent-gradient" company="Proper." cardHolder={AVATARS[0].name} />
                        </div>
                        <div className="relative z-0 [transform:scale(var(--scale))_rotate(30deg)_translate(-23px,24px)] [--scale:0.84] md:[--scale:1.3] lg:[--scale:1.57]">
                            <CreditCard type="brand-dark" company="Proper." cardHolder={AVATARS[1].name} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
);
