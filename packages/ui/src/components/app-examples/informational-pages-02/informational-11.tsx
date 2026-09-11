"use client";

import { ListBox as AriaListBox, ListBoxItem as AriaListBoxItem } from "react-aria-components";
import { Copy01, DownloadCloud02, Edit04, Edit05, FaceSmile, Microphone02, Paperclip, Phone, RefreshCcw02, SearchLg, Stars02 } from "@properui/icons";
import { cx } from "../../../utils/cx";
import { IMAGES, avatar } from "../../../utils/demo-assets";
import { MessageComposer } from "../../application/messaging/message-composer";
import { Message, MessageList } from "../../application/messaging/messaging";
import { Avatar } from "../../base/avatar/avatar";
import { AvatarLabelGroup } from "../../base/avatar/avatar-label-group";
import { Badge, BadgeWithDot } from "../../base/badges/badges";
import { Button } from "../../base/buttons/button";
import { DropdownIconSimple } from "../../base/dropdown/dropdown-icon-simple";
import { Input } from "../../base/input/input";
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

const chats = [
    {
        id: "chat-01",
        person: avatar(1),
        time: "5 mins ago",
        unread: true,
        preview: "Hey Olivia, Katherine sent me over the latest doc. I just have a quick question about the...",
    },
    {
        id: "chat-02",
        person: avatar(8),
        time: "20 mins ago",
        unread: false,
        fromYou: true,
        preview: "Sure thing, I'll have a look today. They're looking great!",
    },
    {
        id: "chat-03",
        person: avatar(3),
        time: "1 hour ago",
        unread: true,
        preview: "I've just published the site again. Looks like it fixed it. How weird! I'll keep an eye on it...",
    },
    {
        id: "chat-04",
        person: avatar(4),
        time: "2 hours ago",
        unread: false,
        preview: "Hey Liv, just wanted to say thanks for chasing up the release for me. Really...",
    },
    {
        id: "chat-05",
        person: avatar(5),
        time: "2 hours ago",
        unread: false,
        preview: "Good news!! Jack accepted the offer. I've sent over a contract for him to review but...",
    },
    { id: "chat-06", person: avatar(10), time: "4 hours ago", unread: true, preview: "Thanks! Looks great!" },
    {
        id: "chat-07",
        person: avatar(11),
        time: "4 hours ago",
        unread: false,
        preview: "The press release went out! It's been picked up by a few of the big publications...",
    },
];

const activeChat = avatar(8);
const preview = IMAGES.landscape[0]!;

