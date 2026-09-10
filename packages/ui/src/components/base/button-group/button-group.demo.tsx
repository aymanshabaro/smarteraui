"use client";

import { useState } from "react";
import type { Key } from "react-aria";
import { Archive, Edit03, Trash01 } from "@properui/icons";
import { Dot } from "@/components/foundations/dot-icon";
import { ButtonGroup, ButtonGroupItem } from "./button-group";

export const ButtonGroupExample = () => (
    <ButtonGroup selectedKeys={[]}>
        <ButtonGroupItem id="archive">Archive</ButtonGroupItem>
        <ButtonGroupItem id="edit">Edit</ButtonGroupItem>
        <ButtonGroupItem id="delete">Delete</ButtonGroupItem>
    </ButtonGroup>
);

export const LeadingIcon = () => (
    <ButtonGroup selectedKeys={[]}>
        <ButtonGroupItem id="archive" iconLeading={Archive}>
            Archive
        </ButtonGroupItem>
        <ButtonGroupItem id="edit" iconLeading={Edit03}>
            Edit
        </ButtonGroupItem>
        <ButtonGroupItem id="delete" iconLeading={Trash01}>
            Delete
        </ButtonGroupItem>
    </ButtonGroup>
);

export const WithDot = () => (
    <ButtonGroup selectedKeys={["archive"]}>
        <ButtonGroupItem id="archive" iconLeading={<Dot className="text-fg-success-secondary mx-0.75 size-2" />}>
            Text
        </ButtonGroupItem>
        <ButtonGroupItem id="edit" iconLeading={<Dot className="text-fg-success-secondary mx-0.75 size-2" />}>
            Text
        </ButtonGroupItem>
        <ButtonGroupItem id="delete" isDisabled iconLeading={<Dot className="text-fg-success-secondary mx-0.75 size-2" />}>
            Text
        </ButtonGroupItem>
    </ButtonGroup>
);

export const Disabled = () => (
    <ButtonGroup isDisabled>
        <ButtonGroupItem id="archive">Archive</ButtonGroupItem>
        <ButtonGroupItem id="edit">Edit</ButtonGroupItem>
        <ButtonGroupItem id="delete">Delete</ButtonGroupItem>
    </ButtonGroup>
);

export const DisabledIndividualItem = () => (
    <ButtonGroup selectedKeys={[]}>
        <ButtonGroupItem id="archive">Archive</ButtonGroupItem>
        <ButtonGroupItem id="edit">Edit</ButtonGroupItem>
        <ButtonGroupItem isDisabled id="delete">
            Delete
        </ButtonGroupItem>
    </ButtonGroup>
);

export const Selection = () => {
    const [selectedKeys, setSelectedKeys] = useState<Set<Key>>(new Set(["today"]));

    return (
        <ButtonGroup selectedKeys={selectedKeys} onSelectionChange={setSelectedKeys}>
            <ButtonGroupItem id="today">Today</ButtonGroupItem>
            <ButtonGroupItem id="tomorrow">Tomorrow</ButtonGroupItem>
            <ButtonGroupItem id="thisweek">This week</ButtonGroupItem>
        </ButtonGroup>
    );
};

export const MultipleSelection = () => {
    const [selectedKeys, setSelectedKeys] = useState<Set<Key>>(new Set(["today"]));

    return (
        <ButtonGroup selectionMode="multiple" selectedKeys={selectedKeys} onSelectionChange={setSelectedKeys}>
            <ButtonGroupItem id="today">Today</ButtonGroupItem>
            <ButtonGroupItem id="tomorrow">Tomorrow</ButtonGroupItem>
            <ButtonGroupItem id="thisweek">This week</ButtonGroupItem>
        </ButtonGroup>
    );
};
