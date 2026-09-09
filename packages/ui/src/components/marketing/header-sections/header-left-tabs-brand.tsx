"use client";

import { Tab, TabList, TabPanel, Tabs } from "@/components/application/tabs/tabs";

/**
 * The brand-background twin of `HeaderLeftTabs`. The tab list drops its own surface so
 * it reads against `bg-brand-section`, and the selected tab picks up the brand-alt chip.
 *
 * The panels are empty on purpose: the header section owns the switch, the pricing
 * table that follows it owns the content. They still have to exist so the `aria-controls`
 * React Aria puts on each tab resolves to a real element.
 */
export const HeaderLeftTabsBrand = () => (
    <section className="bg-brand-section py-16 md:py-24">
        <div className="max-w-container mx-auto px-4 md:px-8">
            <div className="flex w-full max-w-3xl flex-col">
                <span className="text-secondary_on-brand md:text-md text-sm font-semibold">Pricing</span>
                <h1 className="text-display-md text-primary_on-brand md:text-display-lg mt-3 font-semibold">Simple, transparent pricing</h1>
                <p className="text-tertiary_on-brand mt-4 text-lg md:mt-6 md:text-xl">
                    Simple, transparent pricing that grows with you. Try any plan free for 30 days.
                </p>

                <div className="mt-8 sm:self-start md:mt-12">
                    <Tabs defaultSelectedKey="monthly">
                        <TabList
                            type="button-gray"
                            size="md"
                            aria-label="Billing period"
                            className={[
                                "w-full md:w-auto [&_[role=tab]]:flex-1",
                                // On a brand surface the tabs invert: muted on-brand labels, a translucent
                                // hover wash and a brand-alt chip for the selected one.
                                "[&_[role=tab]]:text-secondary_on-brand [&_[role=tab]]:hover:bg-white/10",
                                "[&_[role=tab]]:selected:bg-brand-primary_alt [&_[role=tab]]:selected:text-brand-secondary",
                            ].join(" ")}
                        >
                            <Tab id="monthly" label="Monthly billing" />
                            <Tab id="annually" label="Annual billing" />
                        </TabList>

                        <TabPanel id="monthly" />
                        <TabPanel id="annually" />
                    </Tabs>
                </div>
            </div>
        </div>
    </section>
);
