import type { FC } from "react";
import { Check, MessageSmileCircle, PresentationChart01, Zap } from "@properui/icons";
import { Badge } from "@/components/base/badges/badges";
import { Button } from "@/components/base/buttons/button";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";

const benefits: { icon: FC<{ className?: string }>; title: string; description: string }[] = [
    {
        icon: MessageSmileCircle,
        title: "Share team inboxes",
        description: "Whether you have a team of 2 or 200, our shared team inboxes keep everyone on the same page and in the loop.",
    },
    {
        icon: Zap,
        title: "Deliver instant answers",
        description: "An all-in-one customer service platform that helps you balance everything your customers need to be happy.",
    },
    {
        icon: PresentationChart01,
        title: "Manage your team with reports",
        description: "Measure what matters with Proper's easy-to-use reports. You can filter, export, and drilldown on the data in a couple clicks.",
    },
];

const features = [
    "Access to basic features",
    "Basic reporting + analytics",
    "Up to 10 individual users",
    "20 GB individual data",
    "Basic chat support",
    "Attend events",
    "Automatic updates",
    "Backup your account",
    "Audit log and notes",
    "Feature requests",
];

/** A benefit list on the left, paired with a single wide plan card on the right. */
export const PricingSectionFeaturedCards04 = () => (
    <section className="bg-primary py-16 md:py-24">
        <div className="max-w-container mx-auto px-4 md:px-8">
            <div className="mx-auto flex w-full max-w-2xl flex-col xl:mx-0 xl:max-w-3xl">
                <span className="text-brand-secondary md:text-md text-sm font-semibold">Upgrade</span>
                <h2 className="text-display-sm text-primary md:text-display-md mt-3 font-semibold">Unlock more features</h2>
                <p className="text-tertiary mt-4 text-lg md:mt-5">Simple, transparent pricing that grows with you. Try any plan free for 30 days.</p>
            </div>

            <div className="mx-auto mt-12 grid max-w-2xl grid-cols-1 gap-12 md:mt-16 md:gap-16 xl:mx-0 xl:max-w-none xl:grid-cols-2 xl:items-center">
                <ul className="grid max-w-xl grid-cols-1 gap-10 md:gap-12">
                    {benefits.map((benefit) => (
                        <li key={benefit.title}>
                            <div className="flex gap-4">
                                <FeaturedIcon size="lg" color="gray" theme="modern" icon={benefit.icon} className="hidden md:inline-flex" />
                                <FeaturedIcon size="md" color="gray" theme="modern" icon={benefit.icon} className="inline-flex md:hidden" />

                                <div className="pt-1.5 md:pt-2.5">
                                    <h3 className="text-primary text-lg font-semibold">{benefit.title}</h3>
                                    <p className="text-md text-tertiary mt-1">{benefit.description}</p>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>

                <div className="bg-primary ring-secondary_alt flex flex-col overflow-hidden rounded-2xl shadow-lg ring-1 md:-ms-4">
                    <div className="flex flex-col-reverse gap-4 px-6 pt-6 pb-8 md:flex-row md:justify-between md:gap-8 md:px-8 md:pt-8 md:pb-6">
                        <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-2">
                                <h3 className="text-primary text-xl font-semibold">Basic plan</h3>
                                <Badge color="brand">Popular</Badge>
                            </div>
                            <p className="text-md text-tertiary">Our most popular plan for small teams.</p>
                        </div>

                        <div className="flex items-baseline gap-1">
                            <span className="text-display-md text-primary -translate-y-[5px] font-semibold md:-translate-y-[15px]">$</span>
                            <span className="text-display-lg text-primary md:text-display-xl font-semibold">10</span>
                            <span className="text-md text-tertiary font-medium">per month</span>
                        </div>
                    </div>

                    <div className="border-secondary flex flex-col gap-6 border-t px-6 py-8 md:px-8 md:pt-8 md:pb-10">
                        <div className="flex flex-col gap-1">
                            <p className="text-md text-primary font-semibold">FEATURES</p>
                            <p className="text-md text-tertiary">
                                Everything in our <span className="text-md font-semibold">free plan</span> plus....
                            </p>
                        </div>

                        <ul className="grid grid-cols-1 gap-x-8 gap-y-4 md:grid-cols-2">
                            {features.map((feature) => (
                                <li key={feature} className="flex gap-3">
                                    <div className="bg-success-secondary text-featured-icon-light-fg-success flex size-6 shrink-0 items-center justify-center rounded-full">
                                        <Check className="size-3.5" />
                                    </div>
                                    <span className="text-tertiary text-md">{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="border-secondary mt-auto flex flex-col gap-3 border-t px-6 pt-6 pb-8 md:p-8">
                        <Button size="xl">Get started</Button>
                    </div>
                </div>
            </div>
        </div>
    </section>
);
