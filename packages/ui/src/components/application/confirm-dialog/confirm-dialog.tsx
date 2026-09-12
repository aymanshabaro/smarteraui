"use client";

import type { FC, ReactNode } from "react";
import { useState } from "react";
import { AlertTriangle } from "@properui/icons";
import { Button } from "../../base/buttons/button";
import { Dialog, DialogTrigger, Modal, ModalOverlay } from "../modals/modal";
import { ModalFooter, ModalHeader, ModalPanel, type ModalPanelProps } from "../modals/modal-parts";

export interface ConfirmDialogProps {
    /** Whether the dialog is open. */
    isOpen?: boolean;
    /** Whether the dialog is open by default, for uncontrolled usage. */
    defaultOpen?: boolean;
    /** Called when the open state changes: the confirm/cancel buttons, Escape, or an outside press. */
    onOpenChange?: (isOpen: boolean) => void;
    /** Heading text. */
    title: ReactNode;
    /** Supporting copy under the heading. */
    description?: ReactNode;
    /**
     * Label for the confirm button.
     * @default "Confirm"
     */
    confirmLabel?: string;
    /**
     * Label for the cancel button.
     * @default "Cancel"
     */
    cancelLabel?: string;
    /**
     * `"destructive"` colors the confirm button and the header icon as a warning.
     * @default "default"
     */
    tone?: "default" | "destructive";
    /**
     * Called when the confirm button is pressed. May return a promise: while it is
     * pending, the confirm button shows a loading state and the dialog cannot be
     * dismissed.
     */
    onConfirm: () => void | Promise<void>;
    /** Icon shown in the header. Defaults to a warning triangle for `tone="destructive"`, none otherwise. */
    icon?: FC<{ className?: string }>;
    /**
     * Width preset, forwarded to the underlying modal panel.
     * @default "sm"
     */
    width?: ModalPanelProps["width"];
}

/**
 * A small "are you sure?" dialog composed from the `modals` building blocks. Controlled
 * with `isOpen`/`onOpenChange`, so it can be opened from a menu item, a table row action,
 * or anywhere else that is not itself the dialog's trigger.
 *
 * ```tsx
 * <ConfirmDialog
 *   isOpen={isOpen}
 *   onOpenChange={setIsOpen}
 *   tone="destructive"
 *   title="Delete project"
 *   description="This action cannot be undone."
 *   confirmLabel="Delete"
 *   onConfirm={() => deleteProject(id)}
 * />
 * ```
 */
export const ConfirmDialog = ({
    isOpen,
    defaultOpen,
    onOpenChange,
    title,
    description,
    confirmLabel = "Confirm",
    cancelLabel = "Cancel",
    tone = "default",
    onConfirm,
    icon,
    width = "sm",
}: ConfirmDialogProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const resolvedIcon = icon ?? (tone === "destructive" ? AlertTriangle : undefined);

    // Routed through the `Dialog` render prop's `close`, not straight to `onOpenChange`, so this
    // also closes an *uncontrolled* dialog (`defaultOpen` with no `isOpen`): `close` calls the
    // trigger's own internal state setter, which then fires `onOpenChange` as a notification,
    // exactly like Escape, an outside press, or the header's `X` already do.
    const handleConfirm = async (close: () => void) => {
        setIsLoading(true);
        try {
            await onConfirm();
            close();
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <DialogTrigger isOpen={isOpen} defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
            <ModalOverlay isDismissable={!isLoading} isKeyboardDismissDisabled={isLoading}>
                <Modal>
                    <Dialog aria-label={typeof title === "string" ? title : "Confirm"}>
                        {({ close }) => (
                            <ModalPanel width={width}>
                                <ModalHeader
                                    title={title}
                                    description={description}
                                    icon={resolvedIcon}
                                    color={tone === "destructive" ? "error" : "brand"}
                                    hasBackgroundPattern={false}
                                    hasCloseButton={!isLoading}
                                />
                                <ModalFooter>
                                    <Button size="lg" color="secondary" onPress={close} isDisabled={isLoading}>
                                        {cancelLabel}
                                    </Button>
                                    <Button
                                        size="lg"
                                        color={tone === "destructive" ? "primary-destructive" : "primary"}
                                        onPress={() => handleConfirm(close)}
                                        isLoading={isLoading}
                                    >
                                        {confirmLabel}
                                    </Button>
                                </ModalFooter>
                            </ModalPanel>
                        )}
                    </Dialog>
                </Modal>
            </ModalOverlay>
        </DialogTrigger>
    );
};
ConfirmDialog.displayName = "ConfirmDialog";
