"use client";

// Shared building blocks for the "calendar examples" demos in `calendar.demo.tsx`. These are not
// part of the public `Calendar` / `RangeCalendar` API — `calendar.demo.tsx`'s `CalendarDayView` composes
// the ported `Calendar` into the bigger scheduling-app layout shown in the reference screenshots
// (`the project documentation`). Kept local to this task's folder.
import type { ReactNode } from "react";
import { useState } from "react";
import { CalendarDate } from "@internationalized/date";
import { Menu as AriaMenu, MenuItem as AriaMenuItem, MenuTrigger as AriaMenuTrigger, Popover as AriaPopover } from "react-aria-components";
import {
    Calendar as AriaCalendarIcon,
    Bell01,
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    Clock,
    Copy01,
    Edit05,
    LinkExternal01,
    Plus,
    SearchLg,
    Trash01,
} from "@smarteraui/icons";
import { Button } from "@/components/base/buttons/button";
import { cx, sortCx } from "@/utils/cx";
import { AVATARS } from "@/utils/demo-assets";

/** The fixed "today" used across every calendar-example demo so screenshots stay deterministic. */
export const TODAY = new CalendarDate(2026, 9, 9);

export type EventColor = "gray" | "blue" | "purple" | "pink" | "orange" | "green";

export const EVENT_COLOR_STYLES: Record<EventColor, string> = sortCx({
    gray: "bg-utility-neutral-50 text-utility-neutral-700 ring-utility-neutral-200",
    blue: "bg-utility-blue-50 text-utility-blue-700 ring-utility-blue-200",
    purple: "bg-utility-purple-50 text-utility-purple-700 ring-utility-purple-200",
    pink: "bg-utility-pink-50 text-utility-pink-700 ring-utility-pink-200",
    orange: "bg-utility-orange-50 text-utility-orange-700 ring-utility-orange-200",
    green: "bg-utility-green-50 text-utility-green-700 ring-utility-green-200",
});

export interface CalendarAppEvent {
    id: string;
    title: string;
    time: string;
    color: EventColor;
}

