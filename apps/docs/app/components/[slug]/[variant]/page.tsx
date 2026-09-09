import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { VariantPage } from "~/components/variant-page";
import { getContentPage } from "~/lib/content";
import { SITE_NAME } from "~/lib/site";
import { variants } from "~/lib/variants";

type Params = { params: Promise<{ slug: string; variant: string }> };

const findVariant = (slug: string, variant: string) => (variants[slug] ?? []).find((entry) => entry.variant === variant && entry.section === "app-examples");

export const generateStaticParams = () =>
    Object.entries(variants).flatMap(([slug, entries]) =>
        entries.filter((entry) => entry.section === "app-examples").map((entry) => ({ slug, variant: entry.variant })),
    );

export const generateMetadata = async ({ params }: Params): Promise<Metadata> => {
    const { slug, variant } = await params;
    const entry = findVariant(slug, variant);
    return entry ? { title: `${entry.title} | ${SITE_NAME}` } : {};
};

export default async function ComponentVariantPage({ params }: Params) {
    const { slug, variant } = await params;
    const entry = findVariant(slug, variant);
    if (!entry) notFound();

    return <VariantPage entry={entry} backHref={`/components/${slug}`} backTitle={getContentPage("components", slug)?.frontmatter.title ?? "Back"} />;
}
