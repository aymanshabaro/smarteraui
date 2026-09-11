"use client";

import { ArrowLeft, ArrowRight, DownloadCloud02, Edit01, Mail01 } from "@properui/icons";
import { SidebarNavigationSectionDividers } from "../../application/app-navigation/sidebar-navigation/sidebar-section-dividers";
import { SectionHeader } from "../../application/section-headers/section-headers";
import { Table } from "../../application/table/table";
import { Badge, BadgeWithDot } from "../../base/badges/badges";
import { Button } from "../../base/buttons/button";
import { ButtonUtility } from "../../base/buttons/button-utility";
import { ProgressBarBase } from "../../base/progress-indicators/progress-indicators";
import { VisaIcon } from "../../foundations/payment-icons";
import { SettingsBlock, SettingsMain, SettingsPage, SettingsStack, navItemsWithDividers } from "./settings-shared.a";

const invoices = [
    { id: "001", label: "Invoice #001 – Jun 2026", date: "Jun 1, 2026" },
    { id: "002", label: "Invoice #002 – Jul 2026", date: "Jul 1, 2026" },
    { id: "003", label: "Invoice #003 – Aug 2026", date: "Aug 1, 2026" },
    { id: "004", label: "Invoice #004 – Sep 2026", date: "Sep 1, 2026" },
    { id: "005", label: "Invoice #005 – Oct 2026", date: "Oct 1, 2026" },
    { id: "006", label: "Invoice #006 – Nov 2026", date: "Nov 1, 2026" },
    { id: "007", label: "Invoice #007 – Dec 2026", date: "Dec 1, 2026" },
];

/** Billing overview: the current plan and payment method side by side, then invoice history. */
export const Settings13 = () => (
    <SettingsPage>
        <SidebarNavigationSectionDividers activeUrl="/settings" items={navItemsWithDividers} />

        <SettingsMain>
            <SettingsStack>
                <div className="flex flex-col gap-5 px-4 lg:px-8">
                    <Button color="link-gray" size="md" href="/settings" iconLeading={ArrowLeft} className="w-max">
                        Back to settings
                    </Button>

                    <div className="flex flex-col gap-0.5">
                        <h1 className="text-primary text-xl font-semibold">Billing</h1>
                        <p className="text-md text-tertiary">Manage your billing and payment details.</p>
                    </div>
                </div>

                <div className="flex flex-col gap-5 px-4 lg:flex-row lg:px-8">
                    <section className="bg-primary ring-secondary flex w-full flex-1 flex-col rounded-xl shadow-xs ring-1 ring-inset">
                        <div className="flex flex-col gap-5 p-4 pt-5 sm:p-6">
                            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                                <div className="flex flex-col gap-1">
                                    <div className="flex items-center gap-2">
                                        <h2 className="text-primary text-lg font-semibold">Basic plan</h2>
                                        <Badge size="md" type="modern" color="gray">
                                            Monthly
                                        </Badge>
                                    </div>
                                    <p className="text-tertiary text-sm">Our most popular plan for small teams.</p>
                                </div>

                                <p className="hidden items-end gap-1 lg:flex">
                                    <span className="text-display-md text-primary pb-2.5 font-semibold">$</span>
                                    <span className="text-display-lg text-primary font-semibold">10</span>
                                    <span className="text-md text-tertiary pb-[7px] font-medium">per month</span>
                                </p>
                            </div>

                            <div className="flex flex-col gap-3">
                                <p className="text-primary text-sm font-medium">14 of 20 users</p>
                                <ProgressBarBase value={70} />
                            </div>
                        </div>

                        <div className="border-secondary flex items-center gap-4 border-t px-4 py-3 md:py-4 lg:px-6">
                            <div className="flex flex-1 justify-end gap-3">
                                <Button color="link-color" size="md" iconTrailing={ArrowRight}>
                                    Upgrade plan
                                </Button>
                            </div>
                        </div>
                    </section>

                    <section className="bg-primary ring-secondary w-full flex-1 rounded-xl p-4 pt-5 shadow-xs ring-1 ring-inset sm:p-6">
                        <div className="flex flex-col">
                            <h2 className="text-md text-primary font-semibold">Payment method</h2>
                            <p className="text-tertiary mt-0.5 text-sm">Change how you pay for your plan.</p>

                            <div className="bg-primary ring-secondary mt-5 flex gap-3 rounded-lg p-4 ring-1 ring-inset">
                                <VisaIcon aria-label="Visa" className="h-8 w-auto shrink-0" />

                                <div className="flex flex-1 flex-col gap-2">
                                    <div className="flex justify-between gap-2">
                                        <div>
                                            <p className="text-secondary text-sm font-medium">Visa ending in 1234</p>
                                            <p className="text-tertiary text-sm">Expiry 06/2028</p>
                                        </div>
                                        <Button color="link-gray" size="md">
                                            Edit
                                        </Button>
                                    </div>

                                    <p className="text-tertiary flex items-center gap-1.5 text-sm">
                                        <Mail01 aria-hidden="true" className="text-fg-quaternary size-4 shrink-0" />
                                        billing@proper.example
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                <SettingsBlock>
                    <SectionHeader
                        title="Billing and invoicing"
                        description="Pick an account plan that fits your workflow."
                        actions={
                            <Button color="secondary" size="md" iconLeading={DownloadCloud02}>
                                Download all
                            </Button>
                        }
                    />

                    <div className="bg-primary ring-secondary -mx-4 overflow-hidden rounded-none shadow-none ring-0 lg:mx-0 lg:rounded-xl lg:shadow-xs lg:ring-1">
                        <Table aria-label="Invoices" size="sm" selectionMode="multiple">
                            <Table.Header>
                                <Table.Head id="invoice" label="Invoice" isRowHeader className="w-full" />
                                <Table.Head id="date" label="Billing date" />
                                <Table.Head id="status" label="Status" />
                                <Table.Head id="amount" label="Amount" />
                                <Table.Head id="plan" label="Plan" />
                                <Table.Head id="actions">
                                    <span className="sr-only">Actions</span>
                                </Table.Head>
                            </Table.Header>

                            <Table.Body items={invoices}>
                                {(invoice) => (
                                    <Table.Row id={invoice.id}>
                                        <Table.Cell className="text-primary font-medium whitespace-nowrap">{invoice.label}</Table.Cell>
                                        <Table.Cell className="whitespace-nowrap">{invoice.date}</Table.Cell>
                                        <Table.Cell>
                                            <BadgeWithDot size="sm" type="modern" color="success">
                                                Paid
                                            </BadgeWithDot>
                                        </Table.Cell>
                                        <Table.Cell className="whitespace-nowrap">$10.00</Table.Cell>
                                        <Table.Cell className="whitespace-nowrap">Basic plan</Table.Cell>
                                        <Table.Cell className="px-3">
                                            <div className="flex justify-end">
                                                <ButtonUtility size="xs" color="tertiary" tooltip={`Edit ${invoice.label}`} icon={Edit01} />
                                            </div>
                                        </Table.Cell>
                                    </Table.Row>
                                )}
                            </Table.Body>
                        </Table>
                    </div>
                </SettingsBlock>
            </SettingsStack>
        </SettingsMain>
    </SettingsPage>
);
