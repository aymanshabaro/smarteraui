"use client";

import { useMemo, useState } from "react";
import type { Key } from "react-aria";
import type { SortDescriptor as AriaSortDescriptor } from "react-aria-components";
import { Edit01, FilterLines, SearchLg, SwitchHorizontal01, Trash01 } from "@properui/icons";
import { SidebarNavigationSectionDividers } from "@/components/application/app-navigation/sidebar-navigation/sidebar-section-dividers";
import { MetricChart01 } from "@/components/application/metrics/metrics";
import { Table, TableCard } from "@/components/application/table/table";
import { TablePaginationNumbered } from "@/components/application/table/table-pagination";
import { Tabs } from "@/components/application/tabs/tabs";
import { Badge } from "@/components/base/badges/badges";
import { Button } from "@/components/base/buttons/button";
import { ButtonUtility } from "@/components/base/buttons/button-utility";
import { Dropdown } from "@/components/base/dropdown/dropdown";
import { Input } from "@/components/base/input/input";
import { ProgressBarBase } from "@/components/base/progress-indicators/progress-indicators";
import { cx } from "@/utils/cx";
import { navItemsWithFolders, sparklineUp, styles } from "./dashboards-shared";

const trafficTabs = [
    { id: "all", label: "All sessions" },
    { id: "direct", label: "Direct traffic" },
    { id: "organic", label: "Organic traffic" },
    { id: "paid", label: "Paid traffic" },
    { id: "mobile", label: "Mobile users" },
    { id: "returning", label: "Returning users" },
];

const visibilityTabs = [
    { id: "all", label: "View all" },
    { id: "public", label: "Public" },
    { id: "private", label: "Private" },
];

const summary = [
    { title: "Total sessions", value: "526", change: "2.4%" },
    { title: "Session duration", value: "2:24", change: "8.6%" },
    { title: "Pages per session", value: "316", change: "6.0%" },
];

interface PageRow {
    page: string;
    sessions: number;
    avgTime: string;
    share: number;
}

const pageRows: PageRow[] = [
    { page: "proper.example", sessions: 4288, avgTime: "1m 24s", share: 62.4 },
    { page: "proper.example/free-icons", sessions: 582, avgTime: "1m 8s", share: 8.2 },
    { page: "proper.example/icons", sessions: 464, avgTime: "1m 12s", share: 7.6 },
    { page: "proper.example/components", sessions: 446, avgTime: "2m 22s", share: 7.2 },
    { page: "proper.example/pricing", sessions: 382, avgTime: "48s", share: 7.0 },
    { page: "proper.example/faqs", sessions: 326, avgTime: "56s", share: 6.4 },
    { page: "proper.example/blog", sessions: 262, avgTime: "1m 14s", share: 5.4 },
];

