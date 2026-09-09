"use client";

import type { ReactNode } from "react";
import { Plus } from "@smarteraui/icons";
import { DateRangePicker } from "@/components/application/date-picker/date-range-picker";
import { MetricSimple } from "@/components/application/metrics/metrics";
import { ButtonGroup, ButtonGroupItem } from "@/components/base/button-group/button-group";
import { Button } from "@/components/base/buttons/button";
import { Dot } from "@/components/foundations/dot-icon";
import { StackedBarChart, TrendChart } from "./charts.a";
import { recentPurchases, stackedSeries, trendSeries } from "./data.a";
import { DashboardHeader, DashboardMain, DashboardSection, subNavItems } from "./shell.a";
import { FiltersButton, PanelMenu, PeriodTabs, PersonList } from "./widgets.a";

const metrics = [
    { title: "Today's revenue", value: "$1,280", change: "10%", trend: "positive" as const },
    { title: "Today's orders", value: "14", change: "12%", trend: "positive" as const },
    { title: "Avg. order value", value: "$91.42", change: "2%", trend: "negative" as const },
];

const savedViews = [
    { id: "default", label: "Default", dot: false },
    { id: "saved-view", label: "Saved view", dot: true },
    { id: "sdr-view", label: "SDR view", dot: false },
];

/** The chart panels only become raised cards from `lg` up — below that they sit flat on the page. */
const reportPanel = "flex flex-col gap-6 rounded-xl ring-secondary ring-inset lg:gap-5 lg:bg-primary lg:p-6 lg:shadow-xs lg:ring-1";

const ReportPanel = ({ title, children }: { title: string; children: ReactNode }) => (
    <section className={reportPanel}>
        <div className="flex flex-col gap-5">
            <div className="flex items-start justify-between gap-4">
                <h2 className="text-md text-primary font-semibold">{title}</h2>
                <Button color="secondary" size="md">
                    View report
                </Button>
            </div>
            <PeriodTabs selectedKey="12-months" label={`${title} period`} />
        </div>
        {children}
    </section>
);

/** Sales overview: today's trading metrics, a sales and a store-traffic report, and an activity rail. */
export const Dashboard10 = () => (
    <div className="bg-primary">
        <DashboardHeader activeUrl="/dashboard/overview" subItems={subNavItems} upgrade />

        <DashboardMain>
            <DashboardSection className="gap-5">
                <div className="flex flex-col gap-4 lg:flex-row">
                    <div className="flex flex-1 flex-col gap-0.5">
                        <h1 className="text-primary text-xl font-semibold">Sales overview</h1>
                        <p className="text-tertiary text-md">Your current sales summary and activity.</p>
                    </div>

                    <div className="flex gap-3">
                        <Button color="secondary" size="md">
                            Export report
                        </Button>
                        <Button color="primary" size="md" iconLeading={Plus}>
                            Invite
                        </Button>
                    </div>
                </div>

                <div className="flex flex-col justify-between gap-4 lg:flex-row">
                    <ButtonGroup size="md" defaultSelectedKeys={["saved-view"]} aria-label="Saved views">
                        {savedViews.map((view) => (
                            <ButtonGroupItem
                                key={view.id}
                                id={view.id}
                                iconLeading={view.dot ? <Dot className="text-fg-success-secondary mx-0.75 size-2" /> : undefined}
                            >
                                {view.label}
                            </ButtonGroupItem>
                        ))}
                        <ButtonGroupItem id="add-view" aria-label="Add view" iconLeading={Plus} />
                    </ButtonGroup>

                    <div className="flex gap-3">
                        <DateRangePicker size="md" />
                        <FiltersButton />
                    </div>
                </div>
            </DashboardSection>

            <DashboardSection className="gap-8 lg:flex-row">
                <div className="flex w-full flex-col gap-8 lg:gap-5">
                    <div className="flex w-full flex-col gap-4 md:flex-row md:flex-wrap lg:gap-5">
                        {/* The cards head themselves with an `h3`, so the group needs an `h2` above them. */}
                        <h2 className="sr-only">Today's summary</h2>

                        {metrics.map((metric) => (
                            <MetricSimple
                                key={metric.title}
                                className="flex-1 md:min-w-60"
                                title={metric.title}
                                value={metric.value}
                                change={metric.change}
                                trend={metric.trend}
                                menu={<PanelMenu />}
                                footer={
                                    <Button color="link-gray" size="md" href="#">
                                        View report
                                    </Button>
                                }
                            />
                        ))}
                    </div>

                    <ReportPanel title="Sales report">
                        <TrendChart
                            className="h-50"
                            data={trendSeries}
                            xKey="month"
                            series={[
                                { key: "A", name: "This year" },
                                { key: "B", name: "Last year" },
                            ]}
                        />
                    </ReportPanel>

                    <ReportPanel title="Store traffic">
                        <StackedBarChart
                            className="h-50"
                            data={stackedSeries}
                            xKey="month"
                            series={[
                                { key: "A", name: "Direct" },
                                { key: "B", name: "Organic search" },
                            ]}
                        />
                    </ReportPanel>

                    <div className="hidden w-full shrink-0 items-center gap-x-2 lg:flex">
                        <div className="bg-border-secondary h-px flex-1" />
                        <Button color="secondary" size="md">
                            Add
                        </Button>
                        <div className="bg-border-secondary h-px flex-1" />
                    </div>
                </div>

                <div className="hidden flex-col gap-6 lg:flex">
                    <div className="flex justify-between gap-4">
                        <h2 className="text-md text-primary font-semibold">Activity</h2>
                        <Button color="link-gray" size="md" href="#">
                            View all
                        </Button>
                    </div>

                    <PersonList
                        className="w-60"
                        label="Recent activity"
                        items={recentPurchases.map((purchase) => ({
                            name: purchase.name,
                            src: purchase.src,
                            online: purchase.online,
                            detail: (
                                <>
                                    Purchased <span className="text-secondary font-medium">{purchase.product}</span>
                                </>
                            ),
                        }))}
                    />
                </div>
            </DashboardSection>
        </DashboardMain>
    </div>
);
