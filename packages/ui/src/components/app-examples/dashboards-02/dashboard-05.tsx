"use client";

import { useState } from "react";
import type { Selection as AriaSelection } from "react-aria-components";
import { SearchLg } from "@properui/icons";
import { avatar } from "../../../utils/demo-assets";
import { Breadcrumbs } from "../../application/breadcrumbs/breadcrumbs";
import { FilterBar } from "../../application/filter-bar/filter-bar";
import { Table, TableRowActionsDropdown } from "../../application/table/table";
import { Avatar } from "../../base/avatar/avatar";
import { AvatarLabelGroup } from "../../base/avatar/avatar-label-group";
import { BadgeWithDot } from "../../base/badges/badges";
import { Button } from "../../base/buttons/button";
import { Input } from "../../base/input/input";
import { Select } from "../../base/select/select";
import type { SelectItemType } from "../../base/select/select-shared";
import { TrendChart } from "./charts.a";
import { customerRows, trendSeries } from "./data.a";
import { DashboardHeader, DashboardMain, DashboardSection } from "./shell.a";
import { FiltersButton, PanelMenu, PeriodTabs } from "./widgets.a";

const owner = avatar(4);

const accessLevels = [
    ["Admin", "Data export", "Data import"],
    ["Admin", "Data export", "Data import"],
    ["Data export", "Data import"],
    ["Data export", "Data import"],
    ["Data export", "Data import"],
    ["Data export", "Data import"],
    ["Data export", "Data import"],
];

const addedDates = ["Oct 10, 2026", "Aug 2, 2026", "Jul 28, 2026", "Sep 4, 2026", "Jan 18, 2026", "Jan 14, 2026", "Dec 16, 2026"];

const fields: SelectItemType[] = [
    { id: "status", label: "Status" },
    { id: "email", label: "Email" },
    { id: "team", label: "Team" },
    { id: "name", label: "Name" },
];

const operators: SelectItemType[] = [
    { id: "equals", label: "Equals" },
    { id: "contains", label: "Contains" },
    { id: "does-not-contain", label: "Does not contain" },
    { id: "starts-with", label: "Starts with" },
];

const renderSelectItem = (item: SelectItemType) => <Select.Item id={item.id}>{item.label}</Select.Item>;

