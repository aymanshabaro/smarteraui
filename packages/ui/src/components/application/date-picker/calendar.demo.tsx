"use client";

import { Fragment } from "react";
import { cx } from "@/utils/cx";
import { Calendar } from "./calendar";
import {
    CalendarAppHeader,
    EventChip,
    EventDetailPanel,
    HOURS,
    MINI_CALENDAR_HIGHLIGHTS,
    MONTH_EVENTS,
    MONTH_GRID,
    TODAY,
    WEEKDAYS_SHORT,
    WEEK_DAYS,
    WeekStripNav,
    formatHourLabel,
} from "./calendar-app-shared";

const MonthCalendarView = () => (
    <div className="border-secondary bg-primary flex h-[912px] w-full flex-col overflow-hidden rounded-xl border shadow-xs">
        <CalendarAppHeader monthAbbr="SEPT" dayOfMonth={9} title="September 2026" weekLabel="Week 2" subtitle="1 Sept 2026 – 30 Sept 2026" view="Month view" />

        <div className="grid grid-cols-7">
            {WEEKDAYS_SHORT.map((day, index) => (
                <div key={day} className={cx("border-secondary text-tertiary border-b py-2 text-center text-sm font-medium", index !== 0 && "border-l")}>
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
                            index % 7 !== 0 && "border-l",
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
);

/** Example 1: `calendar-example` — the default calendar app view (month view). */
export const CalendarExample = () => <MonthCalendarView />;

/** Example 2: `calendar-month-view`. */
export const CalendarMonthView = () => <MonthCalendarView />;

/** Example 3: `calendar-week-view`. */
export const CalendarWeekView = () => (
    <div className="border-secondary bg-primary flex h-[912px] w-full flex-col overflow-hidden rounded-xl border shadow-xs">
        <CalendarAppHeader monthAbbr="SEPT" dayOfMonth={9} title="September 2026" weekLabel="Week 2" subtitle="7 Sept 2026 – 13 Sept 2026" view="Week view" />

        <WeekStripNav selectedDay={9} />

        <div className="flex-1 overflow-y-auto">
            <div className="grid grid-cols-[64px_repeat(7,1fr)]">
                {HOURS.map((hour) => (
                    <Fragment key={hour}>
                        <div className="border-secondary text-tertiary border-t px-2 py-4 text-right text-xs">{formatHourLabel(hour)}</div>
                        {WEEK_DAYS.map((day, index) => (
                            <div key={`${hour}-${day}`} className={cx("border-secondary h-16 border-t", index !== 0 && "border-l")} />
                        ))}
                    </Fragment>
                ))}
            </div>
        </div>
    </div>
);

/** Example 4: `calendar-day-view`. */
export const CalendarDayView = () => (
    <div className="border-secondary bg-primary flex h-[912px] w-full overflow-hidden rounded-xl border shadow-xs">
        <div className="flex flex-1 flex-col overflow-hidden">
            <CalendarAppHeader monthAbbr="SEPT" dayOfMonth={9} title="September 2026" weekLabel="Week 2" subtitle="Wednesday" view="Day view" />

            <WeekStripNav selectedDay={9} />

            <div className="flex-1 overflow-y-auto">
                <div className="grid grid-cols-[64px_1fr]">
                    {HOURS.map((hour) => (
                        <Fragment key={hour}>
                            <div className="border-secondary text-tertiary border-t px-2 py-4 text-right text-xs">{formatHourLabel(hour)}</div>
                            <div className="border-secondary h-16 border-t border-l" />
                        </Fragment>
                    ))}
                </div>
            </div>
        </div>

        <div className="border-secondary hidden w-[340px] shrink-0 flex-col overflow-y-auto border-l lg:flex">
            <div className="p-4">
                <Calendar highlightedDates={MINI_CALENDAR_HIGHLIGHTS} defaultValue={TODAY} defaultFocusedValue={TODAY}>
                    <></>
                </Calendar>
            </div>

            <EventDetailPanel
                title="Product demo"
                dateLabel="Friday, Jan 10, 2027"
                timeLabel="1:30 PM – 3:30 PM"
                reminderLabel="10 min before"
                guestCount={6}
                yesCount={5}
                awaitingCount={1}
                description={
                    <>
                        Sienna is inviting you to a scheduled Zoom meeting.
                        <br />
                        Topic: Product demo for the new dashboard and Q&amp;A session.
                    </>
                }
                meetingUrl="https://us02web.zoom.us/j/86341969512"
            />
        </div>
    </div>
);
