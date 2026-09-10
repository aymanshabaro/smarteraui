"use client";

import type { CSSProperties } from "react";
import { PlayCircle } from "@properui/icons";
import { BadgeGroup } from "@/components/base/badges/badge-groups";
import { Button } from "@/components/base/buttons/button";
import { VideoPlayer } from "@/components/base/video-player/video-player";
import type { MarketingNavItemType } from "@/components/marketing/header-navigations/base-components/header";
import { MarketingHeader } from "@/components/marketing/header-navigations/base-components/header";
import { SimpleResourcesMenu } from "@/components/marketing/header-navigations/base-components/menus";
import { sortCx } from "@/utils/cx";
import { VIDEO_POSTER, VIDEO_SRC } from "@/utils/demo-assets";

const styles = sortCx({
    /** The header sits on the tinted brand panel, so its nav ink follows the brand ramp. */
    header: [
        "bg-utility-brand-50_alt",
        "[&_nav>ul>li>a]:text-brand-primary [&_nav>ul>li>a]:hover:text-brand-primary",
        "[&_nav>ul>li>button]:text-brand-primary [&_nav>ul>li>button]:hover:text-brand-primary",
        "[&_nav>ul>li>button>svg]:text-fg-brand-secondary_alt",
    ].join(" "),
});

/**
 * Named grid lines for the skewed stripe band. Tailwind cannot express custom line names,
 * so the template stays an inline style.
 */
const stripeGrid: CSSProperties = {
    gridTemplateRows: "repeat(3, var(--stripe-height))",
    gridTemplateColumns:
        "[viewport-start] 1fr [left-gutter-start] repeat(var(--gutter-columns), var(--column-width)) [left-gutter-end content-start] repeat(var(--content-columns), var(--column-width)) [content-end right-gutter-start] repeat(var(--gutter-columns), var(--column-width)) [right-gutter-end] 1fr [viewport-end]",
};

const stripes: { area: string; className: string }[] = [
    { area: "2 / left-gutter-start / auto / span 5", className: "bg-utility-brand-100_alt" },
    { area: "3 / viewport-start / auto / span 4", className: "bg-utility-brand-400_alt" },
    { area: "1 / span 7 / auto / viewport-end", className: "bg-utility-brand-400_alt" },
    { area: "2 / span 8 / auto / right-gutter-end", className: "bg-utility-brand-200_alt" },
    { area: "3 / span 3 / auto / viewport-end", className: "bg-utility-brand-100_alt" },
];

/** The skewed band of brand-tinted stripes that separates the copy from the media. */
const AngledStripes = () => (
    <div aria-hidden="true" className="absolute top-0 h-108 w-full overflow-hidden pt-[152px] md:pt-[94px] 2xl:h-128 2xl:pt-[136px]">
        <div className="-skew-y-[7deg] [--column-width:minmax(0,calc(1280px/var(--content-columns)))] [--content-columns:12] [--gutter-columns:4] [--stripe-height:34px] sm:[--stripe-height:48px] lg:[--stripe-height:72px]">
            <div className="bg-utility-brand-50_alt absolute bottom-[var(--stripe-height)] h-110 w-full" />
            <div className="relative grid h-full" style={stripeGrid}>
                {stripes.map((stripe) => (
                    <div key={stripe.area} style={{ gridArea: stripe.area }} className={stripe.className} />
                ))}
            </div>
        </div>
    </div>
);

const navItems: MarketingNavItemType[] = [
    { label: "Products", menu: <SimpleResourcesMenu /> },
    { label: "Services", menu: <SimpleResourcesMenu /> },
    { label: "Pricing", href: "/pricing" },
    { label: "Resources", menu: <SimpleResourcesMenu /> },
    { label: "About", href: "/about" },
];

/**
 * Empty WebVTT track. The placeholder clip carries no dialogue, but shipping a captions
 * track keeps the section compliant with WCAG 1.2.2.
 */
const CAPTIONS = { src: "data:text/vtt;charset=utf-8,WEBVTT%0A%0A", srcLang: "en", label: "English" };

/**
 * Hero abstract angles 01 — a tinted hero whose skewed stripe band carries the eye down to
 * an embedded product video.
 */
export const HeroAbstractAngles01 = () => (
    <div className="bg-primary">
        <MarketingHeader items={navItems} className={styles.header} />

        <section>
            <div className="bg-utility-brand-50_alt flex flex-col items-center pt-16 md:pt-24">
                <div className="max-w-container mx-auto flex w-full flex-col px-4 md:px-8">
                    <div className="flex flex-col items-start sm:items-center sm:text-center">
                        <a href="/features" className="outline-focus-ring rounded-full focus-visible:outline-2 focus-visible:outline-offset-2">
                            <BadgeGroup size="lg" color="brand" theme="light" addonText="New feature" className="hidden md:flex">
                                Check out the team dashboard
                            </BadgeGroup>
                            <BadgeGroup size="md" color="brand" theme="light" addonText="New feature" className="md:hidden">
                                Check out the team dashboard
                            </BadgeGroup>
                        </a>

                        <h1 className="text-display-md text-brand-primary md:text-display-lg lg:text-display-xl mt-4 font-semibold">
                            High-performing remote teams. <br /> The future of work.
                        </h1>
                        <p className="text-brand-secondary mt-4 max-w-3xl text-lg md:mt-6 md:text-xl">
                            Powerful, self-serve team engagement tools and analytics. Supercharge your managers &amp; keep employees engaged from anywhere.
                        </p>

                        <div className="relative z-1 mt-8 flex w-full flex-col-reverse items-stretch gap-3 sm:w-auto sm:flex-row sm:items-start md:mt-12">
                            <Button size="xl" color="secondary" iconLeading={PlayCircle} href="/demo">
                                Demo
                            </Button>
                            <Button size="xl" href="/signup">
                                Sign up
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="relative pt-16">
                <AngledStripes />
            </div>

            <div className="relative pb-16 md:pb-24">
                <div className="max-w-container mx-auto w-full px-4 md:px-8">
                    <div className="flex justify-center">
                        <VideoPlayer
                            src={VIDEO_SRC}
                            poster={VIDEO_POSTER.src}
                            captions={CAPTIONS}
                            label="Product demo video"
                            className="shadow-3xl w-full rounded-xl md:max-w-240"
                        />
                    </div>
                </div>
            </div>
        </section>
    </div>
);
