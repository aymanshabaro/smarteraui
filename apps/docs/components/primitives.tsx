import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cx, sortCx } from "~/lib/cx";

/**
 * Chrome-level primitives the docs site needs before the library components exist.
 * Class recipes come from the captured reference DOM
 * (docs/spec/reference/html/uui__base__buttons.html).
 *
 * This module has no client-only code on purpose: server components call the class
 * helpers directly.
 */

export type IconComponent = (props: { className?: string }) => ReactNode;

const utility = sortCx({
    common: "group relative inline-flex h-max cursor-pointer items-center justify-center rounded-md p-1.5 outline-focus-ring transition duration-100 ease-linear focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-50 *:data-icon:pointer-events-none *:data-icon:size-4 *:data-icon:shrink-0 *:data-icon:text-current *:data-icon:transition-inherit-all",
    ghost: "text-fg-quaternary hover:bg-primary_hover hover:text-fg-quaternary_hover",
    outline:
        "bg-primary text-fg-quaternary shadow-xs-skeuomorphic ring-1 ring-primary ring-inset hover:bg-primary_hover hover:text-fg-quaternary_hover disabled:shadow-xs",
});

/** Icon-only button styling, used across the top bar and every preview toolbar. */
export const utilityButtonClasses = (variant: "ghost" | "outline" = "ghost") => cx(utility.common, utility[variant]);

const button = sortCx({
    common: "group relative inline-flex h-max cursor-pointer items-center justify-center gap-1 rounded-lg px-3 py-2 text-sm font-semibold whitespace-nowrap outline-focus-ring transition duration-100 ease-linear before:rounded-[7px] focus-visible:outline-2 focus-visible:outline-offset-2 *:data-icon:pointer-events-none *:data-icon:size-5 *:data-icon:shrink-0",
    secondary:
        "bg-primary text-secondary shadow-xs-skeuomorphic ring-1 ring-primary ring-inset hover:bg-primary_hover hover:text-secondary_hover *:data-icon:text-fg-quaternary hover:*:data-icon:text-fg-quaternary_hover",
    primary:
        "bg-brand-solid text-white shadow-xs-skeuomorphic ring-1 ring-transparent ring-inset hover:bg-brand-solid_hover before:absolute before:inset-px before:border before:border-white/12 before:mask-b-from-0% *:data-icon:text-white/60 hover:*:data-icon:text-white/70",
});

export const buttonClasses = (variant: "primary" | "secondary" = "secondary") => cx(button.common, button[variant]);

/** Popover surface shared by every dropdown in the chrome. */
export const popoverClasses =
    "min-w-56 origin-top-right overflow-auto rounded-lg bg-primary p-1 shadow-lg ring-1 ring-secondary_alt outline-hidden entering:animate-in entering:fade-in entering:zoom-in-95 exiting:animate-out exiting:fade-out exiting:zoom-out-95";

/** One row inside those dropdowns. */
export const menuItemClasses =
    "flex cursor-pointer items-center gap-2 rounded-md px-2.5 py-2 text-sm font-semibold text-secondary outline-hidden select-none focus:bg-primary_hover hover:bg-primary_hover *:data-icon:size-4 *:data-icon:shrink-0 *:data-icon:text-fg-quaternary";

/** Dotted 1px rule used between sidebar groups and between page sections. */
export const DottedDivider = ({ className }: { className?: string }) => (
    <svg data-divider="true" width="100%" height="2" aria-hidden="true" className={cx("my-10 shrink-0 md:my-12", className)}>
        <line x1="0" y1="1" x2="100%" y2="1" className="stroke-border-secondary" strokeWidth="2" strokeLinecap="round" strokeDasharray="0,6" />
    </svg>
);

const ExternalArrow = (props: ComponentPropsWithoutRef<"svg">) => (
    <svg viewBox="0 0 12 12" fill="none" aria-hidden="true" className="text-fg-quaternary size-3" {...props}>
        <path d="M4 8L8 4M8 4H4.5M8 4V7.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

/** Small pill link under the page description (GitHub, React Aria, Figma…). */
export const ResourceLink = ({ href, icon: Icon, children }: { href: string; icon?: IconComponent; children: ReactNode }) => (
    <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-primary text-secondary ring-primary outline-focus-ring hover:bg-primary_hover flex cursor-pointer items-center gap-[3px] rounded-md py-0.5 pr-1.5 pl-[5px] text-xs font-semibold shadow-xs ring-1 transition duration-100 ease-linear ring-inset focus-visible:outline-2 focus-visible:outline-offset-2"
    >
        {Icon ? <Icon className="text-fg-quaternary size-3.5" /> : null}
        {children}
        <ExternalArrow />
    </a>
);
