import type { FC } from "react";
import * as PieCharts from "./pie-charts.demo";

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

export const PieChartExample = () => <PieCharts.PieChartExample />;
PieChartExample.storyName = "Pie chart example";

export const PieChartXxl = () => <PieCharts.PieChartXxl />;
PieChartXxl.storyName = "Pie chart xxl";

export const PieChartXs = () => <PieCharts.PieChartXs />;
PieChartXs.storyName = "Pie chart xs";

export const PieChartSm = () => <PieCharts.PieChartSm />;
PieChartSm.storyName = "Pie chart sm";

export const PieChartMd = () => <PieCharts.PieChartMd />;
PieChartMd.storyName = "Pie chart md";

export const PieChartLg = () => <PieCharts.PieChartLg />;
PieChartLg.storyName = "Pie chart lg";
