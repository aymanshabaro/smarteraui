"use client";

import { RadioGroup as AriaRadioGroup } from "react-aria-components";
import { DownloadCloud02, Edit01, Zap, ZapFast } from "@smarteraui/icons";
import { SidebarNavigationSlim } from "@/components/application/app-navigation/sidebar-navigation/sidebar-slim";
import { SectionHeader } from "@/components/application/section-headers/section-headers";
import { Table } from "@/components/application/table/table";
import { BadgeWithDot } from "@/components/base/badges/badges";
import { Button } from "@/components/base/buttons/button";
import { ButtonUtility } from "@/components/base/buttons/button-utility";
import {
    PlanOptionRadio,
    SettingsBlock,
    SettingsFormRow,
    SettingsMain,
    SettingsPage,
    SettingsPageTitle,
    SettingsStack,
    navFooterItemsCompact,
    navItemsFlat,
} from "./settings-shared.a";

const invoices = [
    { id: "dec", period: "Dec 2026" },
    { id: "nov", period: "Nov 2026" },
    { id: "oct", period: "Oct 2026" },
    { id: "sep", period: "Sep 2026" },
    { id: "aug", period: "Aug 2026" },
    { id: "jul", period: "Jul 2026" },
    { id: "jun", period: "Jun 2026" },
];

/** Billing settings with compact plan rows and an invoice table. */
export const Settings12 = () => (
    <SettingsPage>
        <SidebarNavigationSlim activeUrl="/settings" items={navItemsFlat} footerItems={navFooterItemsCompact} />

        <SettingsMain>
            <SettingsStack>
                <SettingsPageTitle title="Billing" withSearch />

                <SettingsBlock>
                    <SectionHeader title="Account plans" description="Pick an account plan that fits your workflow." />

                    <SettingsFormRow label="Current plan" hint="We'll credit your account if you need to downgrade during the billing cycle.">
                        <AriaRadioGroup aria-label="Current plan" defaultValue="basic" className="flex flex-col gap-3">
                            <PlanOptionRadio
                                value="basic"
                                name="Basic plan"
                                price="$10/month"
                                icon={Zap}
                                description="Includes up to 10 users, 20 GB individual data and access to all features."
                            />
                            <PlanOptionRadio
                                value="business"
                                name="Business plan"
                                price="$20/month"
                                icon={ZapFast}
                                description="Includes up to 20 users, 40 GB individual data and access to all features."
                            />
                            <PlanOptionRadio
                                value="enterprise"
                                name="Enterprise plan"
                                price="$40/month"
                                icon={ZapFast}
                                description="Unlimited users, unlimited individual data and access to all features."
                            />
                        </AriaRadioGroup>
                    </SettingsFormRow>
                </SettingsBlock>

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

                    <SettingsFormRow
                        label="Billing history"
                        hint={
                            <>
                                Please reach out to our friendly team via{" "}
                                <Button color="link-color" size="sm" href="mailto:billing@smartera.com">
                                    billing@smartera.com
                                </Button>{" "}
                                with questions.
                            </>
                        }
                    >
                        <div className="bg-primary ring-secondary -mx-4 overflow-hidden rounded-none shadow-none ring-0 lg:mx-0 lg:rounded-xl lg:shadow-xs lg:ring-1">
                            <Table aria-label="Billing history" size="sm" selectionMode="multiple">
                                <Table.Header>
                                    <Table.Head id="invoice" label="Invoice" isRowHeader className="w-full" />
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
                                            <Table.Cell className="text-primary font-medium whitespace-nowrap">{invoice.period}</Table.Cell>
                                            <Table.Cell>
                                                <BadgeWithDot size="sm" type="modern" color="success">
                                                    Paid
                                                </BadgeWithDot>
                                            </Table.Cell>
                                            <Table.Cell className="whitespace-nowrap">USD $10.00</Table.Cell>
                                            <Table.Cell className="whitespace-nowrap">Basic plan</Table.Cell>
                                            <Table.Cell className="px-3">
                                                <div className="flex justify-end">
                                                    <ButtonUtility size="xs" color="tertiary" tooltip={`Edit the ${invoice.period} invoice`} icon={Edit01} />
                                                </div>
                                            </Table.Cell>
                                        </Table.Row>
                                    )}
                                </Table.Body>
                            </Table>
                        </div>
                    </SettingsFormRow>
                </SettingsBlock>
            </SettingsStack>
        </SettingsMain>
    </SettingsPage>
);
