import type { FC } from "react";
import * as Textareas from "@/components/base/textarea/textarea.demo";

export default {
    title: "Base components/Textareas",
    decorators: [
        (Story: FC) => (
            <div className="bg-primary flex min-h-screen w-full max-w-md p-4">
                <Story />
            </div>
        ),
    ],
};

export const TextareaExample = () => <Textareas.TextareaExample />;
TextareaExample.storyName = "Textarea example";

export const Default = () => <Textareas.Default />;

export const Disabled = () => <Textareas.Disabled />;

export const Invalid = () => <Textareas.Invalid />;
