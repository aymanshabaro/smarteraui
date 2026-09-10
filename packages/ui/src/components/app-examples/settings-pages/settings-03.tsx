"use client";

import { SidebarNavigationSectionDividers } from "@/components/application/app-navigation/sidebar-navigation/sidebar-section-dividers";
import { SectionFooter } from "@/components/application/section-footers/section-footers";
import { SectionHeader } from "@/components/application/section-headers/section-headers";
import { Avatar } from "@/components/base/avatar/avatar";
import { Button } from "@/components/base/buttons/button";
import { Checkbox } from "@/components/base/checkbox/checkbox";
import { Form } from "@/components/base/form/form";
import { Input, InputBase } from "@/components/base/input/input";
import { InputGroup } from "@/components/base/input/input-group";
import { TextArea } from "@/components/base/textarea/textarea";
import { AVATARS } from "@/utils/demo-assets";
import {
    SettingsFormRow,
    SettingsMain,
    SettingsPage,
    SettingsPageTitle,
    SettingsRowDivider,
    SettingsTabPanel,
    SettingsTabsRoot,
    SettingsTabsRow,
    hideLabelOnDesktop,
    navItemsWithDividers,
} from "./settings-shared.a";

const account = AVATARS[0];

/** Profile settings under a sidebar with section dividers, with a segmented tab row. */
export const Settings03 = () => (
    <SettingsPage>
        <SidebarNavigationSectionDividers activeUrl="/settings" items={navItemsWithDividers} />

        <SettingsMain>
            <SettingsTabsRoot selectedTab="profile">
                <SettingsPageTitle title="Settings" withSearch>
                    <SettingsTabsRow selectedTab="profile" type="button-border" />
                </SettingsPageTitle>

                <SettingsTabPanel id="profile">
                    <Form className="flex flex-col gap-6">
                        <SectionHeader
                            title="Profile"
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
                            <SettingsFormRow label="Username">
                                <InputGroup
                                    isRequired
                                    label="Username"
                                    className={hideLabelOnDesktop}
                                    leadingAddon={<InputGroup.Prefix>proper.example/</InputGroup.Prefix>}
                                >
                                    <InputBase placeholder="olivia" defaultValue="olivia" />
                                </InputGroup>
                            </SettingsFormRow>

                            <SettingsRowDivider />

                            <SettingsFormRow label="Website">
                                <InputGroup
                                    isRequired
                                    label="Website"
                                    className={hideLabelOnDesktop}
                                    leadingAddon={<InputGroup.Prefix>https://</InputGroup.Prefix>}
                                >
                                    <InputBase placeholder="www.proper.example" defaultValue="www.proper.example" />
                                </InputGroup>
                            </SettingsFormRow>

                            <SettingsRowDivider />

                            <SettingsFormRow label="Your photo" hint="This will be displayed on your profile.">
                                <div className="flex items-center gap-5">
                                    <Avatar size="2xl" src={account.src} alt={account.name} />
                                    <div className="flex gap-3">
                                        <Button color="link-gray" size="md">
                                            Delete
                                        </Button>
                                        <Button color="link-color" size="md">
                                            Update
                                        </Button>
                                    </div>
                                </div>
                            </SettingsFormRow>

                            <SettingsRowDivider />

                            <SettingsFormRow label="Your bio" hint="Write a short introduction.">
                                <TextArea
                                    label="Your bio"
                                    rows={5}
                                    className={hideLabelOnDesktop}
                                    defaultValue="I'm a Product Designer based in Melbourne, Australia. I specialize in UX/UI design, brand strategy and front-end development."
                                />
                            </SettingsFormRow>

                            <SettingsRowDivider />

                            <SettingsFormRow label="Job title">
                                <Input isRequired label="Job title" placeholder="Job title" defaultValue="Product Designer" className={hideLabelOnDesktop} />
                                <Checkbox size="sm" defaultSelected label="Show my job title in my profile" />
                            </SettingsFormRow>

                            <SettingsRowDivider />

                            <SettingsFormRow
                                label="Alternative contact email"
                                hint="Enter an alternative email if you'd like to be contacted via a different email."
                            >
                                <Input type="email" label="Alternative contact email" placeholder="olivia@proper.example" className={hideLabelOnDesktop} />
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
