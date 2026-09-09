"use client";

import type { ReactNode } from "react";
import { SidebarNavigationSimple } from "@/components/application/app-navigation/sidebar-navigation/sidebar-simple";
import { ButtonGroup, ButtonGroupItem } from "@/components/base/button-group/button-group";
import { cx } from "@/utils/cx";
import {
    SettingsBlock,
    SettingsMain,
    SettingsPage,
    SettingsPageTitle,
    SettingsRowDivider,
    SettingsStack,
    navFooterItems,
    navItemsNested,
} from "./settings-shared.a";

interface NotificationRow {
    id: string;
    label: string;
    /** The channel that starts selected: `none`, `in-app` or the row's third option. */
    defaultChannel: string;
}

const generalRows: NotificationRow[] = [
    { id: "mentioned", label: "I'm mentioned in a message", defaultChannel: "email" },
    { id: "replied", label: "Someone replies to any message", defaultChannel: "email" },
    { id: "assigned", label: "I'm assigned a task", defaultChannel: "email" },
    { id: "overdue", label: "A task is overdue", defaultChannel: "in-app" },
];

const summaryRows: NotificationRow[] = [
    { id: "daily", label: "Daily summary", defaultChannel: "none" },
    { id: "weekly", label: "Weekly summary", defaultChannel: "email" },
    { id: "monthly", label: "Monthly summary", defaultChannel: "email" },
    { id: "quarterly", label: "Quarterly summary", defaultChannel: "none" },
];

/** One notification row: the event on the start side, a 3-way channel toggle on the end. */
const NotificationChannelRow = ({
    label,
    defaultChannel,
    thirdOption,
}: {
    label: ReactNode;
    defaultChannel: string;
    thirdOption: { id: string; label: string };
}) => (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-secondary text-sm font-medium">{label}</p>

        <ButtonGroup
            size="sm"
            aria-label={`Notification channel for ${typeof label === "string" ? label.toLowerCase() : "this event"}`}
            defaultSelectedKeys={[defaultChannel]}
        >
            <ButtonGroupItem id="none">None</ButtonGroupItem>
            <ButtonGroupItem id="in-app">In-app</ButtonGroupItem>
            <ButtonGroupItem id={thirdOption.id}>{thirdOption.label}</ButtonGroupItem>
        </ButtonGroup>
    </div>
);

/** A standalone notifications page reached directly from the app sidebar, outside the tabbed settings shell. */
export const Settings17 = () => (
    <SettingsPage>
        <SidebarNavigationSimple activeUrl="/notifications" items={navItemsNested} footerItems={navFooterItems} />

        <SettingsMain>
            <SettingsStack>
                <SettingsPageTitle title="Notifications" description="Select when and how you'll be notified." />

                <SettingsBlock>
                    <div className="flex flex-col gap-1">
                        <h2 className="text-primary text-md font-semibold">General notifications</h2>
                        <p className="text-tertiary text-sm">Select when you'll be notified when the following changes occur.</p>
                    </div>

                    <div className="flex flex-col gap-4">
                        {generalRows.map((row, index) => (
                            <div key={row.id} className={cx("flex flex-col gap-4", index > 0 && "pt-4")}>
                                {index > 0 && <SettingsRowDivider />}
                                <NotificationChannelRow label={row.label} defaultChannel={row.defaultChannel} thirdOption={{ id: "email", label: "Email" }} />
                            </div>
                        ))}

                        <SettingsRowDivider />
                        <NotificationChannelRow label="A task status is updated" defaultChannel="in-app" thirdOption={{ id: "text", label: "Text" }} />
                    </div>
                </SettingsBlock>

                <SettingsBlock>
                    <div className="flex flex-col gap-1">
                        <h2 className="text-primary text-md font-semibold">Summary notifications</h2>
                        <p className="text-tertiary text-sm">Select when you'll be notified when the following summaries or report are ready.</p>
                    </div>

                    <div className="flex flex-col gap-4">
                        {summaryRows.map((row, index) => (
                            <div key={row.id} className={cx("flex flex-col gap-4", index > 0 && "pt-4")}>
                                {index > 0 && <SettingsRowDivider />}
                                <NotificationChannelRow label={row.label} defaultChannel={row.defaultChannel} thirdOption={{ id: "email", label: "Email" }} />
                            </div>
                        ))}
                    </div>
                </SettingsBlock>
            </SettingsStack>
        </SettingsMain>
    </SettingsPage>
);
