import type { FC } from "react";
import * as Demos from "./dashboards.demo";
import { variantsA } from "./variants.a";

export default {
    title: "Page examples/Dashboards",
    decorators: [
        (Story: FC) => (
            <div className="bg-primary min-h-screen w-full">
                <Story />
            </div>
        ),
    ],
};

export const DashboardWithSidebarNavigationExample = () => <Demos.DashboardWithSidebarNavigationExample />;
DashboardWithSidebarNavigationExample.storyName = "Dashboard with sidebar navigation example";

export const Dashboard01 = () => {
    const Variant = variantsA["dashboard-01"];
    return <Variant />;
};
Dashboard01.storyName = "Dashboard 01";

export const Dashboard04 = () => {
    const Variant = variantsA["dashboard-04"];
    return <Variant />;
};
Dashboard04.storyName = "Dashboard 04";

export const Dashboard07 = () => {
    const Variant = variantsA["dashboard-07"];
    return <Variant />;
};
Dashboard07.storyName = "Dashboard 07";

export const Dashboard10 = () => {
    const Variant = variantsA["dashboard-10"];
    return <Variant />;
};
Dashboard10.storyName = "Dashboard 10";

export const Dashboard13 = () => {
    const Variant = variantsA["dashboard-13"];
    return <Variant />;
};
Dashboard13.storyName = "Dashboard 13";

export const Dashboard16 = () => {
    const Variant = variantsA["dashboard-16"];
    return <Variant />;
};
Dashboard16.storyName = "Dashboard 16";

export const Dashboard19 = () => {
    const Variant = variantsA["dashboard-19"];
    return <Variant />;
};
Dashboard19.storyName = "Dashboard 19";

export const Dashboard02 = () => {
    const Variant = variantsA["dashboard-02"];
    return <Variant />;
};
Dashboard02.storyName = "Dashboard 02";

export const Dashboard05 = () => {
    const Variant = variantsA["dashboard-05"];
    return <Variant />;
};
Dashboard05.storyName = "Dashboard 05";

export const Dashboard08 = () => {
    const Variant = variantsA["dashboard-08"];
    return <Variant />;
};
Dashboard08.storyName = "Dashboard 08";

export const Dashboard11 = () => {
    const Variant = variantsA["dashboard-11"];
    return <Variant />;
};
Dashboard11.storyName = "Dashboard 11";

export const Dashboard14 = () => {
    const Variant = variantsA["dashboard-14"];
    return <Variant />;
};
Dashboard14.storyName = "Dashboard 14";

export const Dashboard17 = () => {
    const Variant = variantsA["dashboard-17"];
    return <Variant />;
};
Dashboard17.storyName = "Dashboard 17";

export const Dashboard03 = () => {
    const Variant = variantsA["dashboard-03"];
    return <Variant />;
};
Dashboard03.storyName = "Dashboard 03";

export const Dashboard06 = () => {
    const Variant = variantsA["dashboard-06"];
    return <Variant />;
};
Dashboard06.storyName = "Dashboard 06";

export const Dashboard09 = () => {
    const Variant = variantsA["dashboard-09"];
    return <Variant />;
};
Dashboard09.storyName = "Dashboard 09";

export const Dashboard12 = () => {
    const Variant = variantsA["dashboard-12"];
    return <Variant />;
};
Dashboard12.storyName = "Dashboard 12";

export const Dashboard15 = () => {
    const Variant = variantsA["dashboard-15"];
    return <Variant />;
};
Dashboard15.storyName = "Dashboard 15";

export const Dashboard18 = () => {
    const Variant = variantsA["dashboard-18"];
    return <Variant />;
};
Dashboard18.storyName = "Dashboard 18";
