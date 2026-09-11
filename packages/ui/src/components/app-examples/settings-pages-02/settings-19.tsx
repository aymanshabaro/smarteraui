"use client";

import { SectionHeader } from "../../application/section-headers/section-headers";
import { Tabs } from "../../application/tabs/tabs";
import { Checkbox } from "../../base/checkbox/checkbox";
import { DropdownIconSimple } from "../../base/dropdown/dropdown-icon-simple";
import { RadioButton, RadioGroup } from "../../base/radio-buttons/radio-buttons";
import { NativeSelect } from "../../base/select/select-native";
import { Divider, FieldLabel, PageContainer, SettingsHeaderNav, settingsSectionOptions, styles } from "./settings-shell";

const channels = [
    { id: "email", label: "Email" },
    { id: "in-app", label: "In-app" },
    { id: "push", label: "Push" },
];

const radioGroups = [
    {
        id: "comments",
        title: "Comments",
        description: "These are notifications for comments on your posts and replies to your comments.",
        selected: "all",
        options: [
            { id: "none", label: "Do not notify me" },
            { id: "mentions", label: "Mentions only", hint: "Only notify me if I'm mentioned in a comment." },
            { id: "all", label: "All comments", hint: "Notify me for all comments on my posts." },
        ],
    },
    {
        id: "reminders",
        title: "Reminders",
        description: "These are notifications to remind you of updates you might have missed.",
        selected: "all",
        options: [
            { id: "none", label: "Do not notify me" },
            { id: "important", label: "Important reminders only", hint: "Only notify me if the reminder is tagged as important." },
            { id: "all", label: "All reminders", hint: "Notify me for all reminders." },
        ],
    },
    {
        id: "activity",
        title: "More activity about you",
        description: "These are notifications for posts on your profile, likes and other reactions to your posts.",
        selected: "none",
        options: [
            { id: "none", label: "Do not notify me" },
            { id: "all", label: "All reminders", hint: "Notify me for all other activity." },
        ],
    },
];

/** Notification settings scoped to a delivery channel, chosen with a segmented tab row. */
export const Settings19 = () => (
    <div className="bg-primary">
        <SettingsHeaderNav showUpgrade={false} activeUrl="/settings/notifications" subNav="tabs" />

        <main className="bg-primary flex flex-col gap-8 pt-8 pb-12 lg:pt-12 lg:pb-24">
            <div className="flex flex-col gap-5 px-4 lg:hidden">
                <div className="flex flex-col gap-4">
                    <div className="flex flex-1 flex-col gap-0.5">
                        <h1 className={styles.pageTitle}>Settings</h1>
                    </div>
                </div>

                <NativeSelect size="sm" aria-label="Page tabs" defaultValue="notifications" options={settingsSectionOptions} className="w-full" />
            </div>

            <PageContainer>
                <div className="flex w-full flex-col gap-6 lg:mx-auto lg:max-w-160">
                    <SectionHeader
                        size="sm"
                        divider={false}
                        title="Notifications"
                        description="Choose when and how we contact you."
                        actions={<DropdownIconSimple />}
                    />

                    <Tabs defaultSelectedKey="email" className="w-auto self-start">
                        <Tabs.List type="button-minimal" items={channels} aria-label="Notification channels">
                            {(item) => <Tabs.Item {...item} />}
                        </Tabs.List>
                        {channels.map((channel) => (
                            <Tabs.Panel key={channel.id} id={channel.id} />
                        ))}
                    </Tabs>

                    <div className="flex flex-col gap-5 lg:gap-6">
                        <div className="flex flex-col gap-5">
                            <FieldLabel title="Notifications from us" description="Receive the latest news, updates and industry tutorials from us." />

                            <div className="flex w-max flex-col gap-4">
                                <Checkbox defaultSelected name="newsAndUpdates" label="News and updates" hint="News about product and feature updates." />
                                <Checkbox defaultSelected name="tipsAndTutorials" label="Tips and tutorials" hint="Tips on getting more out of Proper UI." />
                                <Checkbox
                                    name="userResearch"
                                    label="User research"
                                    hint={
                                        <span className="inline-block max-w-xs">
                                            Get involved in our beta testing program or participate in paid product user research.
                                        </span>
                                    }
                                />
                            </div>
                        </div>

                        {radioGroups.map((group) => (
                            <div key={group.id} className="contents">
                                <Divider />

                                <div className="flex flex-col gap-5">
                                    <FieldLabel title={group.title} description={group.description} />

                                    <RadioGroup aria-label={group.title} defaultValue={group.selected} className="flex flex-col gap-4">
                                        {group.options.map((option) => (
                                            <RadioButton key={option.id} value={option.id} label={option.label} hint={option.hint} />
                                        ))}
                                    </RadioGroup>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </PageContainer>
        </main>
    </div>
);
