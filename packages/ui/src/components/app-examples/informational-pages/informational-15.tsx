"use client";

import {
    BarChartSquare02,
    HomeLine as HomeIcon,
    HomeLine,
    LayoutAlt01,
    LifeBuoy01,
    LinkExternal01,
    PieChart03,
    Rows01,
    SearchLg,
    Settings01,
} from "@properui/icons";
import type { NavItemDividerType, NavItemType } from "@/components/application/app-navigation/config";
import { SidebarNavigationSectionDividers } from "@/components/application/app-navigation/sidebar-navigation/sidebar-section-dividers";
import { Breadcrumbs } from "@/components/application/breadcrumbs/breadcrumbs";
import { CodeSnippet } from "@/components/application/code-snippet/code-snippet";
import { PaginationCardMinimal } from "@/components/application/pagination/pagination";
import { Table, TableCard } from "@/components/application/table/table";
import { Tabs } from "@/components/application/tabs/tabs";
import { BadgeWithDot } from "@/components/base/badges/badges";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";

const navItems: (NavItemType | NavItemDividerType)[] = [
    { label: "Home", href: "/", icon: HomeLine },
    { label: "Portfolio", href: "/portfolio", icon: PieChart03 },
    { label: "Projects", href: "/projects", icon: Rows01 },
    { divider: true },
    {
        label: "Dashboard",
        href: "/dashboard",
        icon: BarChartSquare02,
        items: [
            { label: "Overview", href: "/dashboard/overview" },
            { label: "Notifications", href: "/dashboard/notifications", badge: 8 },
            { label: "Analytics", href: "/dashboard/analytics" },
            { label: "Sources", href: "/dashboard/sources" },
        ],
    },
    { divider: true },
    { label: "Reporting", href: "/reporting", icon: LayoutAlt01 },
    { label: "Settings", href: "/settings", icon: Settings01 },
    {
        label: "Support",
        href: "/support",
        icon: LifeBuoy01,
        badge: (
            <BadgeWithDot color="success" type="modern" size="sm">
                Online
            </BadgeWithDot>
        ),
    },
    { label: "Open in browser", href: "/browser", icon: LinkExternal01 },
];

const pageTabs = [
    { id: "overview", label: "Overview" },
    { id: "visual-tagger", label: "Visual tagger" },
    { id: "debugger", label: "Debugger" },
];

const streamTabs = [
    { id: "live", label: "Live" },
    { id: "pause", label: "Pause" },
];

const inspectorTabs = [
    { id: "pretty", label: "Pretty" },
    { id: "raw", label: "Raw" },
    { id: "violations", label: "Violations" },
];

interface SourceEvent {
    id: string;
    action: string;
    date: string;
}

const events: SourceEvent[] = [
    { id: "event-01", action: "Signup complete", date: "Jan 6, 2027" },
    { id: "event-02", action: "Signup complete", date: "Jan 6, 2027" },
    { id: "event-03", action: "Source deleted", date: "Jan 6, 2027" },
    { id: "event-04", action: "Signup complete", date: "Jan 5, 2027" },
    { id: "event-05", action: "Signup complete", date: "Jan 5, 2027" },
    { id: "event-06", action: "Source deleted", date: "Jan 5, 2027" },
    { id: "event-07", action: "Source deleted", date: "Jan 4, 2027" },
];

const schemaSnippet = `// Imports
import mongoose, { Schema } from 'mongoose'

// Collection name
export const collection = 'Design'

// Schema
const schema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  }
}, {timestamps: true})

// Model
export default mongoose.model(collection, schema,
  collection)
`;

