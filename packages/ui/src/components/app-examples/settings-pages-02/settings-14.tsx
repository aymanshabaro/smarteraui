"use client";

import { Mail01, Plus } from "@smarteraui/icons";
import { SectionHeader } from "@/components/application/section-headers/section-headers";
import { Tabs } from "@/components/application/tabs/tabs";
import { Button } from "@/components/base/buttons/button";
import { Form } from "@/components/base/form/form";
import { Input, InputBase } from "@/components/base/input/input";
import { PaymentInput } from "@/components/base/input/input-payment";
import { Select } from "@/components/base/select/select";
import { NativeSelect } from "@/components/base/select/select-native";
import { countriesOptions } from "@/utils/countries";
import { avatar } from "@/utils/demo-assets";
import { Divider, FieldLabel, PageContainer, SettingsHeaderNav, settingsSectionOptions, settingsSections, styles } from "./settings-shell";

const person = avatar(0);

const addressRowStyles = "grid grid-cols-1 lg:grid-cols-[minmax(200px,280px)_minmax(400px,512px)] lg:gap-8";

/** Payment method settings: card details and the billing address behind a vertical tab rail. */
export const Settings14 = () => (
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

                    <NativeSelect size="sm" aria-label="Page tabs" defaultValue="billing" options={settingsSectionOptions} className="w-full lg:hidden" />
                </PageContainer>

                <div className="max-w-container mx-auto flex w-full gap-24 px-4 lg:px-8">
                    <Tabs orientation="vertical" defaultSelectedKey="billing" className="hidden w-auto lg:flex">
                        <Tabs.List type="button-gray" items={settingsSections} aria-label="Settings sections">
                            {(item) => <Tabs.Item {...item} badge={item.id === "team" ? 4 : item.id === "notifications" ? 2 : undefined} />}
                        </Tabs.List>
                        {settingsSections.map((item) => (
                            <Tabs.Panel key={item.id} id={item.id} />
                        ))}
                    </Tabs>

                    <div className="flex min-w-0 flex-1 flex-col gap-6">
                        <SectionHeader size="sm" title="Payment method" description="Update your billing details and address." />

                        <Form className="flex flex-col gap-5">
                            <div className={styles.row}>
                                <FieldLabel isRequired title="Card details" />

                                <div className="grid grid-flow-row grid-cols-2 gap-4 sm:grid-cols-[1fr_112px]">
                                    <Input isRequired label="Name on card" name="cardName" defaultValue={person.name} />
                                    <Input isRequired label="Expiry" name="cardExpiry" defaultValue="06 / 2028" />
                                    <PaymentInput isRequired label="Card number" name="cardNumber" defaultValue="4242424242424242" />
                                    <Input isRequired type="password" label="CVV" name="cardCvv" defaultValue="123" />
                                </div>
                            </div>

                            <Divider />

                            <div className={styles.row}>
                                <FieldLabel isRequired title="Email address" description="Invoices will be sent to this email address." />

                                <div className="flex flex-col gap-4">
                                    <InputBase type="email" name="email" icon={Mail01} aria-label="Email address" defaultValue={person.email} />

                                    <div className="flex gap-3">
                                        <Button color="link-gray" size="md" iconLeading={Plus}>
                                            Add another
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            <Divider />

                            <div className={addressRowStyles}>
                                <FieldLabel isRequired title="Street address" className="max-lg:hidden" />
                                <Input label="Street address" name="streetAddress" className="lg:**:data-label:hidden" defaultValue="100 Smith Street" />
                            </div>

                            <Divider />

                            <div className={addressRowStyles}>
                                <FieldLabel isRequired title="City" className="max-lg:hidden" />
                                <Input label="City" name="city" className="lg:**:data-label:hidden" defaultValue="Collingwood" />
                            </div>

                            <Divider />

                            <div className={addressRowStyles}>
                                <FieldLabel isRequired title="State / Province" className="max-lg:hidden" />

                                <div className="grid grid-cols-2 gap-6 lg:grid-cols-[148px_148px]">
                                    <Input label="State / Province" name="state" className="lg:**:data-label:hidden" defaultValue="Victoria" />
                                    <Input label="Postcode" name="postcode" className="lg:**:data-label:hidden" defaultValue="3066" />
                                </div>
                            </div>

                            <Divider />

                            <div className={addressRowStyles}>
                                <FieldLabel isRequired title="Country" className="max-lg:hidden" />

                                <Select
                                    isRequired
                                    label="Country"
                                    name="country"
                                    className="lg:**:data-label:hidden"
                                    items={countriesOptions}
                                    defaultSelectedKey="AU"
                                    placeholder="Select a country"
                                >
                                    {(item) => (
                                        <Select.Item id={item.id} icon={item.icon}>
                                            {item.label}
                                        </Select.Item>
                                    )}
                                </Select>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        </main>
    </div>
);
