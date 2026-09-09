"use client";

import { Fragment } from "react";
import { SearchLg } from "@smarteraui/icons";
import { CalendarAppHeader, HOURS, WEEK_DAYS, WeekStripNav, formatHourLabel } from "@/components/application/date-picker/calendar-app-shared";
import { Tabs } from "@/components/application/tabs/tabs";
import { Input } from "@/components/base/input/input";
import { cx } from "@/utils/cx";
import { AppHeader, navItemsWith } from "./shell.a";

const navItems = navItemsWith(3, { label: "Calendar", href: "/calendar" });

const tabs = [
    { id: "all", label: "All events" },
    { id: "shared", label: "Shared" },
    { id: "public", label: "Public" },
    { id: "archived", label: "Archived" },
];

/** Informational page 09 — a scrolling week view calendar application under the header navigation. */
export const Informational09 = () => (
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
                        subtitle="7 Sept 2026 – 13 Sept 2026"
                        view="Week view"
                    />

                    <WeekStripNav selectedDay={9} />

                    <div className="flex-1 overflow-y-auto">
                        <div className="grid grid-cols-[64px_repeat(7,1fr)]">
                            {HOURS.map((hour) => (
                                <Fragment key={hour}>
                                    <div className="border-secondary text-tertiary border-t px-2 py-4 text-end text-xs">{formatHourLabel(hour)}</div>
                                    {WEEK_DAYS.map((day, index) => (
                                        <div key={`${hour}-${day}`} className={cx("border-secondary h-16 border-t", index !== 0 && "border-s")} />
                                    ))}
                                </Fragment>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>
);
