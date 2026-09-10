"use client";

import type { FC } from "react";
import {
    Archive,
    BarChartSquare02,
    Calendar,
    CheckDone01,
    ChevronRight,
    ClockFastForward,
    CurrencyDollarCircle,
    File05,
    Folder,
    Grid03,
    HomeLine,
    Inbox01,
    LayoutAlt01,
    LifeBuoy01,
    LineChartUp03,
    MessageChatCircle,
    NotificationBox,
    Package,
    PieChart03,
    Rows01,
    Settings01,
    Settings03,
    Star01,
    Stars01,
    User01,
    UserSquare,
    Users01,
    UsersPlus,
} from "@smarteraui/icons";
import {
    FeaturedCardCookiePreferences,
    FeaturedCardCurrentProjects,
    FeaturedCardEventCTA,
    FeaturedCardFreeTrialCTA,
    FeaturedCardImage,
    FeaturedCardMessage,
    FeaturedCardOnboardingSteps,
    FeaturedCardProgressBar,
    FeaturedCardProgressCircle,
    FeaturedCardQRCode,
    FeaturedCardReferralLink,
    FeaturedCardSupportCTA,
    FeaturedCardUpgradeCTA,
} from "@/components/application/app-navigation/base-components/featured-cards";
import type { NavItemDividerType, NavItemType } from "@/components/application/app-navigation/config";
import { SidebarNavigationDualTier } from "@/components/application/app-navigation/sidebar-navigation/sidebar-dual-tier";
import { SidebarNavigationSectionDividers } from "@/components/application/app-navigation/sidebar-navigation/sidebar-section-dividers";
import { SidebarNavigationSectionsSubheadings } from "@/components/application/app-navigation/sidebar-navigation/sidebar-sections-subheadings";
import { SidebarNavigationSimple } from "@/components/application/app-navigation/sidebar-navigation/sidebar-simple";
import { SidebarNavigationSlim } from "@/components/application/app-navigation/sidebar-navigation/sidebar-slim";
import { Avatar } from "@/components/base/avatar/avatar";
import { Badge, BadgeWithDot } from "@/components/base/badges/badges";
import { AVATARS, IMAGES, LOGOS } from "@/utils/demo-assets";

const noop = () => {};

/** A fixed-width wrapper matching the docs preview for the standalone sidebar cards. */
const CardPreview = ({ children }: { children: React.ReactNode }) => <div className="flex w-68 flex-col">{children}</div>;

const navItemsSimple: NavItemType[] = [
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
            { label: "Shared with me", href: "/projects/shared-with-me", icon: UsersPlus },
            { label: "Archive", href: "/projects/archive", icon: Archive },
        ],
    },
    {
        label: "Tasks",
        href: "/tasks",
        icon: CheckDone01,
        badge: 10,
    },
    {
        label: "Reporting",
        href: "/reporting",
        icon: PieChart03,
    },
    {
        label: "Users",
        href: "/users",
        icon: Users01,
    },
];

const navItemsDualTier: (NavItemType & { icon: FC<{ className?: string }> })[] = [
    {
        label: "Home",
        href: "/",
        icon: HomeLine,
        items: [
            { label: "Overview", href: "/overview", icon: Grid03 },
            { label: "Products", href: "/products", icon: Package },
            { label: "Orders", href: "/orders", icon: CurrencyDollarCircle },
            { label: "Customers", href: "/customers", icon: Users01 },
            { label: "Inbox", href: "/inbox", icon: Inbox01, badge: 4 },
            { label: "What's new?", href: "/whats-new", icon: Stars01 },
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
            { label: "Scheduled reports", href: "/dashboard/scheduled-reports", icon: ClockFastForward },
            { label: "User reports", href: "/dashboard/user-reports", icon: UserSquare },
            { label: "Manage notifications", href: "/dashboard/manage-notifications", icon: Settings03 },
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
            { label: "Shared with me", href: "/projects/shared-with-me", icon: UsersPlus },
            { label: "Archive", href: "/projects/archive", icon: Archive },
        ],
    },
    {
        label: "Tasks",
        href: "/tasks",
        icon: CheckDone01,
        badge: 10,
    },
    {
        label: "Reporting",
        href: "/reporting",
        icon: PieChart03,
    },
    {
        label: "Users",
        href: "/users",
        icon: Users01,
    },
];

