import type { FC } from "react";
import * as Tags from "@/components/base/tags/tags.demo";

export default {
    title: "Base components/Tags",
    decorators: [
        (Story: FC) => (
            <div className="bg-primary flex min-h-screen w-full overflow-auto p-4">
                <Story />
            </div>
        ),
    ],
};

export const TagsExample = () => <Tags.TagsExample />;
TagsExample.storyName = "Tags example";

export const SizesExample = () => <Tags.SizesExample />;
SizesExample.storyName = "Sizes example";

export const CloseXExample = () => <Tags.CloseXExample />;
CloseXExample.storyName = "Close X example";

export const CountExample = () => <Tags.CountExample />;
CountExample.storyName = "Count example";

export const CheckboxExample = () => <Tags.CheckboxExample />;
CheckboxExample.storyName = "Checkbox example";

export const CheckboxCloseXExample = () => <Tags.CheckboxCloseXExample />;
CheckboxCloseXExample.storyName = "Checkbox close X example";

export const CheckboxCountExample = () => <Tags.CheckboxCountExample />;
CheckboxCountExample.storyName = "Checkbox count example";
