import type { FC } from "react";
import * as Demos from "./filter-bars.demo";

export default {
    title: "Application components/Filter bars",
    decorators: [
        (Story: FC) => (
            <div className="bg-primary flex min-h-screen w-full items-start justify-center p-8">
                <div className="ring-secondary w-full max-w-4xl rounded-[20px] p-6 ring-1 ring-inset">
                    <Story />
                </div>
            </div>
        ),
    ],
};

export const FilterBarExample = () => <Demos.FilterBarExample />;
FilterBarExample.storyName = "Filter bar example";

export const Simple = () => <Demos.Simple />;
Simple.storyName = "Simple";

export const TabsAndSearch = () => <Demos.TabsAndSearch />;
TabsAndSearch.storyName = "Tabs and search";

export const TabsAndDatePicker = () => <Demos.TabsAndDatePicker />;
TabsAndDatePicker.storyName = "Tabs and date picker";

export const DateFilters = () => <Demos.DateFilters />;
DateFilters.storyName = "Date filters";

export const Dropdowns = () => <Demos.Dropdowns />;
Dropdowns.storyName = "Dropdowns";

export const DropdownsAndDatePicker = () => <Demos.DropdownsAndDatePicker />;
DropdownsAndDatePicker.storyName = "Dropdowns and date picker";

export const AdvancedFilterInactive = () => <Demos.AdvancedFilterInactive />;
AdvancedFilterInactive.storyName = "Advanced filter inactive";

export const AdvancedFilterActive = () => <Demos.AdvancedFilterActive />;
AdvancedFilterActive.storyName = "Advanced filter active";

export const FilterDropdownEmptyState = () => <Demos.FilterDropdownEmptyState />;
FilterDropdownEmptyState.storyName = "Filter dropdown empty state";

export const FilterDropdownInactive = () => <Demos.FilterDropdownInactive />;
FilterDropdownInactive.storyName = "Filter dropdown inactive";

export const FilterDropdownActive = () => <Demos.FilterDropdownActive />;
FilterDropdownActive.storyName = "Filter dropdown active";

export const FiltersAdvancedEmptyStateMenu = () => <Demos.FiltersAdvancedEmptyStateMenu />;
FiltersAdvancedEmptyStateMenu.storyName = "Filters advanced empty state menu";

export const FiltersAdvancedActiveMenu = () => <Demos.FiltersAdvancedActiveMenu />;
FiltersAdvancedActiveMenu.storyName = "Filters advanced active menu";
