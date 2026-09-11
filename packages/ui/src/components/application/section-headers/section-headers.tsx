import type { HTMLAttributes, ReactNode } from "react";
import { isValidElement } from "react";
import { cx, sortCx } from "../../../utils/cx";
import { Badge } from "../../base/badges/badges";

export const styles = sortCx({
    common: {
        root: "flex w-full flex-col",
        /** Title column + actions. Stacks below `md` so long action rows never overflow. */
        row: "flex flex-col gap-4 md:flex-row md:items-start",
        content: "flex min-w-0 flex-1 flex-col",
        titleRow: "flex flex-wrap items-center gap-2",
        title: "text-primary font-semibold",
        description: "text-tertiary mt-1 text-sm",
        actions: "flex flex-col gap-3 sm:flex-row sm:items-center md:shrink-0",
        /** Tab row (or any other secondary navigation) shown under the title row. */
        footer: "mt-5 w-full",
        divider: "border-secondary border-b pb-5",
    },
    sizes: {
        sm: { title: "text-md" },
        md: { title: "text-lg" },
        lg: { title: "text-xl" },
    },
});

export interface SectionHeaderProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
    /** Heading of the section. */
    title: ReactNode;
    /**
     * Badge shown next to the title. A string or number renders the default modern gray badge;
     * pass an element to control the badge's type, size or color.
     */
    badge?: ReactNode;
    /** Supporting copy shown under the title. */
    description?: ReactNode;
    /** Buttons, search inputs, button groups or any other controls pinned to the end of the title row. */
    actions?: ReactNode;
    /** Secondary navigation rendered under the title row — usually a `Tabs.List`. */
    children?: ReactNode;
    /**
     * Size of the heading.
     * @default "md"
     */
    size?: keyof typeof styles.sizes;
    /**
     * Draws the hairline under the header. Defaults to `true` when no `children` are given, and to
     * `false` when they are — a tab row already carries its own rule.
     */
    divider?: boolean;
    className?: string;
}

/**
 * The header of a page section: a title, an optional badge and supporting copy on the start side,
 * the section's controls on the end side, and an optional tab row underneath.
 */
export const SectionHeader = ({ title, badge, description, actions, children, size = "md", divider, className, ...props }: SectionHeaderProps) => {
    const showDivider = divider ?? !children;

    return (
        // A plain `div`, not `<header>`: a section header must not claim the page-level `banner` landmark.
        <div {...props} className={cx(styles.common.root, showDivider && styles.common.divider, className)}>
            <div className={styles.common.row}>
                <div className={styles.common.content}>
                    <div className={styles.common.titleRow}>
                        <h2 className={cx(styles.common.title, styles.sizes[size].title)}>{title}</h2>

                        {badge != null &&
                            (isValidElement(badge) ? (
                                badge
                            ) : (
                                <Badge type="modern" size="sm" color="gray">
                                    {badge}
                                </Badge>
                            ))}
                    </div>

                    {description && <p className={styles.common.description}>{description}</p>}
                </div>

                {actions && <div className={styles.common.actions}>{actions}</div>}
            </div>

            {children && <div className={styles.common.footer}>{children}</div>}
        </div>
    );
};

SectionHeader.displayName = "SectionHeader";
