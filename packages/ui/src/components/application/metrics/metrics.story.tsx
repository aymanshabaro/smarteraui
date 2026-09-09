import type { FC } from "react";
import * as Metrics from "./metrics.demo";

export default {
    title: "Application components/Metrics",
    decorators: [
        (Story: FC) => (
            <div className="bg-primary flex min-h-screen w-full items-center justify-center p-8">
                <Story />
            </div>
        ),
    ],
};

export const MetricsExample = () => <Metrics.MetricsExample />;
MetricsExample.storyName = "Metrics example";

export const Simple = () => <Metrics.Simple />;
Simple.storyName = "Simple";

export const SimpleActions = () => <Metrics.SimpleActions />;
SimpleActions.storyName = "Simple actions";

export const MetricsIcon01 = () => <Metrics.MetricsIcon01 />;
MetricsIcon01.storyName = "Metrics icon 01";

export const MetricsIconActions01 = () => <Metrics.MetricsIconActions01 />;
MetricsIconActions01.storyName = "Metrics icon actions 01";

export const MetricsIcon02 = () => <Metrics.MetricsIcon02 />;
MetricsIcon02.storyName = "Metrics icon 02";

export const MetricsIconActions02 = () => <Metrics.MetricsIconActions02 />;
MetricsIconActions02.storyName = "Metrics icon actions 02";

export const MetricsIcon03 = () => <Metrics.MetricsIcon03 />;
MetricsIcon03.storyName = "Metrics icon 03";

export const MetricsIconActions03 = () => <Metrics.MetricsIconActions03 />;
MetricsIconActions03.storyName = "Metrics icon actions 03";

export const MetricsIcon04 = () => <Metrics.MetricsIcon04 />;
MetricsIcon04.storyName = "Metrics icon 04";

export const MetricsIconActions04 = () => <Metrics.MetricsIconActions04 />;
MetricsIconActions04.storyName = "Metrics icon actions 04";

export const Chart01 = () => <Metrics.Chart01 />;
Chart01.storyName = "Chart 01";

export const ChartActions01 = () => <Metrics.ChartActions01 />;
ChartActions01.storyName = "Chart actions 01";

export const Chart02 = () => <Metrics.Chart02 />;
Chart02.storyName = "Chart 02";

export const ChartActions02 = () => <Metrics.ChartActions02 />;
ChartActions02.storyName = "Chart actions 02";

export const Chart03 = () => <Metrics.Chart03 />;
Chart03.storyName = "Chart 03";

export const ChartActions03 = () => <Metrics.ChartActions03 />;
ChartActions03.storyName = "Chart actions 03";

export const Chart04 = () => <Metrics.Chart04 />;
Chart04.storyName = "Chart 04";

export const ChartActions04 = () => <Metrics.ChartActions04 />;
ChartActions04.storyName = "Chart actions 04";
