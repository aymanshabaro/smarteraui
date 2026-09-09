"use client";

import { ArrowRight, DownloadCloud01, DownloadCloud02, Mail01 } from "@smarteraui/icons";
import { SectionHeader } from "@/components/application/section-headers/section-headers";
import { Table, TableCard } from "@/components/application/table/table";
import { Badge, BadgeWithDot } from "@/components/base/badges/badges";
import { Button } from "@/components/base/buttons/button";
import { ButtonUtility } from "@/components/base/buttons/button-utility";
import { DropdownIconSimple } from "@/components/base/dropdown/dropdown-icon-simple";
import { ProgressBarBase } from "@/components/base/progress-indicators/progress-indicators";
import { VisaIcon } from "@/components/foundations/payment-icons";
import { PageContainer, PageTitle, SettingsHeaderNav } from "./settings-shell";

const months = ["Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const invoices = months.map((month, index) => ({
    id: month,
    invoice: `Invoice #00${index + 1} – ${month} 2026`,
    date: `${month} 1, 2026`,
    amount: "$10.00",
    plan: "Basic plan",
}));

/** Billing overview: the current plan and payment method side by side, then invoices. */
export const Settings13 = () => (
    <div className="bg-primary">
        <SettingsHeaderNav activeUrl="/settings/billing" subNav="buttons" />

        <main className="bg-secondary pt-8 pb-12 lg:pt-12 lg:pb-24">
            <div className="flex flex-col gap-8">
                <PageContainer className="flex flex-col gap-5">
                    <PageTitle title="Billing" description="Manage your billing and payment details." />
                </PageContainer>

                <div className="max-w-container mx-auto grid w-full grid-cols-1 gap-5 px-4 lg:grid-cols-2 lg:gap-6 lg:px-8">
                    <div className="bg-primary ring-secondary w-full flex-1 rounded-xl shadow-xs ring-1 ring-inset">
                        <div className="flex flex-col gap-6 p-6 pb-8 lg:pb-6">
                            <div className="flex items-center justify-between gap-8">
                                <div className="flex flex-col gap-1">
                                    <div className="flex items-center gap-2">
                                        <h2 className="text-primary text-lg font-semibold">Basic plan</h2>
                                        <Badge size="md" color="brand">
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
                    </div>

                    <div className="bg-primary ring-secondary w-full flex-1 rounded-xl p-4 pt-5 shadow-xs ring-1 ring-inset sm:p-6">
                        <div className="flex flex-col">
                            <h2 className="text-primary text-md font-semibold">Payment method</h2>
                            <p className="text-tertiary mt-0.5 text-sm">Change how you pay for your plan.</p>

                            <div className="bg-primary ring-secondary mt-5 flex gap-3 rounded-lg p-4 ring-1 ring-inset">
                                <VisaIcon aria-hidden="true" className="h-8 w-11.5 shrink-0" />

                                <div className="flex flex-1 flex-col gap-2">
                                    <div className="flex justify-between gap-2">
                                        <div>
                                            <p className="text-secondary text-sm font-medium">Visa ending in 1234</p>
                                            <p className="text-tertiary text-sm">Expiry 06/2028</p>
                                        </div>

                                        <Button size="sm" color="secondary" className="max-md:hidden">
                                            Edit
                                        </Button>
                                        <Button color="link-gray" size="md" className="md:hidden">
                                            Edit
                                        </Button>
                                    </div>

                                    <div className="flex items-center gap-1.5">
                                        <Mail01 aria-hidden="true" className="text-fg-quaternary size-4" />
                                        <span className="text-tertiary text-sm">billing@smartera.com</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <PageContainer className="flex flex-col gap-6">
                    <SectionHeader
                        size="sm"
                        divider={false}
                        title="Billing and invoicing"
                        description="Pick an account plan that fits your workflow."
                        actions={
                            <div className="flex gap-3">
                                <Button size="sm" color="secondary" iconLeading={DownloadCloud02}>
                                    Download all
                                </Button>
                                <DropdownIconSimple />
                            </div>
                        }
                    />

                    <TableCard.Root className="lg:bg-primary -mx-4 rounded-none bg-transparent shadow-none ring-0 lg:mx-0 lg:rounded-xl lg:shadow-xs lg:ring-1">
                        <Table aria-label="Invoices" selectionMode="multiple" className="bg-primary">
                            <Table.Header className="bg-primary">
                                <Table.Head id="invoice" label="Invoice" isRowHeader className="w-full min-w-64" />
                                <Table.Head id="date" label="Billing date" allowsSorting />
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
                                        <Table.Cell className="text-primary font-medium whitespace-nowrap">{invoice.invoice}</Table.Cell>
                                        <Table.Cell className="whitespace-nowrap">{invoice.date}</Table.Cell>
                                        <Table.Cell>
                                            <BadgeWithDot size="sm" type="modern" color="success">
                                                Paid
                                            </BadgeWithDot>
                                        </Table.Cell>
                                        <Table.Cell className="whitespace-nowrap">{invoice.amount}</Table.Cell>
                                        <Table.Cell className="whitespace-nowrap">{invoice.plan}</Table.Cell>
                                        <Table.Cell className="px-4">
                                            <div className="flex items-center justify-end gap-3">
                                                <ButtonUtility size="xs" color="tertiary" tooltip="Download" icon={DownloadCloud01} />
                                                <Button color="link-color" size="md">
                                                    Edit
                                                </Button>
                                            </div>
                                        </Table.Cell>
                                    </Table.Row>
                                )}
                            </Table.Body>
                        </Table>
                    </TableCard.Root>
                </PageContainer>
            </div>
        </main>
    </div>
);
