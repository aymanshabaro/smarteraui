"use client";

import { useState } from "react";
import { FilterLines, SearchLg, X } from "@properui/icons";
import { cx } from "../../../utils/cx";
import { AVATARS, avatar } from "../../../utils/demo-assets";
import { FeaturedCardEventCTA } from "../../application/app-navigation/base-components/featured-cards";
import { SidebarNavigationSimple } from "../../application/app-navigation/sidebar-navigation/sidebar-simple";
import { Breadcrumbs } from "../../application/breadcrumbs/breadcrumbs";
import { Table, TableCard } from "../../application/table/table";
import { TablePaginationMinimal } from "../../application/table/table-pagination";
import { Avatar } from "../../base/avatar/avatar";
import { AvatarLabelGroup } from "../../base/avatar/avatar-label-group";
import { Badge } from "../../base/badges/badges";
import { Button } from "../../base/buttons/button";
import { ButtonUtility } from "../../base/buttons/button-utility";
import { Dropdown } from "../../base/dropdown/dropdown";
import { Input } from "../../base/input/input";
import { Select } from "../../base/select/select";
import { RangeTabs, StackedBarChart, navFooterItems, navItemsSimple, styles } from "./dashboards-shared";

const noop = () => {};

const owner = avatar(2);

const accessLabels: Array<Array<"Admin" | "Data export" | "Data import">> = [
    ["Admin", "Data export", "Data import"],
    ["Admin", "Data export", "Data import"],
    ["Data export", "Data import"],
    ["Data export", "Data import"],
    ["Data export", "Data import"],
    ["Data export", "Data import"],
    ["Data export", "Data import"],
];

const people = AVATARS.slice(0, 7).map((person, index) => ({
    person,
    access: accessLabels[index]!,
    lastActive: ["Jan 16, 2026", "Jan 16, 2026", "Jan 15, 2026", "Jan 14, 2026", "Jan 14, 2026", "Jan 16, 2026", "Jan 14, 2026"][index]!,
    dateAdded: ["Oct 10, 2024", "Aug 1, 2024", "Jul 28, 2024", "Sep 3, 2024", "Jan 18, 2024", "Jan 14, 2024", "Dec 16, 2024"][index]!,
}));

const filterFields = [
    { id: "status", label: "Status" },
    { id: "email", label: "Email" },
    { id: "team", label: "Team" },
    { id: "name", label: "Name" },
];

const filterOperators = [
    { id: "equals", label: "Equals" },
    { id: "contains", label: "Contains" },
    { id: "not-contains", label: "Does not contain" },
    { id: "starts-with", label: "Starts with" },
];

