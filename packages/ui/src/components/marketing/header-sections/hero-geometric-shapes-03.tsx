"use client";

import { ArrowRight, PlayCircle } from "@smarteraui/icons";
import { BadgeGroup } from "@/components/base/badges/badge-groups";
import { Button } from "@/components/base/buttons/button";
import type { MarketingNavItemType } from "@/components/marketing/header-navigations/base-components/header";
import { MarketingHeader } from "@/components/marketing/header-navigations/base-components/header";
import { ProductsMenu, SimpleResourcesMenu } from "@/components/marketing/header-navigations/base-components/menus";
import { BackgroundPattern } from "@/components/shared-assets/background-patterns";

const navItems: MarketingNavItemType[] = [
    { label: "Products", menu: <ProductsMenu /> },
    { label: "Services", menu: <ProductsMenu /> },
    { label: "Pricing", href: "/pricing" },
    { label: "Resources", menu: <SimpleResourcesMenu /> },
    { label: "About", href: "/about" },
];

const announcement = { addonText: "We're hiring!", children: "Join our design team" };

/**
 * One tile of the mosaic. `shape` picks the geometry, `rotate` turns it a quarter at a
 * time, and `fill` is a brand utility scale step.
 */
interface Tile {
    x: number;
    y: number;
    shape: "square" | "triangle" | "circle" | "quarter" | "half";
    rotate?: 0 | 90 | 180 | 270;
    fill: string;
}

const TILE = 100;

/**
 * A fixed 5×5 arrangement — deterministic so screenshot diffing stays stable. Tiles are
 * authored bottom-heavy on the darker steps so the block reads as it does in the reference.
 */
const tiles: Tile[] = [
    { x: 0, y: 0, shape: "square", fill: "fill-utility-brand-200" },
    { x: 1, y: 0, shape: "triangle", rotate: 90, fill: "fill-utility-brand-400" },
    { x: 2, y: 0, shape: "triangle", rotate: 180, fill: "fill-utility-brand-400" },
    { x: 3, y: 0, shape: "half", rotate: 180, fill: "fill-utility-brand-200" },
    { x: 4, y: 0, shape: "triangle", rotate: 270, fill: "fill-utility-brand-600" },

    { x: 0, y: 1, shape: "square", fill: "fill-utility-brand-100" },
    { x: 1, y: 1, shape: "triangle", rotate: 0, fill: "fill-utility-brand-600" },
    { x: 2, y: 1, shape: "quarter", rotate: 180, fill: "fill-utility-brand-600" },
    { x: 3, y: 1, shape: "circle", fill: "fill-utility-brand-400" },
    { x: 4, y: 1, shape: "quarter", rotate: 90, fill: "fill-utility-brand-400" },

    { x: 0, y: 2, shape: "circle", fill: "fill-utility-brand-200" },
    { x: 1, y: 2, shape: "circle", fill: "fill-utility-brand-600" },
    { x: 2, y: 2, shape: "triangle", rotate: 180, fill: "fill-utility-brand-200" },
    { x: 3, y: 2, shape: "square", fill: "fill-utility-brand-100" },
    { x: 4, y: 2, shape: "circle", fill: "fill-utility-brand-600" },

    { x: 0, y: 3, shape: "half", rotate: 0, fill: "fill-utility-brand-400" },
    { x: 1, y: 3, shape: "half", rotate: 0, fill: "fill-utility-brand-600" },
    { x: 2, y: 3, shape: "square", fill: "fill-utility-brand-600" },
    { x: 3, y: 3, shape: "triangle", rotate: 0, fill: "fill-utility-brand-200" },
    { x: 4, y: 3, shape: "square", fill: "fill-utility-brand-100" },

    { x: 0, y: 4, shape: "quarter", rotate: 270, fill: "fill-utility-brand-200" },
    { x: 1, y: 4, shape: "circle", fill: "fill-utility-brand-400" },
    { x: 2, y: 4, shape: "triangle", rotate: 90, fill: "fill-utility-brand-600" },
    { x: 3, y: 4, shape: "square", fill: "fill-utility-brand-100" },
    { x: 4, y: 4, shape: "triangle", rotate: 0, fill: "fill-utility-brand-600" },
];

