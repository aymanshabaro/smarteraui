"use client";

import { useState } from "react";
import { Edit01, Plus, SearchLg, Trash01, UploadCloud02 } from "@properui/icons";
import { cx } from "../../../utils/cx";
import { SidebarNavigationSlim } from "../../application/app-navigation/sidebar-navigation/sidebar-slim";
import { Table, TableCard } from "../../application/table/table";
import { customers } from "../../application/table/table-data";
import { TablePaginationNumbered } from "../../application/table/table-pagination";
import { Avatar } from "../../base/avatar/avatar";
import { BadgeWithDot } from "../../base/badges/badges";
import { Button } from "../../base/buttons/button";
import { ButtonUtility } from "../../base/buttons/button-utility";
import { Dropdown } from "../../base/dropdown/dropdown";
import { Input } from "../../base/input/input";
import { ProgressBarBase } from "../../base/progress-indicators/progress-indicators";
import { Select } from "../../base/select/select";
import { DonutChart, StackedAvatars, TrendAreaChart, navFooterItemsWithIcons, navItemsDualTier, styles } from "./dashboards-shared";

const activeNow = [
    { name: "Desktop", value: 46, className: "fill-utility-brand-600" },
    { name: "Mobile", value: 32, className: "fill-utility-brand-400" },
    { name: "Tablet", value: 22, className: "fill-utility-neutral-400" },
];

const statuses = [
    { id: "paid", label: "Paid" },
    { id: "pending", label: "Pending" },
    { id: "failed", label: "Failed" },
    { id: "refunded", label: "Refunded" },
];

const categories = [
    { id: "all", label: "View all" },
    { id: "electronics", label: "Electronics" },
    { id: "clothing", label: "Clothing" },
    { id: "furniture", label: "Furniture" },
];

const legend = [
    { year: "2026", className: "bg-utility-brand-600" },
    { year: "2025", className: "bg-utility-brand-400" },
    { year: "2024", className: "bg-utility-neutral-400" },
];

