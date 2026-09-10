"use client";

import type { FC, ReactNode } from "react";
import { ArrowDown, ArrowDownRight, ArrowUp, ArrowUpRight, TrendDown01, TrendUp01 } from "@properui/icons";
import { BadgeWithIcon } from "@/components/base/badges/badges";
import { cx, sortCx } from "@/utils/cx";
import type { MetricTrend } from "./metrics-chart";

/** Which arrow is drawn next to the change value. */
export type MetricChangeIcon = "arrow" | "arrow-diagonal" | "trend";

const changeIcons: Record<MetricChangeIcon, Record<MetricTrend, FC<{ className?: string }>>> = {
    arrow: { positive: ArrowUp, negative: ArrowDown },
    "arrow-diagonal": { positive: ArrowUpRight, negative: ArrowDownRight },
    trend: { positive: TrendUp01, negative: TrendDown01 },
};

export const styles = sortCx({
    common: {
        // Bare inline change: a colored arrow followed by the colored value.
        root: "flex items-center",
        value: "text-sm font-medium",
        icon: "size-4 shrink-0 stroke-[3px]",
    },
    // The arrows are much smaller glyphs than the trend line, so they sit tighter.
    icons: {
        arrow: { root: "gap-0.5" },
        "arrow-diagonal": { root: "gap-0.5" },
        trend: { root: "gap-1" },
    },
    trends: {
        // `badgeIcon` re-tints the badge's own arrow (its only element child) from the
        // utility scale to the semantic one, which is the pair that tracks dark mode.
        positive: { icon: "text-fg-success-secondary", value: "text-success-primary", badgeIcon: "*:text-fg-success-secondary" },
        negative: { icon: "text-fg-error-secondary", value: "text-error-primary", badgeIcon: "*:text-fg-error-secondary" },
    },
});

const badgeColors: Record<MetricTrend, "success" | "error"> = { positive: "success", negative: "error" };

interface MetricChangeIndicatorProps {
    /** The formatted change, e.g. `"100%"`. */
    children: ReactNode;
    /** Direction of the change. Drives the arrow direction and its color. */
    trend?: MetricTrend;
    /** `modern` renders a bordered pill, `simple` renders bare colored text. */
    type?: "modern" | "simple";
    /** Which arrow to draw. Defaults to `arrow-diagonal` for `modern` and `trend` for `simple`. */
    icon?: MetricChangeIcon;
    className?: string;
}

/**
 * The "+100%" indicator shown next to a metric value, either as a bordered pill
 * (`modern`) or as bare colored text (`simple`).
 */
export const MetricChangeIndicator = ({ children, trend = "positive", type = "modern", icon, className }: MetricChangeIndicatorProps) => {
    const iconName = icon ?? (type === "modern" ? "arrow-diagonal" : "trend");
    const Icon = changeIcons[iconName][trend];

    if (type === "modern") {
        return (
            <BadgeWithIcon type="modern" size="md" color={badgeColors[trend]} iconLeading={Icon} className={cx(styles.trends[trend].badgeIcon, className)}>
                {children}
            </BadgeWithIcon>
        );
    }

    return (
        <div className={cx(styles.common.root, styles.icons[iconName].root, className)}>
            <Icon className={cx(styles.common.icon, styles.trends[trend].icon)} />
            <span className={cx(styles.common.value, styles.trends[trend].value)}>{children}</span>
        </div>
    );
};

/** Layout presets for the footer row of a metric card. */
export const footerStyles = sortCx({
    // Roomy, for a bare text link that has no hit-area padding of its own.
    link: { root: "border-t border-secondary p-4 md:px-5" },
    // Tighter, to compensate for the padding buttons bring with them.
    actions: { root: "border-t border-secondary p-3 pe-4 md:p-4 md:pe-5" },
    // Same as `actions` but without the divider, for footers that sit on a
    // tinted plate behind a raised panel and are already visually separated.
    "actions-plain": { root: "py-3 ps-3 pe-4 md:ps-4 md:pe-5" },
});

/** Layout preset for the footer row of a metric card. */
export type MetricFooterType = keyof typeof footerStyles;

interface MetricCardFooterProps {
    children: ReactNode;
    /** Layout preset — `link` for a bare text link, `actions` for buttons. */
    type?: MetricFooterType;
    className?: string;
}

export const MetricCardFooter = ({ children, type = "link", className }: MetricCardFooterProps) => (
    <div className={cx("flex items-center justify-end", footerStyles[type].root, className)}>{children}</div>
);

/** Props every metric card in this group accepts. */
export interface MetricCardBaseProps {
    /** Heading shown above the metric value. */
    title: string;
    /** The formatted metric value, e.g. `"2,000"`. */
    value: string;
    /** The formatted change shown next to the value, e.g. `"100%"`. */
    change: string;
    /** Direction of the change. Drives the arrow direction and the accent color. */
    trend?: MetricTrend;
    /** Content for the top-right corner — typically a `Dropdown.Root` wrapping a `Dropdown.DotsButton`. */
    menu?: ReactNode;
    /** Actions rendered in a divided footer row. Omit for a card with no footer. */
    footer?: ReactNode;
    /** Padding preset for the footer row. */
    footerType?: MetricFooterType;
    className?: string;
}

/** Props for the cards that caption their change, e.g. "vs last month". */
export interface MetricCardChangeDescriptionProps {
    /** Caption shown next to the change, e.g. `"vs last month"`. */
    changeDescription?: string;
}

/** Props for the cards that lead with a featured icon. */
export interface MetricCardIconProps {
    /** Icon rendered in the card's featured icon. */
    icon?: FC<{ className?: string }>;
    /** Color of the featured icon. */
    iconColor?: "brand" | "gray" | "success" | "warning" | "error";
}

interface MetricCardMenuProps {
    children: ReactNode;
}

/** Pins the card's overflow menu to the top-right (top-left in RTL) corner. */
export const MetricCardMenu = ({ children }: MetricCardMenuProps) => <div className="absolute end-4 top-4 md:end-5 md:top-5">{children}</div>;
