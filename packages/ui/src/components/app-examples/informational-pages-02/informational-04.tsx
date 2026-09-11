"use client";

import { ArrowLeft, CheckCircle, Download01, HomeLine, RefreshCcw01, SearchLg, XCircle } from "@properui/icons";
import type { DemoAvatar } from "../../../utils/demo-assets";
import { avatar } from "../../../utils/demo-assets";
import { Breadcrumbs } from "../../application/breadcrumbs/breadcrumbs";
import { PaginationPageDefault } from "../../application/pagination/pagination";
import { Table, TableCard } from "../../application/table/table";
import { Tabs } from "../../application/tabs/tabs";
import { Avatar } from "../../base/avatar/avatar";
import { BadgeWithIcon } from "../../base/badges/badges";
import { Button } from "../../base/buttons/button";
import { Input } from "../../base/input/input";
import { Select } from "../../base/select/select";
import type { SelectItemType } from "../../base/select/select-shared";
import { AppHeader } from "./shell.a";

const sectionTabs = [
    { id: "overview", label: "Overview" },
    { id: "notifications", label: "Notifications" },
    { id: "analytics", label: "Analytics" },
    { id: "saved-reports", label: "Saved reports" },
    { id: "orders", label: "Orders" },
    { id: "user-reports", label: "User reports" },
    { id: "manage-notifications", label: "Manage notifications" },
];

const statusOptions: SelectItemType[] = [
    { id: "paid", label: "Paid" },
    { id: "pending", label: "Pending" },
    { id: "failed", label: "Failed" },
    { id: "refunded", label: "Refunded" },
];

const categoryOptions: SelectItemType[] = [
    { id: "all", label: "View all" },
    { id: "electronics", label: "Electronics" },
    { id: "clothing", label: "Clothing" },
    { id: "furniture", label: "Furniture" },
];

type OrderStatus = "paid" | "refunded" | "cancelled";

interface Order {
    id: string;
    invoice: string;
    date: string;
    status: OrderStatus;
    purchase: string;
    person: DemoAvatar;
}

const orders: Order[] = [
    { id: "order-01", invoice: "INV-3066", date: "Jan 6, 2026", status: "paid", purchase: "Monthly", person: avatar(0) },
    { id: "order-02", invoice: "INV-3065", date: "Jan 6, 2026", status: "paid", purchase: "Monthly", person: avatar(1) },
    { id: "order-03", invoice: "INV-3064", date: "Jan 6, 2026", status: "paid", purchase: "Monthly", person: avatar(2) },
    { id: "order-04", invoice: "INV-3063", date: "Jan 5, 2026", status: "paid", purchase: "Monthly", person: avatar(3) },
    { id: "order-05", invoice: "INV-3062", date: "Jan 5, 2026", status: "refunded", purchase: "Monthly", person: avatar(4) },
    { id: "order-06", invoice: "INV-3061", date: "Jan 5, 2026", status: "paid", purchase: "Monthly", person: avatar(5) },
    { id: "order-07", invoice: "INV-3060", date: "Jan 4, 2026", status: "cancelled", purchase: "Monthly", person: avatar(6) },
];

const statusBadge = {
    paid: { color: "success", icon: CheckCircle },
    refunded: { color: "gray", icon: RefreshCcw01 },
    cancelled: { color: "error", icon: XCircle },
} as const;

