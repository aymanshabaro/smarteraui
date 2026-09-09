"use client";

import { Radio as AriaRadio } from "react-aria-components";
import { DownloadCloud01, DownloadCloud02, Plus } from "@smarteraui/icons";
import { SectionHeader } from "@/components/application/section-headers/section-headers";
import { Table, TableCard } from "@/components/application/table/table";
import { Tabs } from "@/components/application/tabs/tabs";
import { Avatar } from "@/components/base/avatar/avatar";
import { BadgeWithDot } from "@/components/base/badges/badges";
import { Button } from "@/components/base/buttons/button";
import { ButtonUtility } from "@/components/base/buttons/button-utility";
import { CheckboxBase } from "@/components/base/checkbox/checkbox";
import { RadioGroup } from "@/components/base/radio-buttons/radio-buttons";
import { MastercardIcon, VisaIcon } from "@/components/foundations/payment-icons";
import { cx } from "@/utils/cx";
import { AVATARS } from "@/utils/demo-assets";
import { Divider, FieldLabel, PageContainer, SettingsHeaderNav, settingsSections, styles } from "./settings-shell";

const cards = [
    { id: "visa-1", Icon: VisaIcon, name: "Visa ending in 1234", expiry: "Expiry 06/2028" },
    { id: "mastercard", Icon: MastercardIcon, name: "Mastercard ending in 1234", expiry: "Expiry 06/2028" },
    { id: "visa-2", Icon: VisaIcon, name: "Visa ending in 1234", expiry: "Expiry 06/2028" },
];

const months = ["Dec", "Nov", "Oct", "Sep", "Aug", "Jul", "Jun"];

const invoices = months.map((month) => ({
    id: month,
    invoice: `Basic plan – ${month} 2026`,
    amount: "USD $10.00",
    date: `${month} 1, 2026`,
}));

const planUsers = AVATARS.slice(0, 5);

/** Billing settings with three saved cards behind a vertical tab rail. */
export const Settings16 = () => (
    <div className="bg-primary">
        <SettingsHeaderNav activeUrl="/settings/billing" subNav="buttons" />

        <main className="bg-primary pt-8 pb-12 lg:pt-12 lg:pb-24">
            <div className="flex flex-col gap-8">
                <PageContainer className="flex flex-col gap-5">
                    <div className="lg:border-secondary flex flex-col gap-4 lg:flex-row lg:border-b lg:pb-4">
                        <div className="flex flex-1 flex-col gap-0.5">
                            <h1 className={styles.pageTitle}>Settings</h1>
                            <p className={styles.pageDescription}>Manage your team and preferences here.</p>
                        </div>
                    </div>
                </PageContainer>

                <div className="max-w-container mx-auto flex w-full gap-24 px-4 lg:px-8">
                    <Tabs orientation="vertical" defaultSelectedKey="billing" className="hidden w-auto lg:flex">
                        <Tabs.List type="button-gray" items={settingsSections} aria-label="Settings sections">
                            {(item) => <Tabs.Item {...item} badge={item.id === "team" ? 2 : item.id === "notifications" ? 2 : undefined} />}
                        </Tabs.List>
                        {settingsSections.map((item) => (
                            <Tabs.Panel key={item.id} id={item.id} />
                        ))}
                    </Tabs>

                    <div className="flex min-w-0 flex-1 flex-col gap-6">
                        <SectionHeader size="sm" title="Payment method" description="Update your billing details and address." />

                        <div className={styles.rowWide}>
                            <FieldLabel isRequired title="Card details" description="Select default payment method." />

                            <div className="flex flex-col gap-4">
                                <RadioGroup aria-label="Payment options" defaultValue="visa-1" className="flex flex-col gap-3">
                                    {cards.map(({ id, Icon, name, expiry }) => (
                                        <AriaRadio
                                            key={id}
                                            value={id}
                                            className={({ isSelected, isFocusVisible }) =>
                                                cx(
                                                    "bg-primary outline-focus-ring relative flex cursor-pointer items-start gap-1 rounded-xl p-4 ring-inset",
                                                    isSelected ? "ring-brand ring-2" : "ring-secondary ring-1",
                                                    isFocusVisible && "outline-2 outline-offset-2",
                                                )
                                            }
                                        >
                                            {({ isSelected }) => (
                                                <>
                                                    <span className="flex flex-1 gap-3">
                                                        <Icon aria-hidden="true" className="h-8 w-11.5 shrink-0" />

                                                        <span>
                                                            <span className="flex flex-col">
                                                                <span className="text-secondary pointer-events-none text-sm font-medium">{name}</span>
                                                                <span className="text-tertiary text-sm">{expiry}</span>
                                                            </span>

                                                            <span className="mt-2 flex gap-3">
                                                                <Button color="link-gray" size="md">
                                                                    Set as default
                                                                </Button>
                                                                <Button color="link-color" size="md">
                                                                    Edit
                                                                </Button>
                                                            </span>
                                                        </span>
                                                    </span>

                                                    <CheckboxBase isSelected={isSelected} />
                                                </>
                                            )}
                                        </AriaRadio>
                                    ))}
                                </RadioGroup>

                                <div className="flex gap-3">
                                    <Button color="link-gray" size="md" iconLeading={Plus}>
                                        Add new payment method
                                    </Button>
                                </div>
                            </div>
                        </div>

                        <Divider />

                        <SectionHeader
                            size="sm"
                            divider={false}
                            title="Billing history"
                            description="Access all your previous invoices."
                            actions={
                                <Button size="sm" color="secondary" iconLeading={DownloadCloud02}>
                                    Download all
                                </Button>
                            }
                        />

                        <TableCard.Root className="lg:bg-primary -mx-4 rounded-none bg-transparent shadow-none ring-0 lg:mx-0 lg:rounded-xl lg:shadow-xs lg:ring-1">
                            <Table aria-label="Invoices" selectionMode="multiple" className="bg-primary">
                                <Table.Header className="bg-primary">
                                    <Table.Head id="invoice" label="Invoice" isRowHeader className="w-full" />
                                    <Table.Head id="amount" label="Amount" />
                                    <Table.Head id="date" label="Date" />
                                    <Table.Head id="status" label="Status" />
                                    <Table.Head id="users" label="Users on plan" />
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
                                            <Table.Cell>
                                                <div className="flex -space-x-1">
                                                    {planUsers.map((user) => (
                                                        <Avatar
                                                            key={user.email}
                                                            size="xs"
                                                            src={user.src}
                                                            alt={user.name}
                                                            className="ring-bg-primary ring-[1.5px]"
                                                        />
                                                    ))}
                                                    <Avatar size="xs" initials="+5" alt="5 more users" className="ring-bg-primary ring-[1.5px]" />
                                                </div>
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
                    </div>
                </div>
            </div>
        </main>
    </div>
);
