"use client";

import { Download01, FilterLines, Plus, SearchLg, Trash01 } from "@smarteraui/icons";
import { DateRangePicker } from "@/components/application/date-picker/date-range-picker";
import { MetricChangeIndicator } from "@/components/application/metrics/metrics-base";
import { PaginationPageDefault } from "@/components/application/pagination/pagination";
import { Table, TableCard } from "@/components/application/table/table";
import { customers } from "@/components/application/table/table-data";
import { Tabs } from "@/components/application/tabs/tabs";
import { Avatar } from "@/components/base/avatar/avatar";
import { Badge } from "@/components/base/badges/badges";
import { Button } from "@/components/base/buttons/button";
import { ButtonUtility } from "@/components/base/buttons/button-utility";
import { DropdownIconSimple } from "@/components/base/dropdown/dropdown-icon-simple";
import { Input } from "@/components/base/input/input";
import { ProgressBarBase } from "@/components/base/progress-indicators/progress-indicators";
import { Select } from "@/components/base/select/select";
import type { SelectItemType } from "@/components/base/select/select-shared";
import { AVATARS } from "@/utils/demo-assets";
import { AppHeader } from "./shell.a";

const subNavItems = [
    { label: "Overview", href: "/dashboard/overview" },
    { label: "Notifications", href: "/dashboard/notifications" },
    { label: "Analytics", href: "/dashboard/analytics" },
    { label: "Saved reports", href: "/dashboard/saved-reports" },
    { label: "Scheduled reports", href: "/dashboard/scheduled-reports" },
    { label: "Customers", href: "/dashboard/customers" },
];

const viewTabs = [
    { id: "overview", label: "Overview" },
    { id: "table", label: "Table" },
    { id: "list-view", label: "List view" },
    { id: "segment", label: "Segment" },
    { id: "custom", label: "Custom" },
];

const segmentTabs = [
    { id: "all", label: "All customers" },
    { id: "current", label: "Current" },
    { id: "churned", label: "Churned" },
    { id: "reports", label: "Reports" },
];

const periodOptions: SelectItemType[] = [
    { id: "7", label: "Last 7 days" },
    { id: "14", label: "Last 14 days" },
    { id: "30", label: "Last 30 days" },
    { id: "90", label: "Last 90 days" },
];

const metrics = [
    { id: "total-customers", label: "Total customers", value: "2,420", change: "12%" },
    { id: "members", label: "Members", value: "1,210", change: "24%" },
    { id: "active-now", label: "Active now", value: "316", change: "8%" },
];

const UserAvatarGroup = () => (
    <div className="flex -space-x-1">
        {AVATARS.slice(0, 5).map((person) => (
            <Avatar key={person.username} src={person.src} alt={person.alt} size="xs" className="ring-bg-primary ring-[1.5px]" />
        ))}
        <Avatar size="xs" initials="+5" className="ring-bg-primary ring-[1.5px]" />
    </div>
);

