"use client";

import type { SVGProps } from "react";
import { cx } from "@/utils/cx";

/**
 * The standalone Proper mark: a rounded square containing a stylised "S".
 * Uses `fill-current`/`text-fg-primary` so it adapts to dark mode automatically.
 */
export const ProperLogoMinimal = (props: SVGProps<SVGSVGElement>) => {
    return (
        <svg viewBox="0 0 32 32" fill="none" {...props} className={cx("size-8", props.className)}>
            <rect width="32" height="32" rx="9" className="text-fg-primary fill-current" />
            <path
                d="M20.4 12.1c0-2.1-1.9-3.6-4.5-3.6-2.6 0-4.5 1.4-4.5 3.3 0 1.9 1.6 2.7 3.8 3.2l1.1.2c1.1.2 1.8.6 1.8 1.4 0 .9-.9 1.6-2.3 1.6-1.4 0-2.5-.6-2.7-1.8H10.5c.2 2.5 2.3 3.9 5.1 3.9 2.9 0 4.9-1.4 4.9-3.5 0-1.9-1.4-2.9-3.9-3.4l-1.1-.2c-1.1-.2-1.7-.5-1.7-1.3 0-.8.8-1.4 2-1.4 1.2 0 2.1.5 2.3 1.6Z"
                className="fill-bg-primary"
            />
        </svg>
    );
};
