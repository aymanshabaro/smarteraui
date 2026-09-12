"use client";

import { InfoCircle } from "@properui/icons";
import { Button } from "../buttons/button";
import { ButtonUtility } from "../buttons/button-utility";
import { Popover } from "./popover";

export const PopoverExample = () => (
    <Popover trigger={<Button color="secondary">Open popover</Button>} aria-label="Popover example">
        <div className="flex w-64 flex-col gap-1">
            <p className="text-primary text-sm font-semibold">Popover title</p>
            <p className="text-tertiary text-sm">Free-form content goes here: text, a small form, a mini menu, anything at all.</p>
        </div>
    </Popover>
);

export const Placements = () => (
    <div className="flex flex-wrap items-center gap-6">
        <Popover
            trigger={
                <Button color="secondary" size="sm">
                    Top
                </Button>
            }
            placement="top"
            aria-label="Top placement"
        >
            <p className="text-secondary w-48 text-sm">Positioned above the trigger.</p>
        </Popover>
        <Popover
            trigger={
                <Button color="secondary" size="sm">
                    Right
                </Button>
            }
            placement="right"
            aria-label="Right placement"
        >
            <p className="text-secondary w-48 text-sm">Positioned to the right of the trigger.</p>
        </Popover>
        <Popover
            trigger={
                <Button color="secondary" size="sm">
                    Bottom
                </Button>
            }
            placement="bottom"
            aria-label="Bottom placement"
        >
            <p className="text-secondary w-48 text-sm">Positioned below the trigger.</p>
        </Popover>
        <Popover
            trigger={
                <Button color="secondary" size="sm">
                    Left
                </Button>
            }
            placement="left"
            aria-label="Left placement"
        >
            <p className="text-secondary w-48 text-sm">Positioned to the left of the trigger.</p>
        </Popover>
    </div>
);

export const WithIconTrigger = () => (
    <Popover
        trigger={<ButtonUtility icon={InfoCircle} size="sm" color="secondary" tooltip="More information" aria-label="More information" />}
        aria-label="Additional information"
    >
        <p className="text-secondary w-56 text-sm">A free-form popover anchored to an icon button. Its width comes from its own content, not the trigger.</p>
    </Popover>
);
