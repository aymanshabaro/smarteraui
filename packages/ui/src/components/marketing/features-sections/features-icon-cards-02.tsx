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
        title: "Connect with customers",
        subtitle: "Solve a problem or close a sale in real-time with chat. If no one is available, customers are seamlessly routed to email.",
        icon: MessageSmileCircle,
    },
    {
        title: "Deliver instant answers",
        subtitle: "An all-in-one customer service platform that helps you balance everything your customers need to be happy.",
        icon: Zap,
    },
    {
        title: "Manage your team",
        subtitle: "Measure what matters with Proper UI's easy-to-use reports. You can filter, export, and drilldown on the data.",
        icon: ChartBreakoutSquare,
    },
];

export const FeaturesIconCards02 = () => (
    <section className="bg-primary py-16 md:py-24">
        <div className="max-w-container mx-auto w-full px-4 md:px-8">
            <div className="grid grid-cols-1 gap-12 md:gap-16 lg:grid-cols-3">
                <div className="max-w-3xl lg:col-span-1">
                    <FeaturedIcon icon={Zap} size="xl" color="brand" theme="light" className="hidden md:flex" />
                    <FeaturedIcon icon={Zap} size="lg" color="brand" theme="light" className="flex md:hidden" />
                    <h2 className="text-display-sm text-primary md:text-display-md mt-5 font-semibold">Beautiful analytics to grow smarter</h2>
                    <p className="text-tertiary mt-4 text-lg md:mt-5">
                        Powerful, self-serve product and growth analytics to help you convert, engage, and retain more users.
                    </p>
                </div>

                <div className="lg:col-span-2">
                    <ul className="grid w-full grid-cols-1 gap-x-8 gap-y-6 sm:grid-flow-col sm:grid-cols-2 sm:grid-rows-2 md:gap-y-8 lg:grid-cols-2">
                        {features.map((feature) => (
                            <li key={feature.title}>
                                <div className="bg-secondary flex h-full flex-col justify-between gap-12 p-5 md:gap-16 md:p-6">
                                    <FeaturedIcon icon={feature.icon} size="lg" color="brand" theme="dark" />
                                    <div className="flex flex-col gap-4">
                                        <div>
                                            <h3 className="text-primary text-lg font-semibold">{feature.title}</h3>
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
                </div>
            </div>
        </div>
    </section>
);
