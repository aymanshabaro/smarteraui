"use client";

import { Tabs } from "@/components/application/tabs/tabs";

const billingPeriods = [
    { id: "monthly", label: "Monthly billing" },
    { id: "annually", label: "Annual billing" },
];

/**
 * Pricing page header that spreads the heading and the supporting copy across two columns
 * from `lg` up, with a monthly/annual billing toggle underneath.
 */
export const HeaderSpaceBetweenTabs = () => (
    <section className="bg-primary py-16 md:py-24">
        <div className="max-w-container mx-auto px-4 md:px-8">
            <div className="text-brand-secondary md:text-md mb-3 text-sm font-semibold">Pricing</div>

            <div className="grid grid-cols-[minmax(auto,768px)] gap-x-16 lg:grid-cols-[1fr_480px]">
                <h1 className="text-display-md text-primary md:text-display-lg font-semibold">Simple, transparent pricing</h1>
                <p className="text-tertiary mt-4 text-lg md:mt-6 md:text-xl lg:mt-3 lg:h-0">
                    Simple, transparent pricing that grows with you. Try any plan free for 30 days.
                </p>

                <div className="mt-8 sm:justify-self-start md:mt-12">
                    <Tabs defaultSelectedKey="monthly">
                        <Tabs.List
                            aria-label="Billing period"
                            size="md"
                            type="button-border"
                            items={billingPeriods}
                            className="w-full md:w-auto [&_[role=tab]]:flex-1"
                        >
                            {(item) => <Tabs.Item {...item} />}
                        </Tabs.List>
                        {billingPeriods.map((item) => (
                            <Tabs.Panel key={item.id} id={item.id} />
                        ))}
                    </Tabs>
                </div>
            </div>
        </div>
    </section>
);
