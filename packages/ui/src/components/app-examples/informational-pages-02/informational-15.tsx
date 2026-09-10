"use client";

import { ArrowLeft, Copy01, HomeLine, SearchLg, Zap } from "@properui/icons";
import { Breadcrumbs } from "@/components/application/breadcrumbs/breadcrumbs";
import { CodeSnippet } from "@/components/application/code-snippet/code-snippet";
import { Table, TableCard } from "@/components/application/table/table";
import { TablePaginationMinimal } from "@/components/application/table/table-pagination";
import { Tabs } from "@/components/application/tabs/tabs";
import { BadgeWithIcon } from "@/components/base/badges/badges";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
import { AppHeader, productNavItems } from "./shell.a";

const navItems = [...productNavItems.slice(0, 5), { label: "Messages", href: "/messages" }];

const sourceTabs = [
    { id: "overview", label: "Overview" },
    { id: "visual-tagger", label: "Visual tagger" },
    { id: "debugger", label: "Debugger" },
    { id: "settings", label: "Settings" },
];

const streamTabs = [
    { id: "live", label: "Live" },
    { id: "pause", label: "Pause" },
];

const payloadTabs = [
    { id: "pretty", label: "Pretty" },
    { id: "raw", label: "Raw" },
    { id: "violations", label: "Violations" },
];

const actions = [
    { id: "action-01", name: "Signup complete", date: "Jan 6, 2026" },
    { id: "action-02", name: "Signup complete", date: "Jan 6, 2026" },
    { id: "action-03", name: "Source deleted", date: "Jan 6, 2026" },
    { id: "action-04", name: "Signup complete", date: "Jan 5, 2026" },
    { id: "action-05", name: "Signup complete", date: "Jan 5, 2026" },
    { id: "action-06", name: "Source deleted", date: "Jan 5, 2026" },
    { id: "action-07", name: "Source deleted", date: "Jan 4, 2026" },
];

const payload = `// Imports
import mongoose, { Schema } from 'mongoose'

// Collection name
export const collection = 'Design'

// Schema
const schema = new Schema({
    name: { type: String, required: true },
    description: { type: String },
}, { timestamps: true })

// Model
export default mongoose.model(collection, schema, collection)`;

/** Informational page 15 — a data sources debugger with a live event table beside the selected event payload. */
export const Informational15 = () => (
    <div className="bg-primary flex flex-col">
        <AppHeader activeUrl="/dashboard" items={navItems} />

        <main className="max-w-container mx-auto flex w-full flex-1 flex-col pt-8 pb-12 lg:pt-12 lg:pb-24">
            <div className="flex flex-col gap-5">
                <div className="relative flex flex-col gap-4 px-4 lg:px-8">
                    <div className="max-lg:hidden">
                        <Breadcrumbs type="text" aria-label="Breadcrumbs">
                            <Breadcrumbs.Item href="/" icon={HomeLine} aria-label="Home" />
                            <Breadcrumbs.Item href="/dashboard">Dashboard</Breadcrumbs.Item>
                            <Breadcrumbs.Item href="/dashboard/sources">Sources</Breadcrumbs.Item>
                        </Breadcrumbs>
                    </div>

                    <div className="flex lg:hidden">
                        <Button color="link-gray" size="sm" href="/dashboard" iconLeading={ArrowLeft}>
                            Back
                        </Button>
                    </div>

                    <div className="flex flex-col gap-4 lg:flex-row lg:justify-between">
                        <h1 className="text-primary text-xl font-semibold">Sources</h1>

                        <div className="flex items-start gap-3">
                            <Button color="secondary" size="md">
                                Import
                            </Button>
                            <Button color="primary" size="md">
                                Share
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="px-0 lg:px-8">
                    <div className="flex w-max flex-col overflow-x-auto px-4 lg:px-0">
                        <Tabs defaultSelectedKey="overview">
                            <Tabs.List type="button-minimal" items={sourceTabs}>
                                {(tab) => <Tabs.Item {...tab} />}
                            </Tabs.List>
                            {sourceTabs.map((tab) => (
                                <Tabs.Panel key={tab.id} id={tab.id} />
                            ))}
                        </Tabs>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="relative flex flex-col gap-6 py-8 lg:px-8">
                    <div className="flex flex-wrap items-center justify-between gap-4 px-4 lg:px-0">
                        <h2 className="text-primary text-md font-semibold">Sources</h2>

                        <Input shortcut size="sm" aria-label="Search" placeholder="Search" icon={SearchLg} className="w-full max-md:hidden lg:max-w-70" />
                        <Input size="md" aria-label="Search" placeholder="Search" icon={SearchLg} className="w-full md:hidden" />
                    </div>

                    <div className="flex w-max flex-col px-4 lg:px-0">
                        <Tabs defaultSelectedKey="live">
                            <Tabs.List type="button-minimal" items={streamTabs}>
                                {(tab) => <Tabs.Item {...tab} />}
                            </Tabs.List>
                            {streamTabs.map((tab) => (
                                <Tabs.Panel key={tab.id} id={tab.id} />
                            ))}
                        </Tabs>
                    </div>

                    <TableCard.Root className="rounded-none shadow-none lg:rounded-xl lg:shadow-xs">
                        <Table aria-label="Actions">
                            <Table.Header>
                                <Table.Head id="action" label="Action" isRowHeader className="w-full ps-4 md:px-5" />
                                <Table.Head id="status" label="Status" className="md:px-5" />
                                <Table.Head id="date" label="Date" className="pe-4 md:px-5" />
                            </Table.Header>

                            <Table.Body items={actions}>
                                {(action) => (
                                    <Table.Row id={action.id}>
                                        <Table.Cell className="text-primary w-full ps-4 font-medium! whitespace-nowrap md:px-5">{action.name}</Table.Cell>
                                        <Table.Cell className="md:px-5">
                                            <BadgeWithIcon size="sm" type="modern" color="gray" iconLeading={Zap}>
                                                Track
                                            </BadgeWithIcon>
                                        </Table.Cell>
                                        <Table.Cell className="pe-4 whitespace-nowrap md:px-5">{action.date}</Table.Cell>
                                    </Table.Row>
                                )}
                            </Table.Body>
                        </Table>

                        <TablePaginationMinimal align="right" page={1} total={10} />
                    </TableCard.Root>
                </div>

                <div className="flex flex-col gap-6 p-4 lg:p-8">
                    <div className="flex flex-col items-start justify-between gap-4 lg:flex-row lg:items-center">
                        <h2 className="text-primary text-md font-semibold">Source deleted</h2>
                        <Button color="secondary" size="md">
                            View in Schema
                        </Button>
                    </div>

                    <div className="flex w-max flex-col">
                        <Tabs defaultSelectedKey="pretty">
                            <Tabs.List type="button-minimal" items={payloadTabs}>
                                {(tab) => <Tabs.Item {...tab} />}
                            </Tabs.List>
                            {payloadTabs.map((tab) => (
                                <Tabs.Panel key={tab.id} id={tab.id} />
                            ))}
                        </Tabs>
                    </div>

                    <CodeSnippet code={payload} language="javascript" aria-label="Event payload" />

                    <div className="flex justify-end">
                        <Button color="secondary" size="md" iconLeading={Copy01}>
                            Copy
                        </Button>
                    </div>
                </div>
            </div>
        </main>
    </div>
);
