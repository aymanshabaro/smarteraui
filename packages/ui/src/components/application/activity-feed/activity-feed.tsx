"use client";

import type { ComponentProps, ReactNode } from "react";
import { createContext, useContext } from "react";
import { FileIcon } from "@untitledui/file-icons";
import { Link as AriaLink } from "react-aria-components";
import { Avatar } from "@/components/base/avatar/avatar";
import { Button } from "@/components/base/buttons/button";
import { Dot } from "@/components/foundations/dot-icon";
import { cx, sortCx } from "@/utils/cx";

const styles = sortCx({
    // The three treatments only differ in how the entries are separated from one another.
    list: {
        divided: "flex flex-col gap-4 divide-y divide-border-secondary",
        connected: "",
        spaced: "flex flex-col gap-8",
    },
    item: {
        divided: "pb-4 last-of-type:pb-0",
        connected: "",
        spaced: "",
    },
    // In the connected treatment the trailing space belongs to the entry so the dotted
    // line can run through it. The last entry has no line, so it drops the space too.
    content: {
        divided: "",
        connected: "pb-8 group-last/item:pb-0",
        spaced: "",
    },
    message: {
        divided: "p-3",
        connected: "px-3 py-2.5",
        spaced: "p-3",
    },

    name: "rounded text-sm font-medium text-secondary outline-focus-ring focus-visible:outline-2 focus-visible:outline-offset-2",
    time: "text-xs text-tertiary",
    action: "text-sm text-tertiary",
});

/** How the entries of a feed are separated from one another. */
export type ActivityFeedType = keyof typeof styles.list;

const ActivityFeedContext = createContext<ActivityFeedType>("divided");

export interface ActivityFeedProps {
    /**
     * How the entries are separated: a divider line, a dotted connector, or plain space.
     *
     * @default "divided"
     */
    type?: ActivityFeedType;
    /** The accessible label of the list. */
    "aria-label"?: string;
    /** `ActivityFeed.Item` entries. */
    children: ReactNode;
    /** Additional classes merged onto the list element. */
    className?: string;
}

const ActivityFeedRoot = ({ type = "divided", className, children, ...props }: ActivityFeedProps) => (
    <ActivityFeedContext.Provider value={type}>
        <ul {...props} className={cx(styles.list[type], className)}>
            {children}
        </ul>
    </ActivityFeedContext.Provider>
);

/** The dotted line that links one entry to the next in the `connected` treatment. */
const ActivityFeedConnector = () => (
    <div className="relative my-1 flex h-full w-full justify-center self-center overflow-hidden group-last/item:hidden">
        <svg width="2.4" className="absolute" aria-hidden="true">
            <line x1="1.2" x2="1.2" y1="1.2" y2="100%" strokeWidth="2.4" strokeDasharray="0,6" strokeLinecap="round" className="stroke-border-primary" />
        </svg>
    </div>
);

export interface ActivityFeedItemProps {
    /** The name of the person the entry belongs to. */
    name: string;
    /** Link target of the name. Renders plain text when omitted. */
    href?: string;
    /** Avatar image of the person. */
    avatarSrc?: string;
    /** Presence dot rendered on the avatar. */
    status?: "online" | "offline";
    /** Human readable timestamp, e.g. `2 mins ago`. */
    time: string;
    /** Machine readable value of the `<time>` element. Falls back to `time`. */
    dateTime?: string;
    /** The sentence describing the activity, rendered under the name. */
    action?: ReactNode;
    /** Marks the entry as unread and renders a dot at the end of the row. */
    isUnread?: boolean;
    /** Attachments, labels or messages rendered under the header. */
    children?: ReactNode;
    /** Additional classes merged onto the list item. */
    className?: string;
}

