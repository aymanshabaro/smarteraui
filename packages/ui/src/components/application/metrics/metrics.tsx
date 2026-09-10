"use client";

import { Eye, TrendUp01, Zap } from "@properui/icons";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";
import { cx, sortCx } from "@/utils/cx";
import type { MetricCardBaseProps, MetricCardChangeDescriptionProps, MetricCardIconProps } from "./metrics-base";
import { MetricCardFooter, MetricCardMenu, MetricChangeIndicator } from "./metrics-base";
import type { MetricChartDatum, MetricComparisonChartDatum } from "./metrics-chart";
import { MetricComparisonSparkline, MetricSparkline } from "./metrics-chart";

export const styles = sortCx({
    common: {
        root: "rounded-xl bg-primary shadow-xs ring-1 ring-secondary ring-inset",
        content: "relative flex flex-col px-4 py-5 md:px-5",
        value: "flex-1 text-display-sm font-semibold text-primary",
        description: "text-sm font-medium text-tertiary",
    },
    titles: {
        // Muted caption sitting above the value.
        caption: { root: "text-sm font-medium text-tertiary" },
        // Same size but bolder — used when the title carries the card.
        strong: { root: "text-sm font-semibold text-tertiary" },
        // Card-level heading, paired with a featured icon or a chart.
        heading: { root: "text-md font-semibold text-primary" },
    },
});

/**
 * The plainest metric card: a caption, the value, and a pill showing the change.
 */
export const MetricSimple = ({ title, value, change, trend, menu, footer, footerType, className }: MetricCardBaseProps) => (
    <div className={cx(styles.common.root, className)}>
        <div className={cx(styles.common.content, "gap-2")}>
            <h3 className={styles.titles.caption.root}>{title}</h3>

            <div className="flex items-end gap-4">
                <p className={styles.common.value}>{value}</p>
                <MetricChangeIndicator trend={trend}>{change}</MetricChangeIndicator>
            </div>

            {menu && <MetricCardMenu>{menu}</MetricCardMenu>}
        </div>

        {footer && <MetricCardFooter type={footerType}>{footer}</MetricCardFooter>}
    </div>
);

/**
 * A metric card led by a large round featured icon stacked above the value.
 */
export const MetricIcon01 = ({
    title,
    value,
    change,
    trend,
    icon = TrendUp01,
    iconColor = "success",
    menu,
    footer,
    footerType,
    className,
}: MetricCardBaseProps & MetricCardIconProps) => (
    <div className={cx(styles.common.root, className)}>
        <div className={cx(styles.common.content, "gap-4 md:gap-5")}>
            <FeaturedIcon size="lg" theme="light" color={iconColor} icon={icon} />

            <div className="flex flex-col gap-2">
                <h3 className={styles.titles.caption.root}>{title}</h3>

                <div className="flex items-end gap-4">
                    <p className={styles.common.value}>{value}</p>
                    <MetricChangeIndicator trend={trend}>{change}</MetricChangeIndicator>
                </div>
            </div>

            {menu && <MetricCardMenu>{menu}</MetricCardMenu>}
        </div>

        {footer && <MetricCardFooter type={footerType}>{footer}</MetricCardFooter>}
    </div>
);

/**
 * A metric card whose featured icon sits inline with the title, above a value
 * and a captioned change.
 */
export const MetricIcon02 = ({
    title,
    value,
    change,
    trend,
    changeDescription,
    icon = Zap,
    iconColor = "brand",
    menu,
    footer,
    footerType,
    className,
}: MetricCardBaseProps & MetricCardChangeDescriptionProps & MetricCardIconProps) => (
    <div className={cx(styles.common.root, className)}>
        <div className={cx(styles.common.content, "gap-4 md:gap-5")}>
            <div className="flex items-center gap-3">
                <FeaturedIcon size="lg" theme="light" color={iconColor} icon={icon} />
                <h3 className={styles.titles.heading.root}>{title}</h3>
            </div>

            <div className="flex flex-col gap-3">
                <p className={styles.common.value}>{value}</p>

                <div className="flex gap-2">
                    <MetricChangeIndicator type="simple" icon="arrow" trend={trend}>
                        {change}
                    </MetricChangeIndicator>
                    {changeDescription && <span className={styles.common.description}>{changeDescription}</span>}
                </div>
            </div>

            {menu && <MetricCardMenu>{menu}</MetricCardMenu>}
        </div>

        {footer && <MetricCardFooter type={footerType}>{footer}</MetricCardFooter>}
    </div>
);

