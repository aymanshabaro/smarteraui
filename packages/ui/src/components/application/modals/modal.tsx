"use client";

import type { DialogProps as AriaDialogProps, ModalOverlayProps as AriaModalOverlayProps } from "react-aria-components";
import { Dialog as AriaDialog, DialogTrigger as AriaDialogTrigger, Modal as AriaModal, ModalOverlay as AriaModalOverlay } from "react-aria-components";
import { cx } from "../../../utils/cx";

/**
 * Manages the open state of a modal. Wrap a trigger element and a `ModalOverlay`
 * with it, and control it with `isOpen` / `defaultOpen` / `onOpenChange`.
 */
export const DialogTrigger = AriaDialogTrigger;

/**
 * Backdrop and positioning layer. Renders in a portal, fades in/out, and owns the
 * vertical padding (`--modal-pt` / `--modal-pb`) that caps the modal's height.
 *
 * Dismissal is split across two independent props, both inherited from React Aria's
 * `ModalOverlay`:
 * - `isDismissable={false}` (default `false`) stops **pointer** dismissal only —
 *   clicking the backdrop outside the modal. It does not affect Escape.
 * - `isKeyboardDismissDisabled={true}` stops the **Escape** key from closing it.
 *   It does not affect outside clicks.
 *
 * A modal that must not be dismissed by the user needs both set, plus a `ModalHeader`
 * with `hasCloseButton={false}` (or an explicit confirm/cancel footer) — see the
 * "confirm dialog" demo.
 */
export const ModalOverlay = (props: AriaModalOverlayProps) => {
    return (
        <AriaModalOverlay
            {...props}
            className={(state) =>
                cx(
                    "bg-overlay/70 fixed inset-0 z-50 flex min-h-dvh w-full items-end justify-center px-4 outline-hidden backdrop-blur-[6px] sm:items-center sm:justify-center sm:px-8",
                    // Vertical padding
                    "pt-(--modal-pt) pb-(--modal-pb) [--modal-pb:clamp(16px,8vh,64px)] [--modal-pt:16px] sm:[--modal-pb:32px] sm:[--modal-pt:32px]",
                    // Animations
                    state.isEntering && "animate-in fade-in duration-300 ease-out",
                    state.isExiting && "animate-out fade-out duration-200 ease-in",
                    typeof props.className === "function" ? props.className(state) : props.className,
                )
            }
        />
    );
};

/**
 * The modal container: the rounded surface that zooms in/out. Pass a `max-w-*`
 * through `className` to size it.
 */
export const Modal = (props: AriaModalOverlayProps) => (
    <AriaModal
        {...props}
        className={(state) =>
            cx(
                "bg-primary w-full rounded-xl align-middle shadow-xl outline-hidden max-sm:overflow-y-auto sm:rounded-2xl",
                // Max height based on parent's vertical padding
                "max-h-[calc(var(--visual-viewport-height)-var(--modal-pt)-var(--modal-pb))]",
                // Animations
                state.isEntering && "animate-in zoom-in-95 duration-300 ease-out",
                state.isExiting && "animate-out zoom-out-95 duration-200 ease-in",
                typeof props.className === "function" ? props.className(state) : props.className,
            )
        }
    />
);

/**
 * The dialog content wrapper. Provides `role="dialog"`, focus management and the
 * `close` button slot. Always give it an `aria-label` or an `aria-labelledby`.
 */
export const Dialog = (props: AriaDialogProps) => (
    <AriaDialog {...props} className={cx("relative max-h-[inherit] w-full overflow-y-auto outline-hidden", props.className)} />
);
