"use client";

import { getDayOfWeek, getLocalTimeZone, isToday } from "@internationalized/date";
import type { CalendarCellProps as AriaCalendarCellProps } from "react-aria-components";
import {
    CalendarCell as AriaCalendarCell,
    RangeCalendarContext as AriaRangeCalendarContext,
    useLocale as AriaUseLocale,
    useSlottedContext as AriaUseSlottedContext,
} from "react-aria-components";
import { cx } from "../../../utils/cx";

export interface CalendarCellProps extends AriaCalendarCellProps {
    /** Whether the calendar is a range calendar. */
    isRangeCalendar?: boolean;
    /** Whether the cell is highlighted. */
    isHighlighted?: boolean;
    /** Whether to show out of range dates. */
    showOutOfRangeDates?: boolean;
}

export const CalendarCell = ({ date, isHighlighted, showOutOfRangeDates = false, ...props }: CalendarCellProps) => {
    const { locale } = AriaUseLocale();
    const dayOfWeek = getDayOfWeek(date, locale);
    const rangeCalendarContext = AriaUseSlottedContext(AriaRangeCalendarContext);

    const isRangeCalendar = !!rangeCalendarContext;

    const start = rangeCalendarContext?.value?.start;
    const end = rangeCalendarContext?.value?.end;

    const isAfterStart = start ? date.compare(start) > 0 : true;
    const isBeforeEnd = end ? date.compare(end) < 0 : true;

    const isAfterOrOnStart = start && date.compare(start) >= 0;
    const isBeforeOrOnEnd = end && date.compare(end) <= 0;
    const isInRange = isAfterOrOnStart && isBeforeOrOnEnd;

    const lastDayOfMonth = new Date(date.year, date.month, 0).getDate();
    const isLastDayOfMonth = date.day === lastDayOfMonth;
    const isFirstDayOfMonth = date.day === 1;

    const isTodayDate = isToday(date, getLocalTimeZone());

    return (
        <AriaCalendarCell
            {...props}
            date={date}
            className={({ isDisabled, isFocusVisible, isSelectionStart, isSelectionEnd, isSelected, isOutsideMonth }) => {
                const isRoundedLeft = isSelectionStart || dayOfWeek === 0;
                const isRoundedRight = isSelectionEnd || dayOfWeek === 6;

                return cx(
                    "relative size-10 focus:outline-hidden",
                    isRoundedLeft && "rounded-s-full",
                    isRoundedRight && "rounded-e-full",
                    isInRange && isDisabled && "bg-secondary",
                    isSelected && isRangeCalendar && "bg-secondary",
                    isDisabled ? "pointer-events-none" : "cursor-pointer",
                    isFocusVisible ? "z-10" : "z-0",
                    isOutsideMonth && "opacity-50",
                    isRangeCalendar && isOutsideMonth && !showOutOfRangeDates && "hidden",

                    // Show gradient on last day of month if it's within the selected range.
                    isLastDayOfMonth &&
                        isSelected &&
                        isBeforeEnd &&
                        isRangeCalendar &&
                        "after:to-bg-secondary after:absolute after:inset-0 after:translate-x-full after:bg-gradient-to-l after:from-transparent in-[[role=gridcell]:last-child]:after:hidden",

                    // Show gradient on first day of month if it's within the selected range.
                    isFirstDayOfMonth &&
                        isSelected &&
                        isAfterStart &&
                        isRangeCalendar &&
                        "after:to-bg-secondary after:absolute after:inset-0 after:-translate-x-full after:bg-gradient-to-r after:from-transparent in-[[role=gridcell]:first-child]:after:hidden",
                );
            }}
        >
            {({ isDisabled, isFocusVisible, isSelectionStart, isSelectionEnd, isSelected, formattedDate }) => {
                const markedAsSelected = isSelectionStart || isSelectionEnd || (isSelected && !isDisabled && !isRangeCalendar);

                return (
                    <div
                        className={cx(
                            "text-secondary hover:text-secondary_hover relative flex size-full items-center justify-center rounded-full text-sm",
                            // Disabled state.
                            isDisabled && "text-secondary/50",
                            // Focus ring, visible while the cell has keyboard focus.
                            isFocusVisible ? "outline-focus-ring outline-2 outline-offset-2" : "",
                            // Hover state for cells in the middle of the range.
                            isSelected && !isDisabled && isRangeCalendar ? "font-medium" : "",
                            markedAsSelected && "bg-brand-solid hover:bg-brand-solid_hover font-medium text-white hover:text-white",
                            // Hover state for non-selected cells.
                            !isSelected && !isDisabled ? "hover:bg-primary_hover hover:font-medium!" : "",
                            !isSelected && isTodayDate ? "bg-secondary hover:bg-secondary_hover font-medium" : "",
                        )}
                    >
                        {formattedDate}

                        {(isHighlighted || isTodayDate) && (
                            <div
                                className={cx(
                                    "absolute bottom-1 left-1/2 size-1.25 -translate-x-1/2 rounded-full",
                                    markedAsSelected ? "bg-fg-white" : "bg-fg-brand-primary",
                                    isDisabled && "opacity-50",
                                )}
                            />
                        )}
                    </div>
                );
            }}
        </AriaCalendarCell>
    );
};
