"use client";

import {
    BarChartSquare02,
    FilterLines,
    Folder,
    HomeLine,
    LayoutAlt01,
    MessageChatCircle,
    PieChart03,
    Plus,
    Rows01,
    SearchLg,
    Settings01,
    UploadCloud01,
    Users01,
} from "@properui/icons";
import { Edit01, Trash01 } from "@properui/icons";
import type { NavItemDividerType, NavItemType } from "@/components/application/app-navigation/config";
import { SidebarNavigationSectionDividers } from "@/components/application/app-navigation/sidebar-navigation/sidebar-section-dividers";
import { DateRangePicker } from "@/components/application/date-picker/date-range-picker";
import { MetricSimple } from "@/components/application/metrics/metrics";
import { PaginationPageDefault } from "@/components/application/pagination/pagination";
import { Table, TableCard } from "@/components/application/table/table";
import { customers } from "@/components/application/table/table-data";
import { TablePaginationMinimal } from "@/components/application/table/table-pagination";
import { Tabs } from "@/components/application/tabs/tabs";
import { Avatar } from "@/components/base/avatar/avatar";
import { BadgeWithDot } from "@/components/base/badges/badges";
import { Button } from "@/components/base/buttons/button";
import { ButtonUtility } from "@/components/base/buttons/button-utility";
import { DropdownIconSimple } from "@/components/base/dropdown/dropdown-icon-simple";
import { Input } from "@/components/base/input/input";
import { ProgressBarBase } from "@/components/base/progress-indicators/progress-indicators";
import { Select } from "@/components/base/select/select";
import type { SelectItemType } from "@/components/base/select/select-shared";
import { AVATARS } from "@/utils/demo-assets";

const navItems: (NavItemType | NavItemDividerType)[] = [
    { label: "Home", href: "/", icon: HomeLine },
    { label: "Dashboard", href: "/dashboard", icon: BarChartSquare02 },
    { label: "Projects", href: "/projects", icon: Rows01 },
    { divider: true },
    {
        label: "Folders",
        href: "/folders",
        icon: Folder,
        items: [
            { label: "View all", href: "/folders/view-all", badge: 18 },
            { label: "Recent", href: "/folders/recent", badge: 8 },
            { label: "Favorites", href: "/folders/favorites", badge: 6 },
            { label: "Shared", href: "/folders/shared", badge: 4 },
        ],
    },
    { divider: true },
    { label: "Reporting", href: "/reporting", icon: PieChart03 },
    { label: "Settings", href: "/settings", icon: Settings01 },
    {
        label: "Support",
        href: "/support",
        icon: MessageChatCircle,
        badge: (
            <BadgeWithDot color="success" type="modern" size="sm">
                Online
            </BadgeWithDot>
        ),
    },
    { label: "Customers", href: "/customers", icon: Users01 },
    { label: "Open in browser", href: "https://proper.example.com/", icon: LayoutAlt01 },
];

const tabs = [
    { id: "overview", label: "Overview" },
    { id: "table", label: "Table" },
    { id: "list-view", label: "List view" },
    { id: "segment", label: "Segment" },
    { id: "custom", label: "Custom" },
];

const periodOptions: SelectItemType[] = [
    { id: "7-days", label: "Last 7 days" },
    { id: "14-days", label: "Last 14 days" },
    { id: "30-days", label: "Last 30 days" },
    { id: "90-days", label: "Last 90 days" },
];

const teamAvatars = AVATARS.slice(0, 5);

const UserAvatarGroup = () => (
    <div className="flex -space-x-1">
        {teamAvatars.map((person) => (
            <Avatar key={person.username} src={person.src} alt={person.alt} size="xs" className="ring-bg-primary ring-[1.5px]" />
        ))}
        <Avatar size="xs" initials="+5" className="ring-bg-primary ring-[1.5px]" />
    </div>
);

const selectedCustomers = customers.filter((_, index) => index !== 3 && index !== 4).map((customer) => customer.name);

/** Informational page 07 — customer directory with metric cards, a date filter bar and a licence-use table. */
export const Informational07 = () => (
    <div className="bg-primary flex flex-col lg:flex-row">
        <SidebarNavigationSectionDividers activeUrl="/customers" items={navItems} />

        <main className="bg-primary flex w-full min-w-0 flex-1 flex-col gap-8 pt-8 pb-12">
            <div className="flex flex-col gap-5 px-4 lg:px-8">
                <div className="flex flex-col gap-4 lg:flex-row lg:justify-between">
                    <div className="flex flex-col gap-0.5 md:gap-1">
                        <p className="text-primary text-xl font-semibold">Customers</p>
                    </div>

                    <div className="flex items-start gap-3">
                        <Button color="secondary" size="md" iconLeading={UploadCloud01}>
                            Import
                        </Button>
                        <Button color="primary" size="md" iconLeading={Plus}>
                            Add customer
                        </Button>
                    </div>
                </div>

                <div className="-mx-4 flex w-full flex-col ps-4">
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

            <div className="flex w-full flex-col gap-x-6 gap-y-5 px-4 md:flex-row md:flex-wrap md:gap-y-6 lg:px-8">
                <MetricSimple title="Total customers" value="2,420" change="12%" menu={<DropdownIconSimple />} className="flex-1 md:min-w-[320px]" />
                <MetricSimple title="Members" value="1,210" change="24%" menu={<DropdownIconSimple />} className="flex-1 md:min-w-[320px]" />
                <MetricSimple title="Active now" value="316" change="8%" menu={<DropdownIconSimple />} className="flex-1 md:min-w-[320px]" />
            </div>

            <div className="flex w-full flex-col gap-6 px-4 lg:px-8">
                <div className="flex flex-wrap gap-3 max-md:flex-col">
                    <div className="flex min-w-0 flex-1 flex-wrap gap-3">
                        <Button color="secondary" size="md" className="max-lg:hidden">
                            Today
                        </Button>

                        <Select
                            size="sm"
                            aria-label="Period"
                            placeholder="Last 7 days"
                            defaultSelectedKey="7-days"
                            items={periodOptions}
                            className="w-32 max-lg:hidden"
                        >
                            {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                        </Select>

                        <DateRangePicker />
                    </div>

                    <div className="flex shrink-0 items-center gap-3 max-md:w-full">
                        <Input
                            shortcut
                            size="sm"
                            aria-label="Search customers"
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
                    <Table aria-label="Customers" selectionMode="multiple" defaultSelectedKeys={selectedCustomers}>
                        <Table.Header>
                            <Table.Head id="company" label="Company" isRowHeader allowsSorting className="w-full" />
                            <Table.Head id="about" label="About" />
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
                                            <Avatar src={customer.logoUrl} alt="" size="lg" />
                                            <div>
                                                <p className="text-primary text-sm font-medium">{customer.name}</p>
                                                <p className="text-tertiary text-sm">{customer.website}</p>
                                            </div>
                                        </div>
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
                                        <ProgressBarBase value={customer.licenseUse} />
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

                    <div className="max-lg:hidden">
                        <TablePaginationMinimal align="center" />
                    </div>
                </TableCard.Root>

                <div className="lg:hidden">
                    <PaginationPageDefault page={1} total={10} />
                </div>
            </div>
        </main>
    </div>
);