/** Informational page 07 — customer directory with underline view tabs, a vertical segment nav, metrics and a customers table. */
export const Informational07 = () => (
    <div className="bg-primary flex flex-col">
        <AppHeader activeUrl="/dashboard/customers" subItems={subNavItems} actions="upgrade" />

        <main className="bg-primary flex w-full flex-col gap-8 pt-8 pb-12 lg:pt-12 lg:pb-24">
            <div className="max-w-container mx-auto flex w-full flex-col gap-5 px-4 lg:px-8">
                <div className="flex flex-col gap-4 lg:flex-row">
                    <div className="flex flex-1 flex-col gap-0.5">
                        <h1 className="text-primary text-xl font-semibold">Customers</h1>
                    </div>

                    <div className="flex items-start gap-3">
                        <Button color="secondary" size="md" iconLeading={Download01}>
                            Import
                        </Button>
                        <Button color="primary" size="md" iconLeading={Plus}>
                            Add customer
                        </Button>
                    </div>
                </div>

                <div className="-mx-4 flex w-full flex-col ps-4">
                    <Tabs defaultSelectedKey="overview">
                        <Tabs.List type="underline" items={viewTabs}>
                            {(tab) => <Tabs.Item {...tab} />}
                        </Tabs.List>
                        {viewTabs.map((tab) => (
                            <Tabs.Panel key={tab.id} id={tab.id} />
                        ))}
                    </Tabs>
                </div>
            </div>

            <div className="max-w-container mx-auto flex w-full gap-16 px-4 lg:px-8">
                <div className="flex w-auto flex-col max-lg:hidden">
                    <Tabs orientation="vertical" defaultSelectedKey="all" className="w-auto">
                        <Tabs.List type="line" orientation="vertical" items={segmentTabs}>
                            {(tab) => <Tabs.Item {...tab} />}
                        </Tabs.List>
                        {segmentTabs.map((tab) => (
                            <Tabs.Panel key={tab.id} id={tab.id} />
                        ))}
                    </Tabs>
                </div>

                <div className="flex w-full min-w-0 flex-1 flex-col gap-8 lg:gap-6">
                    <div className="grid w-full grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-3">
                        {metrics.map((metric) => (
                            <div key={metric.id} className="bg-primary ring-secondary rounded-xl shadow-xs ring-1 ring-inset">
                                <div className="relative flex flex-col gap-2 px-4 py-5 md:px-5">
                                    <h2 className="text-tertiary text-sm font-medium">{metric.label}</h2>
                                    <div className="flex items-end gap-4">
                                        <p className="text-primary text-display-sm flex-1 font-semibold">{metric.value}</p>
                                        <MetricChangeIndicator type="modern" trend="positive">
                                            {metric.change}
                                        </MetricChangeIndicator>
                                    </div>

                                    <div className="absolute end-4 top-4 md:end-5 md:top-5">
                                        <DropdownIconSimple />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex w-full flex-col gap-6">
                        <div className="flex flex-wrap gap-3 max-md:flex-col">
                            <div className="flex min-w-0 flex-1 flex-wrap gap-3">
                                <Button color="secondary" size="md" className="max-lg:hidden">
                                    Today
                                </Button>

                                <Select
                                    size="sm"
                                    aria-label="Period"
                                    placeholder="Last 7 days"
                                    defaultSelectedKey="7"
                                    items={periodOptions}
                                    className="w-32 max-lg:hidden"
                                >
                                    {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                                </Select>

                                <DateRangePicker />
                            </div>

                            <div className="flex shrink-0 items-center gap-3 max-md:w-full">
                                <Input shortcut size="sm" aria-label="Search" placeholder="Search" icon={SearchLg} className="min-w-0 max-md:flex-1 md:w-70" />
                                <Button color="secondary" size="md" className="max-h-9" iconLeading={FilterLines}>
                                    Filters
                                </Button>
                            </div>
                        </div>

                        <TableCard.Root className="-mx-4 rounded-none lg:mx-0 lg:rounded-xl">
                            <Table aria-label="Customers" selectionMode="multiple" defaultSelectedKeys="all">
                                <Table.Header>
                                    <Table.Head id="company" label="Company" isRowHeader allowsSorting className="w-full" />
                                    <Table.Head id="status" label="Status" />
                                    <Table.Head id="users" label="Users" />
                                    <Table.Head id="license-use" label="License use" className="min-w-50" />
                                    <Table.Head id="actions">
                                        <span className="sr-only">Actions</span>
                                    </Table.Head>
                                </Table.Header>

                                <Table.Body items={customers}>
                                    {(customer) => (
                                        <Table.Row id={customer.name}>
                                            <Table.Cell>
                                                <div className="flex items-center gap-3">
                                                    <Avatar src={customer.logoUrl} alt="" size="md" />
                                                    <div>
                                                        <p className="text-primary text-sm font-medium">{customer.name}</p>
                                                        <p className="text-tertiary text-sm">{customer.website}</p>
                                                    </div>
                                                </div>
                                            </Table.Cell>
                                            <Table.Cell>
                                                <Badge
                                                    size="sm"
                                                    type="pill-color"
                                                    color={customer.status === "Customer" ? "success" : "gray"}
                                                    className="lowercase"
                                                >
                                                    {customer.status}
                                                </Badge>
                                            </Table.Cell>
                                            <Table.Cell>
                                                <UserAvatarGroup />
                                            </Table.Cell>
                                            <Table.Cell>
                                                <ProgressBarBase value={customer.licenseUse} />
                                            </Table.Cell>
                                            <Table.Cell className="px-4!">
                                                <div className="flex justify-end gap-0.5">
                                                    <ButtonUtility size="xs" color="tertiary" tooltip="Delete" icon={Trash01} />
                                                    <DropdownIconSimple />
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
            </div>
        </main>
    </div>
);
