import type { FC } from "react";
import * as Checkbox from "@/components/base/checkbox/checkbox.demo";

export default {
    title: "Base components/Checkboxes",
    decorators: [
        (Story: FC) => (
            <div className="bg-primary flex min-h-screen w-full p-4">
                <Story />
            </div>
        ),
    ],
};

export const CheckboxExample = () => <Checkbox.CheckboxExample />;
CheckboxExample.storyName = "Checkbox example";

export const Base = () => <Checkbox.Base />;

export const WithLabel = () => <Checkbox.WithLabel />;
WithLabel.storyName = "With label";

export const WithLabelAndHint = () => <Checkbox.WithLabelAndHint />;
WithLabelAndHint.storyName = "With label and hint";

export const Disabled = () => <Checkbox.Disabled />;

export const Sizes = () => <Checkbox.Sizes />;
