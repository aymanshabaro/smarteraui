"use client";

import type { HTMLAttributes } from "react";
import { cx } from "@/utils/cx";

export const SectionDivider = (props: HTMLAttributes<HTMLDivElement>) => {
    return (
        <div {...props} className={cx("max-w-container mx-auto px-4 md:px-8", props.className)}>
            <hr className="bg-border-secondary h-px w-full border-none" />
        </div>
    );
};
