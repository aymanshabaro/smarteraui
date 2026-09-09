"use client";

import { PlayCircle } from "@smarteraui/icons";
import { Button } from "@/components/base/buttons/button";
import type { MarketingNavItemType } from "@/components/marketing/header-navigations/base-components/header";
import { MarketingHeader } from "@/components/marketing/header-navigations/base-components/header";
import { SimpleResourcesMenu } from "@/components/marketing/header-navigations/base-components/menus";
import { BackgroundPattern } from "@/components/shared-assets/background-patterns";
import { IMAGES } from "@/utils/demo-assets";

const navItems: MarketingNavItemType[] = [
    { label: "Products", menu: <SimpleResourcesMenu /> },
    { label: "Services", menu: <SimpleResourcesMenu /> },
    { label: "Pricing", href: "/pricing" },
    { label: "Resources", menu: <SimpleResourcesMenu /> },
    { label: "About", href: "/about" },
];

/** The nav sits on the brand section, so its links and chevrons switch to the on-brand tokens. */
const headerClassName = [
    "bg-transparent",
    "[&_nav>ul>li>a]:text-secondary_on-brand [&_nav>ul>li>a]:hover:text-secondary_on-brand",
    "[&_nav>ul>li>button]:text-secondary_on-brand [&_nav>ul>li>button]:hover:text-secondary_on-brand",
    "[&_nav>ul>li>button>svg]:text-fg-brand-secondary_alt",
    "[&_svg_path.fill-fg-primary]:fill-fg-white",
].join(" ");

/** The hand-drawn swash that underlines a word of the headline. */
const Underline = () => (
    <svg
        viewBox="0 0 350 24"
        fill="none"
        aria-hidden="true"
        preserveAspectRatio="none"
        className="text-fg-brand-secondary absolute inset-x-0 -bottom-1.5 h-6 w-full scale-105 md:bottom-0"
    >
        <path d="M8 15.5c58-7 172-9.5 334-2.5" stroke="currentColor" strokeWidth="11" strokeLinecap="round" vectorEffect="non-scaling-stroke" opacity="0.9" />
    </svg>
);

/**
 * Hero simple text 02 — an agency headline on a solid brand section, with one word
 * underlined by a swash and a wide photograph beneath the fold.
 */
export const HeroSimpleText02 = () => (
    <div className="bg-brand-section relative overflow-hidden">
        <BackgroundPattern pattern="grid" size="sm" className="absolute top-0 left-1/2 z-0 hidden max-w-none -translate-x-1/2 opacity-20 md:block" />
        <BackgroundPattern pattern="grid" size="sm" className="absolute top-0 left-1/2 z-0 max-w-none -translate-x-1/2 opacity-20 md:hidden" />

        <MarketingHeader items={navItems} className={headerClassName} />

        <section className="relative py-16 md:py-24">
            <div className="max-w-container mx-auto w-full px-4 md:px-8">
                <div className="flex max-w-5xl flex-col">
                    <h1 className="text-display-md text-primary_on-brand md:text-display-lg lg:text-display-xl font-medium">
                        We design digital{" "}
                        <span className="relative inline-flex">
                            <Underline />
                            <span className="relative">experiences</span>
                        </span>{" "}
                        that create more happy in the world
                    </h1>
                    <p className="text-tertiary_on-brand mt-4 max-w-(--breakpoint-sm) text-lg text-balance md:mt-6 md:text-xl">
                        — We&apos;re a full-service design and development agency who specialize in simple, useful and beautiful solutions.
                    </p>

                    <div className="mt-8 flex w-full flex-col-reverse items-stretch gap-3 sm:w-auto sm:flex-row sm:items-start md:mt-12">
                        <Button size="xl" color="secondary" iconLeading={PlayCircle}>
                            Showreel
                        </Button>
                        <Button size="xl">Get in touch</Button>
                    </div>
                </div>
            </div>

            <div className="max-w-container mx-auto mt-16 w-full px-4 md:px-8">
                <img src={IMAGES.landscape[7].src} alt={IMAGES.landscape[7].alt} className="h-60 w-full object-cover md:h-[360px] lg:h-129" />
            </div>
        </section>
    </div>
);
