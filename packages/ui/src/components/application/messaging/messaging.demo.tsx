"use client";

import { Copy01, DownloadCloud02, Edit04, FaceSmile, ItalicSquare, Microphone02, Paperclip, Recording02, RefreshCcw02, Stars02 } from "@smarteraui/icons";
import { IMAGES, avatar } from "@/utils/demo-assets";
import { MessageComposer } from "./message-composer";
import { MessageStatus as MessageStatusIndicator } from "./message-status";
import { Message, MessageList } from "./messaging";

const lana = avatar(2);
const phoenix = avatar(1);
const demi = avatar(3);
const olivia = avatar(0);

const preview = IMAGES.landscape[0];

/** The four actions offered on a message made of copy. */
const bubbleActions = [
    { label: "Generate with AI", icon: Stars02 },
    { label: "Edit message", icon: Edit04 },
    { label: "Reply", icon: RefreshCcw02 },
    { label: "Copy", icon: Copy01 },
];

/** The four actions offered on a message made of a file, an image or a recording. */
const fileActions = [
    { label: "Generate with AI", icon: Stars02 },
    { label: "Download", icon: DownloadCloud02 },
    { label: "Reply", icon: RefreshCcw02 },
    { label: "Copy", icon: Copy01 },
];

export const MessagingExample = () => (
    <div className="w-full sm:mx-auto sm:max-w-md">
        <MessageList aria-label="Conversation with the design team">
            <Message name={lana.name} avatarSrc={lana.src} status="online" time="Thursday 11:40am" dateTime="2027-01-21T11:40">
                <Message.Bubble actions={bubbleActions}>Hey team, I&rsquo;ve finished with the requirements doc!</Message.Bubble>
            </Message>

            <Message name={lana.name} avatarSrc={lana.src} status="online" time="Thursday 11:40am" dateTime="2027-01-21T11:40">
                <Message.File type="pdf" name="Tech requirements.pdf" size="1.2 MB" actions={fileActions} />
            </Message>

            <Message direction="outgoing" name="You" time="Thursday 11:41am" dateTime="2027-01-21T11:41" delivery="delivered">
                <Message.Bubble actions={bubbleActions}>Awesome! Thanks.</Message.Bubble>
            </Message>

            <Message name={demi.name} avatarSrc={demi.src} status="online" time="Thursday 11:44am" dateTime="2027-01-21T11:44">
                <Message.Bubble actions={bubbleActions}>Good timing—was just looking at this.</Message.Bubble>
            </Message>

            <MessageList.Divider>Today</MessageList.Divider>

            <Message name={phoenix.name} avatarSrc={phoenix.src} status="online" time="Friday 2:20pm" dateTime="2027-01-22T14:20">
                <Message.Bubble actions={bubbleActions}>Hey Olivia, can you please review the latest design when you can?</Message.Bubble>
            </Message>

            <Message direction="outgoing" name="You" time="Friday 2:20pm" dateTime="2027-01-22T14:20" delivery="delivered">
                <Message.Bubble actions={bubbleActions}>Sure thing, I&rsquo;ll have a look today.</Message.Bubble>
            </Message>
        </MessageList>
    </div>
);

export const MessageStatus = () => (
    <div className="flex items-start gap-4">
        <MessageStatusIndicator status="sent" />
        <MessageStatusIndicator status="delivered" />
        <MessageStatusIndicator status="failed" />
    </div>
);

export const MessageActionMinimal = () => <MessageComposer className="w-90 max-w-full" />;

export const MessageActionTextarea = () => (
    <MessageComposer
        variant="expanded"
        className="w-90 max-w-full"
        primaryTool={{ label: "Record a voice message", icon: Recording02 }}
        tools={[
            { label: "Attach a file", icon: Paperclip },
            { label: "Add an emoji", icon: FaceSmile },
        ]}
    />
);

export const MessageActionAdvanced = () => (
    <MessageComposer
        variant="advanced"
        className="w-90 max-w-full"
        placeholder="Ask me anything..."
        sender={{ name: olivia.name.split(" ")[0]!, avatarSrc: olivia.src }}
        primaryTool={{ label: "Record a voice message", icon: Microphone02 }}
        tools={[
            { label: "Shortcuts", icon: ItalicSquare },
            { label: "Attach", icon: Paperclip },
        ]}
    />
);

