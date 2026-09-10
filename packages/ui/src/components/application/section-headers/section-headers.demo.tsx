"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import type { Key } from "react-aria";
import { Grid01, Plus, Rows03, SearchLg, UploadCloud01 } from "@properui/icons";
import { SectionHeader } from "@/components/application/section-headers/section-headers";
import { Tabs } from "@/components/application/tabs/tabs";
import { ButtonGroup, ButtonGroupItem } from "@/components/base/button-group/button-group";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";

/** Matches the width the docs preview gives every section header. Demo-only, not exported. */
const Wrapper = ({ children }: { children: ReactNode }) => <div className="w-full max-w-3xl">{children}</div>;

const tabItems = [
    { id: "view-all", label: "View all" },
    { id: "monitored", label: "Monitored", badge: 4 },
    { id: "unmonitored", label: "Unmonitored" },
];

/**
 * Wraps a header in a `Tabs` root so the underline tab row inside it controls the section's panels.
 * Demo-only, not exported.
 */
const TabbedSection = ({ children }: { children: (tabList: ReactNode) => ReactNode }) => {
    const [selectedKey, setSelectedKey] = useState<Key>("view-all");

    return (
        <Tabs selectedKey={selectedKey} onSelectionChange={setSelectedKey}>
            {children(
                <Tabs.List type="underline" items={tabItems}>
                    {(item) => <Tabs.Item {...item} />}
                </Tabs.List>,
            )}

            {tabItems.map((item) => (
                <Tabs.Panel key={item.id} id={item.id} />
            ))}
        </Tabs>
    );
};

/** Two buttons — the most common section header action pair. Demo-only, not exported. */
const HeaderButtons = () => (
    <>
        <Button color="secondary" size="md" iconLeading={UploadCloud01}>
            Import
        </Button>
        <Button color="primary" size="md" iconLeading={Plus}>
            Add project
        </Button>
    </>
);

/** Search field sized for the end of a header row. Demo-only, not exported. */
const HeaderSearch = () => <Input size="md" icon={SearchLg} placeholder="Search" className="md:w-70" />;

/** Period filter. Demo-only, not exported. */
const PeriodButtonGroup = () => (
    <ButtonGroup selectedKeys={["30-days"]}>
        <ButtonGroupItem id="12-months">12 months</ButtonGroupItem>
        <ButtonGroupItem id="30-days">30 days</ButtonGroupItem>
        <ButtonGroupItem id="7-days">7 days</ButtonGroupItem>
        <ButtonGroupItem id="24-hours">24 hours</ButtonGroupItem>
    </ButtonGroup>
);

/** Layout toggle. Demo-only, not exported. */
const LayoutButtonGroup = () => (
    <ButtonGroup selectedKeys={["grid"]}>
        <ButtonGroupItem id="grid" aria-label="Grid view" iconLeading={Grid01} />
        <ButtonGroupItem id="list" aria-label="List view" iconLeading={Rows03} />
    </ButtonGroup>
);

const description = "Track, manage and ship every project your team owns.";

export const SectionHeaderExample = () => (
    <Wrapper>
        <TabbedSection>
            {(tabList) => (
                <SectionHeader title="Projects" badge="24 active" description={description} actions={<HeaderSearch />}>
                    {tabList}
                </SectionHeader>
            )}
        </TabbedSection>
    </Wrapper>
);

export const SectionHeaderButtons = () => (
    <Wrapper>
        <SectionHeader title="Projects" description={description} actions={<HeaderButtons />} />
    </Wrapper>
);

export const SectionHeaderSearchInput = () => (
    <Wrapper>
        <SectionHeader title="Projects" description={description} actions={<HeaderSearch />} />
    </Wrapper>
);

export const SectionHeaderButtonGroup = () => (
    <Wrapper>
        <SectionHeader title="Projects" description={description} actions={<PeriodButtonGroup />} />
    </Wrapper>
);

export const SectionHeaderButtonsWithTabs = () => (
    <Wrapper>
        <TabbedSection>
            {(tabList) => (
                <SectionHeader title="Projects" description={description} actions={<HeaderButtons />}>
                    {tabList}
                </SectionHeader>
            )}
        </TabbedSection>
    </Wrapper>
);

export const SectionHeaderSearchInputWithTabs = () => (
    <Wrapper>
        <TabbedSection>
            {(tabList) => (
                <SectionHeader title="Projects" description={description} actions={<HeaderSearch />}>
                    {tabList}
                </SectionHeader>
            )}
        </TabbedSection>
    </Wrapper>
);

export const SectionHeaderButtonGroupsWithTabs = () => (
    <Wrapper>
        <TabbedSection>
            {(tabList) => (
                <SectionHeader
                    title="Projects"
                    description={description}
                    actions={
                        <>
                            <PeriodButtonGroup />
                            <LayoutButtonGroup />
                        </>
                    }
                >
                    {tabList}
                </SectionHeader>
            )}
        </TabbedSection>
    </Wrapper>
);
