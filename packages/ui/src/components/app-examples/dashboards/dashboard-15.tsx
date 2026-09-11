"use client";

import { useState } from "react";
import { FileIcon } from "@untitledui/file-icons";
import type { Key } from "react-aria";
import { DownloadCloud02, Edit01, Plus, SearchLg } from "@properui/icons";
import { cx } from "../../../utils/cx";
import { AVATARS } from "../../../utils/demo-assets";
import { SidebarNavigationSectionsSubheadings } from "../../application/app-navigation/sidebar-navigation/sidebar-sections-subheadings";
import { FileUploadDropZone } from "../../application/file-upload/file-upload-base";
import { Table } from "../../application/table/table";
import { Tabs } from "../../application/tabs/tabs";
import { Badge } from "../../base/badges/badges";
import { Button } from "../../base/buttons/button";
import { ButtonUtility } from "../../base/buttons/button-utility";
import { Dropdown } from "../../base/dropdown/dropdown";
import { Input } from "../../base/input/input";
import { MastercardIcon, VisaIcon } from "../../foundations/payment-icons";
import { CreditCard } from "../../shared-assets/credit-card/credit-card";
import { RangeTabs, StackedBarChart, TrendAreaChart, navSectionsSubheadings, styles, transactions } from "./dashboards-shared";

const sectionTabs = [
    { id: "overview", label: "Overview" },
    { id: "balance", label: "Balance" },
    { id: "receipts", label: "Receipts" },
];

const detailTabs = [
    { id: "overview", label: "Overview" },
    { id: "budget", label: "Budget" },
    { id: "spending", label: "Spending" },
    { id: "rewards", label: "Rewards" },
];

const balancePresets = [
    { id: "12-months", long: "12 months" },
    { id: "30-days", long: "30 days" },
    { id: "7-days", long: "7 days" },
];

/** Offsets that fan the three cards out into an isometric stack. */
const cardOffsets = ["start-4 top-16", "start-10 top-10", "start-16 top-4"];

const balances = [
    { label: "Current balance", value: "$1,440.40" },
    { label: "Current limit", value: "$15,000.00" },
    { label: "Budget this month", value: "$2,400.00" },
];

const categoryColors: Record<string, "brand" | "error" | "success" | "warning" | "gray"> = {
    Subscriptions: "brand",
    "Food and dining": "error",
    Income: "success",
    Groceries: "warning",
};

