"use client";

// TODO(orchestrator): candidate for components/internal — the settings page examples all share the
// same shell (sidebar column + main column), page title row, tab row and label/field grid. The
// recipes live here so the 21 variants stay declarative; promote them if the header-navigation
// settings pages (`settings-pages-02`) end up needing the same shapes.
import type { FC, ReactNode } from "react";
import { Radio as AriaRadio } from "react-aria-components";
import {
    BarChartSquare02,
    Calendar,
    CheckDone01,
    ChevronRight,
    File05,
    Folder,
    Grid03,
    HomeLine,
    LayoutAlt01,
    LifeBuoy01,
    MessageChatCircle,
    PieChart03,
    Rows01,
    SearchLg,
    Settings01,
    Star01,
    Users01,
} from "@properui/icons";
import type { NavItemDividerType, NavItemType } from "@/components/application/app-navigation/config";
import { Tabs } from "@/components/application/tabs/tabs";
import { Avatar } from "@/components/base/avatar/avatar";
import { Badge, BadgeWithDot } from "@/components/base/badges/badges";
import { ButtonGroup, ButtonGroupItem } from "@/components/base/button-group/button-group";
import { Button } from "@/components/base/buttons/button";
import { CheckboxBase } from "@/components/base/checkbox/checkbox";
import { Input } from "@/components/base/input/input";
import { NativeSelect } from "@/components/base/select/select-native";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";
import { cx, sortCx } from "@/utils/cx";
import { type DemoAvatar, LOGOS } from "@/utils/demo-assets";

export const styles = sortCx({
    page: {
        /** Sidebar column above the main column below `lg`, side by side from `lg`. */
        root: "bg-primary flex flex-col lg:flex-row",
        main: "min-w-0 flex-1 pt-8 pb-12",
        /** Vertical rhythm between the page header block and the content block. */
        stack: "flex flex-col gap-3 md:gap-8",
        /** The page gutter every block inside `main` shares. */
        gutter: "px-4 lg:px-8",
    },
    header: {
        root: "relative flex flex-col gap-5",
        row: "flex flex-col gap-4 lg:flex-row",
        heading: "flex flex-1 flex-col gap-0.5",
        title: "text-primary text-xl font-semibold",
        description: "text-tertiary text-sm",
    },
    tabs: {
        /** Lets the tab row bleed into the gutter so the first/last tab can scroll to the edge. */
        scroller: "scrollbar-hide -mx-4 -my-1 flex overflow-auto px-4 py-1 lg:-mx-8 lg:px-8",
        list: "w-full",
    },
    row: {
        root: "grid grid-cols-1 gap-5 lg:grid-cols-[minmax(200px,280px)_minmax(400px,512px)] lg:gap-8",
        label: "text-secondary flex items-center gap-0.5 text-sm font-semibold",
        hint: "text-tertiary text-sm",
        /** Two fields side by side inside a row (first/last name, expiry/CVV…). */
        pair: "grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-6",
    },
    plan: {
        root: "outline-focus-ring bg-primary relative flex cursor-pointer flex-col rounded-xl ring-inset focus-visible:outline-2 focus-visible:outline-offset-2",
        head: "ring-secondary flex items-center gap-3 rounded-t-xl p-3 pe-5 ring-1 ring-inset",
        name: "text-secondary text-md me-1 font-semibold",
        body: "flex flex-col gap-1 rounded-b-lg p-4",
        priceRow: "flex flex-col-reverse gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-1",
        price: "flex items-baseline gap-1",
        amount: "text-secondary text-display-sm font-semibold",
        period: "text-tertiary text-sm",
        description: "text-tertiary text-sm",
    },
    table: {
        /** Invoice/member tables sit flush on mobile and become a card from `lg`. */
        card: "-mx-4 rounded-none bg-transparent shadow-none ring-0 lg:mx-0 lg:rounded-xl lg:shadow-xs lg:ring-1",
    },
});

/**
 * Hides a field's own `<Label>` from `lg` up, where the row's heading already names the field.
 * The label stays in the accessibility tree, so the input keeps its name in both layouts.
 */
