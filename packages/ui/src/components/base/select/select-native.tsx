"use client";

import { type SelectHTMLAttributes, useId } from "react";
import { ChevronDown } from "@smarteraui/icons";
import { HintText } from "@/components/base/input/hint-text";
import { Label } from "@/components/base/input/label";
import { cx } from "@/utils/cx";

interface NativeSelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "size"> {
    label?: string;
    hint?: string;
    selectClassName?: string;
    size?: "sm" | "md" | "lg";
    options: { label: string; value: string; disabled?: boolean }[];
}

const styles = {
    sm: {
        root: "py-2 ps-3 text-sm",
        icon: "size-4 right-2.5 stroke-[2.25px]",
    },
    md: {
        root: "py-2 ps-3 text-md",
        icon: "size-4 stroke-[2.25px] right-3",
    },
    lg: {
        root: "py-2.5 px-3.5 text-md",
        icon: "size-5 right-3",
    },
};

export const NativeSelect = ({ label, hint, options, className, selectClassName, size = "md", ...props }: NativeSelectProps) => {
    const id = useId();
    const selectId = `select-native-${id}`;
    const hintId = `select-native-hint-${id}`;

    return (
        <div className={cx("w-full in-data-input-wrapper:w-max", className)}>
            {label && (
                <Label htmlFor={selectId} id={selectId} className="mb-1.5">
                    {label}
                </Label>
            )}

            <div className="relative grid w-full items-center">
                <select
                    {...props}
                    id={selectId}
                    aria-describedby={hintId}
                    aria-labelledby={selectId}
                    className={cx(
                        "bg-primary text-primary ring-primary placeholder:text-fg-quaternary focus-visible:ring-brand appearance-none rounded-lg font-medium shadow-xs ring-1 outline-hidden transition duration-100 ease-linear ring-inset focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-50",

                        styles[size].root,

                        // Styles when the select is within an `InputGroup`
                        "in-data-input-wrapper:text-tertiary in-data-input-wrapper:flex in-data-input-wrapper:h-full in-data-input-wrapper:gap-1 in-data-input-wrapper:bg-inherit in-data-input-wrapper:px-3 in-data-input-wrapper:py-2 in-data-input-wrapper:font-normal in-data-input-wrapper:shadow-none in-data-input-wrapper:ring-transparent in-data-input-wrapper:in-data-[size=sm]:text-sm",
                        // Styles for the select when `TextField` is disabled
                        "in-data-input-wrapper:group-disabled:pointer-events-none in-data-input-wrapper:group-disabled:cursor-not-allowed in-data-input-wrapper:group-disabled:bg-transparent",
                        // Common styles for sizes and border radius within `InputGroup`
                        "in-data-input-wrapper:in-data-leading:rounded-e-none in-data-input-wrapper:in-data-trailing:rounded-s-none in-data-input-wrapper:in-data-[input-size=lg]:py-2.5 in-data-input-wrapper:in-data-[input-size=md]:py-2 in-data-input-wrapper:in-data-[input-size=md]:ps-3 in-data-input-wrapper:in-data-[input-size=sm]:text-sm",
                        // For "leading" dropdown within `InputGroup`
                        "in-data-input-wrapper:in-data-leading:pe-4.5 in-data-input-wrapper:in-data-leading:in-data-[input-size=lg]:ps-3.5 in-data-input-wrapper:in-data-leading:in-data-[input-size=md]:ps-3 in-data-input-wrapper:in-data-leading:in-data-[input-size=md]:pe-4.5 in-data-input-wrapper:in-data-leading:in-data-[input-size=sm]:pe-3.5",
                        // For "trailing" dropdown within `InputGroup`
                        "in-data-input-wrapper:in-data-trailing:in-data-[input-size=lg]:pe-8 in-data-input-wrapper:in-data-trailing:in-data-[input-size=md]:pe-7.5 in-data-input-wrapper:in-data-trailing:in-data-[input-size=sm]:pe-6.5",
                        selectClassName,
                    )}
                >
                    {options.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}
                </select>

                <ChevronDown
                    aria-hidden="true"
                    className={cx(
                        "text-fg-quaternary pointer-events-none absolute",

                        styles[size].icon,
                        // Styles for the icon when the select is within an `InputGroup`
                        "in-data-input-wrapper:right-0 in-data-input-wrapper:size-4 in-data-input-wrapper:stroke-[2.625px]",
                        // For "trailing" dropdown within `InputGroup`
                        "in-data-input-wrapper:in-data-trailing:in-data-[input-size=md]:right-3 in-data-input-wrapper:in-data-trailing:in-data-[input-size=sm]:right-3",
                    )}
                />
            </div>

            {hint && (
                <HintText className="mt-2" id={hintId}>
                    {hint}
                </HintText>
            )}
        </div>
    );
};
