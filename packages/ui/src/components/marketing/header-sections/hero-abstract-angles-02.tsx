"use client";

import { ArrowRight, PlayCircle } from "@properui/icons";
import { BadgeGroup } from "@/components/base/badges/badge-groups";
import { Button } from "@/components/base/buttons/button";
import { VideoPlayer } from "@/components/base/video-player/video-player";
import type { MarketingNavItemType } from "@/components/marketing/header-navigations/base-components/header";
import { MarketingHeader } from "@/components/marketing/header-navigations/base-components/header";
import { ProductsMenu, SimpleResourcesMenu } from "@/components/marketing/header-navigations/base-components/menus";
import { sortCx } from "@/utils/cx";
import { VIDEO_POSTER, VIDEO_SRC } from "@/utils/demo-assets";

const navItems: MarketingNavItemType[] = [
    { label: "Products", menu: <ProductsMenu /> },
    { label: "Services", menu: <ProductsMenu /> },
    { label: "Pricing", href: "/pricing" },
    { label: "Resources", menu: <SimpleResourcesMenu /> },
    { label: "About", href: "/about" },
];

const announcement = { addonText: "New feature", children: "Check out the team dashboard" };

const styles = sortCx({
    /** The angled stripes sit on a skewed 20-column grid so they bleed past both gutters. */
    stripeGrid: [
        "-skew-y-[7deg]",
        "[--column-width:minmax(0,calc(1280px/var(--content-columns)))] [--content-columns:12] [--gutter-columns:4]",
        "[--stripe-height:34px] sm:[--stripe-height:48px] lg:[--stripe-height:72px]",
    ].join(" "),
});

/** Named grid lines let each stripe span from a gutter edge to a content edge. */
const stripeGridStyle = {
    gridTemplateRows: "repeat(3, var(--stripe-height))",
    gridTemplateColumns: [
        "[viewport-start] 1fr",
        "[left-gutter-start] repeat(var(--gutter-columns), var(--column-width))",
        "[left-gutter-end content-start] repeat(var(--content-columns), var(--column-width))",
        "[content-end right-gutter-start] repeat(var(--gutter-columns), var(--column-width))",
        "[right-gutter-end] 1fr [viewport-end]",
    ].join(" "),
};

const stripes = [
    { area: "2 / left-gutter-start / auto / span 5", className: "bg-utility-brand-100_alt" },
    { area: "3 / viewport-start / auto / span 4", className: "bg-utility-brand-400_alt" },
    { area: "1 / span 7 / auto / viewport-end", className: "bg-utility-brand-400_alt" },
    { area: "2 / span 8 / auto / right-gutter-end", className: "bg-utility-brand-200_alt" },
    { area: "3 / span 3 / auto / viewport-end", className: "bg-utility-brand-100_alt" },
];

/**
 * Centered hero on a tinted brand wash, with angled brand stripes sweeping behind a
 * demo video that overlaps the boundary between the two.
 */
export const HeroAbstractAngles02 = () => (
    <div className="bg-primary">
        <MarketingHeader items={navItems} />

        <section>
            <div className="bg-utility-brand-50_alt flex flex-col items-center pt-16 md:pt-24">
                <div className="max-w-container mx-auto flex w-full flex-col px-4 md:px-8">
                    <div className="flex flex-col items-start sm:items-center sm:text-center">
                        <a href="/blog/team-dashboard" className="outline-focus-ring rounded-full focus-visible:outline-2 focus-visible:outline-offset-2">
                            <BadgeGroup size="lg" color="brand" iconTrailing={ArrowRight} className="max-md:hidden" {...announcement} />
                            <BadgeGroup size="md" color="brand" iconTrailing={ArrowRight} className="md:hidden" {...announcement} />
                        </a>

                        <h1 className="text-display-md text-brand-primary md:text-display-lg lg:text-display-xl mt-4 font-semibold">
                            High-performing remote teams. <br />
                            The future of work.
                        </h1>
                        <p className="text-brand-secondary mt-4 max-w-3xl text-lg md:mt-6 md:text-xl">
                            Powerful, self-serve team engagement tools and analytics. Supercharge your managers &amp; keep employees engaged from anywhere.
                        </p>

                        <div className="relative z-1 mt-8 flex w-full flex-col-reverse items-stretch gap-3 sm:w-auto sm:flex-row sm:items-start md:mt-12">
                            <Button color="secondary" size="xl" iconLeading={PlayCircle}>
                                Demo
                            </Button>
                            <Button size="xl">Sign up</Button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="relative pt-16">
                <div className="absolute top-0 h-108 w-full overflow-hidden pt-[152px] md:pt-[94px] 2xl:h-128 2xl:pt-[136px]">
                    <div className={styles.stripeGrid}>
                        <div className="bg-utility-brand-50_alt absolute bottom-[var(--stripe-height)] h-110 w-full" />

                        <div className="relative grid h-full" style={stripeGridStyle}>
                            {stripes.map((stripe) => (
                                <div key={stripe.area} style={{ gridArea: stripe.area }} className={stripe.className} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="relative pb-16 md:pb-24">
                <div className="max-w-container mx-auto w-full px-4 md:px-8">
                    <div className="flex justify-center">
                        <VideoPlayer
                            size="lg"
                            src={VIDEO_SRC}
                            poster={VIDEO_POSTER.src}
                            label="Product demo"
                            className="shadow-3xl h-60 w-full overflow-hidden rounded-xl sm:aspect-video sm:h-auto md:max-w-240"
                        />
                    </div>
                </div>
            </div>
        </section>
    </div>
);