/** day-of-month → events, for the month grid. Keys are prefixed to disambiguate the leading/trailing weeks. */
export const MONTH_EVENTS: Record<string, CalendarAppEvent[]> = {
    "cur-3": [
        { id: "e1", title: "All-hands meeting", time: "7:00 PM", color: "gray" },
        { id: "e2", title: "Dinner with Candice", time: "9:30 PM", color: "gray" },
    ],
    "cur-7": [
        { id: "e3", title: "Coffee with Ali", time: "2:30 PM", color: "gray" },
        { id: "e4", title: "Marketing sync", time: "5:30 PM", color: "gray" },
    ],
    "cur-8": [
        { id: "e5", title: "Product demo", time: "1:30 PM", color: "blue" },
        { id: "e6", title: "Catch up", time: "5:30 PM", color: "pink" },
    ],
    "cur-9": [
        { id: "e7", title: "Deep work", time: "12:00 PM", color: "blue" },
        { id: "e8", title: "One-on-one", time: "1:00 PM", color: "pink" },
        { id: "e9", title: "Design sync", time: "1:30 PM", color: "blue" },
    ],
    "cur-10": [{ id: "e10", title: "Lunch with Sienna", time: "3:00 PM", color: "green" }],
    "cur-11": [
        { id: "e11", title: "Friday standup", time: "12:00 PM", color: "gray" },
        { id: "e12", title: "Olivia x Rio", time: "1:00 PM", color: "purple" },
        { id: "e13", title: "Product review", time: "4:30 PM", color: "blue" },
    ],
    "cur-12": [{ id: "e14", title: "House inspection", time: "2:00 PM", color: "orange" }],
    "cur-13": [{ id: "e15", title: "Ava's engagement", time: "4:00 PM", color: "purple" }],
    "cur-14": [
        { id: "e16", title: "Monday planning", time: "12:00 PM", color: "gray" },
        { id: "e17", title: "Content review", time: "2:00 PM", color: "blue" },
    ],
    "cur-16": [{ id: "e18", title: "Product sync", time: "12:30 PM", color: "blue" }],
    "cur-17": [
        { id: "e19", title: "Amélie 1:1", time: "1:00 PM", color: "pink" },
        { id: "e20", title: "All-hands", time: "7:00 PM", color: "gray" },
    ],
    "cur-18": [
        { id: "e21", title: "Coffee chat", time: "12:30 PM", color: "gray" },
        { id: "e22", title: "Design feedback", time: "5:30 PM", color: "pink" },
    ],
    "cur-19": [{ id: "e23", title: "Half marathon", time: "10:00 AM", color: "green" }],
    "cur-21": [{ id: "e24", title: "Team lunch", time: "3:15 PM", color: "pink" }],
    "cur-22": [
        { id: "e25", title: "Quarterly review", time: "2:30 PM", color: "orange" },
        { id: "e26", title: "Lunch with Kate", time: "4:00 PM", color: "green" },
    ],
    "cur-23": [
        { id: "e27", title: "Deep work", time: "12:00 PM", color: "blue" },
        { id: "e28", title: "Design sync", time: "5:30 PM", color: "blue" },
    ],
    "cur-24": [
        { id: "e29", title: "Amélie coffee", time: "1:00 PM", color: "pink" },
        { id: "e30", title: "Dinner", time: "10:00 PM", color: "gray" },
    ],
    "cur-25": [
        { id: "e31", title: "Accounting review", time: "4:45 PM", color: "orange" },
        { id: "e32", title: "Marketing sync", time: "5:30 PM", color: "gray" },
    ],
    "cur-28": [
        { id: "e33", title: "Team offsite", time: "All day", color: "green" },
        { id: "e34", title: "Deep work", time: "12:15 PM", color: "blue" },
    ],
    "cur-29": [{ id: "e35", title: "Lunch with Drew", time: "3:45 PM", color: "green" }],
    "cur-30": [{ id: "e36", title: "Product sync", time: "12:30 PM", color: "blue" }],
    "next-1": [
        { id: "e37", title: "All-hands", time: "7:00 PM", color: "gray" },
        { id: "e38", title: "Team dinner", time: "8:30 PM", color: "pink" },
    ],
    "next-4": [{ id: "e39", title: "Drive to airport", time: "12:00 PM", color: "orange" }],
};

interface MonthCell {
    key: string;
    day: number;
    isCurrentMonth: boolean;
}

/** 5 weeks × 7 days covering August 31 – October 4, 2026 (matches the reference screenshot). */
export const MONTH_GRID: MonthCell[] = [
    { key: "prev-31", day: 31, isCurrentMonth: false },
    ...Array.from({ length: 30 }, (_, i) => ({ key: `cur-${i + 1}`, day: i + 1, isCurrentMonth: true })),
    { key: "next-1", day: 1, isCurrentMonth: false },
    { key: "next-2", day: 2, isCurrentMonth: false },
    { key: "next-3", day: 3, isCurrentMonth: false },
    { key: "next-4", day: 4, isCurrentMonth: false },
];

export const WEEKDAYS_SHORT = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as const;

/** The 7 days of "Week 2" (Sept 7 – 13, 2026), used by the week-strip nav on both week & day views. */
export const WEEK_DAYS = [7, 8, 9, 10, 11, 12, 13];

/** Every day in September 2026 that has an event, for the day-view mini calendar's dot indicators. */
export const MINI_CALENDAR_HIGHLIGHTS: CalendarDate[] = Object.keys(MONTH_EVENTS)
    .filter((key) => key.startsWith("cur-"))
    .map((key) => new CalendarDate(2026, 9, Number(key.replace("cur-", ""))));

const VIEW_OPTIONS = ["Month view", "Week view", "Day view"] as const;
type ViewOption = (typeof VIEW_OPTIONS)[number];

