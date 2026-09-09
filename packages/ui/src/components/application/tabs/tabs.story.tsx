import type { FC } from "react";
import * as Tabs from "./tabs.demo";

export default {
    title: "Application components/Tabs",
    decorators: [
        (Story: FC) => (
            <div className="bg-primary flex min-h-screen w-full items-center justify-center p-4">
                <Story />
            </div>
        ),
    ],
};

export const TabsExample = () => <Tabs.TabsExample />;
TabsExample.storyName = "Tabs example";

export const ButtonBrandHorizontal = () => <Tabs.ButtonBrandHorizontal />;
ButtonBrandHorizontal.storyName = "Button brand horizontal";

export const ButtonGrayHorizontal = () => <Tabs.ButtonGrayHorizontal />;
ButtonGrayHorizontal.storyName = "Button gray horizontal";

export const ButtonBorderHorizontal = () => <Tabs.ButtonBorderHorizontal />;
ButtonBorderHorizontal.storyName = "Button border horizontal";

export const ButtonMinimalHorizontal = () => <Tabs.ButtonMinimalHorizontal />;
ButtonMinimalHorizontal.storyName = "Button minimal horizontal";

export const Underline = () => <Tabs.Underline />;
Underline.storyName = "Underline";

export const ButtonBrandVertical = () => <Tabs.ButtonBrandVertical />;
ButtonBrandVertical.storyName = "Button brand vertical";

export const ButtonGrayVertical = () => <Tabs.ButtonGrayVertical />;
ButtonGrayVertical.storyName = "Button gray vertical";

export const ButtonBorderVertical = () => <Tabs.ButtonBorderVertical />;
ButtonBorderVertical.storyName = "Button border vertical";

export const ButtonMinimalVertical = () => <Tabs.ButtonMinimalVertical />;
ButtonMinimalVertical.storyName = "Button minimal vertical";

export const Line = () => <Tabs.Line />;
Line.storyName = "Line";
