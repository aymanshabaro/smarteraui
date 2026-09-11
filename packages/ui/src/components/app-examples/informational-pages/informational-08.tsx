"use client";

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
import { cx } from "../../../utils/cx";
import { LOGOS } from "../../../utils/demo-assets";
import type { NavItemType } from "../../application/app-navigation/config";
import { SidebarNavigationSectionsSubheadings } from "../../application/app-navigation/sidebar-navigation/sidebar-sections-subheadings";
import { Breadcrumbs } from "../../application/breadcrumbs/breadcrumbs";
import { CalendarAppHeader, EventChip, MONTH_EVENTS, MONTH_GRID, WEEKDAYS_SHORT } from "../../application/date-picker/calendar-app-shared";
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

/** Informational page 08 — calendar month view with sidebar navigation, breadcrumbs and event tabs. */
export const Informational08 = () => (
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
                <div className="border-secondary bg-primary flex h-[912px] w-full flex-col overflow-hidden border shadow-xs max-lg:border-x-0 lg:rounded-xl">
                    <CalendarAppHeader
                        monthAbbr="SEPT"
                        dayOfMonth={9}
                        title="September 2026"
                        weekLabel="Week 2"
                        subtitle="1 Sept 2026 – 30 Sept 2026"
                        view="Month view"
                    />

                    <div className="grid grid-cols-7">
                        {WEEKDAYS_SHORT.map((day, index) => (
                            <div
                                key={day}
                                className={cx("border-secondary text-tertiary border-b py-2 text-center text-sm font-medium", index !== 0 && "border-s")}
                            >
                                {day}
                            </div>
                        ))}
                    </div>

                    <div className="grid flex-1 grid-cols-7 grid-rows-5 overflow-y-auto">
                        {MONTH_GRID.map((cell, index) => {
                            const events = MONTH_EVENTS[cell.key] ?? [];
                            const isToday = cell.isCurrentMonth && cell.day === 9;
                            const visibleEvents = events.slice(0, 3);
                            const overflowCount = events.length - visibleEvents.length;

                            return (
                                <div
                                    key={cell.key}
                                    className={cx(
                                        "border-secondary flex flex-col gap-1 border-t p-2",
                                        index % 7 !== 0 && "border-s",
                                        !cell.isCurrentMonth && "bg-secondary/40",
                                    )}
                                >
                                    <span
                                        className={cx(
                                            "flex size-6 items-center justify-center rounded-full text-sm font-medium",
                                            isToday ? "bg-brand-solid text-white" : cell.isCurrentMonth ? "text-secondary" : "text-quaternary",
                                        )}
                                    >
                                        {cell.day}
                                    </span>

                                    <div className="flex flex-col gap-1">
                                        {visibleEvents.map((event) => (
                                            <EventChip key={event.id} event={event} />
                                        ))}
                                        {overflowCount > 0 && <span className="text-tertiary px-1.5 text-xs font-medium">+{overflowCount} more</span>}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </main>
    </div>
);
