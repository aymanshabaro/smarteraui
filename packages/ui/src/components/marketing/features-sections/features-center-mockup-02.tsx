"use client";

import { ArrowRight, ChartBreakoutSquare, MessageChatCircle, Zap } from "@properui/icons";
import { Badge } from "@/components/base/badges/badges";
import { Button } from "@/components/base/buttons/button";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";
import { BackgroundPattern } from "@/components/shared-assets/background-patterns";
import { IPhoneMockup } from "@/components/shared-assets/mockups/iphone-mockup";
import { IMAGES } from "@/utils/demo-assets";
import { ScreenMockup } from "./mockups.a";

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
        subtitle: "Measure what matters with Proper UI's easy-to-use reports. You can filter, export, and drilldown on the data in a couple clicks.",
        icon: ChartBreakoutSquare,
    },
];

export const FeaturesCenterMockup02 = () => (
    <section className="bg-primary py-16 md:py-24">
        <div className="max-w-container mx-auto w-full px-4 md:px-8">
            <div className="mx-auto flex w-full max-w-3xl flex-col items-center text-center">
                <Badge type="pill-color" color="brand" size="lg" className="hidden md:flex">
                    Features
                </Badge>
                <Badge type="pill-color" color="brand" size="md" className="flex md:hidden">
                    Features
                </Badge>
                <h2 className="text-display-sm text-primary md:text-display-md mt-4 font-semibold">Cutting-edge features for advanced analytics</h2>
                <p className="text-tertiary mt-4 text-lg md:mt-5 md:text-xl">
                    Powerful, self-serve product and growth analytics to help you convert, engage, and retain more users. Trusted by over 4,000 startups.
                </p>
            </div>
        </div>

        <div className="max-w-container mx-auto w-full px-4 md:px-8">
            <div className="flex flex-col gap-12 md:mt-16 md:gap-24 lg:items-center">
                {/* Desktop: phone overlapping the desktop screen */}
                <div className="relative hidden w-full items-center justify-center md:flex md:h-139.5">
                    <div className="relative flex items-center">
                        <IPhoneMockup image={IMAGES.square[0].src} className="drop-shadow-iphone-mockup relative z-10 w-71" />
                        <ScreenMockup size="md" className="-ms-24 h-100 w-160 lg:w-208">
                            <img src={IMAGES.landscape[0].src} alt={IMAGES.landscape[0].alt} className="size-full object-cover object-left-top" />
                        </ScreenMockup>
                    </div>
                </div>

                {/* Mobile: phone only */}
                <div className="relative flex h-102 w-full items-center justify-center overflow-hidden pt-12 md:hidden lg:pt-0">
                    <BackgroundPattern pattern="circle" size="md" className="absolute top-20 w-105" />
                    <IPhoneMockup image={IMAGES.square[0].src} className="drop-shadow-iphone-mockup absolute top-12 w-71" />
                </div>

                <ul className="flex flex-1 flex-wrap justify-center gap-x-8 gap-y-10 lg:flex-nowrap">
                    {features.map((feature) => (
                        <li key={feature.title}>
                            <div className="flex max-w-sm flex-col items-center gap-4 text-center">
                                <FeaturedIcon icon={feature.icon} size="lg" color="gray" theme="modern" className="hidden md:inline-flex" />
                                <FeaturedIcon icon={feature.icon} size="md" color="gray" theme="modern" className="inline-flex md:hidden" />
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
