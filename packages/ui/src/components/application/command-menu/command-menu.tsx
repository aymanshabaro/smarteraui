"use client";

import type { ComponentPropsWithRef, ComponentType, FC, ReactNode } from "react";
import { createContext, useContext } from "react";
import { useFilter } from "react-aria";
import type {
    AutocompleteProps as AriaAutocompleteProps,
    MenuItemProps as AriaMenuItemProps,
    MenuProps as AriaMenuProps,
    MenuSectionProps as AriaMenuSectionProps,
    PopoverProps as AriaPopoverProps,
    SearchFieldProps as AriaSearchFieldProps,
} from "react-aria-components";
import {
    Autocomplete as AriaAutocomplete,
    Dialog as AriaDialog,
    DialogTrigger as AriaDialogTrigger,
    Header as AriaHeader,
    Input as AriaInput,
    Menu as AriaMenu,
    MenuItem as AriaMenuItem,
    MenuSection as AriaMenuSection,
    Popover as AriaPopover,
    SearchField as AriaSearchField,
} from "react-aria-components";
import { SearchLg } from "@properui/icons";
import { Avatar } from "@/components/base/avatar/avatar";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";
import { cx, sortCx } from "@/utils/cx";

/**
 * How a command menu item arranges its label and supporting text.
 *
 * - `inline` — label and supporting text sit on one line, supporting text pushed to the end.
 * - `stacked` — supporting text sits on a second line underneath the label.
 */
export type CommandMenuLayout = "inline" | "stacked";

type IconComponentType = ComponentType<{ className?: string; "aria-hidden"?: boolean | "true" | "false" }>;

const styles = sortCx({
    root: [
        // Card surface — same elevation vocabulary as the dropdown popover, one step larger.
        "bg-primary ring-secondary_alt flex w-full max-w-160 flex-col overflow-hidden rounded-xl shadow-xl ring-1",
    ].join(" "),
    layouts: {
        inline: {
            item: "gap-2 py-2",
            text: "flex-row items-center gap-2",
            icon: "size-5",
        },
        stacked: {
            item: "gap-3 py-2.5",
            text: "flex-col gap-0.5",
            icon: "mt-0.5 size-5 self-start",
        },
    },
});

/** Avatar scale per layout — inline rows keep a single-line height, stacked rows fit two lines. */
const avatarSizes: Record<CommandMenuLayout, "xs" | "md"> = { inline: "xs", stacked: "md" };

const CommandMenuContext = createContext<{ layout: CommandMenuLayout }>({ layout: "inline" });

export interface CommandMenuProps extends Omit<AriaAutocompleteProps, "children" | "filter"> {
    /**
     * How every item in the menu lays out its label and supporting text.
     * @default "inline"
     */
    layout?: CommandMenuLayout;
    /** Predicate deciding whether an item matches the search value. Defaults to a case/accent-insensitive "contains". */
    filter?: (textValue: string, inputValue: string) => boolean;
    /** Class name merged onto the card. */
    className?: string;
    /** The search field, list and footer of the menu. */
    children: ReactNode;
}

const CommandMenuRoot = ({ layout = "inline", filter, className, children, ...props }: CommandMenuProps) => {
    const { contains } = useFilter({ sensitivity: "base" });

    return (
        <div className={cx(styles.root, className)}>
            <CommandMenuContext.Provider value={{ layout }}>
                <AriaAutocomplete filter={filter ?? contains} {...props}>
                    {children}
                </AriaAutocomplete>
            </CommandMenuContext.Provider>
        </div>
    );
};

export interface CommandMenuSearchProps extends Omit<AriaSearchFieldProps, "children" | "className"> {
    /** Placeholder shown while the field is empty. */
    placeholder?: string;
    /** Icon rendered before the field. Pass `null` to remove it. */
    icon?: IconComponentType | null;
    /** Class name merged onto the field wrapper. */
    className?: string;
}

const CommandMenuSearch = ({ placeholder = "Search", icon: Icon = SearchLg, className, ...props }: CommandMenuSearchProps) => (
    <AriaSearchField aria-label="Search" {...props} className={cx("border-secondary relative flex w-full items-center border-b", className)}>
        {Icon && <Icon aria-hidden="true" className="text-fg-quaternary pointer-events-none absolute start-4 size-5" />}

        <AriaInput
            placeholder={placeholder}
            className={cx(
                "text-md text-primary placeholder:text-placeholder m-0 w-full bg-transparent py-3.5 outline-hidden [&::-webkit-search-cancel-button]:hidden",
                Icon ? "ps-12 pe-4" : "px-4",
            )}
        />
    </AriaSearchField>
);

