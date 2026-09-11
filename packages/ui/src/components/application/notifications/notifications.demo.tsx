"use client";

import type { CSSProperties } from "react";
import { useState } from "react";
import { Button as AriaButton } from "react-aria-components";
import { AlertCircle, CheckCircle, Codepen, CursorClick01, InfoCircle, UploadCloud02 } from "@properui/icons";
import { cx } from "../../../utils/cx";
import { IMAGES, avatar } from "../../../utils/demo-assets";
import { Button } from "../../base/buttons/button";
import type { NotificationProps } from "./notifications";
import { Notification } from "./notifications";
import type { NotifyOptions } from "./notifications-provider";
import { NotificationsProvider, notify } from "./notifications-provider";

const hintClasses =
    "outline-focus-ring flex cursor-pointer items-center gap-1 rounded-md text-sm font-medium text-quaternary transition duration-100 ease-linear hover:text-tertiary focus-visible:outline-2 focus-visible:outline-offset-2";

/**
 * Renders one notification twice: statically, so the docs preview always shows the layout, and
 * as a real toast when the hint is pressed. A real app mounts a single `<NotificationsProvider>`
 * in its root layout — every preview mounts its own because each one is an isolated demo.
 */
const Preview = ({ notification, options, className }: { notification: Omit<NotificationProps, "onClose">; options?: NotifyOptions; className?: string }) => {
    const [isDismissed, setIsDismissed] = useState(false);

    return (
        <>
            <div className="absolute inset-0 flex items-center justify-center px-4">
                <div className={cx("w-full max-w-sm -translate-y-2", className)}>
                    {!isDismissed && <Notification {...notification} onClose={() => setIsDismissed(true)} />}
                </div>
            </div>

            <div className="absolute inset-x-0 bottom-4 flex justify-center">
                <AriaButton
                    className={hintClasses}
                    onPress={() => {
                        setIsDismissed(false);
                        notify(notification, options);
                    }}
                >
                    <CursorClick01 aria-hidden="true" className="-mt-[3px] size-5" />
                    Click to trigger a toast
                </AriaButton>
            </div>

            <NotificationsProvider />
        </>
    );
};

const dismissAndChangelog = (
    <>
        <Button size="sm" color="link-gray">
            Dismiss
        </Button>
        <Button size="sm" color="link-color">
            Changelog
        </Button>
    </>
);

const undoAction = (
    <Button size="sm" color="link-color">
        Undo action
    </Button>
);

// The reference marks a new release with the isometric box glyph, which ships as `Codepen`.
const release: Omit<NotificationProps, "onClose"> = {
    icon: Codepen,
    title: "Version 1.4.1 is now available",
    description: "Includes the all new dashboard view. Pages and exports will now load faster.",
    actions: (
        <>
            <Button size="sm" color="link-gray">
                Later
            </Button>
            <Button size="sm" color="link-color">
                Install now
            </Button>
        </>
    ),
};

const feature: Omit<NotificationProps, "onClose"> = {
    icon: InfoCircle,
    iconTheme: "outline",
    title: "We've just released a new feature",
    description: "Check out the all new dashboard view. Pages and exports now load faster.",
    actions: dismissAndChangelog,
};

const unpublished: Omit<NotificationProps, "onClose"> = {
    icon: AlertCircle,
    iconTheme: "outline",
    title: "This project has been unpublished",
    description: "Removing all users has unpublished this project. Add users to republish.",
    actions: undoAction,
};

export const NotificationExample = () => <Preview notification={release} />;

export const IconDefault = () => <Preview notification={release} />;

export const IconGray = () => <Preview notification={{ ...feature, color: "gray" }} />;

export const IconBrand = () => <Preview notification={{ ...feature, color: "brand" }} />;

export const IconError = () => <Preview notification={{ ...unpublished, color: "error" }} />;

export const IconWarning = () => <Preview notification={{ ...unpublished, color: "warning" }} />;

export const IconSuccess = () => (
    <Preview
        notification={{
            icon: CheckCircle,
            iconTheme: "outline",
            color: "success",
            title: "Successfully updated profile",
            description: "Your changes have been saved and your profile is live. Your team can make edits.",
            actions: (
                <>
                    <Button size="sm" color="link-gray">
                        Dismiss
                    </Button>
                    <Button size="sm" color="link-color">
                        View changes
                    </Button>
                </>
            ),
        }}
    />
);

export const ProgressNotification = () => (
    <Preview
        notification={{
            icon: UploadCloud02,
            title: "Uploading 'website-FINAL06.fig'",
            description: "Please wait while we upload your file.",
            progress: 75,
            actions: (
                <>
                    <Button size="sm" color="link-gray">
                        Cancel
                    </Button>
                    <Button size="sm" color="link-color">
                        Upload another
                    </Button>
                </>
            ),
        }}
    />
);

export const ImageNotification = () => (
    <Preview
        className="max-w-124"
        options={{ style: { "--width": "496px" } as CSSProperties }}
        notification={{
            image: IMAGES.landscape[0],
            title: "We've just released a new update!",
            description: "Check out the all new dashboard view. Pages and exports now load faster.",
            actions: dismissAndChangelog,
        }}
    />
);

export const AvatarNotification = () => (
    <Preview
        notification={{
            avatar: { src: avatar(9).src, alt: avatar(9).name, status: "online" },
            title: avatar(9).name,
            time: "2 mins ago",
            description: "I've finished adding my notes. Happy for us to review whenever you're ready!",
            actions: dismissAndChangelog,
        }}
    />
);
