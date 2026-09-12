import type { FC } from "react";
import * as Demos from "./toggle-chip.demo";

export default {
    title: "Base components/Toggle chips",
    decorators: [
        (Story: FC) => (
            <div className="bg-primary flex min-h-screen w-full items-center justify-center p-8">
                <Story />
            </div>
        ),
    ],
};

export const ToggleChipExample = () => <Demos.ToggleChipExample />;
ToggleChipExample.storyName = "Toggle chip example";

export const Colors = () => <Demos.Colors />;
Colors.storyName = "Colors";

export const Sizes = () => <Demos.Sizes />;
Sizes.storyName = "Sizes";

export const FilterGroup = () => <Demos.FilterGroup />;
FilterGroup.storyName = "Filter group";

export const Disabled = () => <Demos.Disabled />;
Disabled.storyName = "Disabled";
