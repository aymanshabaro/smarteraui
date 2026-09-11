"use client";

import { Bell01, Download01, Edit01, FilterLines, Plus, SearchLg, Settings01, Zap } from "@properui/icons";
import type { DemoAvatar } from "../../../utils/demo-assets";
import { avatar } from "../../../utils/demo-assets";
import { NavButton } from "../../application/app-navigation/base-components/nav-button";
import { HeaderNavigationBase } from "../../application/app-navigation/header-navigation";
import { DateRangePicker } from "../../application/date-picker/date-range-picker";
import { Table, TableCard } from "../../application/table/table";
import { TablePaginationMinimal, TablePaginationNumbered } from "../../application/table/table-pagination";
import { Tabs } from "../../application/tabs/tabs";
import { Avatar } from "../../base/avatar/avatar";
import { BadgeWithDot } from "../../base/badges/badges";
import { Button } from "../../base/buttons/button";
import { ButtonUtility } from "../../base/buttons/button-utility";
import { DropdownAvatar } from "../../base/dropdown/dropdown-avatar";
import { DropdownIconSimple } from "../../base/dropdown/dropdown-icon-simple";
import { Input } from "../../base/input/input";

const navItems = [
    { label: "Home", href: "/" },
    { label: "Dashboard", href: "/dashboard" },
    { label: "Projects", href: "/projects" },
    { label: "Tasks", href: "/tasks" },
    { label: "Reporting", href: "/reporting" },
    { label: "Users", href: "/users" },
];

const subNavItems = [
    { label: "Overview", href: "/dashboard/overview" },
    { label: "Notifications", href: "/dashboard/notifications" },
    { label: "Trade history", href: "/dashboard/trade-history" },
    { label: "Deposits", href: "/dashboard/deposits" },
    { label: "Withdrawals", href: "/dashboard/withdrawals" },
    { label: "Saved reports", href: "/dashboard/saved-reports" },
];

/** The upgrade CTA + utility icons + account avatar shown at the end of the header bar. */
const HeaderActions = () => (
    <>
        <Button size="sm" color="secondary" iconLeading={Zap}>
            Upgrade now
        </Button>

        <div className="flex gap-0.5">
            <NavButton icon={Settings01} label="Settings" href="/settings" tooltipPlacement="bottom" />
            <div className="relative">
                <NavButton icon={Bell01} label="Notifications" href="/notifications-01" tooltipPlacement="bottom" />
                <div className="bg-fg-error-primary absolute -end-0.25 -top-0.25 flex size-3.5 items-center justify-center rounded-full text-[10px] font-bold text-white">
                    2
                </div>
            </div>
        </div>

        <DropdownAvatar />
    </>
);

const tabs = [
    { id: "all", label: "All trades" },
    { id: "buy", label: "Buy" },
    { id: "sell", label: "Sell" },
];

type TradeStatus = "processing" | "success" | "declined";

interface Trade {
    id: string;
    ticker: string;
    company: string;
    amount: string;
    date: string;
    status: TradeStatus;
    person: DemoAvatar;
}

const trades: Trade[] = [
    { id: "tsla", ticker: "TSLA BUY", company: "Tesla, Inc.", amount: "$30,021.23", date: "Jan 13, 2026", status: "processing", person: avatar(0) },
    { id: "mtch", ticker: "MTCH SELL", company: "Match Group, Inc.", amount: "$10,045.00", date: "Jan 13, 2026", status: "success", person: avatar(1) },
    { id: "ddog", ticker: "DDOG BUY", company: "Datadog Inc.", amount: "$40,132.16", date: "Jan 13, 2026", status: "success", person: avatar(2) },
    {
        id: "arkg",
        ticker: "ARKG BUY",
        company: "ARK Genomic Revolution ETF",
        amount: "$22,665.12",
        date: "Jan 13, 2026",
        status: "declined",
        person: avatar(3),
    },
    { id: "sq", ticker: "SQ BUY", company: "Square, Inc.", amount: "$18,221.30", date: "Jan 12, 2026", status: "success", person: avatar(4) },
    { id: "mstr", ticker: "MSTR SELL", company: "MicroStrategy Inc.", amount: "$24,118.18", date: "Jan 12, 2026", status: "success", person: avatar(5) },
];

const statusColor: Record<TradeStatus, "gray" | "success" | "error"> = {
    processing: "gray",
    success: "success",
    declined: "error",
};

