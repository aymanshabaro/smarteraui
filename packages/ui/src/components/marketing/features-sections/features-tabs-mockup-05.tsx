"use client";

import { Tab as AriaTab, TabList as AriaTabList, TabPanel as AriaTabPanel, Tabs as AriaTabs } from "react-aria-components";
import { ArrowRight } from "@properui/icons";
import { cx } from "../../../utils/cx";
import { IMAGES } from "../../../utils/demo-assets";

const tabs = [
    {
        id: "team-inboxes",
        title: "Share team inboxes",
        subtitle: "Whether you have a team of 2 or 200, our shared team inboxes keep everyone on the same page and in the loop.",
        image: IMAGES.landscape[0],
    },
    {
        id: "instant-answers",
        title: "Deliver instant answers",
        subtitle: "An all-in-one customer service platform that helps you balance everything your customers need to be happy.",
        image: IMAGES.landscape[1],
    },
    {
        id: "reports",
        title: "Manage your team with reports",
        subtitle: "Measure what matters with Proper UI's easy-to-use reports. You can filter, export, and drilldown on the data in a couple clicks.",
        image: IMAGES.landscape[2],
    },
];

export const FeaturesTabsMockup05 = () => (
    <section className="bg-primary py-16 md:py-24">
        <div className="max-w-container mx-auto w-full px-4 md:px-8">
            <div className="flex w-full flex-col lg:max-w-3xl">
                <span className="text-brand-secondary md:text-md text-sm font-semibold">Features</span>
                <h2 className="text-display-sm text-primary md:text-display-md mt-3 font-semibold">Overflowing with useful features</h2>
                <p className="text-tertiary mt-4 text-lg md:mt-5 md:text-xl">
                    Powerful, self-serve product and growth analytics to help you convert, engage, and retain more users. Trusted by over 4,000 startups.
                </p>
            </div>

            <AriaTabs defaultSelectedKey="team-inboxes" className="mt-12 grid grid-cols-1 gap-12 md:mt-16 md:gap-16 lg:grid-cols-2 lg:items-center">
                <AriaTabList aria-label="Features" className="flex flex-col">
                    {tabs.map((tab) => (
                        <AriaTab
                            key={tab.id}
                            id={tab.id}
                            className={({ isSelected }) =>
                                cx(
                                    "outline-focus-ring hover:border-brand relative flex cursor-pointer flex-col items-start gap-4 border-s-4 py-4 ps-5 transition duration-100 ease-linear focus-visible:outline-2 focus-visible:outline-offset-2",
                                    isSelected ? "border-brand" : "border-tertiary",
                                )
                            }
                        >
                            <div>
                                <h3 className="text-primary text-lg font-semibold">{tab.title}</h3>
                                <p className="text-md text-tertiary mt-1">{tab.subtitle}</p>
                            </div>
                            <span className="text-md text-brand-secondary flex items-center gap-1.5 font-semibold">
                                Learn more
                                <ArrowRight aria-hidden="true" className="text-fg-brand-secondary_alt size-5" />
                            </span>
                        </AriaTab>
                    ))}
                </AriaTabList>

                {tabs.map((tab) => (
                    <AriaTabPanel
                        key={tab.id}
                        id={tab.id}
                        className="bg-tertiary -ms-4 flex w-screen items-center justify-center overflow-hidden px-4 py-6 sm:w-auto md:py-10 lg:h-132 lg:justify-start lg:py-12 lg:ps-12 lg:pe-0"
                    >
                        <img
                            src={tab.image.src}
                            alt={tab.image.alt}
                            className="shadow-3xl ring-screen-mockup-border h-full rounded-lg object-cover object-left-top ring-4 lg:max-w-none"
                        />
                    </AriaTabPanel>
                ))}
            </AriaTabs>
        </div>
    </section>
);
