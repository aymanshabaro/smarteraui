"use client";

import { Fragment } from "react";
import { Plus } from "@smarteraui/icons";
import { SectionHeader } from "@/components/application/section-headers/section-headers";
import { Table, TableCard } from "@/components/application/table/table";
import { Avatar } from "@/components/base/avatar/avatar";
import { Button } from "@/components/base/buttons/button";
import { AVATARS, LOGOS } from "@/utils/demo-assets";
import { Divider, FieldLabel, PageContainer, SettingsHeaderNav } from "./settings-shell";

const teams = LOGOS.slice(0, 3).map((logo) => ({
    id: logo.name,
    name: logo.name,
    domain: `${logo.name.toLowerCase()}.com`,
    src: logo.src,
}));

const members = AVATARS.slice(0, 5).map((person, index) => ({
    id: person.email,
    name: person.name,
    email: person.email,
    initials: person.initials,
    src: index === 4 ? undefined : person.src,
}));

/** Team settings: the teams you belong to, then the members of your own team. */
export const Settings08 = () => (
    <div className="bg-primary">
        <SettingsHeaderNav activeUrl="/settings/team" subNav="tabs" />

        <main className="bg-primary pt-8 pb-16 lg:pt-12 lg:pb-24">
            {/* The reference layout has no visible page title above the section cards; a hidden
                h1 still gives the page a single top-level heading for assistive tech. */}
            <h1 className="sr-only">Settings</h1>

            <div className="flex flex-col gap-8">
                <PageContainer>
                    <div className="mx-auto flex w-full max-w-160 flex-col gap-8 lg:gap-6">
                        <SectionHeader
                            size="sm"
                            title="Teams"
                            description="You're on the following teams. You can create a new team here."
                            actions={
                                <Button size="sm" color="secondary" iconLeading={Plus}>
                                    Add team
                                </Button>
                            }
                        />

                        <div className="flex flex-col gap-8 lg:gap-6">
                            <div className="flex flex-col gap-5">
                                <FieldLabel title="On teams" description="You're currently on these teams." />

                                <ul className="border-secondary flex flex-col gap-3 border-y py-4">
                                    {teams.map((team, index) => (
                                        <Fragment key={team.id}>
                                            <li className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <Avatar size="md" src={team.src} alt="" />
                                                    <div>
                                                        <p className="text-primary text-sm font-semibold">{team.name}</p>
                                                        <p className="text-tertiary text-sm">{team.domain}</p>
                                                    </div>
                                                </div>

                                                <Button color="link-gray" size="md">
                                                    Leave
                                                </Button>
                                            </li>

                                            {index < teams.length - 1 && (
                                                <li>
                                                    <Divider />
                                                </li>
                                            )}
                                        </Fragment>
                                    ))}
                                </ul>
                            </div>

                            <div className="flex flex-col gap-6 lg:gap-5">
                                <FieldLabel title="Your team" description="Manage your existing team and change roles/permissions." />

                                <TableCard.Root className="-mx-4 rounded-none lg:mx-0 lg:rounded-xl">
                                    <Table aria-label="Team members">
                                        <Table.Header>
                                            <Table.Head id="name" label="Name" isRowHeader className="w-full" />
                                            <Table.Head id="email" label="Email" />
                                            <Table.Head id="actions">
                                                <span className="sr-only">Actions</span>
                                            </Table.Head>
                                        </Table.Header>

                                        <Table.Body items={members}>
                                            {(member) => (
                                                <Table.Row id={member.id}>
                                                    <Table.Cell className="max-md:pl-4">
                                                        <div className="flex w-max items-center gap-3">
                                                            <Avatar size="md" src={member.src} initials={member.initials} alt="" />
                                                            <p className="text-primary text-sm font-medium whitespace-nowrap lg:whitespace-normal">
                                                                {member.name}
                                                            </p>
                                                        </div>
                                                    </Table.Cell>

                                                    <Table.Cell>{member.email}</Table.Cell>

                                                    <Table.Cell>
                                                        <div className="flex gap-3">
                                                            <Button color="link-gray" size="md">
                                                                Delete
                                                            </Button>
                                                            <Button color="link-color" size="md">
                                                                Edit
                                                            </Button>
                                                        </div>
                                                    </Table.Cell>
                                                </Table.Row>
                                            )}
                                        </Table.Body>
                                    </Table>
                                </TableCard.Root>
                            </div>
                        </div>
                    </div>
                </PageContainer>
            </div>
        </main>
    </div>
);
