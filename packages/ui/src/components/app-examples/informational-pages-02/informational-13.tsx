"use client";

import { ArrowLeft, Copy01, Edit05, Share04, UsersPlus } from "@smarteraui/icons";
import { ActivityFeed } from "@/components/application/activity-feed/activity-feed";
import { FileUpload } from "@/components/application/file-upload/file-upload-base";
import { SectionHeader } from "@/components/application/section-headers/section-headers";
import { Tabs } from "@/components/application/tabs/tabs";
import { Badge } from "@/components/base/badges/badges";
import { Button } from "@/components/base/buttons/button";
import { DropdownIconSimple } from "@/components/base/dropdown/dropdown-icon-simple";
import { InputBase } from "@/components/base/input/input";
import { InputGroup } from "@/components/base/input/input-group";
import { NativeSelect } from "@/components/base/select/select-native";
import { IMAGES, avatar } from "@/utils/demo-assets";
import { AppHeader, productNavItems } from "./shell.a";

const navItems = [...productNavItems.slice(0, 5), { label: "Messages", href: "/messages" }];

const pageTabs = [
    { id: "overview", label: "Overview" },
    { id: "project", label: "Project" },
    { id: "research", label: "Research" },
    { id: "team", label: "Team" },
    { id: "messages", label: "Messages", badge: 2 },
    { id: "billing", label: "Billing" },
    { id: "activity", label: "Activity" },
];

const overviewTabs = [
    { id: "brief", label: "Project brief" },
    { id: "goals", label: "Goals" },
    { id: "timeline", label: "Timeline" },
    { id: "about", label: "About the client" },
    { id: "notes", label: "Notes" },
];

const contentImages = [IMAGES.landscape[0]!, IMAGES.landscape[1]!, IMAGES.landscape[2]!];