/** Informational page 11 — a messages app rendered as a bordered card under the horizontal header navigation. */
export const Informational11 = () => (
    <div className="bg-primary flex flex-col">
        <AppHeader activeUrl="/messages" items={navItems} />

        <div className="max-w-container mx-auto mt-12 mb-8 hidden w-full px-8 lg:flex">
            <h1 className="text-primary text-xl font-semibold">All messages</h1>
        </div>

        <div className="max-w-container mx-auto mb-0 w-full lg:mb-24 lg:px-8">
            <div className="ring-secondary flex max-h-[calc(100vh-64px)] overflow-hidden lg:max-h-252 lg:rounded-xl lg:shadow-sm lg:ring-1">
                <div className="border-secondary bg-primary relative hidden w-90 flex-col overflow-hidden border-e lg:flex">
                    <div className="bg-primary flex items-center justify-between gap-4 px-6 py-5">
                        <div className="flex items-center gap-2">
                            <h2 className="text-primary text-lg font-semibold">Messages</h2>
                            <Badge size="sm" type="modern">
                                40
                            </Badge>
                        </div>
                        <Button color="secondary" size="md" iconLeading={Edit05} aria-label="New message" />
                    </div>

                    <div className="px-5 pb-3">
                        <Input size="sm" aria-label="Search messages" placeholder="Search" icon={SearchLg} className="w-full" />
                    </div>

                    <AriaListBox aria-label="Chats" selectionMode="single" defaultSelectedKeys={["chat-02"]} items={chats} className="flex-1 overflow-y-auto">
                        {(chat) => (
                            <AriaListBoxItem
                                id={chat.id}
                                href={`/messages/${chat.id}`}
                                textValue={chat.person.name}
                                className={({ isSelected, isFocusVisible }) =>
                                    cx(
                                        "border-secondary outline-focus-ring relative flex cursor-pointer flex-col gap-4 border-b py-4 ps-3 pe-4 select-none",
                                        isSelected && "bg-secondary",
                                        isFocusVisible && "outline-2 -outline-offset-2",
                                    )
                                }
                            >
                                <div className="flex justify-between gap-4">
                                    <div className="flex min-w-0 flex-1 items-center">
                                        <div className="flex h-full w-5 items-center">
                                            {chat.unread && <span aria-label="Unread" className="bg-fg-brand-secondary size-2 rounded-full" />}
                                        </div>
                                        <AvatarLabelGroup
                                            size="md"
                                            src={chat.person.src}
                                            alt={chat.person.alt}
                                            status="online"
                                            title={chat.person.name}
                                            subtitle={chat.person.username}
                                        />
                                    </div>
                                    <span className="text-tertiary shrink-0 text-sm">{chat.time}</span>
                                </div>

                                <div className="ps-5">
                                    <p className="text-tertiary text-sm">
                                        {chat.fromYou && <span className="text-tertiary text-sm font-medium">You: </span>}
                                        {chat.preview}
                                    </p>
                                </div>
                            </AriaListBoxItem>
                        )}
                    </AriaListBox>
                </div>

                <div className="relative flex max-h-full flex-1 flex-col overflow-hidden lg:max-h-252">
                    <div className="border-secondary bg-primary sticky top-0 z-50 flex w-full flex-wrap items-start gap-4 border-b px-4 pt-5 pb-5 lg:px-6">
                        <div className="flex flex-1 gap-3">
                            <Avatar src={activeChat.src} alt={activeChat.alt} size="lg" status="online" verified />
                            <div className="flex flex-col gap-0.5">
                                <div className="flex items-center gap-2">
                                    <p className="text-primary text-lg font-semibold">{activeChat.name}</p>
                                    <BadgeWithDot size="sm" type="modern" color="success">
                                        Online
                                    </BadgeWithDot>
                                </div>
                                <p className="text-tertiary text-md">{activeChat.username}</p>
                            </div>
                        </div>

                        <div className="hidden gap-3 lg:flex">
                            <Button color="secondary" size="md" iconLeading={Phone}>
                                Call
                            </Button>
                            <Button color="primary" size="md">
                                View profile
                            </Button>
                        </div>

                        <DropdownIconSimple />
                    </div>

                    <MessageList
                        aria-label={`Conversation with ${activeChat.name}`}
                        className="bg-primary flex-1 gap-y-4 overflow-y-auto px-4 py-8 *:first:mt-auto lg:px-6"
                    >
                        <Message name={activeChat.name} avatarSrc={activeChat.src} status="online" time="Thursday 11:40am" dateTime="2026-01-21T11:40">
                            <Message.Bubble actions={bubbleActions}>
                                Thanks Olivia! Almost there. I&rsquo;ll work on making those changes you suggested and will shoot it over.
                            </Message.Bubble>
                        </Message>

                        <Message name={activeChat.name} avatarSrc={activeChat.src} status="online" time="Thursday 11:40am" dateTime="2026-01-21T11:40">
                            <Message.Bubble actions={bubbleActions}>
                                <Message.LinkPreview src={preview.src} alt="Proper UI link preview" />
                                <a href="https://www.proper.example" target="_blank" rel="noopener noreferrer">
                                    https://www.proper.example
                                </a>
                            </Message.Bubble>
                        </Message>

                        <Message name={activeChat.name} avatarSrc={activeChat.src} status="online" time="Thursday 11:41am" dateTime="2026-01-21T11:41">
                            <Message.File type="pdf" name="Tech requirements.pdf" size="1.2 MB" actions={fileActions} />
                        </Message>

                        <Message direction="outgoing" name="You" time="Thursday 11:42am" dateTime="2026-01-21T11:42" delivery="delivered">
                            <Message.Bubble actions={bubbleActions}>Awesome! Thanks. I&rsquo;ll look at this today.</Message.Bubble>
                        </Message>

                        <Message name={activeChat.name} avatarSrc={activeChat.src} status="online" time="Thursday 11:44am" dateTime="2026-01-21T11:44">
                            <Message.Bubble actions={bubbleActions}>No rush though, we still have to wait for Lana&rsquo;s designs.</Message.Bubble>
                        </Message>

                        <MessageList.Divider>Today</MessageList.Divider>

                        <Message name={activeChat.name} avatarSrc={activeChat.src} status="online" time="Today 2:20pm" dateTime="2026-01-22T14:20">
                            <Message.Bubble actions={bubbleActions}>Hey Olivia, can you please review the latest design when you can?</Message.Bubble>
                        </Message>

                        <Message direction="outgoing" name="You" time="Just now" dateTime="2026-01-22T14:24" delivery="delivered">
                            <Message.Bubble actions={bubbleActions}>Sure thing, I&rsquo;ll have a look today. They&rsquo;re looking great!</Message.Bubble>
                            <Message.Reactions>
                                <Message.Reaction emoji="❤️" label="Red heart" />
                                <Message.Reaction emoji="👌" label="OK hand" />
                            </Message.Reactions>
                        </Message>

                        <Message name={activeChat.name} avatarSrc={activeChat.src} status="online">
                            <Message.Typing label={`${activeChat.name} is typing`} />
                        </Message>
                    </MessageList>

                    <div className="bg-primary sticky bottom-0 px-4 pb-4 lg:px-6 lg:pb-6">
                        <MessageComposer
                            variant="expanded"
                            placeholder={`Message ${activeChat.name}`}
                            primaryTool={{ label: "Record a voice message", icon: Microphone02 }}
                            tools={[
                                { label: "Attach a file", icon: Paperclip },
                                { label: "Add an emoji", icon: FaceSmile },
                            ]}
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
);
