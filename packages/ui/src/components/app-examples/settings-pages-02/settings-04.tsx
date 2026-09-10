"use client";

import { FileUploadDropZone } from "@/components/application/file-upload/file-upload-base";
import { SectionHeader } from "@/components/application/section-headers/section-headers";
import { Tabs } from "@/components/application/tabs/tabs";
import { Button } from "@/components/base/buttons/button";
import { Checkbox } from "@/components/base/checkbox/checkbox";
import { Form } from "@/components/base/form/form";
import { InputBase } from "@/components/base/input/input";
import { InputGroup } from "@/components/base/input/input-group";
import { TextArea } from "@/components/base/textarea/textarea";
import { LOGOS } from "@/utils/demo-assets";
import { Divider, FieldLabel, FormFooter, PageContainer, SettingsHeaderNav, settingsSections, styles } from "./settings-shell";

const company = LOGOS[0];

const tagline = "Proper UI is the ultimate React component library and design system. Kickstart any project and level up as a developer.";
/** 41 characters are left of the budget once `tagline` is in the field. */
const taglineBudget = tagline.length + 41;

const socialProfiles = [
    { name: "x", prefix: "x.com/", defaultValue: "properui" },
    { name: "facebook", prefix: "facebook.com/", defaultValue: "properui" },
    { name: "linkedin", prefix: "linkedin.com/company/", defaultValue: "properui" },
];

/** Company profile settings behind a vertical line tab rail. */
export const Settings04 = () => (
    <div className="bg-primary">
        <SettingsHeaderNav />

        <main className="bg-primary pt-8 pb-16 lg:pt-12 lg:pb-24">
            <div className="flex flex-col gap-8">
                <PageContainer className="flex flex-col gap-5">
                    <div className="lg:border-secondary flex flex-col gap-4 lg:flex-row lg:border-b lg:pb-4">
                        <div className="flex flex-1 flex-col gap-0.5">
                            <h1 className={styles.pageTitle}>Settings</h1>
                        </div>
                    </div>
                </PageContainer>

                <div className="max-w-container mx-auto flex w-full gap-24 px-4 lg:px-8">
                    <Tabs orientation="vertical" defaultSelectedKey="profile" className="hidden w-auto lg:flex">
                        <Tabs.List type="line" items={settingsSections} aria-label="Settings sections">
                            {(item) => <Tabs.Item {...item} badge={item.id === "notifications" ? 2 : undefined} />}
                        </Tabs.List>
                        {settingsSections.map((item) => (
                            <Tabs.Panel key={item.id} id={item.id} />
                        ))}
                    </Tabs>

                    <Form className="flex min-w-0 flex-1 flex-col gap-6">
                        <SectionHeader
                            size="sm"
                            title="Company profile"
                            description="Update your company photo and details here."
                            actions={
                                <div className="flex gap-3">
                                    <Button size="sm" color="secondary">
                                        Cancel
                                    </Button>
                                    <Button size="sm" type="submit">
                                        Save
                                    </Button>
                                </div>
                            }
                        />

                        <div className="flex flex-col gap-5">
                            <div className={styles.row}>
                                <FieldLabel isRequired title="Public profile" description="This will be displayed on your profile." />

                                <div className="flex flex-col gap-4">
                                    <InputBase aria-label="Name" name="name" defaultValue={company.name} />

                                    <InputGroup
                                        aria-label="Profile URL"
                                        leadingAddon={
                                            <InputGroup.Prefix>
                                                <span className="max-lg:hidden">proper.example/profile/</span>
                                                <span className="lg:hidden">proper.example/.../</span>
                                            </InputGroup.Prefix>
                                        }
                                    >
                                        <InputBase name="profileUrl" defaultValue={company.name.toLowerCase()} tooltip="Copy profile URL" />
                                    </InputGroup>
                                </div>
                            </div>

                            <Divider />

                            <div className={styles.row}>
                                <FieldLabel isRequired title="Tagline" description="A quick snapshot of your company." />

                                <TextArea
                                    aria-label="Tagline"
                                    name="tagline"
                                    defaultValue={tagline}
                                    maxLength={taglineBudget}
                                    textAreaClassName="min-h-33.5 lg:min-h-25.5"
                                    hint={`${taglineBudget - tagline.length} characters left`}
                                />
                            </div>

                            <Divider />

                            <div className={styles.row}>
                                <FieldLabel
                                    isRequired
                                    title="Company logo"
                                    description="Update your company logo and then choose where you want it to display."
                                />

                                <div className="flex flex-col gap-5 lg:flex-row lg:gap-8">
                                    <div className="h-8 w-full max-w-35.5 lg:h-auto lg:pt-4">
                                        <img src={company.src} alt={company.name} className="w-full" />
                                    </div>

                                    <FileUploadDropZone className="w-full" accept="image/svg+xml,image/png,image/jpeg,image/gif" />
                                </div>
                            </div>

                            <Divider />

                            <div className={styles.row}>
                                <FieldLabel title="Branding" description="Add your logo to reports and emails.">
                                    <div className="mt-3 flex gap-2">
                                        <Button color="link-color" size="md">
                                            View examples
                                        </Button>
                                    </div>
                                </FieldLabel>

                                <div className="flex flex-col gap-4">
                                    <Checkbox defaultSelected label="Reports" hint="Include my logo in summary reports." />
                                    <Checkbox defaultSelected label="Emails" hint="Include my logo in customer emails." />
                                </div>
                            </div>

                            <Divider />

                            <div className={styles.row}>
                                <FieldLabel title="Social profiles" />

                                <div className="flex flex-col gap-4">
                                    {socialProfiles.map((profile) => (
                                        <InputGroup
                                            key={profile.name}
                                            aria-label={profile.prefix}
                                            leadingAddon={<InputGroup.Prefix>{profile.prefix}</InputGroup.Prefix>}
                                        >
                                            <InputBase name={profile.name} defaultValue={profile.defaultValue} />
                                        </InputGroup>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <FormFooter />
                    </Form>
                </div>
            </div>
        </main>
    </div>
);
