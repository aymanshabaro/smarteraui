"use client";

import {
    CheckSquare,
    File02,
    FolderCheck,
    Globe01,
    LayersThree01,
    MessageChatCircle,
    MessageSmileCircle,
    Package,
    Plus,
    SearchLg,
    Ticket01,
    Zap,
} from "@smarteraui/icons";
import { PaginationPageMinimalCenter } from "@/components/application/pagination/pagination";
import { SectionHeader } from "@/components/application/section-headers/section-headers";
import { Tabs } from "@/components/application/tabs/tabs";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
import { NativeSelect } from "@/components/base/select/select-native";
import { Toggle } from "@/components/base/toggle/toggle";
import { FigmaIcon, GitHubIcon } from "@/components/foundations/integration-icons";
import { IntegrationLogo, PageContainer, SettingsHeaderNav, settingsSectionOptions, settingsSections, styles } from "./settings-shell";

const categories = [
    { id: "all", label: "View all" },
    { id: "developer-tools", label: "Developer tools" },
    { id: "communication", label: "Communication" },
    { id: "productivity", label: "Productivity" },
    { id: "browser-tools", label: "Browser tools" },
    { id: "marketplace", label: "Marketplace" },
];

const integrations = [
    { id: "linear", name: "Linear", description: "Streamline and plan software projects, sprints, and bug tracking.", icon: LayersThree01, isConnected: true },
    { id: "github", name: "GitHub", description: "Link pull requests and automate your development workflows.", icon: GitHubIcon, isConnected: true },
    { id: "figma", name: "Figma", description: "Embed design files, prototypes, and previews directly in projects.", icon: FigmaIcon, isConnected: true },
    {
        id: "zapier",
        name: "Zapier",
        description: "Build custom automations and integrations that connect your apps and workflows.",
        icon: Zap,
        isConnected: false,
    },
    { id: "notion", name: "Notion", description: "Embed entire Notion pages, projects, and notes into your projects.", icon: File02, isConnected: true },
    { id: "slack", name: "Slack", description: "Send notifications and updates to channels and create projects.", icon: MessageChatCircle, isConnected: false },
    { id: "zendesk", name: "Zendesk", description: "Link Zendesk tickets and automate entire support workflows.", icon: Ticket01, isConnected: false },
    {
        id: "jira",
        name: "Atlassian JIRA",
        description: "Plan, track, and manage software development work and tasks.",
        icon: CheckSquare,
        isConnected: true,
    },
    {
        id: "dropbox",
        name: "Dropbox",
        description: "Everything you need for work. Access and share files from your Dropbox workspace.",
        icon: Package,
        isConnected: false,
    },
    {
        id: "chrome",
        name: "Google Chrome",
        description: "Link your Google account to share bookmarks across your entire team.",
        icon: Globe01,
        isConnected: true,
    },
    {
        id: "discord",
        name: "Discord",
        description: "Keep in touch with your customers and your community without leaving the app.",
        icon: MessageSmileCircle,
        isConnected: false,
    },
    {
        id: "drive",
        name: "Google Drive",
        description: "Link your Google account to access and share files across your entire team.",
        icon: FolderCheck,
        isConnected: true,
    },
];

/** The integrations marketplace: category rail on the left, a paginated card grid on the right. */
export const Settings21 = () => (
    <div className="bg-primary">
        <SettingsHeaderNav activeUrl="/settings/integrations" subNav="buttons" />

        <main className="bg-primary pt-8 pb-12 lg:pt-12 lg:pb-24">
            <div className="flex flex-col gap-8">
                <PageContainer className="flex flex-col gap-5 lg:gap-6">
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-4 lg:flex-row">
                            <div className="flex flex-1 flex-col gap-0.5">
                                <h1 className={styles.pageTitle}>Settings</h1>
                            </div>

                            <Input shortcut size="sm" icon={SearchLg} aria-label="Search" placeholder="Search" className="w-full max-w-70 max-md:hidden" />
                            <Input size="md" icon={SearchLg} aria-label="Search" placeholder="Search" className="w-full md:hidden" />
                        </div>
                    </div>

                    <NativeSelect size="sm" aria-label="Page tabs" defaultValue="integrations" options={settingsSectionOptions} className="w-full md:hidden" />

                    <Tabs defaultSelectedKey="integrations" className="hidden w-full md:flex">
                        <Tabs.List fullWidth type="button-minimal" items={settingsSections} aria-label="Settings sections" className="w-full">
                            {(item) => <Tabs.Item {...item} />}
                        </Tabs.List>
                        {settingsSections.map((item) => (
                            <Tabs.Panel key={item.id} id={item.id} />
                        ))}
                    </Tabs>
                </PageContainer>

                <PageContainer className="flex flex-col gap-6">
                    <SectionHeader
                        size="sm"
                        divider={false}
                        title="Integrations and connected apps"
                        description="Supercharge your workflow and connect the tool you use every day."
                        actions={
                            <Button size="sm" color="secondary" iconLeading={Plus}>
                                Request integration
                            </Button>
                        }
                    />

                    <div className="flex gap-16">
                        <Tabs orientation="vertical" defaultSelectedKey="all" className="hidden w-auto lg:flex">
                            <Tabs.List type="line" items={categories} aria-label="Integration categories">
                                {(item) => <Tabs.Item {...item} />}
                            </Tabs.List>
                            {categories.map((category) => (
                                <Tabs.Panel key={category.id} id={category.id} />
                            ))}
                        </Tabs>

                        <div className="flex flex-1 flex-col gap-6">
                            <ul className="grid grid-cols-1 items-start gap-5 md:grid-cols-2 lg:gap-6 xl:grid-cols-3">
                                {integrations.map((integration) => (
                                    <li key={integration.id} className="bg-primary_alt ring-secondary w-full flex-1 rounded-xl shadow-xs ring-1 ring-inset">
                                        <div className="flex flex-col gap-6 px-4 py-5 lg:px-5">
                                            <div className="flex gap-2">
                                                <div className="flex flex-1 items-center gap-3">
                                                    <IntegrationLogo icon={integration.icon} name={integration.name} />
                                                    <p className="text-primary text-md font-medium lg:font-semibold">{integration.name}</p>
                                                </div>

                                                <Toggle size="sm" aria-label={`Connect ${integration.name}`} defaultSelected={integration.isConnected} />
                                            </div>

                                            <p className="text-tertiary text-sm">{integration.description}</p>
                                        </div>

                                        <div className="border-secondary flex items-center gap-4 border-t px-4 py-3 md:py-4 lg:px-6">
                                            <div className="flex flex-1 justify-end gap-3">
                                                <Button color="link-color" size="md">
                                                    View integration
                                                </Button>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>

                            <PaginationPageMinimalCenter page={1} total={10} />
                        </div>
                    </div>
                </PageContainer>
            </div>
        </main>
    </div>
);
