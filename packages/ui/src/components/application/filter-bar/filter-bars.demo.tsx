"use client";

import { type ReactNode, useState } from "react";
import { parseDate } from "@internationalized/date";
import { FilterLines, Plus, SearchLg, Trash01 } from "@properui/icons";
import { Button } from "../../base/buttons/button";
import { CloseButton } from "../../base/buttons/close-button";
import { Checkbox } from "../../base/checkbox/checkbox";
import { Input } from "../../base/input/input";
import { Select } from "../../base/select/select";
import type { SelectItemType } from "../../base/select/select-shared";
import { FeaturedIcon } from "../../foundations/featured-icon/featured-icon";
import { DateRangePicker } from "../date-picker/date-range-picker";
import { SlideoutMenu } from "../slideout-menus/slideout-menu";
import { Tabs } from "../tabs/tabs";
import { FilterBar } from "./filter-bar";

/* -------------------------------------------------------------------------------------------------
 * Shared demo data — fixed so every preview and screenshot is deterministic.
 * ---------------------------------------------------------------------------------------------- */

const WEEK = { start: parseDate("2026-09-09"), end: parseDate("2026-09-15") };
const YEAR = { start: parseDate("2026-09-09"), end: parseDate("2027-09-09") };

const periods: SelectItemType[] = [
    { id: "7-days", label: "Last 7 days" },
    { id: "14-days", label: "Last 14 days" },
    { id: "30-days", label: "Last 30 days" },
    { id: "90-days", label: "Last 90 days" },
];

const statuses: SelectItemType[] = [
    { id: "paid", label: "Paid" },
    { id: "pending", label: "Pending" },
    { id: "failed", label: "Failed" },
    { id: "refunded", label: "Refunded" },
];

const categories: SelectItemType[] = [
    { id: "all", label: "View all" },
    { id: "electronics", label: "Electronics" },
    { id: "clothing", label: "Clothing" },
    { id: "furniture", label: "Furniture" },
];

const sortOrders: SelectItemType[] = [
    { id: "descending", label: "Descending" },
    { id: "ascending", label: "Ascending" },
];

const teams: SelectItemType[] = [
    { id: "engineering", label: "Engineering" },
    { id: "design", label: "Design" },
    { id: "product", label: "Product" },
    { id: "marketing", label: "Marketing" },
];

const fields: SelectItemType[] = [
    { id: "status", label: "Status" },
    { id: "email", label: "Email" },
    { id: "team", label: "Team" },
    { id: "name", label: "Name" },
];

const operators: SelectItemType[] = [
    { id: "equals", label: "Equals" },
    { id: "contains", label: "Contains" },
    { id: "does-not-contain", label: "Does not contain" },
    { id: "starts-with", label: "Starts with" },
];

const viewTabs = [
    { id: "all", label: "View all" },
    { id: "active", label: "Active" },
    { id: "archived", label: "Archived" },
];

/** Renders one option of a `Select`. Demo-only, not exported. */
const renderItem = (item: SelectItemType) => <Select.Item id={item.id}>{item.label}</Select.Item>;

/** The search field every bar shares. Demo-only, not exported. */
const SearchField = ({ className }: { className?: string }) => (
    <Input aria-label="Search" size="sm" placeholder="Search" icon={SearchLg} shortcut className={className} />
);

/* -------------------------------------------------------------------------------------------------
 * 1. Filter bar example — search, a date range and the filter button.
 * ---------------------------------------------------------------------------------------------- */

const SearchAndDatesBar = () => (
    <FilterBar>
        <SearchField className="min-w-0 flex-1 sm:max-w-70" />

        <FilterBar.Actions>
            <DateRangePicker className="max-md:hidden" />
            <FilterBar.FilterButton />
        </FilterBar.Actions>
    </FilterBar>
);

export const FilterBarExample = () => <SearchAndDatesBar />;

/* -------------------------------------------------------------------------------------------------
 * 2. Simple
 * ---------------------------------------------------------------------------------------------- */

export const Simple = () => <SearchAndDatesBar />;

/* -------------------------------------------------------------------------------------------------
 * 3. Tabs and search
 * ---------------------------------------------------------------------------------------------- */

export const TabsAndSearch = () => (
    <FilterBar className="max-md:flex-col">
        <Tabs defaultSelectedKey="all" className="w-auto">
            <Tabs.List type="button-minimal" items={viewTabs}>
                {(item) => <Tabs.Item {...item} />}
            </Tabs.List>
            {/* The bar owns the results, so the panels stay empty — they exist to keep each tab's `aria-controls` valid. */}
            {viewTabs.map((tab) => (
                <Tabs.Panel key={tab.id} id={tab.id} />
            ))}
        </Tabs>

        <FilterBar.Actions className="max-md:w-full">
            <SearchField className="min-w-0 max-md:flex-1 md:w-70" />
            <FilterBar.FilterIconButton className="max-h-9 md:hidden" />
            <FilterBar.FilterButton hideChevron className="max-md:hidden" />
        </FilterBar.Actions>
    </FilterBar>
);

