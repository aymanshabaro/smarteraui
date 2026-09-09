import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DocPage } from "~/components/doc-page";
import { getContentPage, getContentPages, readMdxSource, stripFrontmatter } from "~/lib/content";
import { type MdxModule, metadataFor } from "~/lib/mdx";

type Params = { params: Promise<{ slug: string }> };

export const generateStaticParams = () => getContentPages("components").map((page) => ({ slug: page.slug }));

export const generateMetadata = async ({ params }: Params): Promise<Metadata> => {
    const { slug } = await params;
    const page = getContentPage("components", slug);
    return page ? metadataFor(page.frontmatter, page.href) : {};
};

export default async function ComponentsSlugPage({ params }: Params) {
    const { slug } = await params;
    const page = getContentPage("components", slug);
    if (!page) notFound();

    const mdx: MdxModule | undefined = await import(`../../../content/components/${slug}.mdx`).catch(() => undefined);
    if (!mdx) notFound();

    // remark-mdx-frontmatter re-exports the block from the file itself; the disk read is the fallback.
    const frontmatter = { ...page.frontmatter, ...mdx.frontmatter };
    const MdxContent = mdx.default;
    return (
        <DocPage area="components" slug={slug} frontmatter={frontmatter} source={stripFrontmatter(readMdxSource("components", slug) ?? "")}>
            <MdxContent />
        </DocPage>
    );
}
