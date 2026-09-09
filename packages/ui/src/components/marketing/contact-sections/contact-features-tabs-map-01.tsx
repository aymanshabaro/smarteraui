"use client";

import { Tab as AriaTab, TabList as AriaTabList, TabPanel as AriaTabPanel, Tabs as AriaTabs } from "react-aria-components";
import { Badge } from "@/components/base/badges/badges";
import { cx, sortCx } from "@/utils/cx";

const stores = [
    { id: "melbourne", city: "Melbourne", address: "100 Flinders Street\nMelbourne VIC 3000 AU" },
    { id: "sydney", city: "Sydney", address: "100 George Street\nSydney NSW 2000 AU" },
    { id: "byron-bay", city: "Byron Bay", address: "100 Jonson Street\nByron Bay NSW 2481 AU" },
];

const styles = sortCx({
    tab: {
        root: "hover:border-brand outline-focus-ring flex flex-1 cursor-pointer flex-col items-center border-t-4 pt-5 text-center transition duration-100 ease-linear focus-visible:outline-2 focus-visible:-outline-offset-2 md:px-4",
        selected: "border-brand",
        unselected: "border-tertiary",
    },
});

/** Centered heading over an embedded map, with a horizontal store picker underneath it. */
export const ContactFeaturesTabsMap01 = () => (
    <section className="bg-primary py-16 md:py-24">
        <div className="max-w-container mx-auto px-4 md:px-8">
            <div className="mx-auto flex w-full max-w-3xl flex-col items-center text-center">
                <Badge color="gray" size="lg" className="hidden md:flex">
                    Stores
                </Badge>
                <Badge color="gray" size="md" className="md:hidden">
                    Stores
                </Badge>

                <h2 className="text-display-sm text-primary md:text-display-md mt-4 font-semibold">Our locations</h2>
                <p className="text-tertiary mt-4 text-lg md:mt-5 md:text-xl">Say hello to our friendly team at one of these locations.</p>
            </div>

            <AriaTabs defaultSelectedKey={stores[0]?.id} className="mt-12 grid grid-cols-1 gap-12 md:mt-16 md:gap-20">
                <AriaTabList aria-label="Our stores" className="row-start-2 grid grid-cols-1 gap-y-10 md:grid-cols-3" items={stores}>
                    {(store) => (
                        <AriaTab id={store.id} className={({ isSelected }) => cx(styles.tab.root, isSelected ? styles.tab.selected : styles.tab.unselected)}>
                            <h3 className="text-primary text-lg font-semibold">{store.city}</h3>
                            <p className="text-md text-tertiary mt-1 whitespace-pre">{store.address}</p>
                        </AriaTab>
                    )}
                </AriaTabList>

                {stores.map((store) => (
                    <AriaTabPanel key={store.id} id={store.id} className="row-start-1">
                        <iframe
                            title={`Map of our ${store.city} store`}
                            src="https://snazzymaps.com/embed/451894"
                            className="h-60 w-full border-none md:h-120"
                        />
                    </AriaTabPanel>
                ))}
            </AriaTabs>
        </div>
    </section>
);
