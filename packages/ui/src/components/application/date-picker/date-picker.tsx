"use client";

import type { ReactNode } from "react";
import { getLocalTimeZone, today } from "@internationalized/date";
import { useControlledState } from "@react-stately/utils";
import { useDateFormatter } from "react-aria";
import type { DatePickerProps as AriaDatePickerProps, DateValue as AriaDateValue } from "react-aria-components";
import { DatePicker as AriaDatePicker, Dialog as AriaDialog, Group as AriaGroup, Popover as AriaPopover } from "react-aria-components";
import { Calendar as CalendarIcon } from "@properui/icons";
import { cx } from "../../../utils/cx";
import { Button, type ButtonProps } from "../../base/buttons/button";
import { HintText } from "../../base/input/hint-text";
import { Label } from "../../base/input/label";
import { Calendar } from "./calendar";

const highlightedDates = [today(getLocalTimeZone())];

export interface DatePickerProps extends AriaDatePickerProps<AriaDateValue> {
    /** The function to call when the apply button is clicked. */
    onApply?: () => void;
    /** The function to call when the cancel button is clicked. */
    onCancel?: () => void;
    size?: ButtonProps["size"];
    /** Field label rendered above the trigger, matching `Input`/`Select`. */
    label?: string;
    /**
     * Helper text rendered below the field. Switches to the error slot automatically when
     * `isInvalid` is set.
     */
    hint?: ReactNode;
    /** Tooltip text for the help icon next to the label. */
    tooltip?: string;
}

/**
 * Clearing every segment (deleting down to an empty date) calls `onChange` with `null`, not
 * `undefined` — check for that explicitly when wiring this up to a form library.
 *
 * Segment order (month/day/year vs. day/month/year, etc.) comes from the ambient locale, which
 * React Aria reads from an `I18nProvider` ancestor (or the browser locale otherwise) — it is not
 * a prop on `DatePicker` itself.
 */
export const DatePicker = ({
    value: valueProp,
    defaultValue,
    onChange,
    onApply,
    onCancel,
    size = "sm",
    label,
    hint,
    tooltip,
    isRequired,
    isInvalid,
    ...props
}: DatePickerProps) => {
    const formatter = useDateFormatter({
        month: "short",
        day: "numeric",
        year: "numeric",
    });
    const [value, setValue] = useControlledState(valueProp, defaultValue || null, onChange);

    const formattedDate = value ? formatter.format(value.toDate(getLocalTimeZone())) : "Select date";

    return (
        <div className="flex flex-col gap-1.5">
            {label && (
                <Label isRequired={isRequired} isInvalid={isInvalid} tooltip={tooltip}>
                    {label}
                </Label>
            )}

            <AriaDatePicker
                aria-label={label ?? "Date picker"}
                shouldCloseOnSelect={false}
                isRequired={isRequired}
                isInvalid={isInvalid}
                {...props}
                value={value}
                onChange={setValue}
            >
                <AriaGroup>
                    <Button size={size} color="secondary" iconLeading={CalendarIcon} aria-label={label ? `${label}, ${formattedDate}` : undefined}>
                        {formattedDate}
                    </Button>
                </AriaGroup>
                <AriaPopover
                    offset={8}
                    placement="bottom right"
                    className={({ isEntering, isExiting }) =>
                        cx(
                            "origin-(--trigger-anchor-point) will-change-transform",
                            isEntering &&
                                "animate-in fade-in placement-right:slide-in-from-left-0.5 placement-top:slide-in-from-bottom-0.5 placement-bottom:slide-in-from-top-0.5 duration-150 ease-out",
                            isExiting &&
                                "animate-out fade-out placement-right:slide-out-to-left-0.5 placement-top:slide-out-to-bottom-0.5 placement-bottom:slide-out-to-top-0.5 duration-100 ease-in",
                        )
                    }
                >
                    <AriaDialog aria-label="Date picker" className="bg-primary ring-secondary_alt rounded-2xl shadow-xl ring">
                        {({ close }) => (
                            <>
                                <div className="flex px-6 py-5">
                                    <Calendar highlightedDates={highlightedDates} />
                                </div>
                                <div className="border-secondary grid grid-cols-2 gap-3 border-t p-4">
                                    <Button
                                        size="md"
                                        color="secondary"
                                        onClick={() => {
                                            onCancel?.();
                                            close();
                                        }}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        size="md"
                                        color="primary"
                                        onClick={() => {
                                            onApply?.();
                                            close();
                                        }}
                                    >
                                        Apply
                                    </Button>
                                </div>
                            </>
                        )}
                    </AriaDialog>
                </AriaPopover>
            </AriaDatePicker>

            {hint && <HintText isInvalid={isInvalid}>{hint}</HintText>}
        </div>
    );
};
