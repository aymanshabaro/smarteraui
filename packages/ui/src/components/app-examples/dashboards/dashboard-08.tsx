"use client";

import { useState } from "react";
import { ArrowDown, ArrowUp, DownloadCloud02, Edit01, FilterLines, SearchLg, Sliders02, Trash01 } from "@properui/icons";
import { SidebarNavigationSectionDividers } from "@/components/application/app-navigation/sidebar-navigation/sidebar-section-dividers";
import { Table, TableCard } from "@/components/application/table/table";
import { TablePaginationMinimal } from "@/components/application/table/table-pagination";
import { Avatar } from "@/components/base/avatar/avatar";
import { Badge, BadgeWithDot, BadgeWithIcon } from "@/components/base/badges/badges";
import { Button } from "@/components/base/buttons/button";
import { ButtonUtility } from "@/components/base/buttons/button-utility";
import { Dropdown } from "@/components/base/dropdown/dropdown";
import { Input } from "@/components/base/input/input";
import { ProgressBarBase } from "@/components/base/progress-indicators/progress-indicators";
import { cx } from "@/utils/cx";
import { ChartCard, DonutChart, StackedBarChart, navItemsWithFolders, styles, vendors } from "./dashboards-shared";

const breakdown = [
    { name: "81–100", value: 18, className: "fill-utility-neutral-500" },
    { name: "61–80", value: 22, className: "fill-utility-neutral-300" },
    { name: "41–60", value: 26, className: "fill-utility-brand-600" },
    { name: "21–40", value: 20, className: "fill-utility-brand-400" },
    { name: "0–20", value: 14, className: "fill-utility-brand-200" },
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

/** Dashboard 08 — an organization overview pairing a vendor breakdown donut with a rating trend. */
export const Dashboard08 = () => {
    const [page, setPage] = useState(1);
    const [selectedKeys, setSelectedKeys] = useState<"all" | Set<string>>(new Set(vendors.slice(0, 3).map((vendor) => vendor.name)));

    return (
        <div className={styles.page}>
            <SidebarNavigationSectionDividers activeUrl="/dashboard" items={navItemsWithFolders} />

            <main className={styles.main}>
                <div className={cx("flex flex-col gap-6", styles.gutter)}>
                    <div className="flex flex-col gap-4 md:flex-row md:items-start">
                        <h1 className={cx(styles.pageTitle, "flex-1")}>Organization overview</h1>

                        <div className="flex flex-wrap gap-3">
                            <Button color="secondary" size="md" iconLeading={FilterLines}>
                                Filters
                            </Button>
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
                            title="Vendor breakdown"
                            actions={<CardMenu />}
                            footer={
                                <Button color="secondary" size="md">
                                    View full report
                                </Button>
                            }
                            className="lg:w-80 lg:shrink-0"
                        >
                            <div className="flex flex-col items-center gap-6 md:flex-row md:justify-center">
                                <DonutChart label="Vendors by security rating band" data={breakdown} className="size-44" />

                                <ul className="flex flex-col gap-2">
                                    {breakdown.map((band) => (
                                        <li key={band.name} className="text-tertiary flex items-center gap-2 text-sm font-medium">
                                            <span aria-hidden="true" className={cx("size-2 rounded-full", band.className.replace("fill-", "bg-"))} />
                                            {band.name}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </ChartCard>

                        <ChartCard
                            title="Average vendor rating"
                            description="Track how your rating compares to your industry average."
                            actions={<CardMenu />}
                            className="min-w-0 flex-1"
                        >
                            <StackedBarChart label="Average vendor rating by month" yLabel="Security rating" className="h-64" />
                        </ChartCard>
                    </div>

                    <TableCard.Root>
                        <TableCard.Header
                            title="Vendor movements"
                            description="Keep track of vendors and their security ratings."
                            contentTrailing={
                                <div className="flex w-full flex-wrap items-center gap-3 md:w-auto md:justify-end">
                                    <Input shortcut size="sm" aria-label="Search vendors" placeholder="Search" icon={SearchLg} className="md:w-72" />
                                    <Button color="secondary" size="sm" iconLeading={FilterLines}>
                                        Edit filters
                                    </Button>
                                </div>
                            }
                        />

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
                                                <ProgressBarBase value={vendor.rating} className="hidden w-40 md:block" />
                                                <span className="text-secondary text-sm font-medium">{vendor.rating}</span>
                                                <BadgeWithIcon
                                                    size="sm"
                                                    type="pill-color"
                                                    color={vendor.trend === "positive" ? "success" : "error"}
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
                                                    <Badge key={category} size="sm" color="brand">
                                                        {category}
                                                    </Badge>
                                                ))}
                                                {vendor.extraCategories > 0 && (
                                                    <Badge size="sm" color="gray">
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

                        <TablePaginationMinimal page={page} total={10} onPageChange={setPage} />
                    </TableCard.Root>
                </div>
            </main>
        </div>
    );
};
