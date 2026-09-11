"use client";

import { Radio as AriaRadio } from "react-aria-components";
import { DownloadCloud01, DownloadCloud02, Mail01, Plus } from "@properui/icons";
import { cx } from "../../../utils/cx";
import { AVATARS, avatar } from "../../../utils/demo-assets";
import { SectionHeader } from "../../application/section-headers/section-headers";
import { Table, TableCard } from "../../application/table/table";
import { Avatar } from "../../base/avatar/avatar";
import { BadgeWithDot } from "../../base/badges/badges";
import { ButtonGroup, ButtonGroupItem } from "../../base/button-group/button-group";
import { Button } from "../../base/buttons/button";
import { ButtonUtility } from "../../base/buttons/button-utility";
import { CheckboxBase } from "../../base/checkbox/checkbox";
import { InputBase } from "../../base/input/input";
import { RadioButton, RadioGroup } from "../../base/radio-buttons/radio-buttons";
import { NativeSelect } from "../../base/select/select-native";
import { MastercardIcon, VisaIcon } from "../../foundations/payment-icons";
import { Divider, FieldLabel, PageContainer, SettingsHeaderNav, styles } from "./settings-shell";

const person = avatar(0);

const sections = [
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

const cards = [
    { id: "visa", Icon: VisaIcon, name: "Visa ending in 1234", expiry: "Expiry 06/2028" },
    { id: "mastercard", Icon: MastercardIcon, name: "Mastercard ending in 1234", expiry: "Expiry 06/2028" },
];

const months = ["Dec", "Nov", "Oct", "Sep", "Aug", "Jul", "Jun"];

const invoices = months.map((month) => ({
    id: month,
    invoice: `Basic plan - ${month} 2026`,
    amount: "USD $10.00",
    date: `${month} 1, 2026`,
}));

const planUsers = AVATARS.slice(0, 5);

const UsersOnPlan = () => (
    <div className="flex -space-x-1">
        {planUsers.map((user) => (
            <Avatar key={user.email} size="xs" src={user.src} alt={user.name} className="ring-bg-primary ring-[1.5px]" />
        ))}
        <Avatar size="xs" initials="+5" alt="5 more users" className="ring-bg-primary ring-[1.5px]" />
    </div>
);

/** Payment method settings with a contact-email choice, saved cards, and billing history. */
export const Settings15 = () => (
    <div className="bg-primary">
        <SettingsHeaderNav showUpgrade={false} activeUrl="/settings/billing" subNav="buttons" />

        <main className="bg-primary pt-8 pb-12 lg:pt-12 lg:pb-24">
            <div className="flex flex-col gap-8">
                <PageContainer className="flex flex-col gap-5">
                    <div className="flex flex-col gap-4 lg:flex-row">
                        <div className="flex flex-1 flex-col gap-0.5">
                            <h1 className={styles.pageTitle}>Settings</h1>
                            <p className={styles.pageDescription}>Manage your team and preferences here.</p>
                        </div>
                    </div>

                    <NativeSelect
                        size="sm"
                        aria-label="Page tabs"
                        defaultValue="billing"
                        options={sections.map((section) => ({ label: section.label, value: section.id }))}
                        className="w-full md:hidden"
                    />

                    <ButtonGroup size="sm" selectedKeys={["billing"]} aria-label="Settings sections" className="hidden md:inline-flex">
                        {sections.map((section) => (
                            <ButtonGroupItem key={section.id} id={section.id}>
                                {section.label}
                            </ButtonGroupItem>
                        ))}
                    </ButtonGroup>
                </PageContainer>

                <PageContainer className="flex flex-col gap-6">
                    <SectionHeader size="sm" title="Payment method" description="Update your billing details and address." />

                    <div className="flex flex-col gap-5">
                        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(200px,280px)_minmax(480px,512px)] lg:gap-8">
                            <FieldLabel title="Contact email" description="Where should invoices be sent?" />

                            <div className="flex flex-col gap-3">
                                <RadioGroup aria-label="Contact email" defaultValue="alternative" className="flex flex-col gap-4">
                                    <RadioButton value="account" label="Send to my account email" hint={person.email} />
                                    <RadioButton value="alternative" label="Send to an alternative email" />
                                </RadioGroup>

                                <div className="ps-6">
                                    <InputBase type="email" name="email" icon={Mail01} aria-label="Email address" defaultValue="billing@proper.example" />
                                </div>
                            </div>
                        </div>

                        <Divider />

                        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(200px,280px)_minmax(480px,512px)] lg:gap-8">
                            <FieldLabel isRequired title="Card details" description="Select default payment method." />

                            <div className="flex flex-col gap-4">
                                <RadioGroup aria-label="Payment options" defaultValue="visa" className="flex flex-col gap-3">
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
                    </div>
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
                                            <UsersOnPlan />
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
