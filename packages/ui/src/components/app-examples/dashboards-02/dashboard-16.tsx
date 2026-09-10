"use client";

import { DownloadCloud01, HomeLine, PiggyBank01, RefreshCcw01, SearchLg, Umbrella03 } from "@properui/icons";
import { MetricChangeIndicator } from "@/components/application/metrics/metrics-base";
import { PaginationDot } from "@/components/application/pagination/pagination-dot";
import { Table } from "@/components/application/table/table";
import { Avatar } from "@/components/base/avatar/avatar";
import { Badge } from "@/components/base/badges/badges";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
import { ProgressBarBase } from "@/components/base/progress-indicators/progress-indicators";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";
import { MastercardIcon, VisaIcon } from "@/components/foundations/payment-icons";
import { CreditCard } from "@/components/shared-assets/credit-card/credit-card";
import { avatar } from "@/utils/demo-assets";
import { StackedBarChart, TrendChart } from "./charts.a";
import { stackedSeries, transactions, trendSeries } from "./data.a";
import { DashboardHeader, DashboardMain, DashboardSection } from "./shell.a";
import { PanelMenu, RowActions, SegmentTabs, styles } from "./widgets.a";

const owner = avatar(0);

const balances = [
    { label: "Current balance", value: "$1,240.40" },
    { label: "Current limit", value: "$15,000.00" },
    { label: "Budget this month", value: "$2,400.00" },
];

const pots = [
    { name: "Home deposit", value: "$64,240.60", progress: 62, icon: HomeLine },
    { name: "Holiday", value: "$2,220.42", progress: 38, icon: Umbrella03 },
    { name: "Savings", value: "$41,382.80", progress: 48, icon: PiggyBank01 },
];

const rangeTabs = ["12 months", "30 days", "7 days"];