/* -------------------------------------------------------------------------------------------------
 * 4. Tabs and date picker
 * ---------------------------------------------------------------------------------------------- */

const rangeTabs = [
    { id: "12-months", long: "12 months", short: "12m" },
    { id: "30-days", long: "30 days", short: "30d" },
    { id: "7-days", long: "7 days", short: "7d" },
    { id: "24-hours", long: "24 hours", short: "24h" },
];

export const TabsAndDatePicker = () => (
    <FilterBar>
        <Tabs defaultSelectedKey="12-months" className="w-auto">
            <Tabs.List type="button-minimal">
                {rangeTabs.map((tab) => (
                    <Tabs.Item key={tab.id} id={tab.id}>
                        <span className="max-md:hidden">{tab.long}</span>
                        <span className="md:hidden">{tab.short}</span>
                    </Tabs.Item>
                ))}
            </Tabs.List>
            {rangeTabs.map((tab) => (
                <Tabs.Panel key={tab.id} id={tab.id} />
            ))}
        </Tabs>

        <FilterBar.Actions>
            <DateRangePicker defaultValue={YEAR} className="max-md:hidden" />
            <FilterBar.FilterButton hideChevron />
        </FilterBar.Actions>
    </FilterBar>
);

/* -------------------------------------------------------------------------------------------------
 * 5. Date filters
 * ---------------------------------------------------------------------------------------------- */

export const DateFilters = () => (
    <FilterBar className="max-md:flex-col">
        <FilterBar.Content>
            <Button color="secondary" size="sm" className="max-lg:hidden">
                Today
            </Button>
            <Select aria-label="Period" size="sm" defaultSelectedKey="7-days" items={periods} className="w-32 max-lg:hidden">
                {renderItem}
            </Select>
            <DateRangePicker defaultValue={WEEK} />
        </FilterBar.Content>

        <FilterBar.Actions className="max-md:w-full">
            <SearchField className="min-w-0 max-md:flex-1 md:w-70" />
            <FilterBar.FilterIconButton className="max-h-9 md:hidden" />
            <FilterBar.FilterButton className="max-md:hidden" />
        </FilterBar.Actions>
    </FilterBar>
);

/* -------------------------------------------------------------------------------------------------
 * 6. Dropdowns
 * ---------------------------------------------------------------------------------------------- */

export const Dropdowns = () => (
    <FilterBar className="items-end">
        <FilterBar.Content className="flex-nowrap max-md:flex-col">
            <Input label="Search for order" size="sm" placeholder="Search" icon={SearchLg} className="w-full min-w-0 max-md:**:data-label:hidden md:max-w-70" />

            <div className="flex min-w-0 flex-1 gap-3">
                <Select label="Status" size="sm" defaultSelectedKey="paid" items={statuses} className="w-full max-md:**:data-label:hidden md:max-w-40">
                    {renderItem}
                </Select>
                <Select label="Category" size="sm" defaultSelectedKey="all" items={categories} className="w-full max-md:**:data-label:hidden md:max-w-40">
                    {renderItem}
                </Select>

                <CloseButton slot={null} size="sm" label="Close filters" className="-ms-2 md:hidden" />
            </div>
        </FilterBar.Content>

        <FilterBar.Actions className="max-md:hidden">
            <Button color="secondary" size="sm">
                Clear all
            </Button>
        </FilterBar.Actions>
    </FilterBar>
);

/* -------------------------------------------------------------------------------------------------
 * 7. Dropdowns and date picker
 * ---------------------------------------------------------------------------------------------- */

export const DropdownsAndDatePicker = () => (
    <FilterBar className="items-end">
        <FilterBar.Content className="hidden flex-nowrap items-end lg:flex">
            <Select label="Sort by" size="sm" defaultSelectedKey="descending" items={sortOrders} className="w-full max-w-40">
                {renderItem}
            </Select>
            <Select label="Status" size="sm" defaultSelectedKey="paid" items={statuses} className="w-full max-w-40">
                {renderItem}
            </Select>
            <Select label="Teams" size="sm" placeholder="Select teams" items={teams} className="w-full max-w-40">
                {renderItem}
            </Select>

            <Button color="secondary" size="sm">
                Clear all
            </Button>
        </FilterBar.Content>

        <FilterBar.Actions className="max-lg:w-full">
            <DateRangePicker defaultValue={WEEK} className="max-lg:me-auto" />
            <FilterBar.FilterIconButton className="max-h-9 md:hidden" />
            <FilterBar.FilterButton hideChevron className="max-md:hidden" />
            <Button color="secondary" size="sm" aria-label="Search" iconLeading={SearchLg} />
        </FilterBar.Actions>
    </FilterBar>
);

