"use client";

import type { FC } from "react";
import { ArrowLeft, BarChartSquare02, CheckDone01, Edit05, HomeLine, PieChart03, Rows01, Share04, Users01, UsersPlus } from "@properui/icons";
import { ActivityFeed } from "@/components/application/activity-feed/activity-feed";
import type { NavItemType } from "@/components/application/app-navigation/config";
import { SidebarNavigationSlim } from "@/components/application/app-navigation/sidebar-navigation/sidebar-slim";
import { Breadcrumbs } from "@/components/application/breadcrumbs/breadcrumbs";
import { SectionHeader } from "@/components/application/section-headers/section-headers";
import { Tabs } from "@/components/application/tabs/tabs";
import { Badge } from "@/components/base/badges/badges";
import { Button } from "@/components/base/buttons/button";
import { DropdownIconSimple } from "@/components/base/dropdown/dropdown-icon-simple";
import { NativeSelect } from "@/components/base/select/select-native";
import { IMAGES, avatar } from "@/utils/demo-assets";

const navItems: (NavItemType & { icon: FC<{ className?: string }> })[] = [
    { label: "Home", href: "/", icon: HomeLine },
    { label: "Dashboard", href: "/dashboard", icon: BarChartSquare02 },
    {
        label: "Projects",
        href: "/projects",
        icon: Rows01,
        items: [
            { label: "Current", href: "/projects/current" },
            { label: "Upcoming", href: "/projects/upcoming" },
            { label: "Archived", href: "/projects/archived" },
        ],
    },
    { label: "Tasks", href: "/tasks", icon: CheckDone01, badge: 8 },
    { label: "Reporting", href: "/reporting", icon: PieChart03 },
    { label: "Users", href: "/users", icon: Users01 },
];

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

