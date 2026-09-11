"use client";

import { ArrowRight } from "@properui/icons";
import { cx, sortCx } from "../../../utils/cx";
import { AVATARS } from "../../../utils/demo-assets";
import { Button } from "../../base/buttons/button";
import { CreditCard } from "../../shared-assets/credit-card/credit-card";

const styles = sortCx({
    section: "overflow-hidden bg-primary py-16 lg:py-24",
    container: "mx-auto w-full max-w-container px-4 md:px-8",
    item: "relative flex flex-col items-start gap-4 border-s-4 py-4 ps-5 transition duration-100 ease-linear",
    card: "relative [--scale:0.84] md:[--scale:1.3] lg:[--scale:1.57]",
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
        subtitle: "Measure what matters with Proper UI's easy-to-use reports. You can filter, export, and drilldown on the data in a couple clicks.",
    },
];

/** A left-aligned feature list beside two tilted credit cards on a tinted panel. */
export const FeaturesTabsMockup10 = () => (
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

                <div className="bg-tertiary relative -mx-4 flex h-80 items-center justify-center md:me-0 md:h-120 lg:h-160" aria-hidden="true">
                    <div className="-space-y-[106px] md:-space-y-16 lg:-space-y-8">
                        <div className={cx(styles.card, "z-1")} style={{ transform: "scale(var(--scale)) rotate(60deg) translate(38px, -53px)" }}>
                            <CreditCard type="transparent" company="Proper UI" cardHolder={AVATARS[0].name} />
                        </div>
                        <div className={cx(styles.card, "z-0")} style={{ transform: "scale(var(--scale)) rotate(30deg) translate(-23px, 24px)" }}>
                            <CreditCard type="brand-dark" company="Proper UI" cardHolder={AVATARS[1].name} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
);
