"use client";

import { Fragment } from "react";
import {
    BarChartSquare02,
    Calendar as CalendarIcon,
    CheckDone01,
    ChevronRight,
    File05,
    HomeLine,
    PieChart03,
    Rows01,
    SearchLg,
    Users01,
} from "@properui/icons";
import { LOGOS } from "../../../utils/demo-assets";
import type { NavItemType } from "../../application/app-navigation/config";
import { SidebarNavigationSectionsSubheadings } from "../../application/app-navigation/sidebar-navigation/sidebar-sections-subheadings";
import { Breadcrumbs } from "../../application/breadcrumbs/breadcrumbs";
import { Calendar } from "../../application/date-picker/calendar";
import {
    CalendarAppHeader,
    EventDetailPanel,
    HOURS,
    MINI_CALENDAR_HIGHLIGHTS,
    TODAY,
    WeekStripNav,
    formatHourLabel,
} from "../../application/date-picker/calendar-app-shared";
import { Tabs } from "../../application/tabs/tabs";
import { Avatar } from "../../base/avatar/avatar";
import { Badge } from "../../base/badges/badges";
import { Button } from "../../base/buttons/button";
import { Input } from "../../base/input/input";

const teamBadge = (shortcut: string) => (
    <div className="flex items-center gap-3">
        <Badge size="sm" type="modern">
            {shortcut}
        </Badge>
        <ChevronRight aria-hidden="true" className="text-fg-quaternary size-4 rtl:-scale-x-100" />
    </div>
);

const teamIcon = (index: number) => {
    const logo = LOGOS[index]!;
    const TeamIcon = () => <Avatar src={logo.src} alt={logo.name} className="me-2 size-5" />;
    TeamIcon.displayName = `TeamIcon(${logo.name})`;
    return TeamIcon;
};

const navItems: Array<{ label: string; items: NavItemType[] }> = [
    {
        label: "General",
        items: [
            { label: "Dashboard", href: "/", icon: BarChartSquare02 },
            { label: "Projects", href: "/projects", icon: Rows01 },
            { label: "Documents", href: "/documents", icon: File05 },
            { label: "Calendar", href: "/calendar", icon: CalendarIcon },
        ],
    },
    {
        label: "Proper UI",
        items: [
            { label: "Reporting", href: "/reporting", icon: PieChart03 },
            {
                label: "Tasks",
                href: "/tasks",
                icon: CheckDone01,
                badge: (
                    <Badge size="sm" type="modern">
                        8
                    </Badge>
                ),
            },
            { label: "Users", href: "/users", icon: Users01 },
        ],
    },
    {
        label: "Your teams",
        items: LOGOS.slice(0, 4).map((logo, index) => ({
            label: logo.name,
            href: `/teams/${logo.name.toLowerCase()}`,
            icon: teamIcon(index),
            badge: teamBadge(`⌘${index + 1}`),
        })),
    },
];

const tabs = [
    { id: "all", label: "All events" },
    { id: "shared", label: "Shared" },
    { id: "public", label: "Public" },
    { id: "archived", label: "Archived" },
];

/** Informational page 10 — personal calendar day view with a mini calendar and event details panel. */
export const Informational10 = () => (
    <div className="bg-primary flex flex-col lg:flex-row">
        <SidebarNavigationSectionsSubheadings activeUrl="/calendar" items={navItems} />

        <main className="bg-secondary lg:bg-primary min-w-0 flex-1 pt-8 pb-12 shadow-none">
            <div className="max-w-container mx-auto mb-8 flex flex-col gap-5 px-4 lg:px-8">
                <div className="relative flex flex-col gap-4">
                    <div className="max-lg:hidden">
                        <Breadcrumbs type="text" aria-label="Breadcrumbs">
                            <Breadcrumbs.Item href="/" icon={HomeLine} aria-label="Home" />
                            <Breadcrumbs.Item href="/">Proper UI</Breadcrumbs.Item>
                            <Breadcrumbs.Item href="/calendar">Calendar</Breadcrumbs.Item>
                        </Breadcrumbs>
                    </div>

                    <div className="flex lg:hidden">
                        <Button color="link-gray" size="sm" href="/">
                            Back
                        </Button>
                    </div>

                    <div className="flex flex-col gap-4 lg:flex-row">
                        <div className="flex flex-1 flex-col gap-0.5">
                            <p className="text-primary text-xl font-semibold">Calendar</p>
                        </div>

                        <Input
                            shortcut
                            size="sm"
                            aria-label="Search events"
                            placeholder="Search"
                            icon={SearchLg}
                            className="w-full max-md:hidden md:max-w-70"
                        />
                        <Input size="md" aria-label="Search events" placeholder="Search" icon={SearchLg} className="w-full md:hidden" />
                    </div>
                </div>

                <div className="flex w-max flex-col self-start">
                    <Tabs defaultSelectedKey="all">
                        <Tabs.List type="button-minimal" items={tabs}>
                            {(tab) => <Tabs.Item {...tab} />}
                        </Tabs.List>
                        {tabs.map((tab) => (
                            <Tabs.Panel key={tab.id} id={tab.id} />
                        ))}
                    </Tabs>
                </div>
            </div>

            <div className="max-w-container mx-auto flex flex-col lg:gap-8 lg:px-8">
                <div className="border-secondary bg-primary flex h-[912px] w-full overflow-hidden border shadow-xs max-lg:border-x-0 lg:rounded-xl">
                    <div className="flex flex-1 flex-col overflow-hidden">
                        <CalendarAppHeader monthAbbr="SEPT" dayOfMonth={9} title="September 2026" weekLabel="Week 2" subtitle="Wednesday" view="Day view" />

                        <WeekStripNav selectedDay={9} />

                        <div className="flex-1 overflow-y-auto">
                            <div className="grid grid-cols-[64px_1fr]">
                                {HOURS.map((hour) => (
                                    <Fragment key={hour}>
                                        <div className="border-secondary text-tertiary border-t px-2 py-4 text-end text-xs">{formatHourLabel(hour)}</div>
                                        <div className="border-secondary h-16 border-s border-t" />
                                    </Fragment>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="border-secondary hidden w-[340px] shrink-0 flex-col overflow-y-auto border-s lg:flex">
                        <div className="p-4">
                            <Calendar highlightedDates={MINI_CALENDAR_HIGHLIGHTS} defaultValue={TODAY} defaultFocusedValue={TODAY}>
                                <></>
                            </Calendar>
                        </div>

                        <EventDetailPanel
                            title="Product demo"
                            dateLabel="Wednesday, Sept 9, 2026"
                            timeLabel="1:30 PM – 3:30 PM"
                            reminderLabel="10 min before"
                            guestCount={6}
                            yesCount={5}
                            awaitingCount={1}
                            description="Sienna is inviting you to a scheduled video meeting about the new dashboard."
                            meetingUrl="https://meet.proper.example/product-demo"
                        />
                    </div>
                </div>
            </div>
        </main>
    </div>
);
