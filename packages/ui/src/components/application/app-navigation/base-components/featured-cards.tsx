"use client";

import type { ReactNode } from "react";
import { AlertCircle, CheckCircle, ChevronRight, Copy01, Link01, MessageChatCircle, Zap } from "@properui/icons";
import { Avatar } from "@/components/base/avatar/avatar";
import { AvatarAddButton } from "@/components/base/avatar/base-components/avatar-add-button";
import { Badge, BadgeWithDot } from "@/components/base/badges/badges";
import { Button } from "@/components/base/buttons/button";
import { ButtonUtility } from "@/components/base/buttons/button-utility";
import { CloseButton } from "@/components/base/buttons/close-button";
import { Input } from "@/components/base/input/input";
import { ProgressBarCircle } from "@/components/base/progress-indicators/progress-circles";
import { ProgressBar, ProgressBarBase } from "@/components/base/progress-indicators/progress-indicators";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";
import { QRCode } from "@/components/shared-assets/qr-code/qr-code";
import { cx } from "@/utils/cx";

const styles = {
    /** The filled card used by the progress/image cards. */
    filled: "relative flex flex-col rounded-xl bg-secondary p-4",
    /** The outlined card used by the CTA cards. */
    outlined: "relative flex flex-col gap-4 rounded-xl bg-primary p-4 ring-1 ring-secondary ring-inset",
    /** The outlined card variant that manages its own vertical rhythm. */
    outlinedFlush: "relative flex flex-col rounded-xl bg-primary p-4 ring-1 ring-secondary ring-inset",
    title: "text-sm font-semibold text-primary",
    description: "text-sm text-tertiary",
};

export interface FeaturedCardCommonProps {
    /** Heading of the card. */
    title: string;
    /** Supporting copy under the heading. */
    description: ReactNode;
    /** Label of the primary action. */
    confirmLabel: string;
    /** Additional CSS classes to apply to the card. */
    className?: string;
    /** Called when the card is dismissed. */
    onDismiss: () => void;
    /** Called when the primary action is pressed. */
    onConfirm: () => void;
}

export const FeaturedCardProgressBar = ({
    title,
    description,
    confirmLabel,
    progress,
    className,
    onDismiss,
    onConfirm,
}: FeaturedCardCommonProps & {
    /** Completion percentage shown by the progress bar. */
    progress: number;
}) => {
    return (
        <div className={cx(styles.filled, className)}>
            <p className={styles.title}>{title}</p>
            <p className={cx("mt-1", styles.description)}>{description}</p>

            <div className="absolute end-1 top-1">
                <CloseButton onPress={onDismiss} size="sm" slot={null} />
            </div>

            <div className="mt-4 flex">
                <ProgressBar value={progress} />
            </div>

            <div className="mt-4 flex gap-3">
                <Button onPress={onDismiss} color="link-gray" size="sm">
                    Dismiss
                </Button>
                <Button onPress={onConfirm} color="link-color" size="sm">
                    {confirmLabel}
                </Button>
            </div>
        </div>
    );
};

export const FeaturedCardProgressCircle = ({
    title,
    description,
    confirmLabel,
    progress,
    className,
    onDismiss,
    onConfirm,
}: FeaturedCardCommonProps & {
    /** Completion percentage shown by the progress circle. */
    progress: number;
}) => {
    return (
        <div className={cx(styles.filled, className)}>
            <div className="w-16">
                <ProgressBarCircle value={progress} size="xxs" />
            </div>

            <div className="absolute end-1 top-1">
                <CloseButton onPress={onDismiss} size="sm" slot={null} />
            </div>
            <div className="mt-3">
                <p className={styles.title}>{title}</p>
                <p className={cx("mt-1", styles.description)}>{description}</p>
            </div>
            <div className="mt-4 flex gap-3">
                <Button onPress={onDismiss} color="link-gray" size="sm">
                    Dismiss
                </Button>
                <Button onPress={onConfirm} color="link-color" size="sm">
                    {confirmLabel}
                </Button>
            </div>
        </div>
    );
};

