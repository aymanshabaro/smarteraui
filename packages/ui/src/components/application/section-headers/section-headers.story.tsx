import type { FC } from "react";
import * as Demos from "./section-headers.demo";

export default {
    title: "Application components/Section headers",
    decorators: [
        (Story: FC) => (
            <div className="bg-primary flex min-h-screen w-full items-start justify-center p-8">
                <Story />
            </div>
        ),
    ],
};

export const SectionHeaderExample = () => <Demos.SectionHeaderExample />;
SectionHeaderExample.storyName = "Section header example";

export const SectionHeaderButtons = () => <Demos.SectionHeaderButtons />;
SectionHeaderButtons.storyName = "Section header buttons";

export const SectionHeaderSearchInput = () => <Demos.SectionHeaderSearchInput />;
SectionHeaderSearchInput.storyName = "Section header search input";

export const SectionHeaderButtonGroup = () => <Demos.SectionHeaderButtonGroup />;
SectionHeaderButtonGroup.storyName = "Section header button group";

export const SectionHeaderButtonsWithTabs = () => <Demos.SectionHeaderButtonsWithTabs />;
SectionHeaderButtonsWithTabs.storyName = "Section header buttons with tabs";

export const SectionHeaderSearchInputWithTabs = () => <Demos.SectionHeaderSearchInputWithTabs />;
SectionHeaderSearchInputWithTabs.storyName = "Section header search input with tabs";

export const SectionHeaderButtonGroupsWithTabs = () => <Demos.SectionHeaderButtonGroupsWithTabs />;
SectionHeaderButtonGroupsWithTabs.storyName = "Section header button groups with tabs";