export interface CommandMenuListProps<T extends object> extends AriaMenuProps<T> {
    /** Class name merged onto the scroll container. */
    className?: string;
}

const CommandMenuList = <T extends object>({ className, ...props }: CommandMenuListProps<T>) => (
    <AriaMenu
        aria-label={props["aria-label"] ?? (props["aria-labelledby"] ? undefined : "Suggestions")}
        {...props}
        className={cx("flex max-h-100 flex-col overflow-y-auto p-2 outline-hidden select-none", className)}
    />
);

export interface CommandMenuGroupProps<T extends object> extends Omit<AriaMenuSectionProps<T>, "children"> {
    /** Heading rendered above the group. */
    label?: ReactNode;
    /** Class name merged onto the group. */
    className?: string;
    /** The items of the group. */
    children?: ReactNode;
}

const CommandMenuGroup = <T extends object>({ label, className, children, ...props }: CommandMenuGroupProps<T>) => (
    <AriaMenuSection {...props} className={cx("flex flex-col gap-0.5 first:mt-0", label ? "mt-3" : "mt-1", className)}>
        {label && <AriaHeader className="text-quaternary px-3 pb-1 text-xs font-semibold">{label}</AriaHeader>}
        {children}
    </AriaMenuSection>
);

export interface CommandMenuItemProps extends Omit<AriaMenuItemProps, "children"> {
    /** The primary label of the item. */
    label: ReactNode;
    /** Supporting text — at the end of the row when `inline`, below the label when `stacked`. */
    description?: ReactNode;
    /** Icon rendered before the label. */
    icon?: IconComponentType;
    /** Avatar image rendered before the label. */
    avatarUrl?: string;
    /** Alt text for `avatarUrl`. Empty by default, since the label already names the row. */
    avatarAlt?: string;
    /** Keyboard shortcut rendered at the end of the row. */
    shortcut?: string;
    /** Arbitrary content (badge, meta text, …) rendered at the end of the row. */
    addon?: ReactNode;
    /** Overrides the layout inherited from the root. */
    layout?: CommandMenuLayout;
}

const CommandMenuItem = ({ label, description, icon: Icon, avatarUrl, avatarAlt, shortcut, addon, layout, className, ...props }: CommandMenuItemProps) => {
    const { layout: rootLayout } = useContext(CommandMenuContext);
    const itemLayout = layout ?? rootLayout;
    const layoutStyles = styles.layouts[itemLayout];

    // Searching should match the supporting text too (an email, a description…), so both feed the text value.
    const textValue = props.textValue ?? ([label, description].filter((part) => typeof part === "string").join(" ") || undefined);

    return (
        <AriaMenuItem
            {...props}
            textValue={textValue}
            className={(state) =>
                cx(
                    "outline-focus-ring flex cursor-pointer items-center rounded-md px-3 outline-hidden transition duration-100 ease-linear",
                    layoutStyles.item,
                    !state.isDisabled && "hover:bg-primary_hover",
                    state.isFocused && "bg-primary_hover",
                    state.isFocusVisible && "outline-2 -outline-offset-2",
                    state.isDisabled && "cursor-not-allowed opacity-50",
                    typeof className === "function" ? className(state) : className,
                )
            }
        >
            {avatarUrl && (
                // Decorative by default — the label already announces who the row is about.
                <Avatar size={avatarSizes[itemLayout]} src={avatarUrl} alt={avatarAlt ?? ""} className="shrink-0" />
            )}

            {!avatarUrl && Icon && <Icon aria-hidden="true" className={cx("text-fg-quaternary shrink-0", layoutStyles.icon)} />}

            <div className={cx("flex min-w-0 flex-1", layoutStyles.text)}>
                <span className="text-secondary truncate text-sm font-medium">{label}</span>
                {description && <span className={cx("text-tertiary truncate text-sm", itemLayout === "inline" && "ms-auto")}>{description}</span>}
            </div>

            {addon && <div className="flex shrink-0 items-center gap-2">{addon}</div>}

            {shortcut && <CommandMenuShortcut>{shortcut}</CommandMenuShortcut>}
        </AriaMenuItem>
    );
};

