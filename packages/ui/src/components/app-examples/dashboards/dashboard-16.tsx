"use client";

import { useState } from "react";
import type { Key } from "react-aria";
import { DownloadCloud02, Edit01, HomeLine, PiggyBank01, RefreshCcw01, SearchLg, Umbrella03 } from "@smarteraui/icons";
import { SidebarNavigationSlim } from "@/components/application/app-navigation/sidebar-navigation/sidebar-slim";
import { Table } from "@/components/application/table/table";
import { Tabs } from "@/components/application/tabs/tabs";
import { Avatar } from "@/components/base/avatar/avatar";
import { Badge, BadgeWithDot } from "@/components/base/badges/badges";
import { Button } from "@/components/base/buttons/button";
import { ButtonUtility } from "@/components/base/buttons/button-utility";
import { Dropdown } from "@/components/base/dropdown/dropdown";
import { Input } from "@/components/base/input/input";
import { ProgressBarBase } from "@/components/base/progress-indicators/progress-indicators";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";
import { MastercardIcon, VisaIcon } from "@/components/foundations/payment-icons";
import { CreditCard } from "@/components/shared-assets/credit-card/credit-card";
import { cx } from "@/utils/cx";
import { RangeTabs, StackedBarChart, TrendAreaChart, currentUser, navFooterItemsWithIcons, navItemsDualTier, styles, transactions } from "./dashboards-shared";

const pots = [
    { label: "Home deposit", value: "$64,240.60", progress: 62, icon: HomeLine },
    { label: "Holiday", value: "$2,220.42", progress: 48, icon: Umbrella03 },
    { label: "Savings", value: "$41,382.80", progress: 74, icon: PiggyBank01 },
];

const transactionTabs = [
    { id: "all", label: "View all" },
    { id: "monitored", label: "Monitored" },
    { id: "unmonitored", label: "Unmonitored" },
];

const detailTabs = [
    { id: "overview", label: "Overview" },
    { id: "budget", label: "Budget" },
    { id: "spending", label: "Spending" },
    { id: "rewards", label: "Rewards" },
];

const balancePresets = [
    { id: "12-months", long: "12 months" },
    { id: "30-days", long: "30 days" },
    { id: "7-days", long: "7 days" },
];

const balances = [
    { label: "Current balance", value: "$1,240.40" },
    { label: "Current limit", value: "$15,000.00" },
    { label: "Budget this month", value: "$2,400.00" },
];

const categoryColors: Record<string, "brand" | "error" | "success" | "warning"> = {
    Subscriptions: "brand",
    "Food and dining": "error",
    Income: "success",
    Groceries: "warning",
};

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

