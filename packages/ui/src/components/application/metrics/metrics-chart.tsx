"use client";

import { useId } from "react";
import { Area, AreaChart, ResponsiveContainer } from "recharts";
import { cx, sortCx } from "../../../utils/cx";

/** Direction of a metric's change. Drives arrow direction and chart color. */
export type MetricTrend = "positive" | "negative";

/** A single point of a metric sparkline. */
export interface MetricChartDatum {
    /** The plotted value. */
    value: number;
}

/** A single point of a metric comparison sparkline. */
export interface MetricComparisonChartDatum extends MetricChartDatum {
    /** The value of the comparison series, drawn underneath the primary one. */
    comparisonValue: number;
}

export const styles = sortCx({
    trends: {
        positive: { root: "text-fg-success-secondary" },
        negative: { root: "text-fg-error-secondary" },
    },
});

/** Zero margin so the sparkline bleeds to the edges of its box. */
const chartMargin = { top: 0, right: 0, bottom: 0, left: 0 };

/**
 * The ring marker drawn on a highlighted sparkline point. Rendered inside the
 * chart's SVG, so it has to be SVG all the way down.
 */
const HighlightDot = ({ x = 0, y = 0 }: { x?: number; y?: number }) => (
    <svg x={x - 10} y={y - 10} width={20} height={20} viewBox="0 0 20 20" fill="none">
        <rect x="1.75" y="1.625" width="17.25" height="17.25" rx="8.625" strokeWidth="2" strokeOpacity="0.2" className="stroke-current" />
        <rect x="6.125" y="6" width="8.5" height="8.5" rx="4.25" strokeWidth="2" className="fill-bg-primary stroke-current" />
    </svg>
);

interface MetricSparklineProps {
    /** The points to plot, left to right. */
    data: MetricChartDatum[];
    /** Direction of the series. Drives the line and gradient color. */
    trend?: MetricTrend;
    /** Index of the point to mark with a ring dot. Omit to draw no marker. */
    highlightIndex?: number;
    /** Sizes the chart — it fills its box, so give it a height and a width. */
    className?: string;
}

/**
 * A compact single-series area chart used inside metric cards: a 2px line with a
 * gradient fill fading to transparent, and an optional ring marker on one point.
 */
export const MetricSparkline = ({ data, trend = "positive", highlightIndex, className }: MetricSparklineProps) => {
    const id = useId();
    const gradientId = `metric-sparkline-gradient-${id}`;

    return (
        <div className={cx("h-14 w-full", styles.trends[trend].root, className)}>
            <ResponsiveContainer initialDimension={{ width: 1, height: 1 }}>
                <AreaChart data={data} margin={chartMargin}>
                    <defs>
                        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="currentColor" stopOpacity="1" />
                            <stop offset="95%" stopColor="currentColor" stopOpacity="0" />
                        </linearGradient>
                    </defs>

                    <Area
                        isAnimationActive={false}
                        type="monotone"
                        dataKey="value"
                        stroke="currentColor"
                        strokeWidth={2}
                        fill={`url(#${gradientId})`}
                        fillOpacity={0.2}
                        activeDot={false}
                        dot={(props) => (props.index === highlightIndex ? <HighlightDot key={props.index} x={props.cx} y={props.cy} /> : null)}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};

interface MetricComparisonSparklineProps {
    /** The points to plot, left to right. Each carries the current and the compared value. */
    data: MetricComparisonChartDatum[];
    /** Direction of the series. Drives the fill color of both areas. */
    trend?: MetricTrend;
    /** Sizes the chart — it fills its box, so give it a height and a width. */
    className?: string;
}

/**
 * A compact two-series area chart used inside metric cards: two translucent,
 * line-less areas overlaid so the current period reads against the previous one.
 */
export const MetricComparisonSparkline = ({ data, trend = "positive", className }: MetricComparisonSparklineProps) => {
    const id = useId();
    const gradientId = `metric-comparison-gradient-${id}`;

    return (
        <div className={cx("h-14 w-full", styles.trends[trend].root, className)}>
            <ResponsiveContainer initialDimension={{ width: 1, height: 1 }}>
                <AreaChart data={data} margin={chartMargin}>
                    <defs>
                        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="currentColor" stopOpacity="1" />
                            <stop offset="95%" stopColor="currentColor" stopOpacity="0" />
                        </linearGradient>
                    </defs>

                    <Area
                        isAnimationActive={false}
                        type="monotone"
                        dataKey="comparisonValue"
                        stroke="none"
                        strokeWidth={0}
                        fill="currentColor"
                        fillOpacity={0.2}
                        activeDot={false}
                        dot={false}
                    />
                    <Area
                        isAnimationActive={false}
                        type="monotone"
                        dataKey="value"
                        stroke="none"
                        strokeWidth={0}
                        fill={`url(#${gradientId})`}
                        fillOpacity={0.2}
                        activeDot={false}
                        dot={false}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};
