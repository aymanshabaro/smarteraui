import type { FC } from "react";
import * as Demos from "./callout.demo";

export default {
    title: "Application components/Callouts",
    decorators: [
        (Story: FC) => (
            <div className="bg-primary flex min-h-screen w-full items-center justify-center p-8">
                <Story />
            </div>
        ),
    ],
};

export const CalloutExample = () => <Demos.CalloutExample />;
CalloutExample.storyName = "Callout example";

export const Tones = () => <Demos.Tones />;
Tones.storyName = "Tones";

export const WithoutTitle = () => <Demos.WithoutTitle />;
WithoutTitle.storyName = "Without title";

export const WithoutIcon = () => <Demos.WithoutIcon />;
WithoutIcon.storyName = "Without icon";
