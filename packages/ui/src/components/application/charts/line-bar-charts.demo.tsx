"use client";

import {
    Area,
    AreaChart,
    Bar,
    CartesianGrid,
    ComposedChart,
    Label,
    Legend,
    Line,
    BarChart as RechartsBarChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import { useBreakpoint } from "../../../hooks/use-breakpoint";
import { cx } from "../../../utils/cx";
import { ChartLegendContent, ChartTooltipContent, selectEvenlySpacedItems } from "./charts-base";

const lineData = [
    { date: new Date(2026, 0, 1), A: 600, B: 400, C: 100 },
    { date: new Date(2026, 1, 1), A: 620, B: 405, C: 160 },
    { date: new Date(2026, 2, 1), A: 630, B: 400, C: 170 },
    { date: new Date(2026, 3, 1), A: 650, B: 410, C: 190 },
    { date: new Date(2026, 4, 1), A: 600, B: 320, C: 200 },
    { date: new Date(2026, 5, 1), A: 650, B: 430, C: 230 },
    { date: new Date(2026, 6, 1), A: 620, B: 400, C: 200 },
    { date: new Date(2026, 7, 1), A: 750, B: 540, C: 300 },
    { date: new Date(2026, 8, 1), A: 780, B: 490, C: 390 },
    { date: new Date(2026, 9, 1), A: 750, B: 450, C: 300 },
    { date: new Date(2026, 10, 1), A: 780, B: 480, C: 340 },
    { date: new Date(2026, 11, 1), A: 820, B: 500, C: 450 },
];

const barData = [
    { month: new Date(2026, 0, 1), A: 300, B: 200, C: 350 },
    { month: new Date(2026, 1, 1), A: 320, B: 300, C: 300 },
    { month: new Date(2026, 2, 1), A: 300, B: 200, C: 240 },
    { month: new Date(2026, 3, 1), A: 240, B: 300, C: 280 },
    { month: new Date(2026, 4, 1), A: 320, B: 280, C: 100 },
    { month: new Date(2026, 5, 1), A: 330, B: 300, C: 130 },
    { month: new Date(2026, 6, 1), A: 300, B: 200, C: 100 },
    { month: new Date(2026, 7, 1), A: 350, B: 300, C: 200 },
    { month: new Date(2026, 8, 1), A: 300, B: 200, C: 100 },
    { month: new Date(2026, 9, 1), A: 200, B: 300, C: 280 },
    { month: new Date(2026, 10, 1), A: 240, B: 300, C: 300 },
    { month: new Date(2026, 11, 1), A: 200, B: 400, C: 350 },
];

// Weekly traffic data shared by the composed bar + line examples.
const weeklyTrafficData = [
    { A: 633, B: 190, date: "2026-01-01" },
    { A: 443, B: 228, date: "2026-01-08" },
    { A: 506, B: 225, date: "2026-01-15" },
    { A: 316, B: 227, date: "2026-01-22" },
    { A: 760, B: 209, date: "2026-01-29" },
    { A: 950, B: 220, date: "2026-02-05" },
    { A: 760, B: 224, date: "2026-02-12" },
    { A: 570, B: 279, date: "2026-02-19" },
    { A: 253, B: 296, date: "2026-02-26" },
    { A: 380, B: 263, date: "2026-03-05" },
    { A: 443, B: 333, date: "2026-03-12" },
    { A: 443, B: 306, date: "2026-03-19" },
    { A: 316, B: 315, date: "2026-03-26" },
    { A: 190, B: 325, date: "2026-04-02" },
    { A: 380, B: 367, date: "2026-04-09" },
    { A: 506, B: 372, date: "2026-04-16" },
    { A: 443, B: 374, date: "2026-04-23" },
    { A: 696, B: 278, date: "2026-04-30" },
    { A: 950, B: 258, date: "2026-05-07" },
    { A: 633, B: 357, date: "2026-05-14" },
    { A: 570, B: 372, date: "2026-05-21" },
    { A: 253, B: 404, date: "2026-05-28" },
    { A: 316, B: 314, date: "2026-06-04" },
    { A: 380, B: 359, date: "2026-06-11" },
    { A: 253, B: 400, date: "2026-06-18" },
    { A: 190, B: 381, date: "2026-06-25" },
    { A: 316, B: 427, date: "2026-07-02" },
    { A: 633, B: 371, date: "2026-07-09" },
    { A: 570, B: 382, date: "2026-07-16" },
    { A: 760, B: 383, date: "2026-07-23" },
    { A: 950, B: 361, date: "2026-07-30" },
    { A: 696, B: 405, date: "2026-08-06" },
    { A: 570, B: 400, date: "2026-08-13" },
    { A: 443, B: 391, date: "2026-08-20" },
    { A: 316, B: 425, date: "2026-08-27" },
    { A: 253, B: 406, date: "2026-09-03" },
    { A: 380, B: 472, date: "2026-09-10" },
    { A: 633, B: 477, date: "2026-09-17" },
    { A: 570, B: 465, date: "2026-09-24" },
    { A: 443, B: 488, date: "2026-10-01" },
    { A: 380, B: 501, date: "2026-10-08" },
    { A: 316, B: 615, date: "2026-10-15" },
    { A: 570, B: 612, date: "2026-10-22" },
    { A: 506, B: 673, date: "2026-10-29" },
    { A: 443, B: 630, date: "2026-11-05" },
    { A: 760, B: 630, date: "2026-11-12" },
    { A: 443, B: 597, date: "2026-11-19" },
    { A: 506, B: 572, date: "2026-11-26" },
    { A: 316, B: 636, date: "2026-12-03" },
    { A: 633, B: 664, date: "2026-12-10" },
    { A: 380, B: 742, date: "2026-12-17" },
    { A: 633, B: 808, date: "2026-12-24" },
];

// Custom label formatter that shows a 7 day week range for a given start date,
// e.g. "January 1-7, 2026" or "May 30 - Jun 5, 2026".
const formatWeekRangeLabel = (value: string | number | Date) => {
    const date = new Date(value);
    const endDate = new Date(date);
    endDate.setDate(date.getDate() + 6);

    if (date.getMonth() === endDate.getMonth()) {
        return `${date.toLocaleDateString(undefined, { month: "long" })} ${date.getDate()}-${endDate.getDate()}, ${endDate.getFullYear()}`;
    }

    return `${date.toLocaleDateString(undefined, { month: "short", day: "numeric" })} - ${endDate.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}`;
};

export const LineChart01 = () => {
    const isDesktop = useBreakpoint("lg");

    const colors: Record<string, string> = {
        A: "text-utility-brand-600",
        B: "text-utility-brand-400",
        C: "text-utility-brand-700",
    };

    return (
        <div className="flex h-60 flex-col gap-2">
            <ResponsiveContainer initialDimension={{ width: 1, height: 1 }} className="h-full">
                <AreaChart
                    data={lineData}
                    className="text-tertiary [&_.recharts-text]:text-xs"
                    margin={{
                        top: isDesktop ? 12 : 6,
                        bottom: isDesktop ? 16 : 0,
                    }}
                >
                    <defs>
                        <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="currentColor" className="text-utility-brand-700" stopOpacity="0.7" />
                            <stop offset="95%" stopColor="currentColor" className="text-utility-brand-700" stopOpacity="0" />
                        </linearGradient>
                    </defs>

                    <CartesianGrid vertical={false} stroke="currentColor" className="text-utility-neutral-100" />

                    <Legend
                        align="right"
                        verticalAlign="top"
                        layout={isDesktop ? "vertical" : "horizontal"}
                        content={<ChartLegendContent className="-translate-y-2" />}
                    />

                    <XAxis
                        fill="currentColor"
                        axisLine={false}
                        tickLine={false}
                        interval="preserveStartEnd"
                        dataKey="date"
                        tickFormatter={(value) => value.toLocaleDateString(undefined, { month: "short" })}
                        padding={{ left: 10, right: 10 }}
                    >
                        {isDesktop && (
                            <Label fill="currentColor" className="text-xs! font-medium max-lg:hidden" position="bottom">
                                Month
                            </Label>
                        )}
                    </XAxis>

                    <YAxis
                        fill="currentColor"
                        axisLine={false}
                        tickLine={false}
                        interval="preserveStartEnd"
                        tickFormatter={(value) => Number(value).toLocaleString()}
                    >
                        <Label
                            value="Active users"
                            fill="currentColor"
                            className="text-xs! font-medium"
                            style={{ textAnchor: "middle" }}
                            angle={-90}
                            position="insideLeft"
                        />
                    </YAxis>

                    <Tooltip
                        content={<ChartTooltipContent />}
                        formatter={(value) => Number(value).toLocaleString()}
                        labelFormatter={(value) => new Date(value as string | number | Date).toLocaleDateString(undefined, { month: "short", year: "numeric" })}
                        cursor={{
                            className: "stroke-utility-brand-600 stroke-2",
                        }}
                    />

                    <Area
                        isAnimationActive={false}
                        className={cx(colors["A"], "[&_.recharts-area-area]:translate-y-1.5 [&_.recharts-area-area]:[clip-path:inset(0_0_6px_0)]")}
                        dataKey="A"
                        name="Series 1"
                        type="monotone"
                        stroke="currentColor"
                        strokeWidth={2}
                        fill="url(#gradient)"
                        fillOpacity={0.1}
                        activeDot={{
                            className: "fill-bg-primary stroke-utility-brand-600 stroke-2",
                        }}
                    />

                    <Area
                        isAnimationActive={false}
                        className={cx(colors["B"], "[&_.recharts-area-area]:translate-y-1.5 [&_.recharts-area-area]:[clip-path:inset(0_0_6px_0)]")}
                        dataKey="B"
                        name="Series 2"
                        type="monotone"
                        stroke="currentColor"
                        strokeWidth={2}
                        fill="none"
                        activeDot={{
                            className: "fill-bg-primary stroke-utility-brand-600 stroke-2",
                        }}
                    />

                    <Area
                        isAnimationActive={false}
                        className={cx(colors["C"], "[&_.recharts-area-area]:translate-y-1.5 [&_.recharts-area-area]:[clip-path:inset(0_0_6px_0)]")}
                        dataKey="C"
                        name="Series 3"
                        type="monotone"
                        stroke="currentColor"
                        strokeWidth={2}
                        fill="none"
                        activeDot={{
                            className: "fill-bg-primary stroke-utility-brand-600 stroke-2",
                        }}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};

export const LineChart02 = () => {
    const isDesktop = useBreakpoint("lg");

    const colors: Record<string, string> = {
        A: "text-utility-brand-600",
        B: "text-utility-brand-400",
        C: "text-utility-brand-700",
    };

    return (
        <div className="flex h-60 flex-col gap-2">
            <ResponsiveContainer initialDimension={{ width: 1, height: 1 }} className="h-full">
                <AreaChart
                    data={lineData}
                    className="text-tertiary [&_.recharts-text]:text-xs"
                    margin={{
                        left: 5,
                        right: 5,
                        top: isDesktop ? 12 : 6,
                        bottom: isDesktop ? 16 : 0,
                    }}
                >
                    <defs>
                        <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="currentColor" className="text-utility-brand-700" stopOpacity="0.7" />
                            <stop offset="95%" stopColor="currentColor" className="text-utility-brand-700" stopOpacity="0" />
                        </linearGradient>
                    </defs>

                    <CartesianGrid vertical={false} stroke="currentColor" className="text-utility-neutral-100" />

                    <Legend
                        verticalAlign="top"
                        align="right"
                        layout={isDesktop ? "vertical" : "horizontal"}
                        content={<ChartLegendContent className="-translate-y-2" />}
                    />

                    <XAxis
                        fill="currentColor"
                        axisLine={false}
                        tickLine={false}
                        interval="preserveStartEnd"
                        dataKey="date"
                        tickFormatter={(value) => value.toLocaleDateString(undefined, { month: "short" })}
                        padding={{ left: 10, right: 10 }}
                    >
                        {isDesktop && (
                            <Label fill="currentColor" className="text-xs! font-medium max-lg:hidden" position="bottom">
                                Month
                            </Label>
                        )}
                    </XAxis>

                    <YAxis
                        fill="currentColor"
                        axisLine={false}
                        tickLine={false}
                        interval="preserveStartEnd"
                        tickFormatter={(value) => Number(value).toLocaleString()}
                    >
                        <Label
                            value="Active users"
                            fill="currentColor"
                            className="text-xs! font-medium"
                            style={{ textAnchor: "middle" }}
                            angle={-90}
                            position="insideLeft"
                        />
                    </YAxis>

                    <Tooltip
                        content={<ChartTooltipContent />}
                        formatter={(value) => Number(value).toLocaleString()}
                        labelFormatter={(value) => new Date(value as string | number | Date).toLocaleDateString(undefined, { month: "short", year: "numeric" })}
                        cursor={{
                            className: "stroke-utility-brand-600 stroke-2",
                        }}
                    />

                    <Area
                        isAnimationActive={false}
                        className={cx(colors["A"], "[&_.recharts-area-area]:translate-y-1.5 [&_.recharts-area-area]:[clip-path:inset(0_0_6px_0)]")}
                        dataKey="A"
                        name="Series 1"
                        type="monotone"
                        stroke="currentColor"
                        strokeWidth={2}
                        fill="url(#gradient)"
                        fillOpacity={0.1}
                        activeDot={{
                            className: "fill-bg-primary stroke-utility-brand-600 stroke-2",
                        }}
                    />

                    <Area
                        isAnimationActive={false}
                        className={cx(colors["B"], "[&_.recharts-area-area]:translate-y-1.5 [&_.recharts-area-area]:[clip-path:inset(0_0_6px_0)]")}
                        dataKey="B"
                        name="Series 2"
                        type="monotone"
                        stroke="currentColor"
                        strokeWidth={2}
                        fill="none"
                        strokeDasharray="0.1 8"
                        strokeLinecap="round"
                        activeDot={{
                            className: "fill-bg-primary stroke-utility-brand-600 stroke-2",
                        }}
                    />

                    <Area
                        isAnimationActive={false}
                        className={cx(colors["C"], "[&_.recharts-area-area]:translate-y-1.5 [&_.recharts-area-area]:[clip-path:inset(0_0_6px_0)]")}
                        dataKey="C"
                        name="Series 3"
                        type="monotone"
                        stroke="currentColor"
                        strokeWidth={2}
                        fill="none"
                        strokeDasharray="0.1 8"
                        strokeLinecap="round"
                        activeDot={{
                            className: "fill-bg-primary stroke-utility-brand-600 stroke-2",
                        }}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};

export const LineChart03 = () => {
    const isDesktop = useBreakpoint("lg");

    const colors: Record<string, string> = {
        A: "text-utility-brand-600",
        B: "text-utility-brand-400",
        C: "text-utility-brand-700",
    };

    return (
        <div className="flex h-60 flex-col gap-2">
            <ResponsiveContainer initialDimension={{ width: 1, height: 1 }} className="h-full">
                <AreaChart
                    data={lineData}
                    className="text-tertiary [&_.recharts-text]:text-xs"
                    margin={{
                        left: 5,
                        right: 5,
                        top: isDesktop ? 12 : 6,
                        bottom: isDesktop ? 16 : 0,
                    }}
                >
                    <defs>
                        <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="currentColor" className="text-utility-neutral-500" stopOpacity="0.8" />
                            <stop offset="80%" stopColor="currentColor" className="text-utility-neutral-500" stopOpacity="0" />
                        </linearGradient>

                        <pattern id="verticalLines" width="8" height="100%" fill="url(#gradient)" patternUnits="userSpaceOnUse">
                            <line x1="0" y1="0" x2="0" y2="100%" stroke="currentColor" className="text-utility-neutral-200" strokeWidth="1.5" />
                            <rect width="100%" height="100%" fill="url(#gradient)" fillOpacity={0.15} />
                        </pattern>
                    </defs>

                    <CartesianGrid vertical={false} stroke="currentColor" className="text-utility-neutral-100" />

                    <Legend
                        verticalAlign="top"
                        align="right"
                        layout={isDesktop ? "vertical" : "horizontal"}
                        content={<ChartLegendContent className="-translate-y-2" />}
                    />

                    <XAxis
                        fill="currentColor"
                        axisLine={false}
                        tickLine={false}
                        tickMargin={10}
                        interval="preserveStartEnd"
                        dataKey="date"
                        padding={{ left: 10, right: 10 }}
                        tickFormatter={(value) => value.toLocaleDateString(undefined, { month: "short" })}
                    >
                        {isDesktop && (
                            <Label fill="currentColor" className="text-xs! font-medium max-lg:hidden" position="bottom">
                                Month
                            </Label>
                        )}
                    </XAxis>

                    <YAxis
                        fill="currentColor"
                        axisLine={false}
                        tickLine={false}
                        interval="preserveStartEnd"
                        tickFormatter={(value) => Number(value).toLocaleString()}
                    >
                        <Label
                            value="Active users"
                            fill="currentColor"
                            className="text-xs! font-medium"
                            style={{ textAnchor: "middle" }}
                            angle={-90}
                            position="insideLeft"
                        />
                    </YAxis>

                    <Tooltip
                        content={<ChartTooltipContent />}
                        formatter={(value) => Number(value).toLocaleString()}
                        labelFormatter={(value) => new Date(value as string | number | Date).toLocaleDateString(undefined, { month: "short", year: "numeric" })}
                        cursor={{
                            className: "stroke-utility-brand-600 stroke-2",
                        }}
                    />

                    <Area
                        isAnimationActive={false}
                        className={cx(colors["A"], "[&_.recharts-area-area]:translate-y-1.5 [&_.recharts-area-area]:[clip-path:inset(0_0_6px_0)]")}
                        dataKey="A"
                        name="Series 1"
                        type="monotone"
                        stroke="currentColor"
                        strokeWidth={2}
                        fill="url(#verticalLines)"
                        fillOpacity={1}
                        activeDot={{
                            className: "fill-bg-primary stroke-utility-brand-600 stroke-2",
                        }}
                    />

                    <Area
                        isAnimationActive={false}
                        className={cx(colors["B"], "[&_.recharts-area-area]:translate-y-1.5 [&_.recharts-area-area]:[clip-path:inset(0_0_6px_0)]")}
                        dataKey="B"
                        name="Series 2"
                        type="monotone"
                        stroke="currentColor"
                        strokeWidth={2}
                        fill="none"
                        activeDot={{
                            className: "fill-bg-primary stroke-utility-brand-600 stroke-2",
                        }}
                    />

                    <Area
                        isAnimationActive={false}
                        className={cx(colors["C"], "[&_.recharts-area-area]:translate-y-1.5 [&_.recharts-area-area]:[clip-path:inset(0_0_6px_0)]")}
                        dataKey="C"
                        name="Series 3"
                        type="monotone"
                        stroke="currentColor"
                        strokeWidth={2}
                        fill="none"
                        activeDot={{
                            className: "fill-bg-primary stroke-utility-brand-600 stroke-2",
                        }}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};

export const LineChart04 = () => {
    const isDesktop = useBreakpoint("lg");

    const colors: Record<string, string> = {
        A: "text-utility-brand-600",
        B: "text-utility-neutral-500",
        C: "text-utility-neutral-400",
    };

    return (
        <div className="flex h-60 flex-col gap-2">
            <ResponsiveContainer initialDimension={{ width: 1, height: 1 }} className="h-full">
                <AreaChart
                    data={lineData}
                    className="text-tertiary [&_.recharts-text]:text-xs"
                    margin={{
                        left: 5,
                        right: 5,
                        top: isDesktop ? 12 : 6,
                        bottom: isDesktop ? 16 : 0,
                    }}
                >
                    <defs>
                        <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="currentColor" className="text-utility-neutral-500" stopOpacity="0.7" />
                            <stop offset="95%" stopColor="currentColor" className="text-utility-neutral-500" stopOpacity="0" />
                        </linearGradient>
                    </defs>

                    <CartesianGrid vertical={false} stroke="currentColor" className="text-utility-neutral-100" />

                    <Legend
                        verticalAlign="top"
                        align="right"
                        layout={isDesktop ? "vertical" : "horizontal"}
                        content={<ChartLegendContent className="-translate-y-2" />}
                    />

                    <XAxis
                        fill="currentColor"
                        axisLine={false}
                        tickLine={false}
                        tickMargin={10}
                        interval="preserveStartEnd"
                        dataKey="date"
                        tickFormatter={(value) => value.toLocaleDateString(undefined, { month: "short" })}
                        padding={{ left: 10, right: 10 }}
                    >
                        {isDesktop && (
                            <Label fill="currentColor" className="text-xs! font-medium max-lg:hidden" position="bottom">
                                Month
                            </Label>
                        )}
                    </XAxis>

                    <YAxis
                        fill="currentColor"
                        axisLine={false}
                        tickLine={false}
                        interval="preserveStartEnd"
                        tickFormatter={(value) => Number(value).toLocaleString()}
                    >
                        <Label
                            value="Active users"
                            fill="currentColor"
                            className="text-xs! font-medium"
                            style={{ textAnchor: "middle" }}
                            angle={-90}
                            position="insideLeft"
                        />
                    </YAxis>

                    <Tooltip
                        content={<ChartTooltipContent />}
                        formatter={(value) => Number(value).toLocaleString()}
                        labelFormatter={(value) => new Date(value as string | number | Date).toLocaleDateString(undefined, { month: "short", year: "numeric" })}
                        cursor={{
                            className: "stroke-utility-brand-600 stroke-2",
                        }}
                    />

                    <Area
                        isAnimationActive={false}
                        className={cx(colors["A"], "[&_.recharts-area-area]:translate-y-1.5 [&_.recharts-area-area]:[clip-path:inset(0_0_6px_0)]")}
                        dataKey="A"
                        name="Series 1"
                        type="monotone"
                        stroke="currentColor"
                        strokeWidth={2}
                        fill="url(#gradient)"
                        fillOpacity={0.1}
                        activeDot={{
                            className: "fill-bg-primary stroke-utility-brand-600 stroke-2",
                        }}
                    />

                    <Area
                        isAnimationActive={false}
                        className={cx(colors["B"], "[&_.recharts-area-area]:translate-y-1.5 [&_.recharts-area-area]:[clip-path:inset(0_0_6px_0)]")}
                        dataKey="B"
                        name="Series 2"
                        type="monotone"
                        stroke="currentColor"
                        strokeWidth={2}
                        fill="none"
                        activeDot={{
                            className: "fill-bg-primary stroke-utility-brand-600 stroke-2",
                        }}
                    />

                    <Area
                        isAnimationActive={false}
                        className={cx(colors["C"], "[&_.recharts-area-area]:translate-y-1.5 [&_.recharts-area-area]:[clip-path:inset(0_0_6px_0)]")}
                        dataKey="C"
                        name="Series 3"
                        type="monotone"
                        stroke="currentColor"
                        strokeWidth={2}
                        fill="none"
                        activeDot={{
                            className: "fill-bg-primary stroke-utility-brand-600 stroke-2",
                        }}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};

export const BarChart01 = () => {
    const isDesktop = useBreakpoint("lg");

    const colors: Record<string, string> = {
        A: "text-utility-brand-700",
        B: "text-utility-brand-500",
        C: "text-utility-neutral-200",
    };

    return (
        <ResponsiveContainer initialDimension={{ width: 1, height: 1 }} className="h-60!">
            <RechartsBarChart
                data={barData}
                className="text-tertiary [&_.recharts-text]:text-xs"
                margin={{
                    left: 4,
                    right: 0,
                    top: isDesktop ? 12 : 6,
                    bottom: 18,
                }}
            >
                <CartesianGrid vertical={false} stroke="currentColor" className="text-utility-neutral-100" />

                <Legend
                    verticalAlign="top"
                    align="right"
                    layout={isDesktop ? "vertical" : "horizontal"}
                    content={<ChartLegendContent className="-translate-y-2" />}
                />

                <XAxis
                    fill="currentColor"
                    axisLine={false}
                    tickLine={false}
                    tickMargin={11}
                    interval="preserveStartEnd"
                    dataKey="month"
                    tickFormatter={(value) => value.toLocaleDateString(undefined, { month: "short" })}
                >
                    <Label value="Month" fill="currentColor" className="text-xs! font-medium" position="bottom" />
                </XAxis>

                <YAxis
                    fill="currentColor"
                    axisLine={false}
                    tickLine={false}
                    interval="preserveStartEnd"
                    tickFormatter={(value) => Number(value).toLocaleString()}
                >
                    <Label
                        value="Active users"
                        fill="currentColor"
                        className="text-xs! font-medium"
                        style={{ textAnchor: "middle" }}
                        angle={-90}
                        position="insideLeft"
                    />
                </YAxis>

                <Tooltip
                    content={<ChartTooltipContent />}
                    formatter={(value) => Number(value).toLocaleString()}
                    labelFormatter={(value) => new Date(value as string | number | Date).toLocaleDateString(undefined, { month: "short", year: "numeric" })}
                    cursor={{
                        className: "fill-utility-neutral-200/20",
                    }}
                />

                <Bar
                    isAnimationActive={false}
                    className={colors["A"]}
                    dataKey="A"
                    name="Series 1"
                    type="monotone"
                    stackId="a"
                    fill="currentColor"
                    maxBarSize={isDesktop ? 32 : 16}
                />
                <Bar
                    isAnimationActive={false}
                    className={colors["B"]}
                    dataKey="B"
                    name="Series 2"
                    type="monotone"
                    stackId="a"
                    fill="currentColor"
                    maxBarSize={isDesktop ? 32 : 16}
                />
                <Bar
                    isAnimationActive={false}
                    className={colors["C"]}
                    dataKey="C"
                    name="Series 3"
                    type="monotone"
                    stackId="a"
                    fill="currentColor"
                    maxBarSize={isDesktop ? 32 : 16}
                    radius={[6, 6, 0, 0]}
                />
            </RechartsBarChart>
        </ResponsiveContainer>
    );
};

export const BarChart02 = () => {
    const colors: Record<string, string> = {
        A: "text-utility-brand-600",
        B: "text-utility-brand-400",
    };

    return (
        <div className="flex h-60 flex-col gap-2">
            <ResponsiveContainer initialDimension={{ width: 1, height: 1 }} className="h-full">
                <ComposedChart
                    data={weeklyTrafficData}
                    margin={{
                        left: 4,
                        right: 0,
                        top: 12,
                        bottom: 18,
                    }}
                    className="text-tertiary [&_.recharts-text]:text-xs"
                >
                    <CartesianGrid vertical={false} stroke="currentColor" className="text-utility-neutral-100" />

                    <XAxis
                        fill="currentColor"
                        axisLine={false}
                        tickLine={false}
                        tickMargin={12}
                        interval="preserveStartEnd"
                        dataKey="date"
                        tickFormatter={(value) => new Date(value).toLocaleDateString(undefined, { month: "short" })}
                        ticks={selectEvenlySpacedItems(weeklyTrafficData, 12).map((item) => item.date)}
                    >
                        <Label value="Month" fill="currentColor" className="text-xs! font-medium" position="bottom" />
                    </XAxis>

                    <YAxis
                        fill="currentColor"
                        axisLine={false}
                        tickLine={false}
                        interval="preserveStartEnd"
                        tickFormatter={(value) => Number(value).toLocaleString()}
                    >
                        <Label
                            value="Active users"
                            fill="currentColor"
                            className="text-xs! font-medium"
                            style={{ textAnchor: "middle" }}
                            angle={-90}
                            position="insideLeft"
                        />
                    </YAxis>

                    <Tooltip
                        content={<ChartTooltipContent />}
                        formatter={(value) => Number(value).toLocaleString()}
                        labelFormatter={(value) => formatWeekRangeLabel(value as string | number | Date)}
                        cursor={{
                            className: "fill-utility-neutral-200/20",
                        }}
                    />

                    <Bar
                        isAnimationActive={false}
                        className={colors["A"]}
                        name="Mobile"
                        dataKey="A"
                        type="monotone"
                        stackId="a"
                        fill="currentColor"
                        maxBarSize={12}
                        radius={[4, 4, 0, 0]}
                    />
                    <Line
                        isAnimationActive={false}
                        className={colors["B"]}
                        dataKey="B"
                        name="Desktop"
                        type="monotone"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeDasharray="0.1 8"
                        strokeLinecap="round"
                        activeDot={false}
                        dot={false}
                    />
                </ComposedChart>
            </ResponsiveContainer>
        </div>
    );
};

export const BarChart03 = () => {
    const colors: Record<string, string> = {
        A: "text-utility-brand-600",
        B: "text-utility-brand-400",
    };

    return (
        <div className="flex h-60 flex-col gap-2">
            <ResponsiveContainer initialDimension={{ width: 1, height: 1 }} className="h-full">
                <ComposedChart
                    data={weeklyTrafficData}
                    margin={{
                        left: 4,
                        right: 0,
                        top: 12,
                        bottom: 18,
                    }}
                    className="text-tertiary [&_.recharts-text]:text-xs"
                >
                    <CartesianGrid vertical={false} stroke="currentColor" className="text-utility-neutral-100" />

                    <XAxis
                        fill="currentColor"
                        axisLine={false}
                        tickLine={false}
                        tickMargin={12}
                        interval="preserveStartEnd"
                        dataKey="date"
                        tickFormatter={(value) => new Date(value).toLocaleDateString(undefined, { month: "short" })}
                        ticks={selectEvenlySpacedItems(weeklyTrafficData, 12).map((item) => item.date)}
                    >
                        <Label value="Month" fill="currentColor" className="text-xs! font-medium" position="bottom" />
                    </XAxis>

                    <YAxis
                        fill="currentColor"
                        axisLine={false}
                        tickLine={false}
                        interval="preserveStartEnd"
                        tickFormatter={(value) => Number(value).toLocaleString()}
                    >
                        <Label
                            value="Active users"
                            fill="currentColor"
                            className="text-xs! font-medium"
                            style={{ textAnchor: "middle" }}
                            angle={-90}
                            position="insideLeft"
                        />
                    </YAxis>

                    <Tooltip
                        content={<ChartTooltipContent />}
                        formatter={(value) => Number(value).toLocaleString()}
                        labelFormatter={(value) => formatWeekRangeLabel(value as string | number | Date)}
                        cursor={{
                            className: "fill-utility-neutral-200/20",
                        }}
                    />

                    <Bar
                        isAnimationActive={false}
                        className={colors["A"]}
                        name="Mobile"
                        dataKey="A"
                        type="monotone"
                        stackId="a"
                        fill="currentColor"
                        maxBarSize={8}
                        radius={[4, 4, 0, 0]}
                    />
                    <Line
                        isAnimationActive={false}
                        className={colors["B"]}
                        dataKey="B"
                        name="Desktop"
                        type="monotone"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeDasharray="0.1 8"
                        strokeLinecap="round"
                        activeDot={false}
                        dot={false}
                    />
                </ComposedChart>
            </ResponsiveContainer>
        </div>
    );
};

// The hero preview at the top of the docs page reuses the first line chart.
export const LineChartExample = LineChart01;
