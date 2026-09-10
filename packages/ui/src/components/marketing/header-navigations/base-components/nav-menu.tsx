"use client";

import type { FC, ReactNode } from "react";
import { PlayCircle } from "@properui/icons";
import { Button } from "@/components/base/buttons/button";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";
import { cx, sortCx } from "@/utils/cx";

export const styles = sortCx({
    /** The floating panel used by the "dropdown" and "floating" families. */
    card: "overflow-hidden rounded-2xl bg-primary shadow-lg ring-1 ring-secondary_alt",
    /** The full-bleed panel that spans the whole header width. */
    fullPanel: "w-full bg-primary shadow-lg",
    /** Inner width constraint for a full-bleed panel. */
    fullPanelInner: "mx-auto flex w-full max-w-container flex-col px-4 py-6 md:px-8 md:py-8",
    /** The interactive row shared by every menu entry. */
    row: "group flex gap-3 rounded-lg p-3 outline-focus-ring transition duration-100 ease-linear hover:bg-primary_hover focus-visible:outline-2 focus-visible:outline-offset-2",
    columnHeading: "px-3 pb-1 text-sm font-semibold text-brand-secondary",
    itemTitle: "flex items-center gap-2 text-sm font-semibold text-primary",
    itemDescription: "text-sm text-tertiary",
});

export interface NavMenuLinkType {
    /** Label of the link. */
    label: string;
    /** Supporting copy under the label. */
    description?: string;
    /** URL the link points at. */
    href: string;
    /** Icon rendered next to the label. */
    icon?: FC<{ className?: string }>;
    /** Optional badge rendered after the label. */
    badge?: ReactNode;
}

/** A menu entry with a plain brand-coloured icon. */
export const NavMenuItem = ({ label, description, href, icon: Icon, badge }: NavMenuLinkType) => (
    <a href={href} className={styles.row}>
        {Icon && <Icon aria-hidden="true" className="text-fg-brand-primary mt-0.5 size-5 shrink-0" />}
        <div className="flex flex-col gap-0.5">
            <span className={styles.itemTitle}>
                {label}
                {badge}
            </span>
            {description && <span className={styles.itemDescription}>{description}</span>}
        </div>
    </a>
);

/** A menu entry whose icon sits inside a raised, bordered square. */
export const NavMenuItemBoxed = ({ label, description, href, icon: Icon, badge }: NavMenuLinkType) => (
    <a href={href} className={styles.row}>
        {Icon && <FeaturedIcon icon={Icon} theme="modern" size="md" className="mt-0.5" />}
        <div className="flex flex-col gap-0.5">
            <span className={styles.itemTitle}>
                {label}
                {badge}
            </span>
            {description && <span className={styles.itemDescription}>{description}</span>}
        </div>
    </a>
);

/** A plain text link used by the "Get started" and "Blog categories" columns. */
export const NavMenuTextLink = ({ label, href }: Pick<NavMenuLinkType, "label" | "href">) => (
    <a
        href={href}
        className="text-md text-primary outline-focus-ring hover:text-brand-secondary block rounded-md px-3 py-1.5 font-semibold transition duration-100 ease-linear focus-visible:outline-2 focus-visible:outline-offset-2"
    >
        {label}
    </a>
);

/** A titled column of menu entries. */
export const NavMenuColumn = ({ heading, children, className }: { heading?: string; children: ReactNode; className?: string }) => (
    <div className={cx("flex flex-col", className)}>
        {heading && <p className={styles.columnHeading}>{heading}</p>}
        <ul className="flex flex-col gap-1">{children}</ul>
    </div>
);

/** Renders a list of links with the given row component. */
export const NavMenuList = ({ items, variant = "plain" }: { items: NavMenuLinkType[]; variant?: "plain" | "boxed" | "text" }) => (
    <>
        {items.map((item) => (
            <li key={item.label}>
                {variant === "boxed" ? <NavMenuItemBoxed {...item} /> : variant === "text" ? <NavMenuTextLink {...item} /> : <NavMenuItem {...item} />}
            </li>
        ))}
    </>
);

/** A blog post row: thumbnail, title and summary. */
export const NavMenuPost = ({ title, summary, href, imageSrc }: { title: string; summary: string; href: string; imageSrc: string }) => (
    <a href={href} className={cx(styles.row, "items-start")}>
        <img src={imageSrc} alt="" className="h-16 w-24 shrink-0 rounded-md object-cover outline-1 -outline-offset-1 outline-black/10" />
        <div className="flex flex-col gap-1">
            <p className={styles.itemTitle}>{title}</p>
            <p className={cx("line-clamp-2", styles.itemDescription)}>{summary}</p>
        </div>
    </a>
);

