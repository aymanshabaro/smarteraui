"use client";

import type { FC } from "react";
import { BarChartSquare02, ClockRewind, HomeLine, LayoutAlt01, LinkExternal01, Plus, Rows01, Settings01, Star01, Users01 } from "@smarteraui/icons";
import type { NavItemType } from "@/components/application/app-navigation/config";
import { SidebarNavigationSlim } from "@/components/application/app-navigation/sidebar-navigation/sidebar-slim";
import { Avatar } from "@/components/base/avatar/avatar";
import { AvatarProfilePhoto } from "@/components/base/avatar/avatar-profile-photo";
import { Button } from "@/components/base/buttons/button";
import { DropdownIconSimple } from "@/components/base/dropdown/dropdown-icon-simple";
import { IMAGES, LOGOS, avatar } from "@/utils/demo-assets";

const navItems: (NavItemType & { icon: FC<{ className?: string }> })[] = [
    { label: "Home", href: "/", icon: HomeLine },
    {
        label: "Designers",
        href: "/designers",
        icon: Users01,
        items: [
            { label: "All designers", href: "/designers/all", icon: Users01 },
            { label: "New profiles", href: "/designers/new", icon: Plus, badge: 10 },
            { label: "Trending", href: "/designers/trending", icon: BarChartSquare02 },
            { label: "Popular", href: "/designers/popular", icon: Star01 },
        ],
    },
    { label: "Dashboard", href: "/dashboard", icon: BarChartSquare02 },
    { label: "Projects", href: "/projects", icon: Rows01 },
    { label: "Collections", href: "/collections", icon: LayoutAlt01 },
    { label: "Recent", href: "/recent", icon: ClockRewind },
];

const footerItems: (NavItemType & { icon: FC<{ className?: string }> })[] = [
    { label: "Support", href: "/support", icon: LayoutAlt01 },
    { label: "Settings", href: "/settings", icon: Settings01 },
];

const designer = avatar(2);

const links = [
    { label: "Website", value: "lanasteiner.com", href: "https://www.smartera.com" },
    { label: "Portfolio", value: designer.username, href: "https://www.smartera.com" },
    { label: "Email", value: designer.email, href: `mailto:${designer.email}` },
];

const roles = [
    { id: "role-01", title: "Lead Product Designer", company: LOGOS[0]!, period: "May 2020 – Present" },
    { id: "role-02", title: "Product Designer", company: LOGOS[1]!, period: "Jan 2018 – May 2020" },
    { id: "role-03", title: "UX Designer", company: LOGOS[2]!, period: "Mar 2017 – Jan 2018" },
    { id: "role-04", title: "Visual Designer", company: LOGOS[3]!, period: "Apr 2015 – Mar 2017" },
];

const projectImages = IMAGES.landscape.slice(0, 4);

