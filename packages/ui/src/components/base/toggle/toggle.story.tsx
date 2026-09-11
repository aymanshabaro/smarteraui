import type { FC } from "react";
import * as Toggle from "./toggle.demo";

export default {
    title: "Base components/Toggles",
    decorators: [
        (Story: FC) => (
            <div className="bg-primary flex min-h-screen w-full p-4">
                <Story />
            </div>
        ),
    ],
};

export const ToggleExample = () => <Toggle.ToggleExample />;
ToggleExample.storyName = "Toggle example";

export const Base = () => <Toggle.Base />;

export const WithLabel = () => <Toggle.WithLabel />;
WithLabel.storyName = "With label";

export const WithLabelAndHint = () => <Toggle.WithLabelAndHint />;
WithLabelAndHint.storyName = "With label and hint";

export const Disabled = () => <Toggle.Disabled />;

export const Sizes = () => <Toggle.Sizes />;

export const Slim = () => <Toggle.Slim />;

export const SlimWithLabelAndHint = () => <Toggle.SlimWithLabelAndHint />;
SlimWithLabelAndHint.storyName = "Slim with label and hint";
