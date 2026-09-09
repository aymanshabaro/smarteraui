import type { FC } from "react";
import * as Demos from "./header-navigation.demo";

export default {
    title: "Application components/Header navigations",
    decorators: [
        (Story: FC) => (
            <div className="bg-primary min-h-screen w-full">
                <Story />
            </div>
        ),
    ],
};

export const HeaderNavigationExample = () => <Demos.HeaderNavigationExample />;
HeaderNavigationExample.storyName = "Header navigation example";

export const Simple = () => <Demos.Simple />;
Simple.storyName = "Simple";

export const DualTier = () => <Demos.DualTier />;
DualTier.storyName = "Dual-tier";
