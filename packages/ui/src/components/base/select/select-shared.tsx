"use client";

import { createContext } from "react";

// `SelectItemType` lives in `@/utils/select-item-type` so that data modules (`@/utils/countries`,
// `@/utils/timezones`) do not depend on the select component. Re-exported here for consumers that
// import it from `select-shared` (the reference source location) or from `select`/`multi-select`.
export type { SelectItemType } from "@/utils/select-item-type";

export interface CommonProps {
    /** Helper text displayed below the input. */
    hint?: string;
    /** Field label displayed above the input. */
    label?: string;
    /** Tooltip text for the help icon next to the label. */
    tooltip?: string;
    /**
     * The size of the component.
     * @default "md"
     */
    size?: "sm" | "md" | "lg";
    /** Placeholder text when no value is selected. */
    placeholder?: string;
    /** Whether to hide the required indicator from the label. */
    hideRequiredIndicator?: boolean;
}

export const sizes = {
    sm: {
        root: "py-2 pl-3 pr-2.5 gap-2 *:data-icon:size-4 *:data-icon:stroke-[2.25px]",
        withIcon: "",
        text: "text-sm",
        textContainer: "gap-x-1.5",
        shortcut: "pr-2.5",
    },
    md: { root: "py-2 px-3 gap-2 *:data-icon:size-5", withIcon: "", text: "text-md", textContainer: "gap-x-1.5", shortcut: "pr-2.5" },
    lg: { root: "py-2.5 px-3.5 gap-2 *:data-icon:size-5", withIcon: "", text: "text-md", textContainer: "gap-x-1.5", shortcut: "pr-3" },
};

export const SelectContext = createContext<{ size: "sm" | "md" | "lg" }>({ size: "md" });
