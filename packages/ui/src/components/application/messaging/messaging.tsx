"use client";

import type { ComponentProps, ReactNode } from "react";
import { createContext, useContext } from "react";
import { FileIcon } from "@untitledui/file-icons";
import { Button as AriaButton } from "react-aria-components";
import { Link03 } from "@properui/icons";
import { cx, sortCx } from "../../../utils/cx";
import { Avatar } from "../../base/avatar/avatar";
import type { MessageActionItem } from "./message-actions";
import { MessageActions } from "./message-actions";
import type { MessageStatusType } from "./message-status";
import { MessageStatus } from "./message-status";

/** Which side of the conversation a message belongs to. */
export type MessageDirection = "incoming" | "outgoing";

const styles = sortCx({
    // Incoming messages keep room on the end side for the hover toolbar; outgoing ones hug the end edge.
    item: {
        incoming: "pe-8 lg:pe-10",
        outgoing: "self-end ps-10",
    },
    // The speech-bubble notch sits on the side the message came from.
    corner: {
        incoming: "rounded-ss-none",
        outgoing: "rounded-se-none",
    },
    bubble: {
        common: [
            "group/msg text-md text-primary ring-secondary relative rounded-lg px-3 py-2 ring-1 wrap-break-word ring-inset",
            // Links inside message copy — the copy is authored by the consumer, so it is styled here.
            "[&_a]:text-brand-secondary [&_a]:outline-focus-ring [&_a]:rounded-xs [&_a]:underline [&_a]:underline-offset-2 [&_a]:transition [&_a]:duration-100 [&_a]:ease-linear [&_a]:hover:text-brand-secondary_hover [&_a]:focus-visible:outline-2 [&_a]:focus-visible:outline-offset-2",
        ].join(" "),
        incoming: "bg-secondary",
        outgoing: "bg-primary pe-4",
    },
    card: "group/msg bg-primary ring-secondary relative rounded-lg ring-1",
    media: "w-full rounded-md object-cover outline-1 -outline-offset-[0.5px] outline-black/10",
    name: "text-secondary flex-1 truncate text-sm font-medium not-italic",
    time: "text-tertiary text-xs",
});

const MessageContext = createContext<MessageDirection>("incoming");

export interface MessageListProps {
    /** Accessible name of the conversation. */
    "aria-label"?: string;
    /** `Message` and `MessageList.Divider` entries. */
    children: ReactNode;
    /** Additional classes merged onto the list. */
    className?: string;
}

const MessageListRoot = ({ "aria-label": ariaLabel = "Conversation", children, className }: MessageListProps) => (
    <ol aria-label={ariaLabel} className={cx("flex flex-col gap-4", className)}>
        {children}
    </ol>
);

export interface MessageListDividerProps {
    /** The label sitting between the two rules, e.g. `Today`. */
    children: ReactNode;
    /** Additional classes merged onto the divider. */
    className?: string;
}

/** A labelled rule separating one day (or unread run) of a conversation from the next. */
const MessageListDivider = ({ children, className }: MessageListDividerProps) => (
    <li className={cx("my-4 flex w-full shrink-0 items-center gap-x-2", className)}>
        <span aria-hidden="true" className="bg-border-secondary h-px flex-1" />
        <span className="text-tertiary text-sm font-medium">{children}</span>
        <span aria-hidden="true" className="bg-border-secondary h-px flex-1" />
    </li>
);

export interface MessageProps {
    /**
     * Which side of the conversation the message belongs to. Outgoing messages drop the avatar
     * and align to the end of the list.
     *
     * @default "incoming"
     */
    direction?: MessageDirection;
    /** Name of the sender, rendered above the message. */
    name: string;
    /** Avatar image of the sender. Only rendered for incoming messages. */
    avatarSrc?: string;
    /** Presence dot rendered on the avatar. */
    status?: "online" | "offline";
    /** Human readable timestamp, e.g. `Friday 2:20pm`. */
    time?: string;
    /** Machine readable value of the `<time>` element. Falls back to `time`. */
    dateTime?: string;
    /** Delivery state shown after the timestamp. */
    delivery?: MessageStatusType;
    /** Called when the delivery indicator is pressed, e.g. to retry a failed message. */
    onDeliveryPress?: () => void;
    /** The bubble, attachment, image or typing indicator of the message. */
    children?: ReactNode;
    /** Additional classes merged onto the list item. */
    className?: string;
}

