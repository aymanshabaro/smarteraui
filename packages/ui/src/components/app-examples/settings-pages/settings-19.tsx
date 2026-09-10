"use client";

import { RadioGroup as AriaRadioGroup } from "react-aria-components";
import { SidebarNavigationSlim } from "@/components/application/app-navigation/sidebar-navigation/sidebar-slim";
import { Checkbox } from "@/components/base/checkbox/checkbox";
import { RadioButton } from "@/components/base/radio-buttons/radio-buttons";
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

const emailUpdates = [
    { id: "news", label: "News and updates", hint: "News about product and feature updates.", defaultSelected: true },
    { id: "tips", label: "Tips and tutorials", hint: "Tips on getting more out of Proper UI.", defaultSelected: true },
    {
        id: "research",
        label: "User research",
        hint: "Get involved in our beta testing program or participate in paid product user research.",
        defaultSelected: false,
    },
];

interface RadioSection {
    id: string;
    title: string;
    description: string;
    options: { value: string; label: string; hint?: string }[];
    defaultValue: string;
}

const radioSections: RadioSection[] = [
    {
        id: "comments",
        title: "Comments",
        description: "These are notifications for comments on your posts and replies to your comments.",
        defaultValue: "mentions",
        options: [
            { value: "none", label: "Do not notify me" },
            { value: "mentions", label: "Mentions only", hint: "Only notify me if I'm mentioned in a comment." },
            { value: "all", label: "All comments", hint: "Notify me for all comments on my posts." },
        ],
    },
    {
        id: "reminders",
        title: "Reminders",
        description: "These are notifications to remind you of updates you might have missed.",
        defaultValue: "important",
        options: [
            { value: "none", label: "Do not notify me" },
            { value: "important", label: "Important reminders only", hint: "Only notify me if the reminder is tagged as important." },
            { value: "all", label: "All reminders", hint: "Notify me for all reminders." },
        ],
    },
    {
        id: "activity",
        title: "More activity about you",
        description: "These are notifications for posts on your profile, likes and other reactions to your posts, and more.",
        defaultValue: "all",
        options: [
            { value: "none", label: "Do not notify me" },
            { value: "all", label: "All reminders", hint: "Notify me for all other activity." },
        ],
    },
];

/** Email notifications reached through the settings tab row: a checkbox group above three notify-me radio groups. */
export const Settings19 = () => (
    <SettingsPage>
        <SidebarNavigationSlim activeUrl="/settings" items={navItemsFlat} footerItems={navFooterItemsCompact} />

        <SettingsMain>
            <SettingsTabsRoot selectedTab="notifications">
                <SettingsPageTitle title="Settings" description="Manage your team and preferences here.">
                    <SettingsTabsRow selectedTab="notifications" />
                </SettingsPageTitle>

                <SettingsTabPanel id="notifications">
                    <div className="flex flex-col gap-6">
                        <div className="flex flex-col gap-1">
                            <h2 className="text-primary text-md font-semibold">Email notifications</h2>
                            <p className="text-tertiary text-sm">
                                Get emails to find out what's going on when you're not online. You can turn them off anytime.
                            </p>
                        </div>

                        <div className="flex flex-col gap-4">
                            {emailUpdates.map((item) => (
                                <Checkbox key={item.id} label={item.label} hint={item.hint} defaultSelected={item.defaultSelected} />
                            ))}
                        </div>

                        {radioSections.map((section) => (
                            <div key={section.id} className="border-secondary flex flex-col gap-4 border-t pt-6">
                                <div className="flex flex-col gap-1">
                                    <h3 className="text-primary text-sm font-semibold">{section.title}</h3>
                                    <p className="text-tertiary text-sm">{section.description}</p>
                                </div>

                                <AriaRadioGroup aria-label={section.title} defaultValue={section.defaultValue} className="flex flex-col gap-4">
                                    {section.options.map((option) => (
                                        <RadioButton key={option.value} size="md" value={option.value} label={option.label} hint={option.hint} />
                                    ))}
                                </AriaRadioGroup>
                            </div>
                        ))}
                    </div>
                </SettingsTabPanel>
            </SettingsTabsRoot>
        </SettingsMain>
    </SettingsPage>
);
