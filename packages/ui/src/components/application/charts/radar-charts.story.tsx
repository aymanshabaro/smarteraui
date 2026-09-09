import type { FC } from "react";
import * as RadarCharts from "@/components/application/charts/radar-charts.demo";

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

export const RadarChartExample = () => <RadarCharts.RadarChartExample />;
RadarChartExample.storyName = "Radar chart example";

export const RadarChart = () => <RadarCharts.RadarChart />;
RadarChart.storyName = "Radar chart";