const MessageRoot = ({ direction = "incoming", name, avatarSrc, status, time, dateTime, delivery, onDeliveryPress, children, className }: MessageProps) => (
    <MessageContext.Provider value={direction}>
        <li className={cx("relative flex items-start gap-3", styles.item[direction], className)}>
            {direction === "incoming" && <Avatar size="sm" src={avatarSrc} alt={name} status={status} />}

            <article className="flex min-w-0 flex-1 flex-col gap-1.5">
                <header className="flex items-center gap-2">
                    <cite className={styles.name}>{name}</cite>
                    {(time || delivery) && (
                        <div className="flex items-center gap-0.5">
                            {time && (
                                <time dateTime={dateTime ?? time} className={styles.time}>
                                    {time}
                                </time>
                            )}
                            {delivery && <MessageStatus status={delivery} onPress={onDeliveryPress} />}
                        </div>
                    )}
                </header>

                {children}
            </article>
        </li>
    </MessageContext.Provider>
);

export interface MessageBubbleProps {
    /** Hover actions revealed over the bubble. */
    actions?: MessageActionItem[];
    /** The message copy, plus any quote or link preview rendered above it. */
    children: ReactNode;
    /** Additional classes merged onto the bubble. */
    className?: string;
}

/** The speech bubble holding a message's copy. */
const MessageBubble = ({ actions, children, className }: MessageBubbleProps) => {
    const direction = useContext(MessageContext);

    return (
        <div className={cx(styles.bubble.common, styles.bubble[direction], styles.corner[direction], className)}>
            {children}
            {actions && <MessageActions actions={actions} />}
        </div>
    );
};

export interface MessageQuoteProps {
    /** The quoted copy. */
    children: ReactNode;
    /** Additional classes merged onto the quote. */
    className?: string;
}

/** The message being replied to, rendered above the reply's own copy. */
const MessageQuote = ({ children, className }: MessageQuoteProps) => (
    <blockquote
        className={cx(
            "bg-primary text-tertiary ring-secondary relative mb-1.5 rounded-lg px-3 py-2 text-sm ring-1 ring-inset",
            "before:border-brand before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border-s-[3px]",
            className,
        )}
    >
        {children}
    </blockquote>
);

export interface MessageFileProps {
    /** The file name. */
    name: string;
    /** Human readable file size, e.g. `1.2 MB`. */
    size: string;
    /** The file type driving the icon, e.g. `pdf`, `jpg`, `mp4`. */
    type?: ComponentProps<typeof FileIcon>["type"];
    /** Hover actions revealed over the attachment. */
    actions?: MessageActionItem[];
    /** Additional classes merged onto the attachment. */
    className?: string;
}

/** An attachment sent instead of copy. */
const MessageFile = ({ name, size, type = "empty", actions, className }: MessageFileProps) => {
    const direction = useContext(MessageContext);

    return (
        <div className={cx(styles.card, "flex gap-3 px-3.5 py-2.5", styles.corner[direction], className)}>
            {/* The file icons are fixed artwork rather than currentColor glyphs, so the light/dark
                pair has to be swapped by hand — no semantic token can express it. */}
            <FileIcon type={type} theme="light" size={40} aria-hidden="true" className="size-10 shrink-0 dark:hidden" />
            <FileIcon type={type} theme="dark" size={40} aria-hidden="true" className="size-10 shrink-0 not-dark:hidden" />
            <div className="min-w-0 flex-1">
                <p className="text-secondary truncate text-sm font-medium">{name}</p>
                <p className="text-tertiary text-sm">{size}</p>
            </div>
            {actions && <MessageActions actions={actions} />}
        </div>
    );
};

