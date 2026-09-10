"use client";

import { RadioGroup as AriaRadioGroup } from "react-aria-components";
import { DownloadCloud02, Plus } from "@properui/icons";
import { FeaturedCardQRCode } from "@/components/application/app-navigation/base-components/featured-cards";
import { SidebarNavigationSimple } from "@/components/application/app-navigation/sidebar-navigation/sidebar-simple";
import { SectionHeader } from "@/components/application/section-headers/section-headers";
import { Table } from "@/components/application/table/table";
import { BadgeWithDot } from "@/components/base/badges/badges";
import { Button } from "@/components/base/buttons/button";
import { RadioButton } from "@/components/base/radio-buttons/radio-buttons";
import { MastercardIcon, VisaIcon } from "@/components/foundations/payment-icons";
import { AVATARS } from "@/utils/demo-assets";
import {
    AvatarStack,
    PaymentMethodRow,
    SettingsBlock,
    SettingsButtonGroupRow,
    SettingsFormRow,
    SettingsMain,
    SettingsPage,
    SettingsPageTitle,
    SettingsRowDivider,
    SettingsStack,
    type SettingsTabItem,
    navFooterItems,
    navItemsFlat,
} from "./settings-shared.a";

const noop = () => {};

const account = AVATARS[0];

const tabs: SettingsTabItem[] = [
    { id: "details", label: "My details" },
    { id: "profile", label: "Profile" },
    { id: "password", label: "Password" },
    { id: "team", label: "Team" },
    { id: "plan", label: "Plan" },
    { id: "billing", label: "Billing" },
    { id: "notifications", label: "Notifications" },
    { id: "integrations", label: "Integrations" },
    { id: "api", label: "API" },
];

const invoices = [
    { id: "dec", label: "Basic Plan – Dec 2026", date: "Dec 1, 2026" },
    { id: "nov", label: "Basic Plan – Nov 2026", date: "Nov 1, 2026" },
    { id: "oct", label: "Basic Plan – Oct 2026", date: "Oct 1, 2026" },
    { id: "sep", label: "Basic Plan – Sep 2026", date: "Sep 1, 2026" },
    { id: "aug", label: "Basic Plan – Aug 2026", date: "Aug 1, 2026" },
    { id: "jul", label: "Basic Plan – Jul 2026", date: "Jul 1, 2026" },
    { id: "jun", label: "Basic Plan – Jun 2026", date: "Jun 1, 2026" },
];

const usersOnPlan = AVATARS.slice(0, 4);

/** Billing settings: contact email, saved cards and an invoice table showing who is on the plan. */
export const Settings15 = () => (
    <SettingsPage>
        <SidebarNavigationSimple
            activeUrl="/settings"
            items={navItemsFlat}
            footerItems={navFooterItems}
            featureCard={
                <FeaturedCardQRCode
                    title="Verify this device"
                    description="Open the app and scan the QR code below to verify this device."
                    value="https://proper.example/verify/4060020"
                    className="hidden md:flex"
                    onDismiss={noop}
                />
            }
        />

        <SettingsMain>
            <SettingsStack>
                <SettingsPageTitle title="Settings" description="Manage your team and preferences here.">
                    <SettingsButtonGroupRow items={tabs} selectedTab="billing" />
                </SettingsPageTitle>

                <SettingsBlock>
                    <SectionHeader title="Payment method" description="Update your billing details and address." />

                    <div className="flex flex-col gap-5">
                        <SettingsFormRow label="Contact email" hint="Where should invoices be sent?">
                            <AriaRadioGroup aria-label="Contact email" defaultValue="account" className="flex flex-col gap-4">
                                <RadioButton size="md" value="account" label="Send to my account email" hint={account.email} />
                                <RadioButton size="md" value="alternative" label="Send to an alternative email" />
                            </AriaRadioGroup>
                        </SettingsFormRow>

                        <SettingsRowDivider />

                        <SettingsFormRow label="Card details" hint="Select default payment method.">
                            <PaymentMethodRow icon={VisaIcon} name="Visa ending in 1234" expiry="Expiry 06/2028" isDefault />
                            <PaymentMethodRow icon={MastercardIcon} name="Mastercard ending in 1234" expiry="Expiry 06/2028" />

                            <Button color="link-color" size="md" iconLeading={Plus} className="w-max">
                                Add new payment method
                            </Button>
                        </SettingsFormRow>
                    </div>
                </SettingsBlock>

                <SettingsBlock>
                    <SectionHeader
                        title="Billing history"
                        actions={
                            <Button color="secondary" size="md" iconLeading={DownloadCloud02}>
                                Download all
                            </Button>
                        }
                    />

                    <div className="bg-primary ring-secondary -mx-4 overflow-hidden rounded-none shadow-none ring-0 lg:mx-0 lg:rounded-xl lg:shadow-xs lg:ring-1">
                        <Table aria-label="Billing history" size="sm" selectionMode="multiple">
                            <Table.Header>
                                <Table.Head id="invoice" label="Invoice" isRowHeader className="w-full" />
                                <Table.Head id="amount" label="Amount" />
                                <Table.Head id="date" label="Date" />
                                <Table.Head id="status" label="Status" />
                                <Table.Head id="users" label="Users on plan" />
                            </Table.Header>

                            <Table.Body items={invoices}>
                                {(invoice) => (
                                    <Table.Row id={invoice.id}>
                                        <Table.Cell className="text-primary font-medium whitespace-nowrap">{invoice.label}</Table.Cell>
                                        <Table.Cell className="whitespace-nowrap">USD $10.00</Table.Cell>
                                        <Table.Cell className="whitespace-nowrap">{invoice.date}</Table.Cell>
                                        <Table.Cell>
                                            <BadgeWithDot size="sm" type="modern" color="success">
                                                Paid
                                            </BadgeWithDot>
                                        </Table.Cell>
                                        <Table.Cell>
                                            <AvatarStack people={usersOnPlan} remaining={5} />
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
