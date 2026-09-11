"use client";

import type { FC, ReactNode } from "react";
import { cx, sortCx } from "../../../utils/cx";
import { Avatar } from "../../base/avatar/avatar";
import { CloseButton } from "../../base/buttons/close-button";
import { ProgressBar } from "../../base/progress-indicators/progress-indicators";
import { FeaturedIcon } from "../../foundations/featured-icon/featured-icon";

const styles = sortCx({
    root: {
        // Sonner publishes `--z-index` and `--width` on the toast element it wraps around the
        // notification; both fall back to their initial value when rendered outside a <Toaster>.
        base: "relative z-[var(--z-index)] flex max-w-full flex-col rounded-xl bg-primary_alt p-4 shadow-lg xs:w-[var(--width)] xs:flex-row",
        default: "gap-4 ring ring-secondary_alt",
        avatar: "items-start gap-4 ring ring-secondary_alt",
        // The media layout hands padding and ring over to the copy column from `md` up, so the
        // illustration can bleed into the rounded corner instead of sitting inside the padding.
        media: "gap-3 max-md:ring-1 max-md:ring-secondary_alt xs:gap-0 md:p-0",
    },
    content: {
        base: "flex flex-col",
        default: "flex-1 md:pe-8",
        avatar: "flex-1 pe-8",
        media: "gap-4 rounded-e-xl bg-primary_alt md:gap-3 md:p-4 md:ps-5 md:ring-1 md:ring-secondary_alt",
    },

    copy: "flex flex-col gap-1",
    title: "text-sm font-semibold text-fg-primary",
    description: "text-sm text-fg-secondary",
    time: "text-sm text-fg-quaternary",
    actions: "flex gap-3",
    close: "absolute end-2 top-2 flex items-center justify-center",
    mediaDesktop: "-my-px hidden w-40 shrink-0 overflow-hidden rounded-s-xl outline-1 -outline-offset-1 outline-black/10 md:block",
    mediaMobile: "h-40 w-full overflow-hidden rounded-md bg-secondary md:hidden",
    mediaImage: "size-full object-cover",
});

/** The colour of the featured icon rendered at the start of the notification. */
export type NotificationColor = "gray" | "brand" | "error" | "warning" | "success";

/** The treatment of the featured icon: a bordered square or concentric rings. */
export type NotificationIconTheme = "modern" | "outline";

export interface NotificationProps {
    /** The headline of the notification. */
    title: ReactNode;
    /** Supporting copy rendered under the title. */
    description?: ReactNode;
    /** A timestamp rendered next to the title, e.g. `2 mins ago`. */
    time?: string;
    /** The icon rendered inside the featured icon at the start of the notification. */
    icon?: FC<{ className?: string }> | ReactNode;
    /**
     * The colour of the featured icon.
     *
     * @default "gray"
     */
    color?: NotificationColor;
    /**
     * The treatment of the featured icon.
     *
     * @default "modern"
     */
    iconTheme?: NotificationIconTheme;
    /** An avatar rendered at the start of the notification instead of a featured icon. */
    avatar?: { src?: string | null; alt?: string; initials?: string; status?: "online" | "offline" };
    /** An illustration rendered beside the copy on desktop and above the actions on mobile. */
    image?: { src: string; alt?: string };
    /** Upload progress between `0` and `100`. Renders a progress bar under the copy. */
    progress?: number;
    /**
     * Formats the label rendered under the progress bar.
     *
     * @default (value) => `${value}% uploaded...`
     */
    progressFormatter?: (value: number) => string;
    /** The buttons rendered under the copy. */
    actions?: ReactNode;
    /** Called when the close button is pressed. Hides the button when omitted. */
    onClose?: () => void;
    /**
     * The accessible label of the close button.
     *
     * @default "Dismiss"
     */
    closeLabel?: string;
    /** Additional classes merged onto the root element. */
    className?: string;
}

/**
 * The card rendered inside a toast by `notify()`, and usable on its own as an inline banner.
 */
export const Notification = ({
    title,
    description,
    time,
    icon,
    color = "gray",
    iconTheme = "modern",
    avatar,
    image,
    progress,
    progressFormatter = (value) => `${value}% uploaded...`,
    actions,
    onClose,
    closeLabel = "Dismiss",
    className,
}: NotificationProps) => {
    const layout = image ? "media" : avatar ? "avatar" : "default";

    return (
        <div className={cx(styles.root.base, styles.root[layout], className)}>
            {image && (
                <div className={styles.mediaDesktop}>
                    {/* Only one of the two crops is ever displayed, so both may carry the same alt text. */}
                    <img src={image.src} alt={image.alt ?? ""} className={styles.mediaImage} />
                </div>
            )}

            {avatar && <Avatar size="md" src={avatar.src} alt={avatar.alt} initials={avatar.initials} status={avatar.status} />}

            {!avatar && !image && icon && <FeaturedIcon size="md" theme={iconTheme} color={color} icon={icon} />}

            <div
                className={cx(
                    styles.content.base,
                    styles.content[layout],
                    layout !== "media" && (progress === undefined ? "gap-3" : "gap-4"),
                    // The outline icon is only 20px tall, so the copy needs a nudge to sit on its centre line.
                    layout === "default" && Boolean(icon) && iconTheme === "outline" && "md:pt-0.5",
                )}
            >
                <div className={cx(styles.copy, layout === "media" && "pe-8")}>
                    {time ? (
                        <div className="flex items-center gap-2">
                            <p className={styles.title}>{title}</p>
                            <span className={styles.time}>{time}</span>
                        </div>
                    ) : (
                        <p className={styles.title}>{title}</p>
                    )}
                    {description && <p className={styles.description}>{description}</p>}
                </div>

                {image && (
                    <div className={styles.mediaMobile}>
                        <img src={image.src} alt={image.alt ?? ""} className={styles.mediaImage} />
                    </div>
                )}

                {progress !== undefined && <ProgressBar value={progress} labelPosition="bottom" valueFormatter={(value) => progressFormatter(value)} />}

                {actions && <div className={styles.actions}>{actions}</div>}
            </div>

            {onClose && (
                <div className={styles.close}>
                    <CloseButton size="sm" slot={null} label={closeLabel} onPress={onClose} />
                </div>
            )}
        </div>
    );
};
