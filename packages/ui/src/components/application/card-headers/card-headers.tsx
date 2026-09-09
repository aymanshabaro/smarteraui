import type { HTMLAttributes, ReactNode } from "react";
import { isValidElement } from "react";
import { Badge } from "@/components/base/badges/badges";
import { cx, sortCx } from "@/utils/cx";

export const styles = sortCx({
    common: {
        root: "bg-primary relative flex flex-col gap-4 md:flex-row md:items-start",
        /** Avatar column — pinned to the top of the copy so it lines up with the title row. */
        avatar: "flex shrink-0 items-start",
        content: "flex min-w-0 flex-1 flex-col",
        titleRow: "flex flex-wrap items-center gap-2",
        title: "text-primary font-semibold",
        description: "text-tertiary mt-1 text-sm",
        /** Trailing actions. Sits under the copy below `md`, at the end of the row above it. */
        actions: "flex items-center gap-3 md:shrink-0",
        divider: "border-secondary border-b",
    },
    sizes: {
        sm: { root: "px-4 py-4 md:px-5", title: "text-md" },
        md: { root: "px-4 py-5 md:px-6", title: "text-lg" },
    },
});

export interface CardHeaderProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
    /** Heading of the card. */
    title: ReactNode;
    /**
     * Badge shown next to the title. A string or number renders the default modern gray badge;
     * pass an element to control the badge's type, size or color.
     */
    badge?: ReactNode;
    /** Supporting copy shown under the title. */
    description?: ReactNode;
    /** Avatar (or any other media) rendered before the copy. */
    avatar?: ReactNode;
    /** Buttons, dropdowns or any other controls pinned to the end of the row. */
    actions?: ReactNode;
    /**
     * Vertical density of the header.
     * @default "md"
     */
    size?: keyof typeof styles.sizes;
    /**
     * Draws the hairline that separates the header from the card body.
     * @default false
     */
    divider?: boolean;
    className?: string;
}

/**
 * The top row of a card: a title, an optional badge, avatar and supporting copy on the
 * start side, and the card's actions on the end side. Stacks below the `md` breakpoint.
 */
export const CardHeader = ({ title, badge, description, avatar, actions, size = "md", divider = false, className, ...props }: CardHeaderProps) => (
    <div {...props} className={cx(styles.common.root, styles.sizes[size].root, divider && styles.common.divider, className)}>
        {avatar && <div className={styles.common.avatar}>{avatar}</div>}

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
);

CardHeader.displayName = "CardHeader";