const ViewSwitcher = ({ defaultView }: { defaultView: ViewOption }) => {
    const [view, setView] = useState<ViewOption>(defaultView);

    return (
        <AriaMenuTrigger>
            <Button size="sm" color="secondary" iconTrailing={ChevronDown}>
                {view}
            </Button>
            <AriaPopover className="border-secondary bg-primary min-w-[180px] rounded-lg border p-1 shadow-lg outline-hidden">
                <AriaMenu
                    className="flex flex-col outline-hidden"
                    onAction={(key) => {
                        setView(key as ViewOption);
                    }}
                >
                    {VIEW_OPTIONS.map((option) => (
                        <AriaMenuItem
                            key={option}
                            id={option}
                            className={({ isFocused }) =>
                                cx("text-secondary cursor-pointer rounded-md px-3 py-2 text-sm outline-hidden", isFocused && "bg-primary_hover")
                            }
                        >
                            {option}
                        </AriaMenuItem>
                    ))}
                </AriaMenu>
            </AriaPopover>
        </AriaMenuTrigger>
    );
};

interface CalendarAppHeaderProps {
    /** e.g. "SEPT" */
    monthAbbr: string;
    /** e.g. 9 */
    dayOfMonth: number;
    /** e.g. "September 2026" */
    title: string;
    /** e.g. "Week 2" */
    weekLabel: string;
    /** e.g. "1 Sept 2026 – 30 Sept 2026" or "Wednesday" */
    subtitle: ReactNode;
    view: ViewOption;
}

/** The header row shared by every calendar-app example: date badge, title, nav, view switcher, add event. */
export const CalendarAppHeader = ({ monthAbbr, dayOfMonth, title, weekLabel, subtitle, view }: CalendarAppHeaderProps) => {
    return (
        <div className="border-secondary flex flex-wrap items-center justify-between gap-4 border-b px-6 py-5">
            <div className="flex items-center gap-4">
                <div className="border-secondary flex w-14 flex-col items-center rounded-lg border py-1">
                    <span className="text-tertiary text-[10px] font-semibold tracking-wide">{monthAbbr}</span>
                    <span className="text-md text-fg-brand-primary font-semibold">{dayOfMonth}</span>
                </div>

                <div>
                    <div className="flex items-center gap-2">
                        <h3 className="text-md text-primary font-semibold">{title}</h3>
                        <span className="border-secondary text-tertiary rounded-md border px-1.5 py-0.5 text-xs font-medium">{weekLabel}</span>
                    </div>
                    <p className="text-tertiary text-sm">{subtitle}</p>
                </div>
            </div>

            <div className="flex items-center gap-3">
                <Button size="sm" color="tertiary" iconLeading={SearchLg} aria-label="Search" />

                <div className="border-secondary flex items-center rounded-lg border">
                    <Button slot={null} size="sm" color="tertiary" iconLeading={ChevronLeft} aria-label="Previous" className="rounded-e-none border-0" />
                    <Button slot={null} size="sm" color="tertiary" className="border-secondary rounded-none border-x">
                        Today
                    </Button>
                    <Button slot={null} size="sm" color="tertiary" iconLeading={ChevronRight} aria-label="Next" className="rounded-s-none border-0" />
                </div>

                <ViewSwitcher defaultView={view} />

                <Button size="sm" color="primary" iconLeading={Plus}>
                    Add event
                </Button>
            </div>
        </div>
    );
};

/** The 7-day week strip used above both the week-view and day-view time grids. */
export const WeekStripNav = ({ selectedDay }: { selectedDay: number }) => {
    return (
        <div className="border-secondary grid grid-cols-7 border-b">
            {WEEK_DAYS.map((day, index) => (
                <div key={day} className="border-secondary flex items-center justify-center gap-1.5 border-s py-3 first:border-s-0">
                    <span className="text-tertiary text-sm font-medium">{WEEKDAYS_SHORT[index]}</span>
                    <span
                        className={cx(
                            "flex size-6 items-center justify-center rounded-full text-sm font-medium",
                            day === selectedDay ? "bg-brand-solid text-white" : "text-secondary",
                        )}
                    >
                        {day}
                    </span>
                </div>
            ))}
        </div>
    );
};

