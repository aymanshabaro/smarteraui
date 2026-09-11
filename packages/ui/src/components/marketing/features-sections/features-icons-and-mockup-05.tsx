import type { FC } from "react";
import { ChartBreakoutSquare, MessageChatCircle, MessageSmileCircle, Zap } from "@properui/icons";
import { cx, sortCx } from "../../../utils/cx";
import { FeaturedIcon } from "../../foundations/featured-icon/featured-icon";

const styles = sortCx({
    section: "overflow-hidden bg-primary py-16 lg:py-24",
    container: "mx-auto w-full max-w-container px-4 md:px-8",
    column: "grid grid-cols-1 gap-x-8 gap-y-10 md:gap-y-12 lg:col-span-3",
    gridLine: "h-px w-full bg-border-tertiary",
});

type Feature = { icon: FC<{ className?: string }>; title: string; subtitle: string };

const leftFeatures: Feature[] = [
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

const rightFeatures: Feature[] = [
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

const FeatureItem = ({ feature }: { feature: Feature }) => (
    <li>
        <div className="flex max-w-sm flex-col gap-4">
            <FeaturedIcon icon={feature.icon} size="lg" theme="modern" color="gray" className="hidden md:flex" />
            <FeaturedIcon icon={feature.icon} size="md" theme="modern" color="gray" className="flex md:hidden" />

            <div>
                <h3 className="text-primary text-lg font-semibold">{feature.title}</h3>
                <p className="text-md text-tertiary mt-1">{feature.subtitle}</p>
            </div>
        </div>
    </li>
);

/**
 * Two static trend lines with a soft area fill, drawn to the same 736×341 viewBox as the reference chart.
 * TODO(orchestrator): candidate for `components/internal` — several marketing sections want a decorative chart.
 */
const TrendChart = () => (
    <svg
        width="736"
        height="341"
        viewBox="0 0 736 341"
        fill="none"
        preserveAspectRatio="none"
        aria-hidden="true"
        className="relative max-h-full w-full max-w-full md:h-64.5"
    >
        <path
            d="M0 300 L61 288 L123 296 L184 262 L245 268 L307 233 L368 241 L429 205 L491 213 L552 176 L613 168 L675 131 L736 118 L736 341 L0 341 Z"
            className="fill-utility-brand-100/40"
        />
        <path
            d="M0 300 L61 288 L123 296 L184 262 L245 268 L307 233 L368 241 L429 205 L491 213 L552 176 L613 168 L675 131 L736 118"
            className="stroke-utility-brand-600"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
        />
        <path
            d="M0 214 L61 208 L123 216 L184 196 L245 202 L307 180 L368 188 L429 165 L491 172 L552 149 L613 143 L675 122 L736 114"
            className="stroke-utility-brand-300"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
        />
    </svg>
);

/** Concentric progress rings around the "active users" figure. */
const ActiveUsersDial = () => (
    <svg width="272" height="272" viewBox="0 0 272 272" fill="none" aria-hidden="true" className="h-full max-h-full w-full max-w-full">
        <circle cx="136" cy="136" r="126" className="stroke-utility-brand-600" strokeWidth="14" strokeLinecap="round" strokeDasharray="660 792" fill="none" />
        <circle cx="136" cy="136" r="104" className="stroke-utility-brand-400" strokeWidth="14" strokeLinecap="round" strokeDasharray="490 654" fill="none" />
        <circle cx="136" cy="136" r="82" className="stroke-utility-brand-200" strokeWidth="14" strokeLinecap="round" strokeDasharray="360 515" fill="none" />
    </svg>
);

/** A centered heading with feature columns flanking an analytics card and an active-users dial. */
export const FeaturesIconsAndMockup05 = () => (
    <section className={styles.section}>
        <div className={styles.container}>
            <div className="mx-auto flex w-full flex-col md:text-center lg:max-w-3xl">
                <span className="text-brand-secondary md:text-md text-sm font-semibold">Features</span>
                <h2 className="text-display-sm text-primary md:text-display-md mt-3 font-semibold">Cutting-edge features for advanced analytics</h2>
                <p className="text-tertiary mt-4 text-lg md:mt-5 md:text-xl">
                    Powerful, self-serve product and growth analytics to help you convert, engage, and retain more users. Trusted by over 4,000 startups.
                </p>
            </div>

            <div className="z-10 mt-12 grid grid-cols-1 gap-10 md:mt-16 md:grid-cols-2 md:gap-16 lg:grid-cols-12 lg:items-start lg:gap-0">
                <ul className={styles.column}>
                    {leftFeatures.map((feature) => (
                        <FeatureItem key={feature.title} feature={feature} />
                    ))}
                </ul>

                <div className="relative order-last mt-2 flex w-full max-w-full items-start md:col-span-2 md:mt-0 lg:order-none lg:col-span-6 lg:px-16">
                    <div className="relative w-full">
                        <div className="bg-primary ring-secondary_alt flex h-68 flex-col overflow-hidden rounded-xl p-5 shadow-2xl ring-1 md:h-90 md:p-8 lg:h-96 lg:w-full">
                            <div className="text-primary text-sm font-semibold md:text-lg">Users over time</div>

                            <div className="relative flex min-h-0 min-w-0 flex-1 items-center">
                                <div className="absolute inset-0 flex size-full flex-col justify-between py-3" aria-hidden="true">
                                    {Array.from({ length: 6 }, (_, index) => (
                                        <span key={index} className={styles.gridLine} />
                                    ))}
                                </div>

                                <TrendChart />
                            </div>

                            <ul className="flex justify-between px-2">
                                {["Jan", "Mar", "May", "Jul", "Sep", "Nov", "Dec"].map((month) => (
                                    <li key={month} className="text-tertiary text-xs">
                                        {month}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="absolute -end-16 -bottom-10 md:-end-6 md:-bottom-30">
                            <div className="relative flex size-[192px] items-center justify-center md:size-[232px]">
                                <ActiveUsersDial />

                                <div className="absolute flex flex-col items-center text-center md:gap-0.5">
                                    <p className="text-tertiary text-xs font-medium">Active users</p>
                                    <p className="text-primary lg:text-display-xs text-xl font-semibold">1,000</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <ul className={cx("z-10", styles.column)}>
                    {rightFeatures.map((feature) => (
                        <FeatureItem key={feature.title} feature={feature} />
                    ))}
                </ul>
            </div>
        </div>
    </section>
);