/** Fintech dashboard: the card wallet and savings pots beside the balance trend and transaction ledger. */
export const Dashboard16 = () => (
    <div className="bg-primary">
        <DashboardHeader account="card" search settings={false} />

        <DashboardMain>
            <DashboardSection className="gap-5">
                <div className="border-secondary flex flex-col gap-4 border-b pb-5 lg:flex-row">
                    <h1 className="text-primary flex-1 text-xl font-semibold">Welcome back, {owner.name.split(" ")[0]}</h1>

                    <div className="flex gap-3">
                        <Button color="secondary" size="md">
                            Messages
                        </Button>
                        <Button color="primary" size="md" iconLeading={RefreshCcw01}>
                            Sync
                        </Button>
                    </div>
                </div>
            </DashboardSection>

            <DashboardSection className="gap-8 lg:flex-row lg:gap-10">
                <div className="flex w-full flex-col gap-6 lg:w-80 lg:shrink-0">
                    <div className="bg-brand-solid flex flex-col gap-5 rounded-xl p-4">
                        <CreditCard type="transparent" width={280} company="Proper." cardHolder={owner.name.toUpperCase()} />

                        <div className="flex flex-col gap-2">
                            <div className="flex justify-between gap-4 text-sm font-medium text-white">
                                <span>This month</span>
                                <span>$1,240.40</span>
                            </div>
                            <ProgressBarBase value={52} className="bg-white/30" progressClassName="bg-white" />
                        </div>

                        <PaginationDot page={1} total={3} className="self-center" />
                    </div>

                    <SegmentTabs label="Card view" type="underline" items={["Overview", "Budget", "Spending", "Rewards"]} />

                    <dl className="flex flex-col gap-4">
                        {balances.map((balance) => (
                            <div key={balance.label} className="flex items-center justify-between gap-4">
                                <dt className="text-secondary text-sm font-medium">{balance.label}</dt>
                                <dd className="text-primary text-xl font-semibold">{balance.value}</dd>
                            </div>
                        ))}
                    </dl>

                    <div className="flex flex-col gap-5">
                        <h2 className="text-md text-primary font-semibold">Balances over time</h2>
                        <SegmentTabs label="Balances period" type="button-border" items={rangeTabs} />
                        <StackedBarChart
                            className="h-44"
                            data={stackedSeries}
                            xKey="month"
                            series={[
                                { key: "A", name: "Essentials" },
                                { key: "B", name: "Lifestyle" },
                            ]}
                        />
                    </div>

                    <Button color="secondary" size="md" className="self-end">
                        View full report
                    </Button>
                </div>

                <div className="flex min-w-0 flex-1 flex-col gap-6">
                    <section className={`${styles.panel.root} flex flex-col gap-5 px-4 py-5 lg:p-6`}>
                        <div className="flex items-start justify-between gap-4">
                            <h2 className="text-md text-primary font-semibold">Total balance</h2>
                            <Button color="secondary" size="md">
                                View report
                            </Button>
                        </div>

                        <div className="flex items-center gap-3">
                            <p className="text-display-sm text-primary font-semibold">$107,843.82</p>
                            <MetricChangeIndicator type="simple" icon="arrow">
                                7.2%
                            </MetricChangeIndicator>
                        </div>

                        <TrendChart
                            className="h-56"
                            data={trendSeries}
                            xKey="month"
                            series={[
                                { key: "A", name: "This year" },
                                { key: "B", name: "Last year" },
                            ]}
                        />
                    </section>

                    <div className="flex flex-col gap-5 md:flex-row md:flex-wrap lg:gap-6">
                        {pots.map((pot) => (
                            <section key={pot.name} className={`${styles.panel.root} relative flex flex-1 flex-col gap-4 px-4 py-5 md:min-w-56 lg:p-6`}>
                                <FeaturedIcon size="md" theme="modern" color="gray" icon={pot.icon} />

                                <div className="flex flex-col gap-1">
                                    <h3 className="text-tertiary text-sm font-medium">{pot.name}</h3>
                                    <p className="text-display-sm text-primary font-semibold">{pot.value}</p>
                                </div>

                                <ProgressBarBase value={pot.progress} />

                                <div className="absolute end-4 top-4 lg:end-6 lg:top-6">
                                    <PanelMenu />
                                </div>
                            </section>
                        ))}
                    </div>

                    <section className={`${styles.panel.root} flex flex-col`}>
                        <div className="border-secondary flex flex-col items-start gap-4 border-b px-4 py-5 md:flex-row md:px-6">
                            <div className="flex flex-1 items-center gap-2">
                                <h2 className="text-md text-primary font-semibold">Recent transactions</h2>
                                <Badge size="sm" type="modern" color="gray">
                                    7 transactions
                                </Badge>
                            </div>

                            <div className="flex gap-3">
                                <Button color="secondary" size="md" iconLeading={DownloadCloud01}>
                                    Download
                                </Button>
                                <Button color="secondary" size="md">
                                    View report
                                </Button>
                            </div>
                        </div>

                        <div className="border-secondary flex flex-wrap gap-3 border-b px-4 py-3 max-md:flex-col md:px-6">
                            <SegmentTabs label="Transaction status" items={["View all", "Monitored", "Unmonitored"]} />
                            <Input
                                shortcut
                                aria-label="Search transactions"
                                placeholder="Search"
                                icon={SearchLg}
                                size="sm"
                                className="min-w-0 max-md:flex-1 md:ms-auto md:w-70"
                            />
                        </div>

                        <div className="overflow-x-auto">
                            <Table aria-label="Recent transactions">
                                <Table.Header>
                                    <Table.Head id="merchant" label="Transaction" isRowHeader allowsSorting className="w-full" />
                                    <Table.Head id="amount" label="Amount" allowsSorting />
                                    <Table.Head id="date" label="Date" allowsSorting />
                                    <Table.Head id="account" label="Account" allowsSorting />
                                    <Table.Head id="actions">
                                        <span className="sr-only">Actions</span>
                                    </Table.Head>
                                </Table.Header>

                                <Table.Body items={transactions}>
                                    {(item) => (
                                        <Table.Row id={item.merchant + item.time}>
                                            <Table.Cell>
                                                <div className="flex items-center gap-3 whitespace-nowrap">
                                                    <Avatar size="md" initials={item.initials} alt="" />
                                                    <span className="text-primary text-sm font-medium">{item.merchant}</span>
                                                </div>
                                            </Table.Cell>
                                            <Table.Cell className="whitespace-nowrap">
                                                <span className={item.incoming ? "text-success-primary font-medium" : undefined}>
                                                    {item.incoming ? "+" : "−"} ${item.amount}
                                                </span>
                                            </Table.Cell>
                                            <Table.Cell className="whitespace-nowrap">{item.time}</Table.Cell>
                                            <Table.Cell>
                                                <div className="flex items-center gap-3 whitespace-nowrap">
                                                    {item.card === "Visa" ? <VisaIcon className="h-6 w-8.5" /> : <MastercardIcon className="h-6 w-8.5" />}
                                                    <div>
                                                        <p className="text-primary text-sm font-medium">{item.card} 1234</p>
                                                        <p className="text-tertiary text-sm">Expiry 06/2028</p>
                                                    </div>
                                                </div>
                                            </Table.Cell>
                                            <Table.Cell className="px-4">
                                                <RowActions />
                                            </Table.Cell>
                                        </Table.Row>
                                    )}
                                </Table.Body>
                            </Table>
                        </div>
                    </section>
                </div>
            </DashboardSection>
        </DashboardMain>
    </div>
);
