"use client";

import type { ReactNode } from "react";
import { ArrowUpRight, Copy01, Plus } from "@properui/icons";
import { IMAGES, LOGOS, avatar } from "../../../utils/demo-assets";
import { SectionHeader } from "../../application/section-headers/section-headers";
import { Tabs } from "../../application/tabs/tabs";
import { Avatar } from "../../base/avatar/avatar";
import { AvatarProfilePhoto } from "../../base/avatar/avatar-profile-photo";
import { Button } from "../../base/buttons/button";
import { DropdownIconSimple } from "../../base/dropdown/dropdown-icon-simple";
import { InputBase } from "../../base/input/input";
import { InputGroup } from "../../base/input/input-group";
import { NativeSelect } from "../../base/select/select-native";
import { AppHeader, productNavItems } from "./shell.a";

const navItems = [...productNavItems.slice(0, 5), { label: "Designers", href: "/designers" }];

const designer = avatar(4);
const cover = IMAGES.landscape[5]!;

const projectTabs = [
    { id: "all", label: "View all" },
    { id: "web-design", label: "Web design" },
    { id: "product-design", label: "Product design" },
    { id: "branding", label: "Branding" },
];

const experience = [
    { id: "lead", role: "Lead Product Designer", company: LOGOS[4]!, period: "May 2020 – Present" },
    { id: "product", role: "Product Designer", company: LOGOS[1]!, period: "Jan 2018 – May 2020" },
    { id: "ux", role: "UX Designer", company: LOGOS[0]!, period: "Mar 2017 – Jan 2018" },
    { id: "visual", role: "Visual Designer", company: LOGOS[2]!, period: "Apr 2015 – Mar 2017" },
];

const projects = [IMAGES.landscape[0]!, IMAGES.landscape[1]!, IMAGES.landscape[2]!, IMAGES.landscape[3]!];

const DetailLink = ({ label, children }: { label: string; children: ReactNode }) => (
    <div className="flex flex-col gap-2">
        <p className="text-tertiary text-sm font-medium">{label}</p>
        {children}
    </div>
);

/** The contact details card: location, website, portfolio, email and a copyable profile link. */
const DetailsCard = ({ className }: { className?: string }) => (
    <div className={className}>
        <div className="bg-primary ring-secondary flex flex-col gap-y-6 rounded-xl p-6 shadow-xs ring-1">
            <DetailLink label="Location">
                <div className="flex items-center gap-2">
                    <img src="/flags/AU.svg" alt="" className="size-5 rounded-full object-cover" />
                    <p className="text-secondary text-md font-medium">Melbourne, Australia</p>
                </div>
            </DetailLink>

            <DetailLink label="Website">
                <Button color="link-color" size="lg" href="https://proper.example" iconTrailing={ArrowUpRight}>
                    proper.example
                </Button>
            </DetailLink>

            <DetailLink label="Portfolio">
                <Button color="link-color" size="lg" href="https://proper.example/portfolio" iconTrailing={ArrowUpRight}>
                    {designer.username}
                </Button>
            </DetailLink>

            <DetailLink label="Email">
                <Button color="link-color" size="lg" href={`mailto:${designer.email}`} iconTrailing={ArrowUpRight}>
                    {designer.email}
                </Button>
            </DetailLink>

            <InputGroup
                label="Profile URL"
                trailingAddon={
                    <Button color="secondary" size="md" iconLeading={Copy01}>
                        Copy
                    </Button>
                }
            >
                <InputBase defaultValue={`proper.example/designers/${designer.username.replace("@", "")}`} />
            </InputGroup>
        </div>
    </div>
);

