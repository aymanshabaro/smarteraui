"use client";

import type { ReactNode } from "react";
import { CheckCircle } from "@properui/icons";
import { Tab, TabList, TabPanel, Tabs } from "@/components/application/tabs/tabs";
import { Badge } from "@/components/base/badges/badges";
import { Button } from "@/components/base/buttons/button";

interface Plan {
    name: string;
    price: string;
    note: string;
    isPopular?: boolean;
    /** Copy above the feature list — the bold fragment names the plan this one builds on. */
    inherits: ReactNode;
    features: string[];
}

const plans: Plan[] = [
    {
        name: "Basic plan",
        price: "$10",
        note: "Our most popular plan",
        isPopular: true,
        inherits: (
            <>
                Everything in our <span className="text-md font-semibold">free plan</span> plus....
            </>
        ),
        features: [
            "Access to basic features",
            "Basic reporting and analytics",
            "Up to 10 individual users",
            "20 GB individual data",
            "Basic chat and email support",
        ],
    },
    {
        name: "Business plan",
        price: "$20",
        note: "Growing teams up to 20 users.",
        inherits: (
            <>
                Everything in <span className="text-md font-semibold">Basic</span> plus....
            </>
        ),
        features: [
            "200+ integrations",
            "Advanced reporting and analytics",
            "Up to 20 individual users",
            "40 GB individual data",
            "Priority chat and email support",
        ],
    },
    {
        name: "Enterprise plan",
        price: "$40",
        note: "Advanced features + unlimited users.",
        inherits: (
            <>
                Everything in <span className="text-md font-semibold">Business</span> plus....
            </>
        ),
        features: [
            "Advanced custom fields",
            "Audit log and data history",
            "Unlimited individual users",
            "Unlimited individual data",
            "Personalized + priority service",
        ],
    },
];

/** Three plan cards with paired actions above a bordered feature panel, under a billing switch. */
export const PricingDualAction = () => (
    <section className="bg-primary py-16 md:py-24">
        <div className="max-w-container mx-auto px-4 md:px-8">
            <div className="mx-auto flex w-full max-w-3xl flex-col items-center text-center">
                <span className="text-brand-secondary md:text-md text-sm font-semibold">Pricing</span>
                <h2 className="text-display-md text-primary md:text-display-lg mt-3 font-semibold">Simple, transparent pricing</h2>
                <p className="text-tertiary mt-4 text-lg md:mt-6 md:text-xl">We believe Proper should be accessible to all companies, no matter the size.</p>

                <Tabs defaultSelectedKey="monthly" className="w-full md:w-auto">
                    <TabList type="button-border" size="md" aria-label="Billing period" className="mt-8 w-full md:mt-12 md:w-auto [&_[role=tab]]:flex-1">
                        <Tab id="monthly" label="Monthly billing" />
                        <Tab id="annually" label="Annual billing" />
                    </TabList>

                    {/* The plan grid lives below the switch, so the panels only exist to satisfy the tabs' `aria-controls`. */}
                    <TabPanel id="monthly" />
                    <TabPanel id="annually" />
                </Tabs>
            </div>

            <div className="mt-16 grid w-full grid-cols-1 items-end gap-4 md:mt-24 md:grid-cols-2 md:gap-8 xl:grid-cols-3">
                {plans.map((plan) => (
                    <div key={plan.name} className="bg-primary ring-secondary_alt flex flex-col overflow-hidden rounded-2xl shadow-lg ring-1">
                        <div className="flex flex-col p-6 pb-8 md:p-8">
                            <div className="flex justify-between">
                                <h3 className="text-tertiary text-lg font-semibold">{plan.name}</h3>
                                {plan.isPopular && (
                                    <Badge size="lg" color="brand">
                                        Popular
                                    </Badge>
                                )}
                            </div>

                            <div className="mt-4 flex items-end gap-1">
                                <p className="text-display-lg text-primary md:text-display-xl font-semibold">{plan.price}</p>
                                <span className="text-md text-tertiary pb-2 font-medium">per month</span>
                            </div>

                            <p className="text-md text-tertiary mt-4">{plan.note}</p>

                            <div className="mt-8 flex flex-col gap-3 self-stretch">
                                <Button size="xl">Get started</Button>
                                <Button size="xl" color="secondary">
                                    Chat to sales
                                </Button>
                            </div>
                        </div>

                        <div className="ring-secondary flex flex-col gap-6 px-6 pt-8 pb-10 ring-1 md:px-8">
                            <div>
                                <p className="text-md text-primary font-semibold uppercase">Features</p>
                                <p className="text-md text-tertiary mt-1">{plan.inherits}</p>
                            </div>

                            <ul className="flex flex-col gap-4">
                                {plan.features.map((feature) => (
                                    <li key={feature} className="flex gap-3">
                                        <CheckCircle className="text-fg-brand-primary size-6 shrink-0" />
                                        <span className="text-tertiary text-md">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </section>
);
