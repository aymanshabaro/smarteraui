"use client";

import { useState } from "react";
import { Button } from "../../base/buttons/button";
import { ConfirmDialog } from "./confirm-dialog";

export const ConfirmDialogExample = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <Button color="secondary" onPress={() => setIsOpen(true)}>
                Save changes
            </Button>
            {/* `onConfirm` does not need to close the dialog itself: ConfirmDialog closes once it resolves. */}
            <ConfirmDialog
                isOpen={isOpen}
                onOpenChange={setIsOpen}
                title="Save changes?"
                description="Your changes will be applied immediately and everyone in the workspace will see them."
                confirmLabel="Save"
                onConfirm={() => {}}
            />
        </>
    );
};

export const Destructive = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <Button color="secondary" onPress={() => setIsOpen(true)}>
                Delete project
            </Button>
            <ConfirmDialog
                isOpen={isOpen}
                onOpenChange={setIsOpen}
                tone="destructive"
                title="Delete project"
                description="This action cannot be undone and every file inside it will be removed."
                confirmLabel="Delete"
                onConfirm={() => {}}
            />
        </>
    );
};

export const AsyncConfirm = () => {
    const [isOpen, setIsOpen] = useState(false);

    // Simulates a network request. The confirm button shows a loading state until it
    // resolves, then the dialog closes on its own.
    const handleConfirm = () => new Promise<void>((resolve) => setTimeout(resolve, 1200));

    return (
        <>
            <Button color="secondary" onPress={() => setIsOpen(true)}>
                Publish changes
            </Button>
            <ConfirmDialog
                isOpen={isOpen}
                onOpenChange={setIsOpen}
                title="Publish changes"
                description="This makes the draft visible to everyone with access to the workspace."
                confirmLabel="Publish"
                onConfirm={handleConfirm}
            />
        </>
    );
};
