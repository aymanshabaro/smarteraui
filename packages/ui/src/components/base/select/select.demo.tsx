"use client";

import { useListData as AriaUseListData } from "react-aria-components";
import { User01 } from "@properui/icons";
import { Dot } from "@/components/foundations/dot-icon";
import { AVATARS } from "@/utils/demo-assets";
import { Select } from "./select";
import type { SelectItemType } from "./select-shared";
import { TagSelect } from "./tag-select";

const teamMembers: SelectItemType[] = [
    { label: AVATARS[1].name, id: AVATARS[1].username, supportingText: AVATARS[1].username },
    { label: AVATARS[0].name, id: AVATARS[0].username, supportingText: AVATARS[0].username },
    { label: AVATARS[2].name, id: AVATARS[2].username, supportingText: AVATARS[2].username, isDisabled: true },
    { label: AVATARS[3].name, id: AVATARS[3].username, supportingText: AVATARS[3].username },
    { label: AVATARS[4].name, id: AVATARS[4].username, supportingText: AVATARS[4].username },
    { label: AVATARS[5].name, id: AVATARS[5].username, supportingText: AVATARS[5].username },
    { label: AVATARS[6].name, id: AVATARS[6].username, supportingText: AVATARS[6].username },
    { label: AVATARS[7].name, id: AVATARS[7].username, supportingText: AVATARS[7].username },
    { label: AVATARS[8].name, id: AVATARS[8].username, supportingText: AVATARS[8].username },
    { label: AVATARS[9].name, id: AVATARS[9].username, supportingText: AVATARS[9].username },
];

const renderItem = (item: SelectItemType) => (
    <Select.Item id={item.id} supportingText={item.supportingText} isDisabled={item.isDisabled} icon={item.icon} avatarUrl={item.avatarUrl}>
        {item.label}
    </Select.Item>
);

export const SelectExample = () => (
    <Select
        isRequired
        label="Team member"
        tooltip="This is a tooltip"
        hint="This is a hint text to help user."
        placeholder="Select team member"
        items={teamMembers}
    >
        {renderItem}
    </Select>
);

export const Default = () => (
    <Select
        isRequired
        label="Team member"
        tooltip="This is a tooltip"
        hint="This is a hint text to help user."
        placeholder="Select team member"
        items={teamMembers}
    >
        {renderItem}
    </Select>
);

export const Disabled = () => (
    <Select
        isRequired
        isDisabled
        label="Team member"
        tooltip="This is a tooltip"
        hint="This is a hint text to help user."
        placeholder="Select team member"
        items={teamMembers}
    >
        {renderItem}
    </Select>
);

export const Sizes = () => (
    <div className="flex flex-col gap-8">
        <Select
            isRequired
            size="sm"
            label="Team member"
            tooltip="This is a tooltip"
            hint="This is a hint text to help user."
            placeholder="Select team member"
            items={teamMembers}
        >
            {renderItem}
        </Select>

        <Select
            isRequired
            size="md"
            label="Team member"
            tooltip="This is a tooltip"
            hint="This is a hint text to help user."
            placeholder="Select team member"
            items={teamMembers}
        >
            {renderItem}
        </Select>

        <Select
            isRequired
            size="lg"
            label="Team member"
            tooltip="This is a tooltip"
            hint="This is a hint text to help user."
            placeholder="Select team member"
            items={teamMembers}
        >
            {renderItem}
        </Select>
    </div>
);

export const IconLeading = () => {
    const items = teamMembers.map((item) => ({ ...item, icon: User01 }));

    return (
        <Select
            isRequired
            label="Team member"
            tooltip="This is a tooltip"
            hint="This is a hint text to help user."
            placeholder="Select team member"
            icon={User01}
            items={items}
        >
            {renderItem}
        </Select>
    );
};

export const AvatarLeading = () => {
    const items: SelectItemType[] = AVATARS.slice(0, 10).map((avatar) => ({
        label: avatar.name,
        id: avatar.username,
        supportingText: avatar.username,
        avatarUrl: avatar.src,
    }));

    return (
        <Select
            isRequired
            label="Team member"
            tooltip="This is a tooltip"
            hint="This is a hint text to help user."
            placeholder="Select team member"
            items={items}
        >
            {renderItem}
        </Select>
    );
};

export const DotLeading = () => {
    const items: SelectItemType[] = teamMembers.map((item) => ({
        ...item,
        icon: <Dot className="text-fg-success-secondary size-2.5" />,
    }));

    return (
        <Select
            isRequired
            label="Team member"
            tooltip="This is a tooltip"
            hint="This is a hint text to help user."
            placeholder="Select team member"
            icon={<Dot className="text-fg-success-secondary size-2.5" />}
            items={items}
        >
            {renderItem}
        </Select>
    );
};

export const Search = () => (
    <Select.ComboBox isRequired label="Search" tooltip="This is a tooltip" hint="This is a hint text to help user." placeholder="Search" items={teamMembers}>
        {renderItem}
    </Select.ComboBox>
);

const tagMembers: SelectItemType[] = [
    AVATARS[1],
    AVATARS[0],
    AVATARS[2],
    AVATARS[3],
    AVATARS[4],
    AVATARS[5],
    AVATARS[6],
    AVATARS[7],
    AVATARS[8],
    AVATARS[9],
].map((avatar, position) => ({
    label: avatar.name,
    id: avatar.username,
    supportingText: avatar.username,
    avatarUrl: avatar.src,
    isDisabled: position === 2,
}));

export const Tags = () => {
    const selectedItems = AriaUseListData<SelectItemType>({ initialItems: [] });

    return (
        <TagSelect
            isRequired
            size="md"
            selectedItems={selectedItems}
            label="Search"
            tooltip="This is a tooltip"
            hint="This is a hint text to help user."
            placeholder="Search"
            items={tagMembers}
        >
            {(item) => (
                <TagSelect.Item id={item.id} supportingText={item.supportingText} isDisabled={item.isDisabled} icon={item.icon} avatarUrl={item.avatarUrl}>
                    {item.label}
                </TagSelect.Item>
            )}
        </TagSelect>
    );
};
