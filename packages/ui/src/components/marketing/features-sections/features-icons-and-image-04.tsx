import type { FC } from "react";
import { MessageSmileCircle, Zap } from "@smarteraui/icons";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";
import { sortCx } from "@/utils/cx";
import { IMAGES } from "@/utils/demo-assets";

const styles = sortCx({
    band: "bg-secondary pt-16 pb-[112px] md:pt-24 md:pb-40",
    grid: "mx-auto grid w-full max-w-container grid-cols-1 gap-12 px-4 md:gap-16 md:px-8 lg:grid-cols-2 lg:gap-24",
});

const features: { icon: FC<{ className?: string }>; title: string; subtitle: string }[] = [
    {
        icon: MessageSmileCircle,
        title: "Share team inboxes",
        subtitle: "Whether you have a team of 2 or 200, our shared team inboxes keep everyone on the same page and in the loop.",
    },
    {
        icon: Zap,
        title: "Deliver instant answers",
        subtitle: "An all-in-one customer service platform that helps you balance everything your customers need to be happy.",
    },
];

/** A two-column intro on a tinted band, with a wide workspace photo overlapping the band's lower edge. */
export const FeaturesIconsAndImage04 = () => (
    <section className="bg-primary">
        <div className={styles.band}>
            <div className={styles.grid}>
                <div className="flex w-full flex-col">
                    <span className="text-brand-secondary md:text-md text-sm font-semibold">New feature</span>
                    <h2 className="text-display-sm text-primary md:text-display-md mt-3 font-semibold">Introducing team inboxes</h2>
                    <p className="text-tertiary mt-4 text-lg md:mt-5 md:text-xl">
                        Powerful, self-serve product and growth analytics to help you convert, engage, and retain more users. Trusted by over 4,000 startups.
                    </p>
                </div>

                <ul className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-12 lg:grid-cols-1">
                    {features.map((feature) => (
                        <li key={feature.title}>
                            <div className="flex max-w-140 gap-4">
                                <FeaturedIcon icon={feature.icon} size="lg" theme="modern" color="gray" className="hidden md:flex" />
                                <FeaturedIcon icon={feature.icon} size="md" theme="modern" color="gray" className="flex md:hidden" />

                                <div className="flex flex-col items-start gap-4">
                                    <div>
                                        <h3 className="text-primary mt-1.5 text-lg font-semibold md:mt-2.5">{feature.title}</h3>
                                        <p className="text-md text-tertiary mt-1">{feature.subtitle}</p>
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>

        <div className="max-w-container mx-auto -mt-16 flex w-full justify-center px-4 pb-16 md:-mt-24 md:px-8 md:pb-24">
            <img alt="Team working together in a shared workspace" src={IMAGES.landscape[1].src} className="h-60 w-full object-cover md:h-100 lg:h-129" />
        </div>
    </section>
);
