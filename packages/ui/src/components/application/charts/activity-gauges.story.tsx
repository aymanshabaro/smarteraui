import type { FC } from "react";
import * as ActivityGauges from "./activity-gauges.demo";

export default {
    title: "Application components/Charts",
    decorators: [
        (Story: FC) => (
            <div className="bg-primary flex min-h-screen items-center justify-center py-8">
                <div className="flex w-full items-center justify-center">
                    <Story />
                </div>
            </div>
        ),
    ],
};

export const ActivityGaugeExample = () => <ActivityGauges.ActivityGaugeExample />;
ActivityGaugeExample.storyName = "Activity gauge example";

export const ActivityGaugeXs = () => <ActivityGauges.ActivityGaugeXs />;
ActivityGaugeXs.storyName = "Activity gauge xs";

export const ActivityGaugeSm = () => <ActivityGauges.ActivityGaugeSm />;
ActivityGaugeSm.storyName = "Activity gauge sm";

export const ActivityGaugeMd = () => <ActivityGauges.ActivityGaugeMd />;
ActivityGaugeMd.storyName = "Activity gauge md";

export const ActivityGaugeLg = () => <ActivityGauges.ActivityGaugeLg />;
ActivityGaugeLg.storyName = "Activity gauge lg";