/**
 * A metric card led by a square "modern" featured icon, with the change wrapping
 * onto its own line on narrow cards.
 */
export const MetricIcon03 = ({
    title,
    value,
    change,
    trend,
    changeDescription,
    icon = TrendUp01,
    iconColor = "gray",
    menu,
    footer,
    footerType,
    className,
}: MetricCardBaseProps & MetricCardChangeDescriptionProps & MetricCardIconProps) => (
    <div className={cx(styles.common.root, className)}>
        <div className={cx(styles.common.content, "gap-4 md:gap-5")}>
            <FeaturedIcon size="lg" theme="modern" color={iconColor} icon={icon} />

            <div className="flex flex-col gap-2">
                <h3 className={styles.titles.strong.root}>{title}</h3>

                <div className="flex flex-wrap items-center gap-3 lg:gap-4">
                    <p className={styles.common.value}>{value}</p>

                    <div className="flex gap-2">
                        <MetricChangeIndicator type="simple" trend={trend}>
                            {change}
                        </MetricChangeIndicator>
                        {changeDescription && <span className={styles.common.description}>{changeDescription}</span>}
                    </div>
                </div>
            </div>

            {menu && <MetricCardMenu>{menu}</MetricCardMenu>}
        </div>

        {footer && <MetricCardFooter type={footerType}>{footer}</MetricCardFooter>}
    </div>
);

/**
 * A wide metric card that puts a small featured icon beside the content on
 * tablet and up, and the change pill opposite the value.
 */
export const MetricIcon04 = ({
    title,
    value,
    change,
    trend,
    icon = TrendUp01,
    iconColor = "gray",
    menu,
    footer,
    footerType,
    className,
}: MetricCardBaseProps & MetricCardIconProps) => (
    <div className={cx(styles.common.root, "min-w-70", className)}>
        <div className={cx(styles.common.content, "gap-4 md:flex-row")}>
            <FeaturedIcon size="md" theme="modern" color={iconColor} icon={icon} />

            <div className="flex w-full flex-col gap-2">
                <h3 className={styles.titles.strong.root}>{title}</h3>

                <div className="flex w-full flex-wrap items-center justify-between gap-4">
                    <p className={styles.common.value}>{value}</p>
                    <MetricChangeIndicator trend={trend}>{change}</MetricChangeIndicator>
                </div>
            </div>

            {menu && <MetricCardMenu>{menu}</MetricCardMenu>}
        </div>

        {footer && <MetricCardFooter type={footerType}>{footer}</MetricCardFooter>}
    </div>
);

/** Props shared by the metric cards that plot a single-series sparkline. */
export interface MetricChartProps extends MetricCardBaseProps, MetricCardChangeDescriptionProps {
    /** Points plotted in the sparkline, left to right. */
    chartData: MetricChartDatum[];
}

export interface MetricChart01Props extends MetricChartProps {
    /** Index of the sparkline point to mark with a ring dot. Omit to draw no marker. */
    highlightIndex?: number;
}

/**
 * A metric card with the value and change on the left and a small sparkline on
 * the right, optionally marking one point with a ring dot.
 */
export const MetricChart01 = ({
    title,
    value,
    change,
    trend,
    changeDescription,
    chartData,
    highlightIndex,
    menu,
    footer,
    footerType,
    className,
}: MetricChart01Props) => (
    <div className={cx(styles.common.root, className)}>
        <div className={cx(styles.common.content, "gap-5")}>
            <h3 className={styles.titles.heading.root}>{title}</h3>

            <div className="flex items-end justify-between gap-4">
                <div className="flex flex-col gap-3">
                    <p className={styles.common.value}>{value}</p>

                    <div className="flex gap-2">
                        <MetricChangeIndicator type="simple" icon="arrow" trend={trend}>
                            {change}
                        </MetricChangeIndicator>
                        {changeDescription && <span className={styles.common.description}>{changeDescription}</span>}
                    </div>
                </div>

                <MetricSparkline data={chartData} trend={trend} highlightIndex={highlightIndex} className="w-28 shrink-0" />
            </div>

            {menu && <MetricCardMenu>{menu}</MetricCardMenu>}
        </div>

        {footer && <MetricCardFooter type={footerType}>{footer}</MetricCardFooter>}
    </div>
);