export const HOURS = Array.from({ length: 24 }, (_, hour) => hour);

export const formatHourLabel = (hour: number) => {
    if (hour === 0) return "12 am";
    if (hour === 12) return "12 pm";
    return hour < 12 ? `${hour} am` : `${hour - 12} pm`;
};

/** A single event chip used inside the month grid. */
export const EventChip = ({ event }: { event: CalendarAppEvent }) => (
    <div
        className={cx(
            "flex items-center justify-between gap-1 truncate rounded-md px-1.5 py-1 text-xs font-medium ring-1 ring-inset",
            EVENT_COLOR_STYLES[event.color],
        )}
    >
        <span className="truncate">{event.title}</span>
        <span className="shrink-0 opacity-80">{event.time}</span>
    </div>
);

interface EventDetailPanelProps {
    title: string;
    dateLabel: string;
    timeLabel: string;
    reminderLabel: string;
    guestCount: number;
    yesCount: number;
    awaitingCount: number;
    description: ReactNode;
    meetingUrl: string;
}

/** The event-details card shown in the day-view sidebar (see `calendar-day-view` reference screenshot). */
export const EventDetailPanel = ({
    title,
    dateLabel,
    timeLabel,
    reminderLabel,
    guestCount,
    yesCount,
    awaitingCount,
    description,
    meetingUrl,
}: EventDetailPanelProps) => (
    <section aria-labelledby="calendar-event-detail-title" className="border-secondary flex flex-col gap-4 border-t p-5">
        <div className="flex items-start justify-between gap-2">
            <h3 id="calendar-event-detail-title" className="text-md text-primary font-semibold">
                {title}
            </h3>
            <div className="flex items-center gap-1">
                <Button slot={null} size="sm" color="tertiary" iconLeading={Copy01} aria-label="Duplicate event" />
                <Button slot={null} size="sm" color="tertiary" iconLeading={Trash01} aria-label="Delete event" />
                <Button slot={null} size="sm" color="tertiary" iconLeading={Edit05} aria-label="Edit event" />
            </div>
        </div>

        <div className="text-secondary flex flex-col gap-2 text-sm">
            <div className="flex items-center gap-2">
                <AriaCalendarIcon aria-hidden="true" className="text-fg-quaternary size-4 shrink-0" />
                {dateLabel}
            </div>
            <div className="flex items-center gap-2">
                <Clock aria-hidden="true" className="text-fg-quaternary size-4 shrink-0" />
                {timeLabel}
            </div>
            <div className="flex items-center gap-2">
                <Bell01 aria-hidden="true" className="text-fg-quaternary size-4 shrink-0" />
                {reminderLabel}
            </div>
        </div>

        <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
                {AVATARS.slice(0, 4).map((guest) => (
                    <img key={guest.username} src={guest.src} alt={guest.alt} className="ring-bg-primary size-8 rounded-full ring-2" />
                ))}
                <div className="bg-secondary text-tertiary ring-bg-primary flex size-8 items-center justify-center rounded-full text-xs font-medium ring-2">
                    OR
                </div>
            </div>
            <Button slot={null} size="sm" color="secondary" iconLeading={Plus} aria-label="Add guest" className="size-8 rounded-full p-0" />
        </div>

        <p className="text-tertiary text-sm">
            {guestCount} guests · {yesCount} yes · {awaitingCount} awaiting
        </p>

        <div>
            <h4 className="text-primary text-sm font-semibold">About this event</h4>
            <p className="text-tertiary mt-1 text-sm">{description}</p>
        </div>

        <a
            href={meetingUrl}
            className="text-brand-secondary hover:text-brand-secondary_hover inline-flex items-center gap-1.5 text-sm font-medium hover:underline"
        >
            Join Zoom Meeting
            <LinkExternal01 aria-hidden="true" className="size-4 shrink-0" />
        </a>
    </section>
);