/** Informational page 17 — a designer profile with a cover photo, experience cards and a projects gallery. */
export const Informational17 = () => (
    <div className="bg-primary flex flex-col">
        <AppHeader activeUrl="/designers" items={navItems} />

        <main className="flex flex-1 flex-col gap-8 pb-12 lg:gap-12">
            <div className="bg-primary relative flex flex-col">
                <div className="px-1">
                    <img src={cover.src} alt="" className="h-40 w-full rounded-xl object-cover lg:h-60" />
                </div>

                <div className="m-auto -mt-12 flex w-full max-w-270 flex-col items-center gap-4 px-4 lg:-mt-16 lg:gap-5 lg:px-0">
                    <AvatarProfilePhoto size="md" src={designer.src} alt={designer.alt} verified className="lg:hidden" />
                    <AvatarProfilePhoto size="lg" src={designer.src} alt={designer.alt} verified className="hidden lg:flex" />

                    <div className="flex w-full flex-1 flex-col items-center gap-4 md:gap-5">
                        <div className="flex flex-1 flex-col items-center gap-0.5 lg:gap-1">
                            <h1 className="text-primary text-xl font-semibold">{designer.name}</h1>
                            <p className="text-tertiary text-md">{designer.username}</p>
                        </div>

                        <div className="flex w-full gap-3 lg:w-auto">
                            <Button color="secondary" size="md" className="max-md:flex-1">
                                View portfolio
                            </Button>
                            <Button color="primary" size="md" className="max-md:flex-1" iconLeading={Plus}>
                                Follow
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-container mx-auto flex w-full flex-col gap-x-16 gap-y-12 px-4 lg:flex-row lg:px-8">
                <div className="flex flex-1 flex-col gap-y-8 lg:gap-y-12">
                    <div className="flex flex-col gap-y-8">
                        <div className="flex flex-col gap-6">
                            <SectionHeader
                                size="sm"
                                title="Experience"
                                description="I specialize in UX/UI design, brand strategy, and Webflow development."
                                actions={<DropdownIconSimple />}
                            />

                            <div className="flex flex-col gap-y-3">
                                <div className="flex flex-col gap-2">
                                    <h3 className="text-primary text-md font-medium">About me</h3>
                                    <div className="flex max-w-160 flex-col gap-4">
                                        <p className="text-tertiary text-md">
                                            I&rsquo;m a Product Designer based in Melbourne, Australia. I enjoy working on product design, design systems, and
                                            Webflow projects, but I don&rsquo;t take myself too seriously.
                                        </p>
                                        <p className="text-tertiary text-md">
                                            I&rsquo;ve worked with some of the world&rsquo;s most exciting companies. I&rsquo;m passionate about helping
                                            startups grow, improve their UX and customer experience, and to raise venture capital through good design.
                                        </p>
                                        <p className="text-tertiary text-md">My work has been featured in a number of design publications and galleries.</p>
                                    </div>
                                </div>

                                <div>
                                    <Button color="link-color" size="lg">
                                        Read more
                                    </Button>
                                </div>
                            </div>
                        </div>

                        <DetailsCard className="lg:hidden" />

                        <div className="grid grid-cols-1 gap-5 lg:gap-6 xl:grid-cols-2">
                            {experience.map((entry) => (
                                <div key={entry.id} className="ring-secondary flex flex-col rounded-xl shadow-xs ring-1 ring-inset lg:pb-2">
                                    <div className="border-secondary flex flex-col gap-6 border-b px-4 py-5 lg:px-5">
                                        <div className="flex items-center gap-3">
                                            <Avatar src={entry.company.src} alt="" size="lg" />
                                            <div className="flex flex-col">
                                                <h3 className="text-primary text-md font-semibold">{entry.role}</h3>
                                                <p className="text-tertiary text-sm">{entry.company.name}</p>
                                            </div>
                                        </div>
                                        <p className="text-tertiary text-sm">{entry.period}</p>
                                    </div>

                                    <div className="flex justify-end px-4 py-3 lg:px-6 lg:py-4">
                                        <Button color="secondary" size="md">
                                            View project
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col gap-y-8">
                        <SectionHeader size="sm" divider={false} title="Projects" actions={<DropdownIconSimple />}>
                            <div className="w-full md:hidden">
                                <NativeSelect
                                    aria-label="Project categories"
                                    defaultValue="all"
                                    options={projectTabs.map((tab) => ({ label: tab.label, value: tab.id }))}
                                />
                            </div>

                            <div className="hidden w-full flex-col md:flex">
                                <Tabs defaultSelectedKey="all">
                                    <Tabs.List fullWidth type="underline" items={projectTabs}>
                                        {(tab) => <Tabs.Item {...tab} />}
                                    </Tabs.List>
                                    {projectTabs.map((tab) => (
                                        <Tabs.Panel key={tab.id} id={tab.id} />
                                    ))}
                                </Tabs>
                            </div>
                        </SectionHeader>

                        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-6">
                            {projects.map((project, index) => (
                                <a
                                    key={project.src}
                                    href={`/designers/${designer.username.replace("@", "")}/project-${index + 1}`}
                                    aria-label={`Project ${index + 1}`}
                                >
                                    <img src={project.src} alt="" className="h-60 w-full rounded-xl object-cover lg:h-74" />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                <DetailsCard className="hidden max-w-90 min-w-90 lg:block" />
            </div>
        </main>
    </div>
);
