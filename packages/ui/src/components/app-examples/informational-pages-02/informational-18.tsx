"use client";

import type { ReactNode } from "react";
import { ArrowUpRight, Share04 } from "@properui/icons";
import { IMAGES, LOGOS, avatar } from "../../../utils/demo-assets";
import { Avatar } from "../../base/avatar/avatar";
import { AvatarProfilePhoto } from "../../base/avatar/avatar-profile-photo";
import { Button } from "../../base/buttons/button";
import { Dribbble, Figma, Instagram, LinkedIn, X } from "../../foundations/social-icons";
import { AppHeader, productNavItems } from "./shell.a";

const navItems = [...productNavItems.slice(0, 5), { label: "Designers", href: "/designers" }];

const designer = avatar(9);
const cover = IMAGES.landscape[6]!;

const socials = [
    { id: "x", label: "X", icon: X, href: "https://x.com" },
    { id: "linkedin", label: "LinkedIn", icon: LinkedIn, href: "https://linkedin.com" },
    { id: "dribbble", label: "Dribbble", icon: Dribbble, href: "https://dribbble.com" },
    { id: "instagram", label: "Instagram", icon: Instagram, href: "https://instagram.com" },
    { id: "figma", label: "Figma", icon: Figma, href: "https://figma.com" },
];

const experience = [
    { id: "lead", role: "Lead Product Designer", company: LOGOS[0]!, period: "May 2020 – Present" },
    { id: "product", role: "Product Designer", company: LOGOS[1]!, period: "Jan 2018 – May 2020" },
    { id: "ux", role: "UX Designer", company: LOGOS[2]!, period: "Mar 2017 – Jan 2018" },
    { id: "visual", role: "Visual Designer", company: LOGOS[3]!, period: "Mar 2017 – Jan 2018" },
];

const projects = [IMAGES.landscape[4]!, IMAGES.landscape[5]!, IMAGES.landscape[6]!, IMAGES.landscape[7]!];

const portfolioUrl = "proper.example";

const Detail = ({ label, children }: { label: string; children: ReactNode }) => (
    <div className="flex flex-col gap-2">
        <p className="text-tertiary text-sm font-medium">{label}</p>
        {children}
    </div>
);

const LocationValue = () => (
    <div className="flex items-center gap-2">
        <img src="/flags/AU.svg" alt="" className="size-5 rounded-full object-cover" />
        <p className="text-secondary text-md font-medium">Melbourne, Australia</p>
    </div>
);

