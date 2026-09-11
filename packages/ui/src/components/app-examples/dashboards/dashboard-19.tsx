"use client";

import type { ReactNode } from "react";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Command, Edit01, Paperclip } from "@properui/icons";
import { cx } from "../../../utils/cx";
import { AVATARS, avatar } from "../../../utils/demo-assets";
import { SidebarNavigationSlim } from "../../application/app-navigation/sidebar-navigation/sidebar-slim";
import { ChartTooltipContent } from "../../application/charts/charts-base";
import { MessageComposer } from "../../application/messaging/message-composer";
import { Message, MessageList } from "../../application/messaging/messaging";
import { BadgeWithDot } from "../../base/badges/badges";
import { Button } from "../../base/buttons/button";
import { ButtonUtility } from "../../base/buttons/button-utility";
import { Dropdown } from "../../base/dropdown/dropdown";
import { RangeTabs, currentUser, navFooterItemsWithIcons, navItemsDualTier, styles } from "./dashboards-shared";

/** Daily profile-view counts for July, two overlapping series so the trend reads as "vs last month". */
const profileViews = Array.from({ length: 30 }, (_, index) => {
    const day = index + 1;
    return {
        date: `${day} Jul`,
        current: 420 + ((day * 53) % 420),
        previous: 380 + ((day * 41) % 380),
    };
});

const profileViewsPresets = [
    { id: "12-months", long: "12 months" },
    { id: "30-days", long: "30 days" },
    { id: "7-days", long: "7 days" },
] as const;

interface Fan {
    name: string;
    username: string;
    src: string;
    likes: number;
}

const biggestFans: Fan[] = [
    { name: AVATARS[1].name, username: AVATARS[1].username, src: AVATARS[1].src, likes: 24 },
    { name: AVATARS[2].name, username: AVATARS[2].username, src: AVATARS[2].src, likes: 22 },
    { name: AVATARS[3].name, username: AVATARS[3].username, src: AVATARS[3].src, likes: 22 },
    { name: AVATARS[4].name, username: AVATARS[4].username, src: AVATARS[4].src, likes: 20 },
    { name: AVATARS[5].name, username: AVATARS[5].username, src: AVATARS[5].src, likes: 18 },
    { name: AVATARS[6].name, username: AVATARS[6].username, src: AVATARS[6].src, likes: 16 },
];

const favoriteDesigners: Fan[] = [
    { name: AVATARS[8].name, username: AVATARS[8].username, src: AVATARS[8].src, likes: 46 },
    { name: AVATARS[9].name, username: AVATARS[9].username, src: AVATARS[9].src, likes: 40 },
    { name: AVATARS[10].name, username: AVATARS[10].username, src: AVATARS[10].src, likes: 36 },
    { name: AVATARS[11].name, username: AVATARS[11].username, src: AVATARS[11].src, likes: 34 },
    { name: AVATARS[7].name, username: AVATARS[7].username, src: AVATARS[7].src, likes: 30 },
    { name: AVATARS[2].name, username: AVATARS[2].username, src: AVATARS[2].src, likes: 28 },
];

const contact = avatar(2);

const composerTools = [
    { label: "Shortcuts", icon: Command },
    { label: "Attach", icon: Paperclip },
];

/** The daily two-series line chart above "Profile views". */
const ProfileViewsChart = () => (
    <figure aria-label="Profile views over the last 30 days" className="h-60 w-full">
        <ResponsiveContainer initialDimension={{ width: 1, height: 1 }} className="h-full">
            <LineChart data={profileViews} margin={{ top: 8, right: 0, bottom: 0, left: 0 }} className="text-tertiary [&_.recharts-text]:text-xs">
                <CartesianGrid vertical={false} stroke="currentColor" className="text-utility-neutral-100" />

                <XAxis dataKey="date" fill="currentColor" axisLine={false} tickLine={false} interval={3} padding={{ left: 10, right: 10 }} />
                <YAxis fill="currentColor" axisLine={false} tickLine={false} domain={[0, "dataMax + 200"]} width={40} />

                <Tooltip content={<ChartTooltipContent />} cursor={{ className: "stroke-utility-brand-600 stroke-2" }} />

                <Line
                    isAnimationActive={false}
                    className="text-utility-gray-900"
                    dataKey="current"
                    name="This month"
                    type="monotone"
                    stroke="currentColor"
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ className: "fill-bg-primary stroke-utility-gray-900 stroke-2" }}
                />
                <Line
                    isAnimationActive={false}
                    className="text-utility-purple-500"
                    dataKey="previous"
                    name="Last month"
                    type="monotone"
                    stroke="currentColor"
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ className: "fill-bg-primary stroke-utility-purple-500 stroke-2" }}
                />
            </LineChart>
        </ResponsiveContainer>
    </figure>
);

interface FanListProps {
    title: string;
    people: Fan[];
    menu: ReactNode;
}

