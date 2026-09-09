"use client";

// TODO(orchestrator): candidate for components/internal — the nav configs, deterministic datasets and
// chart primitives below are shared by every dashboard page example in this folder.
import type { FC, ReactNode } from "react";
import { useState } from "react";
import type { Key } from "react-aria";
import {
    Area,
    AreaChart,
    Bar,
    CartesianGrid,
    Cell,
    Label,
    Pie,
    PieChart,
    PolarAngleAxis,
    PolarGrid,
    PolarRadiusAxis,
    Radar,
    RadarChart,
    RadialBar,
    RadialBarChart,
    BarChart as RechartsBarChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import {
    BarChartSquare02,
    Calendar,
    CheckDone01,
    ChevronRight,
    ClockRewind,
    CurrencyDollarCircle,
    File05,
    Folder,
    Grid03,
    HomeLine,
    LayersThree01,
    LayoutAlt01,
    LifeBuoy01,
    LineChartUp03,
    MessageChatCircle,
    NotificationBox,
    Package,
    PieChart03,
    Rows01,
    Settings01,
    Star01,
    Users01,
    UsersPlus,
} from "@smarteraui/icons";
import type { NavItemDividerType, NavItemType } from "@/components/application/app-navigation/config";
import { ChartTooltipContent } from "@/components/application/charts/charts-base";
import { Tabs } from "@/components/application/tabs/tabs";
import { Avatar } from "@/components/base/avatar/avatar";
import { Badge, BadgeWithDot } from "@/components/base/badges/badges";
import { cx } from "@/utils/cx";
import { AVATARS, LOGOS, avatar } from "@/utils/demo-assets";

/* -------------------------------------------------------------------------------------------------
 * Navigation configs
 * ---------------------------------------------------------------------------------------------- */

/** The six-item product nav used by most of the sidebar dashboards. */
export const navItemsSimple: NavItemType[] = [
    { label: "Home", href: "/", icon: HomeLine },
    { label: "Dashboard", href: "/dashboard", icon: BarChartSquare02 },
    { label: "Projects", href: "/projects", icon: Rows01 },
    { label: "Tasks", href: "/tasks", icon: CheckDone01, badge: 8 },
    { label: "Reporting", href: "/reporting", icon: PieChart03 },
    { label: "Users", href: "/users", icon: Users01 },
];

/** The nav with a collapsible "Folders" group and hairline dividers, used by the section-divider sidebars. */
export const navItemsWithFolders: (NavItemType | NavItemDividerType)[] = [
    { label: "Home", href: "/", icon: HomeLine },
    { label: "Dashboard", href: "/dashboard", icon: BarChartSquare02 },
    { label: "Projects", href: "/projects", icon: Rows01 },
    { divider: true },
    {
        label: "Folders",
        href: "/folders",
        icon: Folder,
        items: [
            { label: "View all", href: "/folders/all", badge: 18 },
            { label: "Recent", href: "/folders/recent", badge: 8 },
            { label: "Favorites", href: "/folders/favorites", badge: 6 },
            { label: "Shared", href: "/folders/shared", badge: 4 },
        ],
    },
    { divider: true },
    { label: "Reporting", href: "/reporting", icon: PieChart03 },
    { label: "Settings", href: "/settings", icon: Settings01 },
    {
        label: "Support",
        href: "/support",
        icon: MessageChatCircle,
        badge: (
            <BadgeWithDot color="success" type="modern" size="sm">
                Online
            </BadgeWithDot>
        ),
    },
    { label: "Open in browser", href: "https://smartera.example.com/", icon: LayoutAlt01 },
];

/** Deep two-tier nav used by the dual-tier and slim sidebars. */
export const navItemsDualTier: (NavItemType & { icon: FC<{ className?: string }> })[] = [
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
            { label: "Notifications", href: "/dashboard/notifications", icon: NotificationBox, badge: 10 },
            { label: "Analytics", href: "/dashboard/analytics", icon: LineChartUp03 },
            { label: "Saved reports", href: "/dashboard/saved-reports", icon: Star01 },
            { label: "Scheduled reports", href: "/dashboard/scheduled-reports", icon: ClockRewind },
            { label: "User reports", href: "/dashboard/user-reports", icon: UsersPlus },
        ],
    },
    {
        label: "Projects",
        href: "/projects",
        icon: Rows01,
        items: [
            { label: "View all", href: "/projects/all", icon: Rows01 },
            { label: "Personal", href: "/projects/personal", icon: File05 },
            { label: "Team", href: "/projects/team", icon: Users01 },
            { label: "Archive", href: "/projects/archive", icon: LayersThree01 },
        ],
    },
    { label: "Tasks", href: "/tasks", icon: CheckDone01, badge: 8 },
    { label: "Reporting", href: "/reporting", icon: PieChart03 },
    { label: "Users", href: "/users", icon: Users01 },
];

