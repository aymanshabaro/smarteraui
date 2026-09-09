"use client";

import { CheckCircle } from "@smarteraui/icons";
import { Tab, TabList, TabPanel, Tabs } from "@/components/application/tabs/tabs";
import { Button } from "@/components/base/buttons/button";

interface Plan {
    name: string;
    price: string;
    note: string;
    banner?: string;
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
        banner: "Most popular plan",
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

/** Three plan cards, the featured one topped by a solid brand banner, under a billing-period switch. */
export const PricingSimpleBanner = () => (
    <section className="bg-primary py-16 md:py-24">
        <div className="max-w-container mx-auto px-4 md:px-8">
            <div className="mx-auto flex w-full max-w-3xl flex-col items-center text-center">
                <h2 className="text-display-md text-primary md:text-display-lg font-semibold">Pricing plans</h2>
                <p className="text-tertiary mt-4 text-lg md:mt-6 md:text-xl">Simple, transparent pricing that grows with you. Try any plan free for 30 days.</p>

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
                        {plan.banner && (
                            <div className="bg-brand-solid w-full px-2 py-3 text-center">
                                <p className="text-sm font-semibold text-white">{plan.banner}</p>
                            </div>
                        )}

                        <div>
                            <div className="flex flex-col items-center px-6 pt-8 text-center md:px-8">
                                <p className="text-display-md text-primary md:text-display-lg font-semibold">{plan.price}</p>
                                <h3 className="text-primary mt-4 text-xl font-semibold">{plan.name}</h3>
                                <p className="text-md text-tertiary mt-1">{plan.note}</p>
                            </div>

                            <ul className="flex flex-col gap-4 px-6 py-8 md:px-8 md:pb-10">
                                {plan.features.map((feature) => (
                                    <li key={feature} className="flex gap-3">
                                        <CheckCircle className="text-fg-success-primary size-6 shrink-0" />
                                        <span className="text-tertiary text-md">{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <div className="mt-auto flex flex-col gap-3 px-6 pb-8 md:px-8">
                                <Button size="xl">Get started</Button>
                                <Button size="xl" color="secondary">
                                    Chat to sales
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </section>
);