export type CommandMenuShortcutProps = ComponentPropsWithRef<"kbd">;

const CommandMenuShortcut = ({ className, ...props }: CommandMenuShortcutProps) => (
    <kbd
        {...props}
        className={cx(
            "text-quaternary ring-secondary flex shrink-0 items-center rounded px-1 py-px font-sans text-xs font-medium ring-1 select-none ring-inset",
            className,
        )}
    />
);

export interface CommandMenuEmptyProps extends Omit<ComponentPropsWithRef<"div">, "title"> {
    /** Icon shown inside the featured icon. */
    icon?: FC<{ className?: string }>;
    /** Headline of the empty state. */
    title?: ReactNode;
    /** Supporting copy of the empty state. */
    description?: ReactNode;
}

const CommandMenuEmpty = ({ icon = SearchLg, title = "No results found", description, children, className, ...props }: CommandMenuEmptyProps) => (
    <div {...props} className={cx("flex flex-col items-center justify-center gap-3 px-6 py-10 text-center", className)}>
        <FeaturedIcon icon={icon} size="lg" color="gray" theme="modern" />

        <div className="flex max-w-88 flex-col gap-1">
            <p className="text-primary text-sm font-semibold">{title}</p>
            {description && <p className="text-tertiary text-sm">{description}</p>}
        </div>

        {children}
    </div>
);

const CommandMenuFooter = ({ className, ...props }: ComponentPropsWithRef<"div">) => (
    <div {...props} className={cx("border-secondary bg-secondary flex flex-wrap items-center gap-x-4 gap-y-2 border-t px-4 py-3", className)} />
);

export interface CommandMenuPopoverProps extends Omit<AriaPopoverProps, "children"> {
    /** Accessible name of the popover dialog. */
    "aria-label"?: string;
    /** The `CommandMenu` card to anchor to the trigger. */
    children: ReactNode;
}

const CommandMenuPopover = ({ "aria-label": ariaLabel = "Command menu", className, children, ...props }: CommandMenuPopoverProps) => (
    <AriaPopover
        placement="bottom start"
        offset={8}
        {...props}
        className={(state) =>
            cx(
                "origin-(--trigger-anchor-point) will-change-transform",
                state.isEntering &&
                    "animate-in fade-in placement-right:slide-in-from-left-0.5 placement-top:slide-in-from-bottom-0.5 placement-bottom:slide-in-from-top-0.5 duration-150 ease-out",
                state.isExiting &&
                    "animate-out fade-out placement-right:slide-out-to-left-0.5 placement-top:slide-out-to-bottom-0.5 placement-bottom:slide-out-to-top-0.5 duration-100 ease-in",
                typeof className === "function" ? className(state) : className,
            )
        }
    >
        <AriaDialog aria-label={ariaLabel} className="flex outline-hidden">
            {children}
        </AriaDialog>
    </AriaPopover>
);

const CommandMenu = CommandMenuRoot as typeof CommandMenuRoot & {
    /** Wraps a trigger element and a `CommandMenu.Popover` so the menu opens as a popover. */
    Trigger: typeof AriaDialogTrigger;
    /** Positions a `CommandMenu` under its trigger. */
    Popover: typeof CommandMenuPopover;
    /** The search field that filters the list. */
    Search: typeof CommandMenuSearch;
    /** The scrollable list of results. */
    List: typeof CommandMenuList;
    /** A labelled group of items inside the list. */
    Group: typeof CommandMenuGroup;
    /** A single result row. */
    Item: typeof CommandMenuItem;
    /** The keyboard-shortcut chip used by items and the footer. */
    Shortcut: typeof CommandMenuShortcut;
    /** The "no results" block — pass it to `List` via `renderEmptyState`. */
    Empty: typeof CommandMenuEmpty;
    /** The hint bar pinned under the list. */
    Footer: typeof CommandMenuFooter;
};

CommandMenu.Trigger = AriaDialogTrigger;
CommandMenu.Popover = CommandMenuPopover;
CommandMenu.Search = CommandMenuSearch;
CommandMenu.List = CommandMenuList;
CommandMenu.Group = CommandMenuGroup;
CommandMenu.Item = CommandMenuItem;
CommandMenu.Shortcut = CommandMenuShortcut;
CommandMenu.Empty = CommandMenuEmpty;
CommandMenu.Footer = CommandMenuFooter;

export { CommandMenu };
