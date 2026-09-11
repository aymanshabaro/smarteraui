"use client";

import {
    ArrowLeft,
    Copy01,
    DownloadCloud02,
    Edit04,
    ItalicSquare,
    Mail01,
    MarkerPin02,
    Microphone02,
    Paperclip,
    Phone,
    RefreshCcw02,
    Stars02,
} from "@properui/icons";
import { cx } from "../../../utils/cx";
import { IMAGES, LOGOS, avatar } from "../../../utils/demo-assets";
import { MessageComposer } from "../../application/messaging/message-composer";
import { Message, MessageList } from "../../application/messaging/messaging";
import { Avatar } from "../../base/avatar/avatar";
import { AvatarProfilePhoto } from "../../base/avatar/avatar-profile-photo";
import { Button } from "../../base/buttons/button";
import { AppHeader, productNavItems } from "./shell.a";

const navItems = [...productNavItems.slice(0, 5), { label: "Messages", href: "/messages" }];

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
const cover = IMAGES.landscape[1]!;

const stats = [
    { label: "Followers", value: "32,086" },
    { label: "Following", value: "4,698" },
    { label: "Posts", value: "128" },
    { label: "Collections", value: "24" },
];

const experience = [
    { role: "Founder", company: LOGOS[0]!, period: "May 2020 – Present" },
    { role: "UX Designer", company: LOGOS[1]!, period: "Jan 2018 – May 2020" },
    { role: "Visual Designer", company: LOGOS[3]!, period: "Mar 2017 – Jan 2018" },
];

