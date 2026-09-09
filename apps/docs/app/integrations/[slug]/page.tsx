import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DocPage } from "~/components/doc-page";
import { getContentPage, getContentPages, readMdxSource, stripFrontmatter } from "~/lib/content";
import { type MdxModule, metadataFor } from "~/lib/mdx";

type Params = { params: Promise<{ slug: string }> };

export const generateStaticParams = () => getContentPages("integrations").map((page) => ({ slug: page.slug }));

export const generateMetadata = async ({ params }: Params): Promise<Metadata> => {
    const { slug } = await params;
    const page = getContentPage("integrations", slug);
    return page ? metadataFor(page.frontmatter, page.href) : {};
};

export default async function IntegrationsSlugPage({ params }: Params) {
    const { slug } = await params;
    const page = getContentPage("integrations", slug);
    if (!page) notFound();

    const mdx: MdxModule | undefined = await import(`../../../content/integrations/${slug}.mdx`).catch(() => undefined);
    if (!mdx) notFound();

    // remark-mdx-frontmatter re-exports the block from the file itself; the disk read is the fallback.
    const frontmatter = { ...page.frontmatter, ...mdx.frontmatter };
    const MdxContent = mdx.default;
    return (
        <DocPage area="integrations" slug={slug} frontmatter={frontmatter} source={stripFrontmatter(readMdxSource("integrations", slug) ?? "")}>
            <MdxContent />
        </DocPage>
    );
}
