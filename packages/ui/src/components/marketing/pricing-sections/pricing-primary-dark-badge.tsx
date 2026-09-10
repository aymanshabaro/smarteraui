"use client";

import { CheckCircle } from "@properui/icons";
import { Tab, TabList, TabPanel, Tabs } from "@/components/application/tabs/tabs";
import { BadgeGroup } from "@/components/base/badges/badge-groups";
import { Button } from "@/components/base/buttons/button";

interface Plan {
    name: string;
    price: string;
    note: string;
    flag?: string;
    features: string[];
}

const plans: Plan[] = [
    {
        name: "Basic plan",
        price: "$10/mth",
        note: "Our most popular plan.",
        features: [
            "Access to all basic features",
            "Basic reporting and analytics",
            "Up to 10 individual users",
            "20 GB individual data",
            "Basic chat and email support",
        ],
    },
    {
        name: "Business plan",
        price: "$20/mth",
        note: "Growing teams up to 20 users.",
        flag: "Most popular",
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
        price: "$40/mth",
        note: "Advanced features + unlimited users.",
        features: [
            "Advanced custom fields",
            "Audit log and data history",
            "Unlimited individual users",
            "Unlimited individual data",
            "Personalized + priority service",
        ],
    },
];

/** A brand-coloured header band, overlapped by plan cards whose names sit in modern badge groups. */
export const PricingPrimaryDarkBadge = () => (
    <section className="bg-primary">
        <div className="bg-brand-section pt-16 pb-32 md:pt-24 md:pb-40">
            <div className="max-w-container mx-auto px-4 md:px-8">
                <div className="mx-auto flex w-full max-w-3xl flex-col items-center text-center">
                    <p className="text-secondary_on-brand md:text-md text-sm font-semibold">Pricing</p>
                    <h2 className="text-display-md text-primary_on-brand md:text-display-lg mt-3 font-semibold">Pricing plans</h2>
                    <p className="text-secondary_on-brand mt-4 text-lg md:mt-6 md:text-xl">
                        Simple, transparent pricing that grows with you. Try any plan free for 30 days.
                    </p>

                    <Tabs defaultSelectedKey="monthly" className="mt-8 w-full md:mt-12 md:w-auto">
                        <TabList
                            type="button-gray"
                            size="md"
                            aria-label="Billing period"
                            className="[&_[role=tab]]:text-secondary_on-brand [&_[role=tab]]:selected:bg-brand-primary_alt [&_[role=tab]]:selected:text-brand-secondary [&_[role=tab]]:flex-1 [&_[role=tab]]:hover:bg-white/10"
                        >
                            <Tab id="monthly" label="Monthly billing" />
                            <Tab id="annually" label="Annual billing" />
                        </TabList>

                        {/* The plan grid lives below the switch, so the panels only exist to satisfy the tabs' `aria-controls`. */}
                        <TabPanel id="monthly" />
                        <TabPanel id="annually" />
                    </Tabs>
                </div>
            </div>
        </div>

        <div className="max-w-container m-auto -mt-16 px-4 pb-16 md:-mt-24 md:px-8 md:pb-24">
            <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 md:gap-8 xl:grid-cols-3">
                {plans.map((plan) => (
                    <div key={plan.name} className="bg-primary ring-secondary_alt flex flex-col overflow-hidden rounded-2xl shadow-lg ring-1">
                        <div className="flex flex-col items-center p-6 pb-8 text-center md:p-8">
                            <BadgeGroup theme="modern" size="lg" color="brand" addonText={plan.name} iconTrailing={null}>
                                {plan.flag}
                            </BadgeGroup>
                            <p className="text-display-md text-primary md:text-display-lg mt-6 font-semibold">{plan.price}</p>
                            <p className="text-md text-tertiary mt-2">{plan.note}</p>
                        </div>

                        <div className="border-secondary mx-6 border-t md:mx-8" />

                        <ul className="flex flex-col gap-4 px-6 py-8 md:px-8">
                            {plan.features.map((feature) => (
                                <li key={feature} className="flex gap-3">
                                    <CheckCircle className="text-fg-brand-primary size-6 shrink-0" />
                                    <span className="text-tertiary text-md">{feature}</span>
                                </li>
                            ))}
                        </ul>

                        <div className="mt-auto flex flex-col gap-3 p-6 pb-8 md:p-8">
                            <Button size="xl">Get started</Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </section>
);