/** The contact card shown beside the conversation: cover photo, profile stats, bio and work history. */
const ProfilePanel = () => (
    <div className="bg-primary ring-secondary hidden w-90 flex-col gap-6 overflow-y-auto rounded-[20px] pb-6 shadow-xs ring-1 ring-inset lg:flex">
        <div className="pb-6">
            <div className="relative px-2 lg:pt-2">
                <img src={cover.src} alt="" className="h-22 w-full rounded-xl object-cover lg:h-36" />
            </div>

            <div className="-mt-12 flex flex-col gap-4 px-4 lg:px-6">
                <div className="flex flex-col gap-4">
                    <div className="flex items-end justify-between">
                        <AvatarProfilePhoto size="md" src={contact.src} alt={contact.alt} />

                        <div className="flex gap-3">
                            <Button color="secondary" size="md" iconLeading={Mail01} aria-label="Send an email" />
                            <Button color="secondary" size="md" iconLeading={Phone} aria-label="Start a call" />
                        </div>
                    </div>

                    <div className="flex flex-col items-start gap-4">
                        <div className="max-w-50 min-w-0 flex-1">
                            <p className="text-primary truncate text-lg font-semibold">{contact.name}</p>
                            <p className="text-tertiary truncate text-sm">{contact.email}</p>
                        </div>

                        <dl className="flex items-center gap-4">
                            {stats.map((stat, index) => (
                                <div key={stat.label} className={cx("flex flex-col gap-0.5", index > 0 && "border-primary border-s ps-4")}>
                                    <dt className="text-quaternary text-xs font-medium">{stat.label}</dt>
                                    <dd className="text-primary text-md font-semibold">{stat.value}</dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                </div>

                <div className="hidden gap-3 lg:flex">
                    <Button color="secondary" size="md" iconLeading={Mail01}>
                        Message
                    </Button>
                    <Button color="primary" size="md">
                        View projects
                    </Button>
                </div>
            </div>
        </div>

        <div className="hidden flex-col gap-6 px-6 lg:flex">
            <div className="flex flex-col">
                <h2 className="text-primary text-sm font-semibold">About</h2>
                <p className="text-tertiary mt-1 text-sm">
                    I&rsquo;m a Designer based in Melbourne. I co-founded{" "}
                    <a href="https://proper.example" className="rounded-xs underline">
                        {LOGOS[0]!.name} Studio
                    </a>{" "}
                    where we help early stage founders and startups take their product from 0→1.
                </p>

                <ul className="mt-4 flex flex-col gap-2">
                    <li className="text-tertiary flex gap-2 text-sm">
                        <MarkerPin02 className="text-fg-quaternary size-5 shrink-0" aria-hidden="true" />
                        Melbourne, Australia
                    </li>
                </ul>
            </div>

            <div className="flex flex-col gap-4">
                <h2 className="text-primary text-sm font-semibold">Work experience</h2>

                {experience.map((entry) => (
                    <div key={entry.role} className="flex w-full items-start gap-3">
                        <Avatar src={entry.company.src} alt="" size="xl" border />
                        <div className="flex flex-col gap-2">
                            <div className="flex flex-col">
                                <p className="text-secondary text-sm font-semibold">{entry.role}</p>
                                <p className="text-tertiary text-sm">{entry.company.name}</p>
                            </div>
                            <p className="text-tertiary text-sm">{entry.period}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

/** Informational page 12 — a messaging app card beside a contact profile card, under the header navigation. */
export const Informational12 = () => (
    <div className="bg-primary flex flex-col">
        <AppHeader activeUrl="/messages" items={navItems} />

        <main className="max-w-container mx-auto flex w-full flex-1 flex-col gap-x-8 max-lg:max-h-full max-lg:min-h-0 lg:flex-row lg:items-start lg:px-8 lg:pt-12 lg:pb-24">
            <div className="bg-primary ring-secondary relative flex flex-1 flex-col overflow-hidden lg:rounded-[20px] lg:shadow-xs lg:ring-1">
                <div className="relative hidden flex-col gap-y-3 px-6 pt-6 pb-5 lg:flex">
                    <div className="inline-flex">
                        <Button color="link-color" size="md" href="/messages" iconLeading={ArrowLeft}>
                            All messages
                        </Button>
                    </div>

                    <div className="flex items-center justify-between gap-x-4">
                        <h1 className="text-primary text-md font-semibold">Conversation with {contact.name.split(" ")[0]}</h1>

                        <div className="flex gap-x-3">
                            <Button color="secondary" size="md" iconLeading={Phone} aria-label="Start a call" />
                            <Button color="secondary" size="md" iconLeading={Mail01} aria-label="Send an email" />
                        </div>
                    </div>
                </div>

                <MessageList
                    aria-label={`Conversation with ${contact.name}`}
                    className="bg-primary flex-1 gap-y-4 overflow-y-auto px-4 py-6 *:first:mt-auto lg:px-6"
                >
                    <Message name={contact.name} avatarSrc={contact.src} status="online" time="39 days ago" dateTime="2026-01-21T11:40">
                        <Message.Bubble actions={bubbleActions}>
                            Thanks Olivia! Almost there. I&rsquo;ll work on making those changes you suggested and will shoot it over.
                        </Message.Bubble>
                    </Message>

                    <Message name={contact.name} avatarSrc={contact.src} status="online" time="39 days ago" dateTime="2026-01-21T11:41">
                        <Message.Bubble actions={bubbleActions}>
                            Hey Olivia, I&rsquo;ve finished with the requirements doc! I made some notes in the gdoc as well for Phoenix to look over.
                        </Message.Bubble>
                    </Message>

                    <Message name={contact.name} avatarSrc={contact.src} status="online" time="39 days ago" dateTime="2026-01-21T11:42">
                        <Message.File type="pdf" name="Tech requirements.pdf" size="1.2 MB" actions={fileActions} />
                    </Message>

                    <Message direction="outgoing" name="You" time="39 days ago" dateTime="2026-01-21T11:45" delivery="delivered">
                        <Message.Bubble actions={bubbleActions}>Awesome! Thanks. I&rsquo;ll look at this today.</Message.Bubble>
                    </Message>

                    <Message name={contact.name} avatarSrc={contact.src} status="online" time="39 days ago" dateTime="2026-01-21T11:46">
                        <Message.Bubble actions={bubbleActions}>No rush though—we still have to wait for Lana&rsquo;s designs.</Message.Bubble>
                        <Message.Reactions>
                            <Message.Reaction emoji="❤️" label="Red heart" />
                            <Message.Reaction emoji="👌" label="OK hand" />
                        </Message.Reactions>
                    </Message>

                    <MessageList.Divider>Today</MessageList.Divider>

                    <Message name={contact.name} avatarSrc={contact.src} status="online" time="39 days ago" dateTime="2026-01-22T14:20">
                        <Message.Bubble actions={bubbleActions}>Hey Olivia, can you please review the latest design when you can?</Message.Bubble>
                    </Message>

                    <Message direction="outgoing" name="You" time="Just now" dateTime="2026-01-22T14:24" delivery="delivered">
                        <Message.Bubble actions={bubbleActions}>Sure thing, I&rsquo;ll have a look today. They&rsquo;re looking great!</Message.Bubble>
                    </Message>

                    <Message name={contact.name} avatarSrc={contact.src} status="online">
                        <Message.Typing label={`${contact.name} is typing`} />
                    </Message>
                </MessageList>

                <div className="border-secondary bg-primary sticky bottom-0 border-t p-4 lg:border-none lg:p-6 lg:pt-0">
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

            <ProfilePanel />
        </main>
    </div>
);
