"use client";

import { Fragment } from "react";
import { SearchLg } from "@properui/icons";
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
import { Input } from "../../base/input/input";
import { AppHeader, navItemsWith } from "./shell.a";

const navItems = navItemsWith(3, { label: "Calendar", href: "/calendar" });

const tabs = [
    { id: "all", label: "All events" },
    { id: "shared", label: "Shared" },
    { id: "public", label: "Public" },
    { id: "archived", label: "Archived" },
];

/** Informational page 10 — a personal day-view calendar with a mini calendar and event detail panel. */
export const Informational10 = () => (
    <div className="bg-primary flex flex-col">
        <AppHeader activeUrl="/calendar" items={navItems} actions="upgrade" />

        <main className="bg-primary max-w-container mx-auto flex w-full flex-col gap-8 pt-8 pb-12 lg:pt-12 lg:pb-24">
            <div className="flex flex-col gap-5 px-4 lg:px-8">
                <div className="flex flex-col gap-4 md:flex-row">
                    <h1 className="text-primary flex-1 text-xl font-semibold">My calendar</h1>

                    <Input shortcut size="sm" aria-label="Search" placeholder="Search" icon={SearchLg} className="w-full max-md:hidden md:max-w-70" />
                    <Input size="md" aria-label="Search" placeholder="Search" icon={SearchLg} className="w-full md:hidden" />
                </div>

                <div className="-mx-4 inline-flex w-full flex-col ps-4">
                    <Tabs defaultSelectedKey="all">
                        <Tabs.List type="underline" items={tabs}>
                            {(tab) => <Tabs.Item {...tab} />}
                        </Tabs.List>
                        {tabs.map((tab) => (
                            <Tabs.Panel key={tab.id} id={tab.id} />
                        ))}
                    </Tabs>
                </div>
            </div>

            <div className="lg:px-8">
                <h2 className="sr-only">Calendar</h2>

                <div className="border-secondary bg-primary flex h-228 w-full overflow-hidden border shadow-xs max-lg:border-x-0 lg:rounded-xl">
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

                    <div className="border-secondary hidden w-85 shrink-0 flex-col overflow-y-auto border-s lg:flex">
                        <div className="p-4">
                            <Calendar highlightedDates={MINI_CALENDAR_HIGHLIGHTS} defaultValue={TODAY} defaultFocusedValue={TODAY}>
                                <></>
                            </Calendar>
                        </div>

                        <EventDetailPanel
                            title="Product demo"
                            dateLabel="Wednesday, Sept 9, 2026"
                            timeLabel="1:30 PM - 3:30 PM"
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
