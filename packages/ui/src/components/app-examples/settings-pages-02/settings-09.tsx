"use client";

import { ArrowLeft, Edit01, HomeLine, Plus, Trash01 } from "@properui/icons";
import { Breadcrumbs } from "@/components/application/breadcrumbs/breadcrumbs";
import { Table, TableCard } from "@/components/application/table/table";
import { Avatar } from "@/components/base/avatar/avatar";
import { ButtonGroup, ButtonGroupItem } from "@/components/base/button-group/button-group";
import { Button } from "@/components/base/buttons/button";
import { ButtonUtility } from "@/components/base/buttons/button-utility";
import { NativeSelect } from "@/components/base/select/select-native";
import type { DemoAvatar } from "@/utils/demo-assets";
import { AVATARS } from "@/utils/demo-assets";
import { Divider, FieldLabel, PageContainer, PageTitle, SettingsHeaderNav } from "./settings-shell";

const sections = [
    { id: "details", label: "My details" },
    { id: "profile", label: "Profile" },
    { id: "password", label: "Password" },
    { id: "team", label: "Team" },
    { id: "plan", label: "Plan" },
    { id: "billing", label: "Billing" },
    { id: "notifications", label: "Notifications" },
    { id: "integrations", label: "Integrations" },
    { id: "api", label: "API" },
];

const lastActiveDates = ["Mar 14, 2026", "Mar 12, 2026", "Mar 12, 2026", "Mar 14, 2026", "Mar 13, 2026"];

interface User {
    id: string;
    name: string;
    email: string;
    initials: string;
    src?: string;
    dateAdded: string;
    lastActive: string;
}

const toUsers = (people: readonly DemoAvatar[]): User[] =>
    people.map((person, index) => ({
        id: person.email,
        name: person.name,
        email: person.email,
        initials: person.initials,
        // The last row falls back to initials, mirroring an account with no photo.
        src: index === 4 ? undefined : person.src,
        dateAdded: "Feb 22, 2026",
        lastActive: lastActiveDates[index] ?? "Mar 14, 2026",
    }));

const adminUsers = toUsers(AVATARS.slice(0, 5));
const accountUsers = toUsers(AVATARS.slice(5, 10));

const UsersTable = ({ label, items }: { label: string; items: User[] }) => (
    <TableCard.Root className="-mx-4 rounded-none lg:mx-0 lg:rounded-xl">
        <Table aria-label={label} selectionMode="multiple" defaultSelectedKeys="all">
            <Table.Header>
                <Table.Head id="name" label="Name" isRowHeader className="w-full" />
                <Table.Head id="dateAdded" label="Date added" />
                <Table.Head id="lastActive" label="Last active" />
                <Table.Head id="actions">
                    <span className="sr-only">Actions</span>
                </Table.Head>
            </Table.Header>

            <Table.Body items={items}>
                {(user) => (
                    <Table.Row id={user.id} highlightSelectedRow={false} className="even:bg-secondary">
                        <Table.Cell>
                            <div className="flex w-max items-center gap-3">
                                <Avatar size="md" src={user.src} initials={user.initials} alt="" />
                                <div>
                                    <p className="text-primary text-sm font-medium">{user.name}</p>
                                    <p className="text-tertiary text-sm">{user.email}</p>
                                </div>
                            </div>
                        </Table.Cell>

                        <Table.Cell className="whitespace-nowrap">{user.dateAdded}</Table.Cell>
                        <Table.Cell className="whitespace-nowrap">{user.lastActive}</Table.Cell>

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
    </TableCard.Root>
);

/** Team members split into admin and account roles, switched with a button group. */
export const Settings09 = () => (
    <div className="bg-primary">
        <SettingsHeaderNav showUpgrade={false} />

        <main className="bg-primary pt-8 pb-16 lg:pt-12 lg:pb-24">
            <div className="flex flex-col gap-8">
                <PageContainer className="flex flex-col gap-5">
                    <div className="flex flex-col gap-4">
                        <div className="max-lg:hidden">
                            <Breadcrumbs type="button" aria-label="Breadcrumbs">
                                <Breadcrumbs.Item href="#" icon={HomeLine} aria-label="Home" />
                                <Breadcrumbs.Item href="#">Settings</Breadcrumbs.Item>
                                <Breadcrumbs.Item href="#">Team</Breadcrumbs.Item>
                            </Breadcrumbs>
                        </div>

                        <div className="flex lg:hidden">
                            <Button color="link-gray" size="sm" href="#" iconLeading={ArrowLeft}>
                                Back
                            </Button>
                        </div>

                        <PageTitle
                            title="Team members"
                            description="Manage your team members and their account permissions here."
                            actions={
                                <Button size="sm" color="secondary" iconLeading={Plus}>
                                    Add team member
                                </Button>
                            }
                        />
                    </div>

                    <NativeSelect
                        size="sm"
                        aria-label="Page tabs"
                        defaultValue="team"
                        options={sections.map((section) => ({ label: section.label, value: section.id }))}
                        className="w-full md:hidden"
                    />

                    <ButtonGroup size="sm" selectedKeys={["team"]} aria-label="Settings sections" className="hidden md:inline-flex">
                        {sections.map((section) => (
                            <ButtonGroupItem key={section.id} id={section.id}>
                                {section.label}
                            </ButtonGroupItem>
                        ))}
                    </ButtonGroup>

                    <Divider />
                </PageContainer>

                <PageContainer>
                    <div className="flex flex-col gap-8 lg:gap-5">
                        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(200px,280px)_1fr]">
                            <FieldLabel title="Admin users" description="Admins can add and remove users and manage organization-level settings." />
                            <UsersTable label="Admin users" items={adminUsers} />
                        </div>

                        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(200px,280px)_1fr]">
                            <FieldLabel
                                title="Account users"
                                description="Account users can assess and review risks, questionnaires, data leaks and identify breaches."
                            />
                            <UsersTable label="Account users" items={accountUsers} />
                        </div>
                    </div>
                </PageContainer>
            </div>
        </main>
    </div>
);