export const FeaturedCardImage = ({
    title,
    description,
    confirmLabel,
    imageSrc,
    imageAlt,
    className,
    onDismiss,
    onConfirm,
}: FeaturedCardCommonProps & {
    /** Source of the preview image. */
    imageSrc: string;
    /** Alternative text for the preview image. */
    imageAlt?: string;
}) => {
    return (
        <div className={cx(styles.filled, className)}>
            <p className={styles.title}>{title}</p>
            <p className={cx("mt-1", styles.description)}>{description}</p>

            <div className="absolute end-1 top-1">
                <CloseButton onPress={onDismiss} size="sm" slot={null} />
            </div>

            <div className="relative mt-4 w-full">
                <img src={imageSrc} alt={imageAlt ?? ""} className="aspect-video w-full rounded-lg object-cover outline-1 -outline-offset-1 outline-black/10" />
                <svg
                    aria-hidden="true"
                    viewBox="0 0 16 16"
                    fill="none"
                    className="text-fg-white absolute start-1/2 top-1/2 size-5 -translate-x-1/2 -translate-y-1/2 rtl:translate-x-1/2"
                >
                    <path
                        d="M2.2 2.863c0-1.251 1.373-2.018 2.439-1.362l8.347 5.136c1.015.625 1.015 2.1 0 2.726l-8.347 5.137C3.572 15.155 2.2 14.388 2.2 13.137V2.863Z"
                        fill="currentColor"
                    />
                </svg>
            </div>

            <div className="mt-4 flex gap-3">
                <Button onPress={onDismiss} color="link-gray" size="sm">
                    Dismiss
                </Button>
                <Button onPress={onConfirm} color="link-color" size="sm">
                    {confirmLabel}
                </Button>
            </div>
        </div>
    );
};

export const FeaturedCardCookiePreferences = ({
    title,
    description,
    confirmLabel,
    dismissLabel = "Reject all",
    className,
    onDismiss,
    onConfirm,
}: FeaturedCardCommonProps & {
    /** Label of the secondary action. */
    dismissLabel?: string;
}) => {
    return (
        <div className={cx(styles.filled, className)}>
            <FeaturedIcon icon={AlertCircle} color="brand" theme="outline" size="sm" />

            <div className="absolute end-1 top-1">
                <CloseButton onPress={onDismiss} size="sm" slot={null} />
            </div>

            <div className="mt-3">
                <p className={styles.title}>{title}</p>
                <p className={cx("mt-1", styles.description)}>{description}</p>
            </div>

            <div className="mt-4 flex gap-3">
                <Button onPress={onDismiss} color="link-gray" size="sm">
                    {dismissLabel}
                </Button>
                <Button onPress={onConfirm} color="link-color" size="sm">
                    {confirmLabel}
                </Button>
            </div>
        </div>
    );
};

export const FeaturedCardReferralLink = ({
    title,
    description,
    referralLink,
    className,
    onDismiss,
    onCopy,
}: Omit<FeaturedCardCommonProps, "confirmLabel" | "onConfirm"> & {
    /** The referral link shown in the read-only input. */
    referralLink: string;
    /** Called when the copy button is pressed. */
    onCopy: () => void;
}) => {
    return (
        <div className={cx(styles.outlinedFlush, className)}>
            <FeaturedIcon icon={Link01} theme="modern" size="md" />

            <div className="absolute end-1 top-1">
                <CloseButton onPress={onDismiss} size="sm" slot={null} />
            </div>

            <div className="mt-3">
                <p className={styles.title}>{title}</p>
                <p className={cx("mt-1", styles.description)}>{description}</p>
            </div>

            <div className="mt-4 flex gap-1">
                <Input isReadOnly size="sm" aria-label="Referral link" value={referralLink} />
                <ButtonUtility size="sm" color="tertiary" tooltip="Copy link" icon={Copy01} onPress={onCopy} />
            </div>
        </div>
    );
};

export const FeaturedCardOnboardingSteps = ({
    title,
    confirmLabel,
    steps,
    className,
    onConfirm,
}: Omit<FeaturedCardCommonProps, "description" | "onDismiss"> & {
    /** Steps of the onboarding checklist. */
    steps: { label: string; isComplete: boolean }[];
}) => {
    const completed = steps.filter((step) => step.isComplete).length;
    const progress = steps.length ? Math.round((completed / steps.length) * 100) : 0;

    return (
        <div className={cx(styles.outlined, className)}>
            <div className="flex flex-col gap-3">
                <div className="flex justify-between">
                    <span className={styles.title}>{title}</span>
                    <span className="text-quaternary text-sm">
                        Step {completed} of {steps.length}
                    </span>
                </div>
                <div className="flex">
                    <ProgressBarBase value={progress} />
                </div>
            </div>

            <ul className="flex flex-col gap-2">
                {steps.map((step) => (
                    <li key={step.label} className="flex gap-1.5 pe-2">
                        <CheckCircle aria-hidden="true" className={cx("size-5 shrink-0", step.isComplete ? "text-fg-brand-primary" : "text-fg-quaternary")} />
                        <span className="text-tertiary text-sm font-medium">{step.label}</span>
                    </li>
                ))}
            </ul>

            <Button onPress={onConfirm} color="secondary" size="sm">
                {confirmLabel}
            </Button>
        </div>
    );
};

