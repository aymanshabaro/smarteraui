import type { FC } from "react";
import * as Demos from "./confirm-dialog.demo";

export default {
    title: "Application components/Confirm dialogs",
    decorators: [
        (Story: FC) => (
            <div className="bg-secondary flex min-h-screen w-full items-center justify-center p-8">
                <Story />
            </div>
        ),
    ],
};

export const ConfirmDialogExample = () => <Demos.ConfirmDialogExample />;
ConfirmDialogExample.storyName = "Confirm dialog example";

export const Destructive = () => <Demos.Destructive />;
Destructive.storyName = "Destructive";

export const AsyncConfirm = () => <Demos.AsyncConfirm />;
AsyncConfirm.storyName = "Async confirm";
