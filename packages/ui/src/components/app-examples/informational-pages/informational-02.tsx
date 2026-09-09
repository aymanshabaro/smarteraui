"use client";

import type { FC } from "react";
import {
    BarChartSquare02,
    CheckDone01,
    ClockFastForward,
    DownloadCloud01,
    FilterLines,
    Grid03,
    HomeLine,
    LineChartUp03,
    NotificationBox,
    PieChart03,
    Plus,
    Rows01,
    SearchLg,
    Settings03,
    Star01,
    User01,
    UserSquare,
    Users01,
    UsersPlus,
} from "@smarteraui/icons";
import type { NavItemType } from "@/components/application/app-navigation/config";
import { SidebarNavigationSlim } from "@/components/application/app-navigation/sidebar-navigation/sidebar-slim";
import { DateRangePicker } from "@/components/application/date-picker/date-range-picker";
import { Table, TableCard } from "@/components/application/table/table";
import { TablePaginationNumbered } from "@/components/application/table/table-pagination";
import { Avatar } from "@/components/base/avatar/avatar";
import { BadgeWithDot } from "@/components/base/badges/badges";
import { ButtonGroup, ButtonGroupItem } from "@/components/base/button-group/button-group";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
import type { DemoAvatar } from "@/utils/demo-assets";
import { avatar } from "@/utils/demo-assets";

const navItems: (NavItemType & { icon: FC<{ className?: string }> })[] = [
    { label: "Home", href: "/", icon: HomeLine },
    {
        label: "Dashboard",
        href: "/dashboard",
        icon: BarChartSquare02,
        items: [
            { label: "Overview", href: "/dashboard/overview", icon: Grid03 },
            { label: "Notifications", href: "/dashboard/notifications", icon: NotificationBox, badge: 10 },
            { label: "Analytics", href: "/dashboard/analytics", icon: LineChartUp03 },
            { label: "Saved reports", href: "/dashboard/saved-reports", icon: Star01 },
            { label: "Trade history", href: "/dashboard/trade-history", icon: ClockFastForward },
            { label: "User reports", href: "/dashboard/user-reports", icon: UserSquare },
            { label: "Notifications", href: "/dashboard/manage-notifications", icon: Settings03 },
        ],
    },
    {
        label: "Projects",
        href: "/projects",
        icon: Rows01,
        items: [
            { label: "View all", href: "/projects/all", icon: Rows01 },
            { label: "Personal", href: "/projects/personal", icon: User01 },
            { label: "Team", href: "/projects/team", icon: Users01 },
            { label: "Shared with me", href: "/projects/shared-with-me", icon: UsersPlus },
        ],
    },
    { label: "Tasks", href: "/tasks", icon: CheckDone01, badge: 8 },
    { label: "Reporting", href: "/reporting", icon: PieChart03 },
    { label: "Users", href: "/users", icon: Users01 },
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
    { id: "trade-01", ticker: "TSLA BUY", company: "Tesla, Inc.", amount: "$30,021.23", date: "Jan 13, 2027", status: "processing", person: avatar(0) },
    { id: "trade-02", ticker: "MTCH SELL", company: "Match Group, Inc.", amount: "$10,045.00", date: "Jan 13, 2027", status: "success", person: avatar(1) },
    { id: "trade-03", ticker: "DDOG BUY", company: "Datadog Inc.", amount: "$40,132.16", date: "Jan 13, 2027", status: "success", person: avatar(2) },
    {
        id: "trade-04",
        ticker: "ARKG BUY",
        company: "ARK Genomic Revolution ETF",
        amount: "$22,665.12",
        date: "Jan 13, 2027",
        status: "declined",
        person: avatar(3),
    },
    { id: "trade-05", ticker: "SQ BUY", company: "Square, Inc.", amount: "$18,221.30", date: "Jan 12, 2027", status: "success", person: avatar(4) },
    { id: "trade-06", ticker: "MSTR SELL", company: "MicroStrategy Inc.", amount: "$24,118.18", date: "Jan 12, 2027", status: "success", person: avatar(5) },
    { id: "trade-07", ticker: "TSLA BUY", company: "Tesla, Inc.", amount: "$22,468.20", date: "Jan 12, 2027", status: "success", person: avatar(4) },
];

const statusColor: Record<TradeStatus, "gray" | "success" | "error"> = {
    processing: "gray",
    success: "success",
    declined: "error",
};

/** Informational page 02 — trade history with a slim sidebar, button-group filters and a boxed filter bar. */
export const Informational02 = () => (
    <div className="bg-primary flex flex-col lg:flex-row">
        <SidebarNavigationSlim activeUrl="/dashboard/trade-history" items={navItems} />

        <main className="bg-secondary lg:bg-primary min-w-0 flex-1 pt-8 pb-12 shadow-none">
            <div className="max-w-container mx-auto mb-8 flex flex-col gap-5 px-4 lg:px-8">
                <div className="relative flex flex-col gap-5">
                    <div className="flex flex-col gap-4 lg:flex-row">
                        <div className="flex flex-1 flex-col gap-0.5">
                            <p className="text-primary text-xl font-semibold">Trade history</p>
                            <p className="text-tertiary text-md">View your team&apos;s trades and transactions.</p>
                        </div>

                        <div className="flex items-start gap-3">
                            <Button color="secondary" size="md" iconLeading={DownloadCloud01}>
                                Download CSV
                            </Button>
                            <Button color="primary" size="md" iconLeading={Plus}>
                                Add
                            </Button>
                        </div>
                    </div>

                    <ButtonGroup size="md" defaultSelectedKeys={["all"]} aria-label="Filter trades by side">
                        <ButtonGroupItem id="all">All trades</ButtonGroupItem>
                        <ButtonGroupItem id="buy">Buy side</ButtonGroupItem>
                        <ButtonGroupItem id="sell">Sell side</ButtonGroupItem>
                    </ButtonGroup>
                </div>
            </div>

            <div className="max-w-container mx-auto flex flex-col px-4 lg:gap-6 lg:px-8">
                <div className="lg:bg-secondary lg:ring-secondary lg:rounded-xl lg:px-4 lg:py-3 lg:ring-1 lg:ring-inset">
                    <div className="flex flex-wrap gap-3">
                        <Input
                            shortcut
                            size="sm"
                            aria-label="Search for trades"
                            placeholder="Search for trades"
                            icon={SearchLg}
                            className="min-w-0 flex-1 sm:max-w-70"
                        />

                        <div className="ms-auto flex shrink-0 items-center gap-3">
                            <div className="max-md:hidden">
                                <DateRangePicker />
                            </div>
                            <Button color="secondary" size="md" className="max-h-9" iconLeading={FilterLines}>
                                Filters
                            </Button>
                        </div>
                    </div>
                </div>

                <TableCard.Root className="-mx-4 rounded-none lg:mx-0 lg:rounded-xl">
                    <Table aria-label="Trades" selectionMode="multiple">
                        <Table.Header className="bg-transparent">
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
                                            <Avatar src={trade.person.src} alt="" size="md" initials={trade.person.initials} />
                                            <div>
                                                <p className="text-primary text-sm font-medium">{trade.person.name}</p>
                                                <p className="text-tertiary text-sm">{trade.person.email}</p>
                                            </div>
                                        </div>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Button color="link-color" size="md">
                                            Edit
                                        </Button>
                                    </Table.Cell>
                                </Table.Row>
                            )}
                        </Table.Body>
                    </Table>

                    <TablePaginationNumbered className="px-4 py-3 md:px-6 md:pt-3 md:pb-4" />
                </TableCard.Root>
            </div>
        </main>
    </div>
);
