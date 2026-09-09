"use client";

import type { ReactNode } from "react";
import { Settings01 } from "@smarteraui/icons";
import {
    MetricChart01,
    MetricChart02,
    MetricChart03,
    MetricChart04,
    MetricIcon01,
    MetricIcon02,
    MetricIcon03,
    MetricIcon04,
    MetricSimple,
} from "@/components/application/metrics/metrics";
import { Button } from "@/components/base/buttons/button";
import { Dropdown } from "@/components/base/dropdown/dropdown";

/** Every preview centers a single card in a `max-w-sm` column. */
const DemoFrame = ({ children }: { children: ReactNode }) => <div className="w-full max-w-sm">{children}</div>;

const MetricMenu = () => (
    <Dropdown.Root>
        <Dropdown.DotsButton />

        <Dropdown.Popover className="w-50">
            <Dropdown.Menu>
                <Dropdown.Item>View report</Dropdown.Item>
                <Dropdown.Item>Share</Dropdown.Item>
                <Dropdown.Item>Remove</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown.Popover>
    </Dropdown.Root>
);

const ReportLink = (
    <Button color="link-color" size="sm" href="#">
        View report
    </Button>
);

const ReportActions = (
    <>
        <Button color="tertiary" size="sm" iconLeading={Settings01} aria-label="Metric settings" />
        <Button color="secondary" size="sm" href="#" className="ms-auto">
            View report
        </Button>
    </>
);

/** 15 points climbing from 10 to 55 — the long sparkline used by Chart 01. */
const sparklineData = [10, 15, 12, 20, 18, 25, 30, 28, 32, 35, 40, 32, 40, 50, 55].map((value) => ({ value }));

/** 4 points dipping in the middle — the wide sparkline used by Charts 03 and 04. */
const wideSparklineData = [0, 9, 6, 15].map((value) => ({ value }));

/** Current period against the previous one — the comparison sparkline in Chart 02. */
const comparisonSparklineData = [
    { value: 0, comparisonValue: 10 },
    { value: 30, comparisonValue: 5 },
    { value: 20, comparisonValue: 30 },
    { value: 35, comparisonValue: 20 },
];

export const MetricsExample = () => (
    <DemoFrame>
        <MetricChart04
            title="View 24 hours"
            value="2,000"
            change="100%"
            changeDescription="vs last month"
            chartData={wideSparklineData}
            menu={<MetricMenu />}
        />
    </DemoFrame>
);

export const Simple = () => (
    <DemoFrame>
        <MetricSimple title="Views 24 hours" value="2,000" change="100%" menu={<MetricMenu />} />
    </DemoFrame>
);

export const SimpleActions = () => (
    <DemoFrame>
        <MetricSimple title="Views 24 hours" value="2,000" change="100%" menu={<MetricMenu />} footer={ReportLink} />
    </DemoFrame>
);

export const MetricsIcon01 = () => (
    <DemoFrame>
        <MetricIcon01 title="View 24 hours" value="2,000" change="100%" menu={<MetricMenu />} />
    </DemoFrame>
);

export const MetricsIconActions01 = () => (
    <DemoFrame>
        <MetricIcon01 title="View 24 hours" value="2,000" change="100%" menu={<MetricMenu />} footer={ReportLink} />
    </DemoFrame>
);

export const MetricsIcon02 = () => (
    <DemoFrame>
        <MetricIcon02 title="View 24 hours" value="2,000" change="100%" changeDescription="vs last month" menu={<MetricMenu />} />
    </DemoFrame>
);

export const MetricsIconActions02 = () => (
    <DemoFrame>
        <MetricIcon02 title="View 24 hours" value="2,000" change="100%" changeDescription="vs last month" menu={<MetricMenu />} footer={ReportLink} />
    </DemoFrame>
);

export const MetricsIcon03 = () => (
    <DemoFrame>
        <MetricIcon03 title="View 24 hours" value="2,000" change="100%" changeDescription="vs last month" menu={<MetricMenu />} />
    </DemoFrame>
);

export const MetricsIconActions03 = () => (
    <DemoFrame>
        <MetricIcon03
            title="View 24 hours"
            value="2,000"
            change="100%"
            changeDescription="vs last month"
            menu={<MetricMenu />}
            footer={ReportActions}
            footerType="actions"
        />
    </DemoFrame>
);

export const MetricsIcon04 = () => (
    <DemoFrame>
        <MetricIcon04 title="View 24 hours" value="2,000" change="100%" menu={<MetricMenu />} />
    </DemoFrame>
);

export const MetricsIconActions04 = () => (
    <DemoFrame>
        <MetricIcon04 title="View 24 hours" value="2,000" change="100%" menu={<MetricMenu />} footer={ReportActions} footerType="actions" />
    </DemoFrame>
);

export const Chart01 = () => (
    <DemoFrame>
        <MetricChart01
            title="View 24 hours"
            value="2,000"
            change="100%"
            changeDescription="vs last month"
            chartData={sparklineData}
            highlightIndex={10}
            menu={<MetricMenu />}
        />
    </DemoFrame>
);

export const ChartActions01 = () => (
    <DemoFrame>
        <MetricChart01
            title="View 24 hours"
            value="2,000"
            change="100%"
            changeDescription="vs last month"
            chartData={sparklineData}
            highlightIndex={10}
            menu={<MetricMenu />}
            footer={ReportLink}
        />
    </DemoFrame>
);

export const Chart02 = () => (
    <DemoFrame>
        <MetricChart02 title="View 24 hours" value="2,000" change="100%" chartData={comparisonSparklineData} menu={<MetricMenu />} />
    </DemoFrame>
);

export const ChartActions02 = () => (
    <DemoFrame>
        <MetricChart02
            title="View 24 hours"
            value="2,000"
            change="100%"
            chartData={comparisonSparklineData}
            menu={<MetricMenu />}
            footer={ReportActions}
            footerType="actions"
        />
    </DemoFrame>
);

export const Chart03 = () => (
    <DemoFrame>
        <MetricChart03
            title="View 24 hours"
            value="2,000"
            change="100%"
            changeDescription="vs last month"
            chartData={wideSparklineData}
            menu={<MetricMenu />}
        />
    </DemoFrame>
);

export const ChartActions03 = () => (
    <DemoFrame>
        <MetricChart03
            title="View 24 hours"
            value="2,000"
            change="100%"
            changeDescription="vs last month"
            chartData={wideSparklineData}
            menu={<MetricMenu />}
            footer={ReportActions}
            footerType="actions"
        />
    </DemoFrame>
);

export const Chart04 = () => (
    <DemoFrame>
        <MetricChart04
            title="View 24 hours"
            value="2,000"
            change="100%"
            changeDescription="vs last month"
            chartData={wideSparklineData}
            menu={<MetricMenu />}
        />
    </DemoFrame>
);

export const ChartActions04 = () => (
    <DemoFrame>
        <MetricChart04
            title="View 24 hours"
            value="2,000"
            change="100%"
            changeDescription="vs last month"
            chartData={wideSparklineData}
            menu={<MetricMenu />}
            footer={ReportActions}
        />
    </DemoFrame>
);
