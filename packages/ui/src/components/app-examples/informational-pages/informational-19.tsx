"use client";

import type { ComponentProps } from "react";
import type { FileIcon } from "@untitledui/file-icons";
import {
    AlignCenter,
    AlignLeft,
    BarChartSquare02,
    Bold01,
    Calendar,
    CheckDone01,
    ChevronRight,
    Copy01,
    Edit05,
    File05,
    Heart,
    Image01,
    Italic01,
    LayoutAlt01,
    Link01,
    List,
    MagicWand02,
    MarkerPin01,
    MessageTextSquare01,
    PieChart03,
    Plus,
    Share04,
    Underline01,
    Users01,
} from "@properui/icons";
import type { NavItemType } from "@/components/application/app-navigation/config";
import { SidebarNavigationSectionsSubheadings } from "@/components/application/app-navigation/sidebar-navigation/sidebar-sections-subheadings";
import { Breadcrumbs } from "@/components/application/breadcrumbs/breadcrumbs";
import { FileUpload } from "@/components/application/file-upload/file-upload-base";
import { SectionHeader } from "@/components/application/section-headers/section-headers";
import { Avatar } from "@/components/base/avatar/avatar";
import { AvatarProfilePhoto } from "@/components/base/avatar/avatar-profile-photo";
import { Badge, BadgeIcon } from "@/components/base/badges/badges";
import { Button } from "@/components/base/buttons/button";
import { ButtonUtility } from "@/components/base/buttons/button-utility";
import { CloseButton } from "@/components/base/buttons/close-button";
import { DropdownIconSimple } from "@/components/base/dropdown/dropdown-icon-simple";
import { NativeSelect } from "@/components/base/select/select-native";
import { cx } from "@/utils/cx";
import { IMAGES, LOGOS, avatar } from "@/utils/demo-assets";

const noop = () => {};

const author = avatar(6);

const teamBadge = (shortcut: string) => (
    <div className="flex items-center gap-3">
        <Badge size="sm" type="modern">
            {shortcut}
        </Badge>
        <ChevronRight aria-hidden="true" className="text-fg-quaternary size-4 rtl:-scale-x-100" />
    </div>
);

const teamIcon = (index: number) => {
    const logo = LOGOS[index]!;
    const TeamIcon = () => <Avatar src={logo.src} alt={logo.name} className="me-2 size-5" />;
    TeamIcon.displayName = `TeamIcon(${logo.name})`;
    return TeamIcon;
};

const navItems: Array<{ label: string; items: NavItemType[] }> = [
    {
        label: "General",
        items: [
            { label: "Dashboard", href: "/", icon: BarChartSquare02 },
            { label: "CMS", href: "/cms", icon: LayoutAlt01 },
            { label: "Documents", href: "/documents", icon: File05 },
            { label: "Calendar", href: "/calendar", icon: Calendar },
        ],
    },
    {
        label: "Proper UI",
        items: [
            { label: "Reporting", href: "/reporting", icon: PieChart03 },
            {
                label: "Tasks",
                href: "/tasks",
                icon: CheckDone01,
                badge: (
                    <Badge size="sm" type="modern">
                        8
                    </Badge>
                ),
            },
            { label: "Users", href: "/users", icon: Users01 },
        ],
    },
    {
        label: "Your teams",
        items: LOGOS.slice(0, 4).map((logo, index) => ({
            label: logo.name,
            href: `/teams/${logo.name.toLowerCase()}`,
            icon: teamIcon(index),
            badge: teamBadge(`⌘${index + 1}`),
        })),
    },
];

const fontOptions = [
    { label: "Inter", value: "inter" },
    { label: "Georgia", value: "georgia" },
    { label: "Mono", value: "mono" },
];

const sizeOptions = [
    { label: "16px", value: "16" },
    { label: "18px", value: "18" },
    { label: "20px", value: "20" },
];

const formatTools = [
    { id: "bold", label: "Bold", icon: Bold01 },
    { id: "italic", label: "Italic", icon: Italic01 },
    { id: "underline", label: "Underline", icon: Underline01 },
];

const layoutTools = [
    { id: "align-left", label: "Align left", icon: AlignLeft },
    { id: "align-center", label: "Align centre", icon: AlignCenter },
    { id: "list", label: "Bulleted list", icon: List },
];

const insertTools = [
    { id: "link", label: "Insert link", icon: Link01 },
    { id: "image", label: "Insert image", icon: Image01 },
    { id: "rewrite", label: "Rewrite with AI", icon: MagicWand02 },
];

const excerptParagraphs = [
    "No aspect of the shoreline is more mysterious than the flights of these shore-bird constellations. The constellation forms, as I have hinted, in an instant of time, and in that same instant develops its own will.",
    "Birds which have been feeding yards away from each other, each one individually busy, suddenly fuse into this new volition and, flying, rise as one, coast as one, tilt their dozen bodies as one, and wheel off on the course the new group will have determined.",
    "There is no such thing, I may add, as a lead bird or guide. Had I more space I should like nothing better than to discuss this new will and its instant of origin, but I do not want to crowd this part of my chapter.",
];

