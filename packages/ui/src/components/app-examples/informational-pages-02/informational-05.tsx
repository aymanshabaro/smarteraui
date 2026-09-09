"use client";

import { CheckCircle, Download01, FilterLines, RefreshCcw01, SearchLg, XCircle } from "@smarteraui/icons";
import { Table, TableCard } from "@/components/application/table/table";
import { Tabs } from "@/components/application/tabs/tabs";
import { Avatar } from "@/components/base/avatar/avatar";
import { BadgeWithIcon } from "@/components/base/badges/badges";
import { Button } from "@/components/base/buttons/button";
import { DropdownIconSimple } from "@/components/base/dropdown/dropdown-icon-simple";
import { Input } from "@/components/base/input/input";
import { ProgressBar } from "@/components/base/progress-indicators/progress-indicators";
import type { DemoAvatar } from "@/utils/demo-assets";
import { avatar } from "@/utils/demo-assets";
import { AppHeader } from "./shell.a";

const subNavItems = [
    { label: "Overview", href: "/dashboard/overview" },
    { label: "Notifications", href: "/dashboard/notifications" },
    { label: "Analytics", href: "/dashboard/analytics" },
    { label: "Saved reports", href: "/dashboard/saved-reports" },
    { label: "Orders", href: "/dashboard/orders" },
    { label: "User reports", href: "/dashboard/user-reports" },
];

const tabs = [
    { id: "all", label: "View all" },
    { id: "active", label: "Active" },
    { id: "archived", label: "Archived" },
];

type OrderStatus = "paid" | "refunded" | "cancelled";

interface Order {
    id: string;
    invoice: string;
    status: OrderStatus;
    progress: number;
    person: DemoAvatar;
}

const orders: Order[] = [
    { id: "order-01", invoice: "INV-3066", status: "paid", progress: 60, person: avatar(0) },
    { id: "order-02", invoice: "INV-3065", status: "paid", progress: 70, person: avatar(1) },
    { id: "order-03", invoice: "INV-3064", status: "paid", progress: 60, person: avatar(2) },
    { id: "order-04", invoice: "INV-3063", status: "paid", progress: 30, person: avatar(3) },
    { id: "order-05", invoice: "INV-3062", status: "refunded", progress: 80, person: avatar(4) },
    { id: "order-06", invoice: "INV-3061", status: "paid", progress: 20, person: avatar(5) },
    { id: "order-07", invoice: "INV-3060", status: "cancelled", progress: 10, person: avatar(6) },
    { id: "order-08", invoice: "INV-3059", status: "cancelled", progress: 40, person: avatar(7) },
];

const statusBadge = {
    paid: { color: "success", icon: CheckCircle },
    refunded: { color: "gray", icon: RefreshCcw01 },
    cancelled: { color: "error", icon: XCircle },
} as const;

/** Informational page 05 — orders with a secondary header nav, a labelled section column and a progress column. */
export const Informational05 = () => (
    <div className="bg-primary flex flex-col">
        <AppHeader activeUrl="/dashboard/orders" subItems={subNavItems} actions="avatar" />

        <main className="max-w-container mx-auto flex w-full flex-1 flex-col gap-8 pt-8 pb-12 lg:pt-12 lg:pb-24">
            <div className="px-4 lg:px-8">
                <div className="border-secondary flex flex-col justify-between gap-4 border-b pb-4 lg:flex-row">
                    <div className="flex flex-col gap-0.5 lg:gap-1">
                        <h1 className="text-primary text-xl font-semibold">Orders</h1>
                        <p className="text-tertiary text-md">Manage your recent orders and invoices.</p>
                    </div>

                    <div className="flex gap-3">
                        <Button color="secondary" size="md" iconLeading={Download01}>
                            Download all
                        </Button>
                        <Button color="primary" size="md">
                            New order
                        </Button>
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-5 px-4 lg:px-8">
                    <div className="flex flex-col gap-6 lg:flex-row lg:gap-8">
                        <div className="w-full max-w-70">
                            <h2 className="text-secondary text-sm font-semibold">Order details</h2>
                            <p className="text-tertiary text-sm">Review and manage recent orders.</p>
                        </div>

                        <div className="flex flex-1 flex-col gap-5 lg:gap-6">
                            <div className="flex flex-wrap gap-3 max-md:flex-col">
                                <Tabs defaultSelectedKey="all" className="w-auto">
                                    <Tabs.List type="button-minimal" items={tabs}>
                                        {(tab) => <Tabs.Item {...tab} />}
                                    </Tabs.List>
                                    {tabs.map((tab) => (
                                        <Tabs.Panel key={tab.id} id={tab.id} />
                                    ))}
                                </Tabs>

                                <div className="flex shrink-0 items-center gap-3 max-md:w-full md:ms-auto">
                                    <Input
                                        shortcut
                                        size="sm"
                                        aria-label="Search"
                                        placeholder="Search"
                                        icon={SearchLg}
                                        className="min-w-0 max-md:flex-1 md:w-70"
                                    />
                                    <Button color="secondary" size="md" className="max-h-9" iconLeading={FilterLines}>
                                        Filters
                                    </Button>
                                </div>
                            </div>

                            <TableCard.Root className="-mx-4 rounded-none lg:mx-0 lg:rounded-xl">
                                <Table aria-label="Orders" size="sm" selectionMode="multiple">
                                    <Table.Header>
                                        <Table.Head id="invoice" label="Invoice" isRowHeader allowsSorting className="w-full" />
                                        <Table.Head id="status" label="Status" />
                                        <Table.Head id="customer" label="Customer" />
                                        <Table.Head id="progress" label="Progress" className="min-w-55" />
                                        <Table.Head id="actions">
                                            <span className="sr-only">Actions</span>
                                        </Table.Head>
                                    </Table.Header>

                                    <Table.Body items={orders}>
                                        {(order) => (
                                            <Table.Row id={order.id}>
                                                <Table.Cell className="text-primary text-sm font-medium whitespace-nowrap">{order.invoice}</Table.Cell>
                                                <Table.Cell>
                                                    <BadgeWithIcon
                                                        size="sm"
                                                        type="modern"
                                                        color={statusBadge[order.status].color}
                                                        iconLeading={statusBadge[order.status].icon}
                                                        className="capitalize"
                                                    >
                                                        {order.status}
                                                    </BadgeWithIcon>
                                                </Table.Cell>
                                                <Table.Cell>
                                                    <div className="flex items-center gap-3">
                                                        <Avatar src={order.person.src} alt="" size="md" initials={order.person.initials} />
                                                        <div>
                                                            <p className="text-primary text-sm font-medium">{order.person.name}</p>
                                                            <p className="text-tertiary text-sm">{order.person.email}</p>
                                                        </div>
                                                    </div>
                                                </Table.Cell>
                                                <Table.Cell>
                                                    <ProgressBar value={order.progress} labelPosition="right" />
                                                </Table.Cell>
                                                <Table.Cell className="px-4!">
                                                    <div className="flex items-center justify-end">
                                                        <DropdownIconSimple />
                                                    </div>
                                                </Table.Cell>
                                            </Table.Row>
                                        )}
                                    </Table.Body>
                                </Table>
                            </TableCard.Root>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>
);