/** Dashboard 06 — a customer dashboard behind a slim icon rail, led by two overview cards. */
export const Dashboard06 = () => {
    const [page, setPage] = useState(1);
    const [selectedKeys, setSelectedKeys] = useState<"all" | Set<string>>(new Set(customers.slice(0, 3).map((customer) => customer.name)));

    return (
        <div className={styles.page}>
            <SidebarNavigationSlim activeUrl="/customers" items={navItemsDualTier} footerItems={navFooterItemsWithIcons} />

            <main className={styles.main}>
                <div className={cx("flex flex-col gap-6", styles.gutter)}>
                    <div className="flex flex-col gap-4 md:flex-row md:items-start">
                        <h1 className={cx(styles.pageTitle, "flex-1")}>Customers</h1>

                        <div className="flex flex-wrap gap-3">
                            <Button color="secondary" size="md" iconLeading={UploadCloud02}>
                                Import
                            </Button>
                            <Button color="primary" size="md" iconLeading={Plus}>
                                Add customer
                            </Button>
                        </div>
                    </div>

                    <div className="flex flex-col gap-6 lg:flex-row lg:gap-8">
                        <section className="flex flex-col gap-5 lg:w-72 lg:shrink-0">
                            <div className="border-secondary flex items-start gap-4 border-b pb-4">
                                <h2 className={cx(styles.cardTitle, "flex-1")}>Active now</h2>
                                <Dropdown.Root>
                                    <Dropdown.DotsButton />
                                    <Dropdown.Popover className="w-40">
                                        <Dropdown.Menu>
                                            <Dropdown.Item>View report</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown.Popover>
                                </Dropdown.Root>
                            </div>

                            <div className="flex justify-center">
                                <DonutChart label="Active customers by device" data={activeNow} centerValue="316" />
                            </div>
                        </section>

                        <section className="flex min-w-0 flex-1 flex-col gap-5">
                            <div className="border-secondary flex items-start gap-4 border-b pb-4">
                                <h2 className={cx(styles.cardTitle, "flex-1")}>Total customers</h2>
                                <Dropdown.Root>
                                    <Dropdown.DotsButton />
                                    <Dropdown.Popover className="w-40">
                                        <Dropdown.Menu>
                                            <Dropdown.Item>View report</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown.Popover>
                                </Dropdown.Root>
                            </div>

                            <ul className="flex flex-wrap justify-end gap-4">
                                {legend.map((entry) => (
                                    <li key={entry.year} className="text-tertiary flex items-center gap-1.5 text-sm font-medium">
                                        <span aria-hidden="true" className={cx("size-2 rounded-full", entry.className)} />
                                        {entry.year}
                                    </li>
                                ))}
                            </ul>

                            <TrendAreaChart label="Total customers over the last 12 months" className="h-56" />
                        </section>
                    </div>

                    <div className="flex flex-col gap-4 md:flex-row md:items-end">
                        <Input label="Search for customer" size="md" placeholder="Search" icon={SearchLg} className="md:max-w-xs md:flex-1" />

                        <Select label="Status" size="md" defaultSelectedKey="paid" items={statuses} className="md:w-48">
                            {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                        </Select>

                        <Select label="Category" size="md" defaultSelectedKey="all" items={categories} className="md:w-48">
                            {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                        </Select>

                        <Button color="secondary" size="md" className="md:ms-auto">
                            Clear all
                        </Button>
                    </div>

                    <TableCard.Root>
                        <Table
                            aria-label="Customers"
                            selectionMode="multiple"
                            selectedKeys={selectedKeys}
                            onSelectionChange={(keys) => setSelectedKeys(keys as "all" | Set<string>)}
                        >
                            <Table.Header>
                                <Table.Head id="company" label="Company" isRowHeader />
                                <Table.Head id="status" label="Status" />
                                <Table.Head id="about" label="About" className="w-full max-md:hidden" />
                                <Table.Head id="users" label="Users" className="max-lg:hidden" />
                                <Table.Head id="license" label="License use" className="max-lg:hidden" />
                                <Table.Head id="actions">
                                    <span className="sr-only">Actions</span>
                                </Table.Head>
                            </Table.Header>

                            <Table.Body items={customers}>
                                {(customer) => (
                                    <Table.Row id={customer.name}>
                                        <Table.Cell>
                                            <div className="flex items-center gap-3">
                                                <Avatar size="md" src={customer.logoUrl} alt="" rounded={false} />
                                                <div className="whitespace-nowrap">
                                                    <p className="text-primary text-sm font-medium">{customer.name}</p>
                                                    <p className="text-tertiary text-sm">{customer.website}</p>
                                                </div>
                                            </div>
                                        </Table.Cell>
                                        <Table.Cell>
                                            <BadgeWithDot size="sm" type="modern" color={customer.status === "Customer" ? "success" : "gray"}>
                                                {customer.status}
                                            </BadgeWithDot>
                                        </Table.Cell>
                                        <Table.Cell className="max-md:hidden">
                                            <div className="whitespace-nowrap">
                                                <p className="text-primary text-sm font-medium">{customer.aboutTitle}</p>
                                                <p className="text-tertiary text-sm">{customer.aboutDescription}</p>
                                            </div>
                                        </Table.Cell>
                                        <Table.Cell className="max-lg:hidden">
                                            <StackedAvatars />
                                        </Table.Cell>
                                        <Table.Cell className="max-lg:hidden">
                                            <ProgressBarBase value={customer.licenseUse} className="w-24" />
                                        </Table.Cell>
                                        <Table.Cell className="px-4">
                                            <div className="flex justify-end gap-0.5">
                                                <ButtonUtility size="xs" color="tertiary" tooltip="Delete" icon={Trash01} />
                                                <ButtonUtility size="xs" color="tertiary" tooltip="Edit" icon={Edit01} />
                                            </div>
                                        </Table.Cell>
                                    </Table.Row>
                                )}
                            </Table.Body>
                        </Table>

                        <TablePaginationNumbered page={page} total={10} onPageChange={setPage} />
                    </TableCard.Root>
                </div>
            </main>
        </div>
    );
};
