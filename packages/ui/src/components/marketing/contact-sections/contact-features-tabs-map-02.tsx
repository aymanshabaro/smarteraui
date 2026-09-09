"use client";

import { Tab as AriaTab, TabList as AriaTabList, TabPanel as AriaTabPanel, Tabs as AriaTabs } from "react-aria-components";
import { ArrowRight } from "@smarteraui/icons";
import { cx, sortCx } from "@/utils/cx";

const stores = [
    { id: "melbourne", city: "Melbourne", address: "100 Flinders Street\nMelbourne VIC 3000 AU" },
    { id: "sydney", city: "Sydney", address: "100 George Street\nSydney NSW 2000 AU" },
    { id: "byron-bay", city: "Byron Bay", address: "100 Jonson Street\nByron Bay NSW 2481 AU" },
];

const styles = sortCx({
    tab: {
        root: "hover:border-brand outline-focus-ring flex max-w-lg cursor-pointer flex-col border-s-4 py-4 ps-5 transition duration-150 ease-in-out focus-visible:outline-2 focus-visible:-outline-offset-2",
        selected: "border-brand",
        unselected: "border-tertiary",
    },
});

/** A vertical store picker that swaps the embedded map beside it. */
export const ContactFeaturesTabsMap02 = () => (
    <section className="bg-primary py-16 md:py-24">
        <div className="max-w-container mx-auto px-4 md:px-8">
            <div className="flex w-full flex-col lg:w-192">
                <span className="text-brand-secondary md:text-md text-sm font-semibold">Our locations</span>
                <h2 className="text-display-sm text-primary md:text-display-md mt-3 font-semibold">Visit our stores</h2>
                <p className="text-tertiary mt-4 text-lg md:mt-5 md:text-xl">Say hello to our friendly team at one of these locations.</p>
            </div>

            <AriaTabs
                defaultSelectedKey={stores[0]?.id}
                className="mt-12 grid grid-cols-1 gap-12 md:mt-16 md:gap-16 lg:grid-cols-3 lg:items-center"
                orientation="vertical"
            >
                <AriaTabList aria-label="Our stores" className="flex flex-col" items={stores}>
                    {(store) => (
                        <AriaTab id={store.id} className={({ isSelected }) => cx(styles.tab.root, isSelected ? styles.tab.selected : styles.tab.unselected)}>
                            <h3 className="text-primary text-lg font-semibold">{store.city}</h3>
                            <p className="text-md text-tertiary mt-1 whitespace-pre">{store.address}</p>
                            <span className="text-brand-secondary text-md mt-4 flex items-center gap-1.5 font-semibold">
                                <span className="underline decoration-transparent underline-offset-4">View store</span>
                                <ArrowRight aria-hidden="true" className="text-fg-brand-secondary_alt size-5 shrink-0 rtl:-scale-x-100" />
                            </span>
                        </AriaTab>
                    )}
                </AriaTabList>

                {stores.map((store) => (
                    <AriaTabPanel key={store.id} id={store.id} className="col-span-2 h-60 w-full lg:h-full">
                        <iframe title={`Map of our ${store.city} store`} src="https://snazzymaps.com/embed/451871" className="size-full border-none" />
                    </AriaTabPanel>
                ))}
            </AriaTabs>
        </div>
    </section>
);
