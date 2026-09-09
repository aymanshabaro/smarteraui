"use client";

import type { ComponentProps, FC, HTMLAttributes, ReactNode } from "react";
import { AlertCircle, AlertTriangle, CheckCircle } from "@smarteraui/icons";
import { CloseButton } from "@/components/base/buttons/close-button";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";
import { cx, sortCx } from "@/utils/cx";

export const styles = sortCx({
    layouts: {
        /** A self-contained card that floats above the surrounding content. */
        floating: {
            root: "relative flex w-full flex-col gap-4 rounded-xl bg-primary_alt p-4 shadow-lg ring ring-secondary_alt sm:flex-row",
            content: "flex flex-1 flex-col gap-3 pe-8 sm:pt-0.5",
            text: "flex flex-col gap-1",
            actions: "flex flex-col-reverse items-start gap-3 sm:flex-row sm:items-center",
            closeWrapper: "absolute end-2 top-2 flex items-center justify-center",
        },
        /** An edge-to-edge banner, typically pinned under a page or app header. */
        "full-width": {
            root: "relative flex w-full flex-col gap-4 border-b border-secondary bg-primary px-4 py-4 sm:flex-row sm:items-center sm:px-8",
            content: "flex flex-1 flex-col gap-3 pe-8 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:pe-0",
            text: "flex flex-col gap-1",
            actions: "flex flex-col-reverse items-start gap-3 sm:flex-row sm:items-center",
            closeWrapper: "absolute end-2 top-2 flex items-center justify-center sm:static",
        },
    },
});

/**
 * Featured-icon recipe per alert color. `default` uses the neutral "modern" square,
 * every other color uses the concentric "outline" ring in that hue.
 */
const featuredIcons = {
    default: { theme: "modern", color: "gray" },
    brand: { theme: "outline", color: "brand" },
    gray: { theme: "outline", color: "gray" },
    error: { theme: "outline", color: "error" },
    warning: { theme: "outline", color: "warning" },
    success: { theme: "outline", color: "success" },
} as const satisfies Record<string, Pick<ComponentProps<typeof FeaturedIcon>, "theme" | "color">>;

/** Icon used when the consumer does not pass one, matched to the alert's color. */
const defaultIcons: Record<keyof typeof featuredIcons, FC<{ className?: string }>> = {
    default: AlertCircle,
    brand: AlertCircle,
    gray: AlertCircle,
    error: AlertCircle,
    warning: AlertTriangle,
    success: CheckCircle,
};

export interface AlertProps extends Omit<HTMLAttributes<HTMLDivElement>, "title" | "color"> {
    /** Short, bold summary of what happened. */
    title: ReactNode;
    /** Supporting copy rendered under the title. */
    description?: ReactNode;
    /**
     * How the alert sits in the page: a floating card, or a full-bleed banner.
     * @default "floating"
     */
    layout?: keyof typeof styles.layouts;
    /**
     * Semantic color of the leading featured icon.
     * @default "default"
     */
    color?: keyof typeof featuredIcons;
    /** Icon component (or element) shown in the featured icon. Defaults to one matching `color`. */
    icon?: FC<{ className?: string }> | ReactNode;
    /** Action buttons rendered under the copy (beside it from `sm` up on full-width alerts). */
    actions?: ReactNode;
    /**
     * Whether to render a close button.
     * @default false
     */
    isDismissable?: boolean;
    /** Called when the close button is pressed. */
    onClose?: () => void;
    /**
     * Accessible label for the close button.
     * @default "Dismiss"
     */
    dismissLabel?: string;
    className?: string;
}

/**
 * An inline message that draws attention to a change of state — a released update, a failed
 * payment, a nearly-full plan. Composed from `FeaturedIcon` and `CloseButton`.
 */
export const Alert = ({
    title,
    description,
    layout = "floating",
    color = "default",
    icon,
    actions,
    isDismissable = false,
    onClose,
    dismissLabel = "Dismiss",
    className,
    children,
    ...props
}: AlertProps) => {
    const layoutStyles = styles.layouts[layout];

    return (
        <div role="alert" {...props} className={cx(layoutStyles.root, className)}>
            <FeaturedIcon size="md" icon={icon ?? defaultIcons[color]} {...featuredIcons[color]} />

            <div className={layoutStyles.content}>
                <div className={layoutStyles.text}>
                    <p className="text-primary text-sm font-semibold">{title}</p>
                    {description && <p className="text-tertiary text-sm">{description}</p>}
                </div>

                {actions && <div className={layoutStyles.actions}>{actions}</div>}

                {children}
            </div>

            {isDismissable && (
                <div className={layoutStyles.closeWrapper}>
                    <CloseButton size="sm" slot={null} label={dismissLabel} onPress={() => onClose?.()} />
                </div>
            )}
        </div>
    );
};

Alert.displayName = "Alert";
