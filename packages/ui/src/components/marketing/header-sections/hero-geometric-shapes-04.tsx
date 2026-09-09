"use client";

import { PlayCircle } from "@smarteraui/icons";
import { BadgeGroup } from "@/components/base/badges/badge-groups";
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

/** Side of one cell in the decorative shape grid. */
const CELL = 152;

type ShapeKind = "square" | "circle" | "triangle-up" | "triangle-down" | "quarter-tl" | "quarter-tr" | "quarter-bl" | "quarter-br";

/** Returns the path data for one shape, positioned in the cell at (`col`, `row`). */
const shapePath = (kind: ShapeKind, col: number, row: number): string => {
    const x = col * CELL;
    const y = row * CELL;
    const x2 = x + CELL;
    const y2 = y + CELL;

    switch (kind) {
        case "square":
            return `M${x},${y} H${x2} V${y2} H${x} Z`;
        case "circle":
            return `M${x},${y + CELL / 2} a${CELL / 2},${CELL / 2} 0 1,0 ${CELL},0 a${CELL / 2},${CELL / 2} 0 1,0 ${-CELL},0 Z`;
        case "triangle-up":
            return `M${x},${y2} L${x + CELL / 2},${y} L${x2},${y2} Z`;
        case "triangle-down":
            return `M${x},${y} L${x2},${y} L${x + CELL / 2},${y2} Z`;
        case "quarter-tl":
            return `M${x2},${y} A${CELL},${CELL} 0 0 1 ${x},${y2} L${x},${y} Z`;
        case "quarter-tr":
            return `M${x2},${y2} A${CELL},${CELL} 0 0 1 ${x},${y} L${x2},${y} Z`;
        case "quarter-bl":
            return `M${x},${y} A${CELL},${CELL} 0 0 1 ${x2},${y2} L${x},${y2} Z`;
        case "quarter-br":
            return `M${x},${y2} A${CELL},${CELL} 0 0 1 ${x2},${y} L${x2},${y2} Z`;
    }
};

const shapes: { kind: ShapeKind; col: number; row: number; tone: string }[] = [
    { kind: "square", col: 0, row: 0, tone: "fill-utility-brand-200" },
    { kind: "quarter-bl", col: 1, row: 0, tone: "fill-utility-brand-400" },
    { kind: "triangle-up", col: 2, row: 0, tone: "fill-utility-brand-600" },
    { kind: "circle", col: 3, row: 0, tone: "fill-utility-brand-200" },
    { kind: "square", col: 4, row: 0, tone: "fill-utility-brand-400" },
    { kind: "quarter-br", col: 5, row: 0, tone: "fill-utility-brand-600" },
    { kind: "triangle-down", col: 6, row: 0, tone: "fill-utility-brand-200" },
    { kind: "quarter-tr", col: 7, row: 0, tone: "fill-utility-brand-400" },
    { kind: "triangle-up", col: 0, row: 1, tone: "fill-utility-brand-400" },
    { kind: "circle", col: 1, row: 1, tone: "fill-utility-brand-600" },
    { kind: "square", col: 2, row: 1, tone: "fill-utility-brand-200" },
    { kind: "quarter-tl", col: 3, row: 1, tone: "fill-utility-brand-400" },
    { kind: "quarter-bl", col: 4, row: 1, tone: "fill-utility-brand-200" },
    { kind: "square", col: 5, row: 1, tone: "fill-utility-brand-600" },
    { kind: "circle", col: 6, row: 1, tone: "fill-utility-brand-400" },
    { kind: "triangle-down", col: 7, row: 1, tone: "fill-utility-brand-600" },
];

/** The decorative band of brand-tinted geometric shapes below the fold. */
const GeometricShapes = () => (
    <svg viewBox={`0 0 ${CELL * 8} ${CELL * 2}`} fill="none" aria-hidden="true" preserveAspectRatio="xMidYMid slice" className="w-full object-cover">
        <rect width={CELL * 8} height={CELL * 2} className="fill-utility-brand-50" />
        {shapes.map((shape) => (
            <path key={`${shape.kind}-${shape.col}-${shape.row}`} d={shapePath(shape.kind, shape.col, shape.row)} className={shape.tone} />
        ))}
    </svg>
);

/**
 * Hero geometric shapes 04 — a centered studio headline above a full-width band of
 * brand-tinted geometric shapes.
 */
export const HeroGeometricShapes04 = () => (
    <div className="bg-primary relative overflow-hidden">
        <BackgroundPattern pattern="grid" size="sm" className="absolute top-0 left-1/2 z-0 hidden max-w-none -translate-x-1/2 md:block" />
        <BackgroundPattern pattern="grid" size="sm" className="absolute top-0 left-1/2 z-0 max-w-none -translate-x-1/2 md:hidden" />

        <MarketingHeader items={navItems} />

        <section className="relative py-16 md:py-24">
            <div className="max-w-container mx-auto w-full px-4 md:px-8">
                <div className="mx-auto flex max-w-5xl flex-col md:items-center md:text-center">
                    <a href="/careers" className="outline-focus-ring rounded-full focus-visible:outline-2 focus-visible:outline-offset-2">
                        <BadgeGroup size="lg" color="brand" addonText="We're hiring!" className="hidden md:flex">
                            Join our design team
                        </BadgeGroup>
                        <BadgeGroup size="md" color="brand" addonText="We're hiring!" className="md:hidden">
                            Join our design team
                        </BadgeGroup>
                    </a>

                    <h1 className="text-display-md text-primary md:text-display-lg lg:text-display-xl mt-4 font-medium">
                        Creating stylish, functional and memorable spaces
                    </h1>
                    <p className="text-tertiary mt-4 max-w-120 text-lg text-balance md:mt-6 md:text-xl">
                        — We&apos;re a full-service interior design studio who specialize in simple and timeless spaces.
                    </p>

                    <div className="mt-8 flex w-full flex-col-reverse items-stretch gap-3 sm:w-auto sm:flex-row sm:items-start md:mt-12">
                        <Button size="xl" color="secondary" iconLeading={PlayCircle}>
                            Showreel
                        </Button>
                        <Button size="xl">Chat to us</Button>
                    </div>
                </div>
            </div>

            <div className="max-w-container mx-auto mt-16 w-full px-4 md:px-8">
                <GeometricShapes />
            </div>
        </section>
    </div>
);