/** Analytics dashboard: breadcrumbed profile header, site-traffic chart and a filterable users table. */
export const Dashboard05 = () => {
    const [selectedKeys, setSelectedKeys] = useState<AriaSelection>(new Set([customerRows[1]!.name, customerRows[2]!.name, customerRows[4]!.name]));

    const selectedCount = selectedKeys === "all" ? customerRows.length : selectedKeys.size;

    return (
        <div className="bg-primary">
            <DashboardHeader account="none" search />

            <DashboardMain className="pb-16 lg:pb-24">
                <DashboardSection className="flex-row justify-between gap-4">
                    <div className="flex flex-col gap-4">
                        <Breadcrumbs className="max-lg:hidden" aria-label="Breadcrumbs">
                            <Breadcrumbs.Account src={owner.src} alt="">
                                {owner.name}
                            </Breadcrumbs.Account>
                            <Breadcrumbs.Item>Dashboard</Breadcrumbs.Item>
                        </Breadcrumbs>

                        <div className="flex flex-1 flex-col gap-0.5">
                            <h1 className="text-primary text-xl font-semibold">Welcome back, {owner.name.split(" ")[0]}</h1>
                            <p className="text-tertiary text-md">Here&apos;s an overview of your site traffic and recently active users.</p>
                        </div>
                    </div>

                    <div className="ring-secondary relative hidden w-64 items-center gap-3 rounded-xl p-3 ring-1 ring-inset lg:flex">
                        <AvatarLabelGroup size="md" rounded={false} src={owner.src} alt="" status="online" title={owner.name} subtitle={owner.email} />
                        <div className="absolute end-2 top-2">
                            <PanelMenu />
                        </div>
                    </div>
                </DashboardSection>

                <DashboardSection className="gap-5">
                    <div className="flex flex-col justify-between gap-4 lg:flex-row">
                        <h2 className="text-primary flex h-7 items-center gap-1.5 text-lg font-semibold lg:h-8">
                            Site traffic <span className="text-success-primary">+104%</span>
                        </h2>

                        <div className="flex gap-3">
                            <PeriodTabs selectedKey="12-months" />
                            <FiltersButton />
                        </div>
                    </div>

                    <TrendChart
                        className="h-60 lg:h-80"
                        data={trendSeries}
                        xKey="month"
                        series={[
                            { key: "A", name: "This year" },
                            { key: "B", name: "Last year", dashed: true },
                        ]}
                    />
                </DashboardSection>

                <div className="flex w-full flex-col gap-6 lg:gap-5">
                    <div className="max-w-container mx-auto flex w-full flex-col justify-between gap-3 px-4 lg:flex-row lg:items-center lg:gap-4 lg:px-8">
                        <h2 className="text-primary text-md font-semibold">Recently active</h2>
                        <Input shortcut aria-label="Search" placeholder="Search" icon={SearchLg} size="sm" className="w-full lg:max-w-70" />
                    </div>

                    <div className="max-w-container mx-auto w-full px-4 lg:px-8">
                        <FilterBar>
                            <FilterBar.Content className="hidden md:flex">
                                <FilterBar.FilterIconButton />
                                <FilterBar.FilterRow>
                                    <Select aria-label="Filter field" size="sm" placeholder="Filter" items={fields} className="w-28">
                                        {renderSelectItem}
                                    </Select>
                                    <Select aria-label="Operator" size="sm" defaultSelectedKey="equals" items={operators} className="w-28">
                                        {renderSelectItem}
                                    </Select>
                                    <Input aria-label="Value" size="sm" placeholder="Enter a value" className="w-42" />
                                </FilterBar.FilterRow>
                            </FilterBar.Content>

                            <FilterBar.Actions className="max-md:w-full">
                                <Button color="secondary" size="sm" className="max-md:hidden">
                                    Clear all
                                </Button>
                                <Button color="secondary" size="sm" className="w-full text-center md:hidden">
                                    Apply filters
                                </Button>
                            </FilterBar.Actions>
                        </FilterBar>
                    </div>

                    <div className="max-w-container mx-auto w-full px-0 lg:px-8">
                        <div className="overflow-x-auto">
                            <Table aria-label="Recently active users" selectionMode="multiple" selectedKeys={selectedKeys} onSelectionChange={setSelectedKeys}>
                                <Table.Header className="bg-secondary lg:[&>tr>th]:bg-secondary lg:bg-transparent lg:[&>tr>th:first-of-type]:rounded-s-xl lg:[&>tr>th:last-of-type]:rounded-e-xl">
                                    <Table.Head
                                        id="name"
                                        label={selectedCount > 0 ? `${selectedCount} selected` : "Name"}
                                        isRowHeader
                                        allowsSorting
                                        className={selectedCount > 0 ? "text-brand-secondary w-full" : "w-full"}
                                    />
                                    <Table.Head id="access" label="Access" allowsSorting className="max-lg:hidden" />
                                    <Table.Head id="lastActive" label="Last active" allowsSorting className="max-lg:hidden" />
                                    <Table.Head id="dateAdded" label="Date added" allowsSorting className="max-lg:hidden" />
                                    <Table.Head id="actions">
                                        <span className="sr-only">Actions</span>
                                    </Table.Head>
                                </Table.Header>

                                <Table.Body items={customerRows}>
                                    {(item) => (
                                        <Table.Row id={item.name}>
                                            <Table.Cell className="text-nowrap">
                                                <div className="flex w-max items-center gap-3">
                                                    <Avatar size="md" src={item.src} alt="" />
                                                    <div>
                                                        <p className="text-primary text-sm font-medium">{item.name}</p>
                                                        <p className="text-tertiary text-sm">{item.email}</p>
                                                    </div>
                                                </div>
                                            </Table.Cell>
                                            <Table.Cell className="text-nowrap max-lg:hidden">
                                                <div className="flex gap-1">
                                                    {accessLevels[customerRows.indexOf(item)]!.map((level) => (
                                                        <BadgeWithDot key={level} size="sm" type="modern" color={level === "Admin" ? "brand" : "success"}>
                                                            {level}
                                                        </BadgeWithDot>
                                                    ))}
                                                </div>
                                            </Table.Cell>
                                            <Table.Cell className="text-nowrap max-lg:hidden">{item.date}</Table.Cell>
                                            <Table.Cell className="text-nowrap max-lg:hidden">{addedDates[customerRows.indexOf(item)]}</Table.Cell>
                                            <Table.Cell className="px-4 lg:px-3">
                                                <div className="flex items-center justify-end">
                                                    <TableRowActionsDropdown />
                                                </div>
                                            </Table.Cell>
                                        </Table.Row>
                                    )}
                                </Table.Body>
                            </Table>
                        </div>
                    </div>
                </div>
            </DashboardMain>
        </div>
    );
};
