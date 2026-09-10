"use client";

import { Radio as AriaRadio } from "react-aria-components";
import { DownloadCloud01, DownloadCloud02, SearchLg, Zap } from "@properui/icons";
import { SectionHeader } from "@/components/application/section-headers/section-headers";
import { Table, TableCard } from "@/components/application/table/table";
import { BadgeWithDot } from "@/components/base/badges/badges";
import { Button } from "@/components/base/buttons/button";
import { ButtonUtility } from "@/components/base/buttons/button-utility";
import { CheckboxBase } from "@/components/base/checkbox/checkbox";
import { DropdownIconSimple } from "@/components/base/dropdown/dropdown-icon-simple";
import { Input } from "@/components/base/input/input";
import { RadioGroup } from "@/components/base/radio-buttons/radio-buttons";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";
import { cx } from "@/utils/cx";
import { FieldLabel, PageContainer, SettingsHeaderNav, styles } from "./settings-shell";

const plans = [
    { id: "basic", name: "Basic plan", price: "$10/month", description: "Includes up to 10 users, 20 GB individual data and access to all features." },
    { id: "business", name: "Business plan", price: "$20/month", description: "Includes up to 20 users, 40 GB individual data and access to all features." },
    { id: "enterprise", name: "Enterprise plan", price: "$40/month", description: "Unlimited users, unlimited individual data and access to all features." },
];

const months = ["Dec", "Nov", "Oct", "Sep", "Aug", "Jul", "Jun"];

const invoices = months.map((month) => ({
    id: `basic-${month}`,
    invoice: `${month} 2026`,
    amount: "USD $10.00",
    plan: "Basic plan",
}));

/** Billing settings laid out as labelled rows: plan picker, then invoice history. */
export const Settings12 = () => (
    <div className="bg-primary">
        <SettingsHeaderNav activeUrl="/settings/billing" subNav="buttons" />

        <main className="bg-primary pt-8 pb-12 lg:pt-12 lg:pb-24">
            <div className="flex flex-col gap-8">
                <PageContainer>
                    <div className="flex flex-col gap-5">
                        <div className="flex flex-col gap-4 lg:flex-row">
                            <div className="flex flex-1 flex-col gap-0.5">
                                <h1 className={styles.pageTitle}>Billing</h1>
                            </div>

                            <Input shortcut size="sm" aria-label="Search" placeholder="Search" icon={SearchLg} className="w-full max-w-70 max-md:hidden" />
                        </div>
                    </div>
                </PageContainer>

                <PageContainer className="flex flex-col gap-6">
                    <SectionHeader
                        size="sm"
                        title="Account plans"
                        description="Pick an account plan that fits your workflow."
                        actions={<DropdownIconSimple />}
                    />

                    <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(200px,280px)_minmax(560px,640px)] lg:gap-8">
                        <FieldLabel title="Current plan" description="We'll credit your account if you need to downgrade during the billing cycle." />

                        <RadioGroup aria-label="Current plan" defaultValue="basic" className="flex flex-col gap-3">
                            {plans.map((plan) => (
                                <AriaRadio
                                    key={plan.id}
                                    value={plan.id}
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
                                                <FeaturedIcon size="md" theme="modern" color="gray" icon={Zap} />

                                                <span className="flex flex-col">
                                                    <span className="pointer-events-none flex gap-1">
                                                        <span className="text-secondary text-sm font-medium">{plan.name}</span>
                                                        <span className="text-tertiary text-sm">{plan.price}</span>
                                                    </span>
                                                    <span className="text-tertiary text-sm">{plan.description}</span>
                                                </span>
                                            </span>

                                            <CheckboxBase isSelected={isSelected} />
                                        </>
                                    )}
                                </AriaRadio>
                            ))}
                        </RadioGroup>
                    </div>
                </PageContainer>

                <PageContainer className="flex flex-col gap-6">
                    <SectionHeader
                        size="sm"
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

                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(200px,280px)_1fr] lg:gap-8">
                        <FieldLabel
                            title="Billing history"
                            description={
                                <>
                                    Please reach out to our friendly team via{" "}
                                    <a
                                        href="mailto:billing@proper.example"
                                        className="outline-focus-ring text-brand-secondary rounded-xs font-medium focus-visible:outline-2 focus-visible:outline-offset-2"
                                    >
                                        billing@proper.example
                                    </a>{" "}
                                    with questions.
                                </>
                            }
                        />

                        <TableCard.Root className="lg:bg-primary -mx-4 rounded-none bg-transparent shadow-none ring-0 lg:mx-0 lg:rounded-xl lg:shadow-xs lg:ring-1">
                            <Table aria-label="Invoices" selectionMode="multiple" className="bg-primary">
                                <Table.Header className="bg-primary">
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
                                            <Table.Cell className="text-primary font-medium whitespace-nowrap">{invoice.invoice}</Table.Cell>
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
                    </div>
                </PageContainer>
            </div>
        </main>
    </div>
);
