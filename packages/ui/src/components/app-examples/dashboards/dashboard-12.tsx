"use client";

import { useState } from "react";
import type { Key } from "react-aria";
import { Calendar as CalendarIcon, Edit01, FilterLines, Monitor01, Plus, ShoppingCart01, Umbrella03 } from "@smarteraui/icons";
import { SidebarNavigationSlim } from "@/components/application/app-navigation/sidebar-navigation/sidebar-slim";
import { PageHeader } from "@/components/application/page-headers/page-headers";
import { Table } from "@/components/application/table/table";
import { TablePaginationMinimal } from "@/components/application/table/table-pagination";
import { Tabs } from "@/components/application/tabs/tabs";
import { Avatar } from "@/components/base/avatar/avatar";
import { Badge, BadgeWithDot } from "@/components/base/badges/badges";
import { Button } from "@/components/base/buttons/button";
import { ButtonUtility } from "@/components/base/buttons/button-utility";
import { Dropdown } from "@/components/base/dropdown/dropdown";
import { ProgressBarBase } from "@/components/base/progress-indicators/progress-indicators";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";
import { MastercardIcon, VisaIcon } from "@/components/foundations/payment-icons";
import { CreditCard } from "@/components/shared-assets/credit-card/credit-card";
import { cx } from "@/utils/cx";
import { IMAGES } from "@/utils/demo-assets";
import { TrendAreaChart, currentUser, navFooterItemsWithIcons, navItemsDualTier, styles, transactions } from "./dashboards-shared";

const accountTabs = [
    { id: "personal", label: "Personal" },
    { id: "business", label: "Business" },
    { id: "credit", label: "Credit" },
];

const budgets = [
    { label: "Subscriptions", remaining: "$25 left", progress: 82, icon: Monitor01, color: "brand" as const },
    { label: "Food and booze", remaining: "$120 left", progress: 68, icon: ShoppingCart01, color: "error" as const },
    { label: "Groceries", remaining: "$200 left", progress: 54, icon: Umbrella03, color: "success" as const },
];

const categoryColors: Record<string, "brand" | "error" | "success" | "warning"> = {
    Subscriptions: "brand",
    "Food and dining": "error",
    Income: "success",
    Groceries: "warning",
};