export const hideLabelOnDesktop = "*:data-label:lg:hidden";

/** The outer shell: the sidebar renders its own fixed column, `main` takes the rest. */
export const SettingsPage = ({ className, children }: { className?: string; children: ReactNode }) => (
    <div className={cx(styles.page.root, className)}>{children}</div>
);

/** The main column of a settings page. */
export const SettingsMain = ({ className, children }: { className?: string; children: ReactNode }) => (
    <main className={cx(styles.page.main, className)}>{children}</main>
);

/** Vertical stack of page-level blocks inside `SettingsMain`. */
export const SettingsStack = ({ className, children }: { className?: string; children: ReactNode }) => (
    <div className={cx(styles.page.stack, className)}>{children}</div>
);

/** A block that sits in the page gutter. */
export const SettingsBlock = ({ className, children }: { className?: string; children: ReactNode }) => (
    <div className={cx("flex flex-col gap-6", styles.page.gutter, className)}>{children}</div>
);

interface SettingsPageTitleProps {
    /** The page heading — the only level-1 heading on the page. */
    title: string;
    /** Supporting copy under the heading. */
    description?: string;
    /** Renders the page search field at the end of the title row. */
    withSearch?: boolean;
    /** Anything rendered under the title row — usually a `SettingsTabs`. */
    children?: ReactNode;
    className?: string;
}

/** The title row of a settings page: heading, optional description, optional search, optional tabs. */
export const SettingsPageTitle = ({ title, description, withSearch, children, className }: SettingsPageTitleProps) => (
    <div className={cx("flex flex-col gap-5", styles.page.gutter, className)}>
        <div className={styles.header.root}>
            <div className={styles.header.row}>
                <div className={styles.header.heading}>
                    <h1 className={styles.header.title}>{title}</h1>
                    {description && <p className={styles.header.description}>{description}</p>}
                </div>

                {withSearch && (
                    <>
                        {/* Desktop search field */}
                        <Input shortcut size="sm" aria-label="Search" placeholder="Search" icon={SearchLg} className="w-full max-w-70 max-md:hidden" />
                        {/* Mobile search field */}
                        <Input size="md" aria-label="Search" placeholder="Search" icon={SearchLg} className="w-full md:hidden" />
                    </>
                )}
            </div>
        </div>

        {children}
    </div>
);

export interface SettingsTabItem {
    /** The tab key — also the value of the matching option in the mobile select. */
    id: string;
    /** The visible tab label. */
    label: string;
    /** A count shown after the label from `md` up. */
    badge?: number;
}

/** The 10 tabs the settings pages share. */
export const settingsTabs: SettingsTabItem[] = [
    { id: "details", label: "My details" },
    { id: "profile", label: "Profile" },
    { id: "password", label: "Password" },
    { id: "team", label: "Team" },
    { id: "plan", label: "Plan" },
    { id: "billing", label: "Billing" },
    { id: "email", label: "Email" },
    { id: "notifications", label: "Notifications", badge: 2 },
    { id: "integrations", label: "Integrations" },
    { id: "api", label: "API" },
];

interface SettingsTabsRootProps {
    /** The tab that starts selected. */
    selectedTab: string;
    /** The page title block and the tab panel. */
    children: ReactNode;
    className?: string;
}

/**
 * Wraps the page title block and the tab panel so the tab row and its panel share one React Aria
 * `Tabs` context — the panel is what the selected tab's `aria-controls` points at.
 */
export const SettingsTabsRoot = ({ selectedTab, children, className }: SettingsTabsRootProps) => (
    <Tabs defaultSelectedKey={selectedTab} className={cx(styles.page.stack, className)}>
        {children}
    </Tabs>
);

interface SettingsTabsRowProps {
    /** Tabs to render. */
    items?: SettingsTabItem[];
    /** The tab that starts selected — also the default value of the mobile select. */
    selectedTab: string;
    /** The tab treatment. Matches the segmented and underlined rows of the reference pages. */
    type?: "button-minimal" | "button-border" | "underline" | "button-brand";
    className?: string;
}

