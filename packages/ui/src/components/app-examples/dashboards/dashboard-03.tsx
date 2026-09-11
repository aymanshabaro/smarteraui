"use client";

import { useState } from "react";
import type { Key } from "react-aria";
import { SearchLg } from "@properui/icons";
import { cx } from "../../../utils/cx";
import { AVATARS, avatar } from "../../../utils/demo-assets";
import { SidebarNavigationSectionsSubheadings } from "../../application/app-navigation/sidebar-navigation/sidebar-sections-subheadings";
import { DateRangePicker } from "../../application/date-picker/date-range-picker";
import { MetricSimple } from "../../application/metrics/metrics";
import { Table, TableCard } from "../../application/table/table";
import { TablePaginationNumbered } from "../../application/table/table-pagination";
import { Tabs } from "../../application/tabs/tabs";
import { Avatar } from "../../base/avatar/avatar";
import { BadgeWithDot } from "../../base/badges/badges";
import { Dropdown } from "../../base/dropdown/dropdown";
import { Input } from "../../base/input/input";
import { RANGE_PRESETS, RangeTabs, SalesAreaChart, navSectionsSubheadings, styles } from "./dashboards-shared";

const owner = avatar(0);

const headlineMetrics = [
    { title: "Sales", value: "$2,114.40", change: "2.4%" },
    { title: "Orders", value: "24", change: "8.6%" },
    { title: "Average order value", value: "$88.10", change: "6.0%" },
];

const orderTabs = [
    { id: "all", label: "All orders" },
    { id: "paid", label: "Paid" },
    { id: "refunded", label: "Refunded" },
];

const orders = AVATARS.slice(0, 7).map((person, index) => ({
    id: `#2667${8 - index}`,
    date: ["Jan 16, 2026", "Jan 16, 2026", "Jan 15, 2026", "Jan 14, 2026", "Jan 14, 2026", "Jan 14, 2026", "Jan 14, 2026"][index]!,
    amount: ["$100.14", "$96.32", "$104.24", "$88.48", "$96.32", "$107.10", "$82.04"][index]!,
    customer: person,
}));