/** Informational page 15 — data sources with a live event stream beside a schema inspector. */
export const Informational15 = () => (
    <div className="bg-primary flex flex-col lg:flex-row">
        <SidebarNavigationSectionDividers activeUrl="/dashboard/sources" items={navItems} />

        <main className="flex min-w-0 flex-1 flex-col pt-8 pb-12">
            <div className="flex flex-col gap-5 px-4 lg:px-8">
                <div className="relative flex flex-col gap-4">
                    <div className="max-lg:hidden">
                        <Breadcrumbs type="text" aria-label="Breadcrumbs">
                            <Breadcrumbs.Item href="/" icon={HomeIcon} aria-label="Home" />
                            <Breadcrumbs.Item href="/dashboard">Dashboard</Breadcrumbs.Item>
                            <Breadcrumbs.Item href="/dashboard/sources">Sources</Breadcrumbs.Item>
                        </Breadcrumbs>
                    </div>

                    <div className="flex lg:hidden">
                        <Button color="link-gray" size="sm" href="/dashboard">
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

                <div className="flex w-full flex-col">
                    <Tabs defaultSelectedKey="overview">
                        <Tabs.List type="underline" items={pageTabs}>
                            {(tab) => <Tabs.Item {...tab} />}
                        </Tabs.List>
                        {pageTabs.map((tab) => (
                            <Tabs.Panel key={tab.id} id={tab.id} />
                        ))}
                    </Tabs>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2">
                <section
                    aria-label="Sources"
                    className="border-secondary relative flex flex-col gap-6 py-8 lg:px-8 lg:after:pointer-events-none lg:after:absolute lg:after:inset-0 lg:after:border-e lg:after:border-inherit"
                >
                    <div className="flex flex-wrap items-center justify-between gap-4 px-4 lg:px-0">
                        <p className="text-primary text-md font-semibold">Sources</p>

                        <Input shortcut size="sm" aria-label="Search sources" placeholder="Search" icon={SearchLg} className="w-full lg:max-w-62" />
                    </div>

                    <div className="flex w-full flex-col px-4 lg:px-0">
                        <Tabs defaultSelectedKey="live">
                            <Tabs.List type="underline" items={streamTabs}>
                                {(tab) => <Tabs.Item {...tab} />}
                            </Tabs.List>
                            {streamTabs.map((tab) => (
                                <Tabs.Panel key={tab.id} id={tab.id} />
                            ))}
                        </Tabs>
                    </div>

                    <TableCard.Root className="rounded-none shadow-none lg:rounded-xl lg:shadow-xs">
                        <Table aria-label="Source events">
                            <Table.Header>
                                <Table.Head id="action" label="Action" isRowHeader className="w-full" />
                                <Table.Head id="status" label="Status" />
                                <Table.Head id="date" label="Date" />
                            </Table.Header>

                            <Table.Body items={events}>
                                {(event) => (
                                    <Table.Row id={event.id}>
                                        <Table.Cell className="text-primary font-medium whitespace-nowrap">{event.action}</Table.Cell>
                                        <Table.Cell>
                                            <BadgeWithDot size="sm" type="modern" color="success">
                                                Track
                                            </BadgeWithDot>
                                        </Table.Cell>
                                        <Table.Cell className="whitespace-nowrap">{event.date}</Table.Cell>
                                    </Table.Row>
                                )}
                            </Table.Body>
                        </Table>

                        <PaginationCardMinimal align="right" page={1} total={10} pageSize={10} />
                    </TableCard.Root>
                </section>

                <section aria-label="Source inspector" className="flex flex-col gap-6 py-8 lg:px-8">
                    <div className="flex flex-wrap items-center justify-between gap-4 px-4 lg:px-0">
                        <p className="text-primary text-md font-semibold">Source deleted</p>

                        <Button color="secondary" size="md">
                            View in Schema
                        </Button>
                    </div>

                    <div className="flex w-full flex-col px-4 lg:px-0">
                        <Tabs defaultSelectedKey="pretty">
                            <Tabs.List type="underline" items={inspectorTabs}>
                                {(tab) => <Tabs.Item {...tab} />}
                            </Tabs.List>
                            {inspectorTabs.map((tab) => (
                                <Tabs.Panel key={tab.id} id={tab.id} />
                            ))}
                        </Tabs>
                    </div>

                    <div className="px-4 lg:px-0">
                        <CodeSnippet showLineNumbers aria-label="Design schema" code={schemaSnippet} language="javascript" />
                    </div>
                </section>
            </div>
        </main>
    </div>
);