/* -------------------------------------------------------------------------------------------------
 * 8 & 9. Advanced filters
 * ---------------------------------------------------------------------------------------------- */

interface AdvancedFilter {
    id: string;
    field?: string;
    operator: string;
    value: string;
}

/** The advanced filter bar shared by the inactive and active examples. Demo-only, not exported. */
const AdvancedFilterBar = ({ initialFilters, mobileLabel }: { initialFilters: AdvancedFilter[]; mobileLabel: string }) => {
    const [filters, setFilters] = useState(initialFilters);

    return (
        <FilterBar>
            <FilterBar.Content className="hidden md:flex">
                <FilterBar.FilterIconButton />

                {filters.map((filter) => (
                    <FilterBar.FilterRow key={filter.id} onRemove={() => setFilters((current) => current.filter((item) => item.id !== filter.id))}>
                        <Select aria-label="Filter field" size="sm" placeholder="Filter" defaultSelectedKey={filter.field} items={fields} className="w-28">
                            {renderItem}
                        </Select>
                        <Select aria-label="Operator" size="sm" defaultSelectedKey={filter.operator} items={operators} className="w-28">
                            {renderItem}
                        </Select>
                        <Input aria-label="Value" size="sm" placeholder="Enter a value" defaultValue={filter.value} className="w-42" />
                    </FilterBar.FilterRow>
                ))}
            </FilterBar.Content>

            <FilterBar.Actions className="max-md:w-full">
                <Button color="secondary" size="sm" className="max-md:hidden" onClick={() => setFilters([])}>
                    Clear all
                </Button>
                <Button color="secondary" size="sm" iconLeading={FilterLines} className="w-full text-center md:hidden">
                    {mobileLabel}
                </Button>
            </FilterBar.Actions>
        </FilterBar>
    );
};

export const AdvancedFilterInactive = () => <AdvancedFilterBar mobileLabel="Apply filters" initialFilters={[{ id: "1", operator: "equals", value: "" }]} />;

export const AdvancedFilterActive = () => (
    <AdvancedFilterBar
        mobileLabel="Edit filters"
        initialFilters={[
            { id: "1", field: "status", operator: "equals", value: "Active" },
            { id: "2", field: "email", operator: "contains", value: "gmail" },
            { id: "3", field: "team", operator: "does-not-contain", value: "gmail" },
        ]}
    />
);

/* -------------------------------------------------------------------------------------------------
 * 10 – 12. Filter dropdown menus
 * ---------------------------------------------------------------------------------------------- */

/** Frame that pins the filter button to the end of the bar. Demo-only, not exported. */
const DropdownFrame = ({ children }: { children: ReactNode }) => <div className="flex justify-end">{children}</div>;

/** Panel chrome shared by the inactive and active dropdowns. Demo-only, not exported. */
const FilterPanel = ({ children }: { children: ReactNode }) => (
    <>
        <p className="text-primary border-secondary border-b px-4 py-3 text-sm font-semibold">Filters</p>
        <fieldset className="flex flex-col gap-3 px-4 py-3">
            <legend className="sr-only">Status</legend>
            {children}
        </fieldset>
        <div className="border-secondary flex items-center justify-end gap-3 border-t px-4 py-3">
            <Button color="link-gray" size="sm">
                Clear all
            </Button>
            <Button size="sm">Apply</Button>
        </div>
    </>
);

export const FilterDropdownEmptyState = () => (
    <DropdownFrame>
        <FilterBar.FilterDropdown>
            <div className="flex flex-col items-center gap-4 px-4 py-6 text-center">
                <FeaturedIcon icon={FilterLines} color="gray" theme="modern" size="lg" />
                <div>
                    <p className="text-primary text-sm font-semibold">No filters yet</p>
                    <p className="text-tertiary mt-1 text-sm">Add your first filter to narrow down the results.</p>
                </div>
                <Button size="sm" iconLeading={Plus}>
                    Add filter
                </Button>
            </div>
        </FilterBar.FilterDropdown>
    </DropdownFrame>
);

export const FilterDropdownInactive = () => (
    <DropdownFrame>
        <FilterBar.FilterDropdown>
            <FilterPanel>
                <Checkbox label="Paid" />
                <Checkbox label="Pending" />
                <Checkbox label="Failed" />
                <Checkbox label="Refunded" />
            </FilterPanel>
        </FilterBar.FilterDropdown>
    </DropdownFrame>
);

