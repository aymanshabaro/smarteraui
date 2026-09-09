import type { FC } from "react";
import * as Demos from "./loading-indicator.demo";

export default {
    title: "Application components/Loading indicators",
    decorators: [
        (Story: FC) => (
            <div className="bg-primary flex min-h-screen w-full items-center justify-center p-8">
                <Story />
            </div>
        ),
    ],
};

export const LoadingIndicatorExample = () => <Demos.LoadingIndicatorExample />;
LoadingIndicatorExample.storyName = "Loading indicator example";

export const LineSimple = () => <Demos.LineSimple />;
LineSimple.storyName = "Line simple";

export const LineSimpleWithLabel = () => <Demos.LineSimpleWithLabel />;
LineSimpleWithLabel.storyName = "Line simple with label";

export const LineSpinner = () => <Demos.LineSpinner />;
LineSpinner.storyName = "Line spinner";

export const LineSpinnerWithLabel = () => <Demos.LineSpinnerWithLabel />;
LineSpinnerWithLabel.storyName = "Line spinner with label";

export const DotCircle = () => <Demos.DotCircle />;
DotCircle.storyName = "Dot circle";

export const DotCircleWithLabel = () => <Demos.DotCircleWithLabel />;
DotCircleWithLabel.storyName = "Dot circle with label";

export const Sizes = () => <Demos.Sizes />;
Sizes.storyName = "Sizes";
