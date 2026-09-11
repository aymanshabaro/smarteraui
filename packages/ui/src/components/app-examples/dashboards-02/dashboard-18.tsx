"use client";

import { countries } from "../../../utils/countries";
import { avatar } from "../../../utils/demo-assets";
import { DateRangePicker } from "../../application/date-picker/date-range-picker";
import { MetricChart01 } from "../../application/metrics/metrics";
import { TabList, Tabs } from "../../application/tabs/tabs";
import { Button } from "../../base/buttons/button";
import { ProgressBarBase } from "../../base/progress-indicators/progress-indicators";
import { BackgroundPattern } from "../../shared-assets/background-patterns";
import { DonutChart, StackedBarChart } from "./charts.a";
import { countrySessions, countryTraffic, sparkDown, sparkUp, stackedSeries } from "./data.a";
import { DashboardHeader } from "./shell.a";
import { FiltersButton, PanelMenu, PeriodTabs, styles } from "./widgets.a";

const owner = avatar(0);

const flagFor = (code: string) => countries.find((country) => country.code === code)?.flag ?? "";

const sections = [
    { id: "overview", children: "Overview" },
    { id: "reports", children: "Reports" },
    { id: "saved-reports", children: "Saved reports" },
    { id: "settings", children: "Settings" },
];

const metrics = [
    { title: "Users", value: "20.8k", change: "12%", trend: "positive" as const, chartData: sparkUp },
    { title: "Sessions", value: "26.4k", change: "2%", trend: "negative" as const, chartData: sparkDown },
    { title: "Session duration", value: "3m 52s", change: "2%", trend: "positive" as const, chartData: sparkUp },
];

/** Analytics overview: a section rail beside the traffic metrics, live audience map and acquisition mix. */
export const Dashboard18 = () => (
    <div className="bg-primary">
        <DashboardHeader account="button" search />

        <main className="max-w-container mx-auto flex gap-16 px-4 pt-8 pb-12 lg:px-8 lg:pt-12 lg:pb-24">
            <div className="max-lg:hidden">
                <Tabs orientation="vertical" defaultSelectedKey="overview">
                    <TabList type="button-gray" size="sm" aria-label="Report section" items={sections} className="w-max gap-1" />

                    {/* The rail switches the whole page rather than an inline panel, so the panels
                        stay empty — they exist only so each tab's `aria-controls` resolves. */}
                    {sections.map((section) => (
                        <Tabs.Panel key={section.id} id={section.id} />
                    ))}
                </Tabs>
            </div>

            <div className="flex w-full min-w-0 flex-col gap-8 lg:gap-6">
                <div className="flex w-full flex-col gap-5 lg:gap-6">
                    <div className="flex flex-col gap-4 lg:flex-row">
                        <div className="flex flex-1 flex-col gap-0.5">
                            <h1 className="text-primary text-xl font-semibold">Welcome back, {owner.name.split(" ")[0]}</h1>
                            <p className="text-tertiary text-md">Measure your advertising ROI and track and report website traffic.</p>
                        </div>

                        <div className="flex gap-3">
                            <Button color="secondary" size="md">
                                Export
                            </Button>
                            <Button color="primary" size="md">
                                Insights
                            </Button>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-3">
                        <PeriodTabs selectedKey="12-months" />

                        <div className="ms-auto flex shrink-0 items-center gap-3">
                            <div className="max-md:hidden">
                                <DateRangePicker size="md" />
                            </div>
                            <FiltersButton />
                        </div>
                    </div>
                </div>

                <div className="flex w-full flex-col gap-5 md:flex-row md:flex-wrap lg:gap-6">
                    {/* The cards head themselves with an `h3`, so the group needs an `h2` above them. */}
                    <h2 className="sr-only">Traffic summary</h2>

                    {metrics.map((metric) => (
                        <MetricChart01
                            key={metric.title}
                            className="flex-1 md:min-w-80"
                            title={metric.title}
                            value={metric.value}
                            change={metric.change}
                            trend={metric.trend}
                            changeDescription="vs last mth"
                            chartData={metric.chartData}
                            menu={<PanelMenu />}
                        />
                    ))}
                </div>

                <section className={`${styles.panel.root} flex flex-col gap-5 px-4 py-5 lg:p-6`}>
                    <div className="border-secondary flex items-center justify-between gap-4 border-b pb-5">
                        <h2 className="text-md text-primary font-semibold">Active users right now</h2>
                        <Button color="secondary" size="md">
                            Real-time report
                        </Button>
                    </div>

                    <div className="flex flex-col gap-8 lg:flex-row lg:items-center">
                        {/* The reference plots live sessions on a dotted world map; the library has no map
                            asset, so the grid background pattern stands in for it. */}
                        <div aria-hidden="true" className="relative hidden h-72 flex-1 items-center justify-center overflow-hidden lg:flex">
                            <BackgroundPattern pattern="grid" size="lg" className="absolute" />
                        </div>

                        <div className="flex w-full flex-col gap-5 lg:max-w-70">
                            <p className="text-display-md text-primary font-semibold">10.8k</p>

                            <ul aria-label="Active users by country" className="flex flex-col gap-4">
                                {countryTraffic.map((country) => (
                                    <li key={country.code} className="flex items-center gap-3">
                                        <img src={flagFor(country.code)} alt="" className="size-6 shrink-0 rounded-full" />
                                        <div className="min-w-0 flex-1">
                                            <p className="text-secondary truncate text-sm font-medium">{country.name}</p>
                                            <ProgressBarBase value={country.share} className="mt-1.5" />
                                        </div>
                                        <span className="text-tertiary text-sm font-medium">{country.share}%</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </section>

                <section className={`${styles.panel.root} flex flex-col gap-5 px-4 py-5 lg:p-6`}>
                    <div className="border-secondary flex items-center justify-between gap-4 border-b pb-5">
                        <h2 className="text-md text-primary font-semibold">How do you acquire users?</h2>
                        <Button color="secondary" size="md">
                            Location report
                        </Button>
                    </div>

                    <div className="flex flex-col gap-8 lg:flex-row">
                        <StackedBarChart
                            className="h-60 flex-1"
                            data={stackedSeries}
                            xKey="month"
                            series={[
                                { key: "A", name: "Organic" },
                                { key: "B", name: "Direct" },
                                { key: "C", name: "Referral" },
                            ]}
                        />

                        <DonutChart legend className="h-60 lg:max-w-90" data={countrySessions} />
                    </div>
                </section>
            </div>
        </main>
    </div>
);
