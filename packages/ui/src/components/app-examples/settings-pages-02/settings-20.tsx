"use client";

import { File02, LayersThree01, MessageChatCircle, SearchLg, Zap } from "@properui/icons";
import { IMAGES } from "../../../utils/demo-assets";
import { SectionHeader } from "../../application/section-headers/section-headers";
import { Tabs } from "../../application/tabs/tabs";
import { Button } from "../../base/buttons/button";
import { Input } from "../../base/input/input";
import { NativeSelect } from "../../base/select/select-native";
import { Toggle } from "../../base/toggle/toggle";
import { FigmaIcon, GitHubIcon } from "../../foundations/integration-icons";
import { IntegrationLogo, PageContainer, SettingsHeaderNav, settingsSectionOptions, settingsSections, styles } from "./settings-shell";

const integrations = [
    {
        id: "linear",
        name: "Linear",
        description: "Streamline and plan software projects, sprints, and bug tracking.",
        href: "https://linear.app",
        icon: LayersThree01,
        isConnected: true,
    },
    {
        id: "github",
        name: "GitHub",
        description: "Link pull requests and automate your development workflows.",
        href: "https://github.com",
        icon: GitHubIcon,
        isConnected: true,
    },
    {
        id: "figma",
        name: "Figma",
        description: "Embed design files, prototypes, and previews directly in projects.",
        href: "https://figma.com",
        icon: FigmaIcon,
        isConnected: true,
    },
    {
        id: "zapier",
        name: "Zapier",
        description: "Build custom automations and integrations that connect your apps and workflows.",
        href: "https://zapier.com",
        icon: Zap,
        isConnected: false,
    },
    {
        id: "notion",
        name: "Notion",
        description: "Embed entire Notion pages, projects, and notes into your projects.",
        href: "https://notion.so",
        icon: File02,
        isConnected: false,
    },
    {
        id: "slack",
        name: "Slack",
        description: "Send notifications and updates to channels and create projects.",
        href: "https://slack.com",
        icon: MessageChatCircle,
        isConnected: false,
    },
];

/** Connected apps behind a vertical tab rail, with a product update card at the end. */
export const Settings20 = () => (
    <div className="bg-primary">
        <SettingsHeaderNav />

        <main className="bg-primary pt-8 pb-12 lg:pt-12 lg:pb-24">
            <div className="flex flex-col gap-8">
                <PageContainer className="flex flex-col gap-5 lg:gap-6">
                    <div className="lg:border-secondary flex flex-col gap-4 lg:flex-row lg:border-b lg:pb-4">
                        <div className="flex flex-1 flex-col gap-0.5">
                            <h1 className={styles.pageTitle}>Settings</h1>
                            <p className={styles.pageDescription}>Manage your account settings and preferences here.</p>
                        </div>
                    </div>

                    <NativeSelect size="sm" aria-label="Page tabs" defaultValue="integrations" options={settingsSectionOptions} className="w-full lg:hidden" />
                </PageContainer>

                <div className="max-w-container mx-auto flex w-full gap-24 px-4 lg:px-8">
                    <Tabs orientation="vertical" defaultSelectedKey="integrations" className="hidden w-auto lg:flex">
                        <Tabs.List type="button-gray" items={settingsSections} aria-label="Settings sections">
                            {(item) => <Tabs.Item {...item} badge={item.id === "team" ? 4 : item.id === "notifications" ? 2 : undefined} />}
                        </Tabs.List>
                        {settingsSections.map((item) => (
                            <Tabs.Panel key={item.id} id={item.id} />
                        ))}
                    </Tabs>

                    <div className="flex flex-1 flex-col gap-6">
                        <SectionHeader
                            size="sm"
                            divider={false}
                            title="Connected apps"
                            description="Supercharge your workflow and connect the tool you use every day."
                            actions={
                                <>
                                    <Input
                                        shortcut
                                        size="sm"
                                        icon={SearchLg}
                                        aria-label="Search"
                                        placeholder="Search"
                                        className="w-full max-w-70 max-md:hidden"
                                    />
                                    <Input size="md" icon={SearchLg} aria-label="Search" placeholder="Search" className="w-full md:hidden" />
                                </>
                            }
                        />

                        <ul className="flex flex-col gap-4 lg:gap-0">
                            {integrations.map((integration) => (
                                <li key={integration.id} className="border-secondary flex flex-col gap-4 border-b py-4 lg:flex-row lg:items-center">
                                    <div className="flex flex-1 flex-col gap-4 lg:flex-row lg:items-center">
                                        <div className="flex items-center justify-between">
                                            <IntegrationLogo icon={integration.icon} name={integration.name} />

                                            <div className="lg:hidden">
                                                <Toggle size="md" aria-label={`Connect ${integration.name}`} defaultSelected={integration.isConnected} />
                                            </div>
                                        </div>

                                        <div className="flex flex-col gap-0.5">
                                            <p className="text-secondary text-md font-semibold">{integration.name}</p>
                                            <p className="text-tertiary text-sm">{integration.description}</p>
                                        </div>
                                    </div>

                                    <div className="-mt-1 flex items-center gap-4 lg:mt-0">
                                        <Button color="link-gray" size="md" href={integration.href}>
                                            Learn more
                                        </Button>

                                        <div className="max-lg:hidden">
                                            <Toggle size="md" aria-label={`Connect ${integration.name}`} defaultSelected={integration.isConnected} />
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>

                        <div className="bg-primary flex w-full flex-col overflow-hidden rounded-xl shadow-xs sm:flex-row">
                            <div className="relative h-50 w-full sm:h-auto sm:w-60">
                                <img src={IMAGES.landscape[4].src} alt="" className="absolute inset-0 size-full object-cover" />
                                <div className="absolute inset-0 size-full rounded-t-xl border border-black/10 sm:rounded-s-xl sm:rounded-se-none" />
                            </div>

                            <div className="border-secondary flex-1 rounded-b-xl border border-t-0 px-4 py-5 sm:rounded-e-xl sm:rounded-es-none sm:border-s-0 sm:border-t sm:p-6">
                                <div className="flex flex-col">
                                    <h3 className="text-primary text-md font-semibold">We've just released a new update!</h3>
                                    <p className="text-tertiary mt-0.5 text-sm">Check out the all new dashboard view. Pages and now load faster.</p>

                                    <div className="mt-5 flex flex-col-reverse gap-3 sm:flex-row">
                                        <Button size="sm" color="secondary">
                                            Dismiss
                                        </Button>
                                        <Button size="sm">Changelog</Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>
);