const renderTile = ({ shape, rotate = 0, fill }: Tile) => {
    const transform = `rotate(${rotate} ${TILE / 2} ${TILE / 2})`;

    switch (shape) {
        case "square":
            return <rect width={TILE} height={TILE} className={fill} />;
        case "triangle":
            return <path d={`M0 ${TILE}H${TILE}V0Z`} transform={transform} className={fill} />;
        case "circle":
            return <circle cx={TILE / 2} cy={TILE / 2} r={TILE / 2} className={fill} />;
        case "quarter":
            return <path d={`M0 ${TILE}A${TILE} ${TILE} 0 0 1 ${TILE} 0V${TILE}Z`} transform={transform} className={fill} />;
        case "half":
            return <path d={`M0 ${TILE}A${TILE / 2} ${TILE / 2} 0 0 1 ${TILE} ${TILE}Z`} transform={transform} className={fill} />;
    }
};

/** The brand mosaic that fills the end half of the hero. Purely decorative. */
const GeometricMosaic = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 500 500" preserveAspectRatio="xMidYMid slice" aria-hidden="true" className={className}>
        <rect width="500" height="500" className="fill-bg-primary" />
        {tiles.map((tile) => (
            <g key={`${tile.x}-${tile.y}`} transform={`translate(${tile.x * TILE} ${tile.y * TILE})`}>
                {renderTile(tile)}
            </g>
        ))}
    </svg>
);

/**
 * Studio hero: an announcement chip, an editorial headline and two actions on the start
 * half, with a brand-tinted geometric mosaic pinned to the end half from `lg` up.
 */
export const HeroGeometricShapes03 = () => (
    <div className="bg-primary relative overflow-hidden">
        <BackgroundPattern pattern="grid" size="sm" className="absolute top-0 left-1/2 z-0 max-w-none -translate-x-1/2" />

        <MarketingHeader items={navItems} />

        <section className="relative py-16 lg:flex lg:min-h-180 lg:items-center lg:py-24">
            <div className="max-w-container mx-auto flex w-full items-center px-4 md:px-8">
                <div className="flex flex-col items-start md:max-w-3xl lg:w-1/2 lg:pe-8">
                    <a href="/careers" className="outline-focus-ring rounded-[10px] focus-visible:outline-2 focus-visible:outline-offset-2">
                        <BadgeGroup size="lg" color="brand" theme="modern" iconTrailing={ArrowRight} className="hidden md:flex" {...announcement} />
                        <BadgeGroup size="md" color="brand" theme="modern" iconTrailing={ArrowRight} className="md:hidden" {...announcement} />
                    </a>

                    <h1 className="text-display-md text-primary md:text-display-lg lg:text-display-xl mt-4 font-medium">
                        Creating stylish, functional and memorable spaces
                    </h1>
                    <p className="text-tertiary mt-4 max-w-lg text-lg text-balance md:mt-6 md:text-xl">
                        — We&apos;re a full-service interior design studio who specialize in simple and timeless spaces.
                    </p>

                    <div className="mt-8 flex w-full flex-col-reverse items-stretch gap-3 sm:flex-row sm:items-start md:mt-12">
                        <Button color="secondary" size="xl" iconLeading={PlayCircle}>
                            Showreel
                        </Button>
                        <Button size="xl">Chat to us</Button>
                    </div>
                </div>
            </div>

            <div className="relative mt-16 w-full px-4 md:h-95 md:px-8 lg:absolute lg:inset-y-0 lg:end-0 lg:mt-0 lg:h-full lg:w-1/2 lg:px-0">
                <GeometricMosaic className="h-60 w-full object-cover md:h-full" />
            </div>
        </section>
    </div>
);
