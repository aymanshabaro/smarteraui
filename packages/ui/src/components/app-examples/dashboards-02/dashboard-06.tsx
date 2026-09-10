"use client";

import { Plus, SearchLg, UploadCloud02 } from "@properui/icons";
import { PaginationCardMinimal } from "@/components/application/pagination/pagination";
import { Table, TableCard } from "@/components/application/table/table";
import { customers } from "@/components/application/table/table-data";
import { Avatar } from "@/components/base/avatar/avatar";
import { Badge, BadgeWithButton, BadgeWithDot } from "@/components/base/badges/badges";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
import { ProgressBarBase } from "@/components/base/progress-indicators/progress-indicators";
import { Select } from "@/components/base/select/select";
import type { SelectItemType } from "@/components/base/select/select-shared";
import { AVATARS } from "@/utils/demo-assets";
import { GaugeChart, TrendChart } from "./charts.a";
import { trendSeries } from "./data.a";
import { DashboardHeader, DashboardMain, DashboardSection } from "./shell.a";
import { PanelMenu, RowActions } from "./widgets.a";

const activeUsers = [
    { name: "Mobile", value: 660, className: "text-utility-brand-400" },
    { name: "Tablet", value: 774, className: "text-utility-brand-600" },
    { name: "Desktop", value: 866, className: "text-utility-brand-700" },
];

const statuses: SelectItemType[] = [
    { id: "paid", label: "Paid" },
    { id: "pending", label: "Pending" },
    { id: "failed", label: "Failed" },
    { id: "refunded", label: "Refunded" },
];

const categories: SelectItemType[] = [
    { id: "all", label: "View all" },
    { id: "electronics", label: "Electronics" },
    { id: "clothing", label: "Clothing" },
    { id: "furniture", label: "Furniture" },
];

const renderSelectItem = (item: SelectItemType) => <Select.Item id={item.id}>{item.label}</Select.Item>;

