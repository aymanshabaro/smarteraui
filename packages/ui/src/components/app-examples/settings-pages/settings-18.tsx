"use client";

import { ArrowLeft } from "@properui/icons";
import { SectionHeader } from "../../application/section-headers/section-headers";
import { Button } from "../../base/buttons/button";
import { Checkbox } from "../../base/checkbox/checkbox";
import { SettingsFormRow, SettingsMain, SettingsPage, SettingsTabPanel, SettingsTabsRoot, SettingsTabsRow, styles } from "./settings-shared.a";

interface NotificationCategory {
    id: string;
    title: string;
    description: string;
    defaultChannels: string[];
}

const categories: NotificationCategory[] = [
    {
        id: "comments",
        title: "Comments",
        description: "These are notifications for comments on your posts and replies to your comments.",
        defaultChannels: ["push", "email"],
    },
    {
        id: "tags",
        title: "Tags",
        description: "These are notifications for when someone tags you in a comment, post or story.",
        defaultChannels: ["push"],
    },
    {
        id: "reminders",
        title: "Reminders",
        description: "These are notifications to remind you of updates you might have missed.",
        defaultChannels: ["push", "email", "sms"],
    },
    {
        id: "activity",
        title: "More activity about you",
        description: "These are notifications for posts on your profile, likes and other reactions to your posts, and more.",
        defaultChannels: ["push"],
    },
];

const channels = [
    { id: "push", label: "Push" },
    { id: "email", label: "Email" },
    { id: "sms", label: "SMS" },
];

/**
 * A full-screen settings overlay reached with "Back to dashboard" instead of a persistent sidebar —
 * every other variant keeps the app's sidebar visible, this one takes over the whole viewport.
 */
export const Settings18 = () => (
    <SettingsPage>
        <SettingsMain className="pt-6">
            <SettingsTabsRoot selectedTab="notifications">
                <div className={styles.page.gutter}>
                    <Button color="link-gray" size="md" href="/dashboard" iconLeading={ArrowLeft} className="w-max">
                        Back to dashboard
                    </Button>
                </div>

                <div className={styles.page.gutter}>
                    <h1 className={styles.header.title}>Settings</h1>
                </div>

                <SettingsTabsRow selectedTab="notifications" type="underline" className={styles.page.gutter} />

                <SettingsTabPanel id="notifications">
                    <SectionHeader
                        title="Notification settings"
                        description="We may still send you important notifications about your account outside of your notification settings."
                    />

                    <div className="flex flex-col gap-6">
                        {categories.map((category, index) => (
                            <div key={category.id} className="flex flex-col gap-6">
                                {index > 0 && <hr className="bg-border-secondary h-px w-full border-none" />}

                                <SettingsFormRow label={category.title} hint={category.description} showLabelOnMobile>
                                    <div className="flex flex-col gap-3">
                                        {channels.map((channel) => (
                                            <Checkbox key={channel.id} label={channel.label} defaultSelected={category.defaultChannels.includes(channel.id)} />
                                        ))}
                                    </div>
                                </SettingsFormRow>
                            </div>
                        ))}
                    </div>
                </SettingsTabPanel>
            </SettingsTabsRoot>
        </SettingsMain>
    </SettingsPage>
);
