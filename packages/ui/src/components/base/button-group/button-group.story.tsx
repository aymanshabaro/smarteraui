import type { FC } from "react";
import * as ButtonGroup from "@/components/base/button-group/button-group.demo";

export default {
    title: "Base components/Button groups",
    decorators: [
        (Story: FC) => (
            <div className="bg-primary flex min-h-screen w-full items-center justify-center p-4">
                <Story />
            </div>
        ),
    ],
};

export const Example = () => <ButtonGroup.ButtonGroupExample />;
Example.storyName = "Button group example";

export const LeadingIcon = () => <ButtonGroup.LeadingIcon />;
LeadingIcon.storyName = "Leading icon";

export const WithDot = () => <ButtonGroup.WithDot />;
WithDot.storyName = "With dot";

export const Disabled = () => <ButtonGroup.Disabled />;
Disabled.storyName = "Disabled";

export const DisabledIndividualItem = () => <ButtonGroup.DisabledIndividualItem />;
DisabledIndividualItem.storyName = "Disabled individual item";

export const Selection = () => <ButtonGroup.Selection />;
Selection.storyName = "Selection";

export const MultipleSelection = () => <ButtonGroup.MultipleSelection />;
MultipleSelection.storyName = "Multiple selection";
