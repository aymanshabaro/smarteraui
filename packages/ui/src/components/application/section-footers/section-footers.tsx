import type { HTMLAttributes, ReactNode } from "react";
import { cx, sortCx } from "../../../utils/cx";

export const styles = sortCx({
    common: {
        root: "flex w-full flex-col gap-4 md:flex-row md:items-center",
        /** Anything pinned to the start of the row — a filter, a hint, a page count. */
        contentLeading: "flex min-w-0 flex-1 flex-col gap-3 sm:flex-row sm:items-center",
        /** Actions pinned to the end of the row. Reversed below `sm` so the primary action sits on top. */
        actions: "flex flex-col-reverse gap-3 sm:flex-row sm:items-center md:shrink-0",
    },
    types: {
        /** Rule above a page section's actions, sitting directly on the page background. */
        section: "border-secondary border-t pt-5",
        /** The bottom row of a card: a rule, a tinted ground and the card's bottom corners. */
        card: "border-secondary bg-secondary rounded-b-xl border-t px-4 py-4 md:px-6",
    },
});

export interface SectionFooterProps extends HTMLAttributes<HTMLDivElement> {
    /**
     * Where the footer sits. `section` draws a rule over the page background; `card` renders the
     * bottom row of a card.
     * @default "section"
     */
    type?: keyof typeof styles.types;
    /** Content pinned to the start of the row — a button group, a filter, a hint. */
    contentLeading?: ReactNode;
    /** Actions pinned to the end of the row. */
    children?: ReactNode;
    className?: string;
}

/**
 * The closing row of a page section or card: optional content on the start side and the
 * section's actions on the end side. Stacks below the `md` breakpoint.
 */
export const SectionFooter = ({ type = "section", contentLeading, children, className, ...props }: SectionFooterProps) => (
    // A plain `div`, not `<footer>`: a section footer must not claim the page-level `contentinfo` landmark.
    <div {...props} className={cx(styles.common.root, styles.types[type], className)}>
        {contentLeading ? <div className={styles.common.contentLeading}>{contentLeading}</div> : <div className="flex-1" />}

        {children && <div className={styles.common.actions}>{children}</div>}
    </div>
);

SectionFooter.displayName = "SectionFooter";
