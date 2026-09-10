"use client";

import type { Placement as AriaPlacement } from "react-aria-components";
import { HelpCircle } from "@properui/icons";
import { Tooltip, TooltipTrigger } from "@/components/base/tooltip/tooltip";

const PLACEMENTS: { label: string; value: AriaPlacement }[] = [
    { label: "Top left", value: "top left" },
    { label: "Top", value: "top" },
    { label: "Top right", value: "top right" },
    { label: "Bottom left", value: "bottom left" },
    { label: "Bottom", value: "bottom" },
    { label: "Bottom right", value: "bottom right" },
    { label: "Left", value: "left" },
    { label: "Right", value: "right" },
];

const triggerClassName =
    "group relative flex cursor-pointer flex-col items-center gap-2 text-fg-quaternary transition duration-100 ease-linear hover:text-fg-quaternary_hover focus:text-fg-quaternary_hover";

export const TooltipExample = () => (
    <Tooltip title="This is a tooltip">
        <TooltipTrigger aria-label="Help" className={triggerClassName}>
            <HelpCircle className="size-4" aria-hidden="true" />
        </TooltipTrigger>
    </Tooltip>
);

export const DefaultExample = () => (
    <Tooltip title="This is a tooltip">
        <TooltipTrigger aria-label="Help" className={triggerClassName}>
            <HelpCircle className="size-4" aria-hidden="true" />
        </TooltipTrigger>
    </Tooltip>
);

export const WithArrowExample = () => (
    <Tooltip arrow title="This is a tooltip">
        <TooltipTrigger aria-label="Help" className={triggerClassName}>
            <HelpCircle className="size-4 stroke-[2.25px]" aria-hidden="true" />
        </TooltipTrigger>
    </Tooltip>
);

export const WithSupportingTextExample = () => (
    <Tooltip
        title="This is a tooltip"
        description="Tooltips are used to describe or identify an element. In most scenarios, tooltip help the user understand meaning, function or alt-text."
    >
        <TooltipTrigger aria-label="Help" className={triggerClassName}>
            <HelpCircle className="size-4 stroke-[2.25px]" aria-hidden="true" />
        </TooltipTrigger>
    </Tooltip>
);

export const PlacementsExample = () => (
    <div className="grid grid-cols-3 gap-12">
        {PLACEMENTS.map((side) => (
            <div key={side.value} className="flex flex-col items-center justify-center gap-1 text-center">
                <Tooltip placement={side.value} title="This is a tooltip">
                    <TooltipTrigger
                        aria-label="Help"
                        className="text-fg-quaternary hover:text-fg-quaternary_hover focus:text-fg-quaternary_hover cursor-pointer transition duration-100 ease-linear"
                    >
                        <HelpCircle className="size-4 stroke-[2.25px]" aria-hidden="true" />
                    </TooltipTrigger>
                </Tooltip>
                <span className="text-secondary text-xs whitespace-nowrap">{side.label}</span>
            </div>
        ))}
    </div>
);
