"use client";

import { SearchLg } from "@properui/icons";
import { cx } from "../../../utils/cx";
import { CalendarAppHeader, EventChip, MONTH_EVENTS, MONTH_GRID, WEEKDAYS_SHORT } from "../../application/date-picker/calendar-app-shared";
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

/** Informational page 08 — a full-month calendar grid under the header navigation. */
export const Informational08 = () => (
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

                <div className="border-secondary bg-primary flex h-228 w-full flex-col overflow-hidden border shadow-xs max-lg:border-x-0 lg:rounded-xl">
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
