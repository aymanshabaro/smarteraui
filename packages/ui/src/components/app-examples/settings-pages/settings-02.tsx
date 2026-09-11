"use client";

import { countriesOptions } from "../../../utils/countries";
import { AVATARS, IMAGES } from "../../../utils/demo-assets";
import { timezonesOptions } from "../../../utils/timezones";
import { SidebarNavigationSlim } from "../../application/app-navigation/sidebar-navigation/sidebar-slim";
import { FileUpload } from "../../application/file-upload/file-upload-base";
import { AvatarProfilePhoto } from "../../base/avatar/avatar-profile-photo";
import { Button } from "../../base/buttons/button";
import { Form } from "../../base/form/form";
import { Input, InputBase } from "../../base/input/input";
import { InputGroup } from "../../base/input/input-group";
import { Select } from "../../base/select/select";
import { TextArea } from "../../base/textarea/textarea";
import { Toggle } from "../../base/toggle/toggle";
import { SettingsFormRow, SettingsMain, SettingsPage, navFooterItemsCompact, navItemsFlat } from "./settings-shared.a";

const account = AVATARS[0];

/** Profile settings on a cover-photo page header, with each form row rendered as its own card. */
export const Settings02 = () => (
    <SettingsPage>
        <SidebarNavigationSlim activeUrl="/settings" items={navItemsFlat} footerItems={navFooterItemsCompact} />

        <SettingsMain className="pt-0">
            <div className="flex flex-col gap-8 lg:gap-12">
                <header className="relative flex flex-col">
                    <div className="px-1 pt-1">
                        <img src={IMAGES.landscape[0].src} alt="" className="h-40 w-full rounded-xl object-cover lg:h-60" />
                    </div>

                    <div className="mx-auto -mt-12 w-full max-w-(--breakpoint-xl) px-4 lg:-mt-10 lg:px-8">
                        <div className="flex flex-col gap-4 lg:flex-row lg:gap-5">
                            <div className="flex justify-between">
                                <AvatarProfilePhoto size="md" src={account.src} alt={account.name} className="lg:hidden" />
                                <AvatarProfilePhoto size="lg" src={account.src} alt={account.name} className="max-lg:hidden" />
                            </div>

                            <div className="flex w-full flex-col gap-4 lg:pt-16">
                                <div className="flex flex-1 flex-col flex-wrap gap-4 lg:flex-row">
                                    <div className="flex min-w-60 flex-1 flex-col gap-0.5">
                                        <h1 className="text-primary text-xl font-semibold">{account.name}</h1>
                                        <p className="text-md text-tertiary">{account.email}</p>
                                    </div>

                                    <div className="flex flex-col gap-3 lg:flex-row">
                                        <Button color="secondary" size="md">
                                            Share
                                        </Button>
                                        <Button size="md">View profile</Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                <div className="flex flex-col gap-8 px-4 lg:gap-5 lg:px-8">
                    <SettingsFormRow
                        label="Personal info"
                        hint="Update your photo and personal details."
                        headingLevel="h2"
                        showLabelOnMobile
                        className="lg:grid-cols-[minmax(200px,280px)_minmax(560px,720px)]"
                    >
                        <Form className="bg-primary ring-secondary rounded-xl shadow-xs ring-1 ring-inset">
                            <div className="flex flex-col gap-6 px-4 py-5 lg:px-6 lg:py-6">
                                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                                    <Input isRequired label="First name" name="firstName" placeholder="First name" defaultValue="Olivia" />
                                    <Input isRequired label="Last name" name="lastName" placeholder="Last name" defaultValue="Rhye" />
                                </div>

                                <Input isRequired type="email" label="Email address" name="email" placeholder="Email address" defaultValue={account.email} />

                                <div className="flex flex-col gap-5 lg:flex-row">
                                    <FileUpload.DropZone className="w-full" accept="image/svg+xml,image/png,image/jpeg,image/gif" />
                                </div>
                            </div>

                            <div className="border-secondary flex justify-end gap-3 border-t px-4 py-4 lg:px-6">
                                <Button color="secondary" size="md">
                                    Cancel
                                </Button>
                                <Button type="submit" size="md">
                                    Save changes
                                </Button>
                            </div>
                        </Form>
                    </SettingsFormRow>

                    <hr className="bg-border-secondary hidden h-px w-full border-none lg:block" />

                    <SettingsFormRow
                        label="Profile"
                        hint="Update your portfolio and bio."
                        headingLevel="h2"
                        showLabelOnMobile
                        className="lg:grid-cols-[minmax(200px,280px)_minmax(560px,720px)]"
                    >
                        <Form className="bg-primary ring-secondary rounded-xl shadow-xs ring-1 ring-inset">
                            <div className="flex flex-col gap-6 px-4 py-5 lg:p-6">
                                <Toggle size="md" defaultSelected label="Available for projects" hint="I'm open and available for work." className="w-max" />

                                <InputGroup isRequired label="Username" leadingAddon={<InputGroup.Prefix>proper.example/</InputGroup.Prefix>}>
                                    <InputBase placeholder="olivia" defaultValue="olivia" />
                                </InputGroup>

                                <InputGroup isRequired label="Website" leadingAddon={<InputGroup.Prefix>https://</InputGroup.Prefix>}>
                                    <InputBase placeholder="www.proper.example" defaultValue="www.proper.example" />
                                </InputGroup>

                                <TextArea
                                    label="Description"
                                    rows={4}
                                    maxLength={400}
                                    hint="275 characters left"
                                    defaultValue="I'm a Product Designer based in Melbourne, Australia. I specialize in UX/UI design, brand strategy, and front-end development."
                                />

                                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                                    <Select isRequired label="Country" placeholder="Select a country" defaultSelectedKey="AU" items={countriesOptions}>
                                        {(item) => (
                                            <Select.Item id={item.id} icon={item.icon}>
                                                {item.label}
                                            </Select.Item>
                                        )}
                                    </Select>

                                    <Select isRequired label="Timezone" placeholder="Select a timezone" defaultSelectedKey="UTC−08:00" items={timezonesOptions}>
                                        {(item) => (
                                            <Select.Item id={item.id} icon={item.icon} supportingText={item.supportingText}>
                                                {item.label}
                                            </Select.Item>
                                        )}
                                    </Select>
                                </div>
                            </div>

                            <div className="border-secondary flex justify-end gap-3 border-t px-4 py-4 lg:px-6">
                                <Button color="secondary" size="md">
                                    Cancel
                                </Button>
                                <Button type="submit" size="md">
                                    Save changes
                                </Button>
                            </div>
                        </Form>
                    </SettingsFormRow>
                </div>
            </div>
        </SettingsMain>
    </SettingsPage>
);
