"use client";

import { FilterLines, SearchLg, SwitchHorizontal01 } from "@smarteraui/icons";
import { MetricChart03 } from "@/components/application/metrics/metrics";
import { PaginationCardMinimal } from "@/components/application/pagination/pagination";
import { Table, TableCard } from "@/components/application/table/table";
import { BadgeWithDot } from "@/components/base/badges/badges";
import { Button } from "@/components/base/buttons/button";
import { ButtonUtility } from "@/components/base/buttons/button-utility";
import { Input } from "@/components/base/input/input";
import { ProgressBar } from "@/components/base/progress-indicators/progress-indicators";
import { sitePages, sparkUp } from "./data.a";
import { DashboardHeader, DashboardMain, DashboardSection } from "./shell.a";
import { FiltersButton, PanelMenu, PeriodTabs, RowActions, SegmentTabs } from "./widgets.a";

const sessionSources = ["All sessions", "Direct traffic", "Organic traffic", "Paid traffic", "Mobile users", "Returning users"];

const metrics = [
    { title: "Total sessions", value: "526", change: "2.4%" },
    { title: "Session duration", value: "2:24", change: "8.6%" },
    { title: "Pages per session", value: "316", change: "6.0%" },
];

/** Site traffic dashboard: session metrics with sparklines over a sortable pages-and-screens table. */
export const Dashboard02 = () => (
    <div className="bg-primary">
        <DashboardHeader account="button" search />

        <DashboardMain>
            <DashboardSection className="gap-5">
                <div className="flex flex-col gap-4 lg:flex-row">
                    <h1 className="text-primary flex-1 text-xl font-semibold">Site traffic</h1>

                    <div className="flex items-start gap-3">
                        <Button color="secondary" size="md" iconLeading={SwitchHorizontal01}>
                            Switch dashboard
                        </Button>
                        <Button color="secondary" size="md">
                            Export report
                        </Button>
                    </div>
                </div>

                <div className="flex justify-between overflow-auto max-lg:-mx-4 max-lg:px-4">
                    <SegmentTabs label="Traffic source" items={sessionSources} />
                    <PeriodTabs className="max-lg:hidden" />
                </div>
            </DashboardSection>

            <DashboardSection className="gap-5 md:flex-row md:flex-wrap lg:gap-6">
                {/* The cards head themselves with an `h3`, so the group needs an `h2` above them. */}
                <h2 className="sr-only">Session summary</h2>

                {metrics.map((metric) => (
                    <MetricChart03
                        key={metric.title}
                        className="flex-1 md:min-w-80"
                        title={metric.title}
                        value={metric.value}
                        change={metric.change}
                        changeDescription="vs last month"
                        chartData={sparkUp}
                        menu={<PanelMenu />}
                    />
                ))}
            </DashboardSection>

            <DashboardSection className="gap-6">
                <TableCard.Root className="-mx-4 rounded-none lg:mx-0 lg:rounded-xl">
                    <TableCard.Header title="Pages and screens" contentTrailing={<PanelMenu />} />

                    <div className="border-secondary bg-primary border-b px-4 py-3 lg:px-6">
                        <div className="flex flex-wrap gap-3 max-md:flex-col">
                            <SegmentTabs label="Page visibility" items={["View all", "Public", "Private"]} />

                            <div className="flex shrink-0 items-center gap-3 max-md:w-full md:ms-auto">
                                <Input shortcut aria-label="Search" placeholder="Search" icon={SearchLg} size="sm" className="min-w-0 max-md:flex-1 md:w-70" />
                                <ButtonUtility className="md:hidden" size="sm" color="secondary" tooltip="Filters" icon={FilterLines} />
                                <div className="max-md:hidden">
                                    <FiltersButton />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <Table aria-label="Pages and screens" selectionMode="multiple">
                            <Table.Header>
                                <Table.Head id="page" label="Page" isRowHeader allowsSorting className="w-full" />
                                <Table.Head id="sessions" label="Sessions" allowsSorting />
                                <Table.Head id="avgTime" label="Avg time" allowsSorting />
                                <Table.Head id="share" label="% of total" allowsSorting className="min-w-96" />
                                <Table.Head id="folder" label="Folder" allowsSorting />
                                <Table.Head id="actions">
                                    <span className="sr-only">Actions</span>
                                </Table.Head>
                            </Table.Header>

                            <Table.Body items={sitePages}>
                                {(item) => (
                                    <Table.Row id={item.page}>
                                        <Table.Cell className="font-medium! whitespace-nowrap">{item.page}</Table.Cell>
                                        <Table.Cell>{item.sessions}</Table.Cell>
                                        <Table.Cell className="whitespace-nowrap">{item.avgTime}</Table.Cell>
                                        <Table.Cell>
                                            <ProgressBar value={item.share} labelPosition="right" valueFormatter={() => item.percent} />
                                        </Table.Cell>
                                        <Table.Cell>
                                            <BadgeWithDot size="sm" type="modern" color="success">
                                                General
                                            </BadgeWithDot>
                                        </Table.Cell>
                                        <Table.Cell className="px-4">
                                            <RowActions />
                                        </Table.Cell>
                                    </Table.Row>
                                )}
                            </Table.Body>
                        </Table>
                    </div>

                    <PaginationCardMinimal align="right" page={1} total={10} />
                </TableCard.Root>
            </DashboardSection>
        </DashboardMain>
    </div>
);
