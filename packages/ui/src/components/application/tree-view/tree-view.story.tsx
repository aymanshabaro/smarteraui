import type { FC } from "react";
import * as Demos from "./tree-view.demo";

export default {
    title: "Application components/Tree view",
    decorators: [
        (Story: FC) => (
            <div className="bg-primary flex min-h-screen w-full justify-center p-8">
                <Story />
            </div>
        ),
    ],
};

export const TreeViewExample = () => <Demos.TreeViewExample />;
TreeViewExample.storyName = "Tree view example";

export const SimpleSm = () => <Demos.SimpleSm />;
SimpleSm.storyName = "Simple sm";

export const SimpleMd = () => <Demos.SimpleMd />;
SimpleMd.storyName = "Simple md";

export const AdvancedSm = () => <Demos.AdvancedSm />;
AdvancedSm.storyName = "Advanced sm";

export const AdvancedMd = () => <Demos.AdvancedMd />;
AdvancedMd.storyName = "Advanced md";
