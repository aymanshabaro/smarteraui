"use client";

import { ArrowUpRight, FilterLines, PlusCircle, UserPlus01 } from "@smarteraui/icons";
import { FeaturedCardImage } from "@/components/application/app-navigation/base-components/featured-cards";
import { SidebarNavigationSimple } from "@/components/application/app-navigation/sidebar-navigation/sidebar-simple";
import { DateRangePicker } from "@/components/application/date-picker/date-range-picker";
import { SectionHeader } from "@/components/application/section-headers/section-headers";
import { Avatar } from "@/components/base/avatar/avatar";
import { Badge } from "@/components/base/badges/badges";
import { Button } from "@/components/base/buttons/button";
import { Dropdown } from "@/components/base/dropdown/dropdown";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";
import { cx } from "@/utils/cx";
import { AVATARS, IMAGES } from "@/utils/demo-assets";
import { RangeTabs, TrendAreaChart, navFooterItems, navItemsSimple, styles } from "./dashboards-shared";

const noop = () => {};

const summaryMetrics = [
    { label: "Total members", value: "4,862", change: "9.2%" },
    { label: "Paid members", value: "2,671", change: "6.6%" },
    { label: "Email open rate", value: "82%", change: "8.1%" },
];

const quickActions = [
    { icon: UserPlus01, title: "Create your first member", description: "Add yourself or import from CSV" },
    { icon: PlusCircle, title: "Create a new post", description: "Dive into the editor and start creating" },
];

const posts = [
    {
        title: "UX review presentations",
        excerpt: "How do you create compelling presentations that wow your colleagues and impress your managers?",
        image: IMAGES.landscape[0],
        author: AVATARS[0],
        date: "20 Jan 2026",
        tags: ["Design", "Research"],
    },
    {
        title: "Migrating to a new design system",
        excerpt: "Moving your team to a shared component library takes planning. Here is the playbook we used.",
        image: IMAGES.landscape[1],
        author: AVATARS[1],
        date: "19 Jan 2026",
        tags: ["Product", "Tools"],
    },
];

const topMembers = [
    { person: AVATARS[1], since: "Feb 2026", isOnline: true },
    { person: AVATARS[2], since: "Jan 2026", isOnline: true },
    { person: AVATARS[3], since: "Mar 2026", isOnline: true },
    { person: AVATARS[4], since: "Feb 2026", isOnline: false },
    { person: AVATARS[5], since: "Mar 2026", isOnline: false },
    { person: AVATARS[7], since: "Apr 2026", isOnline: false },
    { person: AVATARS[6], since: "Apr 2026", isOnline: false },
    { person: AVATARS[8], since: "Jan 2026", isOnline: false },
    { person: AVATARS[9], since: "Feb 2026", isOnline: false },
    { person: AVATARS[10], since: "Mar 2026", isOnline: false },
];

const ChangeIndicator = ({ children }: { children: string }) => (
    <span className="flex items-center gap-1">
        <ArrowUpRight aria-hidden="true" className="text-fg-success-secondary size-4" />
        <span className="text-success-primary text-sm font-medium">{children}</span>
    </span>
);