/** The fixed waveform artwork of a voice message. */
const AudioWaveform = ({ className }: { className?: string }) => (
    <svg width={206} height={34} viewBox="0 0 206 34" fill="none" aria-hidden="true" className={className}>
        <path
            stroke="currentColor"
            strokeLinecap="round"
            d="M1 15V19M5 15V19M9 15V19M13 15V19M17 9.00005V25M21 5.00005V29M25 1.00005V33M29 1.00005V33M33 5.00005V29M37 13V21M41 9.00005V25M45 13V21M49 5.00005V29M53 5.00005V29M57 9.00005V25M61 9.00005V25M65 1.00005V33M69 1.00005V33M73 5.00005V29M77 1.00005V33M81 9.00005V25M85 13V21M89 15V19.0001M93 15V19.0001M97 13V21.0001M101 13V21.0001M105 9V25.0001M109 5V29.0001M113 1V33.0001M117 5V29.0001M121 5V29.0001M125 5V29.0001M129 9V25.0001M133 13V21.0001M137 9V25.0001M141 13V21.0001M145 9V25.0001M149 5V29.0001M153 5V29.0001M157 9V25.0001M161 1V33.0001M165 5V29.0001M169 9V25.0001M173 13V21.0001M177 15V19.0001M181 9V25.0001M185 5V29.0001M189 5V29.0001M193 9V25.0001M197 15V19.0001M201 15V19.0001M205 15V19.0001"
        />
    </svg>
);

export interface MessageAudioProps {
    /** Human readable length of the recording, e.g. `00:28`. */
    duration: string;
    /** Accessible name of the play button. */
    playLabel?: string;
    /** Called when the play button is pressed. */
    onPlay?: () => void;
    /** Hover actions revealed over the player. */
    actions?: MessageActionItem[];
    /** Additional classes merged onto the player. */
    className?: string;
}

/** A voice message with a play button, its waveform, and its length. */
const MessageAudio = ({ duration, playLabel = "Play audio message", onPlay, actions, className }: MessageAudioProps) => {
    const direction = useContext(MessageContext);

    return (
        <div className={cx(styles.card, "flex items-center gap-2 p-3", styles.corner[direction], className)}>
            <AriaButton
                aria-label={playLabel}
                onPress={onPlay}
                className="bg-fg-brand-primary_alt outline-focus-ring flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-2"
            >
                <svg width={12.8} height={14} viewBox="0 0 16 16" fill="none" aria-hidden="true" className="text-fg-white translate-x-px rtl:-scale-x-100">
                    <path
                        fill="currentColor"
                        d="M2.19995 2.86327C2.19995 1.61155 3.57248 0.844595 4.63851 1.50061L12.9856 6.63731C14.0009 7.26209 14.0009 8.73784 12.9856 9.36262L4.63851 14.4993C3.57247 15.1553 2.19995 14.3884 2.19995 13.1367V2.86327Z"
                    />
                </svg>
            </AriaButton>
            <AudioWaveform className="text-fg-brand-primary_alt min-w-0 flex-1" />
            <p className="text-tertiary shrink-0 text-xs">{duration}</p>
            {actions && <MessageActions actions={actions} />}
        </div>
    );
};

export interface MessageImageProps {
    /** Source of the image. */
    src: string;
    /** Alternative text of the image. */
    alt: string;
    /** File name shown under the image. */
    name?: string;
    /** Human readable file size shown under the image, e.g. `128 KB`. */
    size?: string;
    /** Hover actions revealed over the image. */
    actions?: MessageActionItem[];
    /** Additional classes merged onto the figure. */
    className?: string;
}

/** An image sent instead of copy, with its file name and size as the caption. */
const MessageImage = ({ src, alt, name, size, actions, className }: MessageImageProps) => (
    <figure className={cx("flex flex-col gap-1.5", className)}>
        <div className="group/msg relative">
            <img src={src} alt={alt} className={styles.media} />
            {actions && <MessageActions actions={actions} />}
        </div>
        {(name || size) && (
            <figcaption className="flex items-center gap-1">
                {name && <span className="text-secondary min-w-0 flex-1 truncate text-sm font-medium">{name}</span>}
                {size && <span className="text-tertiary text-sm">{size}</span>}
            </figcaption>
        )}
    </figure>
);

