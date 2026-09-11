"use client";

import { Mail01 } from "@properui/icons";
import { countriesOptions } from "../../../utils/countries";
import { avatar } from "../../../utils/demo-assets";
import { timezonesOptions } from "../../../utils/timezones";
import { FileUploadDropZone } from "../../application/file-upload/file-upload-base";
import { SectionHeader } from "../../application/section-headers/section-headers";
import { Avatar } from "../../base/avatar/avatar";
import { Button } from "../../base/buttons/button";
import { DropdownIconSimple } from "../../base/dropdown/dropdown-icon-simple";
import { Form } from "../../base/form/form";
import { Input, InputBase } from "../../base/input/input";
import { InputGroup } from "../../base/input/input-group";
import { Select } from "../../base/select/select";
import { TextArea } from "../../base/textarea/textarea";
import { Toggle } from "../../base/toggle/toggle";
import { PageContainer, SettingsHeaderNav } from "./settings-shell";

const person = avatar(0);

const description = "I'm a Product Designer based in Melbourne, Australia. I specialize in UX/UI design, brand strategy, and Webflow development.";
/** 275 characters are left of the budget once `description` is in the field. */
const descriptionBudget = description.length + 275;

const cardStyles = "bg-primary ring-secondary rounded-xl shadow-xs ring-1 ring-inset";
const cardFooterStyles = "border-secondary flex items-center gap-4 border-t px-4 py-3 md:py-4 lg:px-6";

const CardFooter = () => (
    <div className={cardFooterStyles}>
        <div className="flex flex-1 justify-end gap-3">
            <Button size="sm" color="secondary">
                Cancel
            </Button>
            <Button size="sm" type="submit">
                Save changes
            </Button>
        </div>
    </div>
);

/** Profile settings split into two stacked cards on a tinted page background. */
export const Settings02 = () => (
    <div className="bg-primary">
        <SettingsHeaderNav activeUrl="/settings/profile" subNav="tabs" />

        <main className="bg-secondary pt-8 pb-16 lg:pt-12 lg:pb-24">
            {/* The reference layout has no visible page title above the two section cards; a hidden
                h1 still gives the page a single top-level heading for assistive tech. */}
            <h1 className="sr-only">Settings</h1>

            <div className="flex flex-col gap-8">
                <PageContainer>
                    <div className="mx-auto flex w-full max-w-160 flex-col gap-6">
                        <SectionHeader
                            size="sm"
                            divider={false}
                            title="Personal info"
                            description="Update your photo and personal details here."
                            actions={<DropdownIconSimple />}
                        />

                        <Form className={cardStyles}>
                            <div className="flex flex-col gap-6 px-4 py-5 lg:px-6 lg:py-6">
                                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                                    <Input isRequired label="First name" name="firstName" defaultValue={person.name.split(" ")[0]} />
                                    <Input isRequired label="Last name" name="lastName" defaultValue={person.name.split(" ")[1]} />
                                </div>

                                <Input isRequired label="Email address" name="email" type="email" icon={Mail01} defaultValue={person.email} />

                                <div className="flex flex-col gap-5 lg:flex-row">
                                    <Avatar size="xl" src={person.src} alt="" className="shrink-0" />
                                    <FileUploadDropZone className="w-full" accept="image/svg+xml,image/png,image/jpeg,image/gif" />
                                </div>
                            </div>

                            <CardFooter />
                        </Form>
                    </div>
                </PageContainer>

                <PageContainer>
                    <div className="mx-auto flex w-full max-w-160 flex-col gap-6">
                        <SectionHeader
                            size="sm"
                            divider={false}
                            title="Public profile"
                            description="Choose how you appear to everyone else."
                            actions={<DropdownIconSimple />}
                        />

                        <Form className={cardStyles}>
                            <div className="flex flex-col gap-6 px-4 py-5 lg:p-6">
                                <Toggle defaultSelected size="sm" label="Available for projects" hint="I'm open and available for work." />

                                <InputGroup isRequired label="Username" leadingAddon={<InputGroup.Prefix>proper.example/</InputGroup.Prefix>}>
                                    <InputBase name="username" defaultValue={person.username.replace("@", "")} />
                                </InputGroup>

                                <InputGroup isRequired label="Website" leadingAddon={<InputGroup.Prefix>https://</InputGroup.Prefix>}>
                                    <InputBase name="website" defaultValue="www.proper.example" />
                                </InputGroup>

                                <TextArea
                                    isRequired
                                    label="Description"
                                    name="description"
                                    tooltip="Write a short introduction."
                                    defaultValue={description}
                                    maxLength={descriptionBudget}
                                    textAreaClassName="min-h-47 resize-y lg:min-h-37"
                                    hint={`${descriptionBudget - description.length} characters left`}
                                />

                                <Select label="Country" name="country" items={countriesOptions} defaultSelectedKey="AU" placeholder="Select a country">
                                    {(item) => (
                                        <Select.Item id={item.id} icon={item.icon}>
                                            {item.label}
                                        </Select.Item>
                                    )}
                                </Select>

                                <Select
                                    label="Timezone"
                                    name="timezone"
                                    items={timezonesOptions}
                                    defaultSelectedKey="UTC−08:00"
                                    placeholder="Select a timezone"
                                >
                                    {(item) => (
                                        <Select.Item id={item.id} icon={item.icon} supportingText={item.supportingText}>
                                            {item.label}
                                        </Select.Item>
                                    )}
                                </Select>
                            </div>

                            <CardFooter />
                        </Form>
                    </div>
                </PageContainer>
            </div>
        </main>
    </div>
);
