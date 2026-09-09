"use client";

import type { FC } from "react";
import { Radio as AriaRadio, RadioGroup as AriaRadioGroup } from "react-aria-components";
import { DownloadCloud02, Plus } from "@smarteraui/icons";
import { SidebarNavigationSlim } from "@/components/application/app-navigation/sidebar-navigation/sidebar-slim";
import { SectionHeader } from "@/components/application/section-headers/section-headers";
import { Table } from "@/components/application/table/table";
import { Avatar } from "@/components/base/avatar/avatar";
import { BadgeWithDot } from "@/components/base/badges/badges";
import { Button } from "@/components/base/buttons/button";
import { CheckboxBase } from "@/components/base/checkbox/checkbox";
import { ApplePayIcon, MastercardIcon, VisaIcon } from "@/components/foundations/payment-icons";
import { cx } from "@/utils/cx";
import { AVATARS } from "@/utils/demo-assets";
import {
    AvatarStack,
    SettingsFormRow,
    SettingsMain,
    SettingsPage,
    SettingsPageTitle,
    SettingsTabPanel,
    SettingsTabsRoot,
    SettingsTabsRow,
    navFooterItemsCompact,
    navItemsFlat,
} from "./settings-shared.a";

const accountAdmin = AVATARS[0];
const usersOnPlan = AVATARS.slice(1, 5);

const invoices = [
    { id: "dec", label: "INV-0011-2026", date: "Dec 1, 2026" },
    { id: "nov", label: "INV-0010-2026", date: "Nov 1, 2026" },
    { id: "oct", label: "INV-0009-2026", date: "Oct 1, 2026" },
    { id: "sep", label: "INV-0008-2026", date: "Sep 1, 2026" },
    { id: "aug", label: "INV-0007-2026", date: "Aug 1, 2026" },
];

interface PaymentCardOptionProps {
    /** The radio value of the card. */
    value: string;
    /** The card brand mark. */
    icon: FC<{ className?: string }>;
    /** The masked card label, e.g. `Visa ending in 1234`. */
    name: string;
    /** The card's expiry, e.g. `Expiry 06/2028`. */
    expiry: string;
    className?: string;
}

/** A payment method that doubles as the account's default-card radio, with its own edit actions. */
const PaymentCardOption = ({ value, icon: Icon, name, expiry, className }: PaymentCardOptionProps) => (
    <AriaRadio
        value={value}
        aria-label={name}
        className={({ isSelected }) =>
            cx(
                "outline-focus-ring bg-primary relative flex cursor-pointer flex-col gap-4 rounded-xl p-4 ring-inset focus-visible:outline-2 focus-visible:outline-offset-2 md:flex-row md:items-center",
                isSelected ? "ring-brand ring-2" : "ring-secondary ring-1",
                className,
            )
        }
    >
        {({ isSelected, isDisabled, isFocusVisible }) => (
            <>
                <Icon aria-hidden="true" className="h-8 w-auto shrink-0" />

                <div className="min-w-0 flex-1">
                    <p className="text-secondary text-sm font-medium">{name}</p>
                    <p className="text-tertiary text-sm">{expiry}</p>

                    <div className="mt-2 flex items-center gap-3">
                        <Button color="link-gray" size="sm" isDisabled={isSelected}>
                            Set as default
                        </Button>
                        <Button color="link-color" size="sm">
                            Edit
                        </Button>
                    </div>
                </div>

                <CheckboxBase
                    size="sm"
                    isSelected={isSelected}
                    isDisabled={isDisabled}
                    isFocusVisible={isFocusVisible}
                    className="absolute end-4 top-4 md:static"
                />
            </>
        )}
    </AriaRadio>
);

/** Billing settings reached through the underline tab row: selectable payment cards above an admin invoice table. */
export const Settings16 = () => (
    <SettingsPage>
        <SidebarNavigationSlim activeUrl="/settings" items={navItemsFlat} footerItems={navFooterItemsCompact} />

        <SettingsMain>
            <SettingsTabsRoot selectedTab="billing">
                <SettingsPageTitle title="Settings" description="Manage your team and preferences here.">
                    <SettingsTabsRow selectedTab="billing" type="underline" />
                </SettingsPageTitle>

                <SettingsTabPanel id="billing">
                    <SectionHeader title="Payment method" description="Update your billing details and address." />

                    <SettingsFormRow label="Card details" hint="Select default payment method." showLabelOnMobile>
                        <AriaRadioGroup aria-label="Card details" defaultValue="visa-1234" className="flex flex-col gap-4">
                            <PaymentCardOption value="visa-1234" icon={VisaIcon} name="Visa ending in 1234" expiry="Expiry 06/2028" />
                            <PaymentCardOption value="mastercard-1234" icon={MastercardIcon} name="Mastercard ending in 1234" expiry="Expiry 08/2029" />
                            <PaymentCardOption value="apple-pay-1234" icon={ApplePayIcon} name="Apple Pay ending in 1234" expiry="Expiry 10/2028" />
                        </AriaRadioGroup>

                        <Button color="link-color" size="md" iconLeading={Plus} className="w-max">
                            Add new payment method
                        </Button>
                    </SettingsFormRow>

                    <SectionHeader
                        title="Billing history"
                        description="Access all your previous invoices."
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
                                <Table.Head id="admin" label="Account admin" />
                                <Table.Head id="users" label="Users on plan" />
                                <Table.Head id="amount" label="Amount" />
                                <Table.Head id="date" label="Date" />
                                <Table.Head id="status" label="Status" />
                            </Table.Header>

                            <Table.Body items={invoices}>
                                {(invoice) => (
                                    <Table.Row id={invoice.id}>
                                        <Table.Cell className="text-primary font-medium whitespace-nowrap">{invoice.label}</Table.Cell>
                                        <Table.Cell>
                                            <div className="flex items-center gap-3">
                                                <Avatar src={accountAdmin.src} alt="" size="md" initials={accountAdmin.initials} />
                                                <div className="whitespace-nowrap">
                                                    <p className="text-primary text-sm font-medium">{accountAdmin.name}</p>
                                                    <p className="text-tertiary text-sm">{accountAdmin.email}</p>
                                                </div>
                                            </div>
                                        </Table.Cell>
                                        <Table.Cell>
                                            <AvatarStack people={usersOnPlan} remaining={5} />
                                        </Table.Cell>
                                        <Table.Cell className="whitespace-nowrap">USD $10.00</Table.Cell>
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
                </SettingsTabPanel>
            </SettingsTabsRoot>
        </SettingsMain>
    </SettingsPage>
);
