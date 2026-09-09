import type { FC } from "react";
import * as Demos from "./content-divider.demo";

export default {
    title: "Application components/Content dividers",
    decorators: [
        (Story: FC) => (
            <div className="bg-primary flex min-h-screen w-full items-center justify-center p-8">
                <Story />
            </div>
        ),
    ],
};

export const ContentDividerExample = () => <Demos.ContentDividerExample />;
ContentDividerExample.storyName = "Content divider example";

export const SingleLine = () => <Demos.SingleLine />;
SingleLine.storyName = "Single line";

export const DualLine = () => <Demos.DualLine />;
DualLine.storyName = "Dual line";

export const BackgroundFill = () => <Demos.BackgroundFill />;
BackgroundFill.storyName = "Background fill";