/** The `⌘n` shortcut chip and chevron shown on a team row. */
const teamBadge = (shortcut: string) => (
    <div className="flex items-center gap-3">
        <Badge size="sm" type="modern">
            {shortcut}
        </Badge>
        <ChevronRight aria-hidden="true" className="text-fg-quaternary size-4 rtl:-scale-x-100" />
    </div>
);

/** Renders a team's logo in the icon slot of a nav item. */
const teamIcon = (index: number) => {
    const logo = LOGOS[index]!;
    const TeamIcon = () => <Avatar src={logo.src} alt={logo.name} className="me-2 size-5" />;
    TeamIcon.displayName = `TeamIcon(${logo.name})`;
    return TeamIcon;
};

/** Grouped nav for the "sections with subheadings" sidebar. */
export const navSectionsSubheadings: Array<{ label: string; items: NavItemType[] }> = [
    {
        label: "General",
        items: [
            { label: "Dashboard", href: "/dashboard", icon: BarChartSquare02 },
            { label: "Projects", href: "/projects", icon: Rows01 },
            { label: "Documents", href: "/documents", icon: File05 },
            { label: "Calendar", href: "/calendar", icon: Calendar },
        ],
    },
    {
        label: "Smartera UI",
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

/** Support/settings pair pinned to the bottom of most sidebars. */
export const navFooterItems: NavItemType[] = [
    { label: "Support", href: "/support", icon: LifeBuoy01 },
    { label: "Settings", href: "/settings", icon: Settings01 },
];

/** Support/settings pair typed for the slim sidebar, which requires an icon on every item. */
export const navFooterItemsWithIcons: (NavItemType & { icon: FC<{ className?: string }> })[] = [
    { label: "Support", href: "/support", icon: LifeBuoy01 },
    { label: "Settings", href: "/settings", icon: Settings01 },
];

/* -------------------------------------------------------------------------------------------------
 * Deterministic datasets
 * ---------------------------------------------------------------------------------------------- */

/** Twelve month labels used as the x-axis of every yearly chart on these pages. */
export const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"] as const;

/** A single point of the yearly trend charts: the current year plus two comparison years. */
export interface TrendDatum {
    month: string;
    current: number;
    previous: number;
    older: number;
}

/** Yearly revenue-shaped series with two dotted comparison series underneath. */
export const yearlyTrend: TrendDatum[] = [
    { month: "Jan", current: 620, previous: 430, older: 240 },
    { month: "Feb", current: 660, previous: 455, older: 268 },
    { month: "Mar", current: 705, previous: 470, older: 292 },
    { month: "Apr", current: 690, previous: 505, older: 320 },
    { month: "May", current: 760, previous: 540, older: 348 },
    { month: "Jun", current: 815, previous: 560, older: 372 },
    { month: "Jul", current: 845, previous: 596, older: 404 },
    { month: "Aug", current: 890, previous: 625, older: 430 },
    { month: "Sep", current: 940, previous: 668, older: 465 },
    { month: "Oct", current: 985, previous: 700, older: 492 },
    { month: "Nov", current: 1040, previous: 742, older: 520 },
    { month: "Dec", current: 1120, previous: 784, older: 556 },
];

/** Stacked bar series: three segments per month. */
export const stackedBars = MONTHS.map((month, index) => ({
    month,
    a: 180 + ((index * 37) % 120),
    b: 120 + ((index * 53) % 90),
    c: 90 + ((index * 29) % 70),
}));

/** A thirty-point daily sales series used by the "Sales" chart cards. */
export const dailySales = Array.from({ length: 30 }, (_, index) => ({
    day: String(index + 1),
    value: 180 + ((index * 17) % 60) + Math.round(index * 1.6),
}));

/** A compact sparkline series shaped like steady growth. */
export const sparklineUp = [12, 16, 14, 20, 18, 24, 22, 28, 26, 32, 30, 38, 36, 44].map((value) => ({ value }));

/** A compact sparkline series shaped like a decline. */
export const sparklineDown = [44, 40, 42, 36, 38, 32, 34, 28, 30, 24, 26, 20, 22, 16].map((value) => ({ value }));

/** A two-series comparison sparkline. */
export const sparklineComparison = sparklineUp.map((point) => ({
    value: point.value,
    comparisonValue: Math.round(point.value * 0.72),
}));

/** Vendors used by the organization/vendor dashboards. */
export interface Vendor {
    name: string;
    website: string;
    logoUrl: string;
    rating: number;
    change: number;
    trend: "positive" | "negative";
    lastAssessed: string;
    categories: string[];
    extraCategories: number;
    status: "Active" | "Inactive";
}

export const vendors: Vendor[] = [
    {
        name: LOGOS[0].name,
        website: "layers.com",
        logoUrl: LOGOS[0].src,
        rating: 60,
        change: 5,
        trend: "positive",
        lastAssessed: "Jan 22, 2026",
        categories: ["Customer data", "Admin"],
        extraCategories: 4,
        status: "Active",
    },
    {
        name: LOGOS[1].name,
        website: "sisyphus.com",
        logoUrl: LOGOS[1].src,
        rating: 72,
        change: 4,
        trend: "negative",
        lastAssessed: "Jan 20, 2026",
        categories: ["Business data", "Admin"],
        extraCategories: 4,
        status: "Active",
    },
    {
        name: LOGOS[2].name,
        website: "circooles.com",
        logoUrl: LOGOS[2].src,
        rating: 78,
        change: 6,
        trend: "positive",
        lastAssessed: "Jan 24, 2026",
        categories: ["Customer data", "Financials"],
        extraCategories: 0,
        status: "Active",
    },
    {
        name: LOGOS[3].name,
        website: "catalog.app",
        logoUrl: LOGOS[3].src,
        rating: 38,
        change: 8,
        trend: "positive",
        lastAssessed: "Jan 26, 2026",
        categories: ["Database access", "Admin"],
        extraCategories: 0,
        status: "Active",
    },
    {
        name: LOGOS[4].name,
        website: "quotient.com",
        logoUrl: LOGOS[4].src,
        rating: 42,
        change: 1,
        trend: "negative",
        lastAssessed: "Jan 18, 2026",
        categories: ["Salesforce", "Admin"],
        extraCategories: 4,
        status: "Active",
    },
    {
        name: LOGOS[5].name,
        website: "hourglass.io",
        logoUrl: LOGOS[5].src,
        rating: 66,
        change: 6,
        trend: "positive",
        lastAssessed: "Jan 28, 2026",
        categories: ["Business data", "Admin"],
        extraCategories: 4,
        status: "Active",
    },
    {
        name: `${LOGOS[0].name} Labs`,
        website: "layerslabs.com",
        logoUrl: LOGOS[0].src,
        rating: 91,
        change: 2,
        trend: "negative",
        lastAssessed: "Jan 16, 2026",
        categories: ["Customer data", "Financials"],
        extraCategories: 0,
        status: "Inactive",
    },
];

/** Banking transactions used by the fintech dashboards. */
export interface Transaction {
    id: string;
    merchant: string;
    initials: string;
    amount: string;
    isIncome: boolean;
    date: string;
    longDate: string;
    category: "Subscriptions" | "Food and dining" | "Income" | "Groceries";
    account: "Visa" | "Mastercard";
    fileSize: string;
}

export const transactions: Transaction[] = [
    {
        id: "spotify",
        merchant: "Waveform",
        initials: "WF",
        amount: "18.99",
        isIncome: false,
        date: "Thu 1:00 pm",
        longDate: "Thursday 1:00 pm",
        category: "Subscriptions",
        account: "Visa",
        fileSize: "200 KB",
    },
    {
        id: "coffee",
        merchant: "A Coffee",
        initials: "AC",
        amount: "4.50",
        isIncome: false,
        date: "Thu 7:20 am",
        longDate: "Thursday 7:20 am",
        category: "Food and dining",
        account: "Visa",
        fileSize: "220 KB",
    },
    {
        id: "payouts",
        merchant: "Payouts",
        initials: "PO",
        amount: "88.00",
        isIncome: true,
        date: "Thu 2:45 am",
        longDate: "Thursday 2:45 am",
        category: "Income",
        account: "Mastercard",
        fileSize: "192 KB",
    },
    {
        id: "canvas",
        merchant: "Canvas",
        initials: "CV",
        amount: "15.00",
        isIncome: false,
        date: "Wed 6:10 pm",
        longDate: "Wednesday 6:10 pm",
        category: "Subscriptions",
        account: "Visa",
        fileSize: "216 KB",
    },
    {
        id: "bakery",
        merchant: "TBF Bakery",
        initials: "TB",
        amount: "12.50",
        isIncome: false,
        date: "Wed 7:52 am",
        longDate: "Wednesday 7:52 am",
        category: "Food and dining",
        account: "Visa",
        fileSize: "420 KB",
    },
    {
        id: "fresh",
        merchant: "Fresh F&V",
        initials: "FV",
        amount: "40.20",
        isIncome: false,
        date: "Wed 12:15 pm",
        longDate: "Wednesday 12:15 pm",
        category: "Groceries",
        account: "Visa",
        fileSize: "512 KB",
    },
    {
        id: "payouts-2",
        merchant: "Payouts",
        initials: "PO",
        amount: "88.00",
        isIncome: true,
        date: "Wed 5:40 am",
        longDate: "Wednesday 5:40 am",
        category: "Income",
        account: "Mastercard",
        fileSize: "196 KB",
    },
];

/** Recent purchase activity used by the sales dashboards. */
export const purchases = [
    { name: AVATARS[3].name, src: AVATARS[3].src, product: "Webflow 101", time: "2 hours ago" },
    { name: AVATARS[8].name, src: AVATARS[8].src, product: "SEO Masterclass", time: "2 hours ago" },
    { name: AVATARS[2].name, src: AVATARS[2].src, product: "Figma Mockups", time: "3 hours ago" },
    { name: AVATARS[4].name, src: AVATARS[4].src, product: "Webflow 101", time: "3 hours ago" },
    { name: AVATARS[11].name, src: AVATARS[11].src, product: "SEO Masterclass", time: "3 hours ago" },
    { name: AVATARS[10].name, src: AVATARS[10].src, product: "SEO Masterclass", time: "3 hours ago" },
    { name: AVATARS[8].name, src: AVATARS[8].src, product: "The Guide to Backlinks", time: "3 hours ago" },
    { name: AVATARS[6].name, src: AVATARS[6].src, product: "The Figma Dashboard Bundle", time: "4 hours ago" },
    { name: AVATARS[9].name, src: AVATARS[9].src, product: "The Design Handbook", time: "4 hours ago" },
    { name: AVATARS[1].name, src: AVATARS[1].src, product: "Phone 13 Mockups", time: "4 hours ago" },
    { name: AVATARS[5].name, src: AVATARS[5].src, product: "Figma Mockups", time: "5 hours ago" },
    { name: AVATARS[7].name, src: AVATARS[7].src, product: "The Guide to Backlinks", time: "6 hours ago" },
];

/** The account shown in the sidebar footer of every page here. */
export const currentUser = avatar(0);

/* -------------------------------------------------------------------------------------------------
 * Layout helpers
 * ---------------------------------------------------------------------------------------------- */

export const styles = {
    /** The page root: mobile header stacks above the content, sidebar sits beside it from `lg`. */
    page: "flex min-h-screen flex-col bg-primary lg:flex-row",
    /** The scrollable region beside the sidebar. */
    main: "min-w-0 flex-1 bg-primary pt-8 pb-12",
    /** Horizontal page gutters, matching the captured pages. */
    gutter: "px-4 lg:px-8",
    /** A plain content card. */
    card: "rounded-xl bg-primary shadow-xs ring-1 ring-secondary ring-inset",
    /** The `<h1>` of a dashboard page. */
    pageTitle: "text-xl font-semibold text-primary",
    /** Supporting copy under the page title. */
    pageSubtitle: "text-md text-tertiary",
    /** A card-level heading. */
    cardTitle: "text-md font-semibold text-primary",
    /** A muted caption above a metric value. */
    caption: "text-sm font-medium text-tertiary",
};

interface StackedAvatarsProps {
    /** How many avatars to render before the overflow chip. */
    count?: number;
    /** How many further members the overflow chip should announce. */
    overflow?: number;
    className?: string;
}

/** The overlapping avatar row used by the customer and vendor tables. */
export const StackedAvatars = ({ count = 5, overflow = 5, className }: StackedAvatarsProps) => (
    <div className={cx("flex -space-x-1", className)}>
        {AVATARS.slice(0, count).map((person) => (
            <Avatar key={person.username} className="ring-bg-primary ring-[1.5px]" size="xs" src={person.src} alt={person.name} />
        ))}
        {overflow > 0 && (
            <Avatar
                size="xs"
                className="ring-bg-primary ring-[1.5px]"
                placeholder={<span className="text-quaternary text-xs font-semibold">+{overflow}</span>}
            />
        )}
    </div>
);

interface ChartCardProps {
    title: ReactNode;
    description?: ReactNode;
    actions?: ReactNode;
    footer?: ReactNode;
    children: ReactNode;
    className?: string;
}

/** A titled card that wraps a chart, used across the analytics pages. */
export const ChartCard = ({ title, description, actions, footer, children, className }: ChartCardProps) => (
    <section className={cx(styles.card, "flex flex-col", className)}>
        <div className="flex flex-col gap-4 px-4 pt-5 md:flex-row md:items-start md:px-6">
            <div className="flex flex-1 flex-col gap-0.5">
                <h2 className={styles.cardTitle}>{title}</h2>
                {description && <p className="text-tertiary text-sm">{description}</p>}
            </div>
            {actions && <div className="flex shrink-0 flex-wrap items-center gap-3">{actions}</div>}
        </div>

        <div className="flex flex-1 flex-col px-4 py-5 md:px-6">{children}</div>

        {footer && <div className="border-secondary flex justify-end border-t px-4 py-4 md:px-6">{footer}</div>}
    </section>
);

/* -------------------------------------------------------------------------------------------------
 * Chart primitives
 * ---------------------------------------------------------------------------------------------- */

/** Zero-margin chart frame; every chart here bleeds to the edge of its card. */
const chartMargin = { top: 8, right: 0, bottom: 0, left: 0 };

interface TrendAreaChartProps {
    /** The points to plot, left to right. */
    data?: TrendDatum[];
    /** Whether to draw the two dotted comparison series. */
    showComparison?: boolean;
    /** Sizes the chart — it fills its box, so give the wrapper a height. */
    className?: string;
    /** Accessible name announced for the chart. */
    label: string;
}

/**
 * The yearly line chart used by the analytics dashboards: a solid brand line with
 * optional dotted comparison series and month ticks along the bottom.
 */
export const TrendAreaChart = ({ data = yearlyTrend, showComparison = true, className, label }: TrendAreaChartProps) => (
    <figure aria-label={label} className={cx("h-60 w-full", className)}>
        <ResponsiveContainer initialDimension={{ width: 1, height: 1 }} className="h-full">
            <AreaChart data={data} margin={chartMargin} className="text-tertiary [&_.recharts-text]:text-xs">
                <defs>
                    <linearGradient id="dashboard-trend-gradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="currentColor" className="text-utility-brand-600" stopOpacity="0.2" />
                        <stop offset="95%" stopColor="currentColor" className="text-utility-brand-600" stopOpacity="0" />
                    </linearGradient>
                </defs>

                <CartesianGrid vertical={false} stroke="currentColor" className="text-utility-neutral-100" />

                <XAxis dataKey="month" fill="currentColor" axisLine={false} tickLine={false} interval="preserveStartEnd" padding={{ left: 10, right: 10 }} />
                <YAxis hide domain={["dataMin - 120", "dataMax + 60"]} />

                <Tooltip content={<ChartTooltipContent />} cursor={{ className: "stroke-utility-brand-600 stroke-2" }} />

                {showComparison && (
                    <Area
                        isAnimationActive={false}
                        className="text-utility-neutral-400"
                        dataKey="older"
                        name="2024"
                        type="monotone"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeDasharray="0.1 6"
                        strokeLinecap="round"
                        fill="none"
                        activeDot={{ className: "fill-bg-primary stroke-utility-brand-600 stroke-2" }}
                    />
                )}

                {showComparison && (
                    <Area
                        isAnimationActive={false}
                        className="text-utility-brand-400"
                        dataKey="previous"
                        name="2025"
                        type="monotone"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeDasharray="0.1 6"
                        strokeLinecap="round"
                        fill="none"
                        activeDot={{ className: "fill-bg-primary stroke-utility-brand-600 stroke-2" }}
                    />
                )}

                <Area
                    isAnimationActive={false}
                    className="text-utility-brand-600"
                    dataKey="current"
                    name="2026"
                    type="monotone"
                    stroke="currentColor"
                    strokeWidth={2}
                    fill="url(#dashboard-trend-gradient)"
                    activeDot={{ className: "fill-bg-primary stroke-utility-brand-600 stroke-2" }}
                />
            </AreaChart>
        </ResponsiveContainer>
    </figure>
);

interface SalesAreaChartProps {
    className?: string;
    label: string;
}

/** The single-series daily chart used by the sales cards. */
export const SalesAreaChart = ({ className, label }: SalesAreaChartProps) => (
    <figure aria-label={label} className={cx("h-60 w-full", className)}>
        <ResponsiveContainer initialDimension={{ width: 1, height: 1 }} className="h-full">
            <AreaChart data={dailySales} margin={chartMargin} className="text-tertiary [&_.recharts-text]:text-xs">
                <defs>
                    <linearGradient id="dashboard-sales-gradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="currentColor" className="text-utility-brand-600" stopOpacity="0.2" />
                        <stop offset="95%" stopColor="currentColor" className="text-utility-brand-600" stopOpacity="0" />
                    </linearGradient>
                </defs>

                <CartesianGrid stroke="currentColor" className="text-utility-neutral-100" />

                <XAxis dataKey="day" fill="currentColor" axisLine={false} tickLine={false} interval={1} />
                <YAxis hide domain={["dataMin - 60", "dataMax + 20"]} />

                <Tooltip content={<ChartTooltipContent />} cursor={{ className: "stroke-utility-brand-600 stroke-2" }} />

                <Area
                    isAnimationActive={false}
                    className="text-utility-brand-600"
                    dataKey="value"
                    name="Sales"
                    type="monotone"
                    stroke="currentColor"
                    strokeWidth={2}
                    fill="url(#dashboard-sales-gradient)"
                    activeDot={{ className: "fill-bg-primary stroke-utility-brand-600 stroke-2" }}
                />
            </AreaChart>
        </ResponsiveContainer>
    </figure>
);

interface StackedBarChartProps {
    className?: string;
    label: string;
    /** Optional y-axis caption, e.g. `Security rating`. */
    yLabel?: string;
}

/** The stacked monthly bar chart used by the vendor and banking dashboards. */
export const StackedBarChart = ({ className, label, yLabel }: StackedBarChartProps) => (
    <figure aria-label={label} className={cx("h-60 w-full", className)}>
        <ResponsiveContainer initialDimension={{ width: 1, height: 1 }} className="h-full">
            <RechartsBarChart data={stackedBars} margin={chartMargin} className="text-tertiary [&_.recharts-text]:text-xs">
                <CartesianGrid vertical={false} stroke="currentColor" className="text-utility-neutral-100" />

                <XAxis dataKey="month" fill="currentColor" axisLine={false} tickLine={false} interval="preserveStartEnd" />
                <YAxis fill="currentColor" axisLine={false} tickLine={false} width={yLabel ? 48 : 32}>
                    {yLabel && (
                        <Label
                            value={yLabel}
                            fill="currentColor"
                            className="text-xs! font-medium"
                            style={{ textAnchor: "middle" }}
                            angle={-90}
                            position="insideLeft"
                        />
                    )}
                </YAxis>

                <Tooltip content={<ChartTooltipContent />} cursor={{ className: "fill-utility-neutral-100" }} />

                <Bar isAnimationActive={false} dataKey="a" name="Direct" stackId="stack" className="fill-utility-brand-200" />
                <Bar isAnimationActive={false} dataKey="b" name="Organic" stackId="stack" className="fill-utility-brand-500" />
                <Bar isAnimationActive={false} dataKey="c" name="Referral" stackId="stack" className="fill-utility-neutral-400" radius={[4, 4, 0, 0]} />
            </RechartsBarChart>
        </ResponsiveContainer>
    </figure>
);

/** One slice of the donut charts. */
export interface DonutDatum {
    name: string;
    value: number;
    className: string;
}

interface DonutChartProps {
    data: DonutDatum[];
    /** Large number rendered in the middle of the ring. */
    centerValue?: ReactNode;
    /** Caption rendered above the center value. */
    centerLabel?: ReactNode;
    className?: string;
    label: string;
}

/** The donut used by the customer, spending and country-breakdown cards. */
export const DonutChart = ({ data, centerValue, centerLabel, className, label }: DonutChartProps) => (
    <figure aria-label={label} className={cx("relative size-56", className)}>
        <ResponsiveContainer initialDimension={{ width: 1, height: 1 }} className="size-full">
            <PieChart>
                <Tooltip content={<ChartTooltipContent isPieChart />} />
                <Pie isAnimationActive={false} data={data} dataKey="value" nameKey="name" innerRadius="72%" outerRadius="100%" paddingAngle={1} stroke="none">
                    {data.map((slice) => (
                        <Cell key={slice.name} className={slice.className} />
                    ))}
                </Pie>
            </PieChart>
        </ResponsiveContainer>

        {(centerValue || centerLabel) && (
            <figcaption className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-0.5">
                {centerLabel && <span className="text-tertiary text-sm font-medium">{centerLabel}</span>}
                {centerValue && <span className="text-display-sm text-primary font-semibold">{centerValue}</span>}
            </figcaption>
        )}
    </figure>
);

interface RadialGaugeProps {
    /** Completion percentage of the outer ring, 0–100. */
    value: number;
    /** Large number rendered in the middle of the gauge. */
    centerValue: ReactNode;
    className?: string;
    label: string;
}

/** The half-ring gauge used by the "Vendors monitored" card. */
export const RadialGauge = ({ value, centerValue, className, label }: RadialGaugeProps) => (
    <figure aria-label={label} className={cx("relative h-32 w-full", className)}>
        <ResponsiveContainer initialDimension={{ width: 1, height: 1 }} className="size-full">
            <RadialBarChart data={[{ name: label, value }]} startAngle={180} endAngle={0} innerRadius="80%" outerRadius="130%" barSize={20} cy="95%">
                <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
                <RadialBar
                    isAnimationActive={false}
                    dataKey="value"
                    cornerRadius={10}
                    background={{ className: "fill-utility-neutral-200" }}
                    className="fill-utility-brand-600"
                />
            </RadialBarChart>
        </ResponsiveContainer>

        <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center">
            <span className="text-display-md text-primary font-semibold">{centerValue}</span>
        </figcaption>
    </figure>
);

/** One spoke of the traffic radar chart. */
const radarData = [
    { day: "Mon", a: 820, b: 540 },
    { day: "Tue", a: 610, b: 780 },
    { day: "Wed", a: 480, b: 620 },
    { day: "Thu", a: 720, b: 340 },
    { day: "Fri", a: 380, b: 810 },
    { day: "Sat", a: 640, b: 460 },
    { day: "Sun", a: 540, b: 700 },
];

interface TrafficRadarChartProps {
    className?: string;
    label: string;
}

/** The weekday radar used by the "Traffic sources" card. */
export const TrafficRadarChart = ({ className, label }: TrafficRadarChartProps) => (
    <figure aria-label={label} className={cx("h-64 w-full", className)}>
        <ResponsiveContainer initialDimension={{ width: 1, height: 1 }} className="size-full">
            <RadarChart data={radarData} className="text-tertiary [&_.recharts-text]:text-xs">
                <PolarGrid stroke="currentColor" className="text-utility-neutral-200" />
                <PolarAngleAxis dataKey="day" fill="currentColor" />
                <PolarRadiusAxis domain={[0, 1000]} fill="currentColor" axisLine={false} tickCount={5} />
                <Tooltip content={<ChartTooltipContent />} />
                <Radar
                    isAnimationActive={false}
                    dataKey="a"
                    name="This week"
                    className="fill-utility-brand-500 stroke-utility-brand-600"
                    fillOpacity={0.4}
                    strokeWidth={2}
                />
                <Radar
                    isAnimationActive={false}
                    dataKey="b"
                    name="Last week"
                    className="fill-utility-pink-400 stroke-utility-pink-500"
                    fillOpacity={0.3}
                    strokeWidth={2}
                />
            </RadarChart>
        </ResponsiveContainer>
    </figure>
);

/* -------------------------------------------------------------------------------------------------
 * Range tabs
 * ---------------------------------------------------------------------------------------------- */

/** The four presets of the period switcher, with the short labels used below `md`. */
export const RANGE_PRESETS = [
    { id: "12-months", long: "12 months", short: "12m" },
    { id: "30-days", long: "30 days", short: "30d" },
    { id: "7-days", long: "7 days", short: "7d" },
    { id: "24-hours", long: "24 hours", short: "24h" },
] as const;

interface RangeTabsProps {
    /** The presets to render. Defaults to the full four-preset set. */
    presets?: ReadonlyArray<{ id: string; long: string; short?: string }>;
    /** Preset selected on first render. */
    defaultSelectedKey?: string;
    /** Visual treatment of the tab row. */
    type?: "button-minimal" | "button-border" | "button-gray" | "button-brand" | "underline";
    /** Accessible name of the tab row. */
    label: string;
    className?: string;
}

/**
 * The period switcher that sits above most of these dashboards. It keeps its own
 * selection so each page example is interactive without wiring any data.
 */
export const RangeTabs = ({ presets = RANGE_PRESETS, defaultSelectedKey, type = "button-minimal", label, className }: RangeTabsProps) => {
    const [selectedKey, setSelectedKey] = useState<Key>(defaultSelectedKey ?? presets[0]!.id);

    return (
        <Tabs selectedKey={selectedKey} onSelectionChange={setSelectedKey} className={cx("w-auto", className)}>
            <Tabs.List aria-label={label} type={type}>
                {presets.map((preset) => (
                    <Tabs.Item
                        key={preset.id}
                        id={preset.id}
                        label={
                            preset.short ? (
                                <>
                                    <span className="max-md:hidden">{preset.long}</span>
                                    <span className="md:hidden">{preset.short}</span>
                                </>
                            ) : (
                                preset.long
                            )
                        }
                    />
                ))}
            </Tabs.List>
            {/* RangeTabs is a segmented control, but React Aria still points each tab's
                aria-controls at a panel id. Render the (empty) panels so the reference resolves. */}
            {presets.map((preset) => (
                <Tabs.Panel key={preset.id} id={preset.id} />
            ))}
        </Tabs>
    );
};
