"use client";

import { ArrowLeft, DotsVertical, Plus } from "@properui/icons";
import { AVATARS } from "../../../utils/demo-assets";
import { SidebarNavigationSlim } from "../../application/app-navigation/sidebar-navigation/sidebar-slim";
import { Breadcrumbs } from "../../application/breadcrumbs/breadcrumbs";
import { Table } from "../../application/table/table";
import { Avatar } from "../../base/avatar/avatar";
import { Button } from "../../base/buttons/button";
import { ButtonUtility } from "../../base/buttons/button-utility";
import { SettingsFormRow, SettingsMain, SettingsPage, SettingsRowDivider, navFooterItemsCompact, navItemsFlat } from "./settings-shared.a";

const adminUsers = AVATARS.slice(0, 5).map((person, index) => ({
    ...person,
    addedOn: "Feb 22, 2026",
    lastActive: index % 2 === 0 ? "Mar 14, 2026" : "Mar 12, 2026",
}));

const accountUsers = AVATARS.slice(5, 10).map((person, index) => ({
    ...person,
    addedOn: "Feb 22, 2026",
    lastActive: index % 2 === 0 ? "Mar 14, 2026" : "Mar 12, 2026",
}));

const UserTable = ({ label, items }: { label: string; items: typeof adminUsers }) => (
    <div className="bg-primary ring-secondary -mx-4 overflow-hidden rounded-none shadow-none ring-0 lg:mx-0 lg:rounded-xl lg:shadow-xs lg:ring-1">
        <Table aria-label={label} size="sm" selectionMode="multiple">
            <Table.Header>
                <Table.Head id="name" label="Name" isRowHeader className="w-full" />
                <Table.Head id="added" label="Date added" />
                <Table.Head id="active" label="Last active" />
                <Table.Head id="actions">
                    <span className="sr-only">Actions</span>
                </Table.Head>
            </Table.Header>

            <Table.Body items={items}>
                {(user) => (
                    <Table.Row id={user.username}>
                        <Table.Cell>
                            <div className="flex items-center gap-3">
                                <Avatar src={user.src} alt="" size="md" initials={user.initials} />
                                <div className="whitespace-nowrap">
                                    <p className="text-primary text-sm font-medium">{user.name}</p>
                                    <p className="text-tertiary text-sm">{user.email}</p>
                                </div>
                            </div>
                        </Table.Cell>
                        <Table.Cell className="whitespace-nowrap">{user.addedOn}</Table.Cell>
                        <Table.Cell className="whitespace-nowrap">{user.lastActive}</Table.Cell>
                        <Table.Cell className="px-3">
                            <div className="flex justify-end">
                                <ButtonUtility size="xs" color="tertiary" tooltip={`More options for ${user.name}`} icon={DotsVertical} />
                            </div>
                        </Table.Cell>
                    </Table.Row>
                )}
            </Table.Body>
        </Table>
    </div>
);

/** Team members split into admin users and account users, each with its own table. */
export const Settings09 = () => (
    <SettingsPage>
        <SidebarNavigationSlim activeUrl="/settings" items={navItemsFlat} footerItems={navFooterItemsCompact} />

        <SettingsMain>
            <div className="flex flex-col gap-8 lg:gap-6">
                <div className="flex flex-col gap-4 px-4 lg:gap-5 lg:px-8">
                    <Breadcrumbs aria-label="Breadcrumb">
                        <Breadcrumbs.Item href="/settings">Settings</Breadcrumbs.Item>
                        <Breadcrumbs.Item labelClassName="text-primary group-hover:text-primary">Team</Breadcrumbs.Item>
                    </Breadcrumbs>

                    <div className="flex lg:hidden">
                        <Button color="link-gray" size="md" href="/settings" iconLeading={ArrowLeft}>
                            Back
                        </Button>
                    </div>

                    <div className="border-secondary flex flex-col gap-4 border-b pb-4 lg:flex-row lg:items-start">
                        <div className="flex flex-1 flex-col gap-0.5">
                            <h1 className="text-primary text-xl font-semibold">Team members</h1>
                            <p className="text-md text-tertiary">Manage your team members and their account permissions here.</p>
                        </div>
                        <Button size="md" iconLeading={Plus}>
                            Add team member
                        </Button>
                    </div>
                </div>

                <div className="flex flex-col gap-8 px-4 lg:gap-6 lg:px-8">
                    <SettingsFormRow
                        label="Admin users"
                        hint="Admins can add and remove users and manage organization-level settings."
                        headingLevel="h2"
                        showLabelOnMobile
                    >
                        <UserTable label="Admin users" items={adminUsers} />
                    </SettingsFormRow>

                    <SettingsRowDivider />

                    <SettingsFormRow
                        label="Account users"
                        hint="Account users can assess and review risks, questionnaires, data leaks and identify breaches."
                        headingLevel="h2"
                        showLabelOnMobile
                    >
                        <UserTable label="Account users" items={accountUsers} />
                    </SettingsFormRow>
                </div>
            </div>
        </SettingsMain>
    </SettingsPage>
);
