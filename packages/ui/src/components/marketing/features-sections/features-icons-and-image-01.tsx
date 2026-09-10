import type { FC } from "react";
import { ChartBreakoutSquare, MessageChatCircle, MessageSmileCircle, Zap } from "@properui/icons";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";
import { sortCx } from "@/utils/cx";
import { IMAGES } from "@/utils/demo-assets";

const styles = sortCx({
    section: "overflow-hidden bg-primary py-16 md:py-24",
    container: "mx-auto w-full max-w-container px-4 md:px-8",
    grid: "mt-12 grid grid-cols-1 gap-12 md:mt-16 md:gap-16 lg:grid-cols-2 lg:items-center",
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
    {
        icon: ChartBreakoutSquare,
        title: "Manage your team with reports",
        subtitle: "Measure what matters with Proper UI's easy-to-use reports. You can filter, export, and drilldown on the data in a couple clicks.",
    },
    {
        icon: MessageChatCircle,
        title: "Connect with customers",
        subtitle: "Solve a problem or close a sale in real-time with chat. If no one is available, customers are seamlessly routed to email without confusion.",
    },
];

/**
 * Decorative hand-drawn arrow that points from the copy column to the screenshot.
 * TODO(orchestrator): candidate for `shared-assets/decorations` — several marketing sections reuse it.
 */
const CurvedArrow = (props: { className?: string }) => (
    <svg width="284" height="245" viewBox="0 0 284 245" fill="none" aria-hidden="true" {...props}>
        <path
            d="M2 8c60 42 140 4 196 22 34 11 52 40 38 62-14 21-52 17-58-6-6-25 26-44 60-40 44 5 40 60 26 122"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
        />
        <path d="M246 220l18-30 18 30" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
);

/** A two-column features block: a four-up icon grid beside a laptop screenshot bleeding off the right edge. */
export const FeaturesIconsAndImage01 = () => (
    <section className={styles.section}>
        <div className={styles.container}>
            <div className="flex w-full flex-col lg:max-w-3xl">
                <span className="text-brand-secondary md:text-md text-sm font-semibold">Features</span>
                <h2 className="text-display-sm text-primary md:text-display-md mt-3 font-semibold">Overflowing with useful features</h2>
                <p className="text-tertiary mt-4 text-lg md:mt-5 md:text-xl">
                    Powerful, self-serve product and growth analytics to help you convert, engage, and retain more users. Trusted by over 4,000 startups.
                </p>
            </div>

            <div className={styles.grid}>
                <ul className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2 md:gap-y-12">
                    {features.map((feature) => (
                        <li key={feature.title}>
                            <div className="flex max-w-sm flex-col gap-4">
                                <FeaturedIcon icon={feature.icon} size="lg" theme="modern" color="gray" className="hidden md:flex" />
                                <FeaturedIcon icon={feature.icon} size="md" theme="modern" color="gray" className="flex md:hidden" />

                                <div>
                                    <h3 className="text-primary text-lg font-semibold">{feature.title}</h3>
                                    <p className="text-md text-tertiary mt-1">{feature.subtitle}</p>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>

                <div className="relative -ms-4 w-screen md:ms-0 md:w-full lg:h-140">
                    <div className="absolute start-28 -top-[141px] z-10 max-lg:hidden">
                        <CurvedArrow className="text-fg-brand-secondary" />
                    </div>

                    <div className="bg-tertiary -mx-4 flex items-center justify-center overflow-hidden px-0 py-6 md:rounded-3xl lg:absolute lg:-ms-0 lg:me-9.5 lg:h-140 lg:w-[50vw] lg:justify-start lg:rounded-e-none lg:py-14 lg:ps-10 lg:pe-0">
                        <img
                            alt="Dashboard mockup showing application interface"
                            src={IMAGES.landscape[0].src}
                            className="h-full object-contain lg:max-w-none"
                        />
                    </div>
                </div>
            </div>
        </div>
    </section>
);
