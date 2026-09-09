"use client";

import { SidebarNavigationSectionsSubheadings } from "@/components/application/app-navigation/sidebar-navigation/sidebar-sections-subheadings";
import { SectionFooter } from "@/components/application/section-footers/section-footers";
import { SectionHeader } from "@/components/application/section-headers/section-headers";
import { Button } from "@/components/base/buttons/button";
import { Form } from "@/components/base/form/form";
import { Input } from "@/components/base/input/input";
import { PaymentInput } from "@/components/base/input/input-payment";
import { Select } from "@/components/base/select/select";
import { countriesOptions } from "@/utils/countries";
import {
    SettingsBlock,
    SettingsButtonGroupRow,
    SettingsFieldPair,
    SettingsFormRow,
    SettingsMain,
    SettingsPage,
    SettingsPageTitle,
    SettingsRowDivider,
    SettingsStack,
    type SettingsTabItem,
    hideLabelOnDesktop,
    navItemsWithSubheadings,
} from "./settings-shared.a";

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

/** Billing settings: the card details and billing address form. */
export const Settings14 = () => (
    <SettingsPage>
        <SidebarNavigationSectionsSubheadings activeUrl="/settings" items={navItemsWithSubheadings} />

        <SettingsMain>
            <SettingsStack>
                <SettingsPageTitle title="Settings" description="Manage your team and preferences here.">
                    <SettingsButtonGroupRow items={tabs} selectedTab="billing" />
                </SettingsPageTitle>

                <SettingsBlock>
                    <Form className="flex flex-col gap-6">
                        <SectionHeader title="Payment method" description="Update your billing details and address." />

                        <div className="flex flex-col gap-5">
                            <SettingsFormRow label="Card details">
                                <Input isRequired label="Name on card" placeholder="Olivia Rhye" defaultValue="Olivia Rhye" />
                                <SettingsFieldPair>
                                    <PaymentInput isRequired label="Card number" placeholder="0000 0000 0000 0000" />
                                    <div className="grid grid-cols-2 gap-5">
                                        <Input isRequired label="Expiry" placeholder="MM / YY" />
                                        <Input isRequired label="CVV" placeholder="•••" />
                                    </div>
                                </SettingsFieldPair>
                            </SettingsFormRow>

                            <SettingsRowDivider />

                            <SettingsFormRow label="Email address" hint="Invoices will be sent to this email address.">
                                <Input isRequired type="email" label="Email address" placeholder="billing@smartera.com" className={hideLabelOnDesktop} />
                                <Button color="link-color" size="md" className="w-max">
                                    Add another
                                </Button>
                            </SettingsFormRow>

                            <SettingsRowDivider />

                            <SettingsFormRow label="Street address">
                                <Input isRequired label="Street address" placeholder="100 Smith Street" className={hideLabelOnDesktop} />
                            </SettingsFormRow>

                            <SettingsRowDivider />

                            <SettingsFormRow label="City">
                                <Input isRequired label="City" placeholder="Collingwood" className={hideLabelOnDesktop} />
                            </SettingsFormRow>

                            <SettingsRowDivider />

                            <SettingsFormRow label="State / Province">
                                <SettingsFieldPair>
                                    <Input isRequired label="State / Province" placeholder="Victoria" className={hideLabelOnDesktop} />
                                    <Input isRequired label="Postcode" placeholder="3066" />
                                </SettingsFieldPair>
                            </SettingsFormRow>

                            <SettingsRowDivider />

                            <SettingsFormRow label="Country">
                                <Select
                                    isRequired
                                    label="Country"
                                    placeholder="Select a country"
                                    defaultSelectedKey="AU"
                                    items={countriesOptions}
                                    className={hideLabelOnDesktop}
                                >
                                    {(item) => (
                                        <Select.Item id={item.id} icon={item.icon}>
                                            {item.label}
                                        </Select.Item>
                                    )}
                                </Select>
                            </SettingsFormRow>
                        </div>

                        <SectionFooter>
                            <Button color="secondary" size="md">
                                Cancel
                            </Button>
                            <Button type="submit" size="md">
                                Save
                            </Button>
                        </SectionFooter>
                    </Form>
                </SettingsBlock>
            </SettingsStack>
        </SettingsMain>
    </SettingsPage>
);
