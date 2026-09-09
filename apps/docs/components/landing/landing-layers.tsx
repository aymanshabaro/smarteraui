"use client";

import { Announcement01, ArrowRight, Cube01, LayoutAlt01 } from "@smarteraui/icons";
import { Button } from "@smarteraui/ui/components/base/buttons/button";
import { FeaturedIcon } from "@smarteraui/ui/components/foundations/featured-icon/featured-icon";
import { APP_PAGE_EXAMPLES, LAYER_COUNTS, MARKETING_PAGE_EXAMPLES, SECTION_VARIANTS } from "./content";

/**
 * The three layers.
 *
 * Copied from `marketing/features-sections/features-icon-cards-01` — the heading block and the
 * dark-featured-icon card grid — narrowed from four columns to three, one per layer of
 * `packages/ui/src/components`. Counts come from `./content.ts`.
 */

const layers = [
    {
        title: "Base",
        count: `${LAYER_COUNTS.base} component groups`,
        subtitle:
            "Buttons, inputs, selects, checkboxes, badges, avatars, tooltips, sliders, file uploads and the rest of the primitives every screen is made of.",
        icon: Cube01,
        cta: "Browse base components",
        href: "/components",
    },
    {
        title: "Application",
        count: `${LAYER_COUNTS.application} component groups`,
        subtitle: `Tables, modals, charts, navigation, date pickers, command menus and the ${APP_PAGE_EXAMPLES} dashboard, settings and auth pages assembled from them.`,
        icon: LayoutAlt01,
        cta: "Browse application UI",
        href: "/application-ui",
    },
    {
        title: "Marketing",
        count: `${SECTION_VARIANTS} section variants`,
        subtitle: `Heroes, feature grids, metrics, pricing, testimonials, FAQs, CTAs, headers and footers — plus ${MARKETING_PAGE_EXAMPLES} complete pages, including the sections this one is built from.`,
        icon: Announcement01,
        cta: "Browse marketing sections",
        href: "/marketing",
    },
];

export const LandingLayers = () => (
    <section aria-labelledby="three-layers" className="bg-primary py-16 md:py-24">
        <div className="max-w-container mx-auto w-full px-4 md:px-8">
            <div className="flex w-full max-w-3xl flex-col">
                <span className="text-brand-secondary md:text-md text-sm font-semibold">Three layers</span>
                <h2 id="three-layers" className="text-display-sm text-primary md:text-display-md mt-3 font-semibold">
                    Primitives, product screens, marketing pages
                </h2>
                <p className="text-tertiary mt-4 text-lg md:mt-5 md:text-xl">
                    The library is organised the way a product grows. Every layer is documented example by example, and every example links to the source it was
                    rendered from.
                </p>
            </div>

            <div className="mt-12 md:mt-16">
                <ul className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {layers.map((layer) => (
                        <li key={layer.title}>
                            <div className="bg-secondary flex h-full flex-col justify-between gap-12 p-5 md:gap-16 md:p-6">
                                <FeaturedIcon icon={layer.icon} size="lg" color="brand" theme="dark" />
                                <div className="flex flex-col gap-4">
                                    <div>
                                        <h3 className="text-primary text-lg font-semibold">{layer.title}</h3>
                                        <p className="text-brand-secondary mt-1 text-sm font-semibold">{layer.count}</p>
                                        <p className="text-md text-tertiary mt-2">{layer.subtitle}</p>
                                    </div>
                                    <Button color="link-color" size="lg" href={layer.href} iconTrailing={<ArrowRight />}>
                                        {layer.cta}
                                    </Button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    </section>
);
