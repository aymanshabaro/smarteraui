"use client";

import { ArrowUpRight, Edit05, UserPlus01 } from "@smarteraui/icons";
import { DateRangePicker } from "@/components/application/date-picker/date-range-picker";
import { MetricChangeIndicator } from "@/components/application/metrics/metrics-base";
import { SectionHeader } from "@/components/application/section-headers/section-headers";
import { Button } from "@/components/base/buttons/button";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";
import { IMAGES, avatar } from "@/utils/demo-assets";
import { TrendChart } from "./charts.a";
import { topMembers, trendSeries } from "./data.a";
import { DashboardHeader, DashboardMain, DashboardSection, subNavItems } from "./shell.a";
import { FiltersButton, PanelMenu, PeriodTabs, PersonList } from "./widgets.a";

const summary = [
    { label: "Total members", value: "4,862", change: "9.2%" },
    { label: "Paid members", value: "2,671", change: "6.6%" },
    { label: "Email open rate", value: "82%", change: "8.1%" },
];

const quickActions = [
    { icon: UserPlus01, title: "Create your first member", description: "Add yourself or import from CSV" },
    { icon: Edit05, title: "Create a new post", description: "Dive into the editor and start creating" },
];

const posts = [
    {
        title: "Building your API Stack",
        excerpt: "The rise of RESTful APIs has been met by a rise in tools for creating, testing, and managing them.",
        author: avatar(2),
        date: "18 Jan 2026",
        image: IMAGES.landscape[0],
    },
    {
        title: "Collaboration = better designer",
        excerpt: "Collaboration can make our teams stronger, and our individual designs better.",
        author: avatar(5),
        date: "14 Jan 2026",
        image: IMAGES.landscape[1],
    },
];

/** Analytics dashboard: MRR headline chart, onboarding prompts, recent posts and a top-members rail. */
export const Dashboard01 = () => (
    <div className="bg-primary">
        <DashboardHeader activeUrl="/dashboard/overview" subItems={subNavItems} />

        <DashboardMain>
            <DashboardSection className="gap-5">
                <h1 className="text-primary text-xl font-semibold">Welcome back, {avatar(0).name.split(" ")[0]}</h1>

                <div className="flex gap-3 lg:justify-between">
                    <PeriodTabs />

                    <div className="flex gap-3">
                        <div className="max-lg:hidden">
                            <DateRangePicker size="md" />
                        </div>
                        <div className="max-md:hidden">
                            <FiltersButton />
                        </div>
                    </div>
                </div>
            </DashboardSection>

            <DashboardSection className="gap-6 lg:flex-row lg:gap-8">
                <div className="flex flex-col gap-2">
                    <p className="text-tertiary text-sm font-medium">MRR</p>
                    <div className="flex items-center gap-4">
                        <div className="flex items-start gap-0.5">
                            <span className="text-primary pt-0.5 text-xl font-medium">$</span>
                            <span className="text-display-md text-primary font-semibold">18,880</span>
                        </div>
                        <MetricChangeIndicator>7.4%</MetricChangeIndicator>
                    </div>
                </div>

                <TrendChart
                    className="h-50 flex-1 lg:h-60"
                    data={trendSeries}
                    xKey="month"
                    verticalGrid
                    series={[
                        { key: "A", name: "This year" },
                        { key: "B", name: "Last year" },
                    ]}
                />

                <dl className="flex w-full flex-col gap-5 lg:max-w-60">
                    {summary.map((item) => (
                        <div key={item.label} className="flex flex-col gap-2">
                            <dt className="text-tertiary text-sm font-medium">{item.label}</dt>
                            <dd className="flex items-center gap-4">
                                <span className="text-display-sm text-primary font-semibold">{item.value}</span>
                                <MetricChangeIndicator>{item.change}</MetricChangeIndicator>
                            </dd>
                        </div>
                    ))}
                </dl>
            </DashboardSection>

            <DashboardSection className="gap-6">
                <SectionHeader size="sm" title="Start creating content" actions={<PanelMenu />} />

                <div className="flex flex-col gap-8 lg:flex-row">
                    <div className="flex flex-1 flex-col gap-8">
                        <div className="flex flex-col gap-5 md:flex-row md:flex-wrap lg:gap-6">
                            {quickActions.map((action) => (
                                <button
                                    key={action.title}
                                    type="button"
                                    className="bg-primary ring-secondary outline-focus-ring hover:bg-primary_hover flex flex-1 gap-3 rounded-xl p-4 text-start shadow-xs ring-1 ring-inset focus-visible:outline-2 focus-visible:outline-offset-2 md:min-w-80"
                                >
                                    <FeaturedIcon className="max-lg:hidden" size="lg" theme="dark" color="brand" icon={action.icon} />
                                    <FeaturedIcon className="lg:hidden" size="md" theme="dark" color="brand" icon={action.icon} />

                                    <div className="flex min-w-0 flex-1 flex-col items-start gap-0.5">
                                        <p className="text-secondary text-md font-semibold">{action.title}</p>
                                        <p className="text-tertiary max-w-full truncate text-sm">{action.description}</p>
                                    </div>
                                </button>
                            ))}
                        </div>

                        <div className="flex flex-col gap-6">
                            <SectionHeader size="sm" title="Recent posts" actions={<PanelMenu />} />

                            <div className="flex flex-col gap-6 md:flex-row md:flex-wrap">
                                {posts.map((post) => (
                                    <article key={post.title} className="flex flex-1 flex-col gap-4 md:min-w-80">
                                        <div className="relative">
                                            <img src={post.image.src} alt={post.title} className="aspect-3/2 w-full rounded-lg object-cover" />

                                            <div className="bg-alpha-white/30 absolute inset-x-0 bottom-0 flex items-start justify-between rounded-b-lg p-4 backdrop-blur-md md:p-5">
                                                <div>
                                                    <p className="text-sm font-semibold text-white">{post.author.name}</p>
                                                    <p className="text-sm text-white">{post.date}</p>
                                                </div>
                                                <p className="text-sm font-semibold text-white">Design</p>
                                            </div>
                                        </div>

                                        <div className="flex flex-col items-start gap-5">
                                            <div className="flex flex-col gap-1">
                                                <h3 className="text-primary text-lg font-semibold">{post.title}</h3>
                                                <p className="text-tertiary text-md">{post.excerpt}</p>
                                            </div>

                                            <Button color="link-color" size="lg" href="#" iconTrailing={ArrowUpRight}>
                                                Read post
                                            </Button>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="flex w-full flex-col gap-6 lg:max-w-60">
                        <p className="text-secondary hidden text-sm font-medium lg:block">Top members</p>
                        <div className="lg:hidden">
                            <SectionHeader size="sm" title="Top members" actions={<PanelMenu />} />
                        </div>

                        <PersonList
                            label="Top members"
                            items={topMembers.map((member) => ({ name: member.name, src: member.src, detail: member.since, online: member.online }))}
                        />
                    </div>
                </div>
            </DashboardSection>
        </DashboardMain>
    </div>
);