const uploads = [
    { name: "The Quiet Shore — ebook.epub", size: 647_168, progress: 100, type: "empty" },
    { name: "The Quiet Shore — reader.mobi", size: 861_184, progress: 100, type: "empty" },
    { name: "The Quiet Shore — print proof.pdf", size: 1_048_576, progress: 80, type: "pdf" },
] satisfies { name: string; size: number; progress: number; type: ComponentProps<typeof FileIcon>["type"] }[];

const stats = [
    { label: "Works", value: "18", icon: File05 },
    { label: "Reviews", value: "806", icon: MessageTextSquare01 },
    { label: "Favorites", value: "12,087", icon: Heart },
];

const notableWorks = [
    { id: "work-01", title: "The Quiet Shore", year: "2027", image: IMAGES.square[0]! },
    { id: "work-02", title: "Northern Field", year: "2025", image: IMAGES.square[1]! },
    { id: "work-03", title: "Salt and Stone", year: "2023", image: IMAGES.square[2]! },
    { id: "work-04", title: "The Long River", year: "2021", image: IMAGES.square[3]! },
    { id: "work-05", title: "Winter Light", year: "2019", image: IMAGES.square[0]! },
];

/** Informational page 19 — CMS content editor with an attachment list and an author detail panel. */
export const Informational19 = () => (
    <div className="bg-primary flex flex-col lg:flex-row">
        <SidebarNavigationSectionsSubheadings activeUrl="/cms" items={navItems} />

        <main className="bg-secondary lg:bg-primary min-w-0 flex-1 pt-8 pb-12 shadow-none">
            <div className="max-w-container mx-auto mb-8 flex flex-col gap-5 px-4 lg:px-8">
                <div className="relative flex flex-col gap-4">
                    <div className="max-lg:hidden">
                        <Breadcrumbs type="text" aria-label="Breadcrumbs">
                            <Breadcrumbs.Item href="/cms/authors">Authors</Breadcrumbs.Item>
                            <Breadcrumbs.Item href="/cms/authors/drew-cano">{author.name}</Breadcrumbs.Item>
                            <Breadcrumbs.Item href="/cms/works/the-quiet-shore">The Quiet Shore</Breadcrumbs.Item>
                        </Breadcrumbs>
                    </div>

                    <div className="flex lg:hidden">
                        <Button color="link-gray" size="sm" href="/cms/authors">
                            Back
                        </Button>
                    </div>

                    <div className="flex flex-col gap-4 lg:flex-row">
                        <div className="flex flex-1 flex-col gap-0.5">
                            <h1 className="text-primary text-xl font-semibold">The Quiet Shore</h1>
                            <p className="text-tertiary text-md">{author.name} (2027)</p>
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

            <div className="max-w-container mx-auto flex flex-col gap-8 px-4 lg:flex-row lg:gap-8 lg:px-8">
                <div className="flex min-w-0 flex-1 flex-col gap-8">
                    <section aria-label="Featured excerpt" className="flex flex-col gap-5">
                        <SectionHeader
                            size="sm"
                            divider={false}
                            title="Featured excerpt"
                            description="This will be displayed on both the author's profile and individual book pages."
                            actions={<DropdownIconSimple />}
                        />

                        <div className="ring-secondary bg-primary flex flex-col rounded-xl ring-1 ring-inset">
                            <div className="border-secondary flex flex-wrap items-center gap-1 border-b p-2">
                                <NativeSelect
                                    size="sm"
                                    aria-label="Font family"
                                    defaultValue="inter"
                                    options={fontOptions}
                                    className="w-auto"
                                    selectClassName="w-35"
                                />
                                <NativeSelect
                                    size="sm"
                                    aria-label="Font size"
                                    defaultValue="16"
                                    options={sizeOptions}
                                    className="w-auto"
                                    selectClassName="w-22"
                                />

                                <div className="bg-border-secondary mx-1 h-5 w-px" />

                                {formatTools.map((tool) => (
                                    <ButtonUtility key={tool.id} size="sm" color="tertiary" tooltip={tool.label} icon={tool.icon} />
                                ))}

                                <div className="bg-border-secondary mx-1 h-5 w-px" />

                                {layoutTools.map((tool) => (
                                    <ButtonUtility key={tool.id} size="sm" color="tertiary" tooltip={tool.label} icon={tool.icon} />
                                ))}

                                <div className="bg-border-secondary mx-1 h-5 w-px" />

                                {insertTools.map((tool) => (
                                    <ButtonUtility key={tool.id} size="sm" color="tertiary" tooltip={tool.label} icon={tool.icon} />
                                ))}
                            </div>

                            <div className="flex flex-col gap-4 p-4 lg:p-5">
                                {excerptParagraphs.map((paragraph) => (
                                    <p key={paragraph} className="text-secondary text-md">
                                        {paragraph}
                                    </p>
                                ))}
                            </div>
                        </div>
                    </section>

                    <section aria-label="Attach files" className="flex flex-col gap-5">
                        <SectionHeader size="sm" divider={false} title="Attach files" description="Upload ebooks associated with this work." />

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
                    </section>
                </div>

                <aside
                    aria-label="Author details"
                    className="ring-secondary bg-primary flex w-full shrink-0 flex-col gap-6 self-start overflow-hidden rounded-t-[20px] rounded-b-xl pb-6 shadow-xs ring-1 ring-inset lg:w-80"
                >
                    <div>
                        <div className="relative px-2 pt-2">
                            <img src={IMAGES.landscape[7]!.src} alt="" className="h-30 w-full rounded-xl object-cover" />
                            <div className="absolute end-3 top-3">
                                <CloseButton size="md" label="Dismiss author details" onPress={noop} slot={null} />
                            </div>
                        </div>

                        <div className="-mt-12 flex flex-col gap-4 px-6">
                            <div className="flex items-end justify-between">
                                <AvatarProfilePhoto size="md" src={author.src} alt={author.name} />

                                <div className="flex gap-1 pb-3">
                                    <ButtonUtility size="sm" color="tertiary" tooltip="Share author" icon={Share04} />
                                    <ButtonUtility size="sm" color="tertiary" tooltip="Edit author" icon={Edit05} />
                                </div>
                            </div>

                            <div className="flex flex-col items-start gap-4">
                                <div className="flex min-w-0 flex-col gap-0.5">
                                    <p className="text-primary truncate text-lg font-semibold">{author.name}</p>
                                    <div className="flex items-center gap-2">
                                        <span className="text-tertiary text-sm">Author</span>
                                        <hr className="bg-border-primary h-3 w-px border-none" />
                                        <span className="text-tertiary text-sm">1988—</span>
                                    </div>
                                </div>

                                <dl className="flex items-center">
                                    {stats.map((stat, index) => (
                                        <div key={stat.label} className={cx("flex flex-col gap-0.5", index > 0 && "border-border-primary ms-4 border-s ps-4")}>
                                            <dt className="text-quaternary text-xs font-medium">{stat.label}</dt>
                                            <dd className="flex items-center gap-1.5">
                                                <stat.icon aria-hidden="true" className="text-fg-quaternary size-4" />
                                                <span className="text-primary text-md font-semibold">{stat.value}</span>
                                            </dd>
                                        </div>
                                    ))}
                                </dl>

                                <div className="flex gap-3">
                                    <Button color="secondary" size="sm" iconLeading={Copy01}>
                                        Copy link
                                    </Button>
                                    <Button color="secondary" size="sm">
                                        Author page
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <hr className="bg-border-secondary mx-6 h-px border-none" />

                    <div className="flex flex-col gap-6 px-6">
                        <div className="flex flex-col">
                            <p className="text-primary text-sm font-semibold">About</p>
                            <p className="text-tertiary mt-1 text-sm">
                                {author.name} writes about coastlines, weather and the slow work of paying attention. Their cottage on the eastern shore was
                                named a literary landmark in 2024.
                            </p>

                            <ul className="mt-4 flex flex-col gap-2">
                                <li className="text-tertiary flex gap-2 text-sm">
                                    <MarkerPin01 aria-hidden="true" className="text-fg-quaternary size-5 shrink-0" />
                                    Melbourne, Australia
                                </li>
                                <li className="text-tertiary flex gap-2 text-sm">
                                    <Link01 aria-hidden="true" className="text-fg-quaternary size-5 shrink-0" />
                                    proper.example
                                </li>
                            </ul>

                            <div className="mt-4 flex flex-wrap items-center gap-1">
                                <Badge size="sm" type="modern">
                                    Author
                                </Badge>
                                <Badge size="sm" type="modern">
                                    Naturalist
                                </Badge>
                                <Badge size="sm" type="modern">
                                    Non-fiction
                                </Badge>
                                <BadgeIcon size="sm" type="modern" icon={Plus} />
                            </div>
                        </div>

                        <div className="flex flex-col gap-4">
                            <p className="text-primary text-sm font-semibold">Notable works</p>

                            <ul className="flex flex-col gap-3">
                                {notableWorks.map((work) => (
                                    <li key={work.id}>
                                        <a
                                            href={`/cms/works/${work.id}`}
                                            className="outline-focus-ring flex w-full flex-row items-center gap-3 rounded-md focus-visible:outline-2 focus-visible:outline-offset-2"
                                        >
                                            <div className="bg-primary ring-primary shrink-0 rounded-md p-1 ring-1 ring-inset">
                                                <img
                                                    src={work.image.src}
                                                    alt=""
                                                    className="outline-secondary_alt aspect-[0.66] w-8 rounded-[2px] object-cover shadow-lg outline-1 -outline-offset-1"
                                                />
                                            </div>

                                            <div className="flex min-w-0 flex-1 flex-col">
                                                <div className="flex items-center">
                                                    <p className="text-secondary flex-1 truncate text-sm font-semibold">{work.title}</p>
                                                    <ChevronRight aria-hidden="true" className="text-fg-quaternary size-4 shrink-0 rtl:-scale-x-100" />
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

                            <div>
                                <Button color="link-color" size="sm" href="/cms/works">
                                    See all works (18)
                                </Button>
                            </div>
                        </div>
                    </div>
                </aside>
            </div>
        </main>
    </div>
);