/**
 * The settings tab row: a native select below `md` (where ten tabs cannot fit) and a scrollable
 * `Tabs.List` from `md` up. Must be rendered inside a `SettingsTabsRoot`.
 */
export const SettingsTabsRow = ({ items = settingsTabs, selectedTab, type = "button-minimal", className }: SettingsTabsRowProps) => (
    <>
        <NativeSelect
            aria-label="Page tabs"
            size="sm"
            className="md:hidden"
            defaultValue={selectedTab}
            options={items.map((item) => ({ label: item.label, value: item.id }))}
        />

        <div className={cx(styles.tabs.scroller, "hidden md:flex", className)}>
            <Tabs.List type={type} size="sm" items={items} className={styles.tabs.list} />
        </div>
    </>
);

/**
 * The alternative settings tab row used by the pages that render a segmented button group instead
 * of a React Aria tab list. Needs no panel, so it can be used outside a `SettingsTabsRoot`.
 */
export const SettingsButtonGroupRow = ({ items = settingsTabs, selectedTab, className }: Omit<SettingsTabsRowProps, "type">) => (
    <>
        <NativeSelect
            aria-label="Page tabs"
            size="sm"
            className="md:hidden"
            defaultValue={selectedTab}
            options={items.map((item) => ({ label: item.label, value: item.id }))}
        />

        <div className={cx(styles.tabs.scroller, "hidden md:flex", className)}>
            <ButtonGroup size="md" defaultSelectedKeys={[selectedTab]} aria-label="Page tabs">
                {items.map((item) => (
                    <ButtonGroupItem key={item.id} id={item.id}>
                        {item.label}
                    </ButtonGroupItem>
                ))}
            </ButtonGroup>
        </div>
    </>
);

/** The panel of the selected tab. Holds the page content and sits in the page gutter. */
export const SettingsTabPanel = ({ id, className, children }: { id: string; className?: string; children: ReactNode }) => (
    <Tabs.Panel id={id} className={cx("flex flex-col gap-6", styles.page.gutter, className)}>
        {children}
    </Tabs.Panel>
);

interface SettingsFormRowProps {
    /** The row heading — names the fields in the second column from `lg` up. */
    label: ReactNode;
    /** Supporting copy under the heading. */
    hint?: ReactNode;
    /**
     * The heading level of the row label. Use `h2` on pages that have no section heading above the
     * rows so the document keeps a valid heading order.
     * @default "h3"
     */
    headingLevel?: "h2" | "h3";
    /** Keeps the row heading visible below `lg` (used when the fields carry no labels of their own). */
    showLabelOnMobile?: boolean;
    /** The fields of the row. */
    children: ReactNode;
    className?: string;
}

/** One label/field row of a settings form: heading column, then the fields. */
export const SettingsFormRow = ({ label, hint, headingLevel: Heading = "h3", showLabelOnMobile, children, className }: SettingsFormRowProps) => (
    <div className={cx(styles.row.root, className)}>
        <div className={cx("flex flex-col gap-0.5", !showLabelOnMobile && "max-lg:hidden")}>
            <Heading className={styles.row.label}>
                {label}
                <span aria-hidden="true" className="text-brand-tertiary block">
                    *
                </span>
            </Heading>
            {hint && <p className={styles.row.hint}>{hint}</p>}
        </div>

        <div className="flex flex-col gap-4">{children}</div>
    </div>
);

/** Two fields side by side from `lg` up. */
export const SettingsFieldPair = ({ className, children }: { className?: string; children: ReactNode }) => (
    <div className={cx(styles.row.pair, className)}>{children}</div>
);

/** The hairline that separates two form rows. */
export const SettingsRowDivider = () => <hr className="bg-border-secondary h-px w-full border-none" />;

interface PlanCardProps {
    /** The radio value of the plan. */
    value: string;
    /** The plan name. */
    name: string;
    /** The formatted price, e.g. `$10`. */
    price: string;
    /** The billing period, e.g. `per month`. */
    period?: string;
    /** What the plan includes. */
    description: string;
    /** The icon shown in the card header. */
    icon: FC<{ className?: string }>;
    /** Content shown next to the price — usually a badge. */
    priceAddon?: ReactNode;
    className?: string;
}

