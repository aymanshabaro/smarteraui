"use client";

import { ArrowRight } from "@smarteraui/icons";
import { Button } from "@/components/base/buttons/button";
import { cx, sortCx } from "@/utils/cx";
import { IMAGES } from "@/utils/demo-assets";

const styles = sortCx({
    section: "overflow-hidden bg-primary py-16 md:py-24",
    container: "mx-auto w-full max-w-container px-4 md:px-8",
    item: "relative flex flex-col items-start gap-4 border-s-4 py-4 ps-5 transition duration-100 ease-linear",
    // The "modern" device frame: three nested rounded shells around the screenshot.
    deskOuter:
        "size-full rounded-[9.03px] bg-primary p-[0.9px] shadow-lg ring-[0.56px] ring-utility-neutral-300 ring-inset md:rounded-[26.95px] md:p-[3.5px] md:ring-[1.68px]",
    deskInner: "size-full rounded-[7.9px] bg-primary p-0.5 shadow-modern-mockup-inner-md md:rounded-[23.58px] md:p-1 md:shadow-modern-mockup-inner-lg",
    deskScreen:
        "relative size-full overflow-hidden rounded-[6.77px] bg-utility-neutral-50 ring-[0.56px] ring-utility-neutral-200 md:rounded-[20.21px] md:ring-[1.68px]",
    phoneOuter: "size-full rounded-[23.89px] bg-primary p-[3px] shadow-lg ring-[1.49px] ring-utility-neutral-300 ring-inset",
    phoneInner: "size-full rounded-[20.91px] bg-primary p-1 shadow-modern-mockup-inner-lg",
    phoneScreen: "relative size-full overflow-hidden rounded-[17.92px] bg-utility-neutral-50 ring-[1.49px] ring-utility-neutral-200",
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
        subtitle: "Measure what matters with Smartera's easy-to-use reports. You can filter, export, and drilldown on the data in a couple clicks.",
    },
];

/** A left-aligned feature list beside overlapping desktop and mobile device frames. */
export const FeaturesTabsMockup06 = () => (
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

                <div className="relative -ms-4 flex h-90 w-screen items-start justify-center sm:w-auto lg:h-128">
                    <div className="absolute start-16 top-0 hidden w-max lg:block lg:h-168.5 lg:max-h-168.5">
                        <div className={styles.deskOuter}>
                            <div className={styles.deskInner}>
                                <div className={styles.deskScreen}>
                                    <img
                                        alt="Dashboard mockup showing application interface"
                                        src={IMAGES.landscape[0].src}
                                        className="size-full object-cover object-left-top"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="w-max max-w-70 lg:absolute lg:start-0 lg:top-26">
                        <div className={styles.phoneOuter}>
                            <div className={styles.phoneInner}>
                                <div className={styles.phoneScreen}>
                                    <img alt="Mobile app interface mockup" src={IMAGES.landscape[1].src} className="size-full object-cover object-left-top" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
);
