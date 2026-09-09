"use client";

import { type FC, type ReactNode, createContext, useContext } from "react";
import type { Key as AriaKey } from "react-aria-components";
import { Breadcrumb as AriaBreadcrumb, Breadcrumbs as AriaBreadcrumbs, Button as AriaButton, Link as AriaLink } from "react-aria-components";
import { ChevronRight, ChevronSelectorVertical, SlashDivider } from "@smarteraui/icons";
import { Avatar } from "@/components/base/avatar/avatar";
import { Dropdown } from "@/components/base/dropdown/dropdown";
import { cx, sortCx } from "@/utils/cx";

const styles = sortCx({
    list: "relative flex",
    item: "flex items-center current:overflow-hidden",
    link: [
        "group inline-flex items-center justify-center gap-1 rounded-md outline-focus-ring transition duration-100 ease-linear",
        "focus-visible:outline-2 focus-visible:outline-offset-2",
        // Let the current item shrink and truncate instead of overflowing the list.
        "in-current:max-w-full",
    ].join(" "),
    icon: "size-5 shrink-0 text-fg-quaternary transition-inherit-all group-hover:text-fg-quaternary_hover",
    label: "text-sm font-semibold whitespace-nowrap transition-inherit-all in-current:truncate",
    labelDefault: "text-quaternary group-hover:text-tertiary_hover",
    // Directional dividers mirror in RTL so the hierarchy still reads outwards.
    divider: "size-4 shrink-0 stroke-[2.25px] text-utility-neutral-300 rtl:-scale-x-100",

    types: {
        text: {
            list: "gap-1.5 md:gap-2",
            item: "gap-1.5 md:gap-2",
            link: "",
            linkCurrent: "",
            label: "",
            labelCurrent: "text-brand-secondary group-hover:text-brand-secondary",
        },
        "text-line": {
            list: "gap-1.5 py-2 ps-2 after:pointer-events-none after:absolute after:inset-0 after:border-t after:border-b after:border-secondary md:gap-2",
            item: "gap-1.5 md:gap-2",
            link: "",
            linkCurrent: "",
            label: "",
            labelCurrent: "text-brand-secondary group-hover:text-brand-secondary",
        },
        button: {
            list: "gap-0.5 md:gap-1",
            item: "gap-0.5 md:gap-1",
            link: "p-1 hover:bg-primary_hover",
            linkCurrent: "bg-primary_hover",
            label: "px-1",
            labelCurrent: "text-fg-tertiary_hover group-hover:text-tertiary_hover",
        },
    },

    account: {
        root: "flex cursor-pointer items-center gap-1.5 rounded-lg outline-focus-ring outline-offset-2 focus-visible:outline-2",
        avatarFrame: "flex rounded-lg bg-primary p-0.5 ring-[0.5px] ring-secondary ring-inset",
        name: "text-sm font-semibold text-primary",
        chevron: "size-3 shrink-0 stroke-3 text-fg-quaternary",
    },
});

const dividerIcons = {
    chevron: ChevronRight,
    slash: SlashDivider,
};

/** The visual treatment shared by every item of a breadcrumb trail. */
export type BreadcrumbsType = keyof typeof styles.types;

/** The icon rendered between two breadcrumb items. */
export type BreadcrumbsDivider = keyof typeof dividerIcons;

/** A single entry of a breadcrumb dropdown menu. */
export interface BreadcrumbsMenuItem {
    /** A unique id, passed to `onAction` when the entry is selected. */
    id: string;
    /** The visible label of the entry. */
    label: string;
    /** Link target of the entry. */
    href?: string;
    /** Icon rendered before the label. */
    icon?: FC<{ className?: string }>;
}

const BreadcrumbsStyleContext = createContext<{ type: BreadcrumbsType; divider: BreadcrumbsDivider }>({ type: "text", divider: "chevron" });

const BreadcrumbDivider = ({ divider }: { divider: BreadcrumbsDivider }) => {
    const Icon = dividerIcons[divider];

    return <Icon aria-hidden="true" className={styles.divider} />;
};

