"use client";

import { Tab as AriaTab, TabList as AriaTabList, TabPanel as AriaTabPanel, Tabs as AriaTabs } from "react-aria-components";
import { cx, sortCx } from "../../../utils/cx";
import { IMAGES } from "../../../utils/demo-assets";
import { Badge } from "../../base/badges/badges";
import { IPhoneMockup } from "../../shared-assets/mockups/iphone-mockup";

const styles = sortCx({
    section: "bg-primary py-16 md:py-24",
    container: "mx-auto w-full max-w-container px-4 md:px-8",
    tab: [
        "relative flex max-w-[405px] cursor-pointer flex-col items-center gap-4 border-t-4 pt-5 text-center transition duration-100 ease-linear md:gap-5 md:px-4",
        "outline-focus-ring hover:border-brand focus-visible:outline-2 focus-visible:outline-offset-2",
    ].join(" "),
});

const tabs = [
    {
        id: "share-team-inboxes",
        title: "Share team inboxes",
        subtitle: "Whether you have a team of 2 or 200, our shared team inboxes keep everyone on the same page and in the loop.",
        image: IMAGES.landscape[0],
    },
    {
        id: "deliver-instant-answers",
        title: "Deliver instant answers",
        subtitle: "An all-in-one customer service platform that helps you balance everything your customers need to be happy.",
        image: IMAGES.landscape[1],
    },
    {
        id: "manage-your-team-with-reports",
        title: "Manage your team with reports",
        subtitle: "Measure what matters with Proper UI's easy-to-use reports. You can filter, export, and drilldown on the data in a couple clicks.",
        image: IMAGES.landscape[2],
    },
];

/** A centered heading over an iPhone mockup that swaps as you move through the three tabs below it. */
export const FeaturesTabsMockup03 = () => (
    <section className={styles.section}>
        <div className={styles.container}>
            <div className="mx-auto flex w-full max-w-3xl flex-col items-center text-center">
                <Badge size="lg" color="brand" className="hidden md:flex">
                    Features
                </Badge>
                <Badge size="md" color="brand" className="flex md:hidden">
                    Features
                </Badge>

                <h2 className="text-display-sm text-primary md:text-display-md mt-4 font-semibold">Cutting-edge features for advanced analytics</h2>
                <p className="text-tertiary mt-4 text-lg md:mt-5 md:text-xl">
                    Powerful, self-serve product and growth analytics to help you convert, engage, and retain more users. Trusted by over 4,000 startups.
                </p>
            </div>
        </div>

        {/* The tab list is rendered first so React Aria can wire `aria-controls`; `order-*` puts the mockup on top. */}
        <AriaTabs className="flex flex-col">
            <div className="max-w-container order-2 mx-auto mt-12 w-full px-4 md:mt-20 md:px-8">
                <AriaTabList aria-label="Features" className="flex flex-1 flex-wrap justify-center gap-y-11 lg:flex-nowrap">
                    {tabs.map((tab) => (
                        <AriaTab key={tab.id} id={tab.id} className={({ isSelected }) => cx(styles.tab, isSelected ? "border-brand" : "border-tertiary")}>
                            <div>
                                <h3 className="text-primary text-lg font-semibold">{tab.title}</h3>
                                <p className="text-md text-tertiary mt-1">{tab.subtitle}</p>
                            </div>
                        </AriaTab>
                    ))}
                </AriaTabList>
            </div>

            <div className="max-w-container order-1 mx-auto w-full overflow-hidden px-4 md:px-8">
                <div className="flex flex-col pt-12 md:pt-16 lg:items-center">
                    {tabs.map((tab) => (
                        <AriaTabPanel key={tab.id} id={tab.id} className="flex h-104 w-full items-start justify-center md:h-128">
                            <IPhoneMockup image={tab.image.src} className="drop-shadow-iphone-mockup h-[579px] w-71 md:h-auto md:w-[313px]" />
                        </AriaTabPanel>
                    ))}
                </div>
            </div>
        </AriaTabs>
    </section>
);