export interface MessageLinkPreviewProps {
    /** Source of the preview image. */
    src: string;
    /** Alternative text of the preview image. */
    alt: string;
    /** Additional classes merged onto the figure. */
    className?: string;
}

/** The thumbnail of a shared link, rendered above the link inside a bubble. */
const MessageLinkPreview = ({ src, alt, className }: MessageLinkPreviewProps) => (
    <figure className={cx("mt-1 mb-1.5", className)}>
        <img src={src} alt={alt} className={styles.media} />
    </figure>
);

export interface MessageLinkCardProps {
    /** Title of the linked page. */
    title: string;
    /** Description of the linked page. */
    description?: string;
    /** Additional classes merged onto the card. */
    className?: string;
}

/** The title-and-description card of a shared link, rendered above the link inside a bubble. */
const MessageLinkCard = ({ title, description, className }: MessageLinkCardProps) => (
    <aside className={cx("bg-primary ring-secondary mt-1 mb-1.5 flex items-start gap-1.5 rounded-lg p-2 pe-3 ring-1 ring-inset", className)}>
        <Link03 aria-hidden="true" className="text-fg-quaternary mt-0.5 size-4 shrink-0" />
        <div className="min-w-0 flex-1">
            <p className="text-secondary w-full truncate text-sm font-medium">{title}</p>
            {description && <p className="text-tertiary w-full truncate text-sm">{description}</p>}
        </div>
    </aside>
);

export interface MessageReactionsProps {
    /** `Message.Reaction` entries. */
    children: ReactNode;
    /** Additional classes merged onto the list. */
    className?: string;
}

/** The row of reactions under a message. */
const MessageReactions = ({ children, className }: MessageReactionsProps) => <ul className={cx("flex justify-end gap-1", className)}>{children}</ul>;

export interface MessageReactionProps {
    /** The emoji character of the reaction. */
    emoji: string;
    /** Accessible name of the emoji, e.g. `Red heart`. */
    label: string;
    /** How many people reacted. Hidden when only one person did. */
    count?: number;
    /** Additional classes merged onto the reaction. */
    className?: string;
}

/** One emoji reaction, with the number of people who added it. */
const MessageReaction = ({ emoji, label, count, className }: MessageReactionProps) => (
    <li className={cx("bg-secondary ring-secondary flex h-6 items-center gap-1 rounded-2xl px-2 py-0.5 ring-1 ring-inset", className)}>
        <span role="img" aria-label={label}>
            {emoji}
        </span>
        {count !== undefined && count > 1 && <span className="text-secondary text-sm font-medium">{count}</span>}
    </li>
);

export interface MessageTypingProps {
    /** Accessible description of what is happening. */
    label?: string;
    /** Additional classes merged onto the indicator. */
    className?: string;
}

/** The three bouncing dots shown while the sender is still writing. */
const MessageTyping = ({ label = "Typing...", className }: MessageTypingProps) => {
    const direction = useContext(MessageContext);

    return (
        <div
            role="status"
            className={cx(
                "bg-secondary text-md text-primary ring-secondary flex h-7 w-10 items-center justify-center gap-1 self-start rounded-lg ring-1 ring-inset",
                styles.corner[direction],
                className,
            )}
        >
            <span className="sr-only">{label}</span>
            <span aria-hidden="true" className="bg-fg-tertiary size-1 animate-bounce rounded-full [animation-delay:-0.3s] motion-reduce:animate-none" />
            <span aria-hidden="true" className="bg-fg-quaternary size-1 animate-bounce rounded-full [animation-delay:-0.15s] motion-reduce:animate-none" />
            <span aria-hidden="true" className="bg-fg-tertiary size-1 animate-bounce rounded-full motion-reduce:animate-none" />
        </div>
    );
};

export const MessageList = Object.assign(MessageListRoot, {
    Divider: MessageListDivider,
});

export const Message = Object.assign(MessageRoot, {
    Bubble: MessageBubble,
    Quote: MessageQuote,
    File: MessageFile,
    Audio: MessageAudio,
    Image: MessageImage,
    LinkPreview: MessageLinkPreview,
    LinkCard: MessageLinkCard,
    Reactions: MessageReactions,
    Reaction: MessageReaction,
    Typing: MessageTyping,
});