/** Dashboard 02 — a site traffic report: session metrics above a filterable page-level table. */
export const Dashboard02 = () => {
    const [trafficTab, setTrafficTab] = useState<Key>("all");
    const [visibilityTab, setVisibilityTab] = useState<Key>("all");
    const [page, setPage] = useState(1);
    const [sortDescriptor, setSortDescriptor] = useState<AriaSortDescriptor>({ column: "sessions", direction: "descending" });

    const sortedRows = useMemo(() => {
        const column = sortDescriptor.column as keyof PageRow;
        return [...pageRows].sort((a, b) => {
            const first = a[column];
            const second = b[column];
            const comparison = typeof first === "number" && typeof second === "number" ? first - second : String(first).localeCompare(String(second));
            return sortDescriptor.direction === "descending" ? -comparison : comparison;
        });
    }, [sortDescriptor]);

    return (
        <div className={styles.page}>
            <SidebarNavigationSectionDividers activeUrl="/dashboard" items={navItemsWithFolders} />

            <main className={styles.main}>
                <div className={cx("flex flex-col gap-6", styles.gutter)}>
                    <div className="flex flex-col gap-4 md:flex-row md:items-start">
                        <h1 className={cx(styles.pageTitle, "flex-1")}>Site traffic</h1>

                        <div className="flex flex-wrap gap-3">
                            <Button color="secondary" size="md" iconLeading={SwitchHorizontal01}>
                                Switch dashboard
                            </Button>
                            <Button color="primary" size="md">
                                Export report
                            </Button>
                        </div>
                    </div>

                    <Tabs selectedKey={trafficTab} onSelectionChange={setTrafficTab}>
                        <Tabs.List aria-label="Traffic segment" type="button-border" className="w-max max-w-full overflow-x-auto">
                            {trafficTabs.map((tab) => (
                                <Tabs.Item key={tab.id} id={tab.id} label={tab.label} />
                            ))}
                        </Tabs.List>
                        {trafficTabs.map((tab) => (
                            <Tabs.Panel key={tab.id} id={tab.id} />
                        ))}
                    </Tabs>

                    <div className="grid gap-5 md:grid-cols-3 lg:gap-6">
                        {/* The cards head themselves with an `h3`, so the group needs an `h2` above them. */}
                        <h2 className="sr-only">Session summary</h2>

                        {summary.map((metric) => (
                            <MetricChart01
                                key={metric.title}
                                title={metric.title}
                                value={metric.value}
                                change={metric.change}
                                changeDescription="vs last month"
                                chartData={sparklineUp}
                                menu={
                                    <Dropdown.Root>
                                        <Dropdown.DotsButton />
                                        <Dropdown.Popover className="w-40">
                                            <Dropdown.Menu>
                                                <Dropdown.Item>View report</Dropdown.Item>
                                                <Dropdown.Item>Share</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown.Popover>
                                    </Dropdown.Root>
                                }
                            />
                        ))}
                    </div>

                    <TableCard.Root>
                        <TableCard.Header
                            title="Pages and screens"
                            contentTrailing={
                                <Dropdown.Root>
                                    <Dropdown.DotsButton />
                                    <Dropdown.Popover className="w-40">
                                        <Dropdown.Menu>
                                            <Dropdown.Item>Customize columns</Dropdown.Item>
                                            <Dropdown.Item>Export CSV</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown.Popover>
                                </Dropdown.Root>
                            }
                        />

                        <div className="border-secondary flex flex-col gap-4 border-b px-4 py-3 md:flex-row md:items-center md:px-6">
                            <Tabs selectedKey={visibilityTab} onSelectionChange={setVisibilityTab} className="w-auto">
                                <Tabs.List aria-label="Page visibility" type="button-minimal">
                                    {visibilityTabs.map((tab) => (
                                        <Tabs.Item key={tab.id} id={tab.id} label={tab.label} />
                                    ))}
                                </Tabs.List>
                                {visibilityTabs.map((tab) => (
                                    <Tabs.Panel key={tab.id} id={tab.id} />
                                ))}
                            </Tabs>

                            <div className="flex flex-1 flex-wrap items-center gap-3 md:justify-end">
                                <Input shortcut size="sm" aria-label="Search pages" placeholder="Search" icon={SearchLg} className="w-full md:max-w-xs" />
                                <Button color="secondary" size="sm" iconLeading={FilterLines}>
                                    Filters
                                </Button>
                            </div>
                        </div>

                        <Table aria-label="Pages and screens" selectionMode="multiple" sortDescriptor={sortDescriptor} onSortChange={setSortDescriptor}>
                            <Table.Header>
                                <Table.Head id="page" label="Page" isRowHeader allowsSorting className="w-full" />
                                <Table.Head id="sessions" label="Sessions" allowsSorting />
                                <Table.Head id="avgTime" label="Avg time" allowsSorting className="max-md:hidden" />
                                <Table.Head id="share" label="% of total" allowsSorting />
                                <Table.Head id="folder" label="Folder" className="max-lg:hidden" />
                                <Table.Head id="actions">
                                    <span className="sr-only">Actions</span>
                                </Table.Head>
                            </Table.Header>

                            <Table.Body items={sortedRows}>
                                {(row) => (
                                    <Table.Row id={row.page}>
                                        <Table.Cell className="text-primary text-sm font-medium whitespace-nowrap">{row.page}</Table.Cell>
                                        <Table.Cell className="whitespace-nowrap">{row.sessions.toLocaleString()}</Table.Cell>
                                        <Table.Cell className="whitespace-nowrap max-md:hidden">{row.avgTime}</Table.Cell>
                                        <Table.Cell>
                                            <div className="flex items-center gap-3">
                                                <ProgressBarBase value={row.share} max={70} className="hidden w-40 lg:block" />
                                                <span className="whitespace-nowrap">{row.share.toFixed(1)}%</span>
                                            </div>
                                        </Table.Cell>
                                        <Table.Cell className="max-lg:hidden">
                                            <Badge size="sm" type="modern" color="gray">
                                                General
                                            </Badge>
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
