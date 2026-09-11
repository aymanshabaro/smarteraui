"use client";

import { SearchLg } from "@properui/icons";
import { avatar } from "../../../utils/demo-assets";
import { DateRangePicker } from "../../application/date-picker/date-range-picker";
import { MetricChart04 } from "../../application/metrics/metrics";
import { MetricChangeIndicator } from "../../application/metrics/metrics-base";
import { PaginationCardMinimal } from "../../application/pagination/pagination";
import { Table } from "../../application/table/table";
import { TableRowActionsDropdown } from "../../application/table/table";
import { Avatar } from "../../base/avatar/avatar";
import { BadgeWithDot } from "../../base/badges/badges";
import { Input } from "../../base/input/input";
import { RatingStars } from "../../foundations/rating/rating-stars";
import { TrendChart } from "./charts.a";
import { dailySeries, orders, sparkUp } from "./data.a";
import { DashboardHeader, DashboardMain, DashboardSection } from "./shell.a";
import { FramedPanel, PanelMenu, PeriodTabs, SegmentTabs } from "./widgets.a";

const owner = avatar(0);

const metrics = [
    { title: "Sales", value: "$2,114.40", change: "2.4%" },
    { title: "Orders", value: "24", change: "8.6%" },
    { title: "Average order value", value: "$88.10", change: "6.0%" },
];

/** Ecommerce dashboard: sales/orders headline metrics, a 30-day sales chart and an orders table. */
export const Dashboard03 = () => (
    <div className="bg-primary">
        <DashboardHeader account="card" search settings={false} />

        <DashboardMain>
            <DashboardSection className="gap-5">
                <div className="flex flex-col gap-4 lg:flex-row">
                    <div className="flex flex-1 items-center gap-3">
                        <Avatar size="xl" src={owner.src} alt="" />
                        <div>
                            <h1 className="text-primary text-xl font-semibold">Welcome back, {owner.name.split(" ")[0]}</h1>
                            <p className="text-tertiary text-md">16 January, 2026</p>
                        </div>
                    </div>

                    <Input shortcut aria-label="Search" placeholder="Search" icon={SearchLg} size="sm" className="w-full lg:max-w-70" />
                </div>

                <div className="flex justify-between gap-6">
                    <SegmentTabs label="Time period" items={["Custom", "12 months", "30 days", "7 days", "24 hours"]} />
                    <div className="max-lg:hidden">
                        <DateRangePicker size="md" />
                    </div>
                </div>
            </DashboardSection>

            <DashboardSection className="gap-5 md:flex-row md:flex-wrap lg:gap-6">
                {/* The cards head themselves with an `h3`, so the group needs an `h2` above them. */}
                <h2 className="sr-only">Store summary</h2>

                {metrics.map((metric) => (
                    <MetricChart04
                        key={metric.title}
                        className="flex-1 md:min-w-80"
                        title={metric.title}
                        value={metric.value}
                        change={metric.change}
                        chartData={sparkUp}
                        menu={<PanelMenu />}
                    />
                ))}
            </DashboardSection>

            <DashboardSection>
                <FramedPanel title="Sales" contentClassName="gap-5 p-5">
                    <div className="flex flex-col items-start gap-4 lg:flex-row">
                        <div className="flex flex-1 flex-col gap-3">
                            <p className="text-display-sm text-primary font-semibold">$8,422.60</p>
                            <div className="flex gap-2">
                                <MetricChangeIndicator type="simple" icon="arrow">
                                    3.2%
                                </MetricChangeIndicator>
                                <p className="text-tertiary text-sm font-medium">vs last 30 days</p>
                            </div>
                        </div>

                        <PeriodTabs />
                    </div>

                    <TrendChart
                        className="h-54 lg:h-60"
                        data={dailySeries}
                        xKey="day"
                        series={[
                            { key: "A", name: "This period" },
                            { key: "B", name: "Previous period" },
                        ]}
                    />
                </FramedPanel>
            </DashboardSection>

            <DashboardSection className="gap-6">
                <FramedPanel title="Orders" contentClassName="rounded-b-none">
                    <div className="border-secondary flex flex-col items-start gap-4 border-b p-5 lg:flex-row">
                        <div className="flex flex-1 flex-col gap-3">
                            <p className="text-display-sm text-primary font-semibold">24</p>
                            <div className="flex gap-2">
                                <MetricChangeIndicator type="simple" icon="arrow">
                                    8.6%
                                </MetricChangeIndicator>
                                <p className="text-tertiary text-sm font-medium">vs last 30 days</p>
                            </div>
                        </div>

                        <SegmentTabs label="Order status" items={["All orders", "Paid", "Refunded"]} />
                    </div>

                    <div className="overflow-x-auto">
                        <Table aria-label="Orders" selectionMode="multiple">
                            <Table.Header>
                                <Table.Head id="id" label="Order" isRowHeader allowsSorting className="w-full" />
                                <Table.Head id="date" label="Date" allowsSorting />
                                <Table.Head id="status" label="Status" allowsSorting />
                                <Table.Head id="amount" label="Amount" allowsSorting />
                                <Table.Head id="rating" label="Rating" allowsSorting />
                                <Table.Head id="customer" label="Customer" allowsSorting />
                                <Table.Head id="actions">
                                    <span className="sr-only">Actions</span>
                                </Table.Head>
                            </Table.Header>

                            <Table.Body items={orders}>
                                {(item) => (
                                    <Table.Row id={item.id}>
                                        <Table.Cell className="text-primary font-medium! whitespace-nowrap">{item.id}</Table.Cell>
                                        <Table.Cell className="whitespace-nowrap">{item.date}</Table.Cell>
                                        <Table.Cell>
                                            <BadgeWithDot size="sm" type="pill-color" color="success">
                                                Paid
                                            </BadgeWithDot>
                                        </Table.Cell>
                                        <Table.Cell>{item.amount}</Table.Cell>
                                        <Table.Cell>
                                            <RatingStars rating={item.rating} aria-label={`Rated ${item.rating} out of 5`} />
                                        </Table.Cell>
                                        <Table.Cell>
                                            <div className="flex items-center gap-3 whitespace-nowrap">
                                                <Avatar size="md" src={item.src} alt="" />
                                                <div>
                                                    <p className="text-primary text-sm font-medium">{item.name}</p>
                                                    <p className="text-tertiary text-sm">{item.email}</p>
                                                </div>
                                            </div>
                                        </Table.Cell>
                                        <Table.Cell className="px-4">
                                            <div className="flex justify-end">
                                                <TableRowActionsDropdown />
                                            </div>
                                        </Table.Cell>
                                    </Table.Row>
                                )}
                            </Table.Body>
                        </Table>
                    </div>

                    <PaginationCardMinimal align="right" page={1} total={4} />
                </FramedPanel>
            </DashboardSection>
        </DashboardMain>
    </div>
);