/** Informational page 18 — a stacked designer profile with label columns, social links and a projects gallery. */
export const Informational18 = () => (
    <div className="bg-primary flex flex-col">
        <AppHeader activeUrl="/designers" items={navItems} />

        <main className="flex flex-1 flex-col gap-8 pb-12 lg:gap-12 lg:pb-24">
            <div className="bg-primary relative flex flex-col">
                <div className="px-1">
                    <img src={cover.src} alt="" className="h-40 w-full rounded-xl object-cover lg:h-60" />
                </div>

                <div className="max-w-container m-auto -mt-12 flex w-full flex-col gap-4 px-4 lg:-mt-10 lg:flex-row lg:gap-5 lg:px-8">
                    <AvatarProfilePhoto size="md" src={designer.src} alt={designer.alt} verified className="lg:hidden" />
                    <AvatarProfilePhoto size="lg" src={designer.src} alt={designer.alt} verified className="hidden lg:flex" />

                    <div className="flex flex-1 flex-col justify-between gap-4 lg:flex-row lg:pt-16">
                        <div className="flex flex-1 flex-col gap-0.5 lg:gap-1">
                            <h1 className="text-primary text-xl font-semibold">{designer.name}</h1>
                            <p className="text-tertiary text-md">{designer.email}</p>
                        </div>

                        <div className="flex gap-3">
                            <Button color="secondary" size="md" aria-label="Share profile" iconLeading={Share04} className="max-lg:hidden" />
                            <Button color="secondary" size="md">
                                View portfolio
                            </Button>
                            <Button color="primary" size="md">
                                Follow
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-container mx-auto flex w-full flex-col gap-y-6 px-4 lg:gap-y-8 lg:px-8">
                <div className="flex min-w-70 flex-col gap-6 lg:hidden">
                    <Detail label="Location">
                        <LocationValue />
                    </Detail>
                    <Detail label="Website">
                        <Button color="link-color" size="lg" href={`https://${portfolioUrl}`} iconTrailing={ArrowUpRight}>
                            {portfolioUrl}
                        </Button>
                    </Detail>
                    <Detail label="Portfolio">
                        <Button color="link-color" size="lg" href={`https://${portfolioUrl}/portfolio`} iconTrailing={ArrowUpRight}>
                            {designer.username}
                        </Button>
                    </Detail>
                    <Detail label="Email">
                        <Button color="link-color" size="lg" href={`mailto:${designer.email}`} iconTrailing={ArrowUpRight}>
                            {designer.email}
                        </Button>
                    </Detail>
                </div>

                <hr className="bg-border-secondary h-px w-full border-none" />

                <div className="flex flex-col gap-2 lg:flex-row lg:gap-8">
                    <div className="min-w-70">
                        <h2 className="text-secondary text-md font-medium lg:font-semibold">About me</h2>
                    </div>

                    <div className="flex w-full min-w-0 flex-1 flex-col gap-6 lg:gap-8">
                        <div className="flex flex-col gap-4 lg:gap-y-8">
                            <div className="flex flex-col justify-between gap-x-16 gap-y-6 lg:flex-row">
                                <div className="flex flex-col gap-y-5">
                                    <div className="flex flex-col gap-4">
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

                                    <div className="flex">
                                        <Button color="link-color" size="lg">
                                            Read more
                                        </Button>
                                    </div>
                                </div>

                                <ul className="flex gap-x-4 pe-9">
                                    {socials.map((social) => (
                                        <li key={social.id}>
                                            <a
                                                href={social.href}
                                                aria-label={social.label}
                                                className="outline-focus-ring text-fg-quaternary hover:text-fg-quaternary_hover rounded-xs focus-visible:outline-2 focus-visible:outline-offset-2"
                                            >
                                                <social.icon className="size-5" />
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <dl className="bg-secondary ring-secondary hidden w-full gap-14 overflow-auto rounded-xl px-6 py-5 ring-1 lg:flex">
                                <div className="flex flex-col gap-2 whitespace-nowrap">
                                    <dt className="text-tertiary text-sm font-medium">Location</dt>
                                    <dd>
                                        <LocationValue />
                                    </dd>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <dt className="text-tertiary text-sm font-medium">Website</dt>
                                    <dd>
                                        <Button color="link-color" size="lg" href={`https://${portfolioUrl}`} iconTrailing={ArrowUpRight}>
                                            {portfolioUrl}
                                        </Button>
                                    </dd>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <dt className="text-tertiary text-sm font-medium">Portfolio</dt>
                                    <dd>
                                        <Button color="link-color" size="lg" href={`https://${portfolioUrl}/portfolio`} iconTrailing={ArrowUpRight}>
                                            {designer.username}
                                        </Button>
                                    </dd>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <dt className="text-tertiary text-sm font-medium">Email</dt>
                                    <dd>
                                        <Button color="link-color" size="lg" href={`mailto:${designer.email}`} iconTrailing={ArrowUpRight}>
                                            {designer.email}
                                        </Button>
                                    </dd>
                                </div>
                            </dl>
                        </div>
                    </div>
                </div>

                <hr className="bg-border-secondary h-px w-full border-none" />

                <div className="flex flex-col gap-6 lg:flex-row lg:gap-8">
                    <div className="hidden min-w-70 flex-col gap-0.5 lg:flex lg:gap-0">
                        <h2 className="text-secondary lg:text-md text-lg font-semibold">Experience</h2>
                    </div>

                    <div className="grid w-full grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-6">
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

                <hr className="bg-border-secondary hidden h-px w-full border-none lg:block" />

                <div className="flex flex-col gap-6 lg:flex-row lg:gap-8">
                    <div className="mt-3 flex min-w-70 flex-col lg:mt-0 lg:gap-0">
                        <h2 className="text-secondary lg:text-md text-lg font-semibold">Projects</h2>
                        <p className="text-tertiary text-sm lg:hidden">Some of my recent work.</p>
                    </div>

                    <div className="grid w-full grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-6">
                        {projects.map((project, index) => (
                            <a
                                key={project.src}
                                href={`/designers/${designer.username.replace("@", "")}/project-${index + 1}`}
                                aria-label={`Project ${index + 1}`}
                            >
                                <img src={project.src} alt="" className="h-60 w-full rounded-xl object-cover lg:h-82" />
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    </div>
);