/** Informational page 04 — orders table with a vertical section nav beside the content and centred pagination. */
export const Informational04 = () => (
    <div className="bg-primary flex flex-col">
        <AppHeader activeUrl="/dashboard" actions="upgrade" />

        <main className="bg-primary flex w-full flex-col gap-8 pt-8 pb-12 lg:pt-12 lg:pb-24">
            <div className="max-w-container mx-auto flex w-full flex-col gap-5 px-4 lg:px-8">
                <div className="relative flex flex-col gap-4">
                    <div className="max-lg:hidden">
                        <Breadcrumbs type="text" aria-label="Breadcrumbs">
                            <Breadcrumbs.Item href="/" icon={HomeLine} aria-label="Home" />
                            <Breadcrumbs.Item href="/dashboard">Dashboard</Breadcrumbs.Item>
                            <Breadcrumbs.Item href="/dashboard/proper">Proper UI</Breadcrumbs.Item>
                            <Breadcrumbs.Item href="/dashboard/orders">Orders</Breadcrumbs.Item>
                        </Breadcrumbs>
                    </div>

                    <div className="flex lg:hidden">
                        <Button color="link-gray" size="sm" href="/dashboard" iconLeading={ArrowLeft}>
                            Back
                        </Button>
                    </div>

                    <div className="border-secondary flex flex-col gap-4 border-b pb-4 lg:flex-row">
                        <div className="flex flex-1 flex-col gap-0.5">
                            <h1 className="text-primary text-xl font-semibold">Orders</h1>
                        </div>

                        <div className="flex items-start gap-3">
                            <Button color="secondary" size="md" iconLeading={Download01}>
                                Download all
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-container mx-auto flex w-full gap-16 lg:px-8">
                <div className="flex w-auto flex-col max-lg:hidden">
                    <Tabs orientation="vertical" defaultSelectedKey="orders" className="w-auto">
                        <Tabs.List type="line" orientation="vertical" items={sectionTabs}>
                            {(tab) => <Tabs.Item {...tab} />}
                        </Tabs.List>
                        {sectionTabs.map((tab) => (
                            <Tabs.Panel key={tab.id} id={tab.id} />
                        ))}
                    </Tabs>
                </div>

                <div className="flex min-w-0 flex-1 flex-col gap-6 px-4 lg:px-0">
                    <div className="lg:bg-secondary lg:ring-secondary lg:rounded-xl lg:px-5 lg:py-4 lg:ring-1 lg:ring-inset">
                        <div className="flex flex-wrap items-end gap-3">
                            <div className="flex min-w-0 flex-1 gap-3 max-md:flex-col">
                                <Input
                                    size="sm"
                                    label="Search for order"
                                    placeholder="Search"
                                    icon={SearchLg}
                                    className="w-full min-w-0 max-md:**:data-label:hidden md:max-w-70"
                                />

                                <div className="flex min-w-0 flex-1 gap-3">
                                    <Select
                                        size="sm"
                                        label="Status"
                                        placeholder="Paid"
                                        defaultSelectedKey="paid"
                                        items={statusOptions}
                                        className="w-full max-md:**:data-label:hidden md:max-w-40"
                                    >
                                        {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                                    </Select>

                                    <Select
                                        size="sm"
                                        label="Category"
                                        placeholder="View all"
                                        defaultSelectedKey="all"
                                        items={categoryOptions}
                                        className="w-full max-md:**:data-label:hidden md:max-w-40"
                                    >
                                        {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                                    </Select>
                                </div>
                            </div>

                            <div className="flex shrink-0 items-center gap-3 max-md:hidden">
                                <Button color="secondary" size="md">
                                    Clear all
                                </Button>
                            </div>
                        </div>
                    </div>

                    <TableCard.Root className="-mx-4 rounded-none lg:mx-0 lg:rounded-xl">
                        <Table aria-label="Orders" selectionMode="multiple">
                            <Table.Header>
                                <Table.Head id="invoice" label="Invoice" isRowHeader allowsSorting className="w-full" />
                                <Table.Head id="date" label="Date" />
                                <Table.Head id="status" label="Status" />
                                <Table.Head id="customer" label="Customer" />
                                <Table.Head id="purchase" label="Purchase" />
                                <Table.Head id="actions">
                                    <span className="sr-only">Actions</span>
                                </Table.Head>
                            </Table.Header>

                            <Table.Body items={orders}>
                                {(order) => (
                                    <Table.Row id={order.id}>
                                        <Table.Cell className="text-primary text-sm font-medium whitespace-nowrap">{order.invoice}</Table.Cell>
                                        <Table.Cell className="whitespace-nowrap">{order.date}</Table.Cell>
                                        <Table.Cell>
                                            <BadgeWithIcon
                                                size="sm"
                                                type="pill-color"
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
                                                    <p className="text-tertiary text-sm font-medium">{order.person.email}</p>
                                                </div>
                                            </div>
                                        </Table.Cell>
                                        <Table.Cell className="font-medium!">{order.purchase}</Table.Cell>
                                        <Table.Cell>
                                            <div className="flex gap-3">
                                                <Button color="link-gray" size="md">
                                                    Delete
                                                </Button>
                                                <Button color="link-color" size="md">
                                                    Edit
                                                </Button>
                                            </div>
                                        </Table.Cell>
                                    </Table.Row>
                                )}
                            </Table.Body>
                        </Table>
                    </TableCard.Root>

                    <PaginationPageDefault page={1} total={10} />
                </div>
            </div>
        </main>
    </div>
);
