"use client";

import { Legend, PolarAngleAxis, RadialBar, RadialBarChart, ResponsiveContainer, Tooltip } from "recharts";
import { cx } from "../../../utils/cx";
import { ChartLegendContent, ChartTooltipContent } from "./charts-base";

const radialData = [
    {
        name: "Series 3",
        value: 660,
        className: "text-utility-brand-400",
    },
    {
        name: "Series 2",
        value: 774,
        className: "text-utility-brand-600",
    },
    {
        name: "Series 1",
        value: 866,
        className: "text-utility-brand-700",
    },
];

interface ActivityGaugeProps {
    title?: string;
    subtitle?: string;
    data?: {
        name: string;
        value: number;
        className?: string;
    }[];
}

export const ActivityGaugeXs = ({ title = "1,000", subtitle = "Active users", data = radialData }: ActivityGaugeProps) => {
    return (
        <ResponsiveContainer initialDimension={{ width: 1, height: 1 }} height={220}>
            <RadialBarChart
                data={data}
                accessibilityLayer
                innerRadius={52}
                outerRadius={86}
                // This is needed to start the chart at the top and go clockwise
                startAngle={90}
                endAngle={360 + 90}
                className="text-tertiary [&_.recharts-polar-grid]:text-utility-neutral-100 font-medium [&_.recharts-text]:text-sm"
                margin={{
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0,
                }}
            >
                <PolarAngleAxis tick={false} domain={[0, 1000]} type="number" reversed />

                <Legend verticalAlign="bottom" align="center" layout="horizontal" content={<ChartLegendContent />} />

                <Tooltip content={<ChartTooltipContent isRadialChart />} />

                <RadialBar
                    isAnimationActive={false}
                    dataKey="value"
                    cornerRadius={99}
                    fill="currentColor"
                    background={{
                        className: "fill-utility-neutral-100",
                    }}
                />

                {(title || subtitle) && (
                    <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle">
                        {subtitle && (
                            <tspan x="50%" dy={title ? "-1.175em" : "1%"} className={cx("text-tertiary fill-current", "text-xs font-medium")}>
                                {subtitle}
                            </tspan>
                        )}
                        {title && (
                            <tspan x="50%" dy={subtitle ? "1.25em" : "1%"} className={cx("text-primary fill-current", "text-xl font-semibold")}>
                                {title}
                            </tspan>
                        )}
                    </text>
                )}
            </RadialBarChart>
        </ResponsiveContainer>
    );
};

export const ActivityGaugeSm = ({ title = "1,000", subtitle = "Active users", data = radialData }: ActivityGaugeProps) => {
    return (
        <ResponsiveContainer initialDimension={{ width: 1, height: 1 }} height={268}>
            <RadialBarChart
                data={data}
                accessibilityLayer
                innerRadius={61}
                outerRadius={110}
                // This is needed to start the chart at the top and go clockwise
                startAngle={90}
                endAngle={360 + 90}
                className="text-tertiary [&_.recharts-polar-grid]:text-utility-neutral-100 font-medium [&_.recharts-text]:text-sm"
                margin={{
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0,
                }}
            >
                <PolarAngleAxis tick={false} domain={[0, 1000]} type="number" reversed />

                <Legend verticalAlign="bottom" align="center" layout="horizontal" content={<ChartLegendContent />} />

                <Tooltip content={<ChartTooltipContent isRadialChart />} />

                <RadialBar
                    isAnimationActive={false}
                    dataKey="value"
                    cornerRadius={99}
                    fill="currentColor"
                    background={{
                        className: "fill-utility-neutral-100",
                    }}
                />

                {(title || subtitle) && (
                    <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle">
                        {subtitle && (
                            <tspan x="50%" dy={title ? "-1.35em" : "1%"} className={cx("text-tertiary fill-current", "text-xs font-medium")}>
                                {subtitle}
                            </tspan>
                        )}
                        {title && (
                            <tspan x="50%" dy={subtitle ? "1.15em" : "1%"} className={cx("text-primary fill-current", "text-display-xs font-semibold")}>
                                {title}
                            </tspan>
                        )}
                    </text>
                )}
            </RadialBarChart>
        </ResponsiveContainer>
    );
};

