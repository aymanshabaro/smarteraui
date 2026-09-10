"use client";

import { DownloadCloud01, Plus } from "@properui/icons";
import { ActivityFeed } from "@/components/application/activity-feed/activity-feed";
import { FileUpload } from "@/components/application/file-upload/file-upload-base";
import { Table } from "@/components/application/table/table";
import { BadgeWithDot } from "@/components/base/badges/badges";
import { Button } from "@/components/base/buttons/button";
import { MastercardIcon, VisaIcon } from "@/components/foundations/payment-icons";
import { CreditCard } from "@/components/shared-assets/credit-card/credit-card";
import { avatar } from "@/utils/demo-assets";
import { StackedBarChart, TrendChart } from "./charts.a";
import { stackedSeries, trendSeries } from "./data.a";
import { DashboardHeader, DashboardMain, DashboardSection, cardsSubNavItems } from "./shell.a";
import { PanelMenu, RowActions, SegmentTabs } from "./widgets.a";

const owner = avatar(0);

const balances = [
    { label: "Current balance", value: "$1,440.40" },
    { label: "Current limit", value: "$15,000.00" },
    { label: "Budget this month", value: "$2,400.00" },
];

const wallet = [
    { holder: avatar(2).name, type: "gray-dark" as const, offset: "start-0 top-0 -rotate-3" },
    { holder: owner.name, type: "transparent-gradient" as const, offset: "start-4 top-10 -rotate-3" },
    { holder: avatar(1).name, type: "salmon-strip" as const, offset: "start-8 top-20 -rotate-3" },
];

const receipts = [
    {
        merchant: "Spotify",
        size: "200 KB",
        amount: "$18.99",
        category: "Subscriptions",
        color: "blue" as const,
        account: "Debit card",
        ends: "1234",
        card: "visa",
    },
    { merchant: "A Coffee", size: "220 KB", amount: "$4.50", category: "Dining", color: "pink" as const, account: "Debit card", ends: "1234", card: "visa" },
    {
        merchant: "Rosso Antico",
        size: "192 KB",
        amount: "$88.00",
        category: "Uncategorized",
        color: "gray" as const,
        account: "Credit card",
        ends: "5678",
        card: "mastercard",
    },
    {
        merchant: "Figma",
        size: "216 KB",
        amount: "$15.00",
        category: "Subscriptions",
        color: "blue" as const,
        account: "Debit card",
        ends: "1234",
        card: "visa",
    },
    { merchant: "TBF Bakery", size: "420 KB", amount: "$12.50", category: "Dining", color: "pink" as const, account: "Debit card", ends: "1234", card: "visa" },
    {
        merchant: "Fresh F&V",
        size: "512 KB",
        amount: "$40.20",
        category: "Groceries",
        color: "indigo" as const,
        account: "Debit card",
        ends: "1234",
        card: "visa",
    },
    {
        merchant: "Webflow",
        size: "196 KB",
        amount: "$192.00",
        category: "Uncategorized",
        color: "gray" as const,
        account: "Credit card",
        ends: "5678",
        card: "mastercard",
    },
];

const rangeTabs = ["12 months", "30 days", "7 days"];

