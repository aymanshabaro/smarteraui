"use client";

import { useState } from "react";
import { DownloadCloud02, FilterLines, HomeLine, SearchLg } from "@smarteraui/icons";
import { SidebarNavigationSlim } from "@/components/application/app-navigation/sidebar-navigation/sidebar-slim";
import { Breadcrumbs } from "@/components/application/breadcrumbs/breadcrumbs";
import { DateRangePicker } from "@/components/application/date-picker/date-range-picker";
import { MetricChart01 } from "@/components/application/metrics/metrics";
import { Avatar } from "@/components/base/avatar/avatar";
import { Button } from "@/components/base/buttons/button";
import { Dropdown } from "@/components/base/dropdown/dropdown";
import { Input } from "@/components/base/input/input";
import { cx } from "@/utils/cx";
import {
    RangeTabs,
    TrendAreaChart,
    currentUser,
    navFooterItemsWithIcons,
    navItemsDualTier,
    purchases,
    sparklineDown,
    sparklineUp,
    styles,
} from "./dashboards-shared";

const metrics = [
    { title: "Today's revenue", value: "$1,280", change: "15%", trend: "positive" as const, chartData: sparklineUp },
    { title: "Today's orders", value: "14", change: "10%", trend: "negative" as const, chartData: sparklineDown },
    { title: "Avg. order value", value: "$91.42", change: "20%", trend: "positive" as const, chartData: sparklineUp },
];

const legend = [
    { year: "2026", className: "bg-utility-brand-600" },
    { year: "2025", className: "bg-utility-brand-400" },
    { year: "2024", className: "bg-utility-neutral-400" },
];

/** Dashboard 11 — a sales dashboard led by a full-width trend chart over a two-column activity feed. */
export const Dashboard11 = () => {
    const [activityColumns] = useState(() => [purchases.slice(0, 6), purchases.slice(6, 12)]);

    return (
        <div className={styles.page}>
            <SidebarNavigationSlim activeUrl="/dashboard/overview" items={navItemsDualTier} footerItems={navFooterItemsWithIcons} />

            <main className={styles.main}>
                <div className={cx("flex flex-col gap-6", styles.gutter)}>
                    <Breadcrumbs aria-label="Breadcrumb">
                        <Breadcrumbs.Item href="/" icon={HomeLine} aria-label="Home" />
                        <Breadcrumbs.Item href="/dashboard">Dashboard</Breadcrumbs.Item>
                        <Breadcrumbs.Item href="/dashboard/overview">Overview</Breadcrumbs.Item>
                    </Breadcrumbs>

                    <div className="flex flex-col gap-4 lg:flex-row lg:items-start">
                        <div className="flex flex-1 flex-col gap-1">
                            <h1 className={styles.pageTitle}>Welcome back, {currentUser.name.split(" ")[0]}</h1>
                            <p className={styles.pageSubtitle}>Your current sales summary and activity.</p>
                        </div>

                        <Input shortcut size="sm" aria-label="Search" placeholder="Search" icon={SearchLg} className="lg:w-80" />
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

                    <section className="flex flex-col gap-4">
                        <ul className="flex flex-wrap justify-end gap-4">
                            {legend.map((entry) => (
                                <li key={entry.year} className="text-tertiary flex items-center gap-1.5 text-sm font-medium">
                                    <span aria-hidden="true" className={cx("size-2 rounded-full", entry.className)} />
                                    {entry.year}
                                </li>
                            ))}
                        </ul>

                        <TrendAreaChart label="Revenue over the last 12 months" className="h-56 lg:h-64" />
                    </section>

                    <div className="grid gap-5 md:grid-cols-3 lg:gap-6">
                        {/* The cards head themselves with an `h3`, so the group needs an `h2` above them. */}
                        <h2 className="sr-only">Today's summary</h2>

                        {metrics.map((metric) => (
                            <MetricChart01
                                key={metric.title}
                                title={metric.title}
                                value={metric.value}
                                change={metric.change}
                                trend={metric.trend}
                                changeDescription="last mth"
                                chartData={metric.chartData}
                                menu={
                                    <Dropdown.Root>
                                        <Dropdown.DotsButton />
                                        <Dropdown.Popover className="w-40">
                                            <Dropdown.Menu>
                                                <Dropdown.Item>View report</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown.Popover>
                                    </Dropdown.Root>
                                }
                            />
                        ))}
                    </div>

                    <section className="flex flex-col gap-5">
                        <div className="flex flex-col gap-4 md:flex-row md:items-center">
                            <h2 className={cx(styles.cardTitle, "flex-1")}>Recent activity</h2>

                            <div className="flex flex-wrap gap-3">
                                <Button color="secondary" size="md" iconLeading={DownloadCloud02}>
                                    Download
                                </Button>
                                <Button color="primary" size="md" href="/activity">
                                    View all
                                </Button>
                            </div>
                        </div>

                        <div className="grid gap-x-8 gap-y-4 lg:grid-cols-2">
                            {activityColumns.map((column, columnIndex) => (
                                <ul key={columnIndex} className="flex flex-col gap-4">
                                    {column.map((entry, index) => (
                                        <li key={`${entry.name}-${index}`} className="flex items-start gap-3">
                                            <Avatar size="md" src={entry.src} alt="" status="online" />
                                            <div className="min-w-0 flex-1">
                                                <p className="text-secondary flex flex-wrap items-baseline gap-2 text-sm font-medium">
                                                    {entry.name}
                                                    <span className="text-tertiary text-xs font-normal">{entry.time}</span>
                                                </p>
                                                <p className="text-tertiary text-sm">
                                                    Purchased <span className="text-secondary font-medium">{entry.product}</span>
                                                </p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            ))}
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
};
