"use client";

import { cx } from "@/utils/cx";

interface TagCheckboxProps {
    /** Size of the checkbox, matching the parent tag's size. @default "sm" */
    size?: "sm" | "md" | "lg";
    /** Optional additional CSS class names. */
    className?: string;
    /** Whether the checkbox is focused. */
    isFocused?: boolean;
    /** Whether the checkbox is selected. */
    isSelected?: boolean;
    /** Whether the checkbox is disabled. */
    isDisabled?: boolean;
}

export const TagCheckbox = ({ className, isFocused, isSelected, isDisabled, size = "sm" }: TagCheckboxProps) => {
    return (
        <div
            className={cx(
                "bg-primary ring-primary flex cursor-pointer appearance-none items-center justify-center rounded ring-1 ring-inset",
                size === "sm" && "size-3.5",
                size === "md" && "size-4",
                size === "lg" && "size-4.5",
                isSelected && "bg-brand-solid ring-brand-solid",
                isDisabled && "cursor-not-allowed opacity-50",
                isDisabled && !isSelected && "bg-tertiary",
                isFocused && "outline-focus-ring outline-2 outline-offset-2",
                className,
            )}
        >
            <svg
                aria-hidden="true"
                viewBox="0 0 14 14"
                fill="none"
                className={cx(
                    "text-fg-white transition-inherit-all pointer-events-none absolute opacity-0",
                    size === "sm" && "size-2.5",
                    size === "md" && "size-3",
                    size === "lg" && "size-3.5",
                    isSelected && "opacity-100",
                )}
            >
                <path d="M11.6666 3.5L5.24992 9.91667L2.33325 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        </div>
    );
};
TagCheckbox.displayName = "TagCheckbox";
