"use client";

import { useState } from "react";
import { ChevronDown, Copy01, Edit01, FilterLines, LinkExternal01, SearchLg, Trash01, Zap } from "@smarteraui/icons";
import { FeaturedCardQRCode } from "@/components/application/app-navigation/base-components/featured-cards";
import { SidebarNavigationDualTier } from "@/components/application/app-navigation/sidebar-navigation/sidebar-dual-tier";
import { Breadcrumbs } from "@/components/application/breadcrumbs/breadcrumbs";
import { MetricIcon02 } from "@/components/application/metrics/metrics";
import { Table, TableCard } from "@/components/application/table/table";
import { TablePaginationMinimal } from "@/components/application/table/table-pagination";
import { Avatar } from "@/components/base/avatar/avatar";
import { BadgeWithDot } from "@/components/base/badges/badges";
import { Button } from "@/components/base/buttons/button";
import { ButtonUtility } from "@/components/base/buttons/button-utility";
import { Dropdown } from "@/components/base/dropdown/dropdown";
import { Input } from "@/components/base/input/input";
import { cx } from "@/utils/cx";
import { AVATARS, LOGOS } from "@/utils/demo-assets";
import { RangeTabs, TrendAreaChart, navFooterItemsWithIcons, navItemsDualTier, styles } from "./dashboards-shared";

const noop = () => {};

const headline = [
    { title: "All revenue", value: "$8,746.22", change: "2.4%", icon: Zap },
    { title: "Page views", value: "12,440", change: "6.2%", icon: LinkExternal01 },
    { title: "Active now", value: "96", change: "0.8%", icon: ChevronDown },
];

const customers = AVATARS.slice(0, 7).map((person, index) => ({
    person,
    date: ["Jan 16, 2026", "Jan 16, 2026", "Jan 15, 2026", "Jan 14, 2026", "Jan 14, 2026", "Jan 14, 2026", "Jan 14, 2026"][index]!,
    amount: ["$100.14", "$96.32", "$104.24", "$88.48", "$96.32", "$107.10", "$82.04"][index]!,
}));

