"use client";

import type { ButtonProps as AriaButtonProps } from "react-aria-components";
import { Button as AriaButton, Tooltip as AriaTooltip, TooltipTrigger as AriaTooltipTrigger } from "react-aria-components";
import { Plus } from "@properui/icons";
import { cx } from "@/utils/cx";

const sizes = {
    xs: { root: "size-6", icon: "size-4" },
    sm: { root: "size-8", icon: "size-4" },
    md: { root: "size-10", icon: "size-5" },
};

interface AvatarAddButtonProps extends AriaButtonProps {
    size: "xs" | "sm" | "md";
    title?: string;
    className?: string;
}

/**
 * NOTE(orchestrator): the MIT reference wraps this in the shared `base/tooltip` component,
 * which does not exist in this repo yet. This inlines an equivalent tooltip directly on top
 * of `react-aria-components` so the button stays fully keyboard/AT accessible without reaching
 * outside this task's owned files. Swap back to the shared `Tooltip` once `base/tooltip` lands.
 */
export const AvatarAddButton = ({ size, className, title = "Add user", ...props }: AvatarAddButtonProps) => (
    <AriaTooltipTrigger delay={300} closeDelay={0}>
        <AriaButton
            {...props}
            aria-label={title}
            className={cx(
                "border-primary bg-primary text-fg-quaternary outline-focus-ring hover:bg-primary_hover hover:text-fg-quaternary_hover flex cursor-pointer items-center justify-center rounded-full border border-dashed transition duration-100 ease-linear focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50",
                sizes[size].root,
                className,
            )}
        >
            <Plus className={cx("transition-inherit-all text-current", sizes[size].icon)} />
        </AriaButton>
        <AriaTooltip
            offset={6}
            placement="top"
            className={({ isEntering, isExiting }) => cx(isEntering && "animate-in ease-out", isExiting && "animate-out ease-in")}
        >
            <div className="bg-primary-solid z-50 flex max-w-xs origin-(--trigger-anchor-point) flex-col items-start gap-1 rounded-lg px-3 py-2 shadow-lg will-change-transform">
                <span className="text-xs font-semibold text-white">{title}</span>
            </div>
        </AriaTooltip>
    </AriaTooltipTrigger>
);