/** Dashboard 12 — a financial dashboard: a balance chart and ledger beside a profile and budget rail. */
export const Dashboard12 = () => {
    const [account, setAccount] = useState<Key>("personal");
    const [page, setPage] = useState(1);

    return (
        <div className={styles.page}>
            <SidebarNavigationSlim activeUrl="/dashboard" items={navItemsDualTier} footerItems={navFooterItemsWithIcons} />

            <div className="flex min-w-0 flex-1 flex-col xl:flex-row">
                <main className="bg-primary min-w-0 flex-1 pt-8 pb-12">
                    <div className={cx("flex flex-col gap-6", styles.gutter)}>
                        <div className="flex flex-col gap-4 md:flex-row md:items-center">
                            <div className="flex flex-1 flex-col gap-2">
                                <p className={styles.caption}>Your balance</p>
                                <div className="flex items-center gap-3">
                                    <img src="/flags/US.svg" alt="United States" className="h-6 w-8 rounded object-cover" />
                                    <span className="text-display-md text-primary font-semibold">$40,206.20</span>
                                </div>
                            </div>

                            <Tabs selectedKey={account} onSelectionChange={setAccount} className="w-auto">
                                <Tabs.List aria-label="Account" type="button-minimal">
                                    {accountTabs.map((tab) => (
                                        <Tabs.Item key={tab.id} id={tab.id} label={tab.label} />
                                    ))}
                                </Tabs.List>
                                {accountTabs.map((tab) => (
                                    <Tabs.Panel key={tab.id} id={tab.id} />
                                ))}
                            </Tabs>
                        </div>

                        <TrendAreaChart label="Balance over the last 12 months" className="h-56 lg:h-64" />

                        <div className="flex flex-col gap-4 md:flex-row md:items-center">
                            <h2 className={cx(styles.cardTitle, "flex-1")}>Transaction history</h2>

                            <div className="flex flex-wrap gap-3">
                                <Button color="secondary" size="md" iconLeading={CalendarIcon}>
                                    Select dates
                                </Button>
                                <Button color="secondary" size="md" iconLeading={FilterLines}>
                                    Apply filter
                                </Button>
                            </div>
                        </div>

                        <div className="flex flex-col">
                            <Table aria-label="Transaction history">
                                <Table.Header bordered>
                                    <Table.Head id="transaction" label="Transaction" isRowHeader className="w-full" />
                                    <Table.Head id="amount" label="Amount" />
                                    <Table.Head id="date" label="Date" className="max-md:hidden" />
                                    <Table.Head id="category" label="Category" className="max-lg:hidden" />
                                    <Table.Head id="account" label="Account" className="max-lg:hidden" />
                                    <Table.Head id="actions">
                                        <span className="sr-only">Actions</span>
                                    </Table.Head>
                                </Table.Header>

                                <Table.Body items={transactions}>
                                    {(transaction) => (
                                        <Table.Row id={transaction.id}>
                                            <Table.Cell>
                                                <div className="flex items-center gap-3">
                                                    <Avatar size="md" initials={transaction.initials} />
                                                    <span className="text-primary text-sm font-medium whitespace-nowrap">{transaction.merchant}</span>
                                                </div>
                                            </Table.Cell>
                                            <Table.Cell
                                                className={cx("whitespace-nowrap", transaction.isIncome ? "text-success-primary font-medium" : undefined)}
                                            >
                                                {transaction.isIncome ? "+" : "−"} ${transaction.amount}
                                            </Table.Cell>
                                            <Table.Cell className="whitespace-nowrap max-md:hidden">{transaction.date}</Table.Cell>
                                            <Table.Cell className="max-lg:hidden">
                                                <BadgeWithDot size="sm" type="pill-color" color={categoryColors[transaction.category]}>
                                                    {transaction.category}
                                                </BadgeWithDot>
                                            </Table.Cell>
                                            <Table.Cell className="max-lg:hidden">
                                                <div className="flex items-center gap-3">
                                                    {transaction.account === "Visa" ? (
                                                        <VisaIcon aria-hidden="true" className="h-6 w-auto" />
                                                    ) : (
                                                        <MastercardIcon aria-hidden="true" className="h-6 w-auto" />
                                                    )}
                                                    <div className="whitespace-nowrap">
                                                        <p className="text-primary text-sm font-medium">{transaction.account} 1234</p>
                                                        <p className="text-tertiary text-sm">Expiry 06/2028</p>
                                                    </div>
                                                </div>
                                            </Table.Cell>
                                            <Table.Cell className="px-4">
                                                <div className="flex justify-end">
                                                    <ButtonUtility size="xs" color="tertiary" tooltip="Edit" icon={Edit01} />
                                                </div>
                                            </Table.Cell>
                                        </Table.Row>
                                    )}
                                </Table.Body>
                            </Table>

                            <TablePaginationMinimal page={page} total={10} onPageChange={setPage} />
                        </div>
                    </div>
                </main>

                <aside className="border-secondary flex w-full shrink-0 flex-col gap-6 pb-12 xl:w-96 xl:border-s">
                    <PageHeader className="gap-4 px-0 md:px-0">
                        <PageHeader.Banner src={IMAGES.landscape[3].src} alt="" className="mx-0 md:mx-0" />
                        <PageHeader.Content className="px-4 md:px-6">
                            <PageHeader.Avatar src={currentUser.src} alt="" verified wrapperClassName="md:basis-auto" />
                            <PageHeader.Heading>
                                <div className="flex items-center gap-2">
                                    <PageHeader.Title className="text-display-xs md:text-display-xs">{currentUser.name}</PageHeader.Title>
                                    <BadgeWithDot size="sm" type="pill-color" color="brand">
                                        Premium
                                    </BadgeWithDot>
                                </div>
                                <PageHeader.Description className="text-sm">{currentUser.email}</PageHeader.Description>
                            </PageHeader.Heading>
                        </PageHeader.Content>
                    </PageHeader>

                    <section className="flex flex-col gap-4 px-4 md:px-6">
                        <div className="flex items-center gap-4">
                            <h2 className={cx(styles.cardTitle, "flex-1")}>My cards</h2>
                            <Button color="link-color" size="sm" iconLeading={Plus}>
                                Add card
                            </Button>
                        </div>

                        <div className="flex gap-4 overflow-x-auto pb-2">
                            {[0, 1, 2].map((index) => (
                                <div key={index} className="flex shrink-0 flex-col gap-3">
                                    <CreditCard type="brand-dark" width={280} cardHolder={currentUser.name.toUpperCase()} company="Smartera." />
                                    <div className="flex items-center justify-between">
                                        <span className="text-tertiary text-sm font-medium">This month</span>
                                        <span className="text-primary text-sm font-medium">$1,240.40</span>
                                    </div>
                                    <ProgressBarBase value={62} />
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="flex flex-col gap-4 px-4 md:px-6">
                        <div className="flex items-center gap-4">
                            <h2 className={cx(styles.cardTitle, "flex-1")}>My budgets</h2>
                            <Dropdown.Root>
                                <Dropdown.DotsButton />
                                <Dropdown.Popover className="w-40">
                                    <Dropdown.Menu>
                                        <Dropdown.Item>Edit budgets</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown.Popover>
                            </Dropdown.Root>
                        </div>

                        <ul className="flex flex-col gap-4">
                            {budgets.map((budget) => (
                                <li key={budget.label} className={cx(styles.card, "flex items-center gap-3 p-4")}>
                                    <FeaturedIcon size="lg" theme="light" color={budget.color} icon={budget.icon} />
                                    <div className="flex min-w-0 flex-1 flex-col gap-2">
                                        <div className="flex items-baseline justify-between gap-2">
                                            <span className="text-primary text-sm font-medium">{budget.label}</span>
                                            <Badge size="sm" type="modern" color="gray">
                                                {budget.remaining}
                                            </Badge>
                                        </div>
                                        <ProgressBarBase value={budget.progress} />
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </section>
                </aside>
            </div>
        </div>
    );
};