const BreadcrumbsMenu = ({ items, onAction, width }: { items: BreadcrumbsMenuItem[]; onAction?: (key: AriaKey) => void; width: string }) => (
    <Dropdown.Popover placement="bottom start" className={width}>
        <Dropdown.Menu onAction={onAction}>
            {items.map((item) => (
                <Dropdown.Item key={item.id} id={item.id} href={item.href} icon={item.icon} label={item.label} />
            ))}
        </Dropdown.Menu>
    </Dropdown.Popover>
);

export interface BreadcrumbsProps {
    /**
     * The visual treatment of the breadcrumb items.
     *
     * @default "text"
     */
    type?: BreadcrumbsType;
    /**
     * The icon rendered between two items.
     *
     * @default "chevron"
     */
    divider?: BreadcrumbsDivider;
    /**
     * The accessible label of the surrounding navigation landmark.
     *
     * @default "Breadcrumb"
     */
    "aria-label"?: string;
    /** Whether every breadcrumb of the trail is disabled. */
    isDisabled?: boolean;
    /** Handler called with the item id when a breadcrumb is pressed. */
    onAction?: (key: AriaKey) => void;
    /** The class name applied to the breadcrumb list. */
    className?: string;
    /** The breadcrumb items. */
    children?: ReactNode;
}

const BreadcrumbsRoot = ({
    type = "text",
    divider = "chevron",
    "aria-label": ariaLabel = "Breadcrumb",
    isDisabled,
    onAction,
    className,
    children,
}: BreadcrumbsProps) => (
    <BreadcrumbsStyleContext.Provider value={{ type, divider }}>
        <nav aria-label={ariaLabel} className="min-w-0">
            <AriaBreadcrumbs isDisabled={isDisabled} onAction={onAction} className={cx(styles.list, styles.types[type].list, className)}>
                {children}
            </AriaBreadcrumbs>
        </nav>
    </BreadcrumbsStyleContext.Provider>
);

export interface BreadcrumbsItemProps {
    /** Link target of the item. The last item of a trail is always rendered as the current page. */
    href?: string;
    /** Icon rendered before the label. */
    icon?: FC<{ className?: string }>;
    /** The accessible label of the item — required when the item only renders an icon. */
    "aria-label"?: string;
    /** A unique id, passed to the `onAction` handler of the parent. */
    id?: AriaKey;
    /** The class name applied to the item link. */
    className?: string;
    /** The class name applied to the item label. */
    labelClassName?: string;
    /** The label of the item. */
    children?: ReactNode;
}

const BreadcrumbsItem = ({ href, icon: Icon, "aria-label": ariaLabel, id, className, labelClassName, children }: BreadcrumbsItemProps) => {
    const { type, divider } = useContext(BreadcrumbsStyleContext);

    return (
        <AriaBreadcrumb id={id} className={cx(styles.item, styles.types[type].item)}>
            {({ isCurrent }) => (
                <>
                    <AriaLink
                        href={href}
                        aria-label={ariaLabel}
                        className={cx(styles.link, styles.types[type].link, isCurrent ? styles.types[type].linkCurrent : href && "cursor-pointer", className)}
                    >
                        {Icon && <Icon aria-hidden="true" className={styles.icon} />}

                        {children != null && (
                            <span
                                className={cx(
                                    styles.label,
                                    styles.types[type].label,
                                    isCurrent ? styles.types[type].labelCurrent : styles.labelDefault,
                                    labelClassName,
                                )}
                            >
                                {children}
                            </span>
                        )}
                    </AriaLink>

                    {!isCurrent && <BreadcrumbDivider divider={divider} />}
                </>
            )}
        </AriaBreadcrumb>
    );
};

export interface BreadcrumbsCollapsedProps {
    /** The items hidden behind the ellipsis. */
    items: BreadcrumbsMenuItem[];
    /**
     * The accessible label of the ellipsis trigger.
     *
     * @default "See all breadcrumb items"
     */
    "aria-label"?: string;
    /** Handler called with the item id when a hidden item is selected. */
    onAction?: (key: AriaKey) => void;
    /** The class name applied to the ellipsis trigger. */
    className?: string;
}

