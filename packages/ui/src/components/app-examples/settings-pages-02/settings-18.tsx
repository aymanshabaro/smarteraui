"use client";

import { Fragment } from "react";
import { Mail01 } from "@properui/icons";
import { SectionHeader } from "../../application/section-headers/section-headers";
import { Tabs } from "../../application/tabs/tabs";
import { Button } from "../../base/buttons/button";
import { Form } from "../../base/form/form";
import { Input } from "../../base/input/input";
import { NativeSelect } from "../../base/select/select-native";
import { Toggle } from "../../base/toggle/toggle";
import { Divider, FieldLabel, PageContainer, SettingsHeaderNav, settingsSectionOptions, settingsSections, styles } from "./settings-shell";

const groups = [
    {
        id: "comments",
        title: "Comments",
        description: "These are notifications for comments on your posts and replies to your comments.",
        channels: { push: true, email: true, sms: false },
    },
    {
        id: "tags",
        title: "Tags",
        description: "These are notifications for when someone tags you in a comment, post or story.",
        channels: { push: true, email: false, sms: false },
    },
    {
        id: "reminders",
        title: "Reminders",
        description: "These are notifications to remind you of updates you might have missed.",
        channels: { push: true, email: true, sms: false },
    },
    {
        id: "activity",
        title: "More activity about you",
        description: "These are notifications for posts on your profile, likes and other reactions to your posts, and more.",
        channels: { push: false, email: false, sms: false },
    },
];

const rowStyles = "grid grid-cols-1 gap-5 lg:grid-cols-[minmax(200px,280px)_minmax(0,512px)] lg:gap-16";

/** Notification settings as per-channel toggles, with a product update card underneath. */
export const Settings18 = () => (
    <div className="bg-primary">
        <SettingsHeaderNav showUpgrade={false} />

        <main className="bg-primary pt-8 pb-12 lg:pt-12 lg:pb-24">
            <div className="flex flex-col gap-8">
                <PageContainer className="flex flex-col gap-5">
                    <div className="lg:border-secondary flex flex-col gap-4 lg:flex-row lg:border-b lg:pb-4">
                        <div className="flex flex-1 flex-col gap-0.5">
                            <h1 className={styles.pageTitle}>Settings</h1>
                        </div>
                    </div>

                    <NativeSelect size="sm" aria-label="Page tabs" defaultValue="notifications" options={settingsSectionOptions} className="w-full lg:hidden" />
                </PageContainer>

                <div className="max-w-container mx-auto flex w-full gap-16 px-4 lg:px-8">
                    <Tabs orientation="vertical" defaultSelectedKey="notifications" className="hidden w-auto lg:flex">
                        <Tabs.List type="line" items={settingsSections} aria-label="Settings sections">
                            {(item) => <Tabs.Item {...item} />}
                        </Tabs.List>
                        {settingsSections.map((item) => (
                            <Tabs.Panel key={item.id} id={item.id} />
                        ))}
                    </Tabs>

                    <div className="lg:bg-secondary flex flex-1 flex-col gap-6 lg:rounded-2xl lg:p-8">
                        <SectionHeader
                            size="sm"
                            title="Notification settings"
                            description="We may still send you important notifications about your account outside of your notification settings."
                        />

                        <div className="flex flex-col gap-5">
                            {groups.map((group, index) => (
                                <Fragment key={group.id}>
                                    <div className={rowStyles}>
                                        <FieldLabel title={group.title} description={group.description} />

                                        <div className="flex w-max flex-col gap-4">
                                            <Toggle size="sm" label="Push" defaultSelected={group.channels.push} />
                                            <Toggle size="sm" label="Email" defaultSelected={group.channels.email} />
                                            <Toggle size="sm" label="SMS" defaultSelected={group.channels.sms} />
                                        </div>
                                    </div>

                                    {index < groups.length - 1 && <Divider />}
                                </Fragment>
                            ))}
                        </div>

                        <div className="mt-2 w-full lg:mt-0">
                            <div className="bg-primary ring-secondary w-full flex-1 rounded-xl px-4 py-5 shadow-xs ring-1 ring-inset sm:p-6">
                                <div className="flex flex-col">
                                    <h3 className="text-primary text-md font-semibold">We've just released a new update!</h3>
                                    <p className="text-tertiary mt-0.5 text-sm">Check out the all new dashboard view. Pages and now load faster.</p>

                                    <Form className="mt-5 flex flex-col gap-3 sm:w-full sm:max-w-100 sm:flex-row sm:items-end sm:gap-4">
                                        <div className="flex-1">
                                            <Input type="email" name="email" icon={Mail01} label="Subscribe to updates" placeholder="you@proper.example" />
                                        </div>

                                        <Button size="md" type="submit">
                                            Subscribe
                                        </Button>
                                    </Form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>
);
