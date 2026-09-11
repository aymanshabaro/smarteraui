"use client";

import { useState } from "react";
import { CalendarDate, getLocalTimeZone, toCalendarDateTime } from "@internationalized/date";
import { useDateFormatter } from "react-aria";
import {
    DateField as AriaDateField,
    DatePicker as AriaDatePicker,
    DateRangePicker as AriaDateRangePicker,
    type DateValue as AriaDateValue,
    Dialog as AriaDialog,
    Group as AriaGroup,
    Popover as AriaPopover,
} from "react-aria-components";
import { Calendar as CalendarIcon, Clock } from "@properui/icons";
import { cx } from "../../../utils/cx";
import { Button } from "../../base/buttons/button";
import { InputDateBase } from "../../base/input/input-date";
import { Calendar as CalendarComponent } from "./calendar";
import { DatePicker as DatePickerComponent } from "./date-picker";
import { DateRangePicker as DateRangePickerComponent } from "./date-range-picker";
import { RangeCalendar as RangeCalendarComponent, RangePresetButton } from "./range-calendar";

/** Fixed "today" so every demo below renders deterministically, independent of the real system clock. */
const TODAY = new CalendarDate(2026, 9, 9);

/** 27 slots = 9:00 AM to 10:00 PM in 30-min intervals. */
const TIME_SLOTS = Array.from({ length: 27 }, (_, i) => {
    const totalMinutes = 9 * 60 + i * 30; // Start at 9:00 AM (540 min), step by 30
    const hour = Math.floor(totalMinutes / 60);
    const minute = totalMinutes % 60;
    const period = hour >= 12 ? "PM" : "AM";
    const h12 = hour % 12 || 12; // Convert 24h to 12h format
    const label = `${h12}:${String(minute).padStart(2, "0")} ${period}`;
    return { id: `${hour}:${String(minute).padStart(2, "0")}`, hour, minute, label };
});

/** Example 1: `date-picker-example` — the hero preview atop the docs page. */
export const DatePickerExample = () => <DatePickerComponent aria-label="Date picker" defaultValue={TODAY} />;

/** Example 2: `date-picker` — the same component, controlled this time. */
export const DatePicker = () => {
    const [value, setValue] = useState<AriaDateValue | null>(TODAY);

    return <DatePickerComponent aria-label="Date picker" value={value} onChange={setValue} />;
};

