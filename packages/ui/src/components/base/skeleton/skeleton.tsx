"use client";

import type { HTMLAttributes } from "react";
import { cx, sortCx } from "../../../utils/cx";

const styles = sortCx({
    root: "bg-tertiary animate-pulse rounded-md",
});

export interface SkeletonProps extends Omit<HTMLAttributes<HTMLDivElement>, "className"> {
    /**
     * Size and shape the placeholder with utility classes, e.g. `"h-10 w-10 rounded-full"`
     * for an avatar or `"h-4 w-32"` for a line of text.
     */
    className?: string;
}

/**
 * A pulsing block placeholder shown while real content is loading. Unstyled beyond a
 * shape: pass `className` to size it. Hidden from assistive tech since it carries no
 * information of its own.
 */
export const Skeleton = ({ className, ...props }: SkeletonProps) => <div aria-hidden="true" {...props} className={cx(styles.root, className)} />;
Skeleton.displayName = "Skeleton";

export interface SkeletonTextProps {
    /**
     * Number of placeholder lines to render.
     * @default 3
     */
    lines?: number;
    /** Additional classes merged onto the wrapping element. */
    className?: string;
    /** Additional classes merged onto every line. */
    lineClassName?: string;
}

/**
 * A block of placeholder text lines, full width except for the last line, which
 * renders shorter to read as the ragged end of a paragraph.
 */
export const SkeletonText = ({ lines = 3, className, lineClassName }: SkeletonTextProps) => (
    <div aria-hidden="true" className={cx("flex flex-col gap-2", className)}>
        {Array.from({ length: lines }, (_, index) => (
            <Skeleton key={index} className={cx("h-3 w-full rounded-full", index === lines - 1 && lines > 1 && "w-2/3", lineClassName)} />
        ))}
    </div>
);
SkeletonText.displayName = "SkeletonText";
