"use client";

import type { HTMLAttributes } from "react";
import { cx } from "@/utils/cx";
import { ProperLogoMinimal } from "./proper-logo-minimal";

/**
 * The full Proper UI lockup: the minimal mark followed by the "Proper UI" wordmark.
 * Adapts to dark mode via semantic tokens (`text-fg-primary`).
 */
export const ProperLogo = (props: HTMLAttributes<HTMLOrSVGElement>) => {
    return (
        <div {...props} className={cx("flex h-8 w-max items-center justify-start gap-2 overflow-visible", props.className)}>
            {/* Minimal logo */}
            <ProperLogoMinimal className="aspect-square h-full w-auto shrink-0" />

            {/* Wordmark */}
            <span className="text-fg-primary text-lg font-semibold whitespace-nowrap select-none">Proper UI</span>
        </div>
    );
};
