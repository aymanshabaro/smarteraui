"use client";

import { CheckCircle } from "@properui/icons";
import { Tab, TabList, TabPanel, Tabs } from "@/components/application/tabs/tabs";
import { Badge } from "@/components/base/badges/badges";
import { Button } from "@/components/base/buttons/button";

interface Plan {
    name: string;
    price: string;
    note: string;
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

/** Separate cards on small screens that fuse into one panel under a brand accent line from `lg`. */
export const PricingSimpleAccentLine = () => (
    <section className="bg-primary py-16 md:py-24">
        <div className="max-w-container mx-auto px-4 md:px-8">
            <div className="mx-auto flex w-full max-w-3xl flex-col items-center text-center">
                <h2 className="text-display-md text-primary md:text-display-lg font-semibold">Pricing plans</h2>
                <p className="text-tertiary mt-4 text-lg md:mt-6 md:text-xl">Simple, transparent pricing that grows with you. Try any plan free for 30 days.</p>

                <Tabs defaultSelectedKey="monthly" className="w-full md:w-auto">
                    <TabList type="button-border" size="md" aria-label="Billing period" className="mt-8 w-full md:mt-12 md:w-auto [&_[role=tab]]:flex-1">
                        <Tab id="monthly" label="Monthly billing" />
                        <Tab id="annually" label="Annual billing" badge="Save 20%" />
                    </TabList>

                    {/* The plan panel lives below the switch, so the panels only exist to satisfy the tabs' `aria-controls`. */}
                    <TabPanel id="monthly" />
                    <TabPanel id="annually" />
                </Tabs>
            </div>

            <div className="mt-16 w-full md:mt-24">
                <div className="relative lg:shadow-lg">
                    <div aria-hidden="true" className="bg-border-brand absolute -inset-x-px -top-px hidden h-2 lg:block" />

                    <div className="ring-secondary_alt grid w-full grid-cols-1 gap-4 md:grid-cols-2 md:pt-2 lg:grid-cols-3 lg:gap-0 lg:ring-1">
                        {plans.map((plan, index) => (
                            <div key={plan.name} className="relative grid">
                                <div className="bg-primary ring-secondary_alt flex flex-col overflow-hidden rounded-2xl shadow-lg ring-1 lg:rounded-none lg:bg-transparent lg:ring-0 lg:shadow-transparent">
                                    <div className="flex flex-col items-center px-6 pt-6 pb-8 text-center md:px-8 md:pt-10">
                                        <Badge size="lg" color="brand">
                                            {plan.name}
                                        </Badge>
                                        <p className="text-display-md text-primary md:text-display-lg mt-4 font-semibold">{plan.price}</p>
                                        <p className="text-md text-tertiary mt-2">{plan.note}</p>

                                        <div className="mt-6 flex flex-col gap-3 self-stretch md:mt-4">
                                            <Button size="xl">Get started</Button>
                                            <Button size="xl" color="secondary">
                                                Chat to sales
                                            </Button>
                                        </div>
                                    </div>

                                    <div className="bg-border-secondary mx-6 h-px md:mx-8" />

                                    <ul className="flex flex-col gap-4 px-6 pt-8 pb-10 md:px-8">
                                        {plan.features.map((feature) => (
                                            <li key={feature} className="flex gap-3">
                                                <CheckCircle className="text-fg-success-primary size-6 shrink-0" />
                                                <span className="text-tertiary text-md">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Column rule between the fused columns — only visible once the cards join up at `lg`. */}
                                {index > 0 && <div aria-hidden="true" className="bg-border-secondary absolute top-0 bottom-0 my-10 w-px max-lg:hidden" />}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </section>
);