/** The "Biggest fans" / "Favorite designers" list: an avatar row with a like count and an edit action. */
const FanList = ({ title, people, menu }: FanListProps) => (
    <div className="flex flex-1 flex-col gap-2 md:min-w-[320px]">
        <div className="border-secondary flex items-start justify-between border-b pb-5">
            <p className={styles.cardTitle}>{title}</p>
            {menu}
        </div>

        <ul className="flex flex-col">
            {people.map((person) => (
                <li key={person.username} className="border-secondary flex items-center gap-3 border-b py-4 last:border-0">
                    <img src={person.src} alt="" className="size-10 shrink-0 rounded-full object-cover" />
                    <div className="min-w-0 flex-1">
                        <p className="text-primary truncate text-sm font-medium">{person.name}</p>
                        <p className="text-tertiary truncate text-sm">{person.username}</p>
                    </div>
                    <span className="text-tertiary shrink-0 text-sm">{person.likes} likes</span>
                    <ButtonUtility size="xs" color="tertiary" tooltip="Edit" icon={Edit01} />
                </li>
            ))}
        </ul>

        <div className="pt-1">
            <Button color="link-color" size="md">
                View all
            </Button>
        </div>
    </div>
);

const ListMenu = () => (
    <Dropdown.Root>
        <Dropdown.DotsButton />
        <Dropdown.Popover className="w-40">
            <Dropdown.Menu>
                <Dropdown.Item>View all</Dropdown.Item>
                <Dropdown.Item>Export</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown.Popover>
    </Dropdown.Root>
);

/** Dashboard 19 — a creator's public stats profile, with a conversation panel pinned beside it. */
export const Dashboard19 = () => (
    <div className={styles.page}>
        <SidebarNavigationSlim activeUrl="/dashboard" items={navItemsDualTier} footerItems={navFooterItemsWithIcons} />

        <main className={cx(styles.main, "min-w-0 flex-1")}>
            <div className="flex flex-col gap-8">
                <div className={cx("border-secondary flex flex-col gap-4 border-b pb-4 lg:flex-row lg:items-center", styles.gutter)}>
                    <h1 className={cx(styles.pageTitle, "flex-1")}>Stats for {currentUser.name}</h1>

                    <div className="flex gap-3">
                        <Button color="secondary" size="md">
                            Messages
                        </Button>
                        <Button color="primary" size="md">
                            Edit
                        </Button>
                    </div>
                </div>

                <div className={cx("flex flex-col gap-6", styles.gutter)}>
                    <div className="border-secondary flex flex-col justify-between gap-4 border-b pb-5 lg:flex-row lg:items-center">
                        <p className={styles.cardTitle}>Profile views</p>
                        <RangeTabs presets={profileViewsPresets} defaultSelectedKey="30-days" type="button-border" label="Profile views period" />
                    </div>

                    <ProfileViewsChart />
                </div>

                <div className={cx("flex flex-col gap-8 md:flex-row md:flex-wrap", styles.gutter)}>
                    <FanList title="Biggest fans" people={biggestFans} menu={<ListMenu />} />
                    <FanList title="Favorite designers" people={favoriteDesigners} menu={<ListMenu />} />
                </div>
            </div>
        </main>

        <aside className="border-secondary bg-secondary_alt hidden shrink-0 flex-col lg:sticky lg:top-0 lg:flex lg:h-svh lg:w-100 lg:border-s">
            <div className="border-secondary bg-secondary_alt flex items-start justify-between gap-4 border-b px-4 py-5 lg:px-6">
                <div className="flex flex-col gap-0.5">
                    <div className="flex items-center gap-2">
                        <span className="text-primary text-md font-semibold">{contact.name}</span>
                        <BadgeWithDot size="sm" type="modern" color="success">
                            Online
                        </BadgeWithDot>
                    </div>
                    <p className="text-tertiary text-sm">Product designer</p>
                </div>
            </div>

            <MessageList aria-label={`Conversation with ${contact.name}`} className="flex-1 gap-y-4 overflow-y-auto px-4 py-6 *:first:mt-auto lg:px-6">
                <Message name={contact.name} avatarSrc={contact.src} status="online" time="Thursday 1:00pm" dateTime="2026-07-16T13:00">
                    <Message.Bubble>
                        Hey {currentUser.name.split(" ")[0]}. We&rsquo;re working on a dashboard prototype and love your work. Are you open to new projects?
                    </Message.Bubble>
                </Message>

                <MessageList.Divider>Today</MessageList.Divider>

                <Message direction="outgoing" name="You" time="10:02am" dateTime="2026-07-17T10:02" delivery="delivered">
                    <Message.Bubble>Thanks so much! I&rsquo;d love to hear more, feel free to send details whenever works.</Message.Bubble>
                </Message>

                <Message name={contact.name} avatarSrc={contact.src} status="online" time="10:05am" dateTime="2026-07-17T10:05">
                    <Message.Bubble>Amazing! I&rsquo;ll put together a brief and send it over this afternoon.</Message.Bubble>
                </Message>
            </MessageList>

            <div className="px-4 pb-4 lg:px-6 lg:pb-5">
                <MessageComposer
                    variant="advanced"
                    placeholder="Ask me anything..."
                    sender={{ name: currentUser.name.split(" ")[0]!, avatarSrc: currentUser.src }}
                    tools={composerTools}
                />
            </div>
        </aside>
    </div>
);
