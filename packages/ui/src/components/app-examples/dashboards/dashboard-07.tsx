"use client";

import { useState } from "react";
import { Edit01, FilterLines, Plus, SearchLg, Trash01, UploadCloud02 } from "@smarteraui/icons";
import { FeaturedCardQRCode } from "@/components/application/app-navigation/base-components/featured-cards";
import { SidebarNavigationSimple } from "@/components/application/app-navigation/sidebar-navigation/sidebar-simple";
import { DateRangePicker } from "@/components/application/date-picker/date-range-picker";
import { MetricChart03 } from "@/components/application/metrics/metrics";
import { Table, TableCard } from "@/components/application/table/table";
import { customers } from "@/components/application/table/table-data";
import { TablePaginationNumbered } from "@/components/application/table/table-pagination";
import { Avatar } from "@/components/base/avatar/avatar";
import { BadgeWithDot } from "@/components/base/badges/badges";
import { Button } from "@/components/base/buttons/button";
import { ButtonUtility } from "@/components/base/buttons/button-utility";
import { Dropdown } from "@/components/base/dropdown/dropdown";
import { Input } from "@/components/base/input/input";
import { ProgressBarBase } from "@/components/base/progress-indicators/progress-indicators";
import { Select } from "@/components/base/select/select";
import { cx } from "@/utils/cx";
import { StackedAvatars, currentUser, navFooterItems, navItemsSimple, sparklineDown, sparklineUp, styles } from "./dashboards-shared";

const noop = () => {};

const periods = [
    { id: "7-days", label: "Last 7 days" },
    { id: "14-days", label: "Last 14 days" },
    { id: "30-days", label: "Last 30 days" },
    { id: "90-days", label: "Last 90 days" },
];

const metrics = [
    { title: "Total customers", value: "2,420", change: "40%", trend: "positive" as const, chartData: sparklineUp },
    { title: "Members", value: "1,210", change: "10%", trend: "negative" as const, chartData: sparklineDown },
    { title: "Active now", value: "316", change: "20%", trend: "positive" as const, chartData: sparklineUp },
];

/** Dashboard 07 — a customer dashboard: three trend cards over a filterable customer table. */
export const Dashboard07 = () => {
    const [page, setPage] = useState(1);
    const [selectedKeys, setSelectedKeys] = useState<"all" | Set<string>>(new Set(customers.slice(0, 3).map((customer) => customer.name)));

    return (
        <div className={styles.page}>
            <SidebarNavigationSimple
                activeUrl="/dashboard"
                items={navItemsSimple}
                footerItems={navFooterItems}
                featureCard={
                    <FeaturedCardQRCode
                        title="Verify this device"
                        description="Open the app and scan the QR code below to verify this device."
                        value="https://smartera.example.com/verify/4060020"
                        onDismiss={noop}
                    />
                }
            />

            <main className={styles.main}>
                <div className={cx("flex flex-col gap-6", styles.gutter)}>
                    <div className="flex flex-col gap-4 md:flex-row md:items-start">
                        <div className="flex flex-1 flex-col gap-1">
                            <h1 className={styles.pageTitle}>Welcome back, {currentUser.name.split(" ")[0]}</h1>
                            <p className={styles.pageSubtitle}>Track, manage and forecast your customers and orders.</p>
                        </div>

                        <div className="flex flex-wrap gap-3">
                            <Button color="secondary" size="md" iconLeading={UploadCloud02}>
                                Import
                            </Button>
                            <Button color="primary" size="md" iconLeading={Plus}>
                                Add
                            </Button>
                        </div>
                    </div>

                    <div className="grid gap-5 md:grid-cols-3 lg:gap-6">
                        {/* The cards head themselves with an `h3`, so the group needs an `h2` above them. */}
                        <h2 className="sr-only">Customer summary</h2>

                        {metrics.map((metric) => (
                            <MetricChart03
                                key={metric.title}
                                title={metric.title}
                                value={metric.value}
                                change={metric.change}
                                trend={metric.trend}
                                changeDescription="vs last month"
                                chartData={metric.chartData}
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

                    <div className="flex flex-wrap items-center gap-3">
                        <Button color="secondary" size="md">
                            Today
                        </Button>

                        <Select aria-label="Period" size="md" defaultSelectedKey="7-days" items={periods} className="w-44">
                            {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                        </Select>

                        <div className="max-md:hidden">
                            <DateRangePicker />
                        </div>

                        <div className="ms-auto flex flex-wrap items-center gap-3">
                            <Input shortcut size="md" aria-label="Search customers" placeholder="Search" icon={SearchLg} className="md:w-72" />
                            <Button color="secondary" size="md" iconLeading={FilterLines}>
                                Filters
                            </Button>
                        </div>
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
                                <Table.Head id="license" label="License use" className="max-lg:hidden" />
                                <Table.Head id="status" label="Status" />
                                <Table.Head id="users" label="Users" className="max-lg:hidden" />
                                <Table.Head id="about" label="About" className="w-full max-md:hidden" />
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
                                        <Table.Cell className="max-lg:hidden">
                                            <ProgressBarBase value={customer.licenseUse} className="w-24" />
                                        </Table.Cell>
                                        <Table.Cell>
                                            <BadgeWithDot size="sm" type="modern" color={customer.status === "Customer" ? "success" : "gray"}>
                                                {customer.status}
                                            </BadgeWithDot>
                                        </Table.Cell>
                                        <Table.Cell className="max-lg:hidden">
                                            <StackedAvatars />
                                        </Table.Cell>
                                        <Table.Cell className="max-md:hidden">
                                            <div className="whitespace-nowrap">
                                                <p className="text-primary text-sm font-medium">{customer.aboutTitle}</p>
                                                <p className="text-tertiary text-sm">{customer.aboutDescription}</p>
                                            </div>
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
