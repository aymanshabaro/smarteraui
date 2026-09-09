"use client";

import { Zap } from "@smarteraui/icons";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";

const features = [
    {
        title: "Share team inboxes",
        subtitle: "Whether you have a team of 2 or 200, our shared team inboxes keep everyone on the same page and in the loop.",
    },
    {
        title: "Manage your team with reports",
        subtitle: "Measure what matters with Smartera's easy-to-use reports. You can filter, export, and drilldown on the data in a couple clicks.",
    },
    {
        title: "Connect the tools you already use",
        subtitle: "Explore 100+ integrations that make your day-to-day workflow more efficient and familiar. Plus, our extensive developer tools.",
    },
    {
        title: "Deliver instant answers",
        subtitle: "An all-in-one customer service platform that helps you balance everything your customers need to be happy.",
    },
    {
        title: "Our people make the difference",
        subtitle: "We're an extension of your customer service team, and all of our resources are free. Chat to our friendly team 24/7 when you need help.",
    },
    {
        title: "Connect with customers",
        subtitle: "Solve a problem or close a sale in real-time with chat. If no one is available, customers are seamlessly routed to email without confusion.",
    },
];

export const FeaturesSimpleIcons04Brand = () => (
    <section className="bg-brand-section py-16 md:py-24">
        <div className="max-w-container mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 gap-12 md:gap-16 lg:grid-cols-3">
                <div className="max-w-3xl lg:col-span-1">
                    <FeaturedIcon icon={Zap} size="xl" color="brand" theme="dark" />
                    <h2 className="text-display-sm text-primary_on-brand md:text-display-md mt-6 font-semibold">Beautiful analytics to grow smarter</h2>
                    <p className="text-secondary_on-brand mt-4 text-lg md:mt-5 md:text-xl">
                        Powerful, self-serve product and growth analytics to help you convert, engage, and retain more users.
                    </p>
                </div>
                <div className="lg:col-span-2">
                    <ul className="grid w-full grid-cols-1 gap-x-16 gap-y-10 sm:grid-flow-col sm:grid-cols-2 sm:grid-rows-3 md:gap-y-8 lg:grid-cols-2">
                        {features.map((feature) => (
                            <li key={feature.title}>
                                <div className="flex max-w-sm flex-col gap-4">
                                    <div>
                                        <h3 className="text-primary_on-brand text-lg font-semibold">{feature.title}</h3>
                                        <p className="text-md text-tertiary_on-brand mt-1">{feature.subtitle}</p>
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
