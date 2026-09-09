"use client";

// Chart recipes shared by the `dashboards-02` variants, built on the library's `charts-base`
// helpers so tooltips, legends and grid colors stay consistent with the standalone chart examples.
// TODO(orchestrator): candidate for components/internal — several page examples plot the same shapes.
import {
    Area,
    AreaChart,
    Bar,
    CartesianGrid,
    Cell,
    Label,
    Legend,
    Pie,
    PolarAngleAxis,
    PolarGrid,
    PolarRadiusAxis,
    Radar,
    RadialBar,
    RadialBarChart,
    BarChart as RechartsBarChart,
    PieChart as RechartsPieChart,
    RadarChart as RechartsRadarChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import { ChartLegendContent, ChartTooltipContent } from "@/components/application/charts/charts-base";
import { cx } from "@/utils/cx";

/** Brand-scale colors used, in order, by the multi-series charts on this page. */
const seriesColors = ["text-utility-brand-600", "text-utility-brand-400", "text-utility-neutral-400"] as const;

const axisProps = { fill: "currentColor", axisLine: false, tickLine: false, interval: "preserveStartEnd" } as const;

interface TrendChartProps<T extends object> {
    /** Points to plot. Each datum must carry the `dataKey` of every series named in `series`. */
    data: T[];
    /** Key on each datum holding the x-axis label. */
    xKey: string;
    /** The series to draw, in stacking order. */
    series: { key: string; name: string; dashed?: boolean }[];
    /** Fills the first series with a fading gradient. */
    gradient?: boolean;
    /** Renders the vertical grid lines the reference draws behind the balance charts. */
    verticalGrid?: boolean;
    /** Draws the numeric y-axis with an optional label. */
    yAxisLabel?: string;
    /** Height utility for the chart box. @default "h-60" */
    className?: string;
}

/**
 * The smoothed multi-series area chart used by the revenue, balance and site-traffic panels.
 */
export const TrendChart = <T extends object>({ data, xKey, series, gradient, verticalGrid, yAxisLabel, className = "h-60" }: TrendChartProps<T>) => (
    <div className={cx("w-full", className)}>
        <ResponsiveContainer initialDimension={{ width: 1, height: 1 }} className="size-full">
            <AreaChart data={data} className="text-tertiary [&_.recharts-text]:text-xs" margin={{ top: 8, right: 0, bottom: 4, left: yAxisLabel ? 4 : 0 }}>
                <defs>
                    <linearGradient id="dashboards-02-trend-gradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="currentColor" className="text-utility-brand-700" stopOpacity="0.5" />
                        <stop offset="95%" stopColor="currentColor" className="text-utility-brand-700" stopOpacity="0" />
                    </linearGradient>
                </defs>

                <CartesianGrid vertical={verticalGrid} stroke="currentColor" className="text-utility-neutral-100" />

                <XAxis {...axisProps} dataKey={xKey} padding={{ left: 10, right: 10 }} />

                {yAxisLabel ? (
                    <YAxis {...axisProps} tickFormatter={(value) => Number(value).toLocaleString()}>
                        <Label
                            value={yAxisLabel}
                            fill="currentColor"
                            className="text-xs! font-medium"
                            style={{ textAnchor: "middle" }}
                            angle={-90}
                            position="insideLeft"
                        />
                    </YAxis>
                ) : (
                    <YAxis hide />
                )}

                <Tooltip
                    content={<ChartTooltipContent />}
                    formatter={(value) => Number(value).toLocaleString()}
                    cursor={{ className: "stroke-utility-brand-600 stroke-2" }}
                />

                {series.map((item, index) => (
                    <Area
                        key={item.key}
                        isAnimationActive={false}
                        className={seriesColors[index % seriesColors.length]}
                        dataKey={item.key}
                        name={item.name}
                        type="monotone"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeDasharray={item.dashed ? "2 4" : undefined}
                        fill={gradient && index === 0 ? "url(#dashboards-02-trend-gradient)" : "none"}
                        activeDot={{ className: "fill-bg-primary stroke-utility-brand-600 stroke-2" }}
                    />
                ))}
            </AreaChart>
        </ResponsiveContainer>
    </div>
);

interface StackedBarChartProps<T extends object> {
    /** Points to plot, one bar stack per datum. */
    data: T[];
    /** Key on each datum holding the x-axis label. */
    xKey: string;
    /** The series to stack, bottom to top. */
    series: { key: string; name: string }[];
    /** Draws the numeric y-axis with this label. */
    yAxisLabel?: string;
    /** Places a legend above the plot. */
    legend?: boolean;
    /** Height utility for the chart box. @default "h-60" */
    className?: string;
}

/** The stacked bar chart used by the acquisition, store-traffic and spending panels. */
export const StackedBarChart = <T extends object>({ data, xKey, series, yAxisLabel, legend, className = "h-60" }: StackedBarChartProps<T>) => (
    <div className={cx("w-full", className)}>
        <ResponsiveContainer initialDimension={{ width: 1, height: 1 }} className="size-full">
            <RechartsBarChart
                data={data}
                className="text-tertiary [&_.recharts-text]:text-xs"
                margin={{ top: legend ? 24 : 8, right: 0, bottom: 4, left: yAxisLabel ? 4 : 0 }}
            >
                <CartesianGrid vertical={false} stroke="currentColor" className="text-utility-neutral-100" />

                {legend && <Legend verticalAlign="top" align="right" layout="horizontal" content={<ChartLegendContent className="-translate-y-2" />} />}

                <XAxis {...axisProps} dataKey={xKey} tickMargin={11} />

                {yAxisLabel ? (
                    <YAxis {...axisProps} tickFormatter={(value) => Number(value).toLocaleString()}>
                        <Label
                            value={yAxisLabel}
                            fill="currentColor"
                            className="text-xs! font-medium"
                            style={{ textAnchor: "middle" }}
                            angle={-90}
                            position="insideLeft"
                        />
                    </YAxis>
                ) : (
                    <YAxis hide />
                )}

                <Tooltip
                    content={<ChartTooltipContent />}
                    formatter={(value) => Number(value).toLocaleString()}
                    cursor={{ className: "fill-utility-neutral-200/20" }}
                />

                {series.map((item, index) => (
                    <Bar
                        key={item.key}
                        isAnimationActive={false}
                        className={seriesColors[index % seriesColors.length]}
                        dataKey={item.key}
                        name={item.name}
                        stackId="a"
                        fill="currentColor"
                        maxBarSize={32}
                    />
                ))}
            </RechartsBarChart>
        </ResponsiveContainer>
    </div>
);

export interface SliceDatum {
    name: string;
    value: number;
    className?: string;
}

interface DonutChartProps {
    data: SliceDatum[];
    /** Inner radius in pixels. Pass `0` for a solid pie. @default 60 */
    innerRadius?: number;
    /** Places the legend to the right of the wheel. */
    legend?: boolean;
    /** Height utility for the chart box. @default "h-60" */
    className?: string;
}

/** The pie/donut used by the "sessions by country" and "how do you acquire users" panels. */
export const DonutChart = ({ data, innerRadius = 60, legend, className = "h-60" }: DonutChartProps) => (
    <div className={cx("w-full", className)}>
        <ResponsiveContainer initialDimension={{ width: 1, height: 1 }} className="size-full">
            <RechartsPieChart margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                {legend && <Legend verticalAlign="middle" align="right" layout="vertical" content={<ChartLegendContent />} />}
                <Tooltip content={<ChartTooltipContent isPieChart />} />

                <Pie
                    isAnimationActive={false}
                    startAngle={-270}
                    endAngle={-630}
                    stroke="none"
                    data={data}
                    dataKey="value"
                    nameKey="name"
                    fill="currentColor"
                    innerRadius={innerRadius}
                    outerRadius="95%"
                >
                    {data.map((slice) => (
                        <Cell key={slice.name} className={slice.className} />
                    ))}
                </Pie>
            </RechartsPieChart>
        </ResponsiveContainer>
    </div>
);

interface GaugeChartProps {
    data: SliceDatum[];
    /** Big number drawn in the middle of the ring. */
    title?: string;
    /** Caption drawn above the title. */
    subtitle?: string;
    /** Upper bound of the gauge. @default 1000 */
    max?: number;
    /** Height utility for the chart box. @default "h-60" */
    className?: string;
}

/** The concentric radial gauge used by the "active now" and "vendors monitored" cards. */
export const GaugeChart = ({ data, title, subtitle, max = 1000, className = "h-60" }: GaugeChartProps) => (
    <div className={cx("w-full", className)}>
        <ResponsiveContainer initialDimension={{ width: 1, height: 1 }} className="size-full">
            <RadialBarChart
                data={data}
                innerRadius="55%"
                outerRadius="95%"
                startAngle={90}
                endAngle={450}
                className="text-tertiary [&_.recharts-polar-grid]:text-utility-neutral-100 font-medium [&_.recharts-text]:text-sm"
                margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
            >
                <PolarAngleAxis tick={false} domain={[0, max]} type="number" reversed />
                <Tooltip content={<ChartTooltipContent isRadialChart />} />

                <RadialBar
                    isAnimationActive={false}
                    dataKey="value"
                    cornerRadius={99}
                    fill="currentColor"
                    background={{ className: "fill-utility-neutral-100" }}
                >
                    {data.map((slice) => (
                        <Cell key={slice.name} className={slice.className} />
                    ))}
                </RadialBar>

                {(title || subtitle) && (
                    <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle">
                        {subtitle && (
                            <tspan x="50%" dy={title ? "-1.175em" : "1%"} className="text-tertiary fill-current text-xs font-medium">
                                {subtitle}
                            </tspan>
                        )}
                        {title && (
                            <tspan x="50%" dy={subtitle ? "1.25em" : "1%"} className="text-primary fill-current text-xl font-semibold">
                                {title}
                            </tspan>
                        )}
                    </text>
                )}
            </RadialBarChart>
        </ResponsiveContainer>
    </div>
);

interface RadarChartProps {
    data: { subject: string; A: number; B: number; C: number }[];
    /** Height utility for the chart box. @default "h-80" */
    className?: string;
}

const radarColors: Record<string, string> = {
    A: "text-utility-brand-600",
    B: "text-utility-pink-500",
    C: "text-utility-sky-500",
};

/** The tri-series radar used by the "traffic sources" and "vendor breakdown" panels. */
export const RadarChart = ({ data, className = "h-80" }: RadarChartProps) => (
    <div className={cx("w-full", className)}>
        <ResponsiveContainer initialDimension={{ width: 1, height: 1 }} className="size-full">
            <RechartsRadarChart
                cx="50%"
                cy="50%"
                outerRadius="70%"
                data={data}
                className="text-tertiary [&_.recharts-polar-grid]:text-utility-neutral-100 size-full font-medium [&_.recharts-text]:text-xs"
                margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
            >
                <PolarGrid stroke="currentColor" gridType="polygon" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: "currentColor" }} />
                <PolarRadiusAxis angle={90} domain={[0, 1000]} tick={{ fill: "currentColor" }} tickCount={6} axisLine={false} />
                <Tooltip content={<ChartTooltipContent />} />

                {(["A", "B", "C"] as const).map((key, index) => (
                    <Radar
                        key={key}
                        isAnimationActive={false}
                        className={radarColors[key]}
                        name={`Series ${index + 1}`}
                        dataKey={key}
                        stroke="currentColor"
                        fill="currentColor"
                        fillOpacity={0.2}
                    />
                ))}
            </RechartsRadarChart>
        </ResponsiveContainer>
    </div>
);
