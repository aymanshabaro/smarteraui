"use client";

import { Copy01, Mail01, Plus, UsersPlus } from "@properui/icons";
import { SectionHeader } from "@/components/application/section-headers/section-headers";
import { Tabs } from "@/components/application/tabs/tabs";
import { Button } from "@/components/base/buttons/button";
import { ButtonUtility } from "@/components/base/buttons/button-utility";
import { DropdownIconSimple } from "@/components/base/dropdown/dropdown-icon-simple";
import { Input } from "@/components/base/input/input";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";
import { IMAGES } from "@/utils/demo-assets";
import { AppHeader } from "./shell.a";

const subNavItems = [
    { label: "Overview", href: "/dashboard/overview" },
    { label: "Notifications", href: "/dashboard/notifications" },
    { label: "Analytics", href: "/dashboard/analytics" },
    { label: "Saved reports", href: "/dashboard/saved-reports" },
    { label: "Messages", href: "/dashboard/messages" },
    { label: "User reports", href: "/dashboard/user-reports" },
];

const sectionTabs = [
    { id: "brief", label: "Project brief" },
    { id: "goals", label: "Goals" },
    { id: "timeline", label: "Timeline" },
    { id: "about", label: "About the client" },
    { id: "notes", label: "Notes" },
];

const cover = IMAGES.landscape[3]!;

/** Informational page 14 — project details with a cover image, a vertical section nav and a sharing sidebar. */
export const Informational14 = () => (
    <div className="bg-primary flex flex-col">
        <AppHeader activeUrl="/dashboard/messages" subItems={subNavItems} actions="upgrade" />

        <main className="flex w-full flex-1 flex-col gap-8 pb-16 lg:pb-24">
            <div className="flex flex-col">
                <div className="px-1 pt-1">
                    <img src={cover.src} alt="" className="h-40 w-full rounded-xl object-cover lg:h-60" />
                </div>

                <div className="max-w-container relative mx-auto flex w-full flex-col gap-y-6 px-4 pt-5 lg:px-8 lg:pt-6">
                    <div className="flex w-full flex-col items-start justify-between gap-y-4 lg:flex-row">
                        <h1 className="text-primary text-xl font-semibold">Marketing site redesign</h1>

                        <div className="flex gap-3">
                            <Button color="secondary" size="md">
                                Messages
                            </Button>
                            <Button color="primary" size="md">
                                Edit
                            </Button>
                        </div>
                    </div>

                    <hr className="border-secondary w-full max-lg:hidden" />
                </div>
            </div>

            <div className="max-w-container mx-auto flex w-full flex-col gap-y-8 overflow-hidden px-4 lg:flex-row lg:gap-16 lg:px-8">
                <div className="hidden max-w-33.25 min-w-33.25 lg:block">
                    <Tabs orientation="vertical" defaultSelectedKey="brief">
                        <Tabs.List type="button-gray" orientation="vertical" items={sectionTabs}>
                            {(tab) => <Tabs.Item {...tab} />}
                        </Tabs.List>
                        {sectionTabs.map((tab) => (
                            <Tabs.Panel key={tab.id} id={tab.id} />
                        ))}
                    </Tabs>
                </div>

                <div className="flex flex-1 flex-col gap-6 lg:gap-8">
                    <SectionHeader
                        size="sm"
                        divider={false}
                        title="Project overview"
                        description="An overview of the project, goals and outcomes."
                        actions={<DropdownIconSimple />}
                    >
                        <div className="flex w-full flex-col lg:hidden">
                            <Tabs defaultSelectedKey="brief">
                                <Tabs.List fullWidth type="underline" items={sectionTabs}>
                                    {(tab) => <Tabs.Item {...tab} />}
                                </Tabs.List>
                                {sectionTabs.map((tab) => (
                                    <Tabs.Panel key={`mobile-${tab.id}`} id={tab.id} />
                                ))}
                            </Tabs>
                        </div>
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
                        <Button color="secondary" size="md" iconLeading={Plus}>
                            Add section
                        </Button>
                        <div className="bg-border-secondary h-px flex-1" />
                    </div>
                </div>

                <div className="flex flex-col gap-y-6 lg:w-90 lg:gap-y-5">
                    <div className="bg-secondary flex flex-col gap-5 rounded-xl px-4 py-5 lg:px-5">
                        <div className="flex flex-col gap-1">
                            <h2 className="text-primary text-md font-semibold">Share this project</h2>
                            <p className="text-tertiary text-sm">Your new project has been created. Invite colleagues to collaborate on this project.</p>
                        </div>

                        <div className="flex items-end gap-1">
                            <Input label="Share link" defaultValue="proper.example/projects/marketing-site-redesign" className="w-full" />
                            <ButtonUtility size="sm" color="tertiary" tooltip="Copy link" icon={Copy01} />
                        </div>
                    </div>

                    <div className="bg-secondary flex flex-col gap-6 overflow-hidden rounded-xl px-4 py-5 lg:px-5">
                        <div className="flex flex-col gap-y-5">
                            <FeaturedIcon size="md" theme="modern" color="gray" icon={UsersPlus} />

                            <div className="flex flex-col gap-1">
                                <h2 className="text-primary text-md font-semibold">Invite collaborators</h2>
                                <p className="text-tertiary text-sm">Your new project has been created. Invite colleagues to collaborate on this project.</p>
                            </div>

                            <div className="flex flex-col gap-y-3">
                                <Input label="Email address" placeholder="you@yourcompany.io" icon={Mail01} />
                                <Input aria-label="Additional email address" placeholder="you@yourcompany.io" icon={Mail01} />

                                <div className="flex">
                                    <Button color="link-color" size="md" iconLeading={Plus}>
                                        Add another
                                    </Button>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-x-3">
                            <Button color="secondary" size="md">
                                Cancel
                            </Button>
                            <Button color="primary" size="md">
                                Confirm
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>
);
