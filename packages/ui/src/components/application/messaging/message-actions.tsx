"use client";

import type { FC } from "react";
import { Button as AriaButton } from "react-aria-components";
import { cx } from "../../../utils/cx";

export interface MessageActionItem {
    /** Accessible name of the action, e.g. `Copy`. */
    label: string;
    /** Icon component reference rendered inside the button. */
    icon: FC<{ className?: string }>;
    /** Called when the action is pressed. */
    onPress?: () => void;
}

export interface MessageActionsProps {
    /** The actions to render, in order. */
    actions: MessageActionItem[];
    /** Additional classes merged onto the toolbar. */
    className?: string;
}

/**
 * The floating toolbar revealed when a message is hovered or focused. It is rendered inside a
 * `group/msg` container, which every message body provides.
 */
export const MessageActions = ({ actions, className }: MessageActionsProps) => {
    if (actions.length === 0) return null;

    return (
        <div
            className={cx(
                // The toolbar always uses the dark palette so it reads as an overlay on top of any
                // bubble. `.dark-mode` is the library's theme scope class — it re-binds the tokens
                // below it — rather than a `dark:` utility, so the classes stay semantic.
                "dark-mode bg-primary_alt absolute end-2 -bottom-5 z-1 flex gap-1.5 rounded-lg px-2 py-1.5 opacity-0 shadow-xl transition duration-100 ease-linear group-focus-within/msg:opacity-100 group-hover/msg:opacity-100",
                className,
            )}
        >
            {actions.map(({ label, icon: Icon, onPress }) => (
                <AriaButton
                    key={label}
                    aria-label={label}
                    onPress={onPress}
                    className="text-fg-quaternary hover:text-fg-quaternary_hover outline-focus-ring cursor-pointer rounded p-0.5 transition duration-100 ease-linear focus-visible:outline-2 focus-visible:outline-offset-2"
                >
                    <Icon className="size-4" />
                </AriaButton>
            ))}
        </div>
    );
};

MessageActions.displayName = "MessageActions";
