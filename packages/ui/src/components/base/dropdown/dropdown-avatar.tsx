"use client";

import { useState } from "react";
import type { Selection as AriaSelection } from "react-aria-components";
import { Button as AriaButton, SubmenuTrigger as AriaSubmenuTrigger } from "react-aria-components";
import { Container, HelpCircle, LayersTwo01, LogOut01, Moon01, Settings01, User01 } from "@smarteraui/icons";
import { Avatar } from "@/components/base/avatar/avatar";
import { Button } from "@/components/base/buttons/button";
import { Dropdown } from "@/components/base/dropdown/dropdown";
import { cx } from "@/utils/cx";
import { avatar } from "@/utils/demo-assets";
import { AvatarLabelGroup } from "../avatar/avatar-label-group";

const account = avatar(0);

export const DropdownAvatar = () => {
    const [selectedTheme, setSelectedTheme] = useState<AriaSelection>(new Set(["light-mode"]));

    return (
        <Dropdown.Root>
            <AriaButton
                className={({ isPressed, isFocusVisible }) =>
                    cx(
                        "group outline-focus-ring relative inline-flex cursor-pointer rounded-full outline-offset-2",
                        (isPressed || isFocusVisible) && "outline-2",
                    )
                }
            >
                <Avatar alt={account.name} src={account.src} size="sm" />
            </AriaButton>

            <Dropdown.Popover className="w-60">
                <div className="border-secondary flex gap-3 border-b p-3">
                    <AvatarLabelGroup size="md" src={account.src} alt="" status="online" title={account.name} subtitle={account.email} />
                </div>
                <Dropdown.Menu>
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

                    <Dropdown.Separator />

                    <Dropdown.Item icon={LayersTwo01} addon="⌘S">
                        Changelog
                    </Dropdown.Item>

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

                    <Dropdown.Item icon={Container}>API</Dropdown.Item>
                </Dropdown.Menu>
                <div className="border-secondary flex flex-col gap-3 border-t p-3">
                    <Button size="xs" color="secondary" iconLeading={LogOut01} className="text-center">
                        Sign out
                    </Button>
                </div>
            </Dropdown.Popover>
        </Dropdown.Root>
    );
};
