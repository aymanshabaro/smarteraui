"use client";

import { ArrowRight } from "@properui/icons";
import { Button } from "@/components/base/buttons/button";
import { cx, sortCx } from "@/utils/cx";
import { IMAGES } from "@/utils/demo-assets";

const styles = sortCx({
    section: "overflow-hidden bg-primary py-16 md:py-24",
    container: "mx-auto w-full max-w-container px-4 md:px-8",
    item: "relative flex flex-col items-start gap-4 border-s-4 py-4 ps-5 transition duration-100 ease-linear",
});

const features = [
    {
        title: "Share team inboxes",
        subtitle: "Whether you have a team of 2 or 200, our shared team inboxes keep everyone on the same page and in the loop.",
    },
    {
        title: "Deliver instant answers",
        subtitle: "An all-in-one customer service platform that helps you balance everything your customers need to be happy.",
    },
    {
        title: "Manage your team with reports",
        subtitle: "Measure what matters with Proper's easy-to-use reports. You can filter, export, and drilldown on the data in a couple clicks.",
    },
];

/** A left-aligned feature list beside a laptop screenshot that bleeds off the right edge. */
export const FeaturesTabsMockup07 = () => (
    <section className={styles.section}>
        <div className={styles.container}>
            <div className="flex w-full flex-col lg:max-w-3xl">
                <span className="text-brand-secondary md:text-md text-sm font-semibold">Features</span>
                <h2 className="text-display-sm text-primary md:text-display-md mt-3 font-semibold">Overflowing with useful features</h2>
                <p className="text-tertiary mt-4 text-lg md:mt-5 md:text-xl">
                    Powerful, self-serve product and growth analytics to help you convert, engage, and retain more users. Trusted by over 4,000 startups.
                </p>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-12 md:mt-16 md:gap-16 lg:grid-cols-2 lg:items-center">
                <ul className="flex flex-col">
                    {features.map((feature, index) => (
                        <li key={feature.title}>
                            <div className={cx(styles.item, index === 0 ? "border-brand" : "border-tertiary")}>
                                <div>
                                    <h3 className="text-primary text-lg font-semibold">{feature.title}</h3>
                                    <p className="text-md text-tertiary mt-1">{feature.subtitle}</p>
                                </div>

                                <Button color="link-color" size="lg" href="#" iconTrailing={ArrowRight}>
                                    Learn more
                                </Button>
                            </div>
                        </li>
                    ))}
                </ul>

                <div className="relative -ms-4 w-screen md:w-full lg:h-140">
                    <div className="-mx-4 flex items-center justify-center lg:absolute lg:-ms-0 lg:me-9.5 lg:h-140 lg:w-[50vw] lg:justify-start">
                        <img alt="Laptop screen mockup" src={IMAGES.landscape[0].src} className="h-full object-contain lg:max-w-none" />
                    </div>
                </div>
            </div>
        </div>
    </section>
);