/** Informational page 18 — designer profile with a details column, experience grid and recent work. */
export const Informational18 = () => (
    <div className="bg-primary flex flex-col lg:flex-row">
        <SidebarNavigationSlim activeUrl="/designers/all" items={navItems} footerItems={footerItems} />

        <main className="flex min-w-0 flex-1 flex-col gap-8 pb-12 lg:gap-12">
            <div className="bg-primary relative flex flex-col">
                <div className="px-1 lg:pt-1">
                    <img src={IMAGES.landscape[6]!.src} alt="" className="h-40 w-full rounded-xl object-cover lg:h-60" />
                </div>

                <div className="m-auto -mt-12 flex w-full flex-col gap-4 px-4 lg:-mt-10 lg:flex-row lg:gap-5 lg:px-8">
                    <AvatarProfilePhoto verified size="md" src={designer.src} alt={designer.name} className="lg:hidden" />
                    <AvatarProfilePhoto verified size="lg" src={designer.src} alt={designer.name} className="hidden lg:flex" />

                    <div className="flex flex-1 flex-col justify-between gap-4 lg:flex-row lg:pt-16">
                        <div className="flex flex-1 flex-col gap-0.5 lg:gap-1">
                            <h1 className="text-primary text-xl font-semibold">{designer.name}</h1>
                            <p className="text-tertiary text-md">I&apos;m a Product Designer based in Melbourne.</p>
                        </div>

                        <div className="flex gap-3">
                            <div className="max-lg:hidden">
                                <DropdownIconSimple />
                            </div>
                            <Button color="secondary" size="md">
                                View portfolio
                            </Button>
                            <Button color="primary" size="md" iconLeading={Plus}>
                                Follow
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-8 px-4 lg:gap-5 lg:px-8">
                <div className="flex flex-col gap-6 lg:flex-row lg:gap-8">
                    <dl className="flex min-w-70 flex-col gap-6">
                        <div className="flex flex-col gap-2">
                            <dt className="text-tertiary text-sm font-medium">Location</dt>
                            <dd className="flex items-center gap-2">
                                <img src="/flags/AU.svg" alt="Australia" className="size-5 rounded-full" />
                                <p className="text-secondary text-md font-medium">Melbourne, Australia</p>
                            </dd>
                        </div>

                        {links.map((link) => (
                            <div key={link.label} className="flex flex-col gap-2">
                                <dt className="text-tertiary text-sm font-medium">{link.label}</dt>
                                <dd>
                                    <Button color="link-color" size="md" href={link.href} iconTrailing={LinkExternal01}>
                                        {link.value}
                                    </Button>
                                </dd>
                            </div>
                        ))}
                    </dl>

                    <hr className="bg-border-secondary h-px w-full border-none lg:hidden" />

                    <div className="flex w-full flex-col gap-6 lg:gap-8">
                        <div className="flex max-w-160 flex-col gap-4">
                            <div className="flex flex-col gap-2">
                                <h2 className="text-primary text-md font-semibold">About me</h2>
                                <div className="flex flex-col gap-4">
                                    <p className="text-tertiary text-md">
                                        I&apos;m a Product Designer based in Melbourne, Australia. I enjoy working on product design, design systems, and
                                        Webflow projects, but I don&apos;t take myself too seriously.
                                    </p>
                                    <p className="text-tertiary text-md">
                                        I&apos;ve worked with some of the world&apos;s most exciting companies. I&apos;m passionate about helping startups grow,
                                        improve their UX and customer experience, and raise venture capital through good design.
                                    </p>
                                    <p className="text-tertiary text-md">
                                        My work has been featured in a handful of design publications, galleries and newsletters over the past few years.
                                    </p>
                                </div>
                            </div>

                            <div>
                                <Button color="link-color" size="sm">
                                    Read more
                                </Button>
                            </div>
                        </div>

                        <hr className="bg-border-secondary h-px w-full border-none lg:hidden" />

                        <ul className="grid w-full grid-cols-1 gap-5 lg:grid-cols-2">
                            {roles.map((role) => (
                                <li key={role.id} className="ring-secondary flex flex-col rounded-xl shadow-xs ring-1 ring-inset">
                                    <div className="border-secondary flex flex-col gap-6 border-b px-4 py-5 lg:px-5">
                                        <div className="flex items-center gap-3">
                                            <Avatar size="lg" src={role.company.src} alt={role.company.name} />
                                            <div className="flex flex-col">
                                                <p className="text-primary text-md font-semibold">{role.title}</p>
                                                <p className="text-tertiary text-sm">{role.company.name}</p>
                                            </div>
                                        </div>
                                        <p className="text-tertiary text-sm">{role.period}</p>
                                    </div>

                                    <div className="flex justify-end px-4 py-3 lg:px-6 lg:py-4">
                                        <Button color="link-color" size="sm" href={`/projects/${role.id}`}>
                                            View project
                                        </Button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <hr className="bg-border-secondary hidden h-px w-full border-none lg:block" />

                <div className="flex flex-col gap-6 lg:flex-row lg:gap-8">
                    <div className="flex min-w-70 flex-col gap-0.5 lg:gap-0">
                        <h2 className="text-secondary lg:text-md text-lg font-semibold">Projects</h2>
                        <p className="text-tertiary lg:text-md text-sm">Some of my recent work.</p>
                    </div>

                    <ul className="grid w-full grid-cols-1 gap-5 lg:grid-cols-2">
                        {projectImages.map((image, index) => (
                            <li key={image.src}>
                                <a
                                    href={`/projects/project-0${index + 1}`}
                                    className="outline-focus-ring block focus-visible:outline-2 focus-visible:outline-offset-2"
                                >
                                    <img src={image.src} alt={`Project ${index + 1}`} className="h-60 w-full rounded-xl object-cover lg:h-64" />
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </main>
    </div>
);
