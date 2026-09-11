"use client";

import { Mail01 } from "@properui/icons";
import { countriesOptions } from "../../../utils/countries";
import { AVATARS } from "../../../utils/demo-assets";
import { timezonesOptionsWithLongName } from "../../../utils/timezones";
import { FeaturedCardProgressBar } from "../../application/app-navigation/base-components/featured-cards";
import { SidebarNavigationSimple } from "../../application/app-navigation/sidebar-navigation/sidebar-simple";
import { FileUpload } from "../../application/file-upload/file-upload-base";
import { SectionFooter } from "../../application/section-footers/section-footers";
import { SectionHeader } from "../../application/section-headers/section-headers";
import { Avatar } from "../../base/avatar/avatar";
import { Button } from "../../base/buttons/button";
import { Form } from "../../base/form/form";
import { Input } from "../../base/input/input";
import { Select } from "../../base/select/select";
import { TextArea } from "../../base/textarea/textarea";
import {
    SettingsFieldPair,
    SettingsFormRow,
    SettingsMain,
    SettingsPage,
    SettingsPageTitle,
    SettingsRowDivider,
    SettingsTabPanel,
    SettingsTabsRoot,
    SettingsTabsRow,
    hideLabelOnDesktop,
    navFooterItems,
    navItemsNested,
} from "./settings-shared.a";

const account = AVATARS[0];

const noop = () => {};

/** Profile settings: a "My details" form under a simple sidebar, with a photo and portfolio upload. */
export const Settings01 = () => (
    <SettingsPage>
        <SidebarNavigationSimple
            activeUrl="/settings"
            items={navItemsNested}
            footerItems={navFooterItems}
            featureCard={
                <FeaturedCardProgressBar
                    title="Used space"
                    description="Your team has used 80% of your available space. Need more?"
                    confirmLabel="Upgrade plan"
                    progress={80}
                    className="hidden md:flex"
                    onDismiss={noop}
                    onConfirm={noop}
                />
            }
        />

        <SettingsMain>
            <SettingsTabsRoot selectedTab="details">
                <SettingsPageTitle title="Settings" withSearch>
                    <SettingsTabsRow selectedTab="details" />
                </SettingsPageTitle>

                <SettingsTabPanel id="details">
                    <Form className="flex flex-col gap-6">
                        <SectionHeader
                            title="Personal info"
                            description="Update your photo and personal details here."
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
                            <SettingsFormRow label="Name">
                                <SettingsFieldPair>
                                    <Input isRequired label="First name" placeholder="First name" defaultValue="Olivia" className={hideLabelOnDesktop} />
                                    <Input isRequired label="Last name" placeholder="Last name" defaultValue="Rhye" className={hideLabelOnDesktop} />
                                </SettingsFieldPair>
                            </SettingsFormRow>

                            <SettingsRowDivider />

                            <SettingsFormRow label="Email address">
                                <Input
                                    isRequired
                                    type="email"
                                    label="Email address"
                                    icon={Mail01}
                                    placeholder="olivia@proper.example"
                                    defaultValue={account.email}
                                    className={hideLabelOnDesktop}
                                />
                            </SettingsFormRow>

                            <SettingsRowDivider />

                            <SettingsFormRow label="Your photo" hint="This will be displayed on your profile.">
                                <div className="flex flex-col gap-5 lg:flex-row">
                                    <Avatar size="2xl" src={account.src} alt={account.name} />
                                    <FileUpload.DropZone className="w-full" accept="image/svg+xml,image/png,image/jpeg,image/gif" />
                                </div>
                            </SettingsFormRow>

                            <SettingsRowDivider />

                            <SettingsFormRow label="Role">
                                <Input isRequired label="Role" placeholder="Role" defaultValue="Product Designer" className={hideLabelOnDesktop} />
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

                            <SettingsRowDivider />

                            <SettingsFormRow label="Timezone">
                                <Select
                                    isRequired
                                    label="Timezone"
                                    placeholder="Select a timezone"
                                    defaultSelectedKey="UTC−08:00"
                                    items={timezonesOptionsWithLongName}
                                    className={hideLabelOnDesktop}
                                >
                                    {(item) => (
                                        <Select.Item id={item.id} icon={item.icon} supportingText={item.supportingText}>
                                            {item.label}
                                        </Select.Item>
                                    )}
                                </Select>
                            </SettingsFormRow>

                            <SettingsRowDivider />

                            <SettingsFormRow label="Bio" hint="Write a short introduction.">
                                <TextArea
                                    label="Bio"
                                    rows={5}
                                    placeholder="Tell your team a little about yourself"
                                    defaultValue="I'm a Product Designer based in Melbourne, Australia. I specialize in UX/UI design, brand strategy and front-end development."
                                    className={hideLabelOnDesktop}
                                />
                            </SettingsFormRow>

                            <SettingsRowDivider />

                            <SettingsFormRow label="Portfolio projects" hint="Share a few snippets of your work.">
                                <FileUpload.DropZone />

                                <FileUpload.List>
                                    <FileUpload.ListItemProgressBar name="Tech design requirements.pdf" type="pdf" size={200 * 1024} progress={100} />
                                    <FileUpload.ListItemProgressBar name="Dashboard recording.mp4" type="mp4" size={16 * 1024 * 1024} progress={40} />
                                    <FileUpload.ListItemProgressBar name="Dashboard prototype FINAL.fig" type="fig" size={4 * 1024 * 1024} progress={80} />
                                </FileUpload.List>
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
                </SettingsTabPanel>
            </SettingsTabsRoot>
        </SettingsMain>
    </SettingsPage>
);
