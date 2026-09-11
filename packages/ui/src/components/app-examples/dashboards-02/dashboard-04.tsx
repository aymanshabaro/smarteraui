"use client";

import { ChevronDown, CurrencyDollarCircle, Eye, SearchLg, UserCircle } from "@properui/icons";
import { MetricIcon03 } from "../../application/metrics/metrics";
import { MetricChangeIndicator } from "../../application/metrics/metrics-base";
import { PaginationPageDefault } from "../../application/pagination/pagination";
import { Table, TableRowActionsDropdown } from "../../application/table/table";
import { Avatar } from "../../base/avatar/avatar";
import { Badge } from "../../base/badges/badges";
import { Button } from "../../base/buttons/button";
import { Input } from "../../base/input/input";
import { StackedBarChart } from "./charts.a";
import { customerRows, stackedSeries } from "./data.a";
import { DashboardHeader, DashboardMain, DashboardSection, subNavItems } from "./shell.a";
import { FiltersButton, PeriodTabs, RowActions } from "./widgets.a";

const metrics = [
    { title: "All revenue", value: "$8,746.22", change: "2.4%", icon: CurrencyDollarCircle, highlighted: true },
    { title: "Page views", value: "12,440", change: "6.2%", icon: Eye, highlighted: false },
    { title: "Active now", value: "96", change: "0.8%", icon: UserCircle, highlighted: false },
];

/** Analytics dashboard: selectable revenue metrics driving a stacked bar chart and a customers table. */
export const Dashboard04 = () => (
    <div className="bg-primary">
        <DashboardHeader activeUrl="/dashboard/overview" subItems={subNavItems} upgrade />

        <DashboardMain>
            <DashboardSection>
                <h1 className="text-primary text-xl font-semibold">My dashboard</h1>
            </DashboardSection>

            <div className="max-w-container -my-2 flex w-full max-w-full flex-col gap-4 overflow-x-auto px-4 py-2 md:mx-auto md:w-max md:flex-row md:flex-wrap md:items-start lg:w-full lg:gap-5 lg:px-8">
                {/* The cards head themselves with an `h3`, so the group needs an `h2` above them. */}
                <h2 className="sr-only">Revenue summary</h2>

                {metrics.map((metric) => (
                    <MetricIcon03
                        key={metric.title}
                        className={
                            metric.highlighted
                                ? "ring-brand flex-1 ring-2 max-lg:**:data-featured-icon:hidden md:min-w-80"
                                : "flex-1 max-lg:**:data-featured-icon:hidden md:min-w-80"
                        }
                        title={metric.title}
                        value={metric.value}
                        change={metric.change}
                        changeDescription="vs last month"
                        icon={metric.icon}
                    />
                ))}
            </div>

            <DashboardSection className="gap-5">
                <div className="flex flex-col items-start justify-between gap-4 lg:flex-row">
                    <div className="flex flex-col items-start gap-2">
                        <Button color="link-gray" size="sm" iconTrailing={ChevronDown}>
                            Net revenue
                        </Button>

                        <div className="flex items-center gap-3">
                            <span className="text-display-sm text-primary font-semibold">$7,804.16</span>
                            <MetricChangeIndicator type="simple" icon="arrow">
                                2.4%
                            </MetricChangeIndicator>
                        </div>
                    </div>

                    <div className="flex gap-3">
                        <PeriodTabs selectedKey="12-months" />
                        <FiltersButton />
                    </div>
                </div>

                <StackedBarChart
                    className="h-60 lg:h-66"
                    data={stackedSeries}
                    xKey="month"
                    series={[
                        { key: "A", name: "New" },
                        { key: "B", name: "Returning" },
                        { key: "C", name: "Referred" },
                    ]}
                />
            </DashboardSection>

            <DashboardSection className="gap-5">
                <div className="flex flex-col items-start justify-between gap-4 lg:flex-row lg:items-center">
                    <h2 className="text-primary text-xl font-semibold">Customers</h2>
                    <Input shortcut aria-label="Search" placeholder="Search" icon={SearchLg} size="sm" className="w-full lg:max-w-70" />
                </div>

                <div className="overflow-x-auto">
                    <Table aria-label="Customers" selectionMode="multiple">
                        <Table.Header>
                            <Table.Head id="name" label="Customer" isRowHeader allowsSorting className="w-full" />
                            <Table.Head id="email" label="Email" allowsSorting className="max-lg:hidden" />
                            <Table.Head id="date" label="Date" allowsSorting className="max-lg:hidden" />
                            <Table.Head id="status" label="Status" allowsSorting className="max-lg:hidden" />
                            <Table.Head id="amount" label="Amount" allowsSorting className="max-lg:hidden" />
                            <Table.Head id="actions">
                                <span className="sr-only">Actions</span>
                            </Table.Head>
                        </Table.Header>

                        <Table.Body items={customerRows}>
                            {(item) => (
                                <Table.Row id={item.name}>
                                    <Table.Cell className="text-nowrap">
                                        <div className="flex w-max items-center gap-3">
                                            <Avatar size="md" src={item.src} alt="" />
                                            <div>
                                                <p className="text-primary text-sm font-medium">{item.name}</p>
                                                <p className="text-tertiary text-sm">{item.username}</p>
                                            </div>
                                        </div>
                                    </Table.Cell>
                                    <Table.Cell className="text-nowrap max-lg:hidden">{item.email}</Table.Cell>
                                    <Table.Cell className="text-nowrap max-lg:hidden">{item.date}</Table.Cell>
                                    <Table.Cell className="max-lg:hidden">
                                        <Badge size="sm" type="modern" color="gray">
                                            paid
                                        </Badge>
                                    </Table.Cell>
                                    <Table.Cell className="max-lg:hidden">{item.amount}</Table.Cell>
                                    <Table.Cell className="ps-4 pe-0">
                                        <div className="max-lg:hidden">
                                            <RowActions />
                                        </div>
                                        <div className="flex items-center justify-end lg:hidden">
                                            <TableRowActionsDropdown />
                                        </div>
                                    </Table.Cell>
                                </Table.Row>
                            )}
                        </Table.Body>
                    </Table>
                </div>

                <PaginationPageDefault page={1} total={10} />
            </DashboardSection>
        </DashboardMain>
    </div>
);
