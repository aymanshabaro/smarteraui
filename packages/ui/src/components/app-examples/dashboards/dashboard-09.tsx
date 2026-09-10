"use client";

import { useState } from "react";
import type { Key } from "react-aria";
import { ArrowDown, ArrowUp, Cube01, DownloadCloud02, Edit01, FilterLines, Plus, SearchLg, Sliders02, Trash01, UploadCloud02, Zap } from "@properui/icons";
import { SidebarNavigationSlim } from "@/components/application/app-navigation/sidebar-navigation/sidebar-slim";
import { Table, TableCard } from "@/components/application/table/table";
import { TablePaginationNumbered } from "@/components/application/table/table-pagination";
import { Tabs } from "@/components/application/tabs/tabs";
import { Avatar } from "@/components/base/avatar/avatar";
import { Badge, BadgeWithDot, BadgeWithIcon } from "@/components/base/badges/badges";
import { Button } from "@/components/base/buttons/button";
import { ButtonUtility } from "@/components/base/buttons/button-utility";
import { Dropdown } from "@/components/base/dropdown/dropdown";
import { Input } from "@/components/base/input/input";
import { ProgressBarBase } from "@/components/base/progress-indicators/progress-indicators";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";
import { cx } from "@/utils/cx";
import { ChartCard, RadialGauge, StackedBarChart, currentUser, navFooterItemsWithIcons, navItemsDualTier, styles, vendors } from "./dashboards-shared";

const vendorTabs = [
    { id: "all", label: "View all" },
    { id: "active", label: "Active" },
    { id: "archived", label: "Archived" },
];

const CardMenu = () => (
    <Dropdown.Root>
        <Dropdown.DotsButton />
        <Dropdown.Popover className="w-40">
            <Dropdown.Menu>
                <Dropdown.Item>View report</Dropdown.Item>
                <Dropdown.Item>Export</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown.Popover>
    </Dropdown.Root>
);

