"use client";

import { SearchLg } from "@properui/icons";
import { MetricChangeIndicator } from "../../application/metrics/metrics-base";
import { TabList, Tabs } from "../../application/tabs/tabs";
import { Button } from "../../base/buttons/button";
import { Input } from "../../base/input/input";
import { DonutChart, RadarChart, StackedBarChart, TrendChart } from "./charts.a";
import { countrySessions, dailySeries, stackedSeries, trafficRadar } from "./data.a";
import { DashboardHeader, DashboardMain, DashboardSection } from "./shell.a";
import { PanelMenu, SegmentTabs } from "./widgets.a";

const overviewMetrics = [
    { id: "users", label: "Users", value: "8.8k", change: "7.4%", trend: "positive" as const },
    { id: "sessions", label: "Sessions", value: "10.2k", change: "7.2%", trend: "positive" as const },
    { id: "bounce-rate", label: "Bounce rate", value: "46.2%", change: "0.2%", trend: "negative" as const },
    { id: "session-duration", label: "Session duration", value: "4m 4s", change: "10.8%", trend: "positive" as const },
];

const periods = ["12 months", "30 days", "7 days", "Custom"];

/** The heading + overflow menu row that opens every panel on this page. */
const PanelHeading = ({ title }: { title: string }) => (
    <div className="border-secondary flex items-start justify-between border-b pb-5">
        <h2 className="text-md text-primary font-semibold">{title}</h2>
        <PanelMenu />
    </div>
);

/** The period tabs + report button row that closes the two chart panels. */
const PanelFooter = ({ label }: { label: string }) => (
    <div className="border-secondary flex justify-between gap-4 border-t pt-4 lg:pt-5">
        <SegmentTabs label={label} type="button-border" items={periods} />
        <Button color="secondary" size="md" className="max-md:hidden">
            Audience overview
        </Button>
        <Button color="secondary" size="md" className="md:hidden">
            Overview
        </Button>
    </div>
);

/** Website analytics: an audience overview and acquisition breakdown paired with traffic-source charts. */
export const Dashboard17 = () => (
    <div className="bg-primary">
        <DashboardHeader account="button" search />

        <DashboardMain>
            <DashboardSection className="justify-between gap-4 lg:flex-row">
                <h1 className="text-primary text-xl font-semibold">Website analytics</h1>
                <Input shortcut aria-label="Search" placeholder="Search" icon={SearchLg} size="sm" className="lg:max-w-70" />
            </DashboardSection>

            <DashboardSection className="gap-8 lg:flex-row lg:gap-12">
                <div className="flex w-full flex-col gap-6 lg:gap-5">
                    <PanelHeading title="Overview" />

                    <Tabs defaultSelectedKey="users">
                        <TabList type="underline" size="sm" aria-label="Overview metric" className="gap-4 overflow-x-auto">
                            {overviewMetrics.map((metric) => (
                                <Tabs.Item key={metric.id} id={metric.id} className="min-w-36 flex-1 items-start pb-6">
                                    <span className="flex flex-col items-start gap-2">
                                        <span className="text-tertiary text-sm font-medium">{metric.label}</span>
                                        <span className="flex items-center gap-2">
                                            <span className="text-display-sm text-primary font-semibold">{metric.value}</span>
                                            <MetricChangeIndicator trend={metric.trend}>{metric.change}</MetricChangeIndicator>
                                        </span>
                                    </span>
                                </Tabs.Item>
                            ))}
                        </TabList>

                        {/* The metrics all plot into the chart below, so the panels stay empty —
                            they exist only so each tab's `aria-controls` resolves. */}
                        {overviewMetrics.map((metric) => (
                            <Tabs.Panel key={metric.id} id={metric.id} />
                        ))}
                    </Tabs>

                    <div className="flex flex-col gap-5">
                        <TrendChart
                            className="h-60 lg:h-57"
                            data={dailySeries}
                            xKey="day"
                            series={[
                                { key: "A", name: "This period" },
                                { key: "B", name: "Previous period" },
                            ]}
                        />
                        <PanelFooter label="Overview period" />
                    </div>
                </div>

                <div className="flex flex-col gap-6 lg:max-w-98 lg:min-w-98 lg:gap-5">
                    <PanelHeading title="Traffic sources" />
                    <RadarChart className="h-81" data={trafficRadar} />
                </div>
            </DashboardSection>

            <DashboardSection className="max-lg:hidden">
                <div className="bg-border-secondary h-px w-full" />
            </DashboardSection>

            <DashboardSection className="gap-8 lg:flex-row lg:gap-12">
                <div className="flex w-full flex-col gap-6 lg:gap-5">
                    <PanelHeading title="How do you acquire users?" />

                    <SegmentTabs label="Acquisition breakdown" type="underline" items={["Traffic channel", "Source", "Referrals"]} />

                    <div className="flex flex-col gap-5">
                        <StackedBarChart
                            legend
                            className="h-60"
                            data={stackedSeries}
                            xKey="month"
                            series={[
                                { key: "A", name: "Direct" },
                                { key: "B", name: "Organic search" },
                                { key: "C", name: "Referral" },
                            ]}
                        />
                        <PanelFooter label="Acquisition period" />
                    </div>
                </div>

                <div className="flex flex-col gap-6 lg:max-w-98 lg:min-w-98 lg:gap-5">
                    <PanelHeading title="Sessions by country" />
                    <DonutChart legend innerRadius={0} className="h-70" data={countrySessions} />
                </div>
            </DashboardSection>
        </DashboardMain>
    </div>
);
