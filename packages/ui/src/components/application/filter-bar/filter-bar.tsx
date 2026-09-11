"use client";

import type { ComponentPropsWithRef, ReactNode } from "react";
import type { PopoverProps as AriaPopoverProps } from "react-aria-components";
import { Dialog as AriaDialog, DialogTrigger as AriaDialogTrigger, Popover as AriaPopover } from "react-aria-components";
import { ChevronDown, FilterLines } from "@properui/icons";
import { cx, sortCx } from "../../../utils/cx";
import { Badge } from "../../base/badges/badges";
import { Button, type ButtonProps } from "../../base/buttons/button";
import { CloseButton } from "../../base/buttons/close-button";

export const styles = sortCx({
    common: {
        /** The bar itself. Wraps so the actions drop onto their own line on narrow viewports. */
        root: "flex flex-wrap gap-3",
        /** Start-aligned area: search fields, tabs, dropdowns, advanced filter rows. */
        content: "flex min-w-0 flex-1 flex-wrap gap-3",
        /** End-aligned area: date pickers, the filter button, "Clear all". */
        actions: "ms-auto flex shrink-0 items-center gap-3",
        /** One advanced filter row: its inputs plus the remove button. */
        filterRow: "flex items-center gap-1",
        /** The field / operator / value inputs inside a filter row. */
        filterRowFields: "flex items-center gap-3",
        /** Wraps the filter button's label so the count badge sits tight against it. */
        filterButtonLabel: "flex items-center gap-1.5",
        /** The filter dropdown's floating panel. */
        popover: "bg-primary ring-secondary_alt w-70 origin-(--trigger-anchor-point) rounded-lg shadow-lg ring-1 will-change-transform",
    },
});

export type FilterBarRootProps = ComponentPropsWithRef<"div">;

/**
 * Layout container for a filter bar. Lay its children out directly, or group them with
 * `FilterBar.Content` (start side) and `FilterBar.Actions` (end side).
 */
const Root = ({ className, ...props }: FilterBarRootProps) => <div {...props} className={cx(styles.common.root, className)} />;
Root.displayName = "FilterBarRoot";

export type FilterBarContentProps = ComponentPropsWithRef<"div">;

/** The start-aligned area of the bar. Grows to fill the row and wraps its own children. */
const Content = ({ className, ...props }: FilterBarContentProps) => <div {...props} className={cx(styles.common.content, className)} />;
Content.displayName = "FilterBarContent";

export type FilterBarActionsProps = ComponentPropsWithRef<"div">;

/** The end-aligned area of the bar. Never shrinks, and pushes itself to the end of the row. */
const Actions = ({ className, ...props }: FilterBarActionsProps) => <div {...props} className={cx(styles.common.actions, className)} />;
Actions.displayName = "FilterBarActions";

export interface FilterBarFilterRowProps extends ComponentPropsWithRef<"div"> {
    /** Called when the row's remove button is pressed. Omit it to render the row without one. */
    onRemove?: () => void;
    /**
     * Accessible name of the remove button.
     * @default "Remove filter"
     */
    removeLabel?: string;
    /** Classes merged onto the element that wraps the row's inputs. */
    fieldsClassName?: string;
}

/**
 * One row of an advanced filter: a field select, an operator select and a value input,
 * followed by the button that removes the row.
 */
const FilterRow = ({ children, className, fieldsClassName, onRemove, removeLabel = "Remove filter", ...props }: FilterBarFilterRowProps) => (
    <div {...props} className={cx(styles.common.filterRow, className)}>
        <div className={cx(styles.common.filterRowFields, fieldsClassName)}>{children}</div>

        {/* `slot={null}` opts out of the dialog close slot: a filter row is not a dialog. */}
        {onRemove && <CloseButton slot={null} size="sm" label={removeLabel} onPress={onRemove} />}
    </div>
);
FilterRow.displayName = "FilterBarFilterRow";

export interface FilterBarFilterIconButtonProps extends Omit<ButtonProps, "children" | "iconLeading" | "iconTrailing"> {
    /**
     * Accessible name of the button.
     * @default "Filters"
     */
    label?: string;
}

/** Icon-only filter button, used where the bar has no room for a label. */
const FilterIconButton = ({ label = "Filters", color = "secondary", size = "sm", ...props }: FilterBarFilterIconButtonProps) => (
    <Button {...props} aria-label={label} color={color} size={size} iconLeading={FilterLines} />
);
FilterIconButton.displayName = "FilterBarFilterIconButton";

