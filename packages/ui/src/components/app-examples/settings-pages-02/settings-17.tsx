"use client";

import { Fragment } from "react";
import { ButtonGroup, ButtonGroupItem } from "../../base/button-group/button-group";
import { Divider, FieldLabel, PageContainer, SettingsHeaderNav, styles } from "./settings-shell";

const channels = [
    { id: "none", label: "None" },
    { id: "in-app", label: "In-app" },
    { id: "email", label: "Email" },
];

const generalNotifications = [
    { id: "mentioned", label: "I'm mentioned in a message", selected: "email" },
    { id: "replies", label: "Someone replies to any message", selected: "in-app" },
    { id: "assigned", label: "I'm assigned a task", selected: "email" },
    { id: "overdue", label: "A task is overdue", selected: "in-app" },
    { id: "status", label: "A task status is updated", selected: "none" },
];

const summaryNotifications = [
    { id: "daily", label: "Daily summary", selected: "email" },
    { id: "weekly", label: "Weekly summary", selected: "email" },
    { id: "monthly", label: "Monthly summary", selected: "in-app" },
    { id: "quarterly", label: "Quarterly summary", selected: "none" },
];

const NotificationList = ({ items }: { items: { id: string; label: string; selected: string }[] }) => (
    <ul className="flex flex-col gap-4 pb-4">
        {items.map((item, index) => (
            <Fragment key={item.id}>
                <li className="flex flex-col gap-3 lg:flex-row lg:items-center lg:gap-4">
                    <p className="text-secondary flex-1 text-sm font-medium">{item.label}</p>

                    <ButtonGroup size="sm" aria-label={item.label} selectedKeys={[item.selected]}>
                        {channels.map((channel) => (
                            <ButtonGroupItem key={channel.id} id={channel.id}>
                                {channel.label}
                            </ButtonGroupItem>
                        ))}
                    </ButtonGroup>
                </li>

                {index < items.length - 1 && (
                    <li>
                        <Divider />
                    </li>
                )}
            </Fragment>
        ))}
    </ul>
);

/** Notification settings as a matrix of events against delivery channels. */
export const Settings17 = () => (
    <div className="bg-primary">
        <SettingsHeaderNav activeUrl="/settings/notifications" subNav="buttons" />

        <main className="bg-primary pt-8 pb-12 lg:pt-12 lg:pb-24">
            <div className="flex flex-col gap-8">
                <PageContainer className="flex flex-col gap-5">
                    <div className="border-secondary flex flex-col gap-4 border-b pb-4 lg:flex-row">
                        <div className="flex flex-1 flex-col gap-0.5">
                            <h1 className={styles.pageTitle}>Notifications</h1>
                            <p className={styles.pageDescription}>Select when and how you'll be notified.</p>
                        </div>
                    </div>
                </PageContainer>

                <PageContainer className="flex flex-col gap-6">
                    <div className={styles.rowWide}>
                        <FieldLabel title="General notifications" description="Select when you'll be notified when the following changes occur." />
                        <NotificationList items={generalNotifications} />
                    </div>

                    <Divider />

                    <div className={styles.rowWide}>
                        <FieldLabel
                            title="Summary notifications"
                            description="Select when you'll be notified when the following summaries or report are ready."
                        />
                        <NotificationList items={summaryNotifications} />
                    </div>
                </PageContainer>
            </div>
        </main>
    </div>
);
