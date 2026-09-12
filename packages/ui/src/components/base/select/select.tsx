"use client";

import type { FC, ReactNode, Ref, RefAttributes } from "react";
import { isValidElement, useId } from "react";
import type { SelectProps as AriaSelectProps } from "react-aria-components";
import { Button as AriaButton, ListBox as AriaListBox, Select as AriaSelect, SelectValue as AriaSelectValue } from "react-aria-components";
import { ChevronDown } from "@properui/icons";
import { cx } from "../../../utils/cx";
import { isReactComponent } from "../../../utils/is-react-component";
import { warnDomProps } from "../../../utils/warn-dom-props";
import { Avatar } from "../avatar/avatar";
import { HintText } from "../input/hint-text";
import { Label } from "../input/label";
import { ComboBox } from "./combobox";
import { Popover } from "./popover";
import { SelectItem } from "./select-item";
import { type CommonProps, SelectContext, type SelectItemType, sizes } from "./select-shared";

export { SelectContext, sizes, type CommonProps, type SelectItemType } from "./select-shared";

export interface SelectProps extends Omit<AriaSelectProps<SelectItemType>, "children" | "items">, RefAttributes<HTMLDivElement>, CommonProps {
    items?: SelectItemType[];
    popoverClassName?: string;
    icon?: FC | ReactNode;
    children: ReactNode | ((item: SelectItemType) => ReactNode);
}

interface SelectValueProps {
    isOpen: boolean;
    size: "sm" | "md" | "lg";
    isFocused: boolean;
    isDisabled: boolean;
    placeholder?: string;
    ref?: Ref<HTMLButtonElement>;
    icon?: FC | ReactNode;
    /**
     * Id of the field's `Label`. Passed through as the trigger's sole `aria-labelledby` so the
     * accessible name is just the label text, not React Aria's default "value, label" concatenation.
     */
    labelId?: string;
}

const SelectValue = ({ isOpen, isFocused, isDisabled, size, placeholder, icon, ref, labelId }: SelectValueProps) => {
    return (
        <AriaButton
            ref={ref}
            {...(labelId ? { "aria-labelledby": labelId } : {})}
            className={cx(
                "bg-primary ring-primary relative flex w-full cursor-pointer items-center rounded-lg shadow-xs ring-1 outline-hidden transition duration-100 ease-linear ring-inset",
                (isFocused || isOpen) && "ring-brand ring-2",
                isDisabled && "cursor-not-allowed opacity-50",
            )}
        >
            <AriaSelectValue<SelectItemType>
                className={(state) =>
                    cx(
                        "flex h-max w-full items-center justify-start truncate text-start align-middle",

                        sizes[size].root,

                        // With icon
                        (state.selectedItems[0]?.icon || icon) && sizes[size].withIcon,

                        // Icon styles
                        "*:data-icon:text-fg-quaternary *:data-icon:shrink-0",
                    )
                }
            >
                {(state) => {
                    const selectedItem = state.selectedItems[0];
                    const Icon = selectedItem?.icon || icon;

                    return (
                        <>
                            {selectedItem?.avatarUrl ? (
                                <Avatar size="xs" src={selectedItem.avatarUrl} alt={selectedItem.label} className={cx(size === "sm" && "size-5")} />
                            ) : isReactComponent(Icon) ? (
                                <Icon data-icon aria-hidden="true" />
                            ) : isValidElement(Icon) ? (
                                Icon
                            ) : null}

                            {selectedItem ? (
                                <section className={cx("flex w-full truncate", sizes[size].textContainer)}>
                                    <p className={cx("text-primary truncate font-medium", sizes[size].text)}>{selectedItem?.label}</p>
                                    {selectedItem?.supportingText && <p className={cx("text-tertiary", sizes[size].text)}>{selectedItem?.supportingText}</p>}
                                </section>
                            ) : (
                                <p className={cx("text-placeholder", sizes[size].text)}>{placeholder}</p>
                            )}

                            <ChevronDown
                                aria-hidden="true"
                                className={cx("text-fg-quaternary ms-auto shrink-0", size === "lg" ? "size-5" : "size-4 stroke-[2.25px]")}
                            />
                        </>
                    );
                }}
            </AriaSelectValue>
        </AriaButton>
    );
};

/**
 * To open the popover in a jsdom test, see the Testing page (`docs/testing`):
 * `fireEvent.click(trigger)` or `focus` + `ArrowDown` — `userEvent.click` alone toggles it shut,
 * because it fires both a focus and a click in the same tick.
 */
const Select = ({
    placeholder = "Select",
    icon,
    size = "md",
    children,
    items,
    label,
    hint,
    tooltip,
    hideRequiredIndicator,
    className,
    ...rest
}: SelectProps) => {
    warnDomProps("Select", rest as Record<string, unknown>, { disabled: "isDisabled", required: "isRequired" });

    const labelId = useId();

    return (
        <SelectContext.Provider value={{ size }}>
            <AriaSelect {...rest} className={(state) => cx("flex flex-col gap-1.5", typeof className === "function" ? className(state) : className)}>
                {(state) => (
                    <>
                        {label && (
                            <Label id={labelId} isRequired={hideRequiredIndicator ? false : state.isRequired} tooltip={tooltip}>
                                {label}
                            </Label>
                        )}

                        <SelectValue {...state} {...{ size, placeholder }} icon={icon} labelId={label ? labelId : undefined} />

                        <Popover size={size} className={rest.popoverClassName}>
                            <AriaListBox items={items} className="size-full outline-hidden">
                                {children}
                            </AriaListBox>
                        </Popover>

                        {hint && (
                            <HintText isInvalid={state.isInvalid} className={cx(size === "sm" && "text-xs")}>
                                {hint}
                            </HintText>
                        )}
                    </>
                )}
            </AriaSelect>
        </SelectContext.Provider>
    );
};

const _Select = Select as typeof Select & {
    ComboBox: typeof ComboBox;
    Item: typeof SelectItem;
};
_Select.ComboBox = ComboBox;
_Select.Item = SelectItem;

export { _Select as Select };
