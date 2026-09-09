"use client";

import { Edit01, Plus, Trash01 } from "@smarteraui/icons";
import { SidebarNavigationSectionsSubheadings } from "@/components/application/app-navigation/sidebar-navigation/sidebar-sections-subheadings";
import { SectionHeader } from "@/components/application/section-headers/section-headers";
import { Table } from "@/components/application/table/table";
import { Avatar } from "@/components/base/avatar/avatar";
import { Button } from "@/components/base/buttons/button";
import { ButtonUtility } from "@/components/base/buttons/button-utility";
import { AVATARS, LOGOS } from "@/utils/demo-assets";
import {
    SettingsBlock,
    SettingsFormRow,
    SettingsMain,
    SettingsPage,
    SettingsPageTitle,
    SettingsRowDivider,
    SettingsStack,
    navItemsWithSubheadings,
} from "./settings-shared.a";

const teams = LOGOS.slice(0, 4).map((logo) => ({
    ...logo,
    domain: `${logo.name.toLowerCase()}.smartera.com`,
}));

const members = AVATARS.slice(0, 5);

/** Team management: the teams you belong to, then the members of the current team. */
export const Settings08 = () => (
    <SettingsPage>
        <SidebarNavigationSectionsSubheadings activeUrl="/settings" items={navItemsWithSubheadings} />

        <SettingsMain>
            <SettingsStack>
                <SettingsPageTitle title="Team management" description="Manage your teams and user permissions." />

                <SettingsBlock>
                    <SectionHeader
                        title="Teams"
                        description="You're on the following teams. You can create a new team here."
                        actions={
                            <>
                                <Button color="secondary" size="sm">
                                    Create new team
                                </Button>
                                <Button size="sm" iconLeading={Plus}>
                                    Add team member
                                </Button>
                            </>
                        }
                    />

                    <div className="flex flex-col gap-5">
                        <SettingsFormRow label="On teams" hint="You're currently on these teams.">
                            <ul className="flex flex-col gap-4">
                                {teams.map((team) => (
                                    <li
                                        key={team.name}
                                        className="bg-primary ring-secondary flex items-center gap-3 rounded-xl p-4 shadow-xs ring-1 ring-inset"
                                    >
                                        <Avatar src={team.src} alt="" size="md" rounded={false} />
                                        <div className="min-w-0 flex-1">
                                            <p className="text-secondary truncate text-sm font-semibold">{team.name}</p>
                                            <p className="text-tertiary truncate text-sm">{team.domain}</p>
                                        </div>
                                        <Button color="link-gray" size="sm">
                                            Leave
                                        </Button>
                                    </li>
                                ))}
                            </ul>
                        </SettingsFormRow>

                        <SettingsRowDivider />

                        <SettingsFormRow label="Your team" hint="Manage your existing team and change roles/permissions.">
                            <div className="bg-primary ring-secondary -mx-4 overflow-hidden rounded-none shadow-none ring-0 lg:mx-0 lg:rounded-xl lg:shadow-xs lg:ring-1">
                                <Table aria-label="Your team" size="sm">
                                    <Table.Header>
                                        <Table.Head id="name" label="Name" isRowHeader className="w-full" />
                                        <Table.Head id="email" label="Email" />
                                        <Table.Head id="actions">
                                            <span className="sr-only">Actions</span>
                                        </Table.Head>
                                    </Table.Header>

                                    <Table.Body items={members}>
                                        {(member) => (
                                            <Table.Row id={member.username}>
                                                <Table.Cell>
                                                    <div className="flex items-center gap-3">
                                                        <Avatar src={member.src} alt="" size="sm" initials={member.initials} />
                                                        <p className="text-primary text-sm font-medium whitespace-nowrap">{member.name}</p>
                                                    </div>
                                                </Table.Cell>
                                                <Table.Cell className="whitespace-nowrap">{member.email}</Table.Cell>
                                                <Table.Cell className="px-3">
                                                    <div className="flex justify-end gap-0.5">
                                                        <ButtonUtility size="xs" color="tertiary" tooltip={`Delete ${member.name}`} icon={Trash01} />
                                                        <ButtonUtility size="xs" color="tertiary" tooltip={`Edit ${member.name}`} icon={Edit01} />
                                                    </div>
                                                </Table.Cell>
                                            </Table.Row>
                                        )}
                                    </Table.Body>
                                </Table>
                            </div>
                        </SettingsFormRow>
                    </div>
                </SettingsBlock>
            </SettingsStack>
        </SettingsMain>
    </SettingsPage>
);
