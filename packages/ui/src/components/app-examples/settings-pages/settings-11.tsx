"use client";

import { RadioGroup as AriaRadioGroup } from "react-aria-components";
import { DownloadCloud02, Zap, ZapFast } from "@smarteraui/icons";
import { FeaturedCardEventCTA } from "@/components/application/app-navigation/base-components/featured-cards";
import { SidebarNavigationDualTier } from "@/components/application/app-navigation/sidebar-navigation/sidebar-dual-tier";
import { SectionHeader } from "@/components/application/section-headers/section-headers";
import { Table } from "@/components/application/table/table";
import { Badge, BadgeWithDot } from "@/components/base/badges/badges";
import { Button } from "@/components/base/buttons/button";
import { AVATARS } from "@/utils/demo-assets";
import {
    PlanCardRadio,
    SettingsBlock,
    SettingsMain,
    SettingsPage,
    SettingsPageTitle,
    SettingsStack,
    navFooterItemsCompact,
    navItemsNested,
} from "./settings-shared.a";

const noop = () => {};

const invoices = [
    { id: "dec", label: "Basic Plan – Dec 2026", amount: "USD $10.00", date: "Dec 1, 2026" },
    { id: "nov", label: "Basic Plan – Nov 2026", amount: "USD $10.00", date: "Nov 1, 2026" },
    { id: "oct", label: "Basic Plan – Oct 2026", amount: "USD $10.00", date: "Oct 1, 2026" },
    { id: "sep", label: "Basic Plan – Sep 2026", amount: "USD $10.00", date: "Sep 1, 2026" },
    { id: "aug", label: "Basic Plan – Aug 2026", amount: "USD $10.00", date: "Aug 1, 2026" },
    { id: "jul", label: "Basic Plan – Jul 2026", amount: "USD $10.00", date: "Jul 1, 2026" },
    { id: "jun", label: "Basic Plan – Jun 2026", amount: "USD $10.00", date: "Jun 1, 2026" },
];

/** Billing settings: three stacked plan cards above the invoice history table. */
export const Settings11 = () => (
    <SettingsPage>
        <SidebarNavigationDualTier
            activeUrl="/settings"
            items={navItemsNested}
            footerItems={navFooterItemsCompact}
            featureCard={
                <FeaturedCardEventCTA
                    title="Join our workshop"
                    description="Learn how to leverage automation to supercharge your workflow."
                    confirmLabel="Join now!"
                    attendees={AVATARS.slice(0, 4).map((person) => ({ src: person.src, alt: person.name }))}
                    remainingCount={5}
                    className="hidden lg:flex"
                    onDismiss={noop}
                    onConfirm={noop}
                />
            }
        />

        <SettingsMain>
            <SettingsStack>
                <SettingsPageTitle title="Billing" description="Manage your billing and payment details." />

                <div className="px-4 lg:px-8">
                    <AriaRadioGroup aria-label="Plans" defaultValue="basic" className="flex flex-col gap-3">
                        <PlanCardRadio
                            value="basic"
                            name="Basic plan"
                            price="$10"
                            icon={Zap}
                            priceAddon={
                                <Badge size="sm" type="pill-color" color="brand">
                                    Limited time only
                                </Badge>
                            }
                            description="Includes up to 10 users, 20 GB individual data and access to all features."
                        />
                        <PlanCardRadio
                            value="business"
                            name="Business plan"
                            price="$20"
                            icon={ZapFast}
                            description="Includes up to 20 users, 40 GB individual data and access to all features."
                        />
                        <PlanCardRadio
                            value="enterprise"
                            name="Enterprise plan"
                            price="$40"
                            icon={ZapFast}
                            description="Unlimited users, unlimited individual data and access to all features."
                        />
                    </AriaRadioGroup>
                </div>

                <SettingsBlock>
                    <SectionHeader
                        title="Billing history"
                        divider={false}
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
                                <Table.Head id="amount" label="Amount" />
                                <Table.Head id="date" label="Date" />
                                <Table.Head id="status" label="Status" />
                            </Table.Header>

                            <Table.Body items={invoices}>
                                {(invoice) => (
                                    <Table.Row id={invoice.id}>
                                        <Table.Cell className="text-primary font-medium whitespace-nowrap">{invoice.label}</Table.Cell>
                                        <Table.Cell className="whitespace-nowrap">{invoice.amount}</Table.Cell>
                                        <Table.Cell className="whitespace-nowrap">{invoice.date}</Table.Cell>
                                        <Table.Cell>
                                            <BadgeWithDot size="sm" type="modern" color="success">
                                                Paid
                                            </BadgeWithDot>
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
