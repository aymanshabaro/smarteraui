"use client";

import { useState } from "react";
import type { Selection as AriaSelection } from "react-aria-components";
import { SubmenuTrigger as AriaSubmenuTrigger } from "react-aria-components";
import { ChevronDown, HelpCircle, LogOut01, Moon01, Plus, Settings01, User01 } from "@properui/icons";
import { avatar } from "../../../utils/demo-assets";
import { Button } from "../buttons/button";
import { Dropdown } from "./dropdown";

const primaryAccount = avatar(0);
const secondaryAccount = avatar(1);

export const DropdownAccountButton = () => {
    const [selectedAccount, setSelectedAccount] = useState<AriaSelection>(new Set([primaryAccount.username]));
    const [selectedTheme, setSelectedTheme] = useState<AriaSelection>(new Set(["light-mode"]));

    return (
        <Dropdown.Root>
            <Button
                size="sm"
                className="group"
                color="secondary"
                iconTrailing={(props) => <ChevronDown data-icon="trailing" {...props} className="size-4! stroke-[2.25px]!" />}
            >
                Account
            </Button>

            <Dropdown.Popover className="bg-secondary_alt w-60 rounded-b-xl">
                <Dropdown.Menu className="bg-primary ring-secondary rounded-b-xl ring-1">
                    <Dropdown.Item icon={User01} addon="⌘K->P">
                        View profile
                    </Dropdown.Item>
                    <Dropdown.Item icon={Settings01} addon="⌘S">
                        Settings
                    </Dropdown.Item>
                    <Dropdown.Section selectionMode="single" selectedKeys={selectedTheme} onSelectionChange={setSelectedTheme}>
                        <Dropdown.Item id="dark-mode" icon={Moon01} selectionIndicator="toggle">
                            Dark mode
                        </Dropdown.Item>
                    </Dropdown.Section>
                    <AriaSubmenuTrigger>
                        <Dropdown.Item icon={HelpCircle}>Support</Dropdown.Item>

                        <Dropdown.Popover placement="right top" offset={-6}>
                            <Dropdown.Menu>
                                <Dropdown.Item>Help center</Dropdown.Item>
                                <Dropdown.Item>Contact support</Dropdown.Item>
                                <Dropdown.Item>Send feedback</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown.Popover>
                    </AriaSubmenuTrigger>

                    <Dropdown.Separator />

                    <Dropdown.Section selectionMode="single" selectedKeys={selectedAccount} onSelectionChange={setSelectedAccount}>
                        <Dropdown.SectionHeader className="text-brand-secondary px-4 pt-1.5 pb-0.5 text-xs font-semibold">
                            Switch Account
                        </Dropdown.SectionHeader>

                        <Dropdown.Item id={primaryAccount.username} avatarUrl={primaryAccount.src} selectionIndicator="radio">
                            {primaryAccount.name}
                        </Dropdown.Item>
                        <Dropdown.Item id={secondaryAccount.username} avatarUrl={secondaryAccount.src} selectionIndicator="radio">
                            {secondaryAccount.name}
                        </Dropdown.Item>
                    </Dropdown.Section>
                    <Dropdown.Item icon={Plus}>Add account</Dropdown.Item>
                </Dropdown.Menu>
                <div className="flex flex-col gap-3 p-3">
                    <Button size="xs" color="secondary" iconLeading={LogOut01} className="text-center">
                        Sign out
                    </Button>
                </div>
            </Dropdown.Popover>
        </Dropdown.Root>
    );
};