const navItemsWithDividers: (NavItemType | NavItemDividerType)[] = [
    {
        label: "Home",
        href: "/",
        icon: HomeLine,
    },
    {
        label: "Dashboard",
        href: "/dashboard",
        icon: BarChartSquare02,
    },
    {
        label: "Projects",
        href: "/projects",
        icon: Rows01,
    },
    { divider: true },
    {
        label: "Folders",
        icon: Folder,
        href: "/folders",
        items: [
            { label: "View all", badge: 18, href: "/folders/view-all" },
            { label: "Recent", badge: 8, href: "/folders/recent" },
            { label: "Favorites", badge: 6, href: "/folders/favorites" },
            { label: "Shared", badge: 4, href: "/folders/shared" },
        ],
    },
    { divider: true },
    {
        label: "Reporting",
        href: "/reporting",
        icon: PieChart03,
    },
    {
        label: "Settings",
        href: "/settings",
        icon: Settings01,
    },
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
    {
        label: "Open in browser",
        href: "https://smartera.example.com/",
        icon: LayoutAlt01,
    },
];

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

const navItemsWithSectionsSubheadings: Array<{ label: string; items: NavItemType[] }> = [
    {
        label: "General",
        items: [
            { label: "Dashboard", href: "/", icon: BarChartSquare02 },
            { label: "Projects", href: "/projects", icon: Rows01 },
            { label: "Documents", href: "/documents", icon: File05 },
            { label: "Calendar", href: "/calendar", icon: Calendar },
        ],
    },
    {
        label: "Smartera UI",
        items: [
            { label: "Reporting", href: "#", icon: PieChart03 },
            {
                label: "Tasks",
                href: "#",
                icon: CheckDone01,
                badge: (
                    <Badge size="sm" type="modern">
                        8
                    </Badge>
                ),
            },
            { label: "Users", href: "#", icon: Users01 },
        ],
    },
    {
        label: "Your teams",
        items: LOGOS.slice(0, 4).map((logo, index) => ({
            label: logo.name,
            href: "#",
            icon: teamIcon(index),
            badge: teamBadge(`⌘${index + 1}`),
        })),
    },
];

const footerItemsSimple: NavItemType[] = [
    {
        label: "Settings",
        href: "/settings",
        icon: Settings01,
    },
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
    {
        label: "Open in browser",
        href: "https://smartera.example.com/",
        icon: LayoutAlt01,
    },
];

const footerItemsDualTier = [
    { label: "Support", href: "/support", icon: LifeBuoy01 },
    { label: "Settings", href: "/settings", icon: Settings01 },
];

export const SidebarNavigationExample = () => <SidebarNavigationSectionDividers activeUrl="/" items={navItemsWithDividers} />;

export const Simple = () => (
    <SidebarNavigationSimple
        items={navItemsSimple}
        footerItems={footerItemsSimple}
        featureCard={
            <FeaturedCardProgressBar
                title="Used space"
                description="Your team has used 80% of your available space. Need more?"
                confirmLabel="Upgrade plan"
                progress={80}
                className="hidden md:flex"
                onDismiss={noop}
                onConfirm={noop}
            />
        }
    />
);

export const DualTier = () => (
    <SidebarNavigationDualTier
        items={navItemsDualTier}
        footerItems={footerItemsDualTier}
        featureCard={
            <FeaturedCardProgressCircle
                title="Used space"
                description="Your team has used 80% of your available space. Need more?"
                confirmLabel="Upgrade plan"
                progress={80}
                className="hidden lg:flex"
                onDismiss={noop}
                onConfirm={noop}
            />
        }
    />
);

export const Slim = () => <SidebarNavigationSlim items={navItemsDualTier} footerItems={footerItemsDualTier} />;

export const SectionsDividers = () => <SidebarNavigationSectionDividers activeUrl="/" items={navItemsWithDividers} />;

export const SectionsSubheadings = () => <SidebarNavigationSectionsSubheadings activeUrl="/" items={navItemsWithSectionsSubheadings} />;

export const ProgressBar = () => (
    <CardPreview>
        <FeaturedCardProgressBar
            title="Used space"
            description="Your team has used 80% of your available space. Need more?"
            confirmLabel="Upgrade plan"
            progress={80}
            onDismiss={noop}
            onConfirm={noop}
        />
    </CardPreview>
);

export const ProgressCircle = () => (
    <CardPreview>
        <FeaturedCardProgressCircle
            title="Used space"
            description="Your team has used 80% of your available space. Need more?"
            confirmLabel="Upgrade plan"
            progress={80}
            onDismiss={noop}
            onConfirm={noop}
        />
    </CardPreview>
);

