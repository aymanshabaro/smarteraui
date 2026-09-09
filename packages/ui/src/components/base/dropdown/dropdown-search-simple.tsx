"use client";

import { useState } from "react";
import { useFilter } from "react-aria";
import type { Selection as AriaSelection } from "react-aria-components";
import { Autocomplete as AriaAutocomplete, SearchField as AriaSearchField } from "react-aria-components";
import { ChevronDown, SearchLg } from "@smarteraui/icons";
import { Button } from "@/components/base/buttons/button";
import { Dropdown } from "@/components/base/dropdown/dropdown";
import { avatar } from "@/utils/demo-assets";
import { DropdownSearchField } from "./dropdown-search-field";

export const DropdownSearchSimple = () => {
    const [selectedUsers, setSelectedUsers] = useState<AriaSelection>(new Set([avatar(0).username, avatar(1).username]));
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
                    <Dropdown.Menu selectionMode="multiple" selectedKeys={selectedUsers} onSelectionChange={setSelectedUsers}>
                        {Array.from({ length: 9 }, (_, i) => avatar(i)).map((user) => (
                            <Dropdown.Item key={user.username} id={user.username} textValue={user.name} selectionIndicator="checkbox">
                                {user.name}
                            </Dropdown.Item>
                        ))}
                    </Dropdown.Menu>
                </AriaAutocomplete>
            </Dropdown.Popover>
        </Dropdown.Root>
    );
};
