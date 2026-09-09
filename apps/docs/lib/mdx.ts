import type { ComponentType } from "react";
import type { Metadata } from "next";
import type { Frontmatter } from "./content";
import { SITE_NAME, absoluteUrl } from "./site";

/** What `import("…/x.mdx")` resolves to once remark-mdx-frontmatter has run. */
export type MdxModule = {
    default: ComponentType<Record<string, unknown>>;
    frontmatter?: Partial<Frontmatter>;
};

/** Per-page SEO derived from front-matter (spec 08-docs-site.md § SEO & metadata). */
export const metadataFor = (frontmatter: Frontmatter, pathname: string): Metadata => ({
    title: frontmatter.metaTitle ? { absolute: frontmatter.metaTitle } : frontmatter.title,
    description: frontmatter.metaDescription ?? frontmatter.description,
    alternates: { canonical: absoluteUrl(pathname) },
    openGraph: {
        type: "article",
        siteName: SITE_NAME,
        url: absoluteUrl(pathname),
        title: frontmatter.metaTitle ?? `${frontmatter.title} | ${SITE_NAME}`,
        description: frontmatter.metaDescription ?? frontmatter.description,
    },
});