const ActivityFeedItem = ({ name, href, avatarSrc, status, time, dateTime, action, isUnread, className, children }: ActivityFeedItemProps) => {
    const type = useContext(ActivityFeedContext);

    return (
        <li className={cx("group/item", styles.item[type], className)}>
            <article className="relative flex gap-3">
                {isUnread && <Dot size="md" aria-label="Unread" role="img" className="text-fg-success-secondary absolute end-0 top-0" />}

                <div className="flex shrink-0 flex-col">
                    <Avatar size="md" src={avatarSrc} alt={name} status={status} />
                    {type === "connected" && <ActivityFeedConnector />}
                </div>

                <div className={cx("flex flex-1 flex-col gap-3", styles.content[type])}>
                    <header>
                        <div className="flex items-center gap-2">
                            {href ? (
                                <AriaLink href={href} className={styles.name}>
                                    {name}
                                </AriaLink>
                            ) : (
                                <span className={styles.name}>{name}</span>
                            )}
                            <time dateTime={dateTime ?? time} className={styles.time}>
                                {time}
                            </time>
                        </div>
                        {action && <p className={styles.action}>{action}</p>}
                    </header>

                    {children}
                </div>
            </article>
        </li>
    );
};

export interface ActivityFeedLinkProps {
    /** Link target. */
    href: string;
    /** Link label. */
    children: ReactNode;
    /** Additional classes merged onto the link. */
    className?: string;
}

/** An inline brand-coloured link, for the project or person named inside an entry's sentence. */
const ActivityFeedLink = ({ href, children, className }: ActivityFeedLinkProps) => (
    <Button href={href} size="sm" color="link-color" className={cx("inline text-sm font-medium whitespace-normal", className)}>
        {children}
    </Button>
);

export interface ActivityFeedFileProps {
    /** The file name. */
    name: string;
    /** Human readable file size, e.g. `720 KB`. */
    size: string;
    /** The file type driving the icon, e.g. `pdf`, `txt`, `mp4`. */
    type?: ComponentProps<typeof FileIcon>["type"];
    /** Additional classes merged onto the figure. */
    className?: string;
}

/** An attachment rendered under an entry's sentence. */
const ActivityFeedFile = ({ name, size, type = "empty", className }: ActivityFeedFileProps) => (
    <figure className={cx("flex gap-3", className)}>
        {/* The file icons are fixed artwork rather than currentColor glyphs, so the light/dark
            pair has to be swapped by hand — no semantic token can express it. */}
        <FileIcon type={type} theme="light" size={40} aria-hidden="true" className="size-10 dark:hidden" />
        <FileIcon type={type} theme="dark" size={40} aria-hidden="true" className="size-10 not-dark:hidden" />
        <figcaption>
            <p className="text-secondary text-sm font-medium">{name}</p>
            <p className="text-tertiary text-sm">{size}</p>
        </figcaption>
    </figure>
);

export interface ActivityFeedSlotProps {
    /** The content of the slot. */
    children: ReactNode;
    /** Additional classes merged onto the root element. */
    className?: string;
}

/** A row of `Badge`s describing the labels touched by an entry. */
const ActivityFeedLabels = ({ children, className }: ActivityFeedSlotProps) => <div className={cx("flex gap-1", className)}>{children}</div>;

/** A chat bubble, for feeds that read as a conversation. */
const ActivityFeedMessage = ({ children, className }: ActivityFeedSlotProps) => {
    const type = useContext(ActivityFeedContext);

    return (
        <section className={cx("ring-secondary rounded-lg rounded-ss-none ring-1 ring-inset", styles.message[type], className)}>
            <p className="text-secondary text-sm">{children}</p>
        </section>
    );
};

/** A quoted message rendered as plain copy under an entry's sentence. */
const ActivityFeedQuote = ({ children, className }: ActivityFeedSlotProps) => <p className={cx("text-secondary text-sm", className)}>{children}</p>;

export const ActivityFeed = Object.assign(ActivityFeedRoot, {
    Item: ActivityFeedItem,
    Link: ActivityFeedLink,
    File: ActivityFeedFile,
    Labels: ActivityFeedLabels,
    Message: ActivityFeedMessage,
    Quote: ActivityFeedQuote,
});
