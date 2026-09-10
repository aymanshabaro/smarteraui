"use client";

import type { FC } from "react";
import { ArrowRight, ChartBreakoutSquare, Command, MessageChatCircle, MessageHeartCircle, MessageSmileCircle, Zap } from "@properui/icons";
import { Button } from "@/components/base/buttons/button";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";
import { sortCx } from "@/utils/cx";

const styles = sortCx({
    section: "bg-brand-section py-16 md:py-24",
    container: "mx-auto max-w-container px-4 md:px-8",
    grid: "grid w-full grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 md:gap-y-16 lg:grid-cols-3",
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
        subtitle: "Measure what matters with Proper's easy-to-use reports. You can filter, export, and drilldown on the data in a couple clicks.",
    },
    {
        icon: MessageChatCircle,
        title: "Connect with customers",
        subtitle: "Solve a problem or close a sale in real-time with chat. If no one is available, customers are seamlessly routed to email without confusion.",
    },
    {
        icon: Command,
        title: "Connect the tools you already use",
        subtitle: "Explore 100+ integrations that make your day-to-day workflow more efficient and familiar. Plus, our extensive developer tools.",
    },
    {
        icon: MessageHeartCircle,
        title: "Our people make the difference",
        subtitle: "We're an extension of your customer service team, and all of our resources are free. Chat to our friendly team 24/7 when you need help.",
    },
];

/** A left-aligned six-up feature grid with per-feature "Learn more" links, on a brand-colored section background. */
export const FeaturesSimpleIcons03Brand = () => (
    <section className={styles.section}>
        <div className={styles.container}>
            <div className="flex w-full max-w-3xl flex-col">
                <span className="text-secondary_on-brand md:text-md text-sm font-semibold">Features</span>
                <h2 className="text-display-sm text-primary_on-brand md:text-display-md mt-3 font-semibold">Beautiful analytics to grow smarter</h2>
                <p className="text-secondary_on-brand mt-4 text-lg md:mt-5 md:text-xl">
                    Powerful, self-serve product and growth analytics to help you convert, engage, and retain more users. Trusted by over 4,000 startups.
                </p>
            </div>

            <div className="mt-12 md:mt-16">
                <ul className={styles.grid}>
                    {features.map((feature) => (
                        <li key={feature.title}>
                            <div className="flex max-w-sm flex-col gap-4">
                                <FeaturedIcon icon={feature.icon} size="lg" theme="dark" color="brand" className="hidden md:flex" />
                                <FeaturedIcon icon={feature.icon} size="md" theme="dark" color="brand" className="flex md:hidden" />

                                <div>
                                    <h3 className="text-primary_on-brand text-lg font-semibold">{feature.title}</h3>
                                    <p className="text-md text-tertiary_on-brand mt-1">{feature.subtitle}</p>
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
