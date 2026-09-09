import type { FC } from "react";
import * as Demos from "./featured-icon.demo";

export default {
    title: "Base components/Featured Icons",
    decorators: [
        (Story: FC) => (
            <div className="bg-primary flex min-h-screen w-full overflow-auto p-8">
                <Story />
            </div>
        ),
    ],
};

export const FeaturedIconExample = () => <Demos.FeaturedIconExample />;
FeaturedIconExample.storyName = "Featured icon example";

export const Light = () => <Demos.Light />;
Light.storyName = "Light";

export const Gradient = () => <Demos.Gradient />;
Gradient.storyName = "Gradient";

export const Dark = () => <Demos.Dark />;
Dark.storyName = "Dark";

export const Outline = () => <Demos.Outline />;
Outline.storyName = "Outline";

export const Modern = () => <Demos.Modern />;
Modern.storyName = "Modern";

export const ModernNeue = () => <Demos.ModernNeue />;
ModernNeue.storyName = "Modern neue";
