"use client";

import type { ReactNode } from "react";
import { ToggleButton as AriaToggleButton, type ToggleButtonProps as AriaToggleButtonProps } from "react-aria-components";
import { cx, sortCx } from "../../../utils/cx";
import type { BadgeColors } from "../badges/badge-types";
import { filledColors } from "../badges/badges";

const styles = sortCx({
    common: "outline-focus-ring inline-flex w-max cursor-pointer items-center gap-1 rounded-full whitespace-nowrap ring-1 ring-inset transition duration-100 ease-linear focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
    sizes: {
        sm: "px-2.5 py-0.5 text-xs font-medium",
        md: "px-3 py-1 text-sm font-medium",
    },
    unselected: "bg-primary text-secondary ring-primary hover:bg-primary_hover",
});

export interface ToggleChipProps extends Omit<AriaToggleButtonProps, "className" | "children"> {
    /**
     * Size of the chip.
     * @default "md"
     */
    size?: keyof typeof styles.sizes;
    /**
     * Color used when the chip is selected, mapped to the badge color palette.
     * @default "gray"
     */
    color?: BadgeColors;
    /** Chip label. */
    children: ReactNode;
    className?: string;
}

/**
 * A standalone pressable chip that toggles on and off, e.g. a filter pill or a
 * multi-select tag. Unlike `Tag`/`InputTags`, it does not need a group: use it on
 * its own, or map over an array of options to build one yourself.
 */
export const ToggleChip = ({ size = "md", color = "gray", className, children, ...props }: ToggleChipProps) => {
    const selectedColors = filledColors[color];

    return (
        <AriaToggleButton
            {...props}
            className={(state) => cx(styles.common, styles.sizes[size], state.isSelected ? cx(selectedColors.root, "ring-2") : styles.unselected, className)}
        >
            {children}
        </AriaToggleButton>
    );
};
ToggleChip.displayName = "ToggleChip";