/** Dashboard 03 — an ecommerce overview: a welcome header, sales cards and a recent-orders table. */
export const Dashboard03 = () => {
    const [orderTab, setOrderTab] = useState<Key>("all");
    const [page, setPage] = useState(1);

    return (
        <div className={styles.page}>
            <SidebarNavigationSectionsSubheadings activeUrl="/dashboard" items={navSectionsSubheadings} />

            <main className={styles.main}>
                <div className={cx("flex flex-col gap-6", styles.gutter)}>
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
                        <div className="flex flex-1 items-center gap-4">
                            <Avatar size="xl" src={owner.src} alt="" className="max-md:hidden" />
                            <div>
                                <h1 className={styles.pageTitle}>Welcome back, {owner.name.split(" ")[0]}</h1>
                                <p className={styles.pageSubtitle}>16 January, 2026</p>
                            </div>
                        </div>

                        <Input shortcut size="sm" aria-label="Search" placeholder="Search" icon={SearchLg} className="lg:w-80" />
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                        <RangeTabs label="Reporting period" presets={[{ id: "custom", long: "Custom" }, ...RANGE_PRESETS]} defaultSelectedKey="custom" />
                        <div className="ms-auto max-md:hidden">
                            <DateRangePicker />
                        </div>
                    </div>

                    <div className="grid gap-5 md:grid-cols-3 lg:gap-6">
                        {/* The cards head themselves with an `h3`, so the group needs an `h2` above them. */}
                        <h2 className="sr-only">Sales summary</h2>

                        {headlineMetrics.map((metric) => (
                            <MetricSimple
                                key={metric.title}
                                title={metric.title}
                                value={metric.value}
                                change={metric.change}
                                menu={
                                    <Dropdown.Root>
                                        <Dropdown.DotsButton />
                                        <Dropdown.Popover className="w-40">
                                            <Dropdown.Menu>
                                                <Dropdown.Item>View report</Dropdown.Item>
                                                <Dropdown.Item>Export</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown.Popover>
                                    </Dropdown.Root>
                                }
                            />
                        ))}
                    </div>

                    <section className={cx(styles.card, "flex flex-col gap-5 px-4 py-5 md:px-6")}>
                        <div className="flex flex-col gap-4 md:flex-row md:items-start">
                            <div className="flex flex-1 flex-col gap-1">
                                <h2 className={styles.cardTitle}>Sales</h2>
                                <p className="text-display-sm text-primary font-semibold">$8,422.60</p>
                                <p className="text-tertiary text-sm">
                                    <span className="text-success-primary font-medium">↑ 3.2%</span> vs last 30 days
                                </p>
                            </div>

                            <RangeTabs label="Sales period" defaultSelectedKey="30-days" />
                        </div>

                        <SalesAreaChart label="Daily sales over the last 30 days" className="h-64" />
                    </section>

                    <TableCard.Root>
                        <TableCard.Header
                            title="Orders"
                            description="24 orders in the last 30 days"
                            contentTrailing={
                                <Tabs selectedKey={orderTab} onSelectionChange={setOrderTab} className="w-auto md:absolute md:end-6 md:top-5">
                                    <Tabs.List aria-label="Order status" type="button-minimal">
                                        {orderTabs.map((tab) => (
                                            <Tabs.Item key={tab.id} id={tab.id} label={tab.label} />
                                        ))}
                                    </Tabs.List>
                                    {orderTabs.map((tab) => (
                                        <Tabs.Panel key={tab.id} id={tab.id} />
                                    ))}
                                </Tabs>
                            }
                        />

                        <Table aria-label="Recent orders" selectionMode="multiple">
                            <Table.Header>
                                <Table.Head id="order" label="Order" isRowHeader />
                                <Table.Head id="date" label="Date" />
                                <Table.Head id="status" label="Status" />
                                <Table.Head id="amount" label="Amount" />
                                <Table.Head id="customer" label="Customer" className="w-full" />
                                <Table.Head id="actions">
                                    <span className="sr-only">Actions</span>
                                </Table.Head>
                            </Table.Header>

                            <Table.Body items={orders}>
                                {(order) => (
                                    <Table.Row id={order.id}>
                                        <Table.Cell className="text-primary text-sm font-medium whitespace-nowrap">{order.id}</Table.Cell>
                                        <Table.Cell className="whitespace-nowrap">{order.date}</Table.Cell>
                                        <Table.Cell>
                                            <BadgeWithDot size="sm" color="success" type="modern">
                                                Paid
                                            </BadgeWithDot>
                                        </Table.Cell>
                                        <Table.Cell className="whitespace-nowrap">{order.amount}</Table.Cell>
                                        <Table.Cell>
                                            <div className="flex items-center gap-3">
                                                <Avatar size="md" src={order.customer.src} alt="" initials={order.customer.initials} />
                                                <div className="whitespace-nowrap">
                                                    <p className="text-primary text-sm font-medium">{order.customer.name}</p>
                                                    <p className="text-tertiary text-sm">{order.customer.email}</p>
                                                </div>
                                            </div>
                                        </Table.Cell>
                                        <Table.Cell className="px-4">
                                            <div className="flex justify-end">
                                                <Dropdown.Root>
                                                    <Dropdown.DotsButton />
                                                    <Dropdown.Popover className="w-40">
                                                        <Dropdown.Menu>
                                                            <Dropdown.Item>View order</Dropdown.Item>
                                                            <Dropdown.Item>Refund</Dropdown.Item>
                                                        </Dropdown.Menu>
                                                    </Dropdown.Popover>
                                                </Dropdown.Root>
                                            </div>
                                        </Table.Cell>
                                    </Table.Row>
                                )}
                            </Table.Body>
                        </Table>

                        <TablePaginationNumbered page={page} total={4} onPageChange={setPage} />
                    </TableCard.Root>
                </div>
            </main>
        </div>
    );
};
