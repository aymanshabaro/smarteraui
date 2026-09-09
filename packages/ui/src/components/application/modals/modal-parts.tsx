"use client";

import type { FC, ReactNode } from "react";
import { CloseButton } from "@/components/base/buttons/close-button";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";
import { BackgroundPattern } from "@/components/shared-assets/background-patterns";
import { cx, sortCx } from "@/utils/cx";

const styles = sortCx({
    panel: {
        root: "bg-primary relative w-full rounded-xl shadow-xl sm:rounded-2xl",
    },
    header: {
        stacked: "relative flex flex-col gap-4 overflow-hidden px-4 pt-4 sm:px-6 sm:pt-6",
        horizontal: "relative flex gap-4 overflow-hidden px-4 pt-4 sm:px-6 sm:pt-6",
        text: "flex flex-col gap-0.5 sm:gap-1",
        title: "text-primary text-md font-semibold sm:text-lg",
        description: "text-tertiary text-sm",
        close: "absolute end-3 top-3",
    },
    body: {
        root: "flex flex-col gap-4 px-4 py-4 sm:px-6 sm:pt-5",
    },
    footer: {
        stretch: "flex flex-col-reverse gap-3 p-4 pt-6 *:w-full sm:flex-row sm:px-6 sm:pt-8 sm:pb-6 sm:*:flex-1",
        end: "flex flex-col-reverse gap-3 p-4 pt-6 *:w-full sm:flex-row sm:justify-end sm:px-6 sm:pt-8 sm:pb-6 sm:*:w-auto",
        between: "flex flex-col-reverse gap-3 p-4 pt-6 *:w-full sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:pt-8 sm:pb-6 sm:*:w-auto",
        divided: "border-secondary flex flex-col-reverse gap-3 border-t p-4 *:w-full sm:flex-row sm:justify-end sm:p-6 sm:*:w-auto",
    },
});

/** Width presets that mirror the reference modal sizes. */
export const modalWidths = sortCx({
    xs: "max-w-100",
    sm: "max-w-110",
    md: "max-w-120",
    lg: "max-w-150",
    xl: "max-w-160",
    "2xl": "max-w-180",
});

export interface ModalPanelProps {
    /** Width preset. Maps to the `max-w-*` of the reference modals. @default "xs" */
    width?: keyof typeof modalWidths;
    /** Extra classes merged last. */
    className?: string;
    children: ReactNode;
}

/**
 * The modal surface, without the portal/backdrop. Use it inside a `Dialog` that
 * already lives in a `Modal`, or on its own to preview a modal layout inline.
 */
export const ModalPanel = ({ width = "xs", className, children }: ModalPanelProps) => (
    <div className={cx(styles.panel.root, modalWidths[width], className)}>{children}</div>
);

export interface ModalHeaderProps {
    /** Heading text. */
    title: ReactNode;
    /** Supporting text below the heading. */
    description?: ReactNode;
    /** Icon rendered inside a `FeaturedIcon`. */
    icon?: FC<{ className?: string }>;
    /** Colour of the featured icon. @default "brand" */
    color?: "brand" | "gray" | "success" | "warning" | "error";
    /** Stacks the icon above the text, or places it beside it. @default "stacked" */
    layout?: "stacked" | "horizontal";
    /** Renders the decorative circles behind the featured icon. @default true */
    hasBackgroundPattern?: boolean;
    /** Renders a close button in the top corner. @default true */
    hasCloseButton?: boolean;
    /** Content rendered instead of the featured icon (an avatar, a logo, …). */
    media?: ReactNode;
    className?: string;
}

/**
 * The standard modal header: an optional featured icon (with the decorative
 * circle pattern behind it), a title, a description and a close button.
 */
export const ModalHeader = ({
    title,
    description,
    icon,
    color = "brand",
    layout = "stacked",
    hasBackgroundPattern = true,
    hasCloseButton = true,
    media,
    className,
}: ModalHeaderProps) => {
    const visual = media ?? (icon ? <FeaturedIcon icon={icon} color={color} theme="modern" size="lg" /> : null);

    return (
        <div className={cx(layout === "stacked" ? styles.header.stacked : styles.header.horizontal, className)}>
            {visual && (
                <div className="relative w-max">
                    {hasBackgroundPattern && (
                        <BackgroundPattern
                            pattern="circle"
                            size="sm"
                            className="absolute start-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rtl:translate-x-1/2"
                        />
                    )}
                    <div className="relative">{visual}</div>
                </div>
            )}

            <div className={cx(styles.header.text, layout === "horizontal" && "pt-0.5")}>
                <h2 className={styles.header.title}>{title}</h2>
                {description && <p className={styles.header.description}>{description}</p>}
            </div>

            {hasCloseButton && <CloseButton size="sm" slot={null} className={styles.header.close} />}
        </div>
    );
};

export interface ModalBodyProps {
    className?: string;
    children: ReactNode;
}

/** The scrollable content region between the header and the footer. */
export const ModalBody = ({ className, children }: ModalBodyProps) => <div className={cx(styles.body.root, className)}>{children}</div>;

export interface ModalFooterProps {
    /** How the actions are distributed on desktop. @default "stretch" */
    align?: keyof typeof styles.footer;
    className?: string;
    children: ReactNode;
}

/**
 * The action row. On mobile the buttons stack full width in reverse order so the
 * primary action sits at the bottom, matching the reference modals.
 */
export const ModalFooter = ({ align = "stretch", className, children }: ModalFooterProps) => (
    <div className={cx(styles.footer[align], className)}>{children}</div>
);
