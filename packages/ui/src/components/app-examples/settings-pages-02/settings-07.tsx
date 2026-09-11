"use client";

import { Mail01, Plus } from "@properui/icons";
import { AVATARS } from "../../../utils/demo-assets";
import { Table, TableCard } from "../../application/table/table";
import { Avatar } from "../../base/avatar/avatar";
import { Button } from "../../base/buttons/button";
import { Form } from "../../base/form/form";
import { InputBase } from "../../base/input/input";
import { Select } from "../../base/select/select";
import { Divider, FieldLabel, PageContainer, SettingsHeaderNav, styles } from "./settings-shell";

const accessOptions = [
    { id: "read-only", label: "Read only" },
    { id: "write", label: "Write" },
];

const inviteRows = [1, 2, 3];

const members = AVATARS.slice(0, 5).map((person, index) => ({
    id: person.email,
    name: person.name,
    email: person.email,
    initials: person.initials,
    src: index === 4 ? undefined : person.src,
    role: index < 2 ? "Admin" : "Read-only",
}));

/** Team management: an invite form above the current team members table. */
export const Settings07 = () => (
    <div className="bg-primary">
        <SettingsHeaderNav activeUrl="/settings/team" subNav="buttons" />

        <main className="bg-primary pt-8 pb-16 lg:pt-12 lg:pb-24">
            <div className="flex flex-col gap-8">
                <PageContainer>
                    <div className="border-secondary flex flex-col gap-4 border-b pb-4 lg:flex-row">
                        <div className="flex flex-1 flex-col gap-0.5">
                            <h1 className={styles.pageTitle}>Team management</h1>
                            <p className={styles.pageDescription}>Manage your team members and their account permissions here.</p>
                        </div>
                    </div>
                </PageContainer>

                <div className="max-w-container mx-auto flex w-full flex-col gap-8 px-4 lg:gap-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(200px,280px)_minmax(0,560px)] lg:gap-16">
                        <FieldLabel
                            title="Invite team members"
                            tooltip="Invites expire after seven days."
                            description="Get your projects up and running faster by inviting your team to collaborate."
                        />

                        <Form className="flex w-full flex-col gap-4">
                            {inviteRows.map((row) => (
                                <div key={row} className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_minmax(160px,max-content)]">
                                    <InputBase
                                        type="email"
                                        icon={Mail01}
                                        name={`email-${row}`}
                                        aria-label={`Email address ${row}`}
                                        placeholder="you@example.com"
                                    />

                                    <Select
                                        name={`access-${row}`}
                                        aria-label={`Access ${row}`}
                                        items={accessOptions}
                                        defaultSelectedKey="read-only"
                                        placeholder="Select access"
                                    >
                                        {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                                    </Select>
                                </div>
                            ))}

                            <div className="flex items-center gap-5">
                                <Button color="link-gray" size="md" iconLeading={Plus}>
                                    Add another
                                </Button>

                                <div className="flex flex-1 justify-end gap-3">
                                    <Button size="sm" type="submit">
                                        Send invites
                                    </Button>
                                </div>
                            </div>
                        </Form>
                    </div>

                    <Divider className="hidden lg:block" />

                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(200px,280px)_1fr] lg:gap-16">
                        <FieldLabel title="Team members" description="Manage your existing team and change roles/permissions." />

                        <TableCard.Root className="-mx-4 rounded-none lg:mx-0 lg:rounded-xl">
                            <Table aria-label="Team members" selectionMode="multiple">
                                <Table.Header>
                                    <Table.Head id="name" label="Name" isRowHeader className="w-full" />
                                    <Table.Head id="role" label="Role" />
                                    <Table.Head id="actions">
                                        <span className="sr-only">Actions</span>
                                    </Table.Head>
                                </Table.Header>

                                <Table.Body items={members}>
                                    {(member) => (
                                        <Table.Row id={member.id}>
                                            <Table.Cell>
                                                <div className="flex w-max items-center gap-3">
                                                    <Avatar size="md" src={member.src} initials={member.initials} alt="" />
                                                    <div>
                                                        <p className="text-primary text-sm font-medium">{member.name}</p>
                                                        <p className="text-tertiary text-sm">{member.email}</p>
                                                    </div>
                                                </div>
                                            </Table.Cell>

                                            <Table.Cell className="whitespace-nowrap">{member.role}</Table.Cell>

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
        </main>
    </div>
);
