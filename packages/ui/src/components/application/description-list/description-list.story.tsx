import type { FC } from "react";
import * as Demos from "./description-list.demo";

export default {
    title: "Application components/Description lists",
    decorators: [
        (Story: FC) => (
            <div className="bg-primary flex min-h-screen w-full items-center justify-center p-8">
                <Story />
            </div>
        ),
    ],
};

export const DescriptionListExample = () => <Demos.DescriptionListExample />;
DescriptionListExample.storyName = "Description list example";

export const Horizontal = () => <Demos.Horizontal />;
Horizontal.storyName = "Horizontal";

export const Stacked = () => <Demos.Stacked />;
Stacked.storyName = "Stacked";