/** Dashboard 16 — a fintech dashboard: balance, savings pots and a ledger beside a cards rail. */
export const Dashboard16 = () => {
    const [transactionTab, setTransactionTab] = useState<Key>("all");
    const [detail, setDetail] = useState<Key>("overview");

    return (
        <div className={styles.page}>
            <SidebarNavigationSlim activeUrl="/dashboard" items={navItemsDualTier} footerItems={navFooterItemsWithIcons} />

            <div className="flex min-w-0 flex-1 flex-col xl:flex-row">
                <main className="bg-primary min-w-0 flex-1 pt-8 pb-12">
                    <div className={cx("flex flex-col gap-6", styles.gutter)}>
                        <div className="flex flex-col gap-4 md:flex-row md:items-start">
                            <h1 className={cx(styles.pageTitle, "flex-1")}>Welcome back, {currentUser.name.split(" ")[0]}</h1>

                            <div className="flex flex-wrap gap-3">
                                <Button color="secondary" size="md">
                                    Messages
                                </Button>
                                <Button color="primary" size="md" iconLeading={RefreshCcw01}>
                                    Sync
                                </Button>
                            </div>
                        </div>

                        <section className={cx(styles.card, "flex flex-col gap-5 px-4 py-5 md:px-6")}>
                            <div className="flex flex-col gap-4 md:flex-row md:items-start">
                                <div className="flex flex-1 flex-col gap-2">
                                    <h2 className={styles.cardTitle}>Total balance</h2>
                                    <div className="flex flex-wrap items-center gap-3">
                                        <span className="text-display-md text-primary font-semibold">$107,843.82</span>
                                        <BadgeWithDot size="sm" type="pill-color" color="success">
                                            7.2%
                                        </BadgeWithDot>
                                    </div>
                                </div>

                                <Button color="secondary" size="md">
                                    View report
                                </Button>
                            </div>

                            <TrendAreaChart label="Total balance over the last 12 months" showComparison className="h-56" />
                        </section>

                        <div className="grid gap-5 md:grid-cols-3 lg:gap-6">
                            {pots.map((pot) => (
                                <section key={pot.label} className={cx(styles.card, "relative flex flex-col gap-4 px-4 py-5 md:px-6")}>
                                    <FeaturedIcon size="lg" theme="light" color="brand" icon={pot.icon} />
                                    <div className="flex flex-col gap-1">
                                        <p className={styles.caption}>{pot.label}</p>
                                        <p className="text-display-sm text-primary font-semibold">{pot.value}</p>
                                    </div>
                                    <ProgressBarBase value={pot.progress} />

                                    <div className="absolute end-4 top-4 md:end-5 md:top-5">
                                        <CardMenu />
                                    </div>
                                </section>
                            ))}
                        </div>

                        <section className="flex flex-col gap-5">
                            <div className="flex flex-col gap-4 md:flex-row md:items-center">
                                <div className="flex flex-1 items-center gap-2">
                                    <h2 className={styles.cardTitle}>Recent transactions</h2>
                                    <Badge size="sm" type="modern" color="gray">
                                        7 transactions
                                    </Badge>
                                </div>

                                <div className="flex flex-wrap gap-3">
                                    <Button color="secondary" size="md" iconLeading={DownloadCloud02}>
                                        Download
                                    </Button>
                                    <Button color="secondary" size="md">
                                        View report
                                    </Button>
                                </div>
                            </div>

                            <div className="flex flex-col gap-4 md:flex-row md:items-center">
                                <Tabs selectedKey={transactionTab} onSelectionChange={setTransactionTab} className="w-auto">
                                    <Tabs.List aria-label="Transaction filter" type="button-minimal">
                                        {transactionTabs.map((tab) => (
                                            <Tabs.Item key={tab.id} id={tab.id} label={tab.label} />
                                        ))}
                                    </Tabs.List>
                                    {transactionTabs.map((tab) => (
                                        <Tabs.Panel key={tab.id} id={tab.id} />
                                    ))}
                                </Tabs>

                                <Input
                                    shortcut
                                    size="sm"
                                    aria-label="Search transactions"
                                    placeholder="Search"
                                    icon={SearchLg}
                                    className="md:ms-auto md:w-72"
                                />
                            </div>

                            <Table aria-label="Recent transactions">
                                <Table.Header>
                                    <Table.Head id="transaction" label="Transaction" isRowHeader className="w-full" />
                                    <Table.Head id="amount" label="Amount" />
                                    <Table.Head id="date" label="Date" className="max-md:hidden" />
                                    <Table.Head id="category" label="Category" className="max-lg:hidden" />
                                    <Table.Head id="account" label="Account" className="max-lg:hidden" />
                                    <Table.Head id="actions">
                                        <span className="sr-only">Actions</span>
                                    </Table.Head>
                                </Table.Header>

                                <Table.Body items={transactions}>
                                    {(transaction) => (
                                        <Table.Row id={transaction.id}>
                                            <Table.Cell>
                                                <div className="flex items-center gap-3">
                                                    <Avatar size="md" initials={transaction.initials} />
                                                    <span className="text-primary text-sm font-medium whitespace-nowrap">{transaction.merchant}</span>
                                                </div>
                                            </Table.Cell>
                                            <Table.Cell
                                                className={cx("whitespace-nowrap", transaction.isIncome ? "text-success-primary font-medium" : undefined)}
                                            >
                                                {transaction.isIncome ? "+" : "−"} ${transaction.amount}
                                            </Table.Cell>
                                            <Table.Cell className="whitespace-nowrap max-md:hidden">{transaction.date}</Table.Cell>
                                            <Table.Cell className="max-lg:hidden">
                                                <BadgeWithDot size="sm" type="pill-color" color={categoryColors[transaction.category]}>
                                                    {transaction.category}
                                                </BadgeWithDot>
                                            </Table.Cell>
                                            <Table.Cell className="max-lg:hidden">
                                                <div className="flex items-center gap-3">
                                                    {transaction.account === "Visa" ? (
                                                        <VisaIcon aria-hidden="true" className="h-6 w-auto" />
                                                    ) : (
                                                        <MastercardIcon aria-hidden="true" className="h-6 w-auto" />
                                                    )}
                                                    <div className="whitespace-nowrap">
                                                        <p className="text-primary text-sm font-medium">{transaction.account} 1234</p>
                                                        <p className="text-tertiary text-sm">Expiry 06/2028</p>
                                                    </div>
                                                </div>
                                            </Table.Cell>
                                            <Table.Cell className="px-4">
                                                <div className="flex justify-end">
                                                    <ButtonUtility size="xs" color="tertiary" tooltip="Edit" icon={Edit01} />
                                                </div>
                                            </Table.Cell>
                                        </Table.Row>
                                    )}
                                </Table.Body>
                            </Table>
                        </section>
                    </div>
                </main>

                <aside className="border-secondary flex w-full shrink-0 flex-col gap-6 px-4 pt-8 pb-12 md:px-6 xl:w-96 xl:border-s">
                    <div className="flex items-center gap-4">
                        <h2 className={cx(styles.cardTitle, "flex-1")}>Your cards</h2>
                        <CardMenu />
                    </div>

                    <div className="flex gap-4 overflow-x-auto pb-2">
                        {[0, 1, 2].map((index) => (
                            <div key={index} className="flex shrink-0 flex-col gap-3">
                                <CreditCard type="brand-light" width={280} cardHolder={currentUser.name.toUpperCase()} company="Smartera." />
                                <div className="flex items-center justify-between">
                                    <span className="text-tertiary text-sm font-medium">This month</span>
                                    <span className="text-primary text-sm font-medium">$1,240.40</span>
                                </div>
                                <ProgressBarBase value={62} />
                            </div>
                        ))}
                    </div>

                    <Tabs selectedKey={detail} onSelectionChange={setDetail}>
                        <Tabs.List aria-label="Card details" type="underline">
                            {detailTabs.map((tab) => (
                                <Tabs.Item key={tab.id} id={tab.id} label={tab.label} />
                            ))}
                        </Tabs.List>
                        {detailTabs.map((tab) => (
                            <Tabs.Panel key={tab.id} id={tab.id} />
                        ))}
                    </Tabs>

                    <dl className="flex flex-col gap-4">
                        {balances.map((balance) => (
                            <div key={balance.label} className="flex items-baseline justify-between gap-4">
                                <dt className={styles.caption}>{balance.label}</dt>
                                <dd className="text-primary text-xl font-semibold">{balance.value}</dd>
                            </div>
                        ))}
                    </dl>

                    <section className="flex flex-col gap-4">
                        <div className="flex items-center gap-4">
                            <h3 className={cx(styles.cardTitle, "flex-1")}>Balance over time</h3>
                            <CardMenu />
                        </div>

                        <RangeTabs label="Balance period" presets={balancePresets} />
                        <StackedBarChart label="Balance by month" className="h-48" />

                        <Button color="link-color" size="md" href="/reports" className="self-start">
                            View full report
                        </Button>
                    </section>
                </aside>
            </div>
        </div>
    );
};
