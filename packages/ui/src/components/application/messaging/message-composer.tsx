"use client";

import type { FC, FormEvent } from "react";
import { Button as AriaButton } from "react-aria-components";
import { ChevronDown, Send01 } from "@properui/icons";
import { cx, sortCx } from "../../../utils/cx";
import { Avatar } from "../../base/avatar/avatar";
import { Button } from "../../base/buttons/button";
import { ButtonUtility } from "../../base/buttons/button-utility";
import { InputBase } from "../../base/input/input";
import { TextAreaBase } from "../../base/textarea/textarea";

/**
 * Shape of the composer:
 * - `minimal` — a single-line field with an icon-only send button beside it.
 * - `expanded` — a multi-line field with its tools and a text send action inside the field.
 * - `advanced` — a multi-line field over a footer bar carrying the sending identity and tools.
 */
export type MessageComposerVariant = "minimal" | "expanded" | "advanced";

export interface MessageComposerTool {
    /** Accessible name of the tool, and its label in the `advanced` footer. */
    label: string;
    /** Icon component reference rendered inside the button. */
    icon: FC<{ className?: string }>;
    /** Called when the tool is pressed. */
    onPress?: () => void;
}

export interface MessageComposerSender {
    /** Name of the identity messages are sent as. */
    name: string;
    /** Avatar image of that identity. */
    avatarSrc?: string;
}

const styles = sortCx({
    form: {
        minimal: "flex h-max items-center gap-3",
        expanded: "relative flex h-max items-center gap-3",
        advanced: "bg-secondary ring-secondary relative flex h-max flex-col rounded-xl ring-1 ring-inset",
    },
    field: {
        expanded: "h-32 w-full resize-none",
        advanced: "h-32 w-full resize-y rounded-xl",
    },
    footerButton: "text-xs font-semibold *:data-icon:size-4",
});

export interface MessageComposerProps {
    /**
     * Shape of the composer.
     *
     * @default "minimal"
     */
    variant?: MessageComposerVariant;
    /** Accessible name of the message field. */
    label?: string;
    /** `name` attribute of the message field. */
    name?: string;
    /** Placeholder shown while the field is empty. */
    placeholder?: string;
    /** Accessible name of the send action, and its label on the multi-line variants. */
    sendLabel?: string;
    /** Tool pinned to the top-end corner of the field. Multi-line variants only. */
    primaryTool?: MessageComposerTool;
    /** Tools rendered beside the send action (`expanded`) or in the footer bar (`advanced`). */
    tools?: MessageComposerTool[];
    /** The identity messages are sent as, shown in the footer bar. `advanced` only. */
    sender?: MessageComposerSender;
    /** Called when the composer is submitted. */
    onSubmit?: (event: FormEvent<HTMLFormElement>) => void;
    /** Additional classes merged onto the form. */
    className?: string;
}

/** The field a message is written in, in the three shapes the library ships. */
export const MessageComposer = ({
    variant = "minimal",
    label = "Message",
    name = "message",
    placeholder = "Message",
    sendLabel = "Send",
    primaryTool,
    tools = [],
    sender,
    onSubmit,
    className,
}: MessageComposerProps) => {
    const primaryToolButton = primaryTool && (
        <ButtonUtility
            size="xs"
            color="tertiary"
            icon={primaryTool.icon}
            aria-label={primaryTool.label}
            onPress={primaryTool.onPress}
            className="absolute end-2 top-2"
        />
    );

    if (variant === "minimal") {
        return (
            <form onSubmit={onSubmit} className={cx(styles.form.minimal, className)}>
                <InputBase aria-label={label} name={name} placeholder={placeholder} size="lg" />
                <Button type="submit" size="lg" color="secondary" iconLeading={Send01} aria-label={sendLabel} />
            </form>
        );
    }

    if (variant === "advanced") {
        return (
            <form onSubmit={onSubmit} className={cx(styles.form.advanced, className)}>
                <div className="relative flex">
                    <TextAreaBase aria-label={label} name={name} placeholder={placeholder} className={styles.field.advanced} />
                    {primaryToolButton}
                </div>

                <div className={cx("flex w-full items-center gap-3 px-3 py-2", sender ? "justify-between" : "justify-end")}>
                    {sender && (
                        <AriaButton className="outline-focus-ring flex cursor-pointer items-center gap-1 rounded focus-visible:outline-2 focus-visible:outline-offset-2">
                            {/* The name is right beside it, so the portrait is decorative. */}
                            <Avatar size="xs" src={sender.avatarSrc} alt="" className="size-4" />
                            <span className="flex items-center gap-0.5">
                                <span className="text-tertiary truncate text-xs font-semibold">{sender.name}</span>
                                <ChevronDown aria-hidden="true" className="text-fg-quaternary size-3 stroke-3" />
                            </span>
                        </AriaButton>
                    )}

                    <div className="flex items-center gap-3">
                        {tools.map((tool) => (
                            <Button key={tool.label} size="sm" color="link-gray" iconLeading={tool.icon} onPress={tool.onPress} className={styles.footerButton}>
                                {tool.label}
                            </Button>
                        ))}
                    </div>
                </div>
            </form>
        );
    }

    return (
        <form onSubmit={onSubmit} className={cx(styles.form.expanded, className)}>
            <TextAreaBase aria-label={label} name={name} placeholder={placeholder} className={styles.field.expanded} />
            {primaryToolButton}

            <div className="absolute end-3.5 bottom-2 flex items-center gap-2">
                {tools.length > 0 && (
                    <div className="flex items-center gap-0.5">
                        {tools.map((tool) => (
                            <ButtonUtility key={tool.label} size="xs" color="tertiary" icon={tool.icon} aria-label={tool.label} onPress={tool.onPress} />
                        ))}
                    </div>
                )}
                <Button type="submit" size="sm" color="link-color">
                    {sendLabel}
                </Button>
            </div>
        </form>
    );
};

MessageComposer.displayName = "MessageComposer";