/** Dashboard 01 — an analytics overview with a headline MRR chart, quick actions and recent posts. */
export const Dashboard01 = () => {
    return (
        <div className={styles.page}>
            <SidebarNavigationSimple
                activeUrl="/dashboard"
                items={navItemsSimple}
                footerItems={navFooterItems}
                featureCard={
                    <FeaturedCardImage
                        title="New features available!"
                        description="Check out the new dashboard view. Pages now load faster."
                        confirmLabel="What's new?"
                        imageSrc={IMAGES.landscape[2].src}
                        imageAlt=""
                        onDismiss={noop}
                        onConfirm={noop}
                    />
                }
            />

            <main className={styles.main}>
                <div className="flex flex-col gap-8">
                    <div className={cx("flex flex-col gap-5", styles.gutter)}>
                        <h1 className={styles.pageTitle}>Dashboard</h1>

                        <div className="flex flex-wrap items-center gap-3">
                            <RangeTabs label="Reporting period" />

                            <div className="ms-auto flex shrink-0 items-center gap-3">
                                <div className="max-md:hidden">
                                    <DateRangePicker />
                                </div>
                                <Button color="secondary" size="md" iconLeading={FilterLines}>
                                    Filters
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div className={cx("flex flex-col gap-6 lg:flex-row lg:gap-8", styles.gutter)}>
                        <div className="flex flex-1 flex-col gap-6 lg:flex-row lg:flex-wrap lg:items-start lg:gap-x-8 lg:gap-y-4">
                            <div className="flex flex-col gap-2">
                                <p className={styles.caption}>MRR</p>
                                <div className="flex items-start gap-2">
                                    <div className="flex items-start gap-0.5">
                                        <span className="text-primary pt-0.5 text-xl font-medium">$</span>
                                        <span className="text-display-md text-primary font-semibold">18,880</span>
                                    </div>
                                    <ChangeIndicator>7.4%</ChangeIndicator>
                                </div>
                            </div>

                            <TrendAreaChart label="Monthly recurring revenue over the last 12 months" className="h-50 lg:h-60 lg:min-w-[480px] lg:flex-1" />
                        </div>

                        <dl className="flex w-full flex-col gap-5 lg:max-w-60">
                            {summaryMetrics.map((metric) => (
                                <div key={metric.label} className="flex flex-col gap-2">
                                    <dt className={styles.caption}>{metric.label}</dt>
                                    <dd className="flex items-start gap-2">
                                        <span className="text-display-sm text-primary font-semibold">{metric.value}</span>
                                        <ChangeIndicator>{metric.change}</ChangeIndicator>
                                    </dd>
                                </div>
                            ))}
                        </dl>
                    </div>

                    <div className={cx("flex flex-col gap-6", styles.gutter)}>
                        <SectionHeader
                            title="Start creating content"
                            actions={
                                <Dropdown.Root>
                                    <Dropdown.DotsButton />
                                    <Dropdown.Popover className="w-40">
                                        <Dropdown.Menu>
                                            <Dropdown.Item>View guide</Dropdown.Item>
                                            <Dropdown.Item>Hide section</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown.Popover>
                                </Dropdown.Root>
                            }
                        />

                        <div className="flex flex-col gap-8 lg:flex-row lg:gap-8">
                            <div className="flex min-w-0 flex-1 flex-col gap-8">
                                <div className="flex flex-wrap gap-5 lg:gap-6">
                                    {quickActions.map((action) => (
                                        <button
                                            key={action.title}
                                            type="button"
                                            className="bg-primary ring-secondary outline-focus-ring flex min-w-[280px] flex-1 cursor-pointer gap-3 rounded-xl p-4 shadow-xs ring-1 ring-inset focus-visible:outline-2 focus-visible:outline-offset-2"
                                        >
                                            <FeaturedIcon size="lg" theme="modern" color="gray" icon={action.icon} />
                                            <span className="flex min-w-0 flex-1 flex-col items-start gap-0.5 text-start">
                                                <span className="text-secondary text-md font-semibold">{action.title}</span>
                                                <span className="text-tertiary max-w-full truncate text-sm">{action.description}</span>
                                            </span>
                                        </button>
                                    ))}
                                </div>

                                <div className="flex flex-col gap-6">
                                    <SectionHeader
                                        title="Recent posts"
                                        actions={
                                            <Dropdown.Root>
                                                <Dropdown.DotsButton />
                                                <Dropdown.Popover className="w-40">
                                                    <Dropdown.Menu>
                                                        <Dropdown.Item>View all posts</Dropdown.Item>
                                                        <Dropdown.Item>New post</Dropdown.Item>
                                                    </Dropdown.Menu>
                                                </Dropdown.Popover>
                                            </Dropdown.Root>
                                        }
                                    />

                                    <div className="flex flex-wrap gap-6">
                                        {posts.map((post) => (
                                            <article key={post.title} className="flex min-w-[280px] flex-1 flex-col gap-4">
                                                <img src={post.image.src} alt="" className="aspect-[1.5] w-full rounded-2xl object-cover" />

                                                <div className="flex flex-col gap-4">
                                                    <div className="flex flex-col items-start gap-2">
                                                        <p className="text-tertiary text-sm font-medium">
                                                            {post.author.name} <span aria-hidden="true">•</span> {post.date}
                                                        </p>
                                                        <h3 className="text-primary text-lg font-semibold">{post.title}</h3>
                                                        <p className="text-tertiary text-md">{post.excerpt}</p>
                                                    </div>

                                                    <div className="flex gap-2">
                                                        {post.tags.map((tag) => (
                                                            <Badge key={tag} size="sm" color="brand">
                                                                {tag}
                                                            </Badge>
                                                        ))}
                                                    </div>
                                                </div>
                                            </article>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="flex w-full shrink-0 flex-col gap-6 lg:w-60">
                                <p className="text-secondary hidden text-sm font-medium lg:block">Top members</p>

                                <div className="lg:hidden">
                                    <SectionHeader title="Top members" />
                                </div>

                                <ul className="flex flex-col gap-5">
                                    {topMembers.map((member) => (
                                        <li key={member.person.username} className="flex items-center gap-3">
                                            <Avatar size="md" src={member.person.src} alt="" status={member.isOnline ? "online" : undefined} />
                                            <div className="min-w-0 flex-1">
                                                <p className="text-secondary truncate text-sm font-medium">{member.person.name}</p>
                                                <p className="text-tertiary truncate text-sm">Member since {member.since}</p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};
