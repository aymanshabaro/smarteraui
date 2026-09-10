"use client";

import { HomeLine } from "@properui/icons";
import { Breadcrumbs, type BreadcrumbsMenuItem } from "@/components/application/breadcrumbs/breadcrumbs";
import { AVATARS, IMAGES, LOGOS } from "@/utils/demo-assets";

const hiddenItems: BreadcrumbsMenuItem[] = [
    { id: "projects", label: "Projects", href: "#" },
    { id: "workspace", label: "Workspace", href: "#" },
];

const accountItems: BreadcrumbsMenuItem[] = [
    { id: "profile", label: "View profile", href: "#" },
    { id: "account-settings", label: "Account settings", href: "#" },
    { id: "switch-account", label: "Switch account", href: "#" },
];

export const BreadcrumbsExample = () => (
    <div className="flex flex-col gap-8">
        <Breadcrumbs aria-label="Breadcrumb with chevron dividers">
            <Breadcrumbs.Item href="#" icon={HomeLine} aria-label="Home" />
            <Breadcrumbs.Item href="#">Settings</Breadcrumbs.Item>
            <Breadcrumbs.Collapsed items={hiddenItems} />
            <Breadcrumbs.Item href="#">Team</Breadcrumbs.Item>
        </Breadcrumbs>

        <Breadcrumbs divider="slash" aria-label="Breadcrumb with slash dividers">
            <Breadcrumbs.Item href="#" icon={HomeLine} aria-label="Home" />
            <Breadcrumbs.Item href="#">Settings</Breadcrumbs.Item>
            <Breadcrumbs.Collapsed items={hiddenItems} />
            <Breadcrumbs.Item href="#">Team</Breadcrumbs.Item>
        </Breadcrumbs>
    </div>
);

export const BreadcrumbsText = () => (
    <div className="flex flex-col gap-8">
        <Breadcrumbs type="text" aria-label="Text breadcrumb with chevron dividers">
            <Breadcrumbs.Item href="#" icon={HomeLine} aria-label="Home" />
            <Breadcrumbs.Item href="#">Settings</Breadcrumbs.Item>
            <Breadcrumbs.Collapsed items={hiddenItems} />
            <Breadcrumbs.Item href="#">Team</Breadcrumbs.Item>
        </Breadcrumbs>

        <Breadcrumbs type="text" divider="slash" aria-label="Text breadcrumb with slash dividers">
            <Breadcrumbs.Item href="#" icon={HomeLine} aria-label="Home" />
            <Breadcrumbs.Item href="#">Settings</Breadcrumbs.Item>
            <Breadcrumbs.Collapsed items={hiddenItems} />
            <Breadcrumbs.Item href="#">Team</Breadcrumbs.Item>
        </Breadcrumbs>
    </div>
);

export const BreadcrumbsTextWithLine = () => (
    <div className="flex flex-col gap-8">
        <Breadcrumbs type="text-line" aria-label="Lined breadcrumb with chevron dividers">
            <Breadcrumbs.Item href="#" icon={HomeLine} aria-label="Home" />
            <Breadcrumbs.Item href="#">Settings</Breadcrumbs.Item>
            <Breadcrumbs.Collapsed items={hiddenItems} />
            <Breadcrumbs.Item href="#">Team</Breadcrumbs.Item>
        </Breadcrumbs>

        <Breadcrumbs type="text-line" divider="slash" aria-label="Lined breadcrumb with slash dividers">
            <Breadcrumbs.Item href="#" icon={HomeLine} aria-label="Home" />
            <Breadcrumbs.Item href="#">Settings</Breadcrumbs.Item>
            <Breadcrumbs.Collapsed items={hiddenItems} />
            <Breadcrumbs.Item href="#">Team</Breadcrumbs.Item>
        </Breadcrumbs>
    </div>
);

export const BreadcrumbsButton = () => (
    <div className="flex flex-col gap-8">
        <Breadcrumbs type="button" aria-label="Button breadcrumb with chevron dividers">
            <Breadcrumbs.Item href="#" icon={HomeLine} aria-label="Home" />
            <Breadcrumbs.Item href="#">Settings</Breadcrumbs.Item>
            <Breadcrumbs.Collapsed items={hiddenItems} />
            <Breadcrumbs.Item href="#">Team</Breadcrumbs.Item>
        </Breadcrumbs>

        <Breadcrumbs type="button" divider="slash" aria-label="Button breadcrumb with slash dividers">
            <Breadcrumbs.Item href="#" icon={HomeLine} aria-label="Home" />
            <Breadcrumbs.Item href="#">Settings</Breadcrumbs.Item>
            <Breadcrumbs.Collapsed items={hiddenItems} />
            <Breadcrumbs.Item href="#">Team</Breadcrumbs.Item>
        </Breadcrumbs>
    </div>
);

export const AccountButtonChevron = () => (
    <Breadcrumbs aria-label="Account breadcrumb with chevron dividers">
        <Breadcrumbs.Account href="#" src={IMAGES.square[0].src}>
            {LOGOS[0].name}
        </Breadcrumbs.Account>
        <Breadcrumbs.AccountMenu src={AVATARS[0].src} items={accountItems}>
            {AVATARS[0].name}
        </Breadcrumbs.AccountMenu>
        <Breadcrumbs.Item labelClassName="text-primary group-hover:text-primary">Settings</Breadcrumbs.Item>
    </Breadcrumbs>
);

export const AccountButtonSlash = () => (
    <Breadcrumbs divider="slash" aria-label="Account breadcrumb with slash dividers">
        <Breadcrumbs.Account href="#" src={IMAGES.square[0].src}>
            {LOGOS[0].name}
        </Breadcrumbs.Account>
        <Breadcrumbs.AccountMenu src={AVATARS[0].src} items={accountItems}>
            {AVATARS[0].name}
        </Breadcrumbs.AccountMenu>
        <Breadcrumbs.Item labelClassName="text-primary group-hover:text-primary">Settings</Breadcrumbs.Item>
    </Breadcrumbs>
);