/**
 * A selectable plan card. Built on `AriaRadio` (only one plan can be active) but styled with
 * `CheckboxBase` so the control matches the reference pages' square indicator.
 */
export const PlanCardRadio = ({ value, name, price, period = "per month", description, icon, priceAddon, className }: PlanCardProps) => (
    <AriaRadio
        value={value}
        aria-label={name}
        className={({ isSelected }) => cx(styles.plan.root, isSelected ? "ring-brand ring-2" : "ring-secondary ring-1", className)}
    >
        {({ isSelected, isDisabled, isFocusVisible }) => (
            <>
                <span className={cx(styles.plan.head, isSelected ? "ring-brand ring-2" : "ring-secondary ring-1")}>
                    <FeaturedIcon size="sm" theme="modern" color="gray" icon={icon} />
                    <span className={styles.plan.name}>{name}</span>
                    <CheckboxBase size="sm" isSelected={isSelected} isDisabled={isDisabled} isFocusVisible={isFocusVisible} className="ms-auto" />
                </span>

                <span className={styles.plan.body}>
                    <span className={styles.plan.priceRow}>
                        <span className={styles.plan.price}>
                            <span className={styles.plan.amount}>{price}</span>
                            <span className={styles.plan.period}>{period}</span>
                        </span>
                        {priceAddon}
                    </span>
                    <span className={styles.plan.description}>{description}</span>
                </span>
            </>
        )}
    </AriaRadio>
);

/** The compact one-row form of `PlanCardRadio`: icon, name and price on one line. */
export const PlanOptionRadio = ({ value, name, price, description, icon: Icon, className }: Omit<PlanCardProps, "period" | "priceAddon">) => (
    <AriaRadio
        value={value}
        aria-label={name}
        className={({ isSelected }) =>
            cx(
                "outline-focus-ring bg-primary relative flex cursor-pointer items-start gap-1 rounded-xl p-4 ring-inset focus-visible:outline-2 focus-visible:outline-offset-2",
                isSelected ? "ring-brand ring-2" : "ring-secondary ring-1",
                className,
            )
        }
    >
        {({ isSelected, isDisabled, isFocusVisible }) => (
            <>
                <span className="flex flex-1 gap-3">
                    <FeaturedIcon size="sm" theme="modern" color="gray" icon={Icon} />
                    <span className="flex flex-col">
                        <span className="flex gap-1">
                            <span className="text-secondary text-sm font-medium">{name}</span>
                            <span className="text-tertiary text-sm">{price}</span>
                        </span>
                        <span className="text-tertiary text-sm">{description}</span>
                    </span>
                </span>

                <CheckboxBase size="sm" isSelected={isSelected} isDisabled={isDisabled} isFocusVisible={isFocusVisible} />
            </>
        )}
    </AriaRadio>
);

/** A stacked row of avatars with a trailing count, used by the "users on plan" table cells. */
export const AvatarStack = ({ people, remaining, className }: { people: DemoAvatar[]; remaining?: number; className?: string }) => (
    <div className={cx("flex items-center -space-x-2", className)}>
        {people.map((person) => (
            <Avatar key={person.username} size="xs" src={person.src} alt={person.name} className="ring-bg-primary ring-[1.5px]" />
        ))}
        {remaining ? (
            <Avatar
                size="xs"
                className="ring-bg-primary ring-[1.5px]"
                placeholder={<span className="text-quaternary text-xs font-semibold">+{remaining}</span>}
            />
        ) : null}
    </div>
);

/** One saved payment method: the brand mark, the masked number and the row's actions. */
export const PaymentMethodRow = ({
    icon: Icon,
    name,
    expiry,
    isDefault,
    className,
}: {
    /** The card brand mark. */
    icon: FC<{ className?: string }>;
    /** The masked card label, e.g. `Visa ending in 1234`. */
    name: string;
    /** The card's expiry, e.g. `Expiry 06/2028`. */
    expiry: string;
    /** Whether this card is already the default. */
    isDefault?: boolean;
    className?: string;
}) => (
    <div className={cx("bg-primary ring-secondary flex flex-col gap-4 rounded-xl p-4 ring-1 ring-inset md:flex-row md:items-center", className)}>
        <Icon aria-hidden="true" className="h-8 w-auto shrink-0" />

        <div className="min-w-0 flex-1">
            <p className="text-secondary text-sm font-medium">{name}</p>
            <p className="text-tertiary text-sm">{expiry}</p>
        </div>

        <div className="flex items-center gap-3">
            <Button color="link-gray" size="sm" isDisabled={isDefault}>
                Set as default
            </Button>
            <Button color="link-color" size="sm">
                Edit
            </Button>
        </div>
    </div>
);

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