export interface MetricChart02Props extends MetricCardBaseProps, MetricCardIconProps {
    /** Points plotted in the comparison sparkline, left to right. */
    chartData: MetricComparisonChartDatum[];
}

/**
 * A metric card with a featured icon in the header and a two-series comparison
 * sparkline beside an oversized value.
 */
export const MetricChart02 = ({
    title,
    value,
    change,
    trend,
    chartData,
    icon = Eye,
    iconColor = "gray",
    menu,
    footer,
    footerType,
    className,
}: MetricChart02Props) => (
    <div className={cx(styles.common.root, className)}>
        <div className={cx(styles.common.content, "gap-4 md:gap-5")}>
            <div className="flex items-center gap-3">
                <FeaturedIcon size="lg" theme="modern" color={iconColor} icon={icon} />
                <h3 className={styles.titles.heading.root}>{title}</h3>
            </div>

            <div className="flex items-end justify-between gap-4">
                <div className="flex items-start gap-2">
                    <p className={cx(styles.common.value, "lg:text-display-md")}>{value}</p>
                    <MetricChangeIndicator type="simple" trend={trend}>
                        {change}
                    </MetricChangeIndicator>
                </div>

                <MetricComparisonSparkline data={chartData} trend={trend} className="w-32 shrink-0" />
            </div>

            {menu && <MetricCardMenu>{menu}</MetricCardMenu>}
        </div>

        {footer && <MetricCardFooter type={footerType}>{footer}</MetricCardFooter>}
    </div>
);

/**
 * A metric card with a full-width sparkline stretched underneath the value.
 */
export const MetricChart03 = ({ title, value, change, trend, changeDescription, chartData, menu, footer, footerType, className }: MetricChartProps) => (
    <div className={cx(styles.common.root, className)}>
        <div className={cx(styles.common.content, "gap-4 md:gap-5")}>
            <div className="flex flex-col gap-2">
                <h3 className={styles.titles.caption.root}>{title}</h3>

                <div className="flex items-center gap-4">
                    <p className={styles.common.value}>{value}</p>

                    <div className="flex gap-2">
                        <MetricChangeIndicator type="simple" trend={trend}>
                            {change}
                        </MetricChangeIndicator>
                        {changeDescription && <span className={styles.common.description}>{changeDescription}</span>}
                    </div>
                </div>
            </div>

            <MetricSparkline data={chartData} trend={trend} className="h-18" />

            {menu && <MetricCardMenu>{menu}</MetricCardMenu>}
        </div>

        {footer && <MetricCardFooter type={footerType}>{footer}</MetricCardFooter>}
    </div>
);

/**
 * A framed metric card: the title sits on a tinted plate behind a raised white
 * panel holding the value, the change and a full-width sparkline.
 */
export const MetricChart04 = ({
    title,
    value,
    change,
    trend,
    changeDescription,
    chartData,
    menu,
    footer,
    footerType = "actions-plain",
    className,
}: MetricChartProps) => (
    <div className={cx("bg-secondary ring-secondary flex flex-col overflow-hidden rounded-xl shadow-xs ring-1 ring-inset", className)}>
        <div className="mb-0.5 px-4 pt-3 pb-2 md:px-5">
            <h3 className="text-primary text-sm font-semibold">{title}</h3>
        </div>

        <div className="bg-primary ring-secondary relative flex flex-col gap-4 rounded-xl px-4 py-5 shadow-xs ring-1 ring-inset md:gap-5 md:px-5">
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                    <p className="text-display-sm text-primary font-semibold">{value}</p>

                    <div className="flex gap-2">
                        <MetricChangeIndicator type="simple" trend={trend}>
                            {change}
                        </MetricChangeIndicator>
                        {changeDescription && <span className={styles.common.description}>{changeDescription}</span>}
                    </div>
                </div>
            </div>

            <MetricSparkline data={chartData} trend={trend} />

            {menu && <MetricCardMenu>{menu}</MetricCardMenu>}
        </div>

        {/* Sits on the tinted plate rather than the raised panel, so it needs no divider. */}
        {footer && <MetricCardFooter type={footerType}>{footer}</MetricCardFooter>}
    </div>
);