export const FeaturedCardUpgradeCTA = ({
    title,
    description,
    confirmLabel,
    badge,
    className,
    onDismiss,
    onConfirm,
}: FeaturedCardCommonProps & {
    /** Optional badge shown next to the heading. */
    badge?: string;
}) => {
    return (
        <div className={cx(styles.outlined, className)}>
            <div className="absolute end-1 top-1">
                <CloseButton onPress={onDismiss} size="sm" slot={null} />
            </div>

            <div className="flex flex-col gap-3">
                <FeaturedIcon icon={Zap} theme="modern" size="md" />

                <div className="flex flex-col gap-1">
                    <p className={cx("flex items-center gap-1.5", styles.title)}>
                        {title}
                        {badge && (
                            <Badge size="sm" type="modern">
                                {badge}
                            </Badge>
                        )}
                    </p>
                    <p className={styles.description}>{description}</p>
                </div>
            </div>

            <Button onPress={onConfirm} size="sm">
                {confirmLabel}
            </Button>
        </div>
    );
};

export const FeaturedCardSupportCTA = ({ title, description, confirmLabel, className, onDismiss, onConfirm }: FeaturedCardCommonProps) => {
    return (
        <div className={cx(styles.outlined, className)}>
            <div className="absolute end-1 top-1">
                <CloseButton onPress={onDismiss} size="sm" slot={null} />
            </div>

            <div className="flex flex-col gap-3">
                <BadgeWithDot size="sm" type="modern" color="success" className="w-max">
                    Online
                </BadgeWithDot>

                <div className="flex flex-col gap-1">
                    <p className={cx("flex items-center gap-1.5", styles.title)}>{title}</p>
                    <p className={styles.description}>{description}</p>
                </div>
            </div>

            <Button onPress={onConfirm} color="secondary" size="sm" iconLeading={MessageChatCircle}>
                {confirmLabel}
            </Button>
        </div>
    );
};

export const FeaturedCardEventCTA = ({
    title,
    description,
    confirmLabel,
    attendees,
    remainingCount,
    className,
    onDismiss,
    onConfirm,
}: FeaturedCardCommonProps & {
    /** Avatars of the people already attending. */
    attendees: { src: string; alt: string }[];
    /** How many further attendees are hidden behind the "+N" avatar. */
    remainingCount?: number;
}) => {
    return (
        <div className={cx(styles.outlined, className)}>
            <div className="absolute end-1 top-1">
                <CloseButton onPress={onDismiss} size="sm" slot={null} />
            </div>

            <div className="flex gap-2">
                <div className="flex -space-x-1 rtl:space-x-reverse">
                    {attendees.map((attendee) => (
                        <Avatar key={attendee.src} size="xs" src={attendee.src} alt={attendee.alt} className="ring-bg-primary ring-[1.5px]" />
                    ))}
                    {remainingCount ? <Avatar size="xs" initials={`+${remainingCount}`} className="ring-bg-primary ring-[1.5px]" /> : null}
                </div>

                <AvatarAddButton size="xs" title="Invite a colleague" />
            </div>

            <div className="flex flex-col gap-1">
                <p className={cx("flex items-center gap-1.5", styles.title)}>
                    {title}
                    <BadgeWithDot size="sm" type="modern" color="success">
                        Live
                    </BadgeWithDot>
                </p>
                <p className={styles.description}>{description}</p>
            </div>

            <div className="flex items-center gap-3">
                <Button onPress={onDismiss} color="link-gray" size="sm">
                    Dismiss
                </Button>
                <Button onPress={onConfirm} color="link-color" size="sm">
                    {confirmLabel}
                </Button>
            </div>
        </div>
    );
};

