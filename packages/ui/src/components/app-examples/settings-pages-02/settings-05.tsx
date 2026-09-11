"use client";

import { Fragment } from "react";
import { InfoCircle, Monitor04, Phone01 } from "@properui/icons";
import { avatar } from "../../../utils/demo-assets";
import { SectionHeader } from "../../application/section-headers/section-headers";
import { Tabs } from "../../application/tabs/tabs";
import { BadgeWithDot } from "../../base/badges/badges";
import { DropdownIconSimple } from "../../base/dropdown/dropdown-icon-simple";
import { Form } from "../../base/form/form";
import { Input } from "../../base/input/input";
import { NativeSelect } from "../../base/select/select-native";
import { Divider, FormFooter, SettingsHeaderNav, settingsSectionOptions, settingsSections } from "./settings-shell";

const person = avatar(0);

const sessions = [
    { id: "s1", device: "2026 MacBook Pro 14-inch", type: "laptop", location: "Melbourne, Australia", time: "22 Jan at 10:40am", isActive: true },
    { id: "s2", device: "2026 MacBook Pro 14-inch", type: "laptop", location: "Melbourne, Australia", time: "22 Jan at 4:20pm" },
    { id: "s3", device: "2026 MacBook Pro 14-inch", type: "laptop", location: "Melbourne, Australia", time: "22 Jan at 12:15pm" },
    { id: "s4", device: "2026 iPhone 16 Pro", type: "phone", location: "Melbourne, Australia", time: "22 Jan at 7:30am" },
    { id: "s5", device: "2026 MacBook Pro 14-inch", type: "laptop", location: "Melbourne, Australia", time: "21 Jan at 4:00pm" },
    { id: "s6", device: "2026 MacBook Pro 14-inch", type: "laptop", location: "Melbourne, Australia", time: "21 Jan at 3:20pm" },
    { id: "s7", device: "2026 MacBook Pro 14-inch", type: "laptop", location: "Melbourne, Australia", time: "21 Jan at 11:15am" },
    { id: "s8", device: "2026 iPhone 16 Pro", type: "phone", location: "Melbourne, Australia", time: "21 Jan at 8:30am" },
    { id: "s9", device: "2026 MacBook Pro 14-inch", type: "laptop", location: "Melbourne, Australia", time: "20 Jan at 3:20pm" },
    { id: "s10", device: "2026 MacBook Pro 14-inch", type: "laptop", location: "Melbourne, Australia", time: "20 Jan at 1:10pm" },
];

/** Password settings beside the list of active sessions. */
export const Settings05 = () => (
    <div className="bg-primary">
        <SettingsHeaderNav />

        <main className="bg-primary pt-8 pb-16 lg:pt-12 lg:pb-24">
            {/* The reference layout has no visible page title above the tab rail and form; a hidden
                h1 still gives the page a single top-level heading for assistive tech. */}
            <h1 className="sr-only">Settings</h1>

            <div className="flex flex-col gap-8 lg:gap-12">
                <div className="max-w-container mx-auto flex w-full flex-col gap-8 px-4 lg:flex-row lg:gap-16 lg:px-8">
                    <NativeSelect size="sm" aria-label="Page tabs" defaultValue="password" options={settingsSectionOptions} className="w-full lg:hidden" />

                    <Tabs orientation="vertical" defaultSelectedKey="password" className="hidden w-auto lg:flex">
                        <Tabs.List type="button-gray" items={settingsSections} aria-label="Settings sections">
                            {(item) => <Tabs.Item {...item} badge={item.id === "notifications" ? 2 : undefined} />}
                        </Tabs.List>
                        {settingsSections.map((item) => (
                            <Tabs.Panel key={item.id} id={item.id} />
                        ))}
                    </Tabs>

                    <div className="flex flex-1 flex-col gap-6">
                        <SectionHeader size="sm" title="Password" description="Please enter your current password to change your password." />

                        <Form className="contents">
                            <div className="flex flex-col gap-5">
                                <Input isRequired type="password" label="Current password" name="currentPassword" placeholder="••••••••" />
                                <Input
                                    isRequired
                                    type="password"
                                    label="New password"
                                    name="newPassword"
                                    placeholder="••••••••"
                                    hint={
                                        <span className="flex items-center gap-1">
                                            <InfoCircle aria-hidden="true" className="text-fg-quaternary size-4 stroke-[2.25px]" />
                                            Must be at least 8 characters.
                                        </span>
                                    }
                                />
                                <Input isRequired type="password" label="Confirm new password" name="confirmPassword" placeholder="••••••••" />
                            </div>

                            <FormFooter submitLabel="Update password" />
                        </Form>
                    </div>

                    <div className="flex min-w-0 flex-1 flex-col gap-6 lg:max-w-100">
                        <SectionHeader
                            size="sm"
                            title="Where you're logged in"
                            description={
                                <>
                                    We'll alert you via <span className="font-semibold">{person.email}</span> if there is any unusual activity on your account.
                                </>
                            }
                            actions={<DropdownIconSimple />}
                        />

                        <ul className="flex flex-col gap-5">
                            {sessions.map((session, index) => (
                                <Fragment key={session.id}>
                                    <li className="flex gap-4">
                                        {session.type === "phone" ? (
                                            <Phone01 aria-hidden="true" className="text-fg-quaternary size-6 shrink-0" />
                                        ) : (
                                            <Monitor04 aria-hidden="true" className="text-fg-quaternary size-6 shrink-0" />
                                        )}

                                        <div className="flex flex-col gap-1">
                                            <div className="flex items-center gap-2">
                                                <p className="text-secondary text-sm font-medium">{session.device}</p>
                                                {session.isActive && (
                                                    <BadgeWithDot size="sm" type="modern" color="success">
                                                        Active now
                                                    </BadgeWithDot>
                                                )}
                                            </div>

                                            <p className="text-tertiary text-sm">
                                                {session.location} • {session.time}
                                            </p>
                                        </div>
                                    </li>

                                    {index < sessions.length - 1 && (
                                        <li>
                                            <Divider />
                                        </li>
                                    )}
                                </Fragment>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </main>
    </div>
);
