import type { FC } from "react";
import * as Demos from "./404-pages.demo";
import { variantsA } from "./variants.a";

export default {
    title: "Page examples/404 pages",
    decorators: [
        (Story: FC) => (
            <div className="bg-primary min-h-screen w-full">
                <Story />
            </div>
        ),
    ],
};

export const Page404Example = () => <Demos.Page404Example />;
Page404Example.storyName = "404 page example";

export const NotFoundPage01 = () => {
    const Variant = variantsA["not-found-page-01"];
    return <Variant />;
};
NotFoundPage01.storyName = "404 page 01";

export const NotFoundPage04 = () => {
    const Variant = variantsA["not-found-page-04"];
    return <Variant />;
};
NotFoundPage04.storyName = "404 page 04";

export const NotFoundPage07 = () => {
    const Variant = variantsA["not-found-page-07"];
    return <Variant />;
};
NotFoundPage07.storyName = "404 page 07";

export const NotFoundPage10 = () => {
    const Variant = variantsA["not-found-page-10"];
    return <Variant />;
};
NotFoundPage10.storyName = "404 page 10";

export const NotFoundPage02 = () => {
    const Variant = variantsA["not-found-page-02"];
    return <Variant />;
};
NotFoundPage02.storyName = "404 page 02";

export const NotFoundPage05 = () => {
    const Variant = variantsA["not-found-page-05"];
    return <Variant />;
};
NotFoundPage05.storyName = "404 page 05";

export const NotFoundPage08 = () => {
    const Variant = variantsA["not-found-page-08"];
    return <Variant />;
};
NotFoundPage08.storyName = "404 page 08";

export const NotFoundPage03 = () => {
    const Variant = variantsA["not-found-page-03"];
    return <Variant />;
};
NotFoundPage03.storyName = "404 page 03";

export const NotFoundPage06 = () => {
    const Variant = variantsA["not-found-page-06"];
    return <Variant />;
};
NotFoundPage06.storyName = "404 page 06";

export const NotFoundPage09 = () => {
    const Variant = variantsA["not-found-page-09"];
    return <Variant />;
};
NotFoundPage09.storyName = "404 page 09";
