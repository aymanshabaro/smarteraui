"use client";

import { Plus, SearchLg } from "@properui/icons";
import { SidebarNavigationSlim } from "@/components/application/app-navigation/sidebar-navigation/sidebar-slim";
import { Button } from "@/components/base/buttons/button";
import { Dropdown } from "@/components/base/dropdown/dropdown";
import { Input } from "@/components/base/input/input";
import { cx } from "@/utils/cx";
import {
    DonutChart,
    RangeTabs,
    StackedBarChart,
    TrafficRadarChart,
    TrendAreaChart,
    navFooterItemsWithIcons,
    navItemsDualTier,
    styles,
} from "./dashboards-shared";

const overview = [
    { label: "Users", value: "8.8k", change: "7.4%", trend: "positive" as const },
    { label: "Sessions", value: "10.2k", change: "7.4%", trend: "positive" as const },
    { label: "Bounce rate", value: "46.2%", change: "0.2%", trend: "negative" as const },
    { label: "Session duration", value: "4m 4s", change: "7.4%", trend: "positive" as const },
];

const analyticsPresets = [
    { id: "12-months", long: "12 months" },
    { id: "30-days", long: "30 days" },
    { id: "7-days", long: "7 days" },
    { id: "custom", long: "Custom" },
];

const acquisitionPresets = [
    { id: "channel", long: "Traffic channel" },
    { id: "source", long: "Source" },
    { id: "referrals", long: "Referrals" },
];

const countries = [
    { name: "USA", value: 34, className: "fill-utility-brand-600", dot: "bg-utility-brand-600" },
    { name: "India", value: 24, className: "fill-utility-brand-500", dot: "bg-utility-brand-500" },
    { name: "UK", value: 18, className: "fill-utility-brand-400", dot: "bg-utility-brand-400" },
    { name: "Australia", value: 14, className: "fill-utility-brand-300", dot: "bg-utility-brand-300" },
    { name: "Canada", value: 10, className: "fill-utility-neutral-400", dot: "bg-utility-neutral-400" },
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

/** Dashboard 17 — a website analytics dashboard: an overview strip, a radar and a country donut. */
export const Dashboard17 = () => (
    <div className={styles.page}>
        <SidebarNavigationSlim activeUrl="/reporting" items={navItemsDualTier} footerItems={navFooterItemsWithIcons} />

        <main className={styles.main}>
            <div className={cx("flex flex-col gap-8", styles.gutter)}>
                <div className="flex flex-col gap-4 md:flex-row md:items-center">
                    <h1 className={cx(styles.pageTitle, "flex-1")}>Website analytics</h1>
                    <Input shortcut size="sm" aria-label="Search" placeholder="Search" icon={SearchLg} className="md:w-80" />
                </div>

                <div className="flex flex-col gap-8 xl:flex-row xl:gap-10">
                    <section className="flex min-w-0 flex-1 flex-col gap-5">
                        <div className="border-secondary flex items-center gap-4 border-b pb-4">
                            <h2 className={cx(styles.cardTitle, "flex-1")}>Overview</h2>
                            <CardMenu />
                        </div>

                        <dl className="grid grid-cols-2 gap-x-8 gap-y-5 lg:grid-cols-4">
                            {overview.map((metric) => (
                                <div key={metric.label} className="flex flex-col gap-1">
                                    <dt className={styles.caption}>{metric.label}</dt>
                                    <dd className="flex flex-wrap items-baseline gap-2">
                                        <span className="text-display-sm text-primary font-semibold">{metric.value}</span>
                                        <span
                                            className={cx("text-sm font-medium", metric.trend === "positive" ? "text-success-primary" : "text-error-primary")}
                                        >
                                            {metric.trend === "positive" ? "↑" : "↓"} {metric.change}
                                        </span>
                                    </dd>
                                </div>
                            ))}
                        </dl>

                        <TrendAreaChart label="Users, sessions and bounce rate over the last 12 months" className="h-56" />

                        <div className="flex flex-wrap items-center gap-3">
                            <RangeTabs label="Analytics period" presets={analyticsPresets} />
                            <Button color="secondary" size="md" className="ms-auto">
                                Audience overview
                            </Button>
                        </div>
                    </section>

                    <section className="flex w-full shrink-0 flex-col gap-5 xl:w-80">
                        <div className="border-secondary flex items-center gap-4 border-b pb-4">
                            <h2 className={cx(styles.cardTitle, "flex-1")}>Traffic sources</h2>
                            <CardMenu />
                        </div>

                        <TrafficRadarChart label="Traffic sources by weekday" />
                    </section>
                </div>

                <div className="flex flex-col gap-8 xl:flex-row xl:gap-10">
                    <section className="flex min-w-0 flex-1 flex-col gap-5">
                        <div className="border-secondary flex items-center gap-4 border-b pb-4">
                            <h2 className={cx(styles.cardTitle, "flex-1")}>How do you acquire users?</h2>
                            <CardMenu />
                        </div>

                        <div className="flex flex-wrap items-center gap-3">
                            <RangeTabs label="Acquisition breakdown" presets={acquisitionPresets} />
                            <Button color="secondary" size="md" iconLeading={Plus} className="ms-auto">
                                Custom
                            </Button>
                        </div>

                        <StackedBarChart label="User acquisition by channel and month" className="h-64" />
                    </section>

                    <section className="flex w-full shrink-0 flex-col gap-5 xl:w-80">
                        <div className="border-secondary flex items-center gap-4 border-b pb-4">
                            <h2 className={cx(styles.cardTitle, "flex-1")}>Sessions by country</h2>
                            <CardMenu />
                        </div>

                        <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-center xl:flex-col">
                            <DonutChart label="Sessions by country" data={countries} className="size-48 shrink-0" />

                            <ul className="flex flex-col gap-2">
                                {countries.map((country) => (
                                    <li key={country.name} className="text-tertiary flex items-center gap-2 text-sm font-medium">
                                        <span aria-hidden="true" className={cx("size-2 rounded-full", country.dot)} />
                                        {country.name}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </section>
                </div>
            </div>
        </main>
    </div>
);