export const Image = () => (
    <CardPreview>
        <FeaturedCardImage
            title="New features available!"
            description="Check out the new dashboard view. Pages now load faster."
            confirmLabel="What's new?"
            imageSrc={IMAGES.landscape[0].src}
            imageAlt=""
            onDismiss={noop}
            onConfirm={noop}
        />
    </CardPreview>
);

export const CookiePreferences = () => (
    <CardPreview>
        <FeaturedCardCookiePreferences
            title="Cookie preferences"
            description={
                <>
                    We use{" "}
                    <a
                        href="/legal/cookies"
                        className="outline-focus-ring rounded-xs underline underline-offset-2 focus-visible:outline-2 focus-visible:outline-offset-2"
                    >
                        cookies
                    </a>{" "}
                    to analyze traffic, remember preferences, and improve your experience.
                </>
            }
            dismissLabel="Reject all"
            confirmLabel="Accept all"
            onDismiss={noop}
            onConfirm={noop}
        />
    </CardPreview>
);

export const ReferralLink = () => (
    <CardPreview>
        <FeaturedCardReferralLink
            title="Refer a friend"
            description="Earn 50% back for 12 months when someone uses your link."
            referralLink="smartera.ui/4060020"
            onDismiss={noop}
            onCopy={noop}
        />
    </CardPreview>
);

export const OnboardingSteps = () => (
    <CardPreview>
        <FeaturedCardOnboardingSteps
            title="Complete account"
            confirmLabel="Continue setup"
            steps={[
                { label: "Complete your profile", isComplete: true },
                { label: "Verify your phone number", isComplete: true },
                { label: "Set up 2FA and backups", isComplete: true },
                { label: "Add payout bank details", isComplete: false },
            ]}
            onConfirm={noop}
        />
    </CardPreview>
);

export const UpgradeCTA = () => (
    <CardPreview>
        <FeaturedCardUpgradeCTA
            title="Upgrade your plan"
            badge="20% OFF"
            description="Unlock 20+ integrations, 40 GB data, and advanced reporting."
            confirmLabel="Upgrade now"
            onDismiss={noop}
            onConfirm={noop}
        />
    </CardPreview>
);

export const SupportCTA = () => (
    <CardPreview>
        <FeaturedCardSupportCTA
            title="Need help with something?"
            description="Our experts are ready to help."
            confirmLabel="Chat to support"
            onDismiss={noop}
            onConfirm={noop}
        />
    </CardPreview>
);

export const EventCTA = () => (
    <CardPreview>
        <FeaturedCardEventCTA
            title="Join our workshop"
            description="Learn how to leverage automation to supercharge your workflow."
            confirmLabel="Join now!"
            attendees={AVATARS.slice(0, 4).map((person) => ({ src: person.src, alt: person.name }))}
            remainingCount={5}
            onDismiss={noop}
            onConfirm={noop}
        />
    </CardPreview>
);

export const Message = () => (
    <CardPreview>
        <FeaturedCardMessage
            author={{ name: AVATARS[5].name, src: AVATARS[5].src }}
            timestamp="2 mins ago"
            message="I’ve finished adding my notes. Happy for you to review!"
            confirmLabel="Reply"
            onDismiss={noop}
            onConfirm={noop}
        />
    </CardPreview>
);

export const CurrentProjects = () => (
    <CardPreview>
        <FeaturedCardCurrentProjects
            title="Current projects"
            confirmLabel="All projects"
            projects={[
                { label: "Dashboard design 2.0", href: "#", dotClassName: "bg-utility-blue-500" },
                { label: "Marketing site CMS", href: "#", dotClassName: "bg-utility-purple-500" },
                { label: "iOS app prototypes", href: "#", dotClassName: "bg-utility-pink-500" },
            ]}
            onDismiss={noop}
            onConfirm={noop}
        />
    </CardPreview>
);

export const FreeTrialCTA = () => (
    <CardPreview>
        <FeaturedCardFreeTrialCTA title="Free trial" confirmLabel="Upgrade now" daysLeft={24} progress={30} onConfirm={noop} />
    </CardPreview>
);

export const QRCode = () => (
    <CardPreview>
        <FeaturedCardQRCode
            title="Verify this device"
            description="Open the app and scan the QR code below to verify this device."
            value="https://smartera.example.com/verify/4060020"
            onDismiss={noop}
        />
    </CardPreview>
);
