"use client";

import { Laptop01 } from "@properui/icons";
import { FeaturedCardMessage } from "@/components/application/app-navigation/base-components/featured-cards";
import { SidebarNavigationSimple } from "@/components/application/app-navigation/sidebar-navigation/sidebar-simple";
import { SectionFooter } from "@/components/application/section-footers/section-footers";
import { SectionHeader } from "@/components/application/section-headers/section-headers";
import { AvatarProfilePhoto } from "@/components/base/avatar/avatar-profile-photo";
import { BadgeWithDot } from "@/components/base/badges/badges";
import { Button } from "@/components/base/buttons/button";
import { Form } from "@/components/base/form/form";
import { Input } from "@/components/base/input/input";
import { AVATARS, IMAGES } from "@/utils/demo-assets";
import {
    SettingsFormRow,
    SettingsMain,
    SettingsPage,
    SettingsRowDivider,
    SettingsTabPanel,
    SettingsTabsRoot,
    SettingsTabsRow,
    hideLabelOnDesktop,
    navFooterItems,
    navItemsNested,
    settingsTabs,
} from "./settings-shared.a";

const account = AVATARS[0];
const author = AVATARS[5];

const noop = () => {};

const tabs = settingsTabs.map((tab) => (tab.id === "team" ? { ...tab, badge: 4 } : tab));

const sessions = [
    { id: "current", device: "2026 MacBook Pro 14-inch", location: "Melbourne, Australia", time: "22 Jan at 10:40am", isActive: true },
    { id: "previous", device: "2026 MacBook Pro 14-inch", location: "Melbourne, Australia", time: "22 Jan at 4:20pm", isActive: false },
];

/** Password settings on a cover-photo page header, with a list of signed-in devices. */
export const Settings05 = () => (
    <SettingsPage>
        <SidebarNavigationSimple
            activeUrl="/settings"
            items={navItemsNested}
            footerItems={navFooterItems}
            featureCard={
                <FeaturedCardMessage
                    author={{ name: author.name, src: author.src }}
                    timestamp="2 mins ago"
                    message="I’ve finished adding my notes. Happy for you to review!"
                    confirmLabel="Reply"
                    className="hidden md:flex"
                    onDismiss={noop}
                    onConfirm={noop}
                />
            }
        />

        <SettingsMain className="pt-0">
            <div className="flex flex-col gap-8 lg:gap-12">
                <header className="relative flex flex-col">
                    <div className="px-1 lg:pt-1">
                        <img src={IMAGES.landscape[2].src} alt="" className="h-40 w-full rounded-xl object-cover lg:h-60" />
                    </div>

                    <div className="mx-auto -mt-12 w-full max-w-(--breakpoint-xl) px-4 lg:-mt-10 lg:px-8">
                        <div className="flex flex-col gap-4 lg:flex-row lg:gap-5">
                            <div className="flex justify-between">
                                <AvatarProfilePhoto size="md" src={account.src} alt={account.name} className="lg:hidden" />
                                <AvatarProfilePhoto size="lg" src={account.src} alt={account.name} className="max-lg:hidden" />
                            </div>

                            <div className="flex w-full flex-col gap-5 lg:pt-16">
                                <div className="flex flex-1 flex-col flex-wrap gap-4 lg:flex-row">
                                    <div className="flex min-w-60 flex-1 flex-col gap-0.5">
                                        <h1 className="text-primary text-xl font-semibold">{account.name}</h1>
                                        <p className="text-md text-tertiary">{account.email}</p>
                                    </div>

                                    <div className="flex flex-col gap-3 lg:flex-row">
                                        <Button color="secondary" size="md">
                                            Share
                                        </Button>
                                        <Button size="md">View profile</Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                <SettingsTabsRoot selectedTab="password">
                    <div className="px-4 lg:px-8">
                        <SettingsTabsRow items={tabs} selectedTab="password" type="underline" />
                    </div>

                    <SettingsTabPanel id="password">
                        <Form className="flex flex-col gap-6">
                            <SectionHeader title="Password" description="Please enter your current password to change your password." />

                            <div className="flex flex-col gap-5">
                                <SettingsFormRow label="Current password">
                                    <Input isRequired type="password" label="Current password" placeholder="••••••••" className={hideLabelOnDesktop} />
                                </SettingsFormRow>

                                <SettingsRowDivider />

                                <SettingsFormRow label="New password">
                                    <Input
                                        isRequired
                                        type="password"
                                        label="New password"
                                        placeholder="••••••••"
                                        hint="Must be at least 8 characters."
                                        className={hideLabelOnDesktop}
                                    />
                                </SettingsFormRow>

                                <SettingsRowDivider />

                                <SettingsFormRow label="Confirm new password">
                                    <Input isRequired type="password" label="Confirm new password" placeholder="••••••••" className={hideLabelOnDesktop} />
                                </SettingsFormRow>
                            </div>

                            <SectionFooter>
                                <Button color="secondary" size="md">
                                    Cancel
                                </Button>
                                <Button type="submit" size="md">
                                    Update password
                                </Button>
                            </SectionFooter>
                        </Form>

                        <section className="flex flex-col gap-6">
                            <SectionHeader
                                title="Where you're logged in"
                                description={
                                    <>
                                        We'll alert you via <span className="font-semibold">{account.email}</span> if there is any unusual activity on your
                                        account.
                                    </>
                                }
                            />

                            <ul className="flex flex-col gap-5">
                                {sessions.map((session) => (
                                    <li key={session.id} className="flex flex-col gap-5">
                                        <div className="flex gap-4 lg:ps-4">
                                            <Laptop01 aria-hidden="true" className="text-fg-quaternary size-10 shrink-0" />
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
                                        </div>
                                        <SettingsRowDivider />
                                    </li>
                                ))}
                            </ul>
                        </section>
                    </SettingsTabPanel>
                </SettingsTabsRoot>
            </div>
        </SettingsMain>
    </SettingsPage>
);
