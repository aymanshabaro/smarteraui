import type { FC } from "react";
import * as Demos from "./blog-pages.demo";
import { variantsA } from "./variants.a";

export default {
    title: "Page examples/Blogs",
    decorators: [
        (Story: FC) => (
            <div className="bg-primary min-h-screen w-full">
                <Story />
            </div>
        ),
    ],
};

export const BlogExample = () => <Demos.BlogExample />;
BlogExample.storyName = "Blog example";

export const BlogPage01 = () => {
    const Variant = variantsA["blog-page-01"];
    return <Variant />;
};
BlogPage01.storyName = "Blog page 01";

export const BlogPage04 = () => {
    const Variant = variantsA["blog-page-04"];
    return <Variant />;
};
BlogPage04.storyName = "Blog page 04";

export const BlogPage07 = () => {
    const Variant = variantsA["blog-page-07"];
    return <Variant />;
};
BlogPage07.storyName = "Blog page 07";

export const BlogPage10 = () => {
    const Variant = variantsA["blog-page-10"];
    return <Variant />;
};
BlogPage10.storyName = "Blog page 10";

export const BlogPage02 = () => {
    const Variant = variantsA["blog-page-02"];
    return <Variant />;
};
BlogPage02.storyName = "Blog page 02";

export const BlogPage05 = () => {
    const Variant = variantsA["blog-page-05"];
    return <Variant />;
};
BlogPage05.storyName = "Blog page 05";

export const BlogPage08 = () => {
    const Variant = variantsA["blog-page-08"];
    return <Variant />;
};
BlogPage08.storyName = "Blog page 08";

export const BlogPage03 = () => {
    const Variant = variantsA["blog-page-03"];
    return <Variant />;
};
BlogPage03.storyName = "Blog page 03";

export const BlogPage06 = () => {
    const Variant = variantsA["blog-page-06"];
    return <Variant />;
};
BlogPage06.storyName = "Blog page 06";

export const BlogPage09 = () => {
    const Variant = variantsA["blog-page-09"];
    return <Variant />;
};
BlogPage09.storyName = "Blog page 09";