export const MessageSimple = () => (
    <MessageList className="max-w-90">
        <Message name={phoenix.name} avatarSrc={phoenix.src} status="online" time="Friday 2:20pm" dateTime="2027-01-22T14:20">
            <Message.Bubble actions={bubbleActions}>Hey Olivia, can you please review the latest design when you can?</Message.Bubble>
        </Message>
    </MessageList>
);

export const MessageReactions = () => (
    <MessageList className="max-w-90">
        <Message name={phoenix.name} avatarSrc={phoenix.src} status="online" time="Friday 2:20pm" dateTime="2027-01-22T14:20">
            <Message.Bubble actions={bubbleActions}>Hey Olivia, can you please review the latest design when you can?</Message.Bubble>
            <Message.Reactions>
                <Message.Reaction emoji="❤️" label="Red heart" />
                <Message.Reaction emoji="👌" label="OK hand" count={2} />
            </Message.Reactions>
        </Message>
    </MessageList>
);

export const MessageReply = () => (
    <MessageList className="max-w-90">
        <Message name={phoenix.name} avatarSrc={phoenix.src} status="online" time="Friday 2:20pm" dateTime="2027-01-22T14:20">
            <Message.Bubble actions={bubbleActions}>
                <Message.Quote>Sure thing, I&rsquo;ll have a look today.</Message.Quote>
                Awesome, thanks!
            </Message.Bubble>
        </Message>
    </MessageList>
);

export const MessageAttachment = () => (
    <MessageList className="max-w-90">
        <Message name={phoenix.name} avatarSrc={phoenix.src} status="online" time="Friday 2:20pm" dateTime="2027-01-22T14:20">
            <Message.File type="jpg" name="Latest design screenshot.jpg" size="1.2 MB" actions={fileActions} />
        </Message>
    </MessageList>
);

export const MessageAudio = () => (
    <MessageList className="max-w-90">
        <Message name={phoenix.name} avatarSrc={phoenix.src} status="online" time="Friday 2:20pm" dateTime="2027-01-22T14:20">
            <Message.Audio duration="00:28" actions={fileActions} />
        </Message>
    </MessageList>
);

export const MessageImage = () => (
    <MessageList className="max-w-90">
        <Message name={phoenix.name} avatarSrc={phoenix.src} status="online" time="Friday 2:20pm" dateTime="2027-01-22T14:20">
            <Message.Image src={preview.src} alt="Latest design screenshot" name="Latest design screenshot.jpg" size="128 KB" actions={fileActions} />
        </Message>
    </MessageList>
);

export const MessageLinkPreview = () => (
    <MessageList className="max-w-90">
        <Message name={phoenix.name} avatarSrc={phoenix.src} status="online" time="Friday 2:20pm" dateTime="2027-01-22T14:20">
            <Message.Bubble actions={bubbleActions}>
                <Message.LinkPreview src={preview.src} alt="Smartera UI link preview" />
                <a href="https://www.smartera.com" target="_blank" rel="noopener noreferrer">
                    https://www.smartera.com
                </a>
            </Message.Bubble>
        </Message>
    </MessageList>
);

export const MessageLinkMinimal = () => (
    <MessageList className="max-w-90">
        <Message name={phoenix.name} avatarSrc={phoenix.src} status="online" time="Friday 2:20pm" dateTime="2027-01-22T14:20">
            <Message.Bubble actions={bubbleActions}>
                <Message.LinkCard
                    title="Smartera UI — Figma UI Kit and Design System"
                    description="Smartera UI is the largest UI kit and design system for Figma in the world. Kickstart any project, save thousands of hours, and level up as a designer."
                />
                <a href="https://www.smartera.com" target="_blank" rel="noopener noreferrer">
                    https://www.smartera.com
                </a>
            </Message.Bubble>
        </Message>
    </MessageList>
);

export const MessageWriting = () => (
    <MessageList className="max-w-90">
        <Message name={phoenix.name} avatarSrc={phoenix.src} status="online">
            <Message.Typing label={`${phoenix.name} is typing`} />
        </Message>
    </MessageList>
);
