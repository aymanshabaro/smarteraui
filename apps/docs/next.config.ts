import createMDX from "@next/mdx";
import type { NextConfig } from "next";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";

const nextConfig: NextConfig = {
    pageExtensions: ["ts", "tsx", "mdx"],
    transpilePackages: ["@smarteraui/ui"],
    experimental: { optimizePackageImports: ["@smarteraui/icons"] },
    // Plain-markdown twin of every docs route: /components/buttons.md, /docs/theming.md, …
    async rewrites() {
        return [{ source: "/:path*.md", destination: "/api/markdown/:path*" }];
    },
};

export default createMDX({
    options: {
        remarkPlugins: [remarkGfm, remarkFrontmatter, [remarkMdxFrontmatter, { name: "frontmatter" }]],
        rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, { behavior: "wrap" }]],
    },
})(nextConfig);
