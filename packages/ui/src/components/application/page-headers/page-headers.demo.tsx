"use client";

import { useState } from "react";
import type { Key } from "react-aria";
import { Edit01, HomeLine, Mail01, Plus, Share04, Upload01 } from "@smarteraui/icons";
import { Breadcrumbs } from "@/components/application/breadcrumbs/breadcrumbs";
import { Tabs } from "@/components/application/tabs/tabs";
import { Button } from "@/components/base/buttons/button";
import { AVATARS, IMAGES } from "@/utils/demo-assets";
import { PageHeader } from "./page-headers";

const tabItems = [
    { id: "overview", label: "Overview" },
    { id: "projects", label: "Projects" },
    { id: "activity", label: "Activity" },
    { id: "teams", label: "Teams", badge: 4 },
];

const HeaderTabs = ({ isCentered }: { isCentered?: boolean }) => {
    const [selectedKey, setSelectedKey] = useState<Key>("overview");

    return (
        <Tabs selectedKey={selectedKey} onSelectionChange={setSelectedKey}>
            <Tabs.List type="underline" items={tabItems} className={isCentered ? "justify-center" : undefined}>
                {(item) => <Tabs.Item {...item} />}
            </Tabs.List>
            {tabItems.map((item) => (
                <Tabs.Panel key={item.id} id={item.id} />
            ))}
        </Tabs>
    );
};

const profile = AVATARS[0];
const cover = IMAGES.landscape[0];

const BannerAvatarHeader = () => (
    <PageHeader>
        <PageHeader.Banner src={cover.src} alt="" />
        <PageHeader.Content>
            <PageHeader.Avatar src={profile.src} alt="" />
            <PageHeader.Heading>
                <PageHeader.Title>{profile.name}</PageHeader.Title>
                <PageHeader.Description>Product designer, Smartera — {profile.email}</PageHeader.Description>
            </PageHeader.Heading>
            <PageHeader.Actions>
                <Button size="md" color="secondary" iconLeading={Mail01}>
                    Message
                </Button>
                <Button size="md" iconLeading={Edit01}>
                    Edit profile
                </Button>
            </PageHeader.Actions>
        </PageHeader.Content>
        <PageHeader.Footer>
            <HeaderTabs />
        </PageHeader.Footer>
    </PageHeader>
);

export const PageHeaderExample = () => <BannerAvatarHeader />;

export const Simple = () => (
    <PageHeader>
        <Breadcrumbs aria-label="Breadcrumb">
            <Breadcrumbs.Item href="#" icon={HomeLine} aria-label="Home" />
            <Breadcrumbs.Item href="#">Settings</Breadcrumbs.Item>
            <Breadcrumbs.Item href="#">Team</Breadcrumbs.Item>
        </Breadcrumbs>
        <PageHeader.Content>
            <PageHeader.Heading>
                <PageHeader.Title>Team members</PageHeader.Title>
                <PageHeader.Description>Manage your team members and their account permissions here.</PageHeader.Description>
            </PageHeader.Heading>
            <PageHeader.Actions>
                <Button size="md" color="secondary" iconLeading={Upload01}>
                    Import
                </Button>
                <Button size="md" iconLeading={Plus}>
                    Add member
                </Button>
            </PageHeader.Actions>
        </PageHeader.Content>
        <PageHeader.Footer>
            <HeaderTabs />
        </PageHeader.Footer>
    </PageHeader>
);

export const Avatar = () => (
    <PageHeader>
        <PageHeader.Content>
            <PageHeader.Avatar src={profile.src} alt="" />
            <PageHeader.Heading>
                <PageHeader.Title>{profile.name}</PageHeader.Title>
                <PageHeader.Description>Product designer, Smartera — {profile.email}</PageHeader.Description>
            </PageHeader.Heading>
            <PageHeader.Actions>
                <Button size="md" color="secondary" iconLeading={Mail01}>
                    Message
                </Button>
                <Button size="md" iconLeading={Edit01}>
                    Edit profile
                </Button>
            </PageHeader.Actions>
        </PageHeader.Content>
        <PageHeader.Footer>
            <HeaderTabs />
        </PageHeader.Footer>
    </PageHeader>
);

export const BannerSimple = () => (
    <PageHeader>
        <PageHeader.Banner src={cover.src} alt="" />
        <PageHeader.Content>
            <PageHeader.Heading>
                <PageHeader.Title>Design projects</PageHeader.Title>
                <PageHeader.Description>Everything the design team is shipping this quarter.</PageHeader.Description>
            </PageHeader.Heading>
            <PageHeader.Actions>
                <Button size="md" color="secondary" iconLeading={Share04}>
                    Share
                </Button>
                <Button size="md" iconLeading={Plus}>
                    New project
                </Button>
            </PageHeader.Actions>
        </PageHeader.Content>
        <PageHeader.Footer>
            <HeaderTabs />
        </PageHeader.Footer>
    </PageHeader>
);

export const BannerAvatar = () => <BannerAvatarHeader />;

export const BannerSimpleCentered = () => (
    <PageHeader align="center">
        <PageHeader.Banner src={cover.src} alt="" />
        <PageHeader.Content>
            <PageHeader.Heading>
                <PageHeader.Title>Design projects</PageHeader.Title>
                <PageHeader.Description>Everything the design team is shipping this quarter.</PageHeader.Description>
            </PageHeader.Heading>
            <PageHeader.Actions>
                <Button size="md" color="secondary" iconLeading={Share04}>
                    Share
                </Button>
                <Button size="md" iconLeading={Plus}>
                    New project
                </Button>
            </PageHeader.Actions>
        </PageHeader.Content>
        <PageHeader.Footer>
            <HeaderTabs isCentered />
        </PageHeader.Footer>
    </PageHeader>
);

export const BannerAvatarCentered = () => (
    <PageHeader align="center">
        <PageHeader.Banner src={cover.src} alt="" />
        <PageHeader.Content>
            <PageHeader.Avatar src={profile.src} alt="" />
            <PageHeader.Heading>
                <PageHeader.Title>{profile.name}</PageHeader.Title>
                <PageHeader.Description>Product designer, Smartera — {profile.email}</PageHeader.Description>
            </PageHeader.Heading>
            <PageHeader.Actions>
                <Button size="md" color="secondary" iconLeading={Mail01}>
                    Message
                </Button>
                <Button size="md" iconLeading={Edit01}>
                    Edit profile
                </Button>
            </PageHeader.Actions>
        </PageHeader.Content>
        <PageHeader.Footer>
            <HeaderTabs isCentered />
        </PageHeader.Footer>
    </PageHeader>
);