export const FilterDropdownActive = () => (
    <DropdownFrame>
        <FilterBar.FilterDropdown count={3}>
            <FilterPanel>
                <Checkbox label="Paid" defaultSelected />
                <Checkbox label="Pending" defaultSelected />
                <Checkbox label="Failed" defaultSelected />
                <Checkbox label="Refunded" />
            </FilterPanel>
        </FilterBar.FilterDropdown>
    </DropdownFrame>
);

/* -------------------------------------------------------------------------------------------------
 * 13 & 14. Filter slideout menus
 * ---------------------------------------------------------------------------------------------- */

/** The stack of removable filter rows inside the advanced filter slideout. Demo-only, not exported. */
const AdvancedFilterRows = () => {
    const [filters, setFilters] = useState<AdvancedFilter[]>([
        { id: "1", field: "status", operator: "equals", value: "Active" },
        { id: "2", field: "email", operator: "contains", value: "gmail" },
    ]);

    return (
        <div className="flex w-full flex-col gap-3">
            {filters.map((filter) => (
                <FilterBar.FilterRow
                    key={filter.id}
                    className="w-full"
                    fieldsClassName="w-full gap-2"
                    onRemove={() => setFilters((current) => current.filter((item) => item.id !== filter.id))}
                >
                    <Select aria-label="Filter field" size="sm" defaultSelectedKey={filter.field} items={fields} className="flex-1">
                        {renderItem}
                    </Select>
                    <Select aria-label="Operator" size="sm" defaultSelectedKey={filter.operator} items={operators} className="flex-1">
                        {renderItem}
                    </Select>
                    <Input aria-label="Value" size="sm" placeholder="Enter a value" defaultValue={filter.value} className="flex-1" />
                </FilterBar.FilterRow>
            ))}
        </div>
    );
};

/** Opens the slideout immediately so the preview shows the menu, not just its trigger. */
const SlideoutFrame = ({ children }: { children: (close: () => void) => ReactNode }) => (
    <div className="bg-secondary flex h-dvh w-full items-center justify-center p-8">
        <SlideoutMenu.Trigger defaultOpen>
            <FilterBar.FilterButton hideChevron />
            <SlideoutMenu>{({ close }) => children(close)}</SlideoutMenu>
        </SlideoutMenu.Trigger>
    </div>
);

export const FiltersAdvancedEmptyStateMenu = () => (
    <SlideoutFrame>
        {(close) => (
            <>
                <SlideoutMenu.Header onClose={close}>
                    <p className="text-primary text-lg font-semibold">Advanced filters</p>
                    <p className="text-tertiary mt-1 text-sm">Narrow the results down with one rule per row.</p>
                </SlideoutMenu.Header>

                <SlideoutMenu.Content className="items-center justify-center text-center">
                    <FeaturedIcon icon={FilterLines} color="gray" theme="modern" size="lg" />
                    <div>
                        <p className="text-md text-primary font-semibold">No filters applied</p>
                        <p className="text-tertiary mt-1 text-sm">Add your first filter to narrow down the results.</p>
                    </div>
                    <Button size="md" iconLeading={Plus}>
                        Add filter
                    </Button>
                </SlideoutMenu.Content>

                <SlideoutMenu.Footer className="flex items-center justify-end gap-3">
                    <Button color="secondary" size="md" onClick={close}>
                        Cancel
                    </Button>
                    <Button size="md" onClick={close}>
                        Apply filters
                    </Button>
                </SlideoutMenu.Footer>
            </>
        )}
    </SlideoutFrame>
);

export const FiltersAdvancedActiveMenu = () => (
    <SlideoutFrame>
        {(close) => (
            <>
                <SlideoutMenu.Header onClose={close}>
                    <p className="text-primary text-lg font-semibold">Advanced filters</p>
                    <p className="text-tertiary mt-1 text-sm">Narrow the results down with one rule per row.</p>
                </SlideoutMenu.Header>

                <SlideoutMenu.Content>
                    <AdvancedFilterRows />

                    <Button color="link-color" size="md" iconLeading={Plus}>
                        Add filter
                    </Button>
                </SlideoutMenu.Content>

                <SlideoutMenu.Footer className="flex items-center justify-between gap-3">
                    <Button color="link-gray" size="md" iconLeading={Trash01}>
                        Clear all
                    </Button>
                    <Button size="md" onClick={close}>
                        Apply filters
                    </Button>
                </SlideoutMenu.Footer>
            </>
        )}
    </SlideoutFrame>
);
