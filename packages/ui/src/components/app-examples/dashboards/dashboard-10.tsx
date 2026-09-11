"use client";

import { useState } from "react";
import type { Key } from "react-aria";
import { DownloadCloud02, FilterLines, Plus, UserPlus01 } from "@properui/icons";
import { cx } from "../../../utils/cx";
import { SidebarNavigationDualTier } from "../../application/app-navigation/sidebar-navigation/sidebar-dual-tier";
import { DateRangePicker } from "../../application/date-picker/date-range-picker";
import { MetricSimple } from "../../application/metrics/metrics";
import { Tabs } from "../../application/tabs/tabs";
import { Avatar } from "../../base/avatar/avatar";
import { Button } from "../../base/buttons/button";
import { ButtonUtility } from "../../base/buttons/button-utility";
import { Dropdown } from "../../base/dropdown/dropdown";
import { ChartCard, RangeTabs, StackedBarChart, TrendAreaChart, navFooterItemsWithIcons, navItemsDualTier, purchases, styles } from "./dashboards-shared";

const views = [
    { id: "default", label: "Default" },
    { id: "saved", label: "Saved view" },
    { id: "sdr", label: "SDR view" },
];

const salesPresets = [
    { id: "12-months", long: "12 months" },
    { id: "3-months", long: "3 months" },
    { id: "30-days", long: "30 days" },
    { id: "7-days", long: "7 days" },
    { id: "24-hours", long: "24 hours" },
];

const metrics = [
    { title: "Today's revenue", value: "$1,280", change: "10%", trend: "positive" as const },
    { title: "Today's orders", value: "14", change: "12%", trend: "positive" as const },
    { title: "Avg. order value", value: "$91.42", change: "2%", trend: "negative" as const },
];

/** Dashboard 10 — a sales overview with saved views, two report cards and an activity rail. */
export const Dashboard10 = () => {
    const [view, setView] = useState<Key>("saved");

    return (
        <div className={styles.page}>
            <SidebarNavigationDualTier activeUrl="/dashboard" items={navItemsDualTier} footerItems={navFooterItemsWithIcons} />

            <main className={styles.main}>
                <div className={cx("flex flex-col gap-6", styles.gutter)}>
                    <div className="flex flex-col gap-4 md:flex-row md:items-start">
                        <div className="flex flex-1 flex-col gap-1">
                            <h1 className={styles.pageTitle}>Sales overview</h1>
                            <p className={styles.pageSubtitle}>Your current sales summary and activity.</p>
                        </div>

                        <div className="flex flex-wrap gap-3">
                            <Button color="secondary" size="md" iconLeading={DownloadCloud02}>
                                Export report
                            </Button>
                            <Button color="primary" size="md" iconLeading={UserPlus01}>
                                Invite
                            </Button>
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                        <Tabs selectedKey={view} onSelectionChange={setView} className="w-auto">
                            <Tabs.List aria-label="Saved views" type="button-minimal">
                                {views.map((item) => (
                                    <Tabs.Item key={item.id} id={item.id} label={item.label} />
                                ))}
                            </Tabs.List>
                            {views.map((item) => (
                                <Tabs.Panel key={item.id} id={item.id} />
                            ))}
                        </Tabs>

                        <ButtonUtility size="sm" color="tertiary" tooltip="Add view" icon={Plus} />

                        <div className="ms-auto flex flex-wrap items-center gap-3">
                            <div className="max-md:hidden">
                                <DateRangePicker />
                            </div>
                            <Button color="secondary" size="md" iconLeading={FilterLines}>
                                Filters
                            </Button>
                        </div>
                    </div>

                    <div className="flex flex-col gap-6 xl:flex-row xl:gap-8">
                        <div className="flex min-w-0 flex-1 flex-col gap-5 lg:gap-6">
                            <div className="grid gap-5 md:grid-cols-3 lg:gap-6">
                                {/* The cards head themselves with an `h3`, so the group needs an `h2` above them. */}
                                <h2 className="sr-only">Today's summary</h2>

                                {metrics.map((metric) => (
                                    <MetricSimple
                                        key={metric.title}
                                        title={metric.title}
                                        value={metric.value}
                                        change={metric.change}
                                        trend={metric.trend}
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

                            <ChartCard
                                title="Sales report"
                                actions={
                                    <Button color="secondary" size="md">
                                        View report
                                    </Button>
                                }
                            >
                                <div className="flex flex-col gap-5">
                                    <RangeTabs label="Sales report period" presets={salesPresets} type="button-gray" />
                                    <TrendAreaChart label="Sales over the last 12 months" showComparison={false} className="h-56" />
                                </div>
                            </ChartCard>

                            <ChartCard
                                title="Store traffic"
                                actions={
                                    <Button color="secondary" size="md">
                                        View report
                                    </Button>
                                }
                            >
                                <div className="flex flex-col gap-5">
                                    <RangeTabs label="Store traffic period" presets={salesPresets} type="button-gray" />
                                    <StackedBarChart label="Store traffic by month" className="h-56" />
                                </div>
                            </ChartCard>
                        </div>

                        <section className="flex w-full shrink-0 flex-col gap-5 xl:w-72">
                            <div className="border-secondary flex items-center gap-4 border-b pb-4">
                                <h2 className={cx(styles.cardTitle, "flex-1")}>Activity</h2>
                                <Button color="link-color" size="sm" href="/activity">
                                    View all
                                </Button>
                            </div>

                            <ul className="flex flex-col gap-4">
                                {purchases.map((entry, index) => (
                                    <li key={`${entry.name}-${index}`} className="flex items-center gap-3">
                                        <Avatar size="md" src={entry.src} alt="" status={index === 0 ? "online" : undefined} />
                                        <p className="text-tertiary min-w-0 flex-1 text-sm">
                                            <span className="text-secondary block font-medium">{entry.name}</span>
                                            Purchased <span className="text-secondary font-medium">{entry.product}</span>
                                        </p>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    </div>
                </div>
            </main>
        </div>
    );
};
