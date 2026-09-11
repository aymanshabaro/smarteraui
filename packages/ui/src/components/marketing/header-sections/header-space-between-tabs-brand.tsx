"use client";

import { Tabs } from "../../application/tabs/tabs";

const billingPeriods = [
    { id: "monthly", label: "Monthly billing" },
    { id: "annually", label: "Annual billing" },
];

/**
 * Pricing page header on the brand section background. The billing toggle drops the tab
 * list chrome and recolours its tabs with the `*_on-brand` tokens.
 */
export const HeaderSpaceBetweenTabsBrand = () => (
    <section className="bg-brand-section py-16 md:py-24">
        <div className="max-w-container mx-auto px-4 md:px-8">
            <div className="text-secondary_on-brand md:text-md mb-3 text-sm font-semibold">Pricing</div>

            <div className="grid grid-cols-[minmax(auto,768px)] gap-x-16 lg:grid-cols-[1fr_480px]">
                <h1 className="text-display-md text-primary_on-brand md:text-display-lg font-semibold">Simple, transparent pricing</h1>
                <p className="text-tertiary_on-brand mt-4 text-lg md:mt-6 md:text-xl lg:mt-3 lg:h-0">
                    Simple, transparent pricing that grows with you. Try any plan free for 30 days.
                </p>

                <div className="mt-8 sm:justify-self-start md:mt-12">
                    <Tabs defaultSelectedKey="monthly">
                        <Tabs.List
                            aria-label="Billing period"
                            size="md"
                            type="button-gray"
                            items={billingPeriods}
                            className="[&_[role=tab]]:text-secondary_on-brand [&_[role=tab]]:selected:bg-brand-primary_alt [&_[role=tab]]:selected:text-brand-secondary w-full md:w-auto [&_[role=tab]]:flex-1 [&_[role=tab]]:hover:bg-white/10"
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