/** Informational page 01 — trade history table under a horizontal header navigation with a secondary nav row. */
export const Informational01 = () => (
    <div className="bg-primary flex flex-col">
        <HeaderNavigationBase activeUrl="/dashboard/trade-history" items={navItems} subItems={subNavItems} actions={<HeaderActions />} />

        <main className="bg-primary min-w-0 flex-1 pt-8 pb-16 lg:pt-12 lg:pb-24">
            <div className="max-w-container mx-auto mb-8 flex flex-col gap-5 px-4 lg:px-8">
                <div className="bg-primary relative flex flex-col gap-5">
                    <div className="flex flex-col gap-4 lg:flex-row">
                        <div className="flex flex-1 flex-col gap-0.5">
                            <h1 className="text-primary text-xl font-semibold">Trade history</h1>
                            <p className="text-tertiary text-md">View your team&apos;s trades and transactions.</p>
                        </div>

                        <div className="flex items-start gap-3">
                            <Button color="secondary" size="md" iconLeading={Download01}>
                                Export
                            </Button>
                            <Button color="primary" size="md" iconLeading={Plus}>
                                Add trade
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="flex w-full flex-col">
                    <Tabs defaultSelectedKey="all">
                        <Tabs.List type="underline" items={tabs}>
                            {(tab) => <Tabs.Item {...tab} />}
                        </Tabs.List>
                        {tabs.map((tab) => (
                            <Tabs.Panel key={tab.id} id={tab.id} />
                        ))}
                    </Tabs>
                </div>
            </div>

            <div className="max-w-container mx-auto flex flex-col gap-6 px-4 lg:px-8">
                <div className="flex flex-wrap gap-3">
                    <Input shortcut size="sm" aria-label="Search" placeholder="Search" icon={SearchLg} className="min-w-0 flex-1 sm:max-w-70" />

                    <div className="ms-auto flex shrink-0 items-center gap-3">
                        <div className="max-md:hidden">
                            <DateRangePicker />
                        </div>
                        <Button color="secondary" size="md" className="max-h-9" iconLeading={FilterLines}>
                            Filters
                        </Button>
                    </div>
                </div>

                <TableCard.Root className="-mx-4 rounded-none lg:mx-0 lg:rounded-xl">
                    <TableCard.Header
                        title="All trades"
                        badge="58 trades"
                        contentTrailing={
                            <div className="absolute end-6 top-5 lg:static">
                                <DropdownIconSimple />
                            </div>
                        }
                    />

                    <Table aria-label="Trades" selectionMode="multiple" defaultSelectedKeys={["tsla", "ddog", "arkg", "sq"]}>
                        <Table.Header>
                            <Table.Head id="trade" label="Trade" isRowHeader className="w-full" />
                            <Table.Head id="amount" label="Order amount" />
                            <Table.Head id="date" label="Delivery date" allowsSorting />
                            <Table.Head id="status" label="Status" />
                            <Table.Head id="executed-by" label="Executed by" />
                            <Table.Head id="actions">
                                <span className="sr-only">Actions</span>
                            </Table.Head>
                        </Table.Header>

                        <Table.Body items={trades}>
                            {(trade) => (
                                <Table.Row id={trade.id}>
                                    <Table.Cell>
                                        <div>
                                            <p className="text-primary text-sm font-medium whitespace-nowrap">{trade.ticker}</p>
                                            <p className="text-tertiary text-sm whitespace-nowrap">{trade.company}</p>
                                        </div>
                                    </Table.Cell>
                                    <Table.Cell className="whitespace-nowrap">{trade.amount}</Table.Cell>
                                    <Table.Cell className="whitespace-nowrap">{trade.date}</Table.Cell>
                                    <Table.Cell>
                                        <BadgeWithDot size="sm" type="modern" color={statusColor[trade.status]} className="capitalize">
                                            {trade.status}
                                        </BadgeWithDot>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <div className="flex items-center gap-3">
                                            <Avatar src={trade.person.src} alt="" size="sm" initials={trade.person.initials} />
                                            <div>
                                                <p className="text-primary text-sm font-medium">{trade.person.name}</p>
                                                <p className="text-tertiary text-sm">{trade.person.email}</p>
                                            </div>
                                        </div>
                                    </Table.Cell>
                                    <Table.Cell className="px-4">
                                        <div className="flex justify-end gap-0.5">
                                            <ButtonUtility size="xs" color="tertiary" tooltip="Download" icon={Download01} />
                                            <ButtonUtility size="xs" color="tertiary" tooltip="Edit" icon={Edit01} />
                                        </div>
                                    </Table.Cell>
                                </Table.Row>
                            )}
                        </Table.Body>
                    </Table>

                    <div className="max-lg:hidden">
                        <TablePaginationMinimal align="center" />
                    </div>
                </TableCard.Root>

                <div className="lg:hidden">
                    <TablePaginationNumbered className="mt-6 pt-4 md:pt-5" />
                </div>
            </div>
        </main>
    </div>
);
