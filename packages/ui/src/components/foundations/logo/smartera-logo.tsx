"use client";

import type { HTMLAttributes } from "react";
import { cx } from "@/utils/cx";
import { SmarteraLogoMinimal } from "./smartera-logo-minimal";

/**
 * The full Smartera lockup: the minimal mark followed by the "Smartera" wordmark.
 * Adapts to dark mode via semantic tokens (`text-fg-primary`).
 */
export const SmarteraLogo = (props: HTMLAttributes<HTMLOrSVGElement>) => {
    return (
        <div {...props} className={cx("flex h-8 w-max items-center justify-start gap-2 overflow-visible", props.className)}>
            {/* Minimal logo */}
            <SmarteraLogoMinimal className="aspect-square h-full w-auto shrink-0" />

            {/* Wordmark */}
            <span className="text-fg-primary text-lg font-semibold whitespace-nowrap select-none">Smartera</span>
        </div>
    );
};
