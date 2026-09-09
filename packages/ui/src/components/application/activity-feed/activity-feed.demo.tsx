"use client";

import type { ReactNode } from "react";
import type { ActivityFeedType } from "@/components/application/activity-feed/activity-feed";
import { ActivityFeed } from "@/components/application/activity-feed/activity-feed";
import { Badge } from "@/components/base/badges/badges";
import { avatar } from "@/utils/demo-assets";

const project = <ActivityFeed.Link href="#">Marketing site redesign</ActivityFeed.Link>;

interface Entry {
    person: ReturnType<typeof avatar>;
    time: string;
    action: ReactNode;
    status: "online" | "offline";
    isUnread?: boolean;
    content?: ReactNode;
}

const activity: Entry[] = [
    {
        person: avatar(1),
        time: "Just now",
        action: <>Added a file to {project}</>,
        status: "online",
        isUnread: true,
        content: <ActivityFeed.File type="pdf" name="Tech requirements.pdf" size="720 KB" />,
    },
    {
        person: avatar(2),
        time: "2 mins ago",
        action: (
            <>
                Was invited to the team by <ActivityFeed.Link href="#">{avatar(0).name}</ActivityFeed.Link>
            </>
        ),
        status: "offline",
        isUnread: true,
    },
    {
        person: avatar(3),
        time: "2 mins ago",
        action: (
            <>
                Was invited to the team by <ActivityFeed.Link href="#">{avatar(0).name}</ActivityFeed.Link>
            </>
        ),
        status: "online",
        isUnread: true,
    },
    { person: avatar(4), time: "3 hours ago", action: <>Commented in {project}</>, status: "offline", isUnread: true },
    { person: avatar(4), time: "3 hours ago", action: <>Was added to {project}</>, status: "offline" },
    {
        person: avatar(5),
        time: "6 hours ago",
        action: <>Added 3 labels to the project {project}</>,
        status: "online",
        content: (
            <ActivityFeed.Labels>
                <Badge size="sm" color="brand">
                    Design
                </Badge>
                <Badge size="sm" color="blue">
                    Product
                </Badge>
                <Badge size="sm" color="indigo">
                    Marketing
                </Badge>
            </ActivityFeed.Labels>
        ),
    },
    {
        person: avatar(5),
        time: "6 hours ago",
        action: (
            <>
                Invited to the team <ActivityFeed.Link href="#">{avatar(2).name}</ActivityFeed.Link>
            </>
        ),
        status: "online",
    },
    { person: avatar(7), time: "11 hours ago", action: <>Created 7 tasks in {project}</>, status: "online" },
    {
        person: avatar(6),
        time: "12 hours ago",
        action: <>Added a file to {project}</>,
        status: "online",
        content: <ActivityFeed.File type="txt" name="Design brief and ideas.txt" size="2.2 MB" />,
    },
    { person: avatar(6), time: "12 hours ago", action: <>Created the project {project}</>, status: "online" },
    {
        person: avatar(9),
        time: "5:20pm 20 Jan 2027",
        action: "Sent you a message",
        status: "online",
        content: <ActivityFeed.Quote>&ldquo;We should ask Oli about this today.&rdquo;</ActivityFeed.Quote>,
    },
    {
        person: avatar(10),
        time: "4:16pm 20 Jan 2027",
        action: "Sent you a file",
        status: "online",
        content: <ActivityFeed.File type="mp4" name="Prototype draft 03.mp4" size="6.6 MB" />,
    },
    {
        person: avatar(10),
        time: "4:16pm 20 Jan 2027",
        action: "Sent you a message",
        status: "online",
        content: <ActivityFeed.Quote>{avatar(0).username} This is starting to look really good! I&rsquo;ll polish it up a bit and send it.</ActivityFeed.Quote>,
    },
    {
        person: avatar(11),
        time: "2 mins ago",
        action: (
            <>
                Invited to the team <ActivityFeed.Link href="#">{avatar(0).name}</ActivityFeed.Link>
            </>
        ),
        status: "online",
    },
    {
        person: avatar(0),
        time: "2 mins ago",
        action: (
            <>
                Invited to the team <ActivityFeed.Link href="#">{avatar(11).name}</ActivityFeed.Link>
            </>
        ),
        status: "online",
        isUnread: true,
    },
];