/** A tutorial row: video still with a play badge, title, summary and a "Watch video" link. */
export const NavMenuVideo = ({ title, summary, href, imageSrc }: { title: string; summary: string; href: string; imageSrc: string }) => (
    <a href={href} className={cx(styles.row, "items-start")}>
        <span className="relative shrink-0">
            <img src={imageSrc} alt="" className="h-20 w-32 rounded-md object-cover outline-1 -outline-offset-1 outline-black/10" />
            <PlayCircle aria-hidden="true" className="text-fg-white absolute start-1/2 top-1/2 size-8 -translate-x-1/2 -translate-y-1/2 rtl:translate-x-1/2" />
        </span>
        <div className="flex flex-col gap-1">
            <p className={styles.itemTitle}>{title}</p>
            <p className={styles.itemDescription}>{summary}</p>
            <span className="text-brand-secondary mt-1 flex items-center gap-1.5 text-sm font-semibold">
                <PlayCircle aria-hidden="true" className="size-4" />
                Watch video
            </span>
        </div>
    </a>
);

/** The promotional card shown alongside the "feature card" menus. */
export const NavMenuFeatureCard = ({
    title,
    description,
    imageSrc,
    dismissLabel = "Dismiss",
    confirmLabel,
    confirmHref,
}: {
    title: string;
    description: string;
    imageSrc: string;
    dismissLabel?: string;
    confirmLabel: string;
    confirmHref: string;
}) => (
    <div className="bg-secondary flex flex-col gap-4 p-4 md:p-5">
        <img src={imageSrc} alt="" className="aspect-video w-full rounded-lg object-cover outline-1 -outline-offset-1 outline-black/10" />
        <div className="flex flex-col gap-1">
            <p className="text-primary text-sm font-semibold">{title}</p>
            <p className="text-tertiary text-sm">{description}</p>
        </div>
        <div className="flex items-center gap-3">
            <Button color="link-gray" size="sm">
                {dismissLabel}
            </Button>
            <Button color="link-color" size="sm" href={confirmHref}>
                {confirmLabel}
            </Button>
        </div>
    </div>
);

/** The wide "Ready to get started?" strip that closes several menus. */
export const NavMenuFooter = ({ links }: { links: NavMenuLinkType[] }) => (
    <div className="bg-secondary">
        <div className="max-w-container mx-auto flex w-full flex-col gap-4 px-4 py-4 md:flex-row md:items-center md:justify-between md:px-8 md:py-5">
            <p className="text-tertiary text-sm">
                Ready to get started?{" "}
                <a
                    href="/signup"
                    className="text-brand-secondary outline-focus-ring hover:text-brand-secondary_hover rounded-xs font-semibold transition duration-100 ease-linear focus-visible:outline-2 focus-visible:outline-offset-2"
                >
                    Sign up for free
                </a>
            </p>

            <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
                {links.map(({ label, href, icon: Icon }) => (
                    <li key={label}>
                        <a
                            href={href}
                            className="text-brand-secondary outline-focus-ring hover:text-brand-secondary_hover flex items-center gap-1.5 rounded-xs text-sm font-semibold transition duration-100 ease-linear focus-visible:outline-2 focus-visible:outline-offset-2"
                        >
                            {Icon && <Icon aria-hidden="true" className="size-4" />}
                            {label}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    </div>
);

/** The footer with a secondary button on the left and a primary call to action on the right. */
export const NavMenuActionsFooter = ({
    secondaryLabel,
    secondaryIcon,
    secondaryHref,
    primaryLabel,
    primaryHref,
    isFullBleed = false,
}: {
    secondaryLabel: string;
    secondaryIcon?: FC<{ className?: string }>;
    secondaryHref: string;
    primaryLabel: string;
    primaryHref: string;
    /** Constrain the footer content to the page container, for full-width panels. */
    isFullBleed?: boolean;
}) => (
    <div className="bg-secondary">
        <div
            className={cx(
                "flex flex-col gap-3 px-4 py-4 md:flex-row md:items-center md:justify-between",
                isFullBleed ? "max-w-container mx-auto w-full md:px-8" : "md:px-6",
            )}
        >
            <Button color="secondary" size="sm" iconLeading={secondaryIcon} href={secondaryHref}>
                {secondaryLabel}
            </Button>
            <Button size="sm" href={primaryHref}>
                {primaryLabel}
            </Button>
        </div>
    </div>
);

/** A single "See all …" link with a trailing chevron. */
export const NavMenuSeeAllLink = ({ label, href, className }: { label: string; href: string; className?: string }) => (
    <a
        href={href}
        className={cx(
            "text-brand-secondary outline-focus-ring hover:text-brand-secondary_hover flex items-center gap-1.5 rounded-xs px-3 py-2 text-sm font-semibold transition duration-100 ease-linear focus-visible:outline-2 focus-visible:outline-offset-2",
            className,
        )}
    >
        {label}
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="size-4 rtl:-scale-x-100">
            <path d="m9 18 6-6-6-6" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    </a>
);