const BreadcrumbsCollapsed = ({ items, "aria-label": ariaLabel = "See all breadcrumb items", onAction, className }: BreadcrumbsCollapsedProps) => {
    const { type, divider } = useContext(BreadcrumbsStyleContext);

    return (
        <AriaBreadcrumb className={cx(styles.item, styles.types[type].item)}>
            {({ isCurrent }) => (
                <>
                    <Dropdown.Root>
                        <AriaButton aria-label={ariaLabel} className={cx(styles.link, styles.types[type].link, "cursor-pointer", className)}>
                            <span aria-hidden="true" className={cx(styles.label, styles.types[type].label, styles.labelDefault)}>
                                ...
                            </span>
                        </AriaButton>

                        <BreadcrumbsMenu items={items} onAction={onAction} width="w-50" />
                    </Dropdown.Root>

                    {!isCurrent && <BreadcrumbDivider divider={divider} />}
                </>
            )}
        </AriaBreadcrumb>
    );
};

interface AccountContentProps {
    /** The avatar image of the account. */
    src: string;
    /** The alt text of the avatar image — leave empty when the name is already visible. */
    alt?: string;
    /** Whether to render the selector chevron of a menu trigger. */
    hasMenu?: boolean;
    /** The name of the account. */
    children: ReactNode;
}

const AccountContent = ({ src, alt = "", hasMenu, children }: AccountContentProps) => (
    <>
        <span className={styles.account.avatarFrame}>
            <Avatar size="xs" src={src} alt={alt} className="shadow-md" contentClassName="rounded-md" />
        </span>

        <span className={styles.account.name}>{children}</span>

        {hasMenu && <ChevronSelectorVertical aria-hidden="true" className={styles.account.chevron} />}
    </>
);

export interface BreadcrumbsAccountProps extends Omit<AccountContentProps, "hasMenu"> {
    /** Link target of the account item. */
    href?: string;
    /** A unique id, passed to the `onAction` handler of the parent. */
    id?: AriaKey;
    /** The class name applied to the account link. */
    className?: string;
}

const BreadcrumbsAccount = ({ src, alt, href, id, className, children }: BreadcrumbsAccountProps) => {
    const { type, divider } = useContext(BreadcrumbsStyleContext);

    return (
        <AriaBreadcrumb id={id} className={cx(styles.item, styles.types[type].item)}>
            {({ isCurrent }) => (
                <>
                    <AriaLink href={href} className={cx(styles.account.root, className)}>
                        <AccountContent src={src} alt={alt}>
                            {children}
                        </AccountContent>
                    </AriaLink>

                    {!isCurrent && <BreadcrumbDivider divider={divider} />}
                </>
            )}
        </AriaBreadcrumb>
    );
};

export interface BreadcrumbsAccountMenuProps extends Omit<AccountContentProps, "hasMenu"> {
    /** The entries of the account menu. */
    items: BreadcrumbsMenuItem[];
    /** Handler called with the entry id when a menu entry is selected. */
    onAction?: (key: AriaKey) => void;
    /** The class name applied to the account trigger. */
    className?: string;
}

const BreadcrumbsAccountMenu = ({ src, alt, items, onAction, className, children }: BreadcrumbsAccountMenuProps) => {
    const { type, divider } = useContext(BreadcrumbsStyleContext);

    return (
        <AriaBreadcrumb className={cx(styles.item, styles.types[type].item)}>
            {({ isCurrent }) => (
                <>
                    <Dropdown.Root>
                        <AriaButton className={cx(styles.account.root, className)}>
                            <AccountContent src={src} alt={alt} hasMenu>
                                {children}
                            </AccountContent>
                        </AriaButton>

                        <BreadcrumbsMenu items={items} onAction={onAction} width="w-56" />
                    </Dropdown.Root>

                    {!isCurrent && <BreadcrumbDivider divider={divider} />}
                </>
            )}
        </AriaBreadcrumb>
    );
};

export const Breadcrumbs = Object.assign(BreadcrumbsRoot, {
    Item: BreadcrumbsItem,
    Collapsed: BreadcrumbsCollapsed,
    Account: BreadcrumbsAccount,
    AccountMenu: BreadcrumbsAccountMenu,
});
