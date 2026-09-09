import type { ReactElement } from "react";
import * as TextEditors from "./text-editor.demo";

export default {
    title: "Base components/Text editors",
    decorators: [
        (Story: () => ReactElement) => (
            <div className="bg-primary flex min-h-screen w-full items-center p-4">
                <Story />
            </div>
        ),
    ],
};

export const TextEditorExample = () => <TextEditors.TextEditorExample />;
TextEditorExample.storyName = "Text editor example";

export const DefaultSm = () => <TextEditors.DefaultSm />;
DefaultSm.storyName = "Default sm";

export const DefaultMd = () => <TextEditors.DefaultMd />;
DefaultMd.storyName = "Default md";

export const FloatingToolbarSm = () => <TextEditors.FloatingToolbarSm />;
FloatingToolbarSm.storyName = "Floating toolbar sm";

export const FloatingToolbarMd = () => <TextEditors.FloatingToolbarMd />;
FloatingToolbarMd.storyName = "Floating toolbar md";

export const WithTooltip = () => <TextEditors.WithTooltip />;
WithTooltip.storyName = "With tooltip";
