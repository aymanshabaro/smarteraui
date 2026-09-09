"use client";

import { Tab, TabList, TabPanel, Tabs } from "@/components/application/tabs/tabs";

/**
 * The centered pricing header on a solid brand section, with the on-brand text
 * tokens and the same bordered billing-period tab list.
 */
export const HeaderCenteredTabsBrand = () => (
    <section className="bg-brand-section py-16 md:py-24">
        <div className="max-w-container mx-auto px-4 md:px-8">
            <div className="mx-auto flex w-full max-w-3xl flex-col items-center text-center">
                <span className="text-secondary_on-brand md:text-md text-sm font-semibold">Pricing</span>
                <h1 className="text-display-md text-primary_on-brand md:text-display-lg mt-3 font-semibold">Simple, transparent pricing</h1>
                <p className="text-tertiary_on-brand mt-4 text-lg md:mt-6 md:text-xl">
                    Simple, transparent pricing that grows with you. Try any plan free for 30 days.
                </p>

                <div className="mt-8 self-stretch sm:self-center md:mt-12">
                    <Tabs defaultSelectedKey="monthly">
                        <TabList type="button-border" size="md" aria-label="Billing period" className="w-full md:w-auto [&_[role=tab]]:flex-1">
                            <Tab id="monthly" label="Monthly billing" />
                            <Tab id="annually" label="Annual billing" />
                        </TabList>

                        {/* The plan grid lives in the section below, so the panels only exist to satisfy the tabs' `aria-controls`. */}
                        <TabPanel id="monthly" />
                        <TabPanel id="annually" />
                    </Tabs>
                </div>
            </div>
        </div>
    </section>
);
