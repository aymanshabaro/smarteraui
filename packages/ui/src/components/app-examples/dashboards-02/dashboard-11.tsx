"use client";

import { DownloadCloud01, SearchLg } from "@smarteraui/icons";
import { ActivityFeed } from "@/components/application/activity-feed/activity-feed";
import { DateRangePicker } from "@/components/application/date-picker/date-range-picker";
import { MetricChart03 } from "@/components/application/metrics/metrics";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
import { avatar } from "@/utils/demo-assets";
import { StackedBarChart } from "./charts.a";
import { recentPurchases, sparkDown, sparkUp, stackedSeries } from "./data.a";
import { DashboardHeader, DashboardMain, DashboardSection } from "./shell.a";
import { FiltersButton, PanelMenu, PeriodTabs } from "./widgets.a";

const metrics = [
    { title: "Today's revenue", value: "$1,280", change: "15%", trend: "positive" as const, chartData: sparkUp },
    { title: "Today's orders", value: "14", change: "10%", trend: "negative" as const, chartData: sparkDown },
    { title: "Avg. order value", value: "$91.42", change: "20%", trend: "positive" as const, chartData: sparkUp },
];

/** The feed reads as two balanced columns from `md` up, so the rows are split down the middle. */
const feedColumns = [recentPurchases.slice(0, 7), recentPurchases.slice(7)];

/** Sales dashboard: a yearly comparison chart, today's metrics and a two-column activity feed. */
export const Dashboard11 = () => (
    <div className="bg-primary">
        <DashboardHeader upgrade />

        <DashboardMain>
            <DashboardSection className="gap-5">
                <div className="flex flex-col gap-4 lg:flex-row">
                    <div className="flex flex-1 flex-col gap-0.5">
                        <h1 className="text-primary text-xl font-semibold">Welcome back, {avatar(0).name.split(" ")[0]}</h1>
                        <p className="text-tertiary text-md">Your current sales summary and activity.</p>
                    </div>

                    <Input shortcut aria-label="Search" placeholder="Search" icon={SearchLg} size="sm" className="lg:w-70" />
                </div>

                <div className="flex flex-col justify-between gap-4 lg:flex-row">
                    <PeriodTabs selectedKey="12-months" />

                    <div className="flex gap-3">
                        <DateRangePicker size="md" />
                        <FiltersButton count={3} />
                    </div>
                </div>
            </DashboardSection>

            <DashboardSection>
                <StackedBarChart
                    legend
                    className="h-60 lg:h-70"
                    data={stackedSeries}
                    xKey="month"
                    series={[
                        { key: "A", name: "2027" },
                        { key: "B", name: "2026" },
                        { key: "C", name: "2025" },
                    ]}
                />
            </DashboardSection>

            <DashboardSection className="gap-5 md:flex-row md:flex-wrap lg:gap-6">
                {/* The cards head themselves with an `h3`, so the group needs an `h2` above them. */}
                <h2 className="sr-only">Today's summary</h2>

                {metrics.map((metric) => (
                    <MetricChart03
                        key={metric.title}
                        className="flex-1 md:min-w-80"
                        title={metric.title}
                        value={metric.value}
                        change={metric.change}
                        trend={metric.trend}
                        changeDescription="last mth"
                        chartData={metric.chartData}
                        menu={<PanelMenu />}
                    />
                ))}
            </DashboardSection>

            <DashboardSection className="gap-6">
                <div className="border-secondary flex flex-wrap items-center justify-between gap-4 border-b pb-5">
                    <h2 className="text-md text-primary font-semibold">Recent activity</h2>

                    <div className="flex gap-3">
                        <Button color="secondary" size="md" iconLeading={DownloadCloud01}>
                            Download
                        </Button>
                        <Button color="primary" size="md">
                            View all
                        </Button>
                    </div>
                </div>

                <div className="grid gap-x-8 md:grid-cols-2">
                    {feedColumns.map((column, index) => (
                        <ActivityFeed key={index} type="connected" aria-label={`Recent activity ${index + 1} of 2`}>
                            {column.map((purchase) => (
                                <ActivityFeed.Item
                                    key={`${purchase.name}-${purchase.product}`}
                                    name={purchase.name}
                                    avatarSrc={purchase.src}
                                    status={purchase.online ? "online" : undefined}
                                    isUnread={purchase.online}
                                    time={purchase.time}
                                    action={
                                        <>
                                            Purchased <span className="text-secondary font-medium">{purchase.product}</span>
                                        </>
                                    }
                                />
                            ))}
                        </ActivityFeed>
                    ))}
                </div>
            </DashboardSection>
        </DashboardMain>
    </div>
);
