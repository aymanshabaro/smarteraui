import type { FC } from "react";
import * as ContextMenus from "./context-menus.demo";

export default {
    title: "Base components/Context menus",
    decorators: [
        (Story: FC) => (
            <div className="bg-primary flex min-h-screen w-full items-start justify-center p-8">
                <Story />
            </div>
        ),
    ],
};

export const ContextMenuExample = () => <ContextMenus.ContextMenuExample />;
ContextMenuExample.storyName = "Context menu example";

export const Simple = () => <ContextMenus.Simple />;
Simple.storyName = "Simple";

export const Advanced = () => <ContextMenus.Advanced />;
Advanced.storyName = "Advanced";
