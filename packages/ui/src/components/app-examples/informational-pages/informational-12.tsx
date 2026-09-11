"use client";

import {
    BarChartSquare02,
    CheckDone01,
    Copy01,
    DownloadCloud02,
    Edit04,
    HomeLine,
    ItalicSquare,
    LayoutAlt01,
    Mail01,
    MessageChatCircle,
    Microphone02,
    Paperclip,
    Phone,
    PieChart03,
    Plus,
    RefreshCcw02,
    Rows01,
    Settings01,
    Stars02,
    Users01,
    VideoRecorder,
} from "@properui/icons";
import { IMAGES, LOGOS, avatar } from "../../../utils/demo-assets";
import type { NavItemType } from "../../application/app-navigation/config";
import { SidebarNavigationSimple } from "../../application/app-navigation/sidebar-navigation/sidebar-simple";
import { Breadcrumbs } from "../../application/breadcrumbs/breadcrumbs";
import { MessageComposer } from "../../application/messaging/message-composer";
import { Message, MessageList } from "../../application/messaging/messaging";
import { Avatar } from "../../base/avatar/avatar";
import { AvatarProfilePhoto } from "../../base/avatar/avatar-profile-photo";
import { Badge, BadgeIcon, BadgeWithDot } from "../../base/badges/badges";
import { Button } from "../../base/buttons/button";

const navItems: NavItemType[] = [
    { label: "Home", href: "/", icon: HomeLine, items: [{ label: "Overview", href: "/overview" }] },
    { label: "Dashboard", href: "/dashboard", icon: BarChartSquare02, items: [{ label: "Overview", href: "/dashboard/overview" }] },
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
    { label: "Tasks", href: "/tasks", icon: CheckDone01, badge: 8, items: [{ label: "View all", href: "/tasks/all" }] },
    { label: "Reporting", href: "/reporting", icon: PieChart03, items: [{ label: "Overview", href: "/reporting/overview" }] },
    { label: "Users", href: "/users", icon: Users01, items: [{ label: "View all", href: "/users/all" }] },
];

