import type { FC } from "react";
import * as Tooltip from "./tooltip.demo";

export default {
    title: "Base components/Tooltips",
    decorators: [
        (Story: FC) => (
            <div className="bg-primary flex min-h-screen items-center justify-center p-16">
                <Story />
            </div>
        ),
    ],
};

export const TooltipExample = () => <Tooltip.TooltipExample />;
TooltipExample.storyName = "Tooltip example";

export const DefaultExample = () => <Tooltip.DefaultExample />;
DefaultExample.storyName = "Default example";

export const WithArrowExample = () => <Tooltip.WithArrowExample />;
WithArrowExample.storyName = "With arrow example";

export const WithSupportingTextExample = () => <Tooltip.WithSupportingTextExample />;
WithSupportingTextExample.storyName = "With supporting text example";

export const PlacementsExample = () => <Tooltip.PlacementsExample />;
PlacementsExample.storyName = "Placements example";
