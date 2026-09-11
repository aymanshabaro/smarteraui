import type { FC } from "react";
import * as Notifications from "./notifications.demo";

export default {
    title: "Application components/Notifications",
    decorators: [
        (Story: FC) => (
            <div className="bg-primary relative h-[420px] w-full">
                <Story />
            </div>
        ),
    ],
};

export const NotificationExample = () => <Notifications.NotificationExample />;
NotificationExample.storyName = "Notification example";

export const IconDefault = () => <Notifications.IconDefault />;
IconDefault.storyName = "Icon default";

export const IconGray = () => <Notifications.IconGray />;
IconGray.storyName = "Icon gray";

export const IconBrand = () => <Notifications.IconBrand />;
IconBrand.storyName = "Icon brand";

export const IconError = () => <Notifications.IconError />;
IconError.storyName = "Icon error";

export const IconWarning = () => <Notifications.IconWarning />;
IconWarning.storyName = "Icon warning";

export const IconSuccess = () => <Notifications.IconSuccess />;
IconSuccess.storyName = "Icon success";

export const ProgressNotification = () => <Notifications.ProgressNotification />;
ProgressNotification.storyName = "Progress notification";

export const ImageNotification = () => <Notifications.ImageNotification />;
ImageNotification.storyName = "Image notification";

export const AvatarNotification = () => <Notifications.AvatarNotification />;
AvatarNotification.storyName = "Avatar notification";
