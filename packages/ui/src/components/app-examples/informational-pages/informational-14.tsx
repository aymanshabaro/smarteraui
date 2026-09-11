"use client";

import type { FC } from "react";
import {
    ArrowRight,
    BarChartSquare02,
    CheckDone01,
    Copy01,
    DownloadCloud02,
    Edit04,
    Edit05,
    HomeLine,
    MessageSquare02,
    PieChart03,
    Plus,
    RefreshCcw02,
    Rows01,
    Stars02,
    Users01,
} from "@properui/icons";
import { IMAGES, avatar } from "../../../utils/demo-assets";
import type { NavItemType } from "../../application/app-navigation/config";
import { SidebarNavigationSlim } from "../../application/app-navigation/sidebar-navigation/sidebar-slim";
import { MessageComposer } from "../../application/messaging/message-composer";
import { Message, MessageList } from "../../application/messaging/messaging";
import { SectionHeader } from "../../application/section-headers/section-headers";
import { Tabs } from "../../application/tabs/tabs";
import { BadgeWithDot } from "../../base/badges/badges";
import { Button } from "../../base/buttons/button";
import { DropdownIconSimple } from "../../base/dropdown/dropdown-icon-simple";

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

const bubbleActions = [
    { label: "Generate with AI", icon: Stars02 },
    { label: "Edit message", icon: Edit04 },
    { label: "Reply", icon: RefreshCcw02 },
    { label: "Copy", icon: Copy01 },
];

const fileActions = [
    { label: "Generate with AI", icon: Stars02 },
    { label: "Download", icon: DownloadCloud02 },
    { label: "Reply", icon: RefreshCcw02 },
    { label: "Copy", icon: Copy01 },
];

const lana = avatar(2);
const demi = avatar(3);
const phoenix = avatar(1);

const assetImages = [IMAGES.landscape[0]!, IMAGES.landscape[1]!, IMAGES.landscape[2]!];