/** Dashboard 15 — a cards dashboard with an isometric card stack, balance charts and a receipts table. */
export const Dashboard15 = () => {
    const [section, setSection] = useState<Key>("overview");
    const [detail, setDetail] = useState<Key>("overview");

    return (
        <div className={styles.page}>
            <SidebarNavigationSectionsSubheadings activeUrl="/dashboard" items={navSectionsSubheadings} />

            <main className={styles.main}>
                <div className={cx("flex flex-col gap-6", styles.gutter)}>
                    <div className="flex flex-col gap-4 md:flex-row md:items-center">
                        <h1 className={cx(styles.pageTitle, "flex-1")}>Your cards</h1>
                        <Input shortcut size="sm" aria-label="Search" placeholder="Search" icon={SearchLg} className="md:w-80" />
                    </div>

                    <Tabs selectedKey={section} onSelectionChange={setSection}>
                        <Tabs.List aria-label="Card sections" type="underline">
                            {sectionTabs.map((tab) => (
                                <Tabs.Item key={tab.id} id={tab.id} label={tab.label} />
                            ))}
                        </Tabs.List>
                        {sectionTabs.map((tab) => (
                            <Tabs.Panel key={tab.id} id={tab.id} />
                        ))}
                    </Tabs>

                    <div className="flex flex-col gap-8 lg:flex-row lg:gap-10">
                        <div className="flex w-full shrink-0 flex-col gap-6 lg:w-80">
                            <div className="border-secondary flex items-start gap-4 border-b pb-4">
                                <div className="flex-1">
                                    <h2 className={styles.cardTitle}>Overview</h2>
                                    <p className="text-tertiary text-sm">Manage and track your card spending.</p>
                                </div>
                                <Dropdown.Root>
                                    <Dropdown.DotsButton />
                                    <Dropdown.Popover className="w-40">
                                        <Dropdown.Menu>
                                            <Dropdown.Item>Card settings</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown.Popover>
                                </Dropdown.Root>
                            </div>

                            <div className="bg-secondary relative h-56 overflow-hidden rounded-xl">
                                {AVATARS.slice(0, 3).map((person, index) => (
                                    <CreditCard
                                        key={person.username}
                                        type="brand-dark"
                                        width={220}
                                        company="Proper UI."
                                        cardHolder={person.name.toUpperCase()}
                                        className={cx("absolute -rotate-12", cardOffsets[index])}
                                    />
                                ))}
                            </div>

                            <Tabs selectedKey={detail} onSelectionChange={setDetail}>
                                <Tabs.List aria-label="Card details" type="underline">
                                    {detailTabs.map((tab) => (
                                        <Tabs.Item key={tab.id} id={tab.id} label={tab.label} />
                                    ))}
                                </Tabs.List>
                                {detailTabs.map((tab) => (
                                    <Tabs.Panel key={tab.id} id={tab.id} />
                                ))}
                            </Tabs>

                            <dl className="flex flex-col gap-4">
                                {balances.map((balance) => (
                                    <div key={balance.label} className="flex items-baseline justify-between gap-4">
                                        <dt className={styles.caption}>{balance.label}</dt>
                                        <dd className="text-primary text-xl font-semibold">{balance.value}</dd>
                                    </div>
                                ))}
                            </dl>

                            <section className="flex flex-col gap-4">
                                <div className="border-secondary flex flex-col gap-3 border-b pb-3">
                                    <h3 className={styles.cardTitle}>Balances over time</h3>
                                    <RangeTabs label="Balances period" presets={balancePresets} />
                                </div>
                                <StackedBarChart label="Balances by month" className="h-40" />
                            </section>
                        </div>

                        <div className="flex min-w-0 flex-1 flex-col gap-8">
                            <section className="flex flex-col gap-5">
                                <div className="border-secondary flex flex-col gap-4 border-b pb-4 md:flex-row md:items-start">
                                    <div className="flex-1">
                                        <h2 className={styles.cardTitle}>Balance over time</h2>
                                        <p className="text-tertiary text-sm">Compare spending over time.</p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <RangeTabs label="Balance period" presets={balancePresets} />
                                        <Dropdown.Root>
                                            <Dropdown.DotsButton />
                                            <Dropdown.Popover className="w-40">
                                                <Dropdown.Menu>
                                                    <Dropdown.Item>Export</Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown.Popover>
                                        </Dropdown.Root>
                                    </div>
                                </div>

                                <TrendAreaChart label="Balance over the last 12 months" showComparison={false} className="h-56" />
                            </section>

                            <section className="flex flex-col gap-5">
                                <div className="flex flex-col gap-4 md:flex-row md:items-center">
                                    <h2 className={cx(styles.cardTitle, "flex-1")}>Receipts</h2>
                                    <div className="flex flex-wrap gap-3">
                                        <Button color="secondary" size="md" iconLeading={DownloadCloud02}>
                                            Export
                                        </Button>
                                        <Button color="primary" size="md" iconLeading={Plus}>
                                            Add
                                        </Button>
                                    </div>
                                </div>

                                <FileUploadDropZone accept="image/svg+xml,image/png,image/jpeg,image/gif" hint="SVG, PNG, JPG or GIF (max. 800x400px)" />

                                <Table aria-label="Receipts">
                                    <Table.Header>
                                        <Table.Head id="merchant" label="Merchant" isRowHeader className="w-full" />
                                        <Table.Head id="amount" label="Amount" />
                                        <Table.Head id="category" label="Category" className="max-md:hidden" />
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
                                                        <FileIcon type="pdf" className="size-10 shrink-0" />
                                                        <div className="whitespace-nowrap">
                                                            <p className="text-primary text-sm font-medium">{transaction.merchant}</p>
                                                            <p className="text-tertiary text-sm">{transaction.fileSize}</p>
                                                        </div>
                                                    </div>
                                                </Table.Cell>
                                                <Table.Cell className="whitespace-nowrap">${transaction.amount}</Table.Cell>
                                                <Table.Cell className="max-md:hidden">
                                                    <Badge size="sm" type="pill-color" color={categoryColors[transaction.category] ?? "gray"}>
                                                        {transaction.category}
                                                    </Badge>
                                                </Table.Cell>
                                                <Table.Cell className="max-lg:hidden">
                                                    <div className="flex items-center gap-3">
                                                        {transaction.account === "Visa" ? (
                                                            <VisaIcon aria-hidden="true" className="h-6 w-auto" />
                                                        ) : (
                                                            <MastercardIcon aria-hidden="true" className="h-6 w-auto" />
                                                        )}
                                                        <div className="whitespace-nowrap">
                                                            <p className="text-primary text-sm font-medium">
                                                                {transaction.account === "Visa" ? "Debit card" : "Credit card"}
                                                            </p>
                                                            <p className="text-tertiary text-sm">Ends in {transaction.account === "Visa" ? "1234" : "5678"}</p>
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

                                <Button color="link-color" size="md" href="/receipts" className="self-start">
                                    View full report
                                </Button>
                            </section>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};
