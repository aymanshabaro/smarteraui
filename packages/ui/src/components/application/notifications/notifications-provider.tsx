"use client";

import { Toaster as SonnerToaster, type ToasterProps as SonnerToasterProps, toast } from "sonner";
import { Notification, type NotificationProps } from "./notifications";

export type NotificationsProviderProps = SonnerToasterProps;

/**
 * Mounts the toast viewport that `notify()` renders into. Mount it **once**, near the root of
 * the app — every mounted viewport renders its own copy of each toast.
 *
 * Sonner owns the live region, the stacking, the swipe-to-dismiss gesture and the
 * `prefers-reduced-motion` handling; the notification itself is plain `<Notification>` markup.
 */
export const NotificationsProvider = ({ position = "bottom-right", offset = 24, gap = 12, ...props }: NotificationsProviderProps) => (
    <SonnerToaster position={position} offset={offset} gap={gap} {...props} />
);

/** The sonner options accepted alongside the notification content (`duration`, `id`, `position`…). */
export type NotifyOptions = Parameters<typeof toast.custom>[1];

/**
 * Shows a `<Notification>` as a toast and returns its id. The close button dismisses the toast,
 * so `onClose` is supplied for you.
 */
export const notify = (props: Omit<NotificationProps, "onClose">, options?: NotifyOptions) =>
    toast.custom((id) => <Notification {...props} onClose={() => toast.dismiss(id)} />, options);

/** Dismisses one notification by id, or every notification when called without an id. */
export const dismissNotification = (id?: number | string) => toast.dismiss(id);
