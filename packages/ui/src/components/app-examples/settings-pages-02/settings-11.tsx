"use client";

import type { ReactNode } from "react";
import { Radio as AriaRadio } from "react-aria-components";
import { DownloadCloud01, DownloadCloud02, Zap } from "@smarteraui/icons";
import { SectionHeader } from "@/components/application/section-headers/section-headers";
import { Table, TableCard } from "@/components/application/table/table";
import { BadgeWithDot } from "@/components/base/badges/badges";
import { Button } from "@/components/base/buttons/button";
import { ButtonUtility } from "@/components/base/buttons/button-utility";
import { CheckboxBase } from "@/components/base/checkbox/checkbox";
import { RadioGroup } from "@/components/base/radio-buttons/radio-buttons";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";
import { cx } from "@/utils/cx";
import { PageContainer, PageTitle, SettingsHeaderNav } from "./settings-shell";

const plans = [
    {
        id: "basic",
        name: "Basic plan",
        price: "$10",
        description: "Includes up to 10 users, 20 GB individual data and access to all features.",
        badge: "Limited time only",
    },
    {
        id: "business",
        name: "Business plan",
        price: "$20",
        description: "Includes up to 20 users, 40 GB individual data and access to all features.",
    },
    {
        id: "enterprise",
        name: "Enterprise plan",
        price: "$40",
        description: "Unlimited users, unlimited individual data and access to all features.",
    },
];

const months = ["Dec", "Nov", "Oct", "Sep", "Aug", "Jul", "Jun"];

const invoices = months.map((month) => ({
    id: `basic-${month}`,
    invoice: `Basic Plan – ${month} 2026`,
    amount: "USD $10.00",
    date: `${month} 1, 2026`,
}));

const PlanRadio = ({ id, name, price, description, badge }: { id: string; name: string; price: string; description: string; badge?: ReactNode }) => (
    <AriaRadio
        value={id}
        className={({ isSelected, isFocusVisible }) =>
            cx(
                "bg-primary outline-focus-ring relative block cursor-pointer rounded-xl ring-inset",
                isSelected ? "ring-brand ring-2" : "ring-secondary ring-1",
                isFocusVisible && "outline-2 outline-offset-2",
            )
        }
    >
        {({ isSelected }) => (
            <>
                <span className={cx("flex items-center gap-3 rounded-t-xl p-3 pr-5 ring-inset", isSelected ? "ring-brand ring-2" : "ring-secondary ring-1")}>
                    <FeaturedIcon size="sm" theme="modern" color="gray" icon={Zap} />
                    <span className="text-secondary text-md mr-1 font-semibold">{name}</span>
                    <CheckboxBase isSelected={isSelected} className="ml-auto" />
                </span>

                <span className="flex flex-col gap-1 rounded-b-lg p-4">
                    <span className="flex flex-col-reverse gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-1">
                        <span className="flex items-baseline gap-1">
                            <span className="text-secondary text-display-sm font-semibold">{price}</span>
                            <span className="text-tertiary text-sm">per month</span>
                        </span>

                        {badge && (
                            <BadgeWithDot size="sm" type="modern" color="success">
                                {badge}
                            </BadgeWithDot>
                        )}
                    </span>

                    <span className="text-tertiary block text-sm">{description}</span>
                </span>
            </>
        )}
    </AriaRadio>
);

/** Billing settings: pick a plan, then review the invoices already issued. */
export const Settings11 = () => (
    <div className="bg-primary">
        <SettingsHeaderNav activeUrl="/settings/billing" subNav="tabs" />

        <main className="bg-secondary pt-8 pb-12 lg:pt-12 lg:pb-24">
            <div className="flex flex-col gap-8">
                <PageContainer>
                    <PageTitle title="Billing" description="Manage your billing and payment details." />
                </PageContainer>

                <PageContainer>
                    <RadioGroup aria-label="Plans" defaultValue="basic" className="flex flex-col gap-3 lg:max-w-160">
                        {plans.map((plan) => (
                            <PlanRadio key={plan.id} {...plan} />
                        ))}
                    </RadioGroup>
                </PageContainer>

                <PageContainer className="flex flex-col gap-6">
                    <SectionHeader
                        size="sm"
                        divider={false}
                        title="Billing history"
                        actions={
                            <Button size="sm" color="secondary" iconLeading={DownloadCloud02}>
                                Download all
                            </Button>
                        }
                    />

                    <TableCard.Root className="lg:bg-primary -mx-4 rounded-none bg-transparent shadow-none ring-0 lg:mx-0 lg:rounded-xl lg:shadow-xs lg:ring-1">
                        <Table aria-label="Invoices" selectionMode="multiple" className="bg-primary">
                            <Table.Header className="bg-primary">
                                <Table.Head id="invoice" label="Invoice" isRowHeader allowsSorting className="w-full" />
                                <Table.Head id="amount" label="Amount" />
                                <Table.Head id="date" label="Date" />
                                <Table.Head id="status" label="Status" />
                                <Table.Head id="actions">
                                    <span className="sr-only">Actions</span>
                                </Table.Head>
                            </Table.Header>

                            <Table.Body items={invoices}>
                                {(invoice) => (
                                    <Table.Row id={invoice.id}>
                                        <Table.Cell className="text-primary font-medium whitespace-nowrap">{invoice.invoice}</Table.Cell>
                                        <Table.Cell className="whitespace-nowrap">{invoice.amount}</Table.Cell>
                                        <Table.Cell className="whitespace-nowrap">{invoice.date}</Table.Cell>
                                        <Table.Cell>
                                            <BadgeWithDot size="sm" type="modern" color="success">
                                                Paid
                                            </BadgeWithDot>
                                        </Table.Cell>
                                        <Table.Cell className="px-4">
                                            <div className="flex justify-end gap-0.5">
                                                <ButtonUtility size="xs" color="tertiary" tooltip="Download" icon={DownloadCloud01} />
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