/** Dashboard 05 — a site traffic overview with an inline filter row over a recently-active table. */
export const Dashboard05 = () => {
    const [page, setPage] = useState(1);
    const [selectedKeys, setSelectedKeys] = useState<"all" | Set<string>>(new Set(["@phoenix", "@lana", "@demi"]));

    return (
        <div className={styles.page}>
            <SidebarNavigationSimple
                activeUrl="/dashboard"
                items={navItemsSimple}
                footerItems={navFooterItems}
                featureCard={
                    <FeaturedCardEventCTA
                        title="Join our workshop"
                        description="Learn how to leverage automation to supercharge your workflow."
                        confirmLabel="Join now!"
                        attendees={AVATARS.slice(0, 4).map((person) => ({ src: person.src, alt: person.name }))}
                        remainingCount={5}
                        onDismiss={noop}
                        onConfirm={noop}
                    />
                }
            />

            <main className={styles.main}>
                <div className={cx("flex flex-col gap-6", styles.gutter)}>
                    <Breadcrumbs aria-label="Breadcrumb">
                        <Breadcrumbs.Account href="/account" src={owner.src} alt="">
                            {owner.name}
                        </Breadcrumbs.Account>
                        <Breadcrumbs.Item href="/dashboard">Dashboard</Breadcrumbs.Item>
                    </Breadcrumbs>

                    <div className="flex flex-col gap-4 lg:flex-row lg:items-start">
                        <div className="flex flex-1 flex-col gap-1">
                            <h1 className={styles.pageTitle}>Welcome back, {owner.name.split(" ")[0]}</h1>
                            <p className={styles.pageSubtitle}>Here&rsquo;s an overview of your site traffic and recently active users.</p>
                        </div>

                        <div className={cx(styles.card, "shrink-0 p-3 max-lg:hidden")}>
                            <AvatarLabelGroup size="md" src={owner.src} alt="" status="online" title={owner.name} subtitle={owner.email} />
                        </div>
                    </div>

                    <section className="flex flex-col gap-5">
                        <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
                            <h2 className="flex flex-1 items-baseline gap-2">
                                <span className={styles.cardTitle}>Site traffic</span>
                                <span className="text-success-primary text-lg font-semibold">+104%</span>
                            </h2>

                            <div className="flex flex-wrap items-center gap-3">
                                <RangeTabs label="Traffic period" />
                                <Button color="secondary" size="md" iconLeading={FilterLines}>
                                    Filters
                                </Button>
                            </div>
                        </div>

                        <StackedBarChart label="Site traffic by month" className="h-56 lg:h-64" />
                    </section>

                    <TableCard.Root>
                        <TableCard.Header
                            title="Recently active"
                            contentTrailing={
                                <div className="w-full md:absolute md:end-6 md:top-4 md:w-80">
                                    <Input shortcut size="sm" aria-label="Search people" placeholder="Search" icon={SearchLg} />
                                </div>
                            }
                        />

                        <div className="border-secondary flex flex-wrap items-end gap-3 border-b px-4 py-3 md:px-6">
                            <ButtonUtility size="sm" color="secondary" tooltip="Filters" icon={FilterLines} />

                            <Select aria-label="Filter field" size="sm" placeholder="Filter" items={filterFields} className="w-40">
                                {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                            </Select>

                            <Select aria-label="Operator" size="sm" defaultSelectedKey="equals" items={filterOperators} className="w-40">
                                {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                            </Select>

                            <Input aria-label="Value" size="sm" placeholder="Enter a value" className="w-40" />

                            <ButtonUtility size="sm" color="tertiary" tooltip="Remove filter" icon={X} />

                            <Button color="link-gray" size="sm" className="ms-auto">
                                Clear all
                            </Button>
                        </div>

                        <Table
                            aria-label="Recently active users"
                            selectionMode="multiple"
                            selectedKeys={selectedKeys}
                            onSelectionChange={(keys) => setSelectedKeys(keys as "all" | Set<string>)}
                        >
                            <Table.Header>
                                <Table.Head id="name" label="Name" isRowHeader className="w-full" />
                                <Table.Head id="access" label="Access" className="max-md:hidden" />
                                <Table.Head id="lastActive" label="Last active" className="max-lg:hidden" />
                                <Table.Head id="dateAdded" label="Date added" className="max-lg:hidden" />
                                <Table.Head id="actions">
                                    <span className="sr-only">Actions</span>
                                </Table.Head>
                            </Table.Header>

                            <Table.Body items={people}>
                                {(row) => (
                                    <Table.Row id={row.person.username}>
                                        <Table.Cell>
                                            <div className="flex items-center gap-3">
                                                <Avatar size="md" src={row.person.src} alt="" />
                                                <div className="whitespace-nowrap">
                                                    <p className="text-primary text-sm font-medium">{row.person.name}</p>
                                                    <p className="text-tertiary text-sm">{row.person.email}</p>
                                                </div>
                                            </div>
                                        </Table.Cell>
                                        <Table.Cell className="max-md:hidden">
                                            <div className="flex flex-wrap gap-1">
                                                {row.access.map((label) => (
                                                    <Badge key={label} size="sm" color={label === "Admin" ? "brand" : "success"}>
                                                        {label}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </Table.Cell>
                                        <Table.Cell className="whitespace-nowrap max-lg:hidden">{row.lastActive}</Table.Cell>
                                        <Table.Cell className="whitespace-nowrap max-lg:hidden">{row.dateAdded}</Table.Cell>
                                        <Table.Cell className="px-4">
                                            <div className="flex justify-end">
                                                <Dropdown.Root>
                                                    <Dropdown.DotsButton />
                                                    <Dropdown.Popover className="w-40">
                                                        <Dropdown.Menu>
                                                            <Dropdown.Item>View profile</Dropdown.Item>
                                                            <Dropdown.Item>Change access</Dropdown.Item>
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
