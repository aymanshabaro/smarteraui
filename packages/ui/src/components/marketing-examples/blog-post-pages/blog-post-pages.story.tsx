import type { FC } from "react";
import * as Demos from "./blog-post-pages.demo";
import { variantsA } from "./variants.a";

export default {
    title: "Page examples/Blog posts",
    decorators: [
        (Story: FC) => (
            <div className="bg-primary min-h-screen w-full">
                <Story />
            </div>
        ),
    ],
};

export const BlogPostExample = () => <Demos.BlogPostExample />;
BlogPostExample.storyName = "Blog post example";

export const BlogPost01 = () => {
    const Variant = variantsA["blog-post-01"];
    return <Variant />;
};
BlogPost01.storyName = "Blog post 01";

export const BlogPost04 = () => {
    const Variant = variantsA["blog-post-04"];
    return <Variant />;
};
BlogPost04.storyName = "Blog post 04";

export const BlogPost07 = () => {
    const Variant = variantsA["blog-post-07"];
    return <Variant />;
};
BlogPost07.storyName = "Blog post 07";

export const BlogPost10 = () => {
    const Variant = variantsA["blog-post-10"];
    return <Variant />;
};
BlogPost10.storyName = "Blog post 10";

export const BlogPost02 = () => {
    const Variant = variantsA["blog-post-02"];
    return <Variant />;
};
BlogPost02.storyName = "Blog post 02";

export const BlogPost05 = () => {
    const Variant = variantsA["blog-post-05"];
    return <Variant />;
};
BlogPost05.storyName = "Blog post 05";

export const BlogPost08 = () => {
    const Variant = variantsA["blog-post-08"];
    return <Variant />;
};
BlogPost08.storyName = "Blog post 08";

export const BlogPost03 = () => {
    const Variant = variantsA["blog-post-03"];
    return <Variant />;
};
BlogPost03.storyName = "Blog post 03";

export const BlogPost06 = () => {
    const Variant = variantsA["blog-post-06"];
    return <Variant />;
};
BlogPost06.storyName = "Blog post 06";

export const BlogPost09 = () => {
    const Variant = variantsA["blog-post-09"];
    return <Variant />;
};
BlogPost09.storyName = "Blog post 09";
