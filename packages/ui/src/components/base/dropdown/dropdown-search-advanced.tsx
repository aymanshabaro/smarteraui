"use client";

import { useState } from "react";
import { useFilter } from "react-aria";
import type { Selection as AriaSelection } from "react-aria-components";
import { Autocomplete as AriaAutocomplete, SearchField as AriaSearchField, SubmenuTrigger as AriaSubmenuTrigger } from "react-aria-components";
import { ChevronDown, Plus, SearchLg } from "@properui/icons";
import { Button } from "@/components/base/buttons/button";
import { Dropdown } from "@/components/base/dropdown/dropdown";
import { LOGOS, avatar } from "@/utils/demo-assets";
import { DropdownSearchField } from "./dropdown-search-field";

const teams = [LOGOS[1].name, LOGOS[2].name, LOGOS[3].name, LOGOS[4].name, LOGOS[5].name] as const;

export const DropdownSearchAdvanced = () => {
    const [selectedItems, setSelectedItems] = useState<AriaSelection>(new Set([LOGOS[0].name, teams[0]]));
    const { contains } = useFilter({ sensitivity: "base" });

    return (
        <Dropdown.Root>
            <Button
                size="sm"
                className="group"
                color="secondary"
                iconTrailing={(props) => <ChevronDown data-icon="trailing" {...props} className="size-4! stroke-[2.25px]!" />}
            >
                Manage access
            </Button>

            <Dropdown.Popover className="w-60">
                <AriaAutocomplete filter={contains}>
                    <AriaSearchField className="border-secondary flex gap-3 border-b p-3">
                        <DropdownSearchField placeholder="Search" icon={SearchLg} />
                    </AriaSearchField>
                    <Dropdown.Menu selectionMode="multiple" selectedKeys={selectedItems} onSelectionChange={setSelectedItems}>
                        <AriaSubmenuTrigger>
                            <Dropdown.Item id={LOGOS[0].name} textValue={LOGOS[0].name} selectionIndicator="checkbox">
                                {LOGOS[0].name}
                            </Dropdown.Item>
                            <Dropdown.Popover placement="right top" offset={-6} className="w-50">
                                <Dropdown.Menu selectionMode="multiple">
                                    {Array.from({ length: 4 }, (_, i) => avatar(i)).map((user) => (
                                        <Dropdown.Item key={user.username} id={user.username} selectionIndicator="checkbox" avatarUrl={user.src}>
                                            {user.name}
                                        </Dropdown.Item>
                                    ))}
                                </Dropdown.Menu>
                            </Dropdown.Popover>
                        </AriaSubmenuTrigger>

                        {teams.map((team) => (
                            <Dropdown.Item key={team} id={team} textValue={team} selectionIndicator="checkbox">
                                {team}
                            </Dropdown.Item>
                        ))}
                    </Dropdown.Menu>
                    <div className="border-secondary flex flex-col gap-3 border-t p-3">
                        <Button size="xs" color="secondary" iconLeading={Plus}>
                            Create team
                        </Button>
                    </div>
                </AriaAutocomplete>
            </Dropdown.Popover>
        </Dropdown.Root>
    );
};