export const FeaturedCardMessage = ({
    author,
    timestamp,
    message,
    confirmLabel,
    className,
    onDismiss,
    onConfirm,
}: Omit<FeaturedCardCommonProps, "title" | "description"> & {
    /** The person who sent the message. */
    author: { name: string; src: string };
    /** Human-readable time of the message. */
    timestamp: string;
    /** The message body. */
    message: ReactNode;
}) => {
    return (
        <div className={cx(styles.outlined, className)}>
            <div className="absolute end-1 top-1">
                <CloseButton onPress={onDismiss} size="sm" slot={null} />
            </div>

            <div className="flex flex-col gap-3">
                <Avatar size="sm" src={author.src} alt={author.name} status="online" />

                <div className="flex flex-col gap-1">
                    <p className={cx("flex items-center gap-2", styles.title)}>
                        {author.name}
                        <span className="text-quaternary text-sm font-normal">{timestamp}</span>
                    </p>
                    <p className={styles.description}>{message}</p>
                </div>
            </div>

            <div className="flex items-center gap-3">
                <Button onPress={onDismiss} color="link-gray" size="sm">
                    Dismiss
                </Button>
                <Button onPress={onConfirm} color="link-color" size="sm">
                    {confirmLabel}
                </Button>
            </div>
        </div>
    );
};

export const FeaturedCardCurrentProjects = ({
    title,
    confirmLabel,
    projects,
    className,
    onDismiss,
    onConfirm,
}: Omit<FeaturedCardCommonProps, "description"> & {
    /** Projects listed in the card. */
    projects: { label: string; href: string; dotClassName: string }[];
}) => {
    return (
        <div className={cx(styles.outlined, className)}>
            <div className="absolute end-1 top-1">
                <CloseButton onPress={onDismiss} size="sm" slot={null} />
            </div>

            <div className="flex flex-col gap-3">
                <p className={cx("flex items-center gap-2", styles.title)}>{title}</p>

                <ul className="flex flex-col gap-2">
                    {projects.map((project) => (
                        <li key={project.label} className="flex">
                            <a
                                href={project.href}
                                className="group text-tertiary outline-focus-ring hover:text-tertiary_hover flex w-full items-center gap-2 rounded-xs transition duration-100 focus-visible:outline-2 focus-visible:outline-offset-2"
                            >
                                <span className="flex size-2.5 items-center justify-center">
                                    <span className={cx("size-2 rounded-full", project.dotClassName)} />
                                </span>
                                <span className="flex-1 text-sm font-medium">{project.label}</span>
                                <ChevronRight
                                    aria-hidden="true"
                                    className="text-fg-quaternary transition-inherit-all group-hover:text-fg-quaternary_hover size-4 rtl:-scale-x-100"
                                />
                            </a>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="flex items-center gap-3">
                <Button onPress={onConfirm} color="link-color" size="sm">
                    {confirmLabel}
                </Button>
            </div>
        </div>
    );
};

export const FeaturedCardFreeTrialCTA = ({
    title,
    confirmLabel,
    daysLeft,
    progress,
    className,
    onConfirm,
}: Omit<FeaturedCardCommonProps, "description" | "onDismiss"> & {
    /** How many days of the trial remain. */
    daysLeft: number;
    /** How much of the trial has elapsed, as a percentage. */
    progress: number;
}) => {
    return (
        <div className={cx(styles.outlined, className)}>
            <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between gap-1">
                    <span className={styles.title}>{title}</span>
                    <span className="text-quaternary text-sm">{daysLeft} days left</span>
                </div>
                <div className="flex">
                    <ProgressBarBase value={progress} />
                </div>
            </div>

            <Button onPress={onConfirm} color="secondary" size="sm">
                {confirmLabel}
            </Button>
        </div>
    );
};

export const FeaturedCardQRCode = ({
    title,
    description,
    value,
    className,
    onDismiss,
}: Omit<FeaturedCardCommonProps, "confirmLabel" | "onConfirm"> & {
    /** The value encoded in the QR code. */
    value: string;
}) => {
    return (
        <div className={cx(styles.outlined, className)}>
            <div className="absolute end-1 top-1">
                <CloseButton onPress={onDismiss} size="sm" slot={null} />
            </div>

            <div className="flex flex-col gap-1">
                <p className={cx("truncate pe-6", styles.title)}>{title}</p>
                <p className={styles.description}>{description}</p>
            </div>

            <div className="relative flex w-full items-center justify-center">
                <QRCode size="md" value={value} />
            </div>
        </div>
    );
};
