import type { FC } from "react";
import * as Demos from "./progress-steps.demo";

export default {
    title: "Application components/Progress steps",
    decorators: [
        (Story: FC) => (
            <div className="bg-primary flex min-h-screen w-full items-center justify-center p-8">
                <Story />
            </div>
        ),
    ],
};

export const ProgressStepsExample = () => <Demos.ProgressStepsExample />;
ProgressStepsExample.storyName = "Progress steps example";

export const IconCentered = () => <Demos.IconCentered />;
IconCentered.storyName = "Icon centered";

export const IconCenteredWithNumber = () => <Demos.IconCenteredWithNumber />;
IconCenteredWithNumber.storyName = "Icon centered with number";

export const FeaturedIconCentered = () => <Demos.FeaturedIconCentered />;
FeaturedIconCentered.storyName = "Featured icon centered";

export const IconWithText = () => <Demos.IconWithText />;
IconWithText.storyName = "Icon with text";

export const IconWithNumber = () => <Demos.IconWithNumber />;
IconWithNumber.storyName = "Icon with number";

export const FeaturedIconWithText = () => <Demos.FeaturedIconWithText />;
FeaturedIconWithText.storyName = "Featured icon with text";

export const MinimalIcons = () => <Demos.MinimalIcons />;
MinimalIcons.storyName = "Minimal icons";

export const MinimalIconsConnected = () => <Demos.MinimalIconsConnected />;
MinimalIconsConnected.storyName = "Minimal icons connected";

export const TextWithLine = () => <Demos.TextWithLine />;
TextWithLine.storyName = "Text with line";