/** Example 3: `date-time-picker`. */
export const DateTimePicker = () => {
    const [value, setValue] = useState<AriaDateValue | null>(() => toCalendarDateTime(TODAY));
    const [focusedValue, setFocusedValue] = useState<AriaDateValue | null>(() => toCalendarDateTime(TODAY));
    const dateFormatter = useDateFormatter({ month: "short", day: "numeric", year: "numeric" });
    const timeFormatter = useDateFormatter({ hour: "numeric", minute: "numeric" });

    const handleTodayClick = () => {
        // Preserve the existing time when jumping to today.
        const date = value && "hour" in value ? toCalendarDateTime(TODAY).set({ hour: value.hour, minute: value.minute }) : toCalendarDateTime(TODAY);

        setValue(date);
        setFocusedValue(date);
    };

    const handleTimeClick = (slot: (typeof TIME_SLOTS)[number]) => {
        const date = value ?? toCalendarDateTime(TODAY);
        setValue(date.set({ hour: slot.hour, minute: slot.minute }));
    };

    return (
        <AriaDatePicker shouldCloseOnSelect={false} aria-label="Date time picker" value={value} onChange={setValue}>
            <AriaGroup>
                <Button size="sm" color="secondary" iconLeading={CalendarIcon}>
                    {value ? (
                        <>
                            {dateFormatter.format(value.toDate(getLocalTimeZone()))}{" "}
                            <span className="text-quaternary">{timeFormatter.format(value.toDate(getLocalTimeZone()))}</span>
                        </>
                    ) : (
                        "Select date"
                    )}
                </Button>
            </AriaGroup>
            <AriaPopover offset={8} placement="bottom right">
                <AriaDialog aria-label="Date time picker" className="bg-primary ring-secondary_alt rounded-2xl shadow-xl ring">
                    {({ close }) => (
                        <>
                            <div className="flex">
                                <div className="flex px-6 py-5">
                                    <CalendarComponent focusedValue={focusedValue} onFocusChange={setFocusedValue}>
                                        <div className="flex gap-3">
                                            <AriaDateField aria-label="Date" granularity="day" className="flex-1">
                                                <InputDateBase size="sm" className="flex-1" />
                                            </AriaDateField>
                                            <Button slot={null} size="sm" color="secondary" onClick={handleTodayClick}>
                                                Today
                                            </Button>
                                        </div>
                                    </CalendarComponent>
                                </div>
                                {/* Not part of the reference `Select`-based mobile row (that primitive isn't ported yet) —
                                    this list is shown at every breakpoint instead. */}
                                <div className="border-secondary relative flex min-h-0 w-50 flex-col gap-4 border-s">
                                    <div className="text-fg-secondary px-5 pt-6.5 text-center text-sm font-semibold">Available times</div>
                                    <div className="relative h-full w-full">
                                        <ul className="absolute inset-0 flex min-h-0 flex-col gap-1.5 overflow-y-auto mask-b-from-80% mask-b-to-98% px-5 pb-5">
                                            {TIME_SLOTS.map((slot) => {
                                                const isSelected = value && "hour" in value && value.hour === slot.hour && value.minute === slot.minute;
                                                return (
                                                    <li key={slot.id} className="flex-1">
                                                        <Button
                                                            size="xs"
                                                            color="secondary"
                                                            iconLeading={Clock}
                                                            className={cx("w-full", isSelected && "bg-primary_hover")}
                                                            onClick={() => handleTimeClick(slot)}
                                                        >
                                                            {slot.label}
                                                        </Button>
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="border-secondary flex justify-end gap-3 border-t p-4">
                                <Button size="sm" color="secondary" onClick={close}>
                                    Cancel
                                </Button>
                                <Button size="sm" color="primary" onClick={close}>
                                    Apply
                                </Button>
                            </div>
                        </>
                    )}
                </AriaDialog>
            </AriaPopover>
        </AriaDatePicker>
    );
};

/** Example 4: `date-range-picker-with-presets`. */
export const DateRangePickerWithPresets = () => (
    <DateRangePickerComponent aria-label="Date range picker" defaultValue={{ start: TODAY.subtract({ days: 7 }), end: TODAY }} />
);

/** Example 5: `calendar`. */
export const Calendar = () => <CalendarComponent aria-label="Calendar" defaultValue={TODAY} defaultFocusedValue={TODAY} />;

/** Example 6: `calendar-card`. */
export const CalendarCard = () => (
    <AriaDatePicker aria-label="Calendar card" defaultValue={TODAY}>
        <AriaDialog className="bg-primary ring-secondary_alt rounded-2xl shadow-xl ring">
            <div className="flex px-6 py-5">
                <CalendarComponent />
            </div>
            <div className="border-secondary grid grid-cols-2 gap-3 border-t p-4">
                <Button size="sm" color="secondary">
                    Cancel
                </Button>
                <Button size="sm" color="primary">
                    Apply
                </Button>
            </div>
        </AriaDialog>
    </AriaDatePicker>
);

/** Example 7: `range-calendar`. */
export const RangeCalendar = () => <RangeCalendarComponent aria-label="Range calendar" defaultFocusedValue={TODAY} />;

/** Example 8: `range-calendar-card`. */
export const RangeCalendarCard = () => {
    const [focusedValue, setFocusedValue] = useState<AriaDateValue | null>(TODAY);
    const [value, setValue] = useState<{ start: AriaDateValue; end: AriaDateValue } | null>({
        start: TODAY.subtract({ days: 7 }),
        end: TODAY,
    });

    const presets = {
        today: { label: "Today", value: { start: TODAY, end: TODAY } },
        yesterday: { label: "Yesterday", value: { start: TODAY.subtract({ days: 1 }), end: TODAY.subtract({ days: 1 }) } },
        thisWeek: { label: "This week", value: { start: TODAY.subtract({ days: 2 }), end: TODAY.add({ days: 4 }) } },
        lastWeek: { label: "Last week", value: { start: TODAY.subtract({ days: 9 }), end: TODAY.subtract({ days: 3 }) } },
        thisMonth: { label: "This month", value: { start: TODAY.set({ day: 1 }), end: TODAY.set({ day: 30 }) } },
        lastMonth: {
            label: "Last month",
            value: { start: TODAY.subtract({ months: 1 }).set({ day: 1 }), end: TODAY.subtract({ months: 1 }).set({ day: 31 }) },
        },
        thisYear: { label: "This year", value: { start: TODAY.set({ month: 1, day: 1 }), end: TODAY.set({ month: 12, day: 31 }) } },
        lastYear: {
            label: "Last year",
            value: { start: TODAY.subtract({ years: 1 }).set({ month: 1, day: 1 }), end: TODAY.subtract({ years: 1 }).set({ month: 12, day: 31 }) },
        },
        allTime: { label: "All time", value: { start: TODAY.set({ year: 2000, month: 1, day: 1 }), end: TODAY } },
    };

    return (
        <AriaDateRangePicker aria-label="Range calendar card" value={value} onChange={setValue}>
            <AriaDialog className="bg-primary ring-secondary_alt flex rounded-2xl shadow-xl ring focus:outline-hidden">
                <div className="border-secondary hidden w-38 flex-col gap-0.5 border-e border-solid p-3 lg:flex">
                    {Object.values(presets).map((preset) => (
                        <RangePresetButton
                            key={preset.label}
                            value={preset.value}
                            onClick={() => {
                                setFocusedValue(preset.value.start);
                                setValue(preset.value);
                            }}
                        >
                            {preset.label}
                        </RangePresetButton>
                    ))}
                </div>
                <div className="flex flex-col">
                    <RangeCalendarComponent
                        focusedValue={focusedValue}
                        onFocusChange={setFocusedValue}
                        presets={{ lastWeek: presets.lastWeek, lastMonth: presets.lastMonth, lastYear: presets.lastYear }}
                    />
                    <div className="border-secondary flex justify-between gap-3 border-t p-4">
                        <div className="hidden items-center gap-2 md:flex">
                            <InputDateBase slot="start" size="sm" />
                            <div className="text-md text-quaternary">–</div>
                            <InputDateBase slot="end" size="sm" />
                        </div>
                        <div className="grid w-full grid-cols-2 gap-3 md:flex md:w-auto">
                            <Button size="sm" color="secondary">
                                Cancel
                            </Button>
                            <Button size="sm" color="primary">
                                Apply
                            </Button>
                        </div>
                    </div>
                </div>
            </AriaDialog>
        </AriaDateRangePicker>
    );
};
