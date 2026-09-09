import type { FC } from "react";
import * as GradientPickers from "./gradient-picker.demo";

export default {
    title: "Application components/Gradient pickers",
    decorators: [
        (Story: FC) => (
            <div className="bg-primary flex min-h-screen w-full items-center justify-center p-8">
                <Story />
            </div>
        ),
    ],
};

export const GradientPickerExample = () => <GradientPickers.GradientPickerExample />;
GradientPickerExample.storyName = "Gradient picker example";

export const GradientPicker = () => <GradientPickers.GradientPicker />;
GradientPicker.storyName = "Gradient picker";
