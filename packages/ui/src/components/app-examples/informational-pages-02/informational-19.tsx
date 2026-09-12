"use client";

import type { ComponentProps } from "react";
import { FileIcon } from "@untitledui/file-icons";
import { ArrowLeft, ArrowRight, BookOpen01, Edit01, Eye, Heart, Link01, MarkerPin02, MessageCircle01, Plus } from "@properui/icons";
import { cx } from "../../../utils/cx";
import { AVATAR_TRANSPARENT, IMAGES } from "../../../utils/demo-assets";
import { Breadcrumbs } from "../../application/breadcrumbs/breadcrumbs";
import { FileUpload } from "../../application/file-upload/file-upload-base";
import { SectionHeader } from "../../application/section-headers/section-headers";
import { AvatarProfilePhoto } from "../../base/avatar/avatar-profile-photo";
import { Badge, BadgeIcon } from "../../base/badges/badges";
import { Button } from "../../base/buttons/button";
import { ButtonUtility } from "../../base/buttons/button-utility";
import { DropdownIconSimple } from "../../base/dropdown/dropdown-icon-simple";
import { TextEditor } from "../../base/text-editor/text-editor";
import { AppHeader, navItemsWith } from "./shell.a";

const noop = () => {};

const navItems = navItemsWith(2, { label: "CMS", href: "/cms" });

const uploads = [
    { name: "The Outermost House - Henry Beston (1928).upub", size: 647_168, progress: 100, type: "empty" },
    { name: "The Outermost House - Henry Beston (1928).mobi", size: 861_184, progress: 100, type: "empty" },
    { name: "The Outermost House - Henry Beston (1928).pdf", size: 1_048_576, progress: 80, type: "pdf" },
] satisfies { name: string; size: number; progress: number; type: ComponentProps<typeof FileIcon>["type"] }[];

const stats = [
    { id: "works", label: "Works", value: "18", icon: BookOpen01 },
    { id: "reviews", label: "Reviews", value: "806", icon: MessageCircle01 },
    { id: "favorites", label: "Favorites", value: "12,087", icon: Heart },
];

const notableWorks = [
    { id: "outermost-house", title: "The Outermost House", year: "1928", cover: IMAGES.square[0]! },
    { id: "northern-farm", title: "Northern Farm", year: "1972", cover: IMAGES.square[1]! },
    { id: "herbs-and-the-earth", title: "Herbs and the Earth", year: "1935", cover: IMAGES.square[2]! },
    { id: "the-st-lawrence", title: "The St. Lawrence", year: "1942", cover: IMAGES.square[3]! },
    { id: "white-pine-and-blue-water", title: "White Pine and Blue Water", year: "1974", cover: IMAGES.square[0]! },
];

const author = { name: "Henry Beston", lifespan: "1888-1968", location: "Quincy, Massachusetts", website: "proper.example/authors/henry-beston" };

const excerpt =
    "<p>The world today is sick to its thin blood for lack of elemental things, for fire before the hands, for water welling from the earth, for air, for the dear earth itself underfoot.</p>";