/** Dashboard 04 — an analytics dashboard behind a dual-tier sidebar, with a net-revenue chart. */
export const Dashboard04 = () => {
    const [page, setPage] = useState(1);

    return (
        <div className={styles.page}>
            <SidebarNavigationDualTier
                activeUrl="/dashboard"
                items={navItemsDualTier}
                footerItems={navFooterItemsWithIcons}
                featureCard={
                    <FeaturedCardQRCode
                        title="Verify this device"
                        description="Open the app and scan the QR code below to verify this device."
                        value="https://smartera.example.com/verify/4060020"
                        onDismiss={noop}
                    />
                }
            />

            <main className={styles.main}>
                <div className={cx("flex flex-col gap-6", styles.gutter)}>
                    <Breadcrumbs aria-label="Breadcrumb">
                        <Breadcrumbs.Item href="/teams/warpspeed">{LOGOS[2].name}</Breadcrumbs.Item>
                        <Breadcrumbs.Account href="/account" src={AVATARS[4].src} alt="">
                            {AVATARS[4].name}
                        </Breadcrumbs.Account>
                        <Breadcrumbs.Item href="/dashboard">Dashboard</Breadcrumbs.Item>
                    </Breadcrumbs>

                    <div className="flex flex-col gap-4 md:flex-row md:items-start">
                        <h1 className={cx(styles.pageTitle, "flex-1")}>My dashboard</h1>

                        <div className="flex flex-wrap gap-3">
                            <Button color="secondary" size="md" iconLeading={Zap}>
                                What&rsquo;s new?
                            </Button>
                            <Button color="secondary" size="md" iconLeading={Copy01}>
                                Copy link
                            </Button>
                            <Button color="secondary" size="md" iconTrailing={LinkExternal01}>
                                Visit store
                            </Button>
                        </div>
                    </div>

                    <div className="grid gap-5 md:grid-cols-3 lg:gap-6">
                        {/* The cards head themselves with an `h3`, so the group needs an `h2` above them. */}
                        <h2 className="sr-only">Revenue summary</h2>

                        {headline.map((metric, index) => (
                            <MetricIcon02
                                key={metric.title}
                                title={metric.title}
                                value={metric.value}
                                change={metric.change}
                                icon={metric.icon}
                                iconColor="brand"
                                className={index === 0 ? "ring-brand ring-2" : undefined}
                            />
                        ))}
                    </div>

                    <section className="flex flex-col gap-5">
                        <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
                            <div className="flex flex-1 flex-col gap-2">
                                <p className={styles.caption}>Net revenue</p>
                                <div className="flex items-center gap-2">
                                    <span className="text-display-sm text-primary font-semibold">$7,804.16</span>
                                    <BadgeWithDot size="sm" color="success" type="modern">
                                        2.4%
                                    </BadgeWithDot>
                                </div>
                            </div>

                            <div className="flex flex-wrap items-center gap-3">
                                <RangeTabs label="Revenue period" />
                                <Button color="secondary" size="md" iconLeading={FilterLines}>
                                    Filters
                                </Button>
                            </div>
                        </div>

                        <TrendAreaChart label="Net revenue over the last 12 months" className="h-56 lg:h-72" />
                    </section>

                    <TableCard.Root>
                        <TableCard.Header
                            title="Customers"
                            contentTrailing={
                                <div className="w-full md:absolute md:end-6 md:top-4 md:w-80">
                                    <Input shortcut size="sm" aria-label="Search customers" placeholder="Search" icon={SearchLg} />
                                </div>
                            }
                        />

                        <Table aria-label="Customers" selectionMode="multiple">
                            <Table.Header>
                                <Table.Head id="customer" label="Customer" isRowHeader className="w-full" />
                                <Table.Head id="email" label="Email" className="max-lg:hidden" />
                                <Table.Head id="date" label="Date" className="max-md:hidden" />
                                <Table.Head id="status" label="Status" />
                                <Table.Head id="amount" label="Amount" />
                                <Table.Head id="actions">
                                    <span className="sr-only">Actions</span>
                                </Table.Head>
                            </Table.Header>

                            <Table.Body items={customers}>
                                {(row) => (
                                    <Table.Row id={row.person.username}>
                                        <Table.Cell>
                                            <div className="flex items-center gap-3">
                                                <Avatar size="md" src={row.person.src} alt="" />
                                                <div className="whitespace-nowrap">
                                                    <p className="text-primary text-sm font-medium">{row.person.name}</p>
                                                    <p className="text-tertiary text-sm">{row.person.username}</p>
                                                </div>
                                            </div>
                                        </Table.Cell>
                                        <Table.Cell className="whitespace-nowrap max-lg:hidden">{row.person.email}</Table.Cell>
                                        <Table.Cell className="whitespace-nowrap max-md:hidden">{row.date}</Table.Cell>
                                        <Table.Cell>
                                            <BadgeWithDot size="sm" color="success" type="modern">
                                                Paid
                                            </BadgeWithDot>
                                        </Table.Cell>
                                        <Table.Cell className="whitespace-nowrap">{row.amount}</Table.Cell>
                                        <Table.Cell className="px-4">
                                            <div className="flex justify-end gap-0.5">
                                                <ButtonUtility size="xs" color="tertiary" tooltip="Delete" icon={Trash01} />
                                                <ButtonUtility size="xs" color="tertiary" tooltip="Edit" icon={Edit01} />
                                                <Dropdown.Root>
                                                    <Dropdown.DotsButton />
                                                    <Dropdown.Popover className="w-40">
                                                        <Dropdown.Menu>
                                                            <Dropdown.Item>View profile</Dropdown.Item>
                                                            <Dropdown.Item>Send invoice</Dropdown.Item>
                                                        </Dropdown.Menu>
                                                    </Dropdown.Popover>
                                                </Dropdown.Root>
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
