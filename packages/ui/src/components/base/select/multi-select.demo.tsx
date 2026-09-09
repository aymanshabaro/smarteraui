"use client";

import { useState } from "react";
import type { Selection as AriaSelection } from "react-aria-components";
import { User01 } from "@smarteraui/icons";
import { MultiSelect } from "./multi-select";
import type { SelectItemType } from "./select-shared";

const teamItems: SelectItemType[] = [
    { id: "engineering", label: "Engineering", supportingText: "12 users" },
    { id: "design", label: "Design", supportingText: "10 users" },
    { id: "product", label: "Product", supportingText: "6 users" },
    { id: "marketing", label: "Marketing", supportingText: "8 users" },
    { id: "sales", label: "Sales", supportingText: "12 users" },
    { id: "customer-success", label: "Customer Success", supportingText: "4 users" },
    { id: "operations", label: "Operations", supportingText: "2 users" },
    { id: "finance", label: "Finance", supportingText: "2 users" },
];

const getSelectedUserCount = (selectedKeys: AriaSelection) => {
    if (selectedKeys === "all") return teamItems.reduce((sum, t) => sum + parseInt(t.supportingText?.split(" ")[0] || "0"), 0);
    const selected = teamItems.filter((t) => (selectedKeys as Set<string | number>).has(t.id));
    return selected.reduce((sum, t) => sum + parseInt(t.supportingText?.split(" ")[0] || "0"), 0);
};

const renderItem = (item: SelectItemType) => (
    <MultiSelect.Item id={item.id} supportingText={item.supportingText} selectionIndicator="checkbox" selectionIndicatorAlign="left">
        {item.label}
    </MultiSelect.Item>
);

export const MultiSelectExample = () => {
    const [selectedKeys, setSelectedKeys] = useState<AriaSelection>(new Set(["design", "product"]));

    return (
        <MultiSelect
            isRequired
            size="md"
            label="Teams"
            tooltip="This is a tooltip"
            hint="This is a hint text to help user."
            placeholder="Select teams"
            items={teamItems}
            selectedKeys={selectedKeys}
            onSelectionChange={setSelectedKeys}
            supportingText={`${getSelectedUserCount(selectedKeys)} users`}
            onReset={() => setSelectedKeys(new Set())}
            onSelectAll={() => setSelectedKeys(new Set(teamItems.map((t) => t.id)))}
        >
            {renderItem}
        </MultiSelect>
    );
};

export const Default = () => {
    const [selectedKeys, setSelectedKeys] = useState<AriaSelection>(new Set(["design", "product"]));

    return (
        <MultiSelect
            isRequired
            size="md"
            label="Teams"
            tooltip="This is a tooltip"
            hint="This is a hint text to help user."
            placeholder="Select teams"
            items={teamItems}
            selectedKeys={selectedKeys}
            onSelectionChange={setSelectedKeys}
            supportingText={`${getSelectedUserCount(selectedKeys)} users`}
            onReset={() => setSelectedKeys(new Set())}
            onSelectAll={() => setSelectedKeys(new Set(teamItems.map((t) => t.id)))}
        >
            {renderItem}
        </MultiSelect>
    );
};

export const WithLeadingIcon = () => {
    const [selectedKeys, setSelectedKeys] = useState<AriaSelection>(new Set(["design"]));

    return (
        <MultiSelect
            size="md"
            label="Assignees"
            hint="Add one or more teammates."
            placeholder="Select assignees"
            icon={User01}
            items={teamItems}
            selectedKeys={selectedKeys}
            onSelectionChange={setSelectedKeys}
            supportingText={`${getSelectedUserCount(selectedKeys)} users`}
            onReset={() => setSelectedKeys(new Set())}
            onSelectAll={() => setSelectedKeys(new Set(teamItems.map((t) => t.id)))}
        >
            {renderItem}
        </MultiSelect>
    );
};

export const Disabled = () => (
    <MultiSelect
        size="md"
        label="Teams"
        tooltip="This is a tooltip"
        hint="This is a hint text to help user."
        placeholder="Select teams"
        items={teamItems}
        isDisabled
    >
        {renderItem}
    </MultiSelect>
);

export const Sizes = () => {
    const [smKeys, setSmKeys] = useState<AriaSelection>(new Set(["design", "product"]));
    const [mdKeys, setMdKeys] = useState<AriaSelection>(new Set(["design", "product"]));
    const [lgKeys, setLgKeys] = useState<AriaSelection>(new Set(["design", "product"]));

    return (
        <div className="flex flex-col gap-8">
            <MultiSelect
                isRequired
                size="sm"
                label="Teams"
                tooltip="This is a tooltip"
                hint="This is a hint text to help user."
                placeholder="Select teams"
                items={teamItems}
                selectedKeys={smKeys}
                onSelectionChange={setSmKeys}
                supportingText={`${getSelectedUserCount(smKeys)} users`}
                onReset={() => setSmKeys(new Set())}
                onSelectAll={() => setSmKeys(new Set(teamItems.map((t) => t.id)))}
            >
                {renderItem}
            </MultiSelect>

            <MultiSelect
                isRequired
                size="md"
                label="Teams"
                tooltip="This is a tooltip"
                hint="This is a hint text to help user."
                placeholder="Select teams"
                items={teamItems}
                selectedKeys={mdKeys}
                onSelectionChange={setMdKeys}
                supportingText={`${getSelectedUserCount(mdKeys)} users`}
                onReset={() => setMdKeys(new Set())}
                onSelectAll={() => setMdKeys(new Set(teamItems.map((t) => t.id)))}
            >
                {renderItem}
            </MultiSelect>

            <MultiSelect
                isRequired
                size="lg"
                label="Teams"
                tooltip="This is a tooltip"
                hint="This is a hint text to help user."
                placeholder="Select teams"
                items={teamItems}
                selectedKeys={lgKeys}
                onSelectionChange={setLgKeys}
                supportingText={`${getSelectedUserCount(lgKeys)} users`}
                onReset={() => setLgKeys(new Set())}
                onSelectAll={() => setLgKeys(new Set(teamItems.map((t) => t.id)))}
            >
                {renderItem}
            </MultiSelect>
        </div>
    );
};