/** Customer dashboard: an activity gauge and growth chart above a filterable customers table. */
export const Dashboard06 = () => (
    <div className="bg-primary">
        <DashboardHeader account="card" search settings={false} />

        <DashboardMain className="pb-16 lg:pb-24">
            <DashboardSection className="justify-between gap-4 lg:flex-row">
                <h1 className="text-primary text-xl font-semibold">Customers</h1>

                <div className="flex gap-3">
                    <Button color="secondary" size="md" iconLeading={UploadCloud02}>
                        Import
                    </Button>
                    <Button color="primary" size="md" iconLeading={Plus}>
                        Add customer
                    </Button>
                </div>
            </DashboardSection>

            <DashboardSection className="gap-8 lg:flex-row lg:gap-16">
                <section className="flex flex-col gap-6 lg:w-60">
                    <div className="border-secondary flex items-start justify-between border-b pb-5">
                        <h2 className="text-primary text-md font-semibold">Active now</h2>
                        <PanelMenu />
                    </div>
                    <GaugeChart className="h-60 w-60" data={activeUsers} title="316" subtitle="Active users" />
                </section>

                <section className="flex flex-1 flex-col gap-6">
                    <div className="border-secondary flex items-start justify-between border-b pb-5">
                        <h2 className="text-primary text-md font-semibold">Total customers</h2>
                        <PanelMenu />
                    </div>

                    <TrendChart
                        data={trendSeries}
                        xKey="month"
                        series={[
                            { key: "A", name: "2027" },
                            { key: "B", name: "2026", dashed: true },
                            { key: "C", name: "2025", dashed: true },
                        ]}
                    />
                </section>
            </DashboardSection>

            <DashboardSection className="gap-6">
                <div className="flex flex-wrap items-end gap-3">
                    <div className="flex min-w-0 flex-1 gap-3 max-md:flex-col">
                        <Input
                            label="Search for customer"
                            aria-label="Search for customer"
                            placeholder="Search"
                            icon={SearchLg}
                            size="sm"
                            className="w-full min-w-0 max-md:**:data-label:hidden md:max-w-70"
                        />

                        <div className="flex min-w-0 flex-1 gap-3">
                            <Select
                                label="Status"
                                aria-label="Status"
                                size="sm"
                                defaultSelectedKey="paid"
                                items={statuses}
                                className="w-full max-md:**:data-label:hidden md:max-w-40"
                            >
                                {renderSelectItem}
                            </Select>
                            <Select
                                label="Category"
                                aria-label="Category"
                                size="sm"
                                defaultSelectedKey="all"
                                items={categories}
                                className="w-full max-md:**:data-label:hidden md:max-w-40"
                            >
                                {renderSelectItem}
                            </Select>
                        </div>
                    </div>

                    <div className="flex shrink-0 items-center gap-3 max-md:hidden">
                        <Button color="secondary" size="sm">
                            Clear all
                        </Button>
                    </div>
                </div>

                <div className="flex gap-3 lg:hidden">
                    <BadgeWithButton size="md" type="color" color="gray" buttonLabel="Clear">
                        All time
                    </BadgeWithButton>
                    <BadgeWithButton size="md" type="color" color="gray" buttonLabel="Clear">
                        US, AU, +4
                    </BadgeWithButton>
                </div>

                <TableCard.Root className="-mx-4 rounded-none lg:mx-0 lg:rounded-xl">
                    <div className="overflow-x-auto">
                        <Table
                            aria-label="Customers"
                            selectionMode="multiple"
                            defaultSelectedKeys={customers.filter((_, index) => index !== 3 && index !== 4).map((item) => item.name)}
                        >
                            <Table.Header className="bg-secondary">
                                <Table.Head id="name" label="Company" isRowHeader allowsSorting className="w-full" />
                                <Table.Head id="status" label="Status" allowsSorting />
                                <Table.Head id="about" label="About" allowsSorting />
                                <Table.Head id="users" label="Users" className="md:hidden xl:table-cell" />
                                <Table.Head id="licenseUse" label="License use" allowsSorting className="min-w-55" />
                                <Table.Head id="actions">
                                    <span className="sr-only">Actions</span>
                                </Table.Head>
                            </Table.Header>

                            <Table.Body items={customers}>
                                {(item) => (
                                    <Table.Row id={item.name}>
                                        <Table.Cell>
                                            <div className="flex items-center gap-3 whitespace-nowrap">
                                                <Avatar src={item.logoUrl} alt="" size="md" />
                                                <div>
                                                    <p className="text-primary text-sm font-medium">{item.name}</p>
                                                    <p className="text-tertiary text-sm">{item.website}</p>
                                                </div>
                                            </div>
                                        </Table.Cell>
                                        <Table.Cell>
                                            <BadgeWithDot size="sm" type="pill-color" color={item.status === "Customer" ? "success" : "gray"}>
                                                {item.status}
                                            </BadgeWithDot>
                                        </Table.Cell>
                                        <Table.Cell className="whitespace-nowrap">
                                            <p className="text-primary text-sm font-medium">{item.aboutTitle}</p>
                                            <p className="text-tertiary text-sm">{item.aboutDescription}</p>
                                        </Table.Cell>
                                        <Table.Cell className="pe-0 md:hidden xl:table-cell">
                                            <div className="flex -space-x-1">
                                                {AVATARS.slice(0, 5).map((person) => (
                                                    <Avatar
                                                        key={person.username}
                                                        className="ring-bg-primary ring-[1.5px]"
                                                        size="xs"
                                                        src={person.src}
                                                        alt={person.name}
                                                    />
                                                ))}
                                                <Badge size="sm" color="gray" type="modern" className="ms-2 self-center">
                                                    +5
                                                </Badge>
                                            </div>
                                        </Table.Cell>
                                        <Table.Cell>
                                            <ProgressBarBase value={item.licenseUse} />
                                        </Table.Cell>
                                        <Table.Cell className="px-4">
                                            <RowActions />
                                        </Table.Cell>
                                    </Table.Row>
                                )}
                            </Table.Body>
                        </Table>
                    </div>

                    <PaginationCardMinimal align="center" page={1} total={10} />
                </TableCard.Root>
            </DashboardSection>
        </DashboardMain>
    </div>
);
