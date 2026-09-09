"use client";

import { Plus } from "@smarteraui/icons";
import { SidebarNavigationSlim } from "@/components/application/app-navigation/sidebar-navigation/sidebar-slim";
import { SectionHeader } from "@/components/application/section-headers/section-headers";
import { Avatar } from "@/components/base/avatar/avatar";
import { ButtonGroup, ButtonGroupItem } from "@/components/base/button-group/button-group";
import { Button } from "@/components/base/buttons/button";
import { Toggle } from "@/components/base/toggle/toggle";
import { LOGOS } from "@/utils/demo-assets";
import {
    SettingsMain,
    SettingsPage,
    SettingsPageTitle,
    SettingsTabPanel,
    SettingsTabsRoot,
    SettingsTabsRow,
    navFooterItemsCompact,
    navItemsFlat,
} from "./settings-shared.a";

const categories = [
    { id: "all", label: "View all" },
    { id: "dev", label: "Developer tools" },
    { id: "comms", label: "Communication" },
    { id: "productivity", label: "Productivity" },
    { id: "browser", label: "Browser tools" },
    { id: "marketplace", label: "Marketplace" },
];

const appDescriptions = [
    "Streamline software projects, sprints, and bug tracking.",
    "Link pull requests and automate workflows.",
    "Embed file previews directly inside projects.",
    "Build custom automations and integrations with apps.",
    "Embed notes and pages directly inside projects.",
    "Send notifications to channels and create projects.",
] as const;

const apps = LOGOS.map((logo, index) => ({
    id: logo.name.toLowerCase(),
    logo,
    description: appDescriptions[index] ?? appDescriptions[0],
    defaultConnected: index % 2 === 0,
}));

/** Integrations rendered as a filterable grid of app cards, reached from the icon-only rail sidebar. */
export const Settings21 = () => (
    <SettingsPage>
        <SidebarNavigationSlim activeUrl="/settings" items={navItemsFlat} footerItems={navFooterItemsCompact} />

        <SettingsMain>
            <SettingsTabsRoot selectedTab="integrations">
                <SettingsPageTitle title="Settings" description="Manage your team and preferences here.">
                    <SettingsTabsRow selectedTab="integrations" type="underline" />
                </SettingsPageTitle>

                <SettingsTabPanel id="integrations">
                    <SectionHeader
                        title="Integrations and connected apps"
                        description="Supercharge your workflow and connect the tool you use every day."
                        divider={false}
                        actions={
                            <Button size="md" iconLeading={Plus}>
                                Request integration
                            </Button>
                        }
                    >
                        <div className="scrollbar-hide -mx-4 -my-1 flex overflow-auto px-4 py-1 lg:-mx-8 lg:px-8">
                            <ButtonGroup size="sm" aria-label="Filter integrations by category" defaultSelectedKeys={["all"]}>
                                {categories.map((category) => (
                                    <ButtonGroupItem key={category.id} id={category.id}>
                                        {category.label}
                                    </ButtonGroupItem>
                                ))}
                            </ButtonGroup>
                        </div>
                    </SectionHeader>

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {apps.map((app) => (
                            <div key={app.id} className="bg-primary ring-secondary flex flex-col gap-4 rounded-xl p-4 ring-1 ring-inset">
                                <div className="flex items-start justify-between gap-3">
                                    <Avatar src={app.logo.src} alt="" size="md" className="ring-secondary rounded-lg ring-1" />
                                    <Toggle aria-label={`Connect ${app.logo.name}`} defaultSelected={app.defaultConnected} />
                                </div>

                                <div className="flex flex-col gap-1">
                                    <p className="text-primary text-sm font-semibold">{app.logo.name}</p>
                                    <p className="text-tertiary text-sm">{app.description}</p>
                                </div>

                                <div className="border-secondary flex border-t pt-3">
                                    <Button color="link-color" size="sm">
                                        View integration
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </SettingsTabPanel>
            </SettingsTabsRoot>
        </SettingsMain>
    </SettingsPage>
);