const messages: Entry[] = [
    {
        person: avatar(0),
        time: "Just now",
        status: "online",
        isUnread: true,
        action: avatar(0).username,
        content: <ActivityFeed.Message>Looks good!</ActivityFeed.Message>,
    },
    {
        person: avatar(1),
        time: "2 mins ago",
        status: "offline",
        isUnread: true,
        action: avatar(1).username,
        content: <ActivityFeed.Message>Thanks so much, happy with that.</ActivityFeed.Message>,
    },
    {
        person: avatar(2),
        time: "2 mins ago",
        status: "online",
        isUnread: true,
        action: avatar(2).username,
        content: <ActivityFeed.Message>Got you a coffee</ActivityFeed.Message>,
    },
    {
        person: avatar(3),
        time: "3 hours ago",
        status: "offline",
        action: avatar(3).username,
        content: <ActivityFeed.Message>Great to see you again!</ActivityFeed.Message>,
    },
    {
        person: avatar(4),
        time: "6 hours ago",
        status: "online",
        action: avatar(4).username,
        content: <ActivityFeed.Message>We should ask Oli about this&hellip;</ActivityFeed.Message>,
    },
    {
        person: avatar(5),
        time: "12 hours ago",
        status: "online",
        action: avatar(5).username,
        content: <ActivityFeed.Message>Okay, see you then.</ActivityFeed.Message>,
    },
    {
        person: avatar(6),
        time: "3:42pm 20 Jan 2027",
        status: "online",
        action: avatar(6).username,
        content: <ActivityFeed.File type="pdf" name="Datasheet_draft_02.pdf" size="720 KB" />,
    },
    {
        person: avatar(7),
        time: "3:42pm 20 Jan 2027",
        status: "online",
        action: avatar(7).username,
        content: <ActivityFeed.Message>We should ask Oli about this&hellip;</ActivityFeed.Message>,
    },
    {
        person: avatar(8),
        time: "2:12pm 20 Jan 2027",
        status: "online",
        action: avatar(8).username,
        content: <ActivityFeed.Message>That sounds like a good plan!</ActivityFeed.Message>,
    },
    {
        person: avatar(9),
        time: "12:10pm 20 Jan 2027",
        status: "online",
        action: avatar(9).username,
        content: <ActivityFeed.Message>Yep! That checks out.</ActivityFeed.Message>,
    },
    {
        person: avatar(10),
        time: "11:38am 20 Jan 2027",
        status: "online",
        action: avatar(10).username,
        content: <ActivityFeed.Message>We should ask Oli about this today.</ActivityFeed.Message>,
    },
    {
        person: avatar(11),
        time: "11:30am 20 Jan 2027",
        status: "online",
        action: avatar(11).username,
        content: <ActivityFeed.File type="jpg" name="Design screenshot.jpg" size="720 KB" />,
    },
    {
        person: avatar(12),
        time: "10:02am 20 Jan 2027",
        status: "online",
        action: avatar(12).username,
        content: <ActivityFeed.Message>Thanks for helping out with that!</ActivityFeed.Message>,
    },
    {
        person: avatar(13),
        time: "9:40am 20 Jan 2027",
        status: "online",
        action: avatar(13).username,
        content: <ActivityFeed.Message>Hey I&rsquo;ve sent everything off now. All done.</ActivityFeed.Message>,
    },
    {
        person: avatar(14),
        time: "9:24am 20 Jan 2027",
        status: "online",
        action: avatar(14).username,
        content: (
            <ActivityFeed.Message>Hey {avatar(0).username}&mdash;just wanted to say thanks for your help on this. Really buried under!</ActivityFeed.Message>
        ),
    },
];

const Feed = ({ type, label, entries }: { type: ActivityFeedType; label: string; entries: Entry[] }) => (
    <div className="scrollbar-hide absolute inset-0 overflow-auto px-4 py-10 md:px-8">
        <div className="mx-auto w-full max-w-md">
            <ActivityFeed type={type} aria-label={label}>
                {entries.map((entry, index) => (
                    <ActivityFeed.Item
                        key={`${entry.person.name}-${index}`}
                        name={entry.person.name}
                        avatarSrc={entry.person.src}
                        href="#"
                        status={entry.status}
                        time={entry.time}
                        action={entry.action}
                        isUnread={entry.isUnread}
                    >
                        {entry.content}
                    </ActivityFeed.Item>
                ))}
            </ActivityFeed>
        </div>
    </div>
);

export const ActivityFeedExample = () => <Feed type="divided" label="Recent activity" entries={activity} />;

export const ActivityFeedDivided = () => <Feed type="divided" label="Recent activity" entries={activity} />;

export const ActivityFeedConnected = () => <Feed type="connected" label="Recent activity" entries={activity} />;

export const ActivityFeedSpaced = () => <Feed type="spaced" label="Recent activity" entries={activity} />;

export const MessagesDivided = () => <Feed type="divided" label="Messages" entries={messages} />;

export const MessagesConnected = () => <Feed type="connected" label="Messages" entries={messages} />;

export const MessagesSpaced = () => <Feed type="spaced" label="Messages" entries={messages} />;
