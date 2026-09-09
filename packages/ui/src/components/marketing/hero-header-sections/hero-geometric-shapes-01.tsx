"use client";

import { PlayCircle } from "@smarteraui/icons";
import { Button } from "@/components/base/buttons/button";
import type { MarketingNavItemType } from "@/components/marketing/header-navigations/base-components/header";
import { MarketingHeader } from "@/components/marketing/header-navigations/base-components/header";
import { SimpleResourcesMenu } from "@/components/marketing/header-navigations/base-components/menus";
import { BackgroundPattern } from "@/components/shared-assets/background-patterns";

const navItems: MarketingNavItemType[] = [
    { label: "Products", menu: <SimpleResourcesMenu /> },
    { label: "Services", menu: <SimpleResourcesMenu /> },
    { label: "Pricing", href: "/pricing" },
    { label: "Resources", menu: <SimpleResourcesMenu /> },
    { label: "About", href: "/about" },
];

type TileKind = "circle" | "square" | "half" | "quarter" | "arc" | "leaf" | "triangle";

/** One 120×120 tile of the Bauhaus-style shape grid. */
const Tile = ({ kind, x, y, rotate = 0, className }: { kind: TileKind; x: number; y: number; rotate?: number; className?: string }) => (
    <g transform={`translate(${x * 120} ${y * 120}) rotate(${rotate} 60 60)`} className={className}>
        {kind === "circle" && <circle cx="60" cy="60" r="60" fill="currentColor" />}
        {kind === "square" && <rect x="20" y="20" width="80" height="80" fill="currentColor" />}
        {kind === "half" && <path d="M0 60a60 60 0 0 1 120 0z" fill="currentColor" />}
        {kind === "quarter" && <path d="M0 120A120 120 0 0 1 120 0v120z" fill="currentColor" />}
        {kind === "arc" && <path d="M0 120A120 120 0 0 1 120 0v40A80 80 0 0 0 40 120z" fill="currentColor" />}
        {kind === "leaf" && <path d="M0 0A120 120 0 0 1 120 120 120 120 0 0 1 0 0z" fill="currentColor" />}
        {kind === "triangle" && <path d="M0 0h120v120z" fill="currentColor" />}
    </g>
);

const tiles: { kind: TileKind; x: number; y: number; rotate?: number; className: string }[] = [
    { kind: "leaf", x: 0, y: 0, className: "text-utility-brand-500" },
    { kind: "half", x: 1, y: 0, rotate: 90, className: "text-utility-brand-300" },
    { kind: "circle", x: 2, y: 0, className: "text-utility-brand-200" },
    { kind: "triangle", x: 3, y: 0, rotate: 180, className: "text-utility-brand-700" },
    { kind: "square", x: 0, y: 1, className: "text-utility-brand-600" },
    { kind: "leaf", x: 1, y: 1, rotate: 90, className: "text-utility-brand-500" },
    { kind: "leaf", x: 2, y: 1, rotate: 270, className: "text-utility-brand-400" },
    { kind: "quarter", x: 3, y: 1, rotate: 90, className: "text-utility-brand-300" },
    { kind: "arc", x: 0, y: 2, className: "text-utility-brand-400" },
    { kind: "triangle", x: 1, y: 2, rotate: 90, className: "text-utility-brand-200" },
    { kind: "circle", x: 2, y: 2, className: "text-utility-brand-700" },
    { kind: "square", x: 3, y: 2, className: "text-utility-brand-600" },
    { kind: "circle", x: 0, y: 3, className: "text-utility-brand-300" },
    { kind: "triangle", x: 1, y: 3, rotate: 270, className: "text-utility-brand-500" },
    { kind: "quarter", x: 2, y: 3, rotate: 180, className: "text-utility-brand-600" },
    { kind: "arc", x: 3, y: 3, rotate: 270, className: "text-utility-brand-400" },
];

/** The decorative Bauhaus grid that fills the right half of the hero. */
const GeometricShapes = ({ className }: { className?: string }) => (
    <svg aria-hidden="true" viewBox="0 0 480 480" fill="none" className={className}>
        {tiles.map((tile) => (
            <Tile key={`${tile.x}-${tile.y}`} {...tile} />
        ))}
    </svg>
);

/**
 * Hero geometric shapes 01 — a studio hero pairing an editorial headline with a grid of
 * brand-coloured geometric tiles.
 */
export const HeroGeometricShapes01 = () => (
    <div className="bg-primary relative overflow-hidden">
        <BackgroundPattern pattern="grid" size="md" className="absolute top-0 left-1/2 z-0 hidden max-w-none -translate-x-1/2 md:block" />
        <BackgroundPattern pattern="grid" size="sm" className="absolute top-0 left-1/2 z-0 max-w-none -translate-x-1/2 md:hidden" />

        <MarketingHeader items={navItems} />

        <section className="relative py-16 md:pb-24">
            <div className="max-w-container mx-auto grid grid-cols-1 items-center gap-16 px-4 md:px-8 lg:grid-cols-2 lg:gap-8">
                <div className="flex max-w-3xl flex-col items-start lg:pe-8">
                    <h1 className="text-display-md text-primary md:text-display-lg lg:text-display-xl font-medium">
                        Creating stylish, functional and memorable spaces
                    </h1>
                    <p className="text-tertiary mt-4 max-w-lg text-lg text-balance md:mt-6 md:text-xl">
                        — We&apos;re a full-service interior design studio who specialize in simple and timeless spaces.
                    </p>
                    <div className="mt-8 flex w-full flex-col-reverse items-stretch gap-3 sm:flex-row sm:items-start md:mt-12">
                        <Button size="xl" color="secondary" iconLeading={PlayCircle} href="/showreel">
                            Showreel
                        </Button>
                        <Button size="xl" href="/contact">
                            Chat to us
                        </Button>
                    </div>
                </div>

                <div className="relative lg:h-full lg:min-h-160">
                    <GeometricShapes className="size-full object-cover" />
                </div>
            </div>
        </section>
    </div>
);
