"use client";

import { Tab, TabList, TabPanel, Tabs } from "../../application/tabs/tabs";

/**
 * Start-aligned pricing header whose billing-period switch is a bordered React Aria
 * tab list — full width on mobile, shrink-to-fit from `md` up.
 *
 * The panels are empty on purpose: the header section owns the switch, the pricing
 * table that follows it owns the content. They still have to exist so the `aria-controls`
 * React Aria puts on each tab resolves to a real element.
 */
export const HeaderLeftTabs = () => (
    <section className="bg-primary py-16 md:py-24">
        <div className="max-w-container mx-auto px-4 md:px-8">
            <div className="flex w-full max-w-3xl flex-col">
                <span className="text-brand-secondary md:text-md text-sm font-semibold">Pricing</span>
                <h1 className="text-display-md text-primary md:text-display-lg mt-3 font-semibold">Simple, transparent pricing</h1>
                <p className="text-tertiary mt-4 text-lg md:mt-6 md:text-xl">Simple, transparent pricing that grows with you. Try any plan free for 30 days.</p>

                <div className="mt-8 sm:self-start md:mt-12">
                    <Tabs defaultSelectedKey="monthly">
                        <TabList type="button-border" size="md" aria-label="Billing period" className="w-full md:w-auto [&_[role=tab]]:flex-1">
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