/** Informational page 13 — a project overview with a vertical page nav, rich-text brief and a recent activity rail. */
export const Informational13 = () => (
    <div className="bg-primary flex flex-col">
        <AppHeader activeUrl="/projects" items={navItems} />

        <main className="max-w-container mx-auto flex w-full flex-1 flex-col gap-8 pt-8 pb-12 lg:pt-12 lg:pb-24">
            <div className="flex flex-col gap-8 px-4 lg:gap-5 lg:px-8">
                <div className="border-secondary relative flex flex-col gap-5 lg:border-b lg:pb-4">
                    <div className="flex items-start justify-between">
                        <Button color="link-color" size="md" href="/projects" iconLeading={ArrowLeft}>
                            Back to all projects
                        </Button>

                        <div className="hidden w-100 lg:block">
                            <InputGroup
                                label="Project URL"
                                size="sm"
                                trailingAddon={
                                    <Button color="secondary" size="md" iconLeading={Copy01}>
                                        Copy
                                    </Button>
                                }
                            >
                                <InputBase defaultValue="smartera.com/projects/marketing-site-redesign" />
                            </InputGroup>
                        </div>
                    </div>

                    <div className="flex flex-col justify-between gap-4 lg:flex-row">
                        <h1 className="text-primary text-xl font-semibold">Marketing site redesign</h1>

                        <div className="flex items-start gap-3">
                            <Button color="secondary" size="md" className="hidden lg:inline-flex" iconLeading={UsersPlus}>
                                Add team
                            </Button>
                            <Button color="secondary" size="md" className="inline-flex lg:hidden" iconLeading={Copy01}>
                                Copy
                            </Button>
                            <Button color="secondary" size="md" iconLeading={Share04}>
                                Share
                            </Button>
                            <Button color="primary" size="md" iconLeading={Edit05}>
                                Edit
                            </Button>
                        </div>
                    </div>
                </div>

                <NativeSelect
                    aria-label="Tabs"
                    className="block lg:hidden"
                    defaultValue="overview"
                    options={pageTabs.map((tab) => ({ label: tab.label, value: tab.id }))}
                />
            </div>

            <div className="flex gap-16 px-4 lg:px-8">
                <div className="hidden max-w-23.5 min-w-23.5 lg:block">
                    <Tabs orientation="vertical" defaultSelectedKey="overview">
                        <Tabs.List type="button-gray" orientation="vertical" items={pageTabs}>
                            {(tab) => <Tabs.Item {...tab} />}
                        </Tabs.List>
                        {pageTabs.map((tab) => (
                            <Tabs.Panel key={tab.id} id={tab.id} />
                        ))}
                    </Tabs>
                </div>

                <div className="flex flex-1 flex-col gap-6 overflow-hidden lg:gap-8">
                    <SectionHeader
                        size="sm"
                        divider={false}
                        title="Project overview"
                        description="An overview of the project, goals and outcomes."
                        actions={<DropdownIconSimple />}
                    >
                        <Tabs defaultSelectedKey="brief">
                            <Tabs.List fullWidth type="underline" items={overviewTabs}>
                                {(tab) => <Tabs.Item {...tab} />}
                            </Tabs.List>
                            {overviewTabs.map((tab) => (
                                <Tabs.Panel key={tab.id} id={tab.id} />
                            ))}
                        </Tabs>
                    </SectionHeader>

                    <div className="flex max-w-180 flex-col gap-8">
                        <p className="bg-secondary text-secondary ring-secondary text-md rounded-lg p-4 font-medium ring-1 ring-inset">
                            Mi tincidunt elit, id quisque ligula ac diam, amet. Vel etiam suspendisse morbi eleifend faucibus eget vestibulum felis. Dictum quis
                            montes, sit sit. Tellus aliquam enim urna, etiam.
                        </p>

                        <div className="flex flex-col gap-3">
                            <h3 className="text-primary text-md font-semibold">About the company</h3>
                            <div className="prose text-md max-w-180">
                                <p>
                                    Dolor enim eu tortor urna sed duis nulla. Aliquam vestibulum, nulla odio nisl vitae. In aliquet pellentesque aenean hac
                                    vestibulum turpis mi bibendum diam. Tempor integer aliquam in vitae malesuada fringilla.
                                </p>
                                <ul>
                                    <li>Ipsum sit mattis nulla quam nulla. Gravida id gravida ac enim mauris id. Diam elit, orci, tincidunt aenean tempus.</li>
                                    <li>Non pellentesque congue eget consectetur turpis.</li>
                                    <li>Sapien, dictum molestie sem tempor. Diam elit, orci, tincidunt aenean tempus.</li>
                                </ul>
                            </div>
                        </div>

                        <div className="grid w-full grid-cols-1 gap-4 lg:grid-cols-2">
                            {contentImages.map((image) => (
                                <img key={image.src} src={image.src} alt="" className="h-51.5 w-full rounded-lg object-cover lg:h-44" />
                            ))}

                            <FileUpload.Root className="hidden lg:block">
                                <FileUpload.DropZone className="h-full justify-center" hint="SVG, PNG, JPG or GIF (max. 800x400px)" />
                            </FileUpload.Root>
                        </div>

                        <div className="flex flex-col gap-3">
                            <h3 className="text-primary text-md font-semibold">Target audience</h3>
                            <div className="prose text-md max-w-180">
                                <p>Ipsum sit mattis nulla quam nulla. Gravida id gravida ac enim mauris id. Non pellentesque congue eget consectetur turpis.</p>
                                <p>
                                    Dolor enim eu tortor urna sed duis nulla. Aliquam vestibulum, nulla odio nisl vitae. In aliquet pellentesque aenean hac
                                    vestibulum turpis mi bibendum diam.
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col gap-3">
                            <h3 className="text-primary text-md font-semibold">What does success look like?</h3>
                            <div className="prose text-md max-w-180">
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque tellus vel pretium posuere. Id maecenas a tristique in
                                    fusce hendrerit.
                                </p>
                                <p>Pharetra nam gravida commodo accumsan sapien aliquet bibendum purus nunc. Quam cursus at eu, aliquam integer.</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex w-full shrink-0 items-center gap-x-2">
                        <div className="bg-border-secondary h-px flex-1" />
                        <Button color="secondary" size="md" iconLeading={Edit05}>
                            Add section
                        </Button>
                        <div className="bg-border-secondary h-px flex-1" />
                    </div>
                </div>

                <div className="ring-secondary hidden w-106 flex-col gap-6 rounded-xl p-6 ring-1 ring-inset lg:flex">
                    <SectionHeader size="sm" title="Recent activity" actions={<DropdownIconSimple />} />

                    <ActivityFeed type="divided" aria-label="Recent activity">
                        <ActivityFeed.Item
                            isUnread
                            name={avatar(1).name}
                            href="/users/phoenix"
                            avatarSrc={avatar(1).src}
                            status="online"
                            time="Just now"
                            dateTime="2026-01-22T14:24"
                            action={<>Added a file to Marketing site redesign</>}
                        >
                            <ActivityFeed.File type="pdf" name="Tech requirements.pdf" size="720 KB" />
                        </ActivityFeed.Item>

                        <ActivityFeed.Item
                            isUnread
                            name={avatar(2).name}
                            href="/users/lana"
                            avatarSrc={avatar(2).src}
                            status="online"
                            time="2 mins ago"
                            dateTime="2026-01-22T14:22"
                            action={<>Invited Alisa Hester to the team</>}
                        />

                        <ActivityFeed.Item
                            isUnread
                            name={avatar(3).name}
                            href="/users/demi"
                            avatarSrc={avatar(3).src}
                            status="online"
                            time="2 mins ago"
                            dateTime="2026-01-22T14:22"
                            action={<>Invited Alisa Hester to the team</>}
                        />

                        <ActivityFeed.Item
                            isUnread
                            name={avatar(4).name}
                            href="/users/candice"
                            avatarSrc={avatar(4).src}
                            status="online"
                            time="3 hours ago"
                            dateTime="2026-01-22T11:24"
                            action={
                                <>
                                    Commented in <ActivityFeed.Link href="/projects/current">Marketing site redesign</ActivityFeed.Link>
                                </>
                            }
                        />

                        <ActivityFeed.Item
                            name={avatar(5).name}
                            href="/users/natali"
                            avatarSrc={avatar(5).src}
                            status="online"
                            time="6 hours ago"
                            dateTime="2026-01-22T08:24"
                            action={<>Added 3 labels to the project Marketing site redesign</>}
                        >
                            <ActivityFeed.Labels>
                                <Badge size="sm" color="purple">
                                    Design
                                </Badge>
                                <Badge size="sm" color="blue">
                                    Product
                                </Badge>
                                <Badge size="sm" color="indigo">
                                    Marketing
                                </Badge>
                            </ActivityFeed.Labels>
                        </ActivityFeed.Item>

                        <ActivityFeed.Item
                            name={avatar(7).name}
                            href="/users/orlando"
                            avatarSrc={avatar(7).src}
                            status="online"
                            time="11 hours ago"
                            dateTime="2026-01-22T03:24"
                            action={<>Created 7 tasks in Marketing site redesign</>}
                        />
                    </ActivityFeed>
                </div>
            </div>
        </main>
    </div>
);
