"use client";

import { DownloadCloud02, Plus } from "@properui/icons";
import { AVATARS } from "../../../utils/demo-assets";
import { FeaturedCardOnboardingSteps } from "../../application/app-navigation/base-components/featured-cards";
import { SidebarNavigationSimple } from "../../application/app-navigation/sidebar-navigation/sidebar-simple";
import { Table, TableCard } from "../../application/table/table";
import { TablePaginationMinimal } from "../../application/table/table-pagination";
import { Avatar } from "../../base/avatar/avatar";
import { Badge, BadgeWithDot } from "../../base/badges/badges";
import { Button } from "../../base/buttons/button";
import {
    SettingsMain,
    SettingsPage,
    SettingsPageTitle,
    SettingsTabPanel,
    SettingsTabsRoot,
    SettingsTabsRow,
    navFooterItems,
    navItemsNested,
    settingsTabs,
} from "./settings-shared.a";

const noop = () => {};

const tabs = settingsTabs.map((tab) => (tab.id === "team" ? { ...tab, badge: 48 } : tab));

const teamColors = ["blue", "indigo", "purple", "pink", "orange", "success"] as const;

const members = [
    { person: AVATARS[0], status: "active", teams: ["Design", "Product"] },
    { person: AVATARS[1], status: "active", teams: ["Product", "Software Engineering"] },
    { person: AVATARS[3], status: "active", teams: ["Design", "Product", "Software Engineering"] },
    { person: AVATARS[5], status: "active", teams: ["Design", "Finance"] },
    { person: AVATARS[6], status: "active", teams: ["Customer Success", "Operations", "Finance"] },
    { person: AVATARS[7], status: "active", teams: ["Product", "Software Engineering"] },
    { person: AVATARS[2], status: "offline", teams: ["Operations", "Product"] },
    { person: AVATARS[4], status: "offline", teams: ["Operations", "Finance"] },
];

/** Team settings rendered as a full member table with pagination inside a card. */
export const Settings10 = () => (
    <SettingsPage>
        <SidebarNavigationSimple
            activeUrl="/settings"
            items={navItemsNested}
            footerItems={navFooterItems}
            featureCard={
                <FeaturedCardOnboardingSteps
                    title="Complete account"
                    confirmLabel="Continue setup"
                    className="hidden md:flex"
                    steps={[
                        { label: "Complete your profile", isComplete: true },
                        { label: "Verify your phone number", isComplete: true },
                        { label: "Set up 2FA and backups", isComplete: true },
                        { label: "Add payout bank details", isComplete: false },
                    ]}
                    onConfirm={noop}
                />
            }
        />

        <SettingsMain>
            <SettingsTabsRoot selectedTab="team">
                <SettingsPageTitle title="Settings">
                    <SettingsTabsRow items={tabs} selectedTab="team" type="button-border" />
                </SettingsPageTitle>

                <SettingsTabPanel id="team" className="px-0 lg:px-8">
                    <TableCard.Root className="rounded-none ring-0 lg:rounded-xl lg:ring-1">
                        <TableCard.Header
                            title="Team members"
                            badge="48 users"
                            description="Manage your team members and their account permissions here."
                            contentTrailing={
                                <div className="flex gap-3">
                                    <Button color="secondary" size="md" iconLeading={DownloadCloud02}>
                                        Download CSV
                                    </Button>
                                    <Button size="md" iconLeading={Plus}>
                                        Add user
                                    </Button>
                                </div>
                            }
                        />

                        <Table aria-label="Team members" selectionMode="multiple">
                            <Table.Header>
                                <Table.Head id="name" label="Name" isRowHeader allowsSorting className="w-full max-w-1/4" />
                                <Table.Head id="status" label="Status" />
                                <Table.Head id="email" label="Email address" className="md:hidden xl:table-cell" />
                                <Table.Head id="teams" label="Teams" />
                            </Table.Header>

                            <Table.Body items={members}>
                                {(member) => (
                                    <Table.Row id={member.person.username}>
                                        <Table.Cell>
                                            <div className="flex items-center gap-3">
                                                <Avatar src={member.person.src} alt="" size="md" initials={member.person.initials} />
                                                <div className="whitespace-nowrap">
                                                    <p className="text-primary text-sm font-medium">{member.person.name}</p>
                                                    <p className="text-tertiary text-sm">{member.person.username}</p>
                                                </div>
                                            </div>
                                        </Table.Cell>
                                        <Table.Cell>
                                            <BadgeWithDot size="sm" type="modern" color={member.status === "active" ? "success" : "gray"}>
                                                {member.status === "active" ? "Active" : "Offline"}
                                            </BadgeWithDot>
                                        </Table.Cell>
                                        <Table.Cell className="whitespace-nowrap md:hidden xl:table-cell">{member.person.email}</Table.Cell>
                                        <Table.Cell>
                                            <div className="flex gap-1">
                                                {member.teams.map((team, index) => (
                                                    <Badge key={team} color={teamColors[index % teamColors.length]} size="sm">
                                                        {team}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </Table.Cell>
                                    </Table.Row>
                                )}
                            </Table.Body>
                        </Table>

                        <TablePaginationMinimal align="right" page={1} total={6} className="px-4 py-3 md:px-6 md:pt-3 md:pb-4" />
                    </TableCard.Root>
                </SettingsTabPanel>
            </SettingsTabsRoot>
        </SettingsMain>
    </SettingsPage>
);
