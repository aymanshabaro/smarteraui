"use client";

import { ArrowRight, ChartBreakoutSquare, MessageChatCircle, MessageSmileCircle, Zap } from "@properui/icons";
import { Button } from "@/components/base/buttons/button";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";

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
        title: "Manage your team",
        subtitle: "Measure what matters with Proper's easy-to-use reports. You can filter, export, and drilldown on the data.",
        icon: ChartBreakoutSquare,
    },
    {
        title: "Connect with customers",
        subtitle: "Solve a problem or close a sale in real-time with chat. If no one is available, customers are seamlessly routed to email.",
        icon: MessageSmileCircle,
    },
];

export const FeaturesIconCards01 = () => (
    <section className="bg-primary py-16 md:py-24">
        <div className="max-w-container mx-auto w-full px-4 md:px-8">
            <div className="flex w-full max-w-3xl flex-col">
                <span className="text-brand-secondary md:text-md text-sm font-semibold">Features</span>
                <h2 className="text-display-sm text-primary md:text-display-md mt-3 font-semibold">Beautiful analytics to grow smarter</h2>
                <p className="text-tertiary mt-4 text-lg md:mt-5 md:text-xl">
                    Powerful, self-serve product and growth analytics to help you convert, engage, and retain more users. Trusted by over 4,000 startups.
                </p>
            </div>

            <div className="mt-12 md:mt-16">
                <ul className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {features.map((feature) => (
                        <li key={feature.title}>
                            <div className="bg-secondary flex h-full flex-col justify-between gap-12 p-5 md:gap-16 md:p-6">
                                <FeaturedIcon icon={feature.icon} size="lg" color="brand" theme="dark" />
                                <div className="flex flex-col gap-4">
                                    <div>
                                        <h3 className="text-primary text-lg font-semibold">{feature.title}</h3>
                                        <p className="text-md text-tertiary mt-1">{feature.subtitle}</p>
                                    </div>
                                    <Button color="link-color" size="lg" href="#" iconTrailing={ArrowRight} className="hidden md:inline-flex">
                                        Learn more
                                    </Button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    </section>
);
