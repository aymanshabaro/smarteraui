import type { FC } from "react";
import * as Buttons from "@/components/base/buttons/button-utility.demo";

export default {
    title: "Base components/Utility buttons",
    decorators: [
        (Story: FC) => (
            <div className="bg-primary flex min-h-screen w-full p-4">
                <Story />
            </div>
        ),
    ],
};

export const UtilityButtonsExample = () => <Buttons.UtilityButtonsExample />;
UtilityButtonsExample.storyName = "Utility buttons example";

export const Secondary = () => <Buttons.Secondary />;

export const Tertiary = () => <Buttons.Tertiary />;

export const Sizes = () => <Buttons.Sizes />;

export const Disabled = () => <Buttons.Disabled />;

export const CloseX = () => <Buttons.CloseX />;
CloseX.storyName = "Close X";

export const CloseXDark = () => <Buttons.CloseXDark />;
CloseXDark.storyName = "Close X dark";
