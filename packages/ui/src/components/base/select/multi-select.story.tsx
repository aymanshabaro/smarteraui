import type { FC } from "react";
import * as MultiSelects from "./multi-select.demo";

export default {
    title: "Base components/Multi-select",
    decorators: [
        (Story: FC) => (
            <div className="bg-primary flex min-h-screen w-full p-4">
                <div className="w-80">
                    <Story />
                </div>
            </div>
        ),
    ],
};

export const MultiSelectExample = () => <MultiSelects.MultiSelectExample />;
MultiSelectExample.storyName = "Multi-select example";

export const Default = () => <MultiSelects.Default />;

export const WithLeadingIcon = () => <MultiSelects.WithLeadingIcon />;
WithLeadingIcon.storyName = "With leading icon";

export const Disabled = () => <MultiSelects.Disabled />;

export const Sizes = () => <MultiSelects.Sizes />;
