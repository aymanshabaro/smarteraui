"use client";

import type { FC, SVGProps } from "react";
import { Button as AriaButton } from "react-aria-components";
import { cx } from "@/utils/cx";

/** Delivery state of a sent message. */
export type MessageStatusType = "sent" | "delivered" | "failed";

const SentGlyph = (props: SVGProps<SVGSVGElement>) => (
    <svg width={16} height={16} viewBox="0 0 16 16" fill="none" {...props}>
        <path d="M13 5L7 11L4 8" className="stroke-fg-quaternary" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const DeliveredGlyph = (props: SVGProps<SVGSVGElement>) => (
    <svg width={16} height={16} viewBox="0 0 16 16" fill="none" {...props}>
        <path
            d="M10.5 5L4.5 11L1.5 8M14.5 5L8.5 11L6.5 9"
            className="stroke-fg-brand-secondary"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

const FailedGlyph = (props: SVGProps<SVGSVGElement>) => (
    <svg width={16} height={16} viewBox="0 0 16 16" fill="none" {...props}>
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            className="fill-fg-error-primary"
            d="M8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14ZM7.25 5C7.25 4.58579 7.58579 4.25 8 4.25C8.41421 4.25 8.75 4.58579 8.75 5V8.5C8.75 8.91421 8.41421 9.25 8 9.25C7.58579 9.25 7.25 8.91421 7.25 8.5V5ZM8 11.75C8.41421 11.75 8.75 11.4142 8.75 11C8.75 10.5858 8.41421 10.25 8 10.25C7.58579 10.25 7.25 10.5858 7.25 11C7.25 11.4142 7.58579 11.75 8 11.75Z"
        />
    </svg>
);

const glyphs: Record<MessageStatusType, FC<SVGProps<SVGSVGElement>>> = {
    sent: SentGlyph,
    delivered: DeliveredGlyph,
    failed: FailedGlyph,
};

const defaultLabels: Record<MessageStatusType, string> = {
    sent: "Sent",
    delivered: "Delivered",
    failed: "Not delivered",
};

export interface MessageStatusProps {
    /** Delivery state to indicate. */
    status: MessageStatusType;
    /** Accessible name of the indicator. Defaults to a readable name for the status. */
    label?: string;
    /** Makes the indicator pressable, e.g. to retry a message that failed to send. */
    onPress?: () => void;
    /** Additional classes merged onto the indicator. */
    className?: string;
}

/** The tick (or alert) shown next to the timestamp of a message you sent. */
export const MessageStatus = ({ status, label, onPress, className }: MessageStatusProps) => {
    const Glyph = glyphs[status];
    const accessibleLabel = label ?? defaultLabels[status];

    if (onPress) {
        return (
            <AriaButton
                aria-label={accessibleLabel}
                onPress={onPress}
                className="outline-focus-ring flex cursor-pointer rounded focus-visible:outline-2 focus-visible:outline-offset-2"
            >
                <Glyph className={className} />
            </AriaButton>
        );
    }

    return <Glyph role="img" aria-label={accessibleLabel} className={cx("shrink-0", className)} />;
};

MessageStatus.displayName = "MessageStatus";