/** Informational page 13 — project overview with a tabbed brief and a recent-activity panel. */
export const Informational13 = () => (
    <div className="bg-primary flex flex-col lg:flex-row">
        <SidebarNavigationSlim activeUrl="/projects/current" items={navItems} />

        <main className="flex min-w-0 flex-1 flex-col gap-8 pt-8 pb-12">
            <div className="flex flex-col gap-8 px-4 lg:gap-5 lg:px-8">
                <div className="relative flex flex-col gap-4">
                    <div className="max-lg:hidden">
                        <Breadcrumbs type="text" aria-label="Breadcrumbs">
                            <Breadcrumbs.Item href="/" icon={HomeLine} aria-label="Home" />
                            <Breadcrumbs.Item href="/projects">Projects</Breadcrumbs.Item>
                            <Breadcrumbs.Item href="/projects/current">Current</Breadcrumbs.Item>
                            <Breadcrumbs.Item href="/projects/current/marketing-site-redesign">Marketing site redesign</Breadcrumbs.Item>
                        </Breadcrumbs>
                    </div>

                    <div className="flex lg:hidden">
                        <Button color="link-gray" size="sm" href="/projects" iconLeading={ArrowLeft}>
                            Back to all projects
                        </Button>
                    </div>

                    <div className="flex flex-col gap-4 lg:flex-row">
                        <p className="text-primary flex-1 text-xl font-semibold">Marketing site redesign</p>

                        <div className="flex items-start gap-3">
                            <Button color="secondary" size="md" className="hidden lg:inline-flex" iconLeading={UsersPlus}>
                                Add team
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
                    aria-label="Page tabs"
                    className="block lg:hidden"
                    defaultValue="overview"
                    options={pageTabs.map((tab) => ({ label: tab.label, value: tab.id }))}
                />

                <div className="hidden w-full flex-col lg:flex">
                    <Tabs defaultSelectedKey="overview">
                        <Tabs.List fullWidth type="button-border" items={pageTabs}>
                            {(tab) => <Tabs.Item {...tab} />}
                        </Tabs.List>
                        {pageTabs.map((tab) => (
                            <Tabs.Panel key={tab.id} id={tab.id} />
                        ))}
                    </Tabs>
                </div>
            </div>

            <div className="flex gap-16 px-4 lg:px-8">
                <div className="flex flex-1 flex-col gap-6 overflow-hidden lg:gap-8">
                    <SectionHeader
                        size="sm"
                        divider={false}
                        title="Project overview"
                        description="An overview of the project, goals and outcomes."
                        actions={<DropdownIconSimple />}
                    >
                        <div className="max-lg:hidden">
                            <Tabs defaultSelectedKey="brief">
                                <Tabs.List fullWidth type="button-border" items={overviewTabs}>
                                    {(tab) => <Tabs.Item {...tab} />}
                                </Tabs.List>
                                {overviewTabs.map((tab) => (
                                    <Tabs.Panel key={tab.id} id={tab.id} />
                                ))}
                            </Tabs>
                        </div>

                        <div className="lg:hidden">
                            <Tabs defaultSelectedKey="brief">
                                <Tabs.List fullWidth type="underline" items={overviewTabs}>
                                    {(tab) => <Tabs.Item {...tab} />}
                                </Tabs.List>
                                {overviewTabs.map((tab) => (
                                    <Tabs.Panel key={tab.id} id={tab.id} />
                                ))}
                            </Tabs>
                        </div>
                    </SectionHeader>

                    <div className="flex max-w-180 flex-col gap-8">
                        <p className="bg-secondary text-secondary text-md rounded-lg p-4 font-medium">
                            Mi tincidunt elit, id quisque ligula ac diam, amet. Vel etiam suspendisse morbi eleifend faucibus eget vestibulum felis. Dictum quis
                            montes, sit sit. Tellus aliquam enim urna.
                        </p>

                        <div className="flex flex-col gap-3">
                            <p className="text-primary text-md font-semibold">About the company</p>
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

                        <div className="grid w-full grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-5">
                            {contentImages.map((image) => (
                                <img key={image.src} src={image.src} alt="" className="h-51.5 w-full rounded-lg object-cover lg:h-36" />
                            ))}
                        </div>

                        <div className="flex flex-col gap-3">
                            <p className="text-primary text-md font-semibold">Target audience</p>
                            <div className="prose text-md max-w-180">
                                <p>Ipsum sit mattis nulla quam nulla. Gravida id gravida ac enim mauris id. Non pellentesque congue eget consectetur turpis.</p>
                                <p>
                                    Dolor enim eu tortor urna sed duis nulla. Aliquam vestibulum, nulla odio nisl vitae. In aliquet pellentesque aenean hac
                                    vestibulum turpis mi bibendum diam.
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col gap-3">
                            <p className="text-primary text-md font-semibold">What does success look like?</p>
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
                            Edit
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
                            dateTime="2027-01-22T14:24"
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
                            dateTime="2027-01-22T14:22"
                            action={<>Invited Alisa Hester to the team</>}
                        />

                        <ActivityFeed.Item
                            isUnread
                            name={avatar(3).name}
                            href="/users/demi"
                            avatarSrc={avatar(3).src}
                            status="online"
                            time="2 mins ago"
                            dateTime="2027-01-22T14:22"
                            action={<>Invited Alisa Hester to the team</>}
                        />

                        <ActivityFeed.Item
                            isUnread
                            name={avatar(4).name}
                            href="/users/candice"
                            avatarSrc={avatar(4).src}
                            status="online"
                            time="3 hours ago"
                            dateTime="2027-01-22T11:24"
                            action={
                                <>
                                    Commented in <ActivityFeed.Link href="/projects/current">Marketing site redesign</ActivityFeed.Link>
                                </>
                            }
                        />

                        <ActivityFeed.Item
                            name={avatar(4).name}
                            href="/users/candice"
                            avatarSrc={avatar(4).src}
                            status="online"
                            time="3 hours ago"
                            dateTime="2027-01-22T11:20"
                            action={<>Was added to Marketing site redesign</>}
                        />

                        <ActivityFeed.Item
                            name={avatar(5).name}
                            href="/users/natali"
                            avatarSrc={avatar(5).src}
                            status="online"
                            time="6 hours ago"
                            dateTime="2027-01-22T08:24"
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
                            name={avatar(5).name}
                            href="/users/natali"
                            avatarSrc={avatar(5).src}
                            status="online"
                            time="6 hours ago"
                            dateTime="2027-01-22T08:20"
                            action={<>Invited Lana Steiner to the team</>}
                        />

                        <ActivityFeed.Item
                            name={avatar(7).name}
                            href="/users/orlando"
                            avatarSrc={avatar(7).src}
                            status="online"
                            time="11 hours ago"
                            dateTime="2027-01-22T03:24"
                            action={<>Created 7 tasks in Marketing site redesign</>}
                        />
                    </ActivityFeed>
                </div>
            </div>
        </main>
    </div>
);
