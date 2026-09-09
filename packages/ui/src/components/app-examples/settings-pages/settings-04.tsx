"use client";

import { FeaturedCardImage } from "@/components/application/app-navigation/base-components/featured-cards";
import { SidebarNavigationSimple } from "@/components/application/app-navigation/sidebar-navigation/sidebar-simple";
import { FileUpload } from "@/components/application/file-upload/file-upload-base";
import { SectionFooter } from "@/components/application/section-footers/section-footers";
import { SectionHeader } from "@/components/application/section-headers/section-headers";
import { Button } from "@/components/base/buttons/button";
import { Checkbox } from "@/components/base/checkbox/checkbox";
import { Form } from "@/components/base/form/form";
import { InputBase } from "@/components/base/input/input";
import { InputGroup } from "@/components/base/input/input-group";
import { TextArea } from "@/components/base/textarea/textarea";
import { IMAGES } from "@/utils/demo-assets";
import {
    SettingsBlock,
    SettingsButtonGroupRow,
    SettingsFormRow,
    SettingsMain,
    SettingsPage,
    SettingsPageTitle,
    SettingsRowDivider,
    SettingsStack,
    type SettingsTabItem,
    hideLabelOnDesktop,
    navFooterItems,
    navItemsFlat,
} from "./settings-shared.a";

const noop = () => {};

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

const socialProfiles = [
    { id: "x", label: "X profile", prefix: "x.com/", placeholder: "smartera" },
    { id: "facebook", label: "Facebook profile", prefix: "facebook.com/", placeholder: "smartera" },
    { id: "linkedin", label: "LinkedIn profile", prefix: "linkedin.com/company/", placeholder: "smartera" },
];

/** Company profile settings with a segmented button-group tab row. */
export const Settings04 = () => (
    <SettingsPage>
        <SidebarNavigationSimple
            activeUrl="/settings"
            items={navItemsFlat}
            footerItems={navFooterItems}
            featureCard={
                <FeaturedCardImage
                    title="New features available!"
                    description="Check out the new dashboard view. Pages now load faster."
                    confirmLabel="What's new?"
                    imageSrc={IMAGES.landscape[1].src}
                    imageAlt=""
                    onDismiss={noop}
                    onConfirm={noop}
                />
            }
        />

        <SettingsMain>
            <SettingsStack>
                <SettingsPageTitle title="Settings">
                    <SettingsButtonGroupRow items={tabs} selectedTab="profile" />
                </SettingsPageTitle>

                <SettingsBlock>
                    <Form className="flex flex-col gap-6">
                        <SectionHeader
                            title="Company profile"
                            description="Update your company photo and details here."
                            actions={
                                <>
                                    <Button color="secondary" size="sm">
                                        Cancel
                                    </Button>
                                    <Button type="submit" size="sm">
                                        Save
                                    </Button>
                                </>
                            }
                        />

                        <div className="flex flex-col gap-5">
                            <SettingsFormRow label="Public profile" hint="This will be displayed on your profile.">
                                <InputGroup
                                    isRequired
                                    label="Public profile"
                                    className={hideLabelOnDesktop}
                                    leadingAddon={<InputGroup.Prefix>smartera.com/profile/</InputGroup.Prefix>}
                                >
                                    <InputBase placeholder="smartera" defaultValue="smartera" />
                                </InputGroup>
                            </SettingsFormRow>

                            <SettingsRowDivider />

                            <SettingsFormRow label="Tagline" hint="A quick snapshot of your company.">
                                <TextArea
                                    label="Tagline"
                                    rows={4}
                                    maxLength={150}
                                    hint="41 characters left"
                                    className={hideLabelOnDesktop}
                                    defaultValue="Smartera UI is the ultimate design system for product teams. Kickstart any project and level up as a designer."
                                />
                            </SettingsFormRow>

                            <SettingsRowDivider />

                            <SettingsFormRow label="Company logo" hint="Update your company logo and then choose where you want it to display.">
                                <FileUpload.DropZone accept="image/svg+xml,image/png,image/jpeg,image/gif" />
                            </SettingsFormRow>

                            <SettingsRowDivider />

                            <SettingsFormRow
                                label="Branding"
                                hint={
                                    <>
                                        Add your logo to reports and emails.{" "}
                                        <Button color="link-color" size="sm" href="/branding/examples">
                                            View examples
                                        </Button>
                                    </>
                                }
                            >
                                <Checkbox size="md" defaultSelected label="Reports" hint="Include my logo in summary reports." />
                                <Checkbox size="md" label="Emails" hint="Include my logo in customer emails." />
                            </SettingsFormRow>

                            <SettingsRowDivider />

                            <SettingsFormRow label="Social profiles">
                                {socialProfiles.map((profile) => (
                                    <InputGroup
                                        key={profile.id}
                                        aria-label={profile.label}
                                        leadingAddon={<InputGroup.Prefix>{profile.prefix}</InputGroup.Prefix>}
                                    >
                                        <InputBase placeholder={profile.placeholder} />
                                    </InputGroup>
                                ))}
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
