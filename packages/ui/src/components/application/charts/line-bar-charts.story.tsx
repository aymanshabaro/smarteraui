import type { FC } from "react";
import * as Charts from "@/components/application/charts/line-bar-charts.demo";

export default {
    title: "Application components/Charts",
    decorators: [
        (Story: FC) => (
            <div className="bg-primary flex min-h-screen items-center justify-center py-8">
                <div className="w-full max-w-5xl">
                    <Story />
                </div>
            </div>
        ),
    ],
};

export const LineChartExample = () => <Charts.LineChartExample />;
LineChartExample.storyName = "Line chart example";

export const LineChart01 = () => <Charts.LineChart01 />;
LineChart01.storyName = "Line chart 01";

export const LineChart02 = () => <Charts.LineChart02 />;
LineChart02.storyName = "Line chart 02";

export const LineChart03 = () => <Charts.LineChart03 />;
LineChart03.storyName = "Line chart 03";

export const LineChart04 = () => <Charts.LineChart04 />;
LineChart04.storyName = "Line chart 04";

export const BarChart01 = () => <Charts.BarChart01 />;
BarChart01.storyName = "Bar chart 01";

export const BarChart02 = () => <Charts.BarChart02 />;
BarChart02.storyName = "Bar chart 02";

export const BarChart03 = () => <Charts.BarChart03 />;
BarChart03.storyName = "Bar chart 03";
