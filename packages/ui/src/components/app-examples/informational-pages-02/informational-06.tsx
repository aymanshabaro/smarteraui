"use client";

import { DownloadCloud01, Monitor04, SearchLg, UserCheck01, UserPlus01 } from "@properui/icons";
import { MetricChangeIndicator } from "@/components/application/metrics/metrics-base";
import { Table, TableCard } from "@/components/application/table/table";
import { customers } from "@/components/application/table/table-data";
import { Tabs } from "@/components/application/tabs/tabs";
import { Avatar } from "@/components/base/avatar/avatar";
import { Badge } from "@/components/base/badges/badges";
import { Button } from "@/components/base/buttons/button";
import { DropdownIconSimple } from "@/components/base/dropdown/dropdown-icon-simple";
import { Input } from "@/components/base/input/input";
import { ProgressBar } from "@/components/base/progress-indicators/progress-indicators";
import { Select } from "@/components/base/select/select";
import type { SelectItemType } from "@/components/base/select/select-shared";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";
import { AVATARS } from "@/utils/demo-assets";
import { AppHeader, productNavItems } from "./shell.a";

const navItems = [...productNavItems.slice(0, 5), { label: "Customers", href: "/customers" }];

const tabs = [
    { id: "overview", label: "Overview" },
    { id: "table", label: "Table" },
    { id: "list-view", label: "List view" },
    { id: "segment", label: "Segment" },
    { id: "custom", label: "Custom" },
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

const metrics = [
    { id: "total-customers", label: "Total customers", value: "2,420", change: "12%", icon: UserCheck01 },
    { id: "members", label: "Members", value: "1,210", change: "24%", icon: UserPlus01 },
    { id: "active-now", label: "Active now", value: "316", change: "8%", icon: Monitor04 },
];

const UserAvatarGroup = () => (
    <div className="flex -space-x-1">
        {AVATARS.slice(0, 5).map((person) => (
            <Avatar key={person.username} src={person.src} alt={person.alt} size="xs" className="ring-bg-primary ring-[1.5px]" />
        ))}
        <Avatar size="xs" initials="+5" className="ring-bg-primary ring-[1.5px]" />
    </div>
);

/** Informational page 06 — customer overview with underline tabs, metric cards and an alternating-row customers table. */
export const Informational06 = () => (
    <div className="bg-primary flex flex-col">
        <AppHeader activeUrl="/customers" items={navItems} />

        <main className="bg-primary max-w-container mx-auto flex w-full flex-col gap-8 pt-8 pb-12 lg:pt-12 lg:pb-24">
            <div className="flex flex-col gap-5 px-4 lg:px-8">
                <h1 className="text-primary text-xl font-semibold">Customers</h1>

                <div className="-mx-4 inline-flex w-full flex-col ps-4">
                    <Tabs defaultSelectedKey="overview">
                        <Tabs.List type="underline" items={tabs}>
                            {(tab) => <Tabs.Item {...tab} />}
                        </Tabs.List>
                        {tabs.map((tab) => (
                            <Tabs.Panel key={tab.id} id={tab.id} />
                        ))}
                    </Tabs>
                </div>
            </div>

            <div className="flex flex-col gap-x-6 gap-y-5 px-4 md:flex-row md:flex-wrap md:gap-y-6 lg:px-8">
                {metrics.map((metric) => (
                    <div key={metric.id} className="bg-primary ring-secondary flex-1 rounded-xl shadow-xs ring-1 ring-inset md:min-w-80">
                        <div className="relative flex flex-col gap-4 px-4 py-5 md:gap-5 md:px-5">
                            <FeaturedIcon size="lg" theme="modern-neue" color="gray" icon={metric.icon} />

                            <div className="flex flex-col gap-2">
                                <h2 className="text-tertiary text-sm font-medium">{metric.label}</h2>
                                <div className="flex items-end gap-4">
                                    <p className="text-primary text-display-sm flex-1 font-semibold">{metric.value}</p>
                                    <MetricChangeIndicator type="modern" trend="positive">
                                        {metric.change}
                                    </MetricChangeIndicator>
                                </div>
                            </div>

                            <div className="absolute end-4 top-4 md:end-5 md:top-5">
                                <DropdownIconSimple />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex flex-col gap-6 px-4 lg:px-8">
                <div className="relative flex flex-col items-start gap-4 md:flex-row">
                    <div className="flex min-w-0 flex-1 flex-col justify-center gap-0.5 self-stretch">
                        <h2 className="text-primary text-md font-semibold">Customers</h2>
                        <p className="text-tertiary text-sm">Companies that have purchased a subscription.</p>
                    </div>

                    <div className="hidden gap-3 lg:flex">
                        <Button color="secondary" size="md" iconLeading={DownloadCloud01}>
                            Download all
                        </Button>
                    </div>

                    <div className="absolute end-0 top-0 lg:static lg:hidden">
                        <DropdownIconSimple />
                    </div>
                </div>

                <TableCard.Root className="-mx-4 rounded-none ring-0 lg:mx-0 lg:rounded-xl lg:ring-1">
                    <div className="border-secondary border-b px-4 pb-6 lg:px-6 lg:py-5">
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

                    <Table aria-label="Customers" selectionMode="multiple">
                        <Table.Header className="bg-primary">
                            <Table.Head id="company" label="Company" isRowHeader allowsSorting className="w-full" />
                            <Table.Head id="status" label="Status" />
                            <Table.Head id="about" label="About" />
                            <Table.Head id="users" label="Users" />
                            <Table.Head id="license-use" label="License use" className="min-w-60" />
                            <Table.Head id="actions">
                                <span className="sr-only">Actions</span>
                            </Table.Head>
                        </Table.Header>

                        <Table.Body items={customers}>
                            {(customer) => (
                                <Table.Row id={customer.name} className="odd:bg-secondary">
                                    <Table.Cell>
                                        <div className="flex items-center gap-3">
                                            <Avatar src={customer.logoUrl} alt="" size="lg" />
                                            <div>
                                                <p className="text-primary text-sm font-medium">{customer.name}</p>
                                                <p className="text-tertiary text-sm">{customer.website}</p>
                                            </div>
                                        </div>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Badge size="sm" type="modern" color="gray">
                                            {customer.status}
                                        </Badge>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <div>
                                            <p className="text-primary text-sm font-medium whitespace-nowrap">{customer.aboutTitle}</p>
                                            <p className="text-tertiary text-sm whitespace-nowrap">{customer.aboutDescription}</p>
                                        </div>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <UserAvatarGroup />
                                    </Table.Cell>
                                    <Table.Cell>
                                        <ProgressBar value={customer.licenseUse} labelPosition="right" />
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
        </main>
    </div>
);
