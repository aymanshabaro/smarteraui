"use client";

import type { ReactNode, Ref } from "react";
import { useId } from "react";
import { Checkbox as AriaCheckbox, type CheckboxProps as AriaCheckboxProps } from "react-aria-components";
import { cx, sortCx } from "../../../utils/cx";
import { warnDomProps } from "../../../utils/warn-dom-props";

export interface CheckboxBaseProps {
    /** The size of the checkbox. */
    size?: "sm" | "md";
    /** Additional CSS classes to apply to the root element. */
    className?: string;
    /** Whether the checkbox should show a visible focus ring. */
    isFocusVisible?: boolean;
    /** Whether the checkbox is selected. */
    isSelected?: boolean;
    /** Whether the checkbox is disabled. */
    isDisabled?: boolean;
    /** Whether the checkbox is in an indeterminate state. */
    isIndeterminate?: boolean;
}

export const CheckboxBase = ({ className, isSelected, isDisabled, isIndeterminate, size = "sm", isFocusVisible = false }: CheckboxBaseProps) => {
    return (
        <div
            className={cx(
                "bg-primary ring-primary relative flex size-4 shrink-0 cursor-pointer appearance-none items-center justify-center rounded ring-1 ring-inset",
                size === "md" && "size-5 rounded-md",
                (isSelected || isIndeterminate) && "bg-brand-solid ring-brand-solid",
                isDisabled && "cursor-not-allowed opacity-50",
                isDisabled && !(isSelected || isIndeterminate) && "bg-tertiary",
                isFocusVisible && "outline-focus-ring outline-2 outline-offset-2",
                className,
            )}
        >
            <svg
                aria-hidden="true"
                viewBox="0 0 14 14"
                fill="none"
                className={cx(
                    "text-fg-white transition-inherit-all pointer-events-none absolute h-3 w-2.5 opacity-0",
                    size === "md" && "size-3.5",
                    isIndeterminate && "opacity-100",
                )}
            >
                <path d="M2.91675 7H11.0834" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>

            <svg
                aria-hidden="true"
                viewBox="0 0 14 14"
                fill="none"
                className={cx(
                    "text-fg-white transition-inherit-all pointer-events-none absolute size-3 opacity-0",
                    size === "md" && "size-3.5",
                    isSelected && !isIndeterminate && "opacity-100",
                )}
            >
                <path d="M11.6666 3.5L5.24992 9.91667L2.33325 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        </div>
    );
};
CheckboxBase.displayName = "CheckboxBase";

const styles = sortCx({
    sm: {
        root: "gap-2",
        textWrapper: "",
        label: "text-sm font-medium",
        hint: "text-sm",
    },
    md: {
        root: "gap-3",
        textWrapper: "gap-0.5",
        label: "text-md font-medium",
        hint: "text-md",
    },
});

export interface CheckboxProps extends AriaCheckboxProps {
    /** Ref forwarded to the root `<label>` element. */
    ref?: Ref<HTMLLabelElement>;
    /** The size of the checkbox. */
    size?: "sm" | "md";
    /** The label rendered next to the checkbox. */
    label?: ReactNode;
    /** A supporting hint rendered below the label. */
    hint?: ReactNode;
}

export const Checkbox = ({ label, hint, size = "sm", className, ...ariaCheckboxProps }: CheckboxProps) => {
    warnDomProps("Checkbox", ariaCheckboxProps as Record<string, unknown>, { checked: "isSelected", disabled: "isDisabled", required: "isRequired" });

    const generatedId = useId();
    // A hint rendered *inside* the `<label>` React Aria's `Checkbox` produces becomes part of the
    // input's accessible name (e.g. "Remember me Save my login details…"). Rendering it as a
    // sibling and wiring it up with `aria-describedby` instead keeps the accessible name equal to
    // just the label, while the hint is still announced as a description.
    const hintId = hint ? `checkbox-hint-${generatedId}` : undefined;

    return (
        <div className="flex flex-col">
            <AriaCheckbox
                // With a label, the hint describes; without one (a consent checkbox whose only
                // text is the hint), the hint must still name the control or it has no
                // accessible name at all, which is what the contact-form demos exercise.
                aria-describedby={label ? hintId : undefined}
                aria-labelledby={!label && hint ? hintId : undefined}
                {...ariaCheckboxProps}
                className={(state) =>
                    cx(
                        "relative flex items-start",
                        state.isDisabled && "cursor-not-allowed",
                        styles[size].root,
                        typeof className === "function" ? className(state) : className,
                    )
                }
            >
                {({ isSelected, isIndeterminate, isDisabled, isFocusVisible }) => (
                    <>
                        <CheckboxBase
                            size={size}
                            isSelected={isSelected}
                            isIndeterminate={isIndeterminate}
                            isDisabled={isDisabled}
                            isFocusVisible={isFocusVisible}
                            className={label ? "mt-0.5" : ""}
                        />
                        {label && (
                            <div className={cx("inline-flex flex-col", styles[size].textWrapper)}>
                                <p className={cx("text-secondary select-none", styles[size].label)}>{label}</p>
                            </div>
                        )}
                    </>
                )}
            </AriaCheckbox>

            {hint && (
                <span id={hintId} className={cx("text-tertiary", styles[size].hint, size === "sm" ? "ms-6" : "ms-8")}>
                    {hint}
                </span>
            )}
        </div>
    );
};
Checkbox.displayName = "Checkbox";
