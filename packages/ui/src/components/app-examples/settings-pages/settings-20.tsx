"use client";

import { SearchLg } from "@properui/icons";
import { IMAGES, LOGOS } from "../../../utils/demo-assets";
import { SidebarNavigationSectionDividers } from "../../application/app-navigation/sidebar-navigation/sidebar-section-dividers";
import { SectionHeader } from "../../application/section-headers/section-headers";
import { Avatar } from "../../base/avatar/avatar";
import { Button } from "../../base/buttons/button";
import { Input } from "../../base/input/input";
import { Toggle } from "../../base/toggle/toggle";
import { SettingsMain, SettingsPage, SettingsPageTitle, SettingsTabPanel, SettingsTabsRoot, SettingsTabsRow, navItemsWithDividers } from "./settings-shared.a";

const appDescriptions = [
    "Streamline software projects, sprints, and bug tracking.",
    "Link pull requests and automate workflows.",
    "Embed file previews directly inside projects.",
    "Build custom automations and integrations with apps.",
    "Embed notes and pages directly inside projects.",
    "Send notifications to channels and create projects.",
] as const;

const connectedApps = LOGOS.map((logo, index) => ({
    id: logo.name.toLowerCase(),
    logo,
    description: appDescriptions[index] ?? appDescriptions[0],
    defaultConnected: index !== 5,
}));

/** Integrations settings: a release banner above a list of connected-app toggles. */
export const Settings20 = () => (
    <SettingsPage>
        <SidebarNavigationSectionDividers activeUrl="/settings" items={navItemsWithDividers} />

        <SettingsMain>
            <SettingsTabsRoot selectedTab="integrations">
                <SettingsPageTitle title="Settings" description="Manage your team and preferences here.">
                    <SettingsTabsRow selectedTab="integrations" type="underline" />
                </SettingsPageTitle>

                <SettingsTabPanel id="integrations">
                    <div className="bg-primary ring-secondary flex flex-col gap-4 rounded-xl p-4 ring-1 ring-inset sm:flex-row sm:items-center">
                        <img src={IMAGES.landscape[0].src} alt="" className="h-24 w-full shrink-0 rounded-lg object-cover sm:w-40" />

                        <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                            <div className="flex flex-col gap-1">
                                <h2 className="text-primary text-sm font-semibold">We've just released a new update!</h2>
                                <p className="text-tertiary text-sm">Check out the all new dashboard view. Pages and now load faster.</p>
                            </div>

                            <div className="flex gap-3">
                                <Button color="secondary" size="sm">
                                    Dismiss
                                </Button>
                                <Button color="primary" size="sm">
                                    Changelog
                                </Button>
                            </div>
                        </div>
                    </div>

                    <SectionHeader
                        title="Connected apps"
                        description="Supercharge your workflow and connect the tool you use every day."
                        actions={
                            <Input shortcut size="sm" aria-label="Search integrations" placeholder="Search" icon={SearchLg} className="w-full sm:max-w-70" />
                        }
                    />

                    <ul className="flex flex-col">
                        {connectedApps.map((app, index) => (
                            <li key={app.id} className={index > 0 ? "border-secondary border-t" : ""}>
                                <div className="flex items-center gap-4 py-4">
                                    <Avatar src={app.logo.src} alt="" size="md" className="ring-secondary rounded-lg ring-1" />

                                    <div className="min-w-0 flex-1">
                                        <p className="text-primary text-sm font-semibold">{app.logo.name}</p>
                                        <p className="text-tertiary text-sm">{app.description}</p>
                                    </div>

                                    <Button color="link-color" size="sm" className="hidden sm:inline-flex">
                                        Learn more
                                    </Button>

                                    <Toggle aria-label={`Connect ${app.logo.name}`} defaultSelected={app.defaultConnected} />
                                </div>
                            </li>
                        ))}
                    </ul>
                </SettingsTabPanel>
            </SettingsTabsRoot>
        </SettingsMain>
    </SettingsPage>
);