/** Informational page 19 — a CMS content editor for a book, with an upload list and an author detail rail. */
export const Informational19 = () => (
    <div className="bg-primary flex flex-col">
        <AppHeader activeUrl="/cms" items={navItems} />

        <main className="max-w-container mx-auto flex w-full flex-1 flex-col pt-8 pb-12 lg:pt-12 lg:pb-24">
            <div className="mb-8 flex flex-col gap-5 px-4 lg:px-8">
                <div className="relative flex flex-col gap-4">
                    <div className="max-lg:hidden">
                        <Breadcrumbs type="text" aria-label="Breadcrumbs">
                            <Breadcrumbs.Item href="/cms/authors">Authors</Breadcrumbs.Item>
                            <Breadcrumbs.Item href="/cms/authors/henry-beston">{author.name}</Breadcrumbs.Item>
                            <Breadcrumbs.Item href="/cms/authors/henry-beston/the-outermost-house">The Outermost House</Breadcrumbs.Item>
                        </Breadcrumbs>
                    </div>

                    <div className="flex lg:hidden">
                        <Button color="link-gray" size="sm" href="/cms/authors/henry-beston" iconLeading={ArrowLeft}>
                            Back
                        </Button>
                    </div>

                    <div className="flex flex-col gap-4 lg:flex-row">
                        <div className="flex flex-1 flex-col gap-0.5">
                            <h1 className="text-primary text-xl font-semibold">The Outermost House</h1>
                            <p className="text-tertiary text-md">{author.name} (1928)</p>
                        </div>

                        <div className="flex items-start gap-3">
                            <Button color="secondary" size="md">
                                Save as draft
                            </Button>
                            <Button color="primary" size="md">
                                Publish changes
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col px-4 lg:gap-6 lg:px-8">
                <div className="flex flex-col gap-8 lg:flex-row lg:gap-16">
                    <div className="flex min-w-0 flex-1 flex-col gap-8">
                        <div className="flex flex-col gap-6">
                            <SectionHeader
                                size="sm"
                                divider={false}
                                title="Featured excerpt"
                                description="This will be displayed on the both the author’s profile and individual book pages."
                                actions={<DropdownIconSimple />}
                            />

                            <TextEditor aria-label="Featured excerpt" defaultValue={excerpt}>
                                <TextEditor.Toolbar>
                                    <TextEditor.Group aria-label="Formatting">
                                        <TextEditor.Bold />
                                        <TextEditor.Italic />
                                        <TextEditor.Underline />
                                        <TextEditor.Separator />
                                        <TextEditor.AlignLeft />
                                        <TextEditor.AlignCenter />
                                        <TextEditor.BulletList />
                                    </TextEditor.Group>
                                </TextEditor.Toolbar>
                                <TextEditor.Content className="h-50" />
                            </TextEditor>
                        </div>

                        <div className="flex flex-col gap-6">
                            <div className="flex min-w-0 flex-1 flex-col justify-center gap-0.5 self-stretch">
                                <h2 className="text-primary text-md font-semibold">Attach files</h2>
                                <p className="text-tertiary text-sm">Upload ebooks associated with this work.</p>
                            </div>

                            <FileUpload.Root className="flex flex-col gap-4">
                                <FileUpload.DropZone hint="SVG, PNG, JPG or GIF (max. 800x400px)" />

                                <FileUpload.List>
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
                        </div>
                    </div>

                    <div className="bg-primary ring-secondary flex w-full shrink-0 flex-col gap-6 self-start overflow-y-auto rounded-t-[20px] rounded-b-xl pb-6 shadow-xs ring-1 ring-inset lg:w-80">
                        <div>
                            <div className="relative px-2 pt-2">
                                <img src={IMAGES.landscape[7]!.src} alt="" className="h-30 w-full rounded-xl object-cover" />
                            </div>

                            <div className="-mt-12 flex flex-col gap-4 px-6">
                                <div className="flex flex-col gap-4">
                                    <div className="flex items-end justify-between">
                                        <AvatarProfilePhoto size="sm" src={AVATAR_TRANSPARENT.src} alt="" initials="HB" />

                                        <div className="flex gap-1 pb-3">
                                            <ButtonUtility size="xs" color="tertiary" tooltip="Preview" icon={Eye} />
                                            <ButtonUtility size="xs" color="tertiary" tooltip="Edit" icon={Edit01} />
                                        </div>
                                    </div>

                                    <div className="flex flex-col items-start gap-4">
                                        <div className="flex max-w-50 min-w-0 flex-1 flex-col gap-0.5">
                                            <p className="text-primary truncate text-lg font-semibold">{author.name}</p>
                                            <div className="flex items-center gap-2">
                                                <span className="text-tertiary text-sm">Author</span>
                                                <hr className="bg-border-primary h-3 w-px border-none" />
                                                <span className="text-tertiary text-sm">{author.lifespan}</span>
                                            </div>
                                        </div>

                                        <dl className="flex items-center gap-4">
                                            {stats.map((stat, index) => (
                                                <div key={stat.id} className={cx("flex flex-col gap-0.5", index > 0 && "border-primary border-s ps-4")}>
                                                    <dt className="text-quaternary text-xs font-medium">{stat.label}</dt>
                                                    <dd className="flex items-center gap-1.5">
                                                        <stat.icon className="text-fg-quaternary size-4" aria-hidden="true" />
                                                        <span className="text-primary text-md font-semibold">{stat.value}</span>
                                                    </dd>
                                                </div>
                                            ))}
                                        </dl>
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <Button color="secondary" size="md" iconLeading={Link01}>
                                        Copy link
                                    </Button>
                                    <Button color="secondary" size="md">
                                        Author page
                                    </Button>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-6 px-6">
                            <div className="flex flex-col">
                                <h2 className="text-primary text-sm font-semibold">About</h2>
                                <p className="text-tertiary mt-1 text-sm">
                                    {author.name} ({author.lifespan}) was the author of many books, including White Pine and Blue Water, Northern Farm, and The
                                    St. Lawrence. His Cape Cod house was proclaimed a National Literary Landmark in 1964.
                                </p>

                                <ul className="mt-4 flex flex-col gap-2">
                                    <li className="text-tertiary flex gap-2 text-sm">
                                        <MarkerPin02 className="text-fg-quaternary size-5 shrink-0" aria-hidden="true" />
                                        {author.location}
                                    </li>
                                    <li className="text-tertiary flex gap-2 text-sm">
                                        <Link01 className="text-fg-quaternary size-5 shrink-0" aria-hidden="true" />
                                        {author.website}
                                    </li>
                                </ul>

                                <div className="mt-4 flex flex-wrap gap-1">
                                    <Badge size="sm" type="modern">
                                        Author
                                    </Badge>
                                    <Badge size="sm" type="modern">
                                        Naturalist
                                    </Badge>
                                    <Badge size="sm" type="modern">
                                        Non-fiction
                                    </Badge>
                                    <BadgeIcon size="sm" type="modern" icon={Plus} aria-hidden="true" />
                                </div>
                            </div>

                            <div className="flex flex-col gap-4">
                                <h2 className="text-primary text-sm font-semibold">Notable works</h2>

                                <ul className="flex flex-col gap-3">
                                    {notableWorks.map((work) => (
                                        <li key={work.id}>
                                            <a
                                                href={`/cms/works/${work.id}`}
                                                className="outline-focus-ring flex w-full flex-row items-center gap-3 rounded-md focus-visible:outline-2 focus-visible:outline-offset-2"
                                            >
                                                <div className="bg-primary ring-primary shrink-0 rounded-md p-1 ring-1 ring-inset">
                                                    <img src={work.cover.src} alt="" className="aspect-[0.66] w-8 rounded-[2px] object-cover shadow-lg" />
                                                </div>
                                                <div className="flex min-w-0 flex-1 flex-col">
                                                    <div className="flex items-center">
                                                        <p className="text-secondary flex-1 truncate text-sm font-semibold">{work.title}</p>
                                                        <ArrowRight className="text-fg-quaternary size-4" aria-hidden="true" />
                                                    </div>
                                                    <div className="text-tertiary flex items-center gap-2 text-sm">
                                                        <p className="truncate">{author.name}</p>
                                                        <hr className="bg-border-primary h-3 w-px rounded-full border-none" />
                                                        <p>{work.year}</p>
                                                    </div>
                                                </div>
                                            </a>
                                        </li>
                                    ))}
                                </ul>

                                <div className="flex">
                                    <Button color="link-color" size="md" iconTrailing={ArrowRight}>
                                        See all works (18)
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>
);
