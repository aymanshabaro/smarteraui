"use client";

import type { ComponentProps } from "react";
import { FileIcon } from "@untitledui/file-icons";
import { ArrowLeft, FilterLines, HomeLine, Plus, SearchLg, Share04 } from "@smarteraui/icons";
import { Breadcrumbs } from "@/components/application/breadcrumbs/breadcrumbs";
import { FileUpload } from "@/components/application/file-upload/file-upload-base";
import { Table, TableCard } from "@/components/application/table/table";
import { Tabs } from "@/components/application/tabs/tabs";
import { Avatar } from "@/components/base/avatar/avatar";
import { Button } from "@/components/base/buttons/button";
import { DropdownIconSimple } from "@/components/base/dropdown/dropdown-icon-simple";
import { Input } from "@/components/base/input/input";
import type { DemoAvatar } from "@/utils/demo-assets";
import { avatar } from "@/utils/demo-assets";
import { AppHeader } from "./shell.a";

const noop = () => {};

const tabs = [
    { id: "all", label: "View all" },
    { id: "active", label: "Active" },
    { id: "archived", label: "Archived" },
];

const uploads = [
    { name: "Tech design requirements.pdf", size: 209_920, progress: 100, type: "pdf" },
    { name: "Dashboard prototype.mp4", size: 16_777_216, progress: 70, type: "mp4" },
    { name: "Dashboard prototype FINAL.fig", size: 4_404_019, progress: 70, type: "fig" },
] satisfies { name: string; size: number; progress: number; type: ComponentProps<typeof FileIcon>["type"] }[];

interface AttachedFile {
    name: string;
    size: string;
    uploadedAt: string;
    updatedAt: string;
    person: DemoAvatar;
}

const attachedFiles: AttachedFile[] = [
    { name: "Tech requirements.pdf", size: "200 KB", uploadedAt: "Jan 4, 2026", updatedAt: "Jan 4, 2026", person: avatar(0) },
    { name: "Dashboard screenshot.jpg", size: "720 KB", uploadedAt: "Jan 4, 2026", updatedAt: "Jan 4, 2026", person: avatar(1) },
    { name: "Dashboard prototype recording.mp4", size: "16 MB", uploadedAt: "Jan 2, 2026", updatedAt: "Jan 2, 2026", person: avatar(2) },
    { name: "Dashboard prototype FINAL.fig", size: "4.2 MB", uploadedAt: "Jan 6, 2026", updatedAt: "Jan 6, 2026", person: avatar(3) },
    { name: "UX Design Guidelines.docx", size: "400 KB", uploadedAt: "Jan 8, 2026", updatedAt: "Jan 8, 2026", person: avatar(4) },
    { name: "Dashboard interaction.aep", size: "12 MB", uploadedAt: "Jan 6, 2026", updatedAt: "Jan 6, 2026", person: avatar(5) },
    { name: "Briefing call recording.mp3", size: "800 KB", uploadedAt: "Jan 4, 2026", updatedAt: "Jan 4, 2026", person: avatar(6) },
];

