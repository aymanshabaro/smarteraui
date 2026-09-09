import { thumbUrl } from "~/lib/thumbs";
import { variants } from "~/lib/variants";
import { type VariantCard, VariantGridClient } from "./variant-grid-client";

/**
 * `<VariantGrid slug="hero-header-sections" />` — masonry gallery of every variant
 * belonging to a page (spec 08-docs-site.md § Variant gallery). Thumbnails come from
 * `pnpm shots:thumbs`; missing ones fall back to a neutral placeholder card.
 */

/** Marketing sections and marketing page examples live under /marketing. */
const routeFor = (section: string, slug: string, variant: string) =>
    section === "app-examples" ? `/components/${slug}/${variant}` : `/marketing/${slug}/${variant}`;

const LABELS: Record<string, string> = {
    marketing: "Marketing section",
    "marketing-examples": "Page example",
    "app-examples": "Page example",
};

export const VariantGrid = ({ slug, showViewToggle }: { slug: string; showViewToggle?: boolean }) => {
    const cards: VariantCard[] = (variants[slug] ?? []).map((entry) => ({
        variant: entry.variant,
        title: entry.title,
        section: entry.section,
        label: LABELS[entry.section] ?? "Variant",
        href: routeFor(entry.section, entry.slug, entry.variant),
        light: thumbUrl(entry.section, entry.slug, entry.variant),
        dark: thumbUrl(entry.section, entry.slug, entry.variant, true),
    }));

    return <VariantGridClient cards={cards} showViewToggle={showViewToggle} />;
};
