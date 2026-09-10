"use client";

import { DownloadCloud02, Edit01, Plus, Trash01 } from "@properui/icons";
import { Table, TableCard } from "@/components/application/table/table";
import { TablePaginationNumbered } from "@/components/application/table/table-pagination";
import { Tabs } from "@/components/application/tabs/tabs";
import { Avatar } from "@/components/base/avatar/avatar";
import type { BadgeColors } from "@/components/base/badges/badge-types";
import { Badge, BadgeWithDot } from "@/components/base/badges/badges";
import { Button } from "@/components/base/buttons/button";
import { ButtonUtility } from "@/components/base/buttons/button-utility";
import { NativeSelect } from "@/components/base/select/select-native";
import { AVATARS } from "@/utils/demo-assets";
import { PageContainer, SettingsHeaderNav, settingsSectionOptions, settingsSections, styles } from "./settings-shell";

interface Team {
    name: string;
    color: BadgeColors;
}

const design: Team = { name: "Design", color: "purple" };
const product: Team = { name: "Product", color: "sky" };
const engineering: Team = { name: "Software Engineering", color: "indigo" };
const success: Team = { name: "Customer Success", color: "success" };
const operations: Team = { name: "Operations", color: "warning" };
const finance: Team = { name: "Finance", color: "orange" };

const memberTeams: Team[][] = [
    [design, product],
    [product, engineering],
    [design, product, engineering],
    [design, finance],
    [success, operations, finance],
    [product, engineering],
    [operations, product],
    [operations, finance],
];

const members = AVATARS.slice(0, 8).map((person, index) => ({
    id: person.email,
    name: person.name,
    username: person.username,
    email: person.email,
    initials: person.initials,
    // The last two rows are offline, and one of them has no photo.
    src: index === 7 ? undefined : person.src,
    status: index < 6 ? ("active" as const) : ("offline" as const),
    teams: memberTeams[index] ?? [],
}));

/** A 48-user team members table under a full-width underline tab row. */
export const Settings10 = () => (
    <div className="bg-primary">
        <SettingsHeaderNav activeUrl="/settings/team" subNav="buttons" />

        <main className="bg-primary pt-8 pb-12 lg:pt-12 lg:pb-24">
            <div className="flex flex-col gap-8">
                <PageContainer className="flex flex-col gap-5">
                    <div className="flex flex-col gap-4 lg:flex-row">
                        <div className="flex flex-1 flex-col gap-0.5">
                            <h1 className={styles.pageTitle}>Settings</h1>
                        </div>
                    </div>

                    <NativeSelect size="sm" aria-label="Page tabs" defaultValue="team" options={settingsSectionOptions} className="w-full md:hidden" />

                    <Tabs defaultSelectedKey="team" className="hidden w-full md:flex">
                        <Tabs.List type="underline" items={settingsSections} aria-label="Settings sections" className="w-full">
                            {(item) => <Tabs.Item {...item} badge={item.id === "team" ? 48 : item.id === "notifications" ? 2 : undefined} />}
                        </Tabs.List>
                        {settingsSections.map((item) => (
                            <Tabs.Panel key={item.id} id={item.id} />
                        ))}
                    </Tabs>
                </PageContainer>

                <div className="max-w-container border-secondary mx-auto w-full border-t lg:border-none lg:px-8">
                    <TableCard.Root className="lg:bg-primary rounded-none bg-transparent shadow-none ring-0 lg:rounded-xl lg:shadow-xs lg:ring-1">
                        <TableCard.Header
                            title="Team members"
                            badge="48 users"
                            description="Manage your team members and their account permissions here."
                            contentTrailing={
                                <div className="flex gap-3">
                                    <Button size="sm" color="secondary" iconLeading={DownloadCloud02}>
                                        Download CSV
                                    </Button>
                                    <Button size="md" iconLeading={Plus}>
                                        Add user
                                    </Button>
                                </div>
                            }
                        />

                        <Table aria-label="Team members" selectionMode="multiple" className="lg:bg-primary">
                            <Table.Header className="bg-primary">
                                <Table.Head id="name" label="Name" isRowHeader className="w-full" />
                                <Table.Head id="status" label="Status" />
                                <Table.Head id="email" label="Email address" />
                                <Table.Head id="teams" label="Teams" />
                                <Table.Head id="actions">
                                    <span className="sr-only">Actions</span>
                                </Table.Head>
                            </Table.Header>

                            <Table.Body items={members}>
                                {(member) => (
                                    <Table.Row id={member.id} className="odd:bg-secondary">
                                        <Table.Cell>
                                            <div className="flex w-max items-center gap-3">
                                                <Avatar size="md" src={member.src} initials={member.initials} alt="" />
                                                <div>
                                                    <p className="text-primary text-sm font-medium">{member.name}</p>
                                                    <p className="text-tertiary text-sm">{member.username}</p>
                                                </div>
                                            </div>
                                        </Table.Cell>

                                        <Table.Cell>
                                            <BadgeWithDot size="sm" type="modern" color={member.status === "active" ? "success" : "gray"}>
                                                {member.status === "active" ? "Active" : "Offline"}
                                            </BadgeWithDot>
                                        </Table.Cell>

                                        <Table.Cell className="whitespace-nowrap">{member.email}</Table.Cell>

                                        <Table.Cell>
                                            <div className="flex gap-1">
                                                {member.teams.map((team) => (
                                                    <Badge key={team.name} type="color" size="sm" color={team.color}>
                                                        {team.name}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </Table.Cell>

                                        <Table.Cell className="px-4">
                                            <div className="flex justify-end gap-0.5">
                                                <ButtonUtility size="xs" color="tertiary" tooltip="Delete" icon={Trash01} />
                                                <ButtonUtility size="xs" color="tertiary" tooltip="Edit" icon={Edit01} />
                                            </div>
                                        </Table.Cell>
                                    </Table.Row>
                                )}
                            </Table.Body>
                        </Table>

                        <TablePaginationNumbered page={1} total={6} className="px-4 py-3 md:px-6 md:pt-3 md:pb-4" />
                    </TableCard.Root>
                </div>
            </div>
        </main>
    </div>
);
