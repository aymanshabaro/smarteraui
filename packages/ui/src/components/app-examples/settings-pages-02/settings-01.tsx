"use client";

import { ArrowLeft, HomeLine, Mail01 } from "@properui/icons";
import { countriesOptions } from "../../../utils/countries";
import { IMAGES, avatar } from "../../../utils/demo-assets";
import { timezonesOptionsWithLongName } from "../../../utils/timezones";
import { Breadcrumbs } from "../../application/breadcrumbs/breadcrumbs";
import { FileUploadDropZone } from "../../application/file-upload/file-upload-base";
import { Avatar } from "../../base/avatar/avatar";
import { AvatarProfilePhoto } from "../../base/avatar/avatar-profile-photo";
import { Button } from "../../base/buttons/button";
import { Form } from "../../base/form/form";
import { Input } from "../../base/input/input";
import { Select } from "../../base/select/select";
import { TextEditor } from "../../base/text-editor/text-editor";
import { Divider, FieldLabel, FormFooter, PageContainer, SettingsHeaderNav, styles } from "./settings-shell";

const person = avatar(0);
const cover = IMAGES.landscape[5];

/** Plain-text length of `bio` is 780, so the editor hint reads "964 characters left". */
const bio =
    "<p>I'm a Product Designer based in Melbourne, Australia. I specialise in UX/UI design, brand strategy, and Webflow development. I have spent the last eight years shaping design systems for product teams that ship every week, and I care most about the unglamorous parts — naming, spacing, states, and the documentation that keeps a team honest once the launch is over. Before that I ran a small studio, which taught me how to scope work, say no, and hand a project over cleanly. These days I split my time between design system consulting, mentoring, and writing about the craft of interface design for people who would rather read the source than the marketing page. If any of that sounds useful to you, my inbox is open and I answer every message that is not a pitch.</p>";
const characterBudget = 1744;

/** Profile settings with a cover photo, an overlapping profile avatar and a single long form. */
export const Settings01 = () => (
    <div className="bg-primary">
        <SettingsHeaderNav activeUrl="/settings/profile" subNav="buttons" />

        <main className="bg-primary pb-16 lg:pb-24">
            <div className="flex flex-col gap-8 lg:gap-12">
                <div className="relative flex flex-col">
                    <div className="px-1 pt-1">
                        <img src={cover.src} alt="" className="h-40 w-full rounded-xl object-cover lg:h-60" />
                    </div>

                    <div className="max-w-container mx-auto -mt-12 w-full px-4 lg:-mt-10 lg:px-8">
                        <div className="flex flex-col gap-4 lg:flex-row lg:gap-5">
                            <div className="flex justify-between">
                                <AvatarProfilePhoto verified size="md" src={person.src} alt={person.name} className="lg:hidden" />
                                <AvatarProfilePhoto verified size="lg" src={person.src} alt={person.name} className="max-lg:hidden" />

                                <div className="flex self-end lg:hidden">
                                    <Button color="link-gray" size="md" href="#" iconLeading={ArrowLeft} className="translate-y-2">
                                        Back
                                    </Button>
                                </div>
                            </div>

                            <div className="flex w-full flex-col gap-4 lg:pt-16">
                                <div className="max-lg:hidden">
                                    <Breadcrumbs type="button" aria-label="Breadcrumbs">
                                        <Breadcrumbs.Item href="#" icon={HomeLine} aria-label="Home" />
                                        <Breadcrumbs.Item href="#">Settings</Breadcrumbs.Item>
                                        <Breadcrumbs.Item href="#">Profile</Breadcrumbs.Item>
                                    </Breadcrumbs>
                                </div>

                                <div className="flex flex-1 flex-col flex-wrap gap-4 lg:flex-row">
                                    <div className="flex min-w-60 flex-1 flex-col gap-0.5">
                                        <h1 className={styles.pageTitle}>{person.name}</h1>
                                        <p className="text-md text-tertiary">{person.username}</p>
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
                    </div>
                </div>

                <PageContainer>
                    <Form className="flex w-full flex-col gap-6 lg:mx-auto lg:max-w-160">
                        <div className="flex flex-col gap-5">
                            <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-6">
                                <Input isRequired label="First name" name="firstName" defaultValue={person.name.split(" ")[0]} />
                                <Input isRequired label="Last name" name="lastName" defaultValue={person.name.split(" ")[1]} />
                            </div>

                            <Divider />

                            <Input isRequired label="Email address" name="email" type="email" icon={Mail01} defaultValue={person.email} />

                            <Divider />

                            <div className="flex flex-col gap-5 lg:flex-row">
                                <Avatar size="xl" src={person.src} alt="" className="shrink-0" />
                                <FileUploadDropZone className="w-full" accept="image/svg+xml,image/png,image/jpeg,image/gif" />
                            </div>

                            <Divider />

                            <Input isRequired label="Role" name="role" defaultValue="Product Designer" />

                            <Divider />

                            <Select
                                isRequired
                                label="Country"
                                name="country"
                                className="max-w-lg"
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

                            <Divider />

                            <Select
                                isRequired
                                label="Timezone"
                                name="timezone"
                                className="max-w-lg"
                                items={timezonesOptionsWithLongName}
                                defaultSelectedKey="UTC−08:00"
                                placeholder="Select a timezone"
                            >
                                {(item) => (
                                    <Select.Item id={item.id} icon={item.icon} supportingText={item.supportingText}>
                                        {item.label}
                                    </Select.Item>
                                )}
                            </Select>

                            <Divider />

                            <div className="flex flex-col gap-4">
                                <FieldLabel isRequired title="Your bio" description="Write a short introduction." />

                                <TextEditor aria-label="Your bio" defaultValue={bio} maxLength={characterBudget}>
                                    <TextEditor.Toolbar>
                                        <TextEditor.FontFamily />
                                        <TextEditor.FontSize />
                                    </TextEditor.Toolbar>
                                    <TextEditor.Toolbar>
                                        <TextEditor.Group aria-label="Formatting">
                                            <TextEditor.Bold />
                                            <TextEditor.Italic />
                                            <TextEditor.Underline />
                                            <TextEditor.Separator />
                                            <TextEditor.TextColor />
                                            <TextEditor.Separator />
                                            <TextEditor.AlignLeft />
                                            <TextEditor.AlignCenter />
                                            <TextEditor.BulletList />
                                            <TextEditor.Separator />
                                            <TextEditor.Link />
                                            <TextEditor.Image />
                                            <TextEditor.Separator />
                                            <TextEditor.Generate />
                                        </TextEditor.Group>
                                    </TextEditor.Toolbar>
                                    <TextEditor.Content className="h-50" />
                                    <TextEditor.Hint />
                                </TextEditor>
                            </div>

                            <Divider />

                            <div className="flex flex-col gap-5">
                                <FieldLabel title="Portfolio projects" description="Share a few snippets of your work." />

                                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
                                    <img src={IMAGES.landscape[0].src} alt="" className="h-64 w-full object-cover lg:col-span-3 lg:h-120" />
                                    <img src={IMAGES.landscape[1].src} alt="" className="h-64 w-full object-cover lg:h-37.5" />
                                    <img src={IMAGES.landscape[2].src} alt="" className="h-64 w-full object-cover lg:h-37.5" />
                                    <img src={IMAGES.landscape[3].src} alt="" className="h-64 w-full object-cover lg:h-37.5" />
                                </div>

                                <FileUploadDropZone accept="image/svg+xml,image/png,image/jpeg,image/gif" />
                            </div>
                        </div>

                        <FormFooter />
                    </Form>
                </PageContainer>
            </div>
        </main>
    </div>
);
