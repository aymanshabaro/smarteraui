"use client";

import {
    Archive,
    BarChartSquare02,
    CheckDone01,
    CurrencyDollarCircle,
    Grid03,
    HomeLine,
    LayoutAlt01,
    LifeBuoy01,
    LineChartUp03,
    LinkExternal01,
    Package,
    Plus,
    Rows01,
    Settings01,
    Star01,
    User01,
    Users01,
    UsersPlus,
} from "@properui/icons";
import { IMAGES, LOGOS, avatar } from "../../../utils/demo-assets";
import type { NavItemType } from "../../application/app-navigation/config";
import { SidebarNavigationSimple } from "../../application/app-navigation/sidebar-navigation/sidebar-simple";
import { SectionHeader } from "../../application/section-headers/section-headers";
import { Tabs } from "../../application/tabs/tabs";
import { Avatar } from "../../base/avatar/avatar";
import { AvatarProfilePhoto } from "../../base/avatar/avatar-profile-photo";
import { BadgeWithDot } from "../../base/badges/badges";
import { Button } from "../../base/buttons/button";
import { DropdownIconSimple } from "../../base/dropdown/dropdown-icon-simple";

const navItems: NavItemType[] = [
    {
        label: "Home",
        href: "/",
        icon: HomeLine,
        items: [
            { label: "Overview", href: "/overview", icon: Grid03 },
            { label: "Products", href: "/products", icon: Package },
            { label: "Orders", href: "/orders", icon: CurrencyDollarCircle },
            { label: "Customers", href: "/customers", icon: Users01 },
        ],
    },
    {
        label: "Dashboard",
        href: "/dashboard",
        icon: BarChartSquare02,
        items: [
            { label: "Overview", href: "/dashboard/overview", icon: Grid03 },
            { label: "Notifications", href: "/dashboard/notifications", icon: LayoutAlt01, badge: 10 },
            { label: "Analytics", href: "/dashboard/analytics", icon: LineChartUp03 },
            { label: "Saved reports", href: "/dashboard/saved-reports", icon: Star01 },
        ],
    },
    {
        label: "Projects",
        href: "/projects",
        icon: Rows01,
        items: [
            { label: "View all", href: "/projects/all", icon: Rows01 },
            { label: "Personal", href: "/projects/personal", icon: User01 },
            { label: "Team", href: "/projects/team", icon: Users01 },
            { label: "Shared with me", href: "/projects/shared", icon: UsersPlus },
            { label: "Archive", href: "/projects/archive", icon: Archive },
        ],
    },
    {
        label: "Tasks",
        href: "/tasks",
        icon: CheckDone01,
        badge: 8,
        items: [
            { label: "My tasks", href: "/tasks/mine" },
            { label: "Assigned to me", href: "/tasks/assigned" },
            { label: "Completed", href: "/tasks/completed" },
            { label: "Upcoming", href: "/tasks/upcoming" },
        ],
    },
    {
        label: "Reporting",
        href: "/reporting",
        icon: LayoutAlt01,
        items: [
            { label: "Dashboard", href: "/reporting/dashboard" },
            { label: "Revenue", href: "/reporting/revenue" },
            { label: "Performance", href: "/reporting/performance" },
            { label: "Export data", href: "/reporting/export" },
        ],
    },
    {
        label: "Designers",
        href: "/designers",
        icon: Users01,
        items: [
            { label: "All designers", href: "/designers/all" },
            { label: "Popular", href: "/designers/popular" },
            { label: "Recently added", href: "/designers/recent" },
            { label: "Recommended", href: "/designers/recommended" },
        ],
    },
];

const footerItems: NavItemType[] = [
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

const designer = avatar(11);

const links = [
    { label: "Website", value: "avawright.com", href: "https://www.proper.example" },
    { label: "Portfolio", value: designer.username, href: "https://www.proper.example" },
    { label: "Email", value: "ava@proper.example", href: "mailto:ava@proper.example" },
];

const roles = [
    { id: "role-01", title: "Lead Product Designer", company: LOGOS[0]!, period: "May 2020 – Present" },
    { id: "role-02", title: "Product Designer", company: LOGOS[1]!, period: "Jan 2018 – May 2020" },
    { id: "role-03", title: "UX Designer", company: LOGOS[2]!, period: "Mar 2017 – Jan 2018" },
];

const projectTabs = [
    { id: "web-design", label: "Web design" },
    { id: "product-design", label: "Product design" },
    { id: "branding", label: "Branding" },
];

const projectImages = IMAGES.landscape.slice(0, 4);

/** Informational page 17 — designer profile with a cover photo, experience cards and a project gallery. */
export const Informational17 = () => (
    <div className="bg-primary flex flex-col lg:flex-row">
        <SidebarNavigationSimple activeUrl="/designers/all" items={navItems} footerItems={footerItems} />

        <main className="flex min-w-0 flex-1 flex-col gap-8 pb-12 lg:gap-12">
            <div className="bg-primary relative flex flex-col">
                <div className="px-1 lg:pt-1">
                    <img src={IMAGES.landscape[5]!.src} alt="" className="h-40 w-full rounded-xl object-cover lg:h-60" />
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

            <div className="flex flex-col gap-6 px-4 lg:gap-8 lg:px-8">
                <SectionHeader
                    size="sm"
                    title="Experience"
                    description="I specialise in UX/UI design, brand strategy, and Webflow development."
                    actions={<DropdownIconSimple />}
                />

                <div className="flex flex-col gap-8 lg:flex-row lg:gap-16">
                    <div className="flex max-w-160 flex-1 flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <h3 className="text-primary text-md font-semibold">About me</h3>
                            <div className="flex flex-col gap-4">
                                <p className="text-tertiary text-md">
                                    I&apos;m a Product Designer based in Melbourne, Australia. I enjoy working on product design, design systems, and Webflow
                                    projects.
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

                    <dl className="flex min-w-70 flex-col gap-6 lg:grid lg:h-max lg:grid-cols-2">
                        <div className="flex flex-col gap-2">
                            <dt className="text-tertiary text-sm font-medium">Location</dt>
                            <dd className="flex items-center gap-2">
                                <img src="/flags/AU.svg" alt="Australia" className="size-5 rounded-full" />
                                <p className="text-secondary text-md font-medium">Melbourne, AU</p>
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
                </div>

                <ul className="grid w-full grid-cols-1 gap-5 lg:grid-cols-3">
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

                <SectionHeader
                    size="sm"
                    title="Projects"
                    actions={
                        <Button color="link-color" size="md" href="/projects">
                            View all
                        </Button>
                    }
                >
                    <Tabs defaultSelectedKey="web-design">
                        <Tabs.List type="button-border" items={projectTabs}>
                            {(tab) => <Tabs.Item {...tab} />}
                        </Tabs.List>
                        {projectTabs.map((tab) => (
                            <Tabs.Panel key={tab.id} id={tab.id} />
                        ))}
                    </Tabs>
                </SectionHeader>

                <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
                    {projectImages.map((image, index) => (
                        <li key={image.src}>
                            <img
                                src={image.src}
                                alt={`Project ${index + 1}`}
                                className="ring-secondary aspect-4/3 w-full rounded-xl object-cover ring-1 ring-inset"
                            />
                        </li>
                    ))}
                </ul>
            </div>
        </main>
    </div>
);
