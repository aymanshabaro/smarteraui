"use client";

import { Mail01, SearchLg } from "@properui/icons";
import { SectionHeader } from "@/components/application/section-headers/section-headers";
import { Tabs } from "@/components/application/tabs/tabs";
import { Avatar } from "@/components/base/avatar/avatar";
import { AvatarProfilePhoto } from "@/components/base/avatar/avatar-profile-photo";
import { Button } from "@/components/base/buttons/button";
import { Checkbox } from "@/components/base/checkbox/checkbox";
import { Form } from "@/components/base/form/form";
import { Input, InputBase } from "@/components/base/input/input";
import { InputGroup } from "@/components/base/input/input-group";
import { NativeSelect } from "@/components/base/select/select-native";
import { TextEditor } from "@/components/base/text-editor/text-editor";
import { avatar } from "@/utils/demo-assets";
import { Divider, FieldLabel, FormFooter, PageContainer, SettingsHeaderNav, settingsSectionOptions, settingsSections, styles } from "./settings-shell";

const person = avatar(0);

const bio = "<p>I'm a Product Designer based in Melbourne, Australia. I specialise in UX/UI design, brand strategy, and Webflow development.</p>";

/** Profile settings behind a vertical tab rail, with a gradient cover header on desktop. */
export const Settings03 = () => (
    <div className="bg-primary">
        <SettingsHeaderNav />

        <main className="bg-primary pt-8 pb-16 lg:pt-12 lg:pb-24">
            <div className="flex flex-col gap-8">
                <PageContainer className="flex flex-col gap-5">
                    <div className="flex flex-col gap-4 lg:flex-row">
                        <div className="flex flex-1 flex-col gap-0.5">
                            <h1 className={styles.pageTitle}>Settings</h1>
                        </div>

                        <Input shortcut size="sm" aria-label="Search" placeholder="Search" icon={SearchLg} className="w-full max-w-70 max-md:hidden" />
                    </div>
                </PageContainer>

                <div className="max-w-container mx-auto flex w-full gap-24 px-4 lg:px-8">
                    <Tabs orientation="vertical" defaultSelectedKey="profile" className="hidden w-auto lg:flex">
                        <Tabs.List type="button-gray" items={settingsSections} aria-label="Settings sections">
                            {(item) => <Tabs.Item {...item} badge={item.id === "notifications" ? 2 : undefined} />}
                        </Tabs.List>
                        {settingsSections.map((item) => (
                            <Tabs.Panel key={item.id} id={item.id} />
                        ))}
                    </Tabs>

                    <Form className="flex min-w-0 flex-1 flex-col gap-6 lg:gap-12">
                        <div className="bg-primary relative hidden flex-col lg:flex">
                            {/* Decorative cover wash — no semantic token expresses a two-stop brand gradient. */}
                            <div className="h-40 w-full rounded-xl bg-linear-to-tr from-[#A6C0FE] to-[#FFEAF6] lg:h-60" />

                            <div className="max-w-container mx-auto -mt-12 flex w-full flex-col gap-6 px-4 lg:-mt-10 lg:px-0">
                                <div className="flex flex-col gap-4 lg:flex-row lg:gap-5">
                                    <AvatarProfilePhoto verified size="lg" src={person.src} alt={person.name} className="shrink-0" />

                                    <div className="flex w-full flex-col gap-5 lg:pt-16">
                                        <div className="flex flex-1 flex-col flex-wrap gap-4 lg:flex-row">
                                            <div className="flex min-w-60 flex-1 flex-col gap-0.5">
                                                <h2 className={styles.pageTitle}>Profile</h2>
                                                <p className="text-md text-tertiary">Update your photo and personal details.</p>
                                            </div>

                                            <div className="flex items-start gap-3">
                                                <Button size="sm" color="secondary">
                                                    Cancel
                                                </Button>
                                                <Button size="sm">Save</Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <Divider />
                            </div>
                        </div>

                        <NativeSelect size="sm" aria-label="Page tabs" defaultValue="profile" options={settingsSectionOptions} className="w-full lg:hidden" />

                        <SectionHeader size="sm" title="Profile" description="Update your photo and personal details here." className="lg:hidden" />

                        <div className="flex flex-col gap-5">
                            <div className={styles.row}>
                                <FieldLabel isRequired title="Username" className="max-lg:hidden" />

                                <InputGroup
                                    isRequired
                                    label="Username"
                                    className="lg:**:data-label:hidden"
                                    leadingAddon={<InputGroup.Prefix>proper.example/</InputGroup.Prefix>}
                                >
                                    <InputBase name="username" defaultValue={person.username.replace("@", "")} />
                                </InputGroup>
                            </div>

                            <Divider />

                            <div className={styles.row}>
                                <FieldLabel isRequired title="Website" className="max-lg:hidden" />

                                <InputGroup
                                    isRequired
                                    label="Website"
                                    className="lg:**:data-label:hidden"
                                    leadingAddon={<InputGroup.Prefix>https://</InputGroup.Prefix>}
                                >
                                    <InputBase name="website" defaultValue="www.proper.example" />
                                </InputGroup>
                            </div>

                            <Divider />

                            <div className={styles.row}>
                                <FieldLabel isRequired title="Your photo" description="This will be displayed on your profile." />

                                <div className="flex justify-between">
                                    <Avatar size="xl" src={person.src} alt="" className="shrink-0" />

                                    <div className="flex gap-4">
                                        <Button color="link-gray" size="md">
                                            Delete
                                        </Button>
                                        <Button color="link-color" size="md">
                                            Update
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            <Divider />

                            <div className={styles.row}>
                                <FieldLabel isRequired title="Your bio" description="Write a short introduction." />

                                <TextEditor size="sm" aria-label="Your bio" defaultValue={bio}>
                                    <TextEditor.Toolbar>
                                        <TextEditor.Group aria-label="Formatting">
                                            <TextEditor.Bold />
                                            <TextEditor.Italic />
                                            <TextEditor.Underline />
                                            <TextEditor.Separator />
                                            <TextEditor.AlignLeft />
                                            <TextEditor.AlignCenter />
                                            <TextEditor.BulletList />
                                        </TextEditor.Group>
                                    </TextEditor.Toolbar>
                                    <TextEditor.Content className="h-32" />
                                </TextEditor>
                            </div>

                            <Divider />

                            <div className={styles.row}>
                                <FieldLabel title="Job title" className="max-lg:hidden" />

                                <div className="flex flex-col gap-4">
                                    <Input label="Job title" name="role" className="lg:**:data-label:hidden" defaultValue="Product Designer" />
                                    <Checkbox defaultSelected label="Show my job title in my profile" />
                                </div>
                            </div>

                            <Divider />

                            <div className={styles.row}>
                                <FieldLabel
                                    title="Alternative contact email"
                                    description="Enter an alternative email if you'd like to be contacted via a different email."
                                />

                                <Input
                                    name="alternativeEmail"
                                    type="email"
                                    icon={Mail01}
                                    aria-label="Alternative contact email"
                                    placeholder="you@example.com"
                                />
                            </div>

                            <FormFooter className="lg:hidden" />
                        </div>
                    </Form>
                </div>
            </div>
        </main>
    </div>
);
