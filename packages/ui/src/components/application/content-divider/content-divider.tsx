"use client";

import type { HTMLAttributes, ReactNode } from "react";
import { cx, sortCx } from "@/utils/cx";

export const styles = sortCx({
    common: {
        root: "flex w-full shrink-0 items-center gap-x-2",
    },
    types: {
        "single-line": {
            root: "",
            line: "h-px flex-1 bg-border-secondary",
        },
        "dual-line": {
            root: "justify-center border-y border-secondary py-3",
        },
        "background-fill": {
            root: "justify-center rounded-lg bg-secondary py-2",
        },
    },
});

export interface ContentDividerProps extends HTMLAttributes<HTMLDivElement> {
    /**
     * The visual style of the content divider.
     * @default 'single-line'
     */
    type?: keyof typeof styles.types;
    /** Content rendered in the middle of the divider — a label, button, or button group. */
    children?: ReactNode;
}

/**
 * A horizontal divider that separates sections of content, with optional label,
 * button, or button-group content centered within it.
 */
export const ContentDivider = ({ type = "single-line", children, className, ...props }: ContentDividerProps) => {
    if (type === "single-line") {
        return (
            <div {...props} className={cx(styles.common.root, className)}>
                <div aria-hidden="true" className={styles.types["single-line"].line} />
                {children}
                <div aria-hidden="true" className={styles.types["single-line"].line} />
            </div>
        );
    }

    return (
        <div {...props} className={cx(styles.common.root, styles.types[type].root, className)}>
            {children}
        </div>
    );
};