/** Cards dashboard: the card wallet and balance summary beside the spending chart and receipt ledger. */
export const Dashboard15 = () => (
    <div className="bg-primary">
        <DashboardHeader activeUrl="/dashboard/your-cards" subItems={cardsSubNavItems} />

        <DashboardMain>
            <DashboardSection className="gap-0.5">
                <h1 className="text-primary text-xl font-semibold">Your cards</h1>
                <p className="text-tertiary text-md">Welcome back, {owner.name.split(" ")[0]}!</p>
            </DashboardSection>

            <DashboardSection className="gap-8 lg:flex-row lg:gap-10">
                <div className="border-secondary flex w-full flex-col gap-6 lg:w-80 lg:shrink-0 lg:border-e lg:pe-10">
                    <div className="flex flex-col gap-1">
                        <h2 className="text-md text-primary font-semibold">Overview</h2>
                        <p className="text-tertiary text-sm">Manage and track your card spending.</p>
                    </div>

                    <div className="bg-secondary relative h-64 overflow-hidden rounded-xl p-4">
                        {wallet.map((card) => (
                            <CreditCard
                                key={card.holder}
                                type={card.type}
                                width={230}
                                company="Proper."
                                cardHolder={card.holder}
                                className={`absolute ${card.offset}`}
                            />
                        ))}

                        <div className="absolute end-4 top-4 z-10">
                            <PanelMenu />
                        </div>
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
                        <h3 className="text-md text-primary font-semibold">Balances over time</h3>
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

                <div className="flex min-w-0 flex-1 flex-col gap-8">
                    <section className="flex flex-col gap-5">
                        <div className="flex flex-col gap-4 md:flex-row md:items-start">
                            <div className="flex flex-1 flex-col gap-1">
                                <h2 className="text-md text-primary font-semibold">Balance over time</h2>
                                <p className="text-tertiary text-sm">Compare spending over time.</p>
                            </div>

                            <div className="flex items-start gap-3">
                                <SegmentTabs label="Balance period" type="button-border" items={rangeTabs} />
                                <PanelMenu />
                            </div>
                        </div>

                        <TrendChart
                            className="h-60"
                            data={trendSeries}
                            xKey="month"
                            series={[
                                { key: "A", name: "This year" },
                                { key: "B", name: "Last year", dashed: true },
                            ]}
                        />
                    </section>

                    <section className="flex flex-col gap-5">
                        <div className="flex flex-wrap items-center justify-between gap-4">
                            <h2 className="text-md text-primary font-semibold">Receipts</h2>

                            <div className="flex gap-3">
                                <Button color="secondary" size="md" iconLeading={DownloadCloud01}>
                                    Export
                                </Button>
                                <Button color="primary" size="md" iconLeading={Plus}>
                                    Add
                                </Button>
                            </div>
                        </div>

                        <FileUpload.DropZone hint="SVG, PNG, JPG or GIF (max. 800x400px)" />

                        <div className="overflow-x-auto">
                            <Table aria-label="Receipts">
                                <Table.Header>
                                    <Table.Head id="merchant" label="Merchant" isRowHeader allowsSorting className="w-full" />
                                    <Table.Head id="amount" label="Amount" allowsSorting />
                                    <Table.Head id="category" label="Category" tooltip="Auto-scanned" />
                                    <Table.Head id="account" label="Account" tooltip="Auto-scanned" />
                                    <Table.Head id="actions">
                                        <span className="sr-only">Actions</span>
                                    </Table.Head>
                                </Table.Header>

                                <Table.Body items={receipts}>
                                    {(item) => (
                                        <Table.Row id={item.merchant}>
                                            <Table.Cell>
                                                <ActivityFeed.File type="pdf" name={item.merchant} size={item.size} className="whitespace-nowrap" />
                                            </Table.Cell>
                                            <Table.Cell>{item.amount}</Table.Cell>
                                            <Table.Cell>
                                                <BadgeWithDot size="sm" type="pill-color" color={item.color}>
                                                    {item.category}
                                                </BadgeWithDot>
                                            </Table.Cell>
                                            <Table.Cell>
                                                <div className="flex items-center gap-3 whitespace-nowrap">
                                                    {item.card === "visa" ? <VisaIcon className="h-6 w-8.5" /> : <MastercardIcon className="h-6 w-8.5" />}
                                                    <div>
                                                        <p className="text-primary text-sm font-medium">{item.account}</p>
                                                        <p className="text-tertiary text-sm">Ends in {item.ends}</p>
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

                        <Button color="secondary" size="md" className="self-end">
                            View full report
                        </Button>
                    </section>
                </div>
            </DashboardSection>
        </DashboardMain>
    </div>
);
