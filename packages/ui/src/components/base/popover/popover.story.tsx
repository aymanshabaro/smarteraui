import type { FC } from "react";
import * as Demos from "./popover.demo";

export default {
    title: "Base components/Popovers",
    decorators: [
        (Story: FC) => (
            <div className="bg-primary flex min-h-screen w-full items-center justify-center p-16">
                <Story />
            </div>
        ),
    ],
};

export const PopoverExample = () => <Demos.PopoverExample />;
PopoverExample.storyName = "Popover example";

export const Placements = () => <Demos.Placements />;
Placements.storyName = "Placements";

export const WithIconTrigger = () => <Demos.WithIconTrigger />;
WithIconTrigger.storyName = "With icon trigger";