/** Informational page 14 — project details beside a docked project-messages panel. */
export const Informational14 = () => (
    <div className="bg-primary flex flex-col lg:flex-row">
        <SidebarNavigationSlim activeUrl="/projects/current" items={navItems} />

        <main className="flex flex-1 flex-col lg:flex-row">
            <div className="border-secondary flex flex-1 flex-col gap-8 border-e pt-8 pb-12">
                <div className="flex flex-col gap-5 px-4 lg:px-8">
                    <div className="flex flex-col gap-4 lg:flex-row lg:justify-between">
                        <p className="text-primary text-xl font-semibold">Marketing site redesign</p>

                        <div className="flex items-start gap-3">
                            <Button color="secondary" size="md" iconLeading={MessageSquare02}>
                                Messages
                            </Button>
                            <Button color="primary" size="md" iconLeading={Edit05}>
                                Edit
                            </Button>
                        </div>
                    </div>

                    <div className="scrollbar-hide -mx-4 -my-1 flex overflow-auto px-4 py-1 lg:-mx-8 lg:px-8">
                        <Tabs defaultSelectedKey="overview" className="w-full sm:w-full">
                            <Tabs.List type="underline" items={pageTabs}>
                                {(tab) => <Tabs.Item {...tab} />}
                            </Tabs.List>
                            {pageTabs.map((tab) => (
                                <Tabs.Panel key={tab.id} id={tab.id} />
                            ))}
                        </Tabs>
                    </div>
                </div>

                <div className="flex flex-col gap-6 px-4 lg:px-8">
                    <SectionHeader
                        size="sm"
                        title="Project overview"
                        description="An overview of the project, goals and outcomes."
                        actions={<DropdownIconSimple />}
                    />

                    <div className="flex max-w-180 flex-col gap-8">
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

                        <div className="grid w-full grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-5">
                            {assetImages.map((image) => (
                                <img key={image.src} src={image.src} alt="" className="h-51.5 w-full rounded-lg object-cover lg:h-44" />
                            ))}

                            <div className="border-secondary hidden items-center justify-center rounded-2xl border border-dashed lg:flex lg:h-44">
                                <Button color="secondary" size="md" iconLeading={Plus}>
                                    Add
                                </Button>
                            </div>
                        </div>

                        <p className="bg-secondary text-secondary text-md rounded-lg p-4 font-medium">
                            Mi tincidunt elit, id quisque ligula ac diam, amet. Vel etiam suspendisse morbi eleifend faucibus eget vestibulum felis. Dictum quis
                            montes, sit sit. Tellus aliquam enim urna.
                        </p>

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
            </div>

            <div className="sticky top-0 hidden max-h-svh w-108 flex-col overflow-hidden lg:flex">
                <div className="border-secondary flex justify-between gap-4 border-b px-6 py-5">
                    <div className="flex items-center gap-1.5">
                        <p className="text-primary text-md font-semibold">Messages</p>
                        <BadgeWithDot size="sm" type="modern" color="success">
                            4 new
                        </BadgeWithDot>
                    </div>
                    <Button color="tertiary" size="md" iconLeading={ArrowRight} aria-label="Open all messages" />
                </div>

                <MessageList aria-label="Project messages" className="bg-primary flex-1 gap-y-4 overflow-y-auto px-4 py-6 lg:px-6">
                    <Message
                        name={lana.name}
                        avatarSrc={lana.src}
                        status="online"
                        time="Thursday 11:40am"
                        dateTime="2027-01-21T11:40"
                        className="lg:max-w-87.5"
                    >
                        <Message.Bubble actions={bubbleActions}>Hey team, I&rsquo;ve finished with the requirements doc!</Message.Bubble>
                    </Message>

                    <Message
                        name={lana.name}
                        avatarSrc={lana.src}
                        status="online"
                        time="Thursday 11:40am"
                        dateTime="2027-01-21T11:40"
                        className="lg:max-w-87.5"
                    >
                        <Message.File type="pdf" name="Tech requirements.pdf" size="1.2 MB" actions={fileActions} />
                    </Message>

                    <Message direction="outgoing" name="You" time="Thursday 11:41am" dateTime="2027-01-21T11:41" delivery="delivered" className="lg:max-w-87.5">
                        <Message.Bubble actions={bubbleActions}>Awesome! Thanks.</Message.Bubble>
                    </Message>

                    <Message
                        name={demi.name}
                        avatarSrc={demi.src}
                        status="online"
                        time="Thursday 11:44am"
                        dateTime="2027-01-21T11:44"
                        className="lg:max-w-87.5"
                    >
                        <Message.Bubble actions={bubbleActions}>Good timing, was just looking at this.</Message.Bubble>
                    </Message>

                    <MessageList.Divider>Today</MessageList.Divider>

                    <Message
                        name={phoenix.name}
                        avatarSrc={phoenix.src}
                        status="online"
                        time="Friday 2:20pm"
                        dateTime="2027-01-22T14:20"
                        className="lg:max-w-87.5"
                    >
                        <Message.Bubble actions={bubbleActions}>Hey Olivia, can you please review the latest design?</Message.Bubble>
                    </Message>

                    <Message direction="outgoing" name="You" time="Friday 2:20pm" dateTime="2027-01-22T14:20" delivery="delivered" className="lg:max-w-87.5">
                        <Message.Bubble actions={bubbleActions}>Sure thing, I&rsquo;ll have a look today.</Message.Bubble>
                        <Message.Reactions>
                            <Message.Reaction emoji="❤️" label="Red heart" />
                            <Message.Reaction emoji="👌" label="OK hand" count={2} />
                        </Message.Reactions>
                    </Message>

                    <Message name={phoenix.name} avatarSrc={phoenix.src} status="online" className="lg:max-w-87.5">
                        <Message.Typing label={`${phoenix.name} is typing`} />
                    </Message>
                </MessageList>

                <div className="border-secondary bg-primary border-t p-6 pt-5">
                    <MessageComposer className="w-full" />
                </div>
            </div>
        </main>
    </div>
);