export interface FilterBarFilterButtonProps extends Omit<ButtonProps, "iconLeading" | "iconTrailing"> {
    /** Number of applied filters. Rendered as a badge after the label when greater than zero. */
    count?: number;
    /**
     * Renders the filled background that marks the bar as filtered.
     * @default true when `count` is greater than zero
     */
    isActive?: boolean;
    /**
     * Hides the trailing chevron, for bars where the button is not a dropdown trigger.
     * @default false
     */
    hideChevron?: boolean;
    /**
     * Button label.
     * @default "Filters"
     */
    children?: ReactNode;
}

/** The bar's "Filters" button: filter icon, label, applied-filter count and a chevron. */
const FilterButton = ({
    children = "Filters",
    count,
    isActive,
    hideChevron = false,
    color = "secondary",
    size = "sm",
    className,
    ...props
}: FilterBarFilterButtonProps) => {
    const active = isActive ?? (count ?? 0) > 0;

    return (
        <Button
            {...props}
            color={color}
            size={size}
            iconLeading={FilterLines}
            iconTrailing={hideChevron ? undefined : ChevronDown}
            className={cx("max-h-9", active && "bg-primary_hover", className)}
        >
            <span className={styles.common.filterButtonLabel}>
                {children}
                {count ? (
                    <Badge type="modern" size="sm" color="gray">
                        {count}
                    </Badge>
                ) : null}
            </span>
        </Button>
    );
};
FilterButton.displayName = "FilterBarFilterButton";

export interface FilterBarFilterDropdownProps extends Pick<FilterBarFilterButtonProps, "count" | "isActive" | "isDisabled"> {
    /**
     * Label of the trigger button.
     * @default "Filters"
     */
    label?: ReactNode;
    /** Contents of the floating panel. */
    children: ReactNode;
    /**
     * Accessible name of the panel.
     * @default "Filters"
     */
    dialogLabel?: string;
    /** Whether the panel is open by default (uncontrolled). */
    defaultOpen?: boolean;
    /** Whether the panel is open (controlled). */
    isOpen?: boolean;
    /** Called when the panel opens or closes. */
    onOpenChange?: (isOpen: boolean) => void;
    /**
     * Where the panel is placed relative to the trigger.
     * @default "bottom end"
     */
    placement?: AriaPopoverProps["placement"];
    /** Classes merged onto the trigger button. */
    className?: string;
    /** Classes merged onto the floating panel. */
    popoverClassName?: string;
}

/** The "Filters" button paired with the panel it opens. */
const FilterDropdown = ({
    label = "Filters",
    children,
    count,
    isActive,
    isDisabled,
    dialogLabel = "Filters",
    defaultOpen,
    isOpen,
    onOpenChange,
    placement = "bottom end",
    className,
    popoverClassName,
}: FilterBarFilterDropdownProps) => (
    <AriaDialogTrigger defaultOpen={defaultOpen} isOpen={isOpen} onOpenChange={onOpenChange}>
        <FilterButton count={count} isActive={isActive} isDisabled={isDisabled} className={className}>
            {label}
        </FilterButton>

        <AriaPopover
            offset={8}
            placement={placement}
            className={(state) =>
                cx(
                    styles.common.popover,
                    state.isEntering &&
                        "animate-in fade-in placement-bottom:slide-in-from-top-0.5 placement-top:slide-in-from-bottom-0.5 duration-150 ease-out",
                    state.isExiting && "animate-out fade-out placement-bottom:slide-out-to-top-0.5 placement-top:slide-out-to-bottom-0.5 duration-100 ease-in",
                    popoverClassName,
                )
            }
        >
            <AriaDialog aria-label={dialogLabel} className="outline-hidden">
                {children}
            </AriaDialog>
        </AriaPopover>
    </AriaDialogTrigger>
);
FilterDropdown.displayName = "FilterBarFilterDropdown";

const FilterBar = Root as typeof Root & {
    Root: typeof Root;
    Content: typeof Content;
    Actions: typeof Actions;
    FilterRow: typeof FilterRow;
    FilterIconButton: typeof FilterIconButton;
    FilterButton: typeof FilterButton;
    FilterDropdown: typeof FilterDropdown;
};
FilterBar.displayName = "FilterBar";

FilterBar.Root = Root;
FilterBar.Content = Content;
FilterBar.Actions = Actions;
FilterBar.FilterRow = FilterRow;
FilterBar.FilterIconButton = FilterIconButton;
FilterBar.FilterButton = FilterButton;
FilterBar.FilterDropdown = FilterDropdown;

export { FilterBar };
