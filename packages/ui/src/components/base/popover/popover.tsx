"use client";

import type { ReactNode } from "react";
import { Dialog as AriaDialog, DialogTrigger as AriaDialogTrigger, Popover as AriaPopover, type PopoverProps as AriaPopoverProps } from "react-aria-components";
import { cx, sortCx } from "../../../utils/cx";

const styles = sortCx({
    root: "bg-primary ring-secondary_alt w-max max-w-sm origin-(--trigger-anchor-point) rounded-lg p-4 shadow-lg ring-1 outline-hidden will-change-transform",
});

export interface PopoverProps extends Omit<AriaPopoverProps, "children" | "className" | "isOpen" | "defaultOpen" | "onOpenChange" | "trigger" | "placement"> {
    /** The element that opens the popover when pressed, e.g. a `Button` or `ButtonUtility`. */
    trigger: ReactNode;
    /** Arbitrary content rendered inside the popover. Not bound to the trigger's width. */
    children: ReactNode;
    /**
     * Where the popover renders relative to its trigger.
     * @default "bottom"
     */
    placement?: AriaPopoverProps["placement"];
    /** Whether the popover is open. Omit to let it manage its own state. */
    isOpen?: boolean;
    /** Whether the popover is open by default, for uncontrolled usage. */
    defaultOpen?: boolean;
    /** Called when the open state changes. */
    onOpenChange?: (isOpen: boolean) => void;
    /** Additional classes merged onto the popover surface. */
    className?: string;
    /** Accessible label for the popover content, when it has no visible heading. */
    "aria-label"?: string;
    /** Id of an element that labels the popover content. */
    "aria-labelledby"?: string;
}

/**
 * A free-form overlay anchored to a trigger element. Unlike a `Select` or `Dropdown`
 * popover, its width is driven entirely by its own content, never the trigger's.
 * Dismisses on outside press and <kbd>Escape</kbd>, matching every other overlay in
 * the library.
 */
export const Popover = ({
    trigger,
    children,
    placement = "bottom",
    isOpen,
    defaultOpen,
    onOpenChange,
    className,
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledby,
    ...popoverProps
}: PopoverProps) => {
    return (
        <AriaDialogTrigger isOpen={isOpen} defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
            {trigger}
            <AriaPopover
                {...popoverProps}
                placement={placement}
                className={(state) =>
                    cx(
                        styles.root,
                        state.isEntering &&
                            "animate-in fade-in zoom-in-95 placement-top:slide-in-from-bottom-0.5 placement-bottom:slide-in-from-top-0.5 placement-left:slide-in-from-right-0.5 placement-right:slide-in-from-left-0.5 duration-150 ease-out",
                        state.isExiting &&
                            "animate-out fade-out zoom-out-95 placement-top:slide-out-to-bottom-0.5 placement-bottom:slide-out-to-top-0.5 placement-left:slide-out-to-right-0.5 placement-right:slide-out-to-left-0.5 duration-100 ease-in",
                        className,
                    )
                }
            >
                <AriaDialog aria-label={ariaLabel} aria-labelledby={ariaLabelledby} className="outline-hidden">
                    {children}
                </AriaDialog>
            </AriaPopover>
        </AriaDialogTrigger>
    );
};
Popover.displayName = "Popover";