/** Informational page 03 — project files and assets under a header nav, with an upload drop zone and an attachments table. */
export const Informational03 = () => (
    <div className="bg-primary flex flex-col">
        <AppHeader activeUrl="/projects" />

        <main className="max-w-container mx-auto flex w-full flex-col gap-y-8 pt-8 pb-12 lg:pt-12 lg:pb-24">
            <div className="flex flex-col gap-y-4 px-4 lg:px-8">
                <div className="max-lg:hidden">
                    <Breadcrumbs type="text" aria-label="Breadcrumbs">
                        <Breadcrumbs.Item href="/" icon={HomeLine} aria-label="Home" />
                        <Breadcrumbs.Item href="/projects">Projects</Breadcrumbs.Item>
                        <Breadcrumbs.Item href="/projects/dashboard-ui">Dashboard UI</Breadcrumbs.Item>
                        <Breadcrumbs.Item href="/projects/dashboard-ui/files">Files and assets</Breadcrumbs.Item>
                    </Breadcrumbs>
                </div>

                <div className="flex lg:hidden">
                    <Button color="link-gray" size="sm" href="/projects/dashboard-ui" iconLeading={ArrowLeft}>
                        Back to project
                    </Button>
                </div>

                <div className="flex flex-col gap-4 lg:flex-row">
                    <div className="flex flex-1 flex-col gap-y-0.5">
                        <h1 className="text-primary text-xl font-semibold">Files and assets</h1>
                        <p className="text-tertiary text-md">Documents and attachments that have been uploaded as part of this project.</p>
                    </div>

                    <div className="flex gap-3">
                        <Button color="secondary" size="md" iconLeading={Share04}>
                            Share
                        </Button>
                        <Button color="primary" size="md" iconLeading={Plus}>
                            Invite team
                        </Button>
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-y-6 px-4 lg:px-8">
                <FileUpload.Root className="flex flex-col gap-4">
                    <FileUpload.DropZone hint="SVG, PNG, JPG or GIF (max. 800x400px)" />

                    <FileUpload.List className="hidden lg:flex">
                        {uploads.map((file) => (
                            <FileUpload.ListItemProgressFill
                                key={file.name}
                                name={file.name}
                                size={file.size}
                                progress={file.progress}
                                type={file.type}
                                onDelete={noop}
                            />
                        ))}
                    </FileUpload.List>
                </FileUpload.Root>

                <TableCard.Root className="border-secondary -mx-4 max-lg:rounded-none max-lg:border-b max-lg:ring-0 lg:mx-0">
                    <div className="border-secondary flex items-start justify-between px-4 max-lg:mb-6 lg:border-b lg:px-6 lg:py-5">
                        <div className="flex flex-col gap-y-0.5">
                            <p className="text-primary text-md font-semibold">Attached files</p>
                            <p className="text-tertiary text-sm">Files and assets that have been attached to this project.</p>
                        </div>
                        <DropdownIconSimple />
                    </div>

                    <div className="border-secondary border-b px-4 max-lg:pb-6 lg:px-6 lg:py-3">
                        <div className="flex flex-wrap gap-3 max-md:flex-col">
                            <Tabs defaultSelectedKey="all" className="w-auto">
                                <Tabs.List type="button-minimal" items={tabs}>
                                    {(tab) => <Tabs.Item {...tab} />}
                                </Tabs.List>
                                {tabs.map((tab) => (
                                    <Tabs.Panel key={tab.id} id={tab.id} />
                                ))}
                            </Tabs>

                            <div className="flex shrink-0 items-center gap-3 max-md:w-full md:ms-auto">
                                <Input
                                    shortcut
                                    size="sm"
                                    aria-label="Search files"
                                    placeholder="Search"
                                    icon={SearchLg}
                                    className="min-w-0 max-md:flex-1 md:w-70"
                                />
                                <Button color="secondary" size="md" className="max-h-9" iconLeading={FilterLines}>
                                    Filters
                                </Button>
                            </div>
                        </div>
                    </div>

                    <Table aria-label="Attached files" selectionMode="multiple">
                        <Table.Header>
                            <Table.Head id="name" label="File name" isRowHeader className="w-full max-lg:min-w-80" />
                            <Table.Head id="size" label="File size" />
                            <Table.Head id="uploaded-at" label="Date uploaded" />
                            <Table.Head id="updated-at" label="Last updated" />
                            <Table.Head id="uploaded-by" label="Uploaded by" />
                            <Table.Head id="actions">
                                <span className="sr-only">Actions</span>
                            </Table.Head>
                        </Table.Header>

                        <Table.Body items={attachedFiles}>
                            {(file) => (
                                <Table.Row id={file.name}>
                                    <Table.Cell>
                                        <div className="flex items-center gap-x-3">
                                            <FileIcon
                                                aria-hidden="true"
                                                type={file.name.split(".").pop() as ComponentProps<typeof FileIcon>["type"]}
                                                className="size-10 shrink-0"
                                            />
                                            <div>
                                                <p className="text-primary text-sm font-medium whitespace-nowrap">{file.name}</p>
                                                <p className="text-tertiary text-sm whitespace-nowrap">{file.size}</p>
                                            </div>
                                        </div>
                                    </Table.Cell>
                                    <Table.Cell className="whitespace-nowrap">{file.size}</Table.Cell>
                                    <Table.Cell className="whitespace-nowrap">{file.uploadedAt}</Table.Cell>
                                    <Table.Cell className="whitespace-nowrap">{file.updatedAt}</Table.Cell>
                                    <Table.Cell>
                                        <div className="flex items-center gap-3">
                                            <Avatar src={file.person.src} alt="" size="md" initials={file.person.initials} />
                                            <div>
                                                <p className="text-primary text-sm font-medium">{file.person.name}</p>
                                                <p className="text-tertiary text-sm">{file.person.email}</p>
                                            </div>
                                        </div>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <div className="flex gap-x-3">
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
        </main>
    </div>
);