const footerItems: NavItemType[] = [
    { label: "Settings", href: "/settings", icon: Settings01 },
    {
        label: "Support",
        href: "/support",
        icon: MessageChatCircle,
        badge: (
            <BadgeWithDot color="success" type="modern" size="sm">
                Online
            </BadgeWithDot>
        ),
    },
    { label: "Open in browser", href: "https://proper.example.com/", icon: LayoutAlt01 },
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

const contact = avatar(3);
const owner = avatar(0);
const preview = IMAGES.landscape[1]!;

const experience = [
    { role: "Lead Product Designer", company: LOGOS[4]!, period: "May 2020 – Present" },
    { role: "UX Designer", company: LOGOS[5]!, period: "Jan 2018 – May 2020" },
    { role: "Visual Designer", company: LOGOS[0]!, period: "Mar 2017 – Jan 2018" },
];

/** Informational page 12 — project messaging app with a contact profile panel. */
export const Informational12 = () => (
    <div className="bg-primary flex flex-col lg:flex-row">
        <SidebarNavigationSimple activeUrl="/projects/current" items={navItems} footerItems={footerItems} />

        <main className="flex h-full max-h-full flex-1 flex-col lg:flex-row">
            <div className="relative flex flex-1 flex-col">
                <div className="bg-primary after:border-secondary sticky top-0 z-10 hidden h-33 flex-col gap-4 p-6 pt-5 after:pointer-events-none after:absolute after:inset-0 after:border-b lg:flex">
                    <Breadcrumbs type="text" aria-label="Breadcrumbs">
                        <Breadcrumbs.Item href="/" icon={HomeLine} aria-label="Home" />
                        <Breadcrumbs.Item href="/projects">Projects</Breadcrumbs.Item>
                        <Breadcrumbs.Item href="/projects/marketing-site">Marketing site</Breadcrumbs.Item>
                        <Breadcrumbs.Item href="/projects/marketing-site/messages">Messages</Breadcrumbs.Item>
                    </Breadcrumbs>

                    <div className="flex gap-4">
                        <p className="text-primary flex-1 text-xl font-semibold">Messages</p>
                        <Button color="secondary" size="md" href="/projects/marketing-site">
                            View project
                        </Button>
                    </div>
                </div>

                <MessageList
                    aria-label={`Conversation with ${contact.name}`}
                    className="border-secondary bg-primary flex-1 gap-y-4 overflow-y-auto border-e px-4 py-6 *:first:mt-auto lg:px-6"
                >
                    <Message name={contact.name} avatarSrc={contact.src} status="online" time="Thursday 11:40am" dateTime="2027-01-21T11:40">
                        <Message.Bubble actions={bubbleActions}>Hey team, I&rsquo;ve finished with the requirements doc!</Message.Bubble>
                    </Message>

                    <Message name={contact.name} avatarSrc={contact.src} status="online" time="Thursday 11:40am" dateTime="2027-01-21T11:40">
                        <Message.File type="pdf" name="Tech requirements.pdf" size="1.2 MB" actions={fileActions} />
                    </Message>

                    <Message name={contact.name} avatarSrc={contact.src} status="online" time="Thursday 11:44am" dateTime="2027-01-21T11:44">
                        <Message.Bubble actions={bubbleActions}>No rush though—we still have to wait for Lana&rsquo;s designs.</Message.Bubble>
                    </Message>

                    <Message direction="outgoing" name="You" time="Thursday 11:45am" dateTime="2027-01-21T11:45" delivery="delivered">
                        <Message.Bubble actions={bubbleActions}>Awesome! Thanks.</Message.Bubble>
                        <Message.Reactions>
                            <Message.Reaction emoji="❤️" label="Red heart" />
                            <Message.Reaction emoji="👌" label="OK hand" />
                        </Message.Reactions>
                    </Message>

                    <MessageList.Divider>Today</MessageList.Divider>

                    <Message name={contact.name} avatarSrc={contact.src} status="online" time="Today 2:20pm" dateTime="2027-01-22T14:20">
                        <Message.Image src={preview.src} alt="Background image" name="Background image.jpg" size="128 KB" actions={fileActions} />
                    </Message>

                    <Message name={contact.name} avatarSrc={contact.src} status="online" time="Today 2:20pm" dateTime="2027-01-22T14:20">
                        <Message.Bubble actions={bubbleActions}>Hey Olivia, can you please review the latest design?</Message.Bubble>
                    </Message>

                    <Message direction="outgoing" name="You" time="Just now" dateTime="2027-01-22T14:24" delivery="delivered">
                        <Message.Bubble actions={bubbleActions}>Sure thing, I&rsquo;ll have a look today. They&rsquo;re looking great!</Message.Bubble>
                    </Message>

                    <Message name={contact.name} avatarSrc={contact.src} status="online">
                        <Message.Typing label={`${contact.name} is typing`} />
                    </Message>
                </MessageList>

                <div className="border-secondary bg-primary sticky bottom-0 z-20 border-t p-4 lg:border-none lg:px-6 lg:pt-0 lg:pb-6">
                    <MessageComposer
                        variant="advanced"
                        className="max-lg:hidden"
                        sender={{ name: owner.name.split(" ")[0]!, avatarSrc: owner.src }}
                        primaryTool={{ label: "Record a voice message", icon: Microphone02 }}
                        tools={[
                            { label: "Shortcuts", icon: ItalicSquare },
                            { label: "Attach", icon: Paperclip },
                        ]}
                    />
                    <MessageComposer className="w-full lg:hidden" />
                </div>
            </div>

            <div className="bg-primary sticky top-0 z-20 order-first flex w-full flex-col gap-6 lg:static lg:order-none lg:h-full lg:w-90 lg:overflow-auto lg:pb-8">
                <div className="border-secondary bg-primary border-b pb-5 lg:border-none lg:pb-0">
                    <div className="p-1 pt-0 lg:pt-1">
                        <div className="bg-utility-brand-100 h-22 rounded-xl lg:h-30" />
                    </div>

                    <div className="-mt-9 flex flex-col gap-4 px-4 lg:px-6">
                        <div className="flex flex-col gap-4">
                            <div className="flex items-end justify-between">
                                <AvatarProfilePhoto size="md" src={contact.src} alt={contact.alt} />

                                <div className="flex gap-3">
                                    <Button color="secondary" size="md" iconLeading={Mail01} aria-label="Send an email" />
                                    <Button color="secondary" size="md" iconLeading={Phone} aria-label="Start a call" />
                                    <Button color="secondary" size="md" iconLeading={VideoRecorder} aria-label="Start a video call" />
                                </div>
                            </div>

                            <div className="flex flex-col gap-1">
                                <div className="flex items-center gap-2">
                                    <span className="text-primary text-xl font-semibold">{contact.name}</span>
                                    <span className="bg-fg-success-secondary size-2.5 rounded-full">
                                        <span className="sr-only">Online</span>
                                    </span>
                                </div>
                                <span className="text-tertiary text-md">{contact.email}</span>
                            </div>
                        </div>

                        <div className="hidden gap-1 lg:flex">
                            <Badge size="sm" type="modern">
                                UX Design
                            </Badge>
                            <Badge size="sm" type="modern">
                                Product Design
                            </Badge>
                            <Badge size="sm" type="modern">
                                Webflow
                            </Badge>
                            <BadgeIcon size="sm" type="modern" icon={Plus} />
                        </div>

                        <div className="hidden gap-3 lg:flex">
                            <Button color="secondary" size="lg">
                                Add to project
                            </Button>
                            <Button color="primary" size="lg">
                                View projects
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="hidden flex-col gap-6 px-6 lg:flex">
                    <div className="flex flex-col gap-1">
                        <p className="text-primary text-sm font-semibold">About</p>
                        <p className="text-tertiary text-sm">
                            I&rsquo;m a Product Designer based in Melbourne, Australia. I specialise in UX/UI design, brand strategy, and Webflow development.
                        </p>
                    </div>

                    <div className="flex flex-col gap-4">
                        <p className="text-primary text-sm font-semibold">Work experience</p>

                        {experience.map((entry) => (
                            <div key={entry.role} className="flex gap-3">
                                <Avatar src={entry.company.src} alt="" size="xl" border />
                                <div className="flex flex-col gap-2">
                                    <div>
                                        <p className="text-primary text-sm font-semibold">{entry.role}</p>
                                        <p className="text-tertiary text-sm">{entry.company.name}</p>
                                    </div>
                                    <span className="text-tertiary text-sm">{entry.period}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    </div>
);
