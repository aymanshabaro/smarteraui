"use client";

import { useState } from "react";
import { ToggleChip } from "./toggle-chip";

export const ToggleChipExample = () => {
    const [isSelected, setIsSelected] = useState(false);

    return (
        <ToggleChip isSelected={isSelected} onChange={setIsSelected}>
            Remote
        </ToggleChip>
    );
};

export const Colors = () => (
    <div className="flex flex-wrap gap-2">
        <ToggleChip color="gray" defaultSelected>
            Gray
        </ToggleChip>
        <ToggleChip color="brand" defaultSelected>
            Brand
        </ToggleChip>
        <ToggleChip color="success" defaultSelected>
            Success
        </ToggleChip>
        <ToggleChip color="warning" defaultSelected>
            Warning
        </ToggleChip>
        <ToggleChip color="error" defaultSelected>
            Error
        </ToggleChip>
    </div>
);

export const Sizes = () => (
    <div className="flex flex-wrap items-center gap-2">
        <ToggleChip size="sm" color="brand" defaultSelected>
            Small
        </ToggleChip>
        <ToggleChip size="md" color="brand" defaultSelected>
            Medium
        </ToggleChip>
    </div>
);

export const FilterGroup = () => {
    const options = ["Design", "Engineering", "Marketing", "Sales"];
    const [selected, setSelected] = useState<string[]>(["Design"]);

    return (
        <div className="flex flex-wrap gap-2">
            {options.map((option) => (
                <ToggleChip
                    key={option}
                    color="brand"
                    isSelected={selected.includes(option)}
                    onChange={(isSelected) => setSelected((current) => (isSelected ? [...current, option] : current.filter((item) => item !== option)))}
                >
                    {option}
                </ToggleChip>
            ))}
        </div>
    );
};

export const Disabled = () => (
    <div className="flex flex-wrap gap-2">
        <ToggleChip isDisabled>Unavailable</ToggleChip>
        <ToggleChip isDisabled defaultSelected color="brand">
            Locked on
        </ToggleChip>
    </div>
);
