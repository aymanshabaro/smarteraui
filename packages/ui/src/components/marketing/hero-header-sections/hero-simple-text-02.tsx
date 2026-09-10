"use client";

import { PlayCircle } from "@properui/icons";
import { Button } from "@/components/base/buttons/button";
import type { MarketingNavItemType } from "@/components/marketing/header-navigations/base-components/header";
import { MarketingHeader } from "@/components/marketing/header-navigations/base-components/header";
import { SimpleResourcesMenu } from "@/components/marketing/header-navigations/base-components/menus";
import { BackgroundPattern } from "@/components/shared-assets/background-patterns";
import { sortCx } from "@/utils/cx";
import { IMAGES } from "@/utils/demo-assets";

const styles = sortCx({
    /** The header sits on the brand section colour, so its nav ink has to flip to the `on-brand` ramp. */
    header: [
        "bg-transparent",
        "[&_nav>ul>li>a]:text-secondary_on-brand [&_nav>ul>li>a]:hover:text-secondary_on-brand",
        "[&_nav>ul>li>button]:text-secondary_on-brand [&_nav>ul>li>button]:hover:text-secondary_on-brand",
        "[&_nav>ul>li>button>svg]:text-fg-brand-secondary_alt",
        "[&_span.text-fg-primary]:text-primary_on-brand",
    ].join(" "),
});

const navItems: MarketingNavItemType[] = [
    { label: "Products", menu: <SimpleResourcesMenu /> },
    { label: "Services", menu: <SimpleResourcesMenu /> },
    { label: "Pricing", href: "/pricing" },
    { label: "Resources", menu: <SimpleResourcesMenu /> },
    { label: "About", href: "/about" },
];

/** A hand-drawn highlight stroke sitting behind one word of the headline. */
const HeadlineUnderline = () => (
    <svg
        aria-hidden="true"
        viewBox="0 0 350 24"
        fill="none"
        className="text-fg-brand-secondary absolute inset-x-0 -bottom-1.5 h-6 w-full scale-105 md:bottom-0"
    >
        <path d="M3 16.5C57 9.5 121 5.5 186 6.5c52 .8 104 3.6 155 8.4-49-2.3-98-3.4-147-3.2-64 .3-128 3-191 8.8" fill="currentColor" fillOpacity="0.4" />
    </svg>
);

/**
 * Hero simple text 02 — a full-bleed brand-coloured hero with an oversized headline,
 * a highlighted keyword, two calls to action and a wide photo below the fold.
 */
export const HeroSimpleText02 = () => (
    <div className="bg-brand-section relative overflow-hidden">
        <BackgroundPattern pattern="grid" size="md" className="absolute top-0 left-1/2 z-0 hidden max-w-none -translate-x-1/2 opacity-20 md:block" />
        <BackgroundPattern pattern="grid" size="sm" className="absolute top-0 left-1/2 z-0 max-w-none -translate-x-1/2 opacity-20 md:hidden" />

        <MarketingHeader items={navItems} className={styles.header} />

        <section className="relative py-16 md:py-24">
            <div className="max-w-container mx-auto w-full px-4 md:px-8">
                <div className="flex max-w-5xl flex-col">
                    <h1 className="text-display-md text-primary_on-brand md:text-display-lg lg:text-display-xl font-medium">
                        We design digital{" "}
                        <span className="relative inline-flex">
                            <HeadlineUnderline />
                            <span className="relative">experiences</span>
                        </span>{" "}
                        that create more happy in the world
                    </h1>
                    <p className="text-tertiary_on-brand mt-4 max-w-(--breakpoint-sm) text-lg text-balance md:mt-6 md:text-xl">
                        — We&apos;re a full-service design and development agency who specialize in simple, useful and beautiful solutions.
                    </p>
                    <div className="mt-8 flex w-full flex-col-reverse items-stretch gap-3 sm:w-auto sm:flex-row sm:items-start md:mt-12">
                        <Button size="xl" color="secondary" iconLeading={PlayCircle} className="shadow-xs! ring-0" href="/showreel">
                            Showreel
                        </Button>
                        <Button size="xl" href="/contact">
                            Get in touch
                        </Button>
                    </div>
                </div>
            </div>

            <div className="max-w-container mx-auto mt-16 w-full px-4 md:px-8">
                <img alt={IMAGES.landscape[0].alt} src={IMAGES.landscape[0].src} className="h-60 w-full object-cover md:h-[360px] lg:h-129" />
            </div>
        </section>
    </div>
);
