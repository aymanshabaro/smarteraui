"use client";

import type { FC, HTMLAttributes, ReactNode } from "react";
import { AlertCircle, AlertTriangle, CheckCircle, InfoCircle } from "@properui/icons";
import { cx, sortCx } from "../../../utils/cx";

const styles = sortCx({
    tones: {
        neutral: { root: "bg-secondary border-secondary", icon: "text-fg-secondary", title: "text-primary" },
        brand: { root: "bg-brand-primary border-brand", icon: "text-fg-brand-primary", title: "text-brand-primary" },
        success: { root: "bg-success-primary border-secondary", icon: "text-fg-success-primary", title: "text-success-primary" },
        warning: { root: "bg-warning-primary border-secondary", icon: "text-fg-warning-primary", title: "text-warning-primary" },
        error: { root: "bg-error-primary border-error", icon: "text-fg-error-primary", title: "text-error-primary" },
    },
});

type CalloutTone = keyof typeof styles.tones;

/**
 * Icon shown per tone when the consumer does not pass one. `border-success` and
 * `border-warning` tokens do not exist yet, so those two tones fall back to the
 * neutral `border-secondary` border until they land.
 */
const defaultIcons: Record<CalloutTone, FC<{ className?: string }>> = {
    neutral: InfoCircle,
    brand: InfoCircle,
    success: CheckCircle,
    warning: AlertTriangle,
    error: AlertCircle,
};

export interface CalloutProps extends Omit<HTMLAttributes<HTMLDivElement>, "title" | "className"> {
    /**
     * Semantic tone of the callout.
     * @default "neutral"
     */
    tone?: CalloutTone;
    /** Optional bold heading above the body copy. */
    title?: ReactNode;
    /** Icon shown beside the content. Pass `null` to omit it. Defaults to one matched to `tone`. */
    icon?: FC<{ className?: string }> | null;
    className?: string;
    children: ReactNode;
}

/**
 * A tone-tinted box for supplementary information, a tip, or a non-urgent warning
 * that sits inline with the surrounding content, e.g. in a form or a settings page.
 * For a transient, dismissible message use `Alert` instead.
 */
export const Callout = ({ tone = "neutral", title, icon, className, children, ...props }: CalloutProps) => {
    const toneStyles = styles.tones[tone];
    const Icon = icon === null ? null : (icon ?? defaultIcons[tone]);

    return (
        <div role="note" {...props} className={cx("flex gap-3 rounded-xl border p-4", toneStyles.root, className)}>
            {Icon && <Icon aria-hidden="true" className={cx("size-5 shrink-0", toneStyles.icon)} />}
            <div className="flex flex-col gap-1">
                {title && <p className={cx("text-sm font-semibold", toneStyles.title)}>{title}</p>}
                <div className="text-secondary text-sm">{children}</div>
            </div>
        </div>
    );
};
Callout.displayName = "Callout";
