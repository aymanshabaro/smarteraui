"use client";

import { type ReactNode, type Ref, createContext, useContext } from "react";
import {
    Button as AriaButton,
    type DateFieldProps as AriaDateFieldProps,
    type DateValue as AriaDateValue,
    Group as AriaGroup,
    Input as AriaInput,
    type InputProps as AriaInputProps,
    NumberField as AriaNumberField,
    type NumberFieldProps as AriaNumberFieldProps,
} from "react-aria-components";
import { ChevronDown, ChevronUp, Minus, Plus } from "@smarteraui/icons";
import { cx } from "@/utils/cx";
import { Button } from "../buttons/button";
import { HintText } from "./hint-text";
import { Label } from "./label";

const NumberFieldContext = createContext<{
    size?: "sm" | "md" | "lg";
    wrapperClassName?: string;
    iconClassName?: string;
    tooltipClassName?: string;
    inputClassName?: string;
}>({});

const styles = {
    sm: "px-3 py-2 text-sm",
    md: "px-3 py-2 text-md",
    lg: "px-3.5 py-2.5 text-md",
};

export interface InputNumberBaseProps extends AriaNumberFieldProps {
    /**
     * Input size.
     * @default "sm"
     */
    size?: "sm" | "md" | "lg";
    /** Placeholder text. */
    placeholder?: string;
    /** Class name for the input. */
    inputClassName?: string;
    /** Class name for the input wrapper. */
    wrapperClassName?: string;
    ref?: Ref<HTMLInputElement>;
    groupRef?: Ref<HTMLDivElement>;
    /** Orientation of buttons. */
    orientation?: "horizontal" | "vertical";
}

export const InputNumberBase = ({
    ref,
    groupRef,
    size = "md",
    isInvalid,
    isDisabled,
    placeholder,
    wrapperClassName,
    inputClassName,
    orientation = "vertical",
    // Omit this prop to avoid invalid HTML attribute warning
    isRequired: _isRequired,
    ...inputProps
}: Omit<InputNumberBaseProps, "label" | "hint">) => {
    // If the input is inside a `TextFieldContext`, use its context to simplify applying styles
    const context = useContext(NumberFieldContext);

    const inputSize = context?.size || size;

    return (
        <AriaGroup
            {...{ isDisabled, isInvalid }}
            ref={groupRef}
            className={({ isFocusWithin, isDisabled, isInvalid }) =>
                cx(
                    "bg-primary outline-primary relative flex w-full flex-row items-stretch rounded-lg shadow-xs outline-1 -outline-offset-1 transition-all duration-100 ease-linear",

                    isFocusWithin && !isDisabled && "outline-brand outline-2 -outline-offset-2",

                    // Disabled state styles
                    isDisabled && "cursor-not-allowed opacity-50 in-data-input-wrapper:opacity-100",
                    "group-disabled:cursor-not-allowed group-disabled:opacity-50 in-data-input-wrapper:group-disabled:opacity-100",

                    // Invalid state styles
                    isInvalid && "outline-error_subtle",
                    "group-invalid:outline-error_subtle",

                    // Invalid state with focus-within styles
                    isInvalid && isFocusWithin && "outline-error outline-2 -outline-offset-2",
                    isFocusWithin && "group-invalid:outline-error group-invalid:outline-2 group-invalid:-outline-offset-2",

                    context?.wrapperClassName,
                    wrapperClassName,
                )
            }
        >
            {orientation === "horizontal" && (
                <Button size={size} iconLeading={Minus} slot="decrement" color="tertiary" className="static h-full rounded-e-none" />
            )}

            {/* Input field */}
            <AriaInput
                {...(inputProps as AriaInputProps)}
                ref={ref}
                placeholder={placeholder}
                className={cx(
                    "text-primary placeholder:text-placeholder autofill:text-primary m-0 w-full bg-transparent ring-0 outline-hidden autofill:rounded-lg disabled:cursor-not-allowed",
                    orientation === "horizontal" && "text-center",
                    styles[inputSize],
                    context?.inputClassName,
                    inputClassName,
                )}
            />

            {orientation === "horizontal" && (
                <Button size={size} iconLeading={Plus} slot="increment" color="tertiary" className="static h-full rounded-s-none" />
            )}

            {orientation === "vertical" && (
                <div className={cx("border-primary flex w-7 shrink-0 flex-col border-s", size === "lg" && "w-7.5")}>
                    <AriaButton
                        slot="increment"
                        className="text-fg-quaternary outline-brand hover:bg-primary_hover hover:text-fg-quaternary_hover flex flex-1 cursor-pointer items-center justify-center transition duration-100 ease-linear disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        <ChevronUp className={cx("size-3 stroke-3", size === "lg" && "size-3.5 stroke-[2.57px]")} />
                    </AriaButton>
                    <AriaButton
                        slot="decrement"
                        className="border-primary text-fg-quaternary outline-brand hover:bg-primary_hover hover:text-fg-quaternary_hover flex flex-1 cursor-pointer items-center justify-center border-t transition duration-100 ease-linear disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        <ChevronDown className={cx("size-3 stroke-3", size === "lg" && "size-3.5 stroke-[2.57px]")} />
                    </AriaButton>
                </div>
            )}
        </AriaGroup>
    );
};

interface InputProps extends InputNumberBaseProps, Pick<AriaDateFieldProps<AriaDateValue>, "granularity"> {
    /** Label text for the input */
    label?: string;
    /** Helper text displayed below the input */
    hint?: ReactNode;
    hideRequiredIndicator?: boolean;
}

export const InputNumber = ({
    size = "md",
    placeholder,
    label,
    hint,
    hideRequiredIndicator,
    className,
    ref,
    groupRef,
    inputClassName,
    wrapperClassName,
    orientation = "vertical",
    ...props
}: InputProps) => {
    return (
        <AriaNumberField
            {...props}
            className={(state) =>
                cx("group flex h-max w-full flex-col items-start justify-start gap-1.5", typeof className === "function" ? className(state) : className)
            }
        >
            {({ isInvalid, isRequired }) => (
                <>
                    {label && (
                        <Label isRequired={hideRequiredIndicator ? !hideRequiredIndicator : isRequired} isInvalid={isInvalid}>
                            {label}
                        </Label>
                    )}

                    <InputNumberBase
                        {...{
                            ref,
                            groupRef,
                            size,
                            placeholder,
                            inputClassName,
                            wrapperClassName,
                            orientation,
                        }}
                    />

                    {hint && (
                        <HintText isInvalid={isInvalid} className={cx(size === "sm" && "text-xs")}>
                            {hint}
                        </HintText>
                    )}
                </>
            )}
        </AriaNumberField>
    );
};
