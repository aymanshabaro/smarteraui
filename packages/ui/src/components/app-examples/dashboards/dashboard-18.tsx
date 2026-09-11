"use client";

import { DownloadCloud02, FilterLines, Zap } from "@properui/icons";
import { cx } from "../../../utils/cx";
import { FeaturedCardReferralLink } from "../../application/app-navigation/base-components/featured-cards";
import { SidebarNavigationSimple } from "../../application/app-navigation/sidebar-navigation/sidebar-simple";
import { DateRangePicker } from "../../application/date-picker/date-range-picker";
import { MetricChart03 } from "../../application/metrics/metrics";
import { Button } from "../../base/buttons/button";
import { Dropdown } from "../../base/dropdown/dropdown";
import { ProgressBarBase } from "../../base/progress-indicators/progress-indicators";
import { BackgroundPattern } from "../../shared-assets/background-patterns";
import { ChartCard, RangeTabs, StackedBarChart, currentUser, navFooterItems, navItemsSimple, sparklineDown, sparklineUp, styles } from "./dashboards-shared";

const noop = () => {};

const metrics = [
    { title: "Users", value: "20.8k", change: "12%", trend: "positive" as const, chartData: sparklineUp },
    { title: "Sessions", value: "26.4k", change: "2%", trend: "negative" as const, chartData: sparklineDown },
    { title: "Session duration", value: "3m 52s", change: "2%", trend: "positive" as const, chartData: sparklineUp },
];

const countries = [
    { code: "US", name: "United States", share: 50 },
    { code: "IN", name: "India", share: 30 },
    { code: "GB", name: "United Kingdom", share: 20 },
    { code: "AU", name: "Australia", share: 10 },
    { code: "CA", name: "Canada", share: 10 },
];

const CardMenu = () => (
    <Dropdown.Root>
        <Dropdown.DotsButton />
        <Dropdown.Popover className="w-40">
            <Dropdown.Menu>
                <Dropdown.Item>View report</Dropdown.Item>
                <Dropdown.Item>Export</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown.Popover>
    </Dropdown.Root>
);

/** Dashboard 18 — an analytics overview with a live active-users panel and an acquisition chart. */
export const Dashboard18 = () => (
    <div className={styles.page}>
        <SidebarNavigationSimple
            activeUrl="/dashboard"
            items={navItemsSimple}
            footerItems={navFooterItems}
            featureCard={
                <FeaturedCardReferralLink
                    title="Refer a friend"
                    description="Earn 50% back for 12 months when someone uses your link."
                    referralLink="properui.dev/4060020"
                    onDismiss={noop}
                    onCopy={noop}
                />
            }
        />

        <main className={styles.main}>
            <div className={cx("flex flex-col gap-6", styles.gutter)}>
                <div className="flex flex-col gap-4 md:flex-row md:items-start">
                    <div className="flex flex-1 flex-col gap-1">
                        <h1 className={styles.pageTitle}>Welcome back, {currentUser.name.split(" ")[0]}</h1>
                        <p className={styles.pageSubtitle}>Measure your advertising ROI and track and report website traffic.</p>
                    </div>

                    <div className="flex flex-wrap gap-3">
                        <Button color="secondary" size="md" iconLeading={DownloadCloud02}>
                            Export
                        </Button>
                        <Button color="primary" size="md" iconLeading={Zap}>
                            Insights
                        </Button>
                    </div>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                    <RangeTabs label="Reporting period" />

                    <div className="ms-auto flex flex-wrap items-center gap-3">
                        <div className="max-md:hidden">
                            <DateRangePicker />
                        </div>
                        <Button color="secondary" size="md" iconLeading={FilterLines}>
                            Filters
                        </Button>
                    </div>
                </div>

                <div className="grid gap-5 md:grid-cols-3 lg:gap-6">
                    {/* The cards head themselves with an `h3`, so the group needs an `h2` above them. */}
                    <h2 className="sr-only">Traffic summary</h2>

                    {metrics.map((metric) => (
                        <MetricChart03
                            key={metric.title}
                            title={metric.title}
                            value={metric.value}
                            change={metric.change}
                            trend={metric.trend}
                            changeDescription="vs last month"
                            chartData={metric.chartData}
                            menu={<CardMenu />}
                        />
                    ))}
                </div>

                <ChartCard
                    title="Active users right now"
                    actions={
                        <Button color="secondary" size="md">
                            Real-time report
                        </Button>
                    }
                >
                    <div className="flex flex-col gap-8 lg:flex-row lg:items-center">
                        {/* A dotted world-map stand-in: the reference plots live sessions over a dot grid. */}
                        <div className="bg-secondary relative flex min-h-56 flex-1 items-center justify-center overflow-hidden rounded-xl">
                            <BackgroundPattern pattern="circle" size="lg" className="text-utility-neutral-300 absolute inset-0 size-full" />
                            <p className="text-tertiary relative text-sm font-medium">Live sessions across 42 countries</p>
                        </div>

                        <div className="flex w-full shrink-0 flex-col gap-5 lg:w-72">
                            <p className="text-display-md text-primary font-semibold">10.8k</p>

                            <ul className="flex flex-col gap-4">
                                {countries.map((country) => (
                                    <li key={country.code} className="flex items-center gap-3">
                                        <img src={`/flags/${country.code}.svg`} alt="" className="h-5 w-7 shrink-0 rounded object-cover" />
                                        <div className="min-w-0 flex-1">
                                            <p className="text-secondary truncate text-sm font-medium">{country.name}</p>
                                            <ProgressBarBase value={country.share} className="mt-1.5 h-1.5" />
                                        </div>
                                        <span className="text-tertiary text-sm font-medium">{country.share}%</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </ChartCard>

                <ChartCard
                    title="How do you acquire users?"
                    actions={
                        <Button color="secondary" size="md">
                            Location report
                        </Button>
                    }
                >
                    <StackedBarChart label="User acquisition by channel and month" className="h-64" />
                </ChartCard>
            </div>
        </main>
    </div>
);
