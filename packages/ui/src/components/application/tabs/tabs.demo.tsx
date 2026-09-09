"use client";

import { useState } from "react";
import type { Key } from "react-aria";
import { Tabs } from "@/components/application/tabs/tabs";

const items = [
    { id: "details", label: "My details" },
    { id: "profile", label: "Profile" },
    { id: "password", label: "Password" },
    { id: "team", label: "Team" },
    { id: "notifications", label: "Notifications", badge: 2 },
    { id: "integrations", label: "Integrations" },
    { id: "api", label: "API" },
];

type HorizontalType = "button-brand" | "button-gray" | "button-border" | "button-minimal" | "underline";
type VerticalType = "button-brand" | "button-gray" | "button-border" | "button-minimal" | "line";

const HorizontalTabs = ({ type }: { type: HorizontalType }) => {
    const [selectedKey, setSelectedKey] = useState<Key>("details");

    return (
        <Tabs selectedKey={selectedKey} onSelectionChange={setSelectedKey} className="w-max">
            <Tabs.List type={type} items={items}>
                {(item) => <Tabs.Item {...item} />}
            </Tabs.List>
            {items.map((item) => (
                <Tabs.Panel key={item.id} id={item.id} />
            ))}
        </Tabs>
    );
};

const VerticalTabs = ({ type }: { type: VerticalType }) => {
    const [selectedKey, setSelectedKey] = useState<Key>("details");

    return (
        <Tabs orientation="vertical" selectedKey={selectedKey} onSelectionChange={setSelectedKey} className="w-max">
            <Tabs.List type={type} items={items}>
                {(item) => <Tabs.Item {...item} />}
            </Tabs.List>
            {items.map((item) => (
                <Tabs.Panel key={item.id} id={item.id} />
            ))}
        </Tabs>
    );
};

export const TabsExample = () => <HorizontalTabs type="button-minimal" />;

export const ButtonBrandHorizontal = () => <HorizontalTabs type="button-brand" />;

export const ButtonGrayHorizontal = () => <HorizontalTabs type="button-gray" />;

export const ButtonBorderHorizontal = () => <HorizontalTabs type="button-border" />;

export const ButtonMinimalHorizontal = () => <HorizontalTabs type="button-minimal" />;

export const Underline = () => <HorizontalTabs type="underline" />;

export const ButtonBrandVertical = () => <VerticalTabs type="button-brand" />;

export const ButtonGrayVertical = () => <VerticalTabs type="button-gray" />;

export const ButtonBorderVertical = () => <VerticalTabs type="button-border" />;

export const ButtonMinimalVertical = () => <VerticalTabs type="button-minimal" />;

export const Line = () => <VerticalTabs type="line" />;