/** Nav tree used by the simple and dual-tier sidebars: every top-level item has children. */
export const navItemsNested: NavItemType[] = [
    {
        label: "Home",
        href: "/",
        icon: HomeLine,
        items: [
            { label: "Overview", href: "/overview", icon: Grid03 },
            { label: "Products", href: "/products", icon: Rows01 },
            { label: "Orders", href: "/orders", icon: File05 },
            { label: "Customers", href: "/customers", icon: Users01 },
        ],
    },
    {
        label: "Dashboard",
        href: "/dashboard",
        icon: BarChartSquare02,
        items: [
            { label: "Overview", href: "/dashboard/overview", icon: Grid03 },
            { label: "Notifications", href: "/dashboard/notifications", icon: MessageChatCircle, badge: 10 },
            { label: "Analytics", href: "/dashboard/analytics", icon: PieChart03 },
            { label: "Saved reports", href: "/dashboard/saved-reports", icon: Star01 },
        ],
    },
    {
        label: "Projects",
        href: "/projects",
        icon: Rows01,
        items: [
            { label: "View all", href: "/projects/all", icon: Rows01 },
            { label: "Personal", href: "/projects/personal", icon: Folder },
            { label: "Team", href: "/projects/team", icon: Users01 },
            { label: "Shared with me", href: "/projects/shared-with-me", icon: Users01 },
            { label: "Archive", href: "/projects/archive", icon: File05 },
        ],
    },
    { label: "Tasks", href: "/tasks", icon: CheckDone01, badge: 8 },
    { label: "Reporting", href: "/reporting", icon: PieChart03 },
    { label: "Users", href: "/users", icon: Users01 },
];

/** Flat nav tree used by the slim sidebar and the compact simple sidebar. */
export const navItemsFlat: (NavItemType & { icon: FC<{ className?: string }> })[] = [
    { label: "Home", href: "/", icon: HomeLine },
    { label: "Dashboard", href: "/dashboard", icon: BarChartSquare02 },
    { label: "Projects", href: "/projects", icon: Rows01 },
    { label: "Tasks", href: "/tasks", icon: CheckDone01, badge: 8 },
    { label: "Reporting", href: "/reporting", icon: PieChart03 },
    { label: "Users", href: "/users", icon: Users01 },
];

/** Footer nav shared by the sidebars that show Settings, Support and an external link. */
export const navFooterItems: NavItemType[] = [
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
    { label: "Open in browser", href: "/browser", icon: LayoutAlt01 },
];

/** Two-item footer nav used by the dual-tier and slim sidebars. */
export const navFooterItemsCompact: (NavItemType & { icon: FC<{ className?: string }> })[] = [
    { label: "Support", href: "/support", icon: LifeBuoy01 },
    { label: "Settings", href: "/settings", icon: Settings01 },
];

/** Nav tree with a "Folders" group between two dividers, used by the section-divider sidebar. */
export const navItemsWithDividers: (NavItemType | NavItemDividerType)[] = [
    { label: "Home", href: "/", icon: HomeLine },
    { label: "Dashboard", href: "/dashboard", icon: BarChartSquare02 },
    { label: "Projects", href: "/projects", icon: Rows01 },
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
    { label: "Reporting", href: "/reporting", icon: PieChart03 },
    ...navFooterItems,
];

/** Grouped nav used by the sidebar with section subheadings. */
export const navItemsWithSubheadings: Array<{ label: string; items: NavItemType[] }> = [
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
            { label: "Settings", href: "/settings", icon: Settings01 },
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
