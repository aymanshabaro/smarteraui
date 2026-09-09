"use client";

import type { PropsWithChildren, ReactNode } from "react";
import { Fragment, useState } from "react";
import { getLocalTimeZone, today } from "@internationalized/date";
import type { CalendarProps as AriaCalendarProps, DateValue as AriaDateValue } from "react-aria-components";
import {
    Calendar as AriaCalendar,
    CalendarContext as AriaCalendarContext,
    CalendarGrid as AriaCalendarGrid,
    CalendarGridBody as AriaCalendarGridBody,
    CalendarGridHeader as AriaCalendarGridHeader,
    CalendarHeaderCell as AriaCalendarHeaderCell,
    Heading as AriaHeading,
    useSlottedContext as AriaUseSlottedContext,
} from "react-aria-components";
import { ChevronLeft, ChevronRight } from "@smarteraui/icons";
import { Button } from "@/components/base/buttons/button";
import { InputDateBase } from "@/components/base/input/input-date";
import { cx } from "@/utils/cx";
import { CalendarCell } from "./cell";

export const CalendarContextProvider = ({ children }: PropsWithChildren) => {
    const [value, setValue] = useState<AriaDateValue | null>(null);
    const [focusedValue, onFocusChange] = useState<AriaDateValue | undefined>();

    // React Aria's Calendar context widened `onChange` to support multiple selection
    // (`selectionMode="multiple"`). This calendar is single-select, so collapse any
    // array value down to the first entry.
    const onChange = (next: AriaDateValue | readonly AriaDateValue[] | null) => {
        setValue(Array.isArray(next) ? (next[0] ?? null) : next);
    };

    return <AriaCalendarContext.Provider value={{ value, onChange, focusedValue, onFocusChange }}>{children}</AriaCalendarContext.Provider>;
};

export interface CalendarProps extends AriaCalendarProps<AriaDateValue> {
    /** The dates to highlight. */
    highlightedDates?: AriaDateValue[];
    /**
     * The content to render between the header and the calendar grid.
     * If not provided, a default layout will be rendered with a date input and a today button.
     */
    children?: ReactNode;
}

export const Calendar = ({ highlightedDates, className, children, ...props }: CalendarProps) => {
    const context = AriaUseSlottedContext(AriaCalendarContext);

    const ContextWrapper = context ? Fragment : CalendarContextProvider;

    return (
        <ContextWrapper>
            <AriaCalendar {...props} className={(state) => cx("flex flex-col gap-3", typeof className === "function" ? className(state) : className)}>
                {({ state }) => (
                    <>
                        <header className="flex items-center justify-between">
                            <Button slot="previous" iconLeading={ChevronLeft} size="sm" color="tertiary" className="size-8" />
                            <AriaHeading className="text-fg-secondary text-sm font-semibold" />
                            <Button slot="next" iconLeading={ChevronRight} size="sm" color="tertiary" className="size-8" />
                        </header>

                        {children || (
                            <div className="flex gap-3">
                                <InputDateBase aria-label="Date" size="sm" className="flex-1" />
                                <Button
                                    slot={null}
                                    size="sm"
                                    color="secondary"
                                    onClick={() => {
                                        state.setValue(today(getLocalTimeZone()));
                                        state.setFocusedDate(today(getLocalTimeZone()));
                                    }}
                                >
                                    Today
                                </Button>
                            </div>
                        )}

                        <AriaCalendarGrid weekdayStyle="short" className="w-max">
                            <AriaCalendarGridHeader className="border-b-4 border-transparent">
                                {(day) => (
                                    <AriaCalendarHeaderCell className="p-0">
                                        <div className="text-secondary flex size-10 items-center justify-center text-sm font-medium">{day.slice(0, 2)}</div>
                                    </AriaCalendarHeaderCell>
                                )}
                            </AriaCalendarGridHeader>
                            <AriaCalendarGridBody className="[&_td]:p-0 [&_tr]:border-b-4 [&_tr]:border-transparent [&_tr:last-of-type]:border-none">
                                {(date) => (
                                    <CalendarCell
                                        date={date}
                                        isHighlighted={highlightedDates?.some((highlightedDate) => date.compare(highlightedDate) === 0)}
                                    />
                                )}
                            </AriaCalendarGridBody>
                        </AriaCalendarGrid>
                    </>
                )}
            </AriaCalendar>
        </ContextWrapper>
    );
};
