"use client";

import { Monitor01, Plus, SearchLg, UploadCloud02, UserSquare, Users01 } from "@properui/icons";
import { AVATARS, avatar } from "../../../utils/demo-assets";
import { DateRangePicker } from "../../application/date-picker/date-range-picker";
import { FilterBar } from "../../application/filter-bar/filter-bar";
import { MetricChart02 } from "../../application/metrics/metrics";
import { PaginationCardMinimal } from "../../application/pagination/pagination";
import { Table, TableCard } from "../../application/table/table";
import { customers } from "../../application/table/table-data";
import { Avatar } from "../../base/avatar/avatar";
import { Badge, BadgeWithDot } from "../../base/badges/badges";
import { Button } from "../../base/buttons/button";
import { Input } from "../../base/input/input";
import { ProgressBarBase } from "../../base/progress-indicators/progress-indicators";
import { Select } from "../../base/select/select";
import type { SelectItemType } from "../../base/select/select-shared";
import { sparkComparison } from "./data.a";
import { DashboardHeader, DashboardMain, DashboardSection, subNavItems } from "./shell.a";
import { PanelMenu, RowActions } from "./widgets.a";

const periods: SelectItemType[] = [
    { id: "7-days", label: "Last 7 days" },
    { id: "14-days", label: "Last 14 days" },
    { id: "30-days", label: "Last 30 days" },
    { id: "90-days", label: "Last 90 days" },
];

const metrics = [
    { title: "Total customers", value: "2,420", change: "40%", trend: "positive" as const, icon: UserSquare },
    { title: "Members", value: "1,210", change: "10%", trend: "negative" as const, icon: Users01 },
    { title: "Active now", value: "316", change: "20%", trend: "positive" as const, icon: Monitor01 },
];

/** Customer dashboard: three comparison metric cards over a filtered customers table. */
export const Dashboard07 = () => (
    <div className="bg-primary">
        <DashboardHeader activeUrl="/dashboard/overview" subItems={subNavItems} upgrade />

        <DashboardMain className="pb-16 lg:pb-24">
            <DashboardSection className="justify-between gap-4 lg:flex-row">
                <div className="flex flex-col gap-0.5 lg:gap-1">
                    <h1 className="text-primary text-xl font-semibold">Welcome back, {avatar(0).name.split(" ")[0]}</h1>
                    <p className="text-tertiary text-md">Track, manage and forecast your customers and orders.</p>
                </div>

                <div className="flex gap-3">
                    <Button color="secondary" size="md" iconLeading={UploadCloud02}>
                        Import
                    </Button>
                    <Button color="primary" size="md" iconLeading={Plus}>
                        Add
                    </Button>
                </div>
            </DashboardSection>

            <DashboardSection className="gap-5 md:flex-row md:flex-wrap lg:gap-6">
                {/* The cards head themselves with an `h3`, so the group needs an `h2` above them. */}
                <h2 className="sr-only">Customer summary</h2>

                {metrics.map((metric) => (
                    <MetricChart02
                        key={metric.title}
                        className="flex-1 md:min-w-80"
                        title={metric.title}
                        value={metric.value}
                        change={metric.change}
                        trend={metric.trend}
                        icon={metric.icon}
                        chartData={sparkComparison}
                        menu={<PanelMenu />}
                    />
                ))}
            </DashboardSection>

            <DashboardSection className="gap-6">
                <FilterBar className="max-md:flex-col">
                    <FilterBar.Content>
                        <Button color="secondary" size="md" className="max-lg:hidden">
                            Today
                        </Button>
                        <Select aria-label="Period" size="sm" defaultSelectedKey="7-days" items={periods} className="w-32 max-lg:hidden">
                            {(item: SelectItemType) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                        </Select>
                        <DateRangePicker aria-label="Date range" size="md" />
                    </FilterBar.Content>

                    <FilterBar.Actions className="max-md:w-full">
                        <Input shortcut aria-label="Search" placeholder="Search" icon={SearchLg} size="sm" className="min-w-0 max-md:flex-1 md:w-70" />
                        <FilterBar.FilterDropdown>
                            <p className="text-tertiary p-4 text-sm">Refine the table by status, plan and owner.</p>
                        </FilterBar.FilterDropdown>
                    </FilterBar.Actions>
                </FilterBar>

                <TableCard.Root className="-mx-4 rounded-none lg:mx-0 lg:rounded-xl">
                    <div className="overflow-x-auto">
                        <Table
                            aria-label="Customers"
                            selectionMode="multiple"
                            defaultSelectedKeys={customers.filter((_, index) => index !== 3 && index !== 4).map((item) => item.name)}
                        >
                            <Table.Header className="bg-secondary">
                                <Table.Head id="name" label="Company" isRowHeader allowsSorting className="w-full" />
                                <Table.Head id="licenseUse" label="License use" allowsSorting className="min-w-40" />
                                <Table.Head id="status" label="Status" allowsSorting />
                                <Table.Head id="users" label="Users" className="md:hidden xl:table-cell" />
                                <Table.Head id="about" label="About" allowsSorting />
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
                                            <ProgressBarBase value={item.licenseUse} />
                                        </Table.Cell>
                                        <Table.Cell>
                                            <BadgeWithDot size="sm" type="modern" color={item.status === "Customer" ? "success" : "gray"}>
                                                {item.status}
                                            </BadgeWithDot>
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
                                        <Table.Cell className="whitespace-nowrap">
                                            <p className="text-primary text-sm font-medium">{item.aboutTitle}</p>
                                            <p className="text-tertiary text-sm">{item.aboutDescription}</p>
                                        </Table.Cell>
                                        <Table.Cell className="px-4">
                                            <RowActions />
                                        </Table.Cell>
                                    </Table.Row>
                                )}
                            </Table.Body>
                        </Table>
                    </div>

                    <PaginationCardMinimal align="left" page={1} total={10} />
                </TableCard.Root>
            </DashboardSection>
        </DashboardMain>
    </div>
);
