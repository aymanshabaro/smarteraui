"use client";

import { useState } from "react";
import type { Selection as AriaSelection } from "react-aria-components";
import { countries } from "../../../utils/countries";
import { AVATARS } from "../../../utils/demo-assets";
import { Tag, TagGroup, type TagItem, TagList } from "./tags";

const AU_FLAG = countries.find((country) => country.code === "AU")!.flag;
const AVATAR = AVATARS[0];

export const TagsExample = () => {
    return (
        <TagGroup label="Tags" size="md">
            <TagList className="flex gap-4">
                <Tag>Label</Tag>
                <Tag avatarSrc={AU_FLAG}>Label</Tag>
                <Tag avatarSrc={AVATAR.src}>Label</Tag>
                <Tag dot={true}>Label</Tag>
            </TagList>
        </TagGroup>
    );
};

export const SizesExample = () => {
    return (
        <div className="flex flex-col gap-4">
            {/* Small */}
            <TagGroup label="Tags" size="sm">
                <TagList className="flex gap-4">
                    <Tag>Label</Tag>
                    <Tag avatarSrc={AU_FLAG}>Label</Tag>
                    <Tag avatarSrc={AVATAR.src}>Label</Tag>
                    <Tag dot={true}>Label</Tag>
                </TagList>
            </TagGroup>

            {/* Medium */}
            <TagGroup label="Tags" size="md">
                <TagList className="flex gap-4">
                    <Tag>Label</Tag>
                    <Tag avatarSrc={AU_FLAG}>Label</Tag>
                    <Tag avatarSrc={AVATAR.src}>Label</Tag>
                    <Tag dot={true}>Label</Tag>
                </TagList>
            </TagGroup>

            {/* Large */}
            <TagGroup label="Tags" size="lg">
                <TagList className="flex gap-4">
                    <Tag>Label</Tag>
                    <Tag avatarSrc={AU_FLAG}>Label</Tag>
                    <Tag avatarSrc={AVATAR.src}>Label</Tag>
                    <Tag dot={true}>Label</Tag>
                </TagList>
            </TagGroup>
        </div>
    );
};

export const CloseXExample = () => {
    const [tags, setTags] = useState<TagItem[]>([
        { id: "tag-01", label: "Label" },
        { id: "tag-02", label: "Label", avatarSrc: AU_FLAG, avatarContrastBorder: false },
        { id: "tag-03", label: "Label", avatarSrc: AVATAR.src },
        { id: "tag-04", label: "Label", dot: true },
    ]);

    return (
        <TagGroup
            label="Tags"
            size="md"
            onRemove={(keys) => {
                setTags(tags.filter((tag) => !keys.has(tag.id)));
            }}
        >
            <TagList className="flex flex-col items-start gap-4 md:flex-row" items={tags}>
                {(item) => <Tag {...item}>{item.label}</Tag>}
            </TagList>
        </TagGroup>
    );
};

export const CountExample = () => {
    return (
        <TagGroup label="Tags" size="md">
            <TagList className="flex flex-col items-start gap-4 md:flex-row">
                <Tag count={5}>Label</Tag>
                <Tag avatarSrc={AU_FLAG} count={5}>
                    Label
                </Tag>
                <Tag avatarSrc={AVATAR.src} count={5}>
                    Label
                </Tag>
                <Tag dot={true} count={5}>
                    Label
                </Tag>
            </TagList>
        </TagGroup>
    );
};

export const CheckboxExample = () => {
    const [selectedTags, setSelectedTags] = useState<AriaSelection>(new Set(["tag-01", "tag-02"]));

    return (
        <TagGroup label="Tags" size="md" selectionMode="multiple" selectedKeys={selectedTags} onSelectionChange={setSelectedTags}>
            <TagList className="flex flex-col items-start gap-4 md:flex-row">
                <Tag id="tag-01">Label</Tag>
                <Tag id="tag-02" avatarSrc={AU_FLAG}>
                    Label
                </Tag>
                <Tag id="tag-03" avatarSrc={AVATAR.src}>
                    Label
                </Tag>
                <Tag id="tag-04" dot={true}>
                    Label
                </Tag>
            </TagList>
        </TagGroup>
    );
};

export const CheckboxCloseXExample = () => {
    const [selectedTags, setSelectedTags] = useState<AriaSelection>(new Set(["tag-01", "tag-02"]));
    const [tags, setTags] = useState<TagItem[]>([
        { id: "tag-01", label: "Label" },
        { id: "tag-02", label: "Label", avatarSrc: AU_FLAG, avatarContrastBorder: false },
        { id: "tag-03", label: "Label", avatarSrc: AVATAR.src },
        { id: "tag-04", label: "Label", dot: true },
    ]);

    return (
        <TagGroup
            label="Tags"
            size="md"
            selectionMode="multiple"
            selectedKeys={selectedTags}
            onSelectionChange={setSelectedTags}
            onRemove={(keys) => {
                setTags(tags.filter((tag) => !keys.has(tag.id)));
            }}
        >
            <TagList className="flex flex-col items-start gap-4 md:flex-row" items={tags}>
                {(item) => <Tag {...item}>{item.label}</Tag>}
            </TagList>
        </TagGroup>
    );
};

export const CheckboxCountExample = () => {
    const [selectedTags, setSelectedTags] = useState<AriaSelection>(new Set(["tag-01", "tag-02"]));

    return (
        <TagGroup label="Tags" size="md" selectionMode="multiple" selectedKeys={selectedTags} onSelectionChange={setSelectedTags}>
            <TagList className="flex flex-col items-start gap-4 md:flex-row">
                <Tag id="tag-01" count={5}>
                    Label
                </Tag>
                <Tag id="tag-02" avatarSrc={AU_FLAG} count={5}>
                    Label
                </Tag>
                <Tag id="tag-03" avatarSrc={AVATAR.src} count={5}>
                    Label
                </Tag>
                <Tag id="tag-04" dot={true} count={5}>
                    Label
                </Tag>
            </TagList>
        </TagGroup>
    );
};
