"use client";

import { ArrowLeft, Edit01, Plus, Trash01 } from "@properui/icons";
import { AVATARS, IMAGES, LOGOS } from "../../../utils/demo-assets";
import { SidebarNavigationSlim } from "../../application/app-navigation/sidebar-navigation/sidebar-slim";
import { Breadcrumbs, type BreadcrumbsMenuItem } from "../../application/breadcrumbs/breadcrumbs";
import { Table } from "../../application/table/table";
import { Avatar } from "../../base/avatar/avatar";
import { Button } from "../../base/buttons/button";
import { ButtonUtility } from "../../base/buttons/button-utility";
import { Form } from "../../base/form/form";
import { InputBase } from "../../base/input/input";
import { InputGroup } from "../../base/input/input-group";
import { NativeSelect } from "../../base/select/select-native";
import { SettingsFormRow, SettingsMain, SettingsPage, SettingsRowDivider, navFooterItemsCompact, navItemsFlat } from "./settings-shared.a";

const currentUser = AVATARS[10];

const accountItems: BreadcrumbsMenuItem[] = [
    { id: "profile", label: "View profile", href: "/profile" },
    { id: "account-settings", label: "Account settings", href: "/settings" },
    { id: "switch-account", label: "Switch account", href: "/accounts" },
];

const roleOptions = [
    { label: "Read only", value: "read" },
    { label: "Write", value: "write" },
];

const invites = ["first", "second", "third"];

const members = [
    { ...AVATARS[0], role: "Admin" },
    { ...AVATARS[1], role: "Admin" },
    { ...AVATARS[2], role: "Read-only" },
    { ...AVATARS[3], role: "Read-only" },
    { ...AVATARS[4], role: "Read-only" },
];

/** Team settings reached from a breadcrumb trail: an invite form above the member table. */
export const Settings07 = () => (
    <SettingsPage>
        <SidebarNavigationSlim activeUrl="/settings" items={navItemsFlat} footerItems={navFooterItemsCompact} />

        <SettingsMain>
            <div className="flex flex-col gap-8 lg:gap-6">
                <div className="flex flex-col gap-4 px-4 lg:gap-5 lg:px-8">
                    <Breadcrumbs aria-label="Breadcrumb">
                        <Breadcrumbs.Account href="/teams/sisyphus" src={IMAGES.square[0].src}>
                            {LOGOS[1].name}
                        </Breadcrumbs.Account>
                        <Breadcrumbs.AccountMenu src={currentUser.src} items={accountItems}>
                            {currentUser.name}
                        </Breadcrumbs.AccountMenu>
                        <Breadcrumbs.Item labelClassName="text-primary group-hover:text-primary">Dashboard</Breadcrumbs.Item>
                    </Breadcrumbs>

                    <div className="flex lg:hidden">
                        <Button color="link-gray" size="md" href="/dashboard" iconLeading={ArrowLeft}>
                            Back
                        </Button>
                    </div>

                    <div className="border-secondary flex flex-col gap-4 border-b pb-4 lg:flex-row">
                        <div className="flex flex-1 flex-col gap-0.5">
                            <h1 className="text-primary text-xl font-semibold">Team management</h1>
                            <p className="text-md text-tertiary">Manage your team members and their account permissions here.</p>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-8 px-4 lg:gap-6 lg:px-8">
                    <SettingsFormRow
                        label="Invite team members"
                        hint="Get your projects up and running faster by inviting your team to collaborate."
                        headingLevel="h2"
                        showLabelOnMobile
                    >
                        <Form className="flex flex-col gap-4">
                            {invites.map((invite, index) => (
                                <InputGroup
                                    key={invite}
                                    aria-label={`Invite ${index + 1} email address`}
                                    trailingAddon={<NativeSelect aria-label={`Invite ${index + 1} permission`} defaultValue="read" options={roleOptions} />}
                                >
                                    <InputBase type="email" placeholder="you@proper.example" />
                                </InputGroup>
                            ))}

                            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
                                <Button color="link-color" size="md" iconLeading={Plus} className="w-max">
                                    Add another
                                </Button>
                                <Button type="submit" size="md">
                                    Send invites
                                </Button>
                            </div>
                        </Form>
                    </SettingsFormRow>

                    <SettingsRowDivider />

                    <SettingsFormRow label="Team members" hint="Manage your existing team and change roles/permissions." headingLevel="h2" showLabelOnMobile>
                        <div className="bg-primary ring-secondary -mx-4 overflow-hidden rounded-none shadow-none ring-0 lg:mx-0 lg:rounded-xl lg:shadow-xs lg:ring-1">
                            <Table aria-label="Team members" size="sm">
                                <Table.Header>
                                    <Table.Head id="name" label="Name" isRowHeader className="w-full" />
                                    <Table.Head id="role" label="Role" />
                                    <Table.Head id="actions">
                                        <span className="sr-only">Actions</span>
                                    </Table.Head>
                                </Table.Header>

                                <Table.Body items={members}>
                                    {(member) => (
                                        <Table.Row id={member.username}>
                                            <Table.Cell>
                                                <div className="flex items-center gap-3">
                                                    <Avatar src={member.src} alt="" size="md" initials={member.initials} />
                                                    <div className="whitespace-nowrap">
                                                        <p className="text-primary text-sm font-medium">{member.name}</p>
                                                        <p className="text-tertiary text-sm">{member.email}</p>
                                                    </div>
                                                </div>
                                            </Table.Cell>
                                            <Table.Cell className="whitespace-nowrap">{member.role}</Table.Cell>
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
            </div>
        </SettingsMain>
    </SettingsPage>
);