/** Dashboard 09 — a vendor dashboard: a monthly rating chart beside a usage gauge and upgrade CTA. */
export const Dashboard09 = () => {
    const [vendorTab, setVendorTab] = useState<Key>("all");
    const [page, setPage] = useState(1);
    const [selectedKeys, setSelectedKeys] = useState<"all" | Set<string>>(new Set(vendors.slice(0, 3).map((vendor) => vendor.name)));

    return (
        <div className={styles.page}>
            <SidebarNavigationSlim activeUrl="/dashboard" items={navItemsDualTier} footerItems={navFooterItemsWithIcons} />

            <main className={styles.main}>
                <div className={cx("flex flex-col gap-6", styles.gutter)}>
                    <div className="flex flex-col gap-4 md:flex-row md:items-start">
                        <h1 className={cx(styles.pageTitle, "flex-1")}>Welcome back, {currentUser.name.split(" ")[0]}</h1>

                        <div className="flex flex-wrap gap-3">
                            <ButtonUtility size="sm" color="tertiary" tooltip="Search" icon={SearchLg} />
                            <Button color="secondary" size="md" iconLeading={Sliders02}>
                                Customize
                            </Button>
                            <Button color="secondary" size="md" iconLeading={DownloadCloud02}>
                                Export
                            </Button>
                        </div>
                    </div>

                    <div className="flex flex-col gap-5 lg:flex-row lg:gap-6">
                        <ChartCard
                            title={
                                <span className="flex items-center gap-3">
                                    <FeaturedIcon size="lg" theme="modern" color="gray" icon={Cube01} />
                                    <span className="flex flex-col">
                                        <span>Vendor breakdown</span>
                                        <span className="text-tertiary text-sm font-normal">Keep track of vendors and their security ratings.</span>
                                    </span>
                                </span>
                            }
                            actions={<CardMenu />}
                            footer={
                                <Button color="secondary" size="md">
                                    View full report
                                </Button>
                            }
                            className="min-w-0 flex-1"
                        >
                            <StackedBarChart label="Vendor security ratings by month" yLabel="Security rating" className="h-64" />
                        </ChartCard>

                        <ChartCard
                            title="Vendors monitored"
                            description="You're using 80% of available spots."
                            actions={<CardMenu />}
                            footer={
                                <Button color="primary" size="md" iconLeading={Zap}>
                                    Upgrade plan
                                </Button>
                            }
                            className="lg:w-80 lg:shrink-0"
                        >
                            <div className="flex flex-col gap-5">
                                <div className="flex justify-end">
                                    <BadgeWithIcon size="sm" type="pill-color" color="success" iconLeading={ArrowUp}>
                                        10%
                                    </BadgeWithIcon>
                                </div>

                                <RadialGauge label="Vendors monitored against your plan limit" value={80} centerValue="240" />

                                <div className="flex flex-col gap-1">
                                    <p className="text-primary text-md font-semibold">You&rsquo;ve almost reached your limit</p>
                                    <p className="text-tertiary text-sm">You have used 80% of your available spots. Upgrade plan to monitor more vendors.</p>
                                </div>
                            </div>
                        </ChartCard>
                    </div>

                    <TableCard.Root>
                        <TableCard.Header
                            title="Vendor movements"
                            badge="240 vendors"
                            description="Keep track of vendors and their security ratings."
                            contentTrailing={
                                <div className="flex flex-wrap gap-3">
                                    <Button color="secondary" size="md" iconLeading={UploadCloud02}>
                                        Import
                                    </Button>
                                    <Button color="primary" size="md" iconLeading={Plus}>
                                        Add vendor
                                    </Button>
                                </div>
                            }
                        />

                        <div className="border-secondary flex flex-col gap-4 border-b px-4 py-3 md:flex-row md:items-center md:px-6">
                            <Tabs selectedKey={vendorTab} onSelectionChange={setVendorTab} className="w-auto">
                                <Tabs.List aria-label="Vendor status" type="button-minimal">
                                    {vendorTabs.map((tab) => (
                                        <Tabs.Item key={tab.id} id={tab.id} label={tab.label} />
                                    ))}
                                </Tabs.List>
                                {vendorTabs.map((tab) => (
                                    <Tabs.Panel key={tab.id} id={tab.id} />
                                ))}
                            </Tabs>

                            <div className="flex flex-1 flex-wrap items-center gap-3 md:justify-end">
                                <Input shortcut size="sm" aria-label="Search vendors" placeholder="Search" icon={SearchLg} className="w-full md:max-w-xs" />
                                <Button color="secondary" size="sm" iconLeading={FilterLines}>
                                    Filters
                                </Button>
                            </div>
                        </div>

                        <Table
                            aria-label="Vendor movements"
                            selectionMode="multiple"
                            selectedKeys={selectedKeys}
                            onSelectionChange={(keys) => setSelectedKeys(keys as "all" | Set<string>)}
                        >
                            <Table.Header>
                                <Table.Head id="vendor" label="Vendor" isRowHeader />
                                <Table.Head id="rating" label="Rating" className="w-full" />
                                <Table.Head id="assessed" label="Last assessed" className="max-md:hidden" />
                                <Table.Head id="categories" label="Categories" className="max-lg:hidden" />
                                <Table.Head id="actions">
                                    <span className="sr-only">Actions</span>
                                </Table.Head>
                            </Table.Header>

                            <Table.Body items={vendors}>
                                {(vendor) => (
                                    <Table.Row id={vendor.name}>
                                        <Table.Cell>
                                            <div className="flex items-center gap-3">
                                                <Avatar size="md" src={vendor.logoUrl} alt="" rounded={false} />
                                                <div className="whitespace-nowrap">
                                                    <p className="text-primary text-sm font-medium">{vendor.name}</p>
                                                    <p className="text-tertiary text-sm">{vendor.website}</p>
                                                </div>
                                            </div>
                                        </Table.Cell>
                                        <Table.Cell>
                                            <div className="flex items-center gap-3">
                                                <ProgressBarBase value={vendor.rating} className="hidden w-48 md:block" />
                                                <span className="text-secondary text-sm font-medium">{vendor.rating}</span>
                                                <BadgeWithIcon
                                                    size="sm"
                                                    type="modern"
                                                    color="gray"
                                                    iconLeading={vendor.trend === "positive" ? ArrowUp : ArrowDown}
                                                >
                                                    {vendor.change}%
                                                </BadgeWithIcon>
                                            </div>
                                        </Table.Cell>
                                        <Table.Cell className="whitespace-nowrap max-md:hidden">{vendor.lastAssessed}</Table.Cell>
                                        <Table.Cell className="max-lg:hidden">
                                            <div className="flex flex-wrap gap-1">
                                                <BadgeWithDot size="sm" type="modern" color={vendor.status === "Active" ? "success" : "gray"}>
                                                    {vendor.status}
                                                </BadgeWithDot>
                                                {vendor.categories.map((category) => (
                                                    <Badge key={category} size="sm" type="modern" color="gray">
                                                        {category}
                                                    </Badge>
                                                ))}
                                                {vendor.extraCategories > 0 && (
                                                    <Badge size="sm" type="modern" color="gray">
                                                        +{vendor.extraCategories}
                                                    </Badge>
                                                )}
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