export const ActivityGaugeMd = ({ title = "1,000", subtitle = "Active users", data = radialData }: ActivityGaugeProps) => {
    return (
        <ResponsiveContainer initialDimension={{ width: 1, height: 1 }} height={312}>
            <RadialBarChart
                data={data}
                accessibilityLayer
                innerRadius={74}
                outerRadius={132}
                // This is needed to start the chart at the top and go clockwise
                startAngle={90}
                endAngle={360 + 90}
                className="text-tertiary [&_.recharts-polar-grid]:text-utility-neutral-100 font-medium [&_.recharts-text]:text-sm"
                margin={{
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0,
                }}
            >
                <PolarAngleAxis tick={false} domain={[0, 1000]} type="number" reversed />

                <Legend verticalAlign="bottom" align="center" layout="horizontal" content={<ChartLegendContent />} />

                <Tooltip content={<ChartTooltipContent isRadialChart />} />

                <RadialBar
                    isAnimationActive={false}
                    dataKey="value"
                    cornerRadius={99}
                    fill="currentColor"
                    background={{
                        className: "fill-utility-neutral-100",
                    }}
                />

                {(title || subtitle) && (
                    <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle">
                        {subtitle && (
                            <tspan x="50%" dy={title ? "-1.45em" : "1%"} className={cx("text-tertiary fill-current", "text-sm font-medium")}>
                                {subtitle}
                            </tspan>
                        )}
                        {title && (
                            <tspan x="50%" dy={subtitle ? "1.075em" : "1%"} className={cx("text-primary fill-current", "text-display-sm font-semibold")}>
                                {title}
                            </tspan>
                        )}
                    </text>
                )}
            </RadialBarChart>
        </ResponsiveContainer>
    );
};

export const ActivityGaugeLg = ({ title = "1,000", subtitle = "Active users", data = radialData }: ActivityGaugeProps) => {
    return (
        <ResponsiveContainer initialDimension={{ width: 1, height: 1 }} height={356}>
            <RadialBarChart
                data={data}
                accessibilityLayer
                innerRadius={84}
                outerRadius={154}
                // This is needed to start the chart at the top and go clockwise
                startAngle={90}
                endAngle={360 + 90}
                className="text-tertiary [&_.recharts-polar-grid]:text-utility-neutral-100 font-medium [&_.recharts-text]:text-sm"
                margin={{
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0,
                }}
            >
                <PolarAngleAxis tick={false} domain={[0, 1000]} type="number" reversed />

                <Legend verticalAlign="bottom" align="center" layout="horizontal" content={<ChartLegendContent />} />

                <Tooltip content={<ChartTooltipContent isRadialChart />} />

                <RadialBar
                    isAnimationActive={false}
                    dataKey="value"
                    cornerRadius={99}
                    fill="currentColor"
                    background={{
                        className: "fill-utility-neutral-100",
                    }}
                />

                {(title || subtitle) && (
                    <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle">
                        {subtitle && (
                            <tspan x="50%" dy={title ? "-1.4em" : "1%"} className={cx("text-tertiary fill-current", "text-sm font-medium")}>
                                {subtitle}
                            </tspan>
                        )}
                        {title && (
                            <tspan x="50%" dy={subtitle ? "1em" : "1%"} className={cx("text-primary fill-current", "text-display-md font-semibold")}>
                                {title}
                            </tspan>
                        )}
                    </text>
                )}
            </RadialBarChart>
        </ResponsiveContainer>
    );
};

// The hero preview at the top of the docs page reuses the xs-sized gauge.
export const ActivityGaugeExample = ActivityGaugeXs;
