"use client";

import { PlayCircle } from "@properui/icons";
import { BadgeGroup } from "../../base/badges/badge-groups";
import { Button } from "../../base/buttons/button";
import { BackgroundPattern } from "../../shared-assets/background-patterns";
import type { MarketingNavItemType } from "../header-navigations/base-components/header";
import { MarketingHeader } from "../header-navigations/base-components/header";
import { SimpleResourcesMenu } from "../header-navigations/base-components/menus";

const navItems: MarketingNavItemType[] = [
    { label: "Products", menu: <SimpleResourcesMenu /> },
    { label: "Services", menu: <SimpleResourcesMenu /> },
    { label: "Pricing", href: "/pricing" },
    { label: "Resources", menu: <SimpleResourcesMenu /> },
    { label: "About", href: "/about" },
];

type TileKind = "circle" | "square" | "half" | "quarter" | "triangle" | "block";

/** One 120×120 tile of the Bauhaus-style shape band. */
const Tile = ({ kind, x, y, rotate = 0, className }: { kind: TileKind; x: number; y: number; rotate?: number; className?: string }) => (
    <g transform={`translate(${x * 120} ${y * 120}) rotate(${rotate} 60 60)`} className={className}>
        {kind === "block" && <rect width="120" height="120" fill="currentColor" />}
        {kind === "circle" && <circle cx="60" cy="60" r="42" fill="currentColor" />}
        {kind === "square" && <rect x="20" y="20" width="80" height="80" fill="currentColor" />}
        {kind === "half" && <path d="M0 60a60 60 0 0 1 120 0z" fill="currentColor" />}
        {kind === "quarter" && <path d="M0 120A120 120 0 0 1 120 0v120z" fill="currentColor" />}
        {kind === "triangle" && <path d="M0 0h120v120z" fill="currentColor" />}
    </g>
);

const tiles: { kind: TileKind; x: number; y: number; rotate?: number; className: string }[] = [
    { kind: "block", x: 0, y: 0, className: "text-utility-brand-200" },
    { kind: "triangle", x: 1, y: 0, rotate: 90, className: "text-utility-brand-400" },
    { kind: "circle", x: 1, y: 0, className: "text-utility-brand-100" },
    { kind: "quarter", x: 2, y: 0, rotate: 180, className: "text-utility-brand-300" },
    { kind: "half", x: 3, y: 0, rotate: 180, className: "text-utility-brand-500" },
    { kind: "circle", x: 4, y: 0, className: "text-utility-brand-300" },
    { kind: "circle", x: 5, y: 0, className: "text-utility-brand-600" },
    { kind: "triangle", x: 6, y: 0, rotate: 180, className: "text-utility-brand-300" },
    { kind: "block", x: 7, y: 0, className: "text-utility-brand-200" },
    { kind: "circle", x: 7, y: 0, className: "text-utility-brand-600" },
    { kind: "block", x: 0, y: 1, className: "text-utility-brand-200" },
    { kind: "triangle", x: 0, y: 1, rotate: 90, className: "text-utility-brand-600" },
    { kind: "quarter", x: 1, y: 1, rotate: 270, className: "text-utility-brand-400" },
    { kind: "half", x: 2, y: 1, rotate: 180, className: "text-utility-brand-300" },
    { kind: "half", x: 3, y: 1, className: "text-utility-brand-400" },
    { kind: "circle", x: 4, y: 1, className: "text-utility-brand-500" },
    { kind: "square", x: 5, y: 1, className: "text-utility-brand-600" },
    { kind: "block", x: 6, y: 1, className: "text-utility-brand-200" },
    { kind: "triangle", x: 7, y: 1, rotate: 270, className: "text-utility-brand-600" },
];

/** The decorative Bauhaus band beneath the hero copy. */
const GeometricShapes = ({ className }: { className?: string }) => (
    <svg aria-hidden="true" viewBox="0 0 960 240" fill="none" preserveAspectRatio="none" className={className}>
        {tiles.map((tile, index) => (
            <Tile key={index} {...tile} />
        ))}
    </svg>
);

/**
 * Hero geometric shapes 04 — a centred studio hero with a hiring badge above a full-width
 * band of brand-coloured geometric tiles.
 */
export const HeroGeometricShapes04 = () => (
    <div className="bg-primary relative overflow-hidden">
        <BackgroundPattern pattern="grid" size="md" className="absolute top-0 left-1/2 z-0 hidden max-w-none -translate-x-1/2 md:block" />
        <BackgroundPattern pattern="grid" size="sm" className="absolute top-0 left-1/2 z-0 max-w-none -translate-x-1/2 md:hidden" />

        <MarketingHeader items={navItems} />

        <section className="relative py-16 md:py-24">
            <div className="max-w-container mx-auto w-full px-4 md:px-8">
                <div className="mx-auto flex max-w-5xl flex-col md:items-center md:text-center">
                    <a href="/careers" className="outline-focus-ring rounded-full focus-visible:outline-2 focus-visible:outline-offset-2">
                        <BadgeGroup size="lg" color="brand" theme="light" addonText="We're hiring!" className="hidden md:flex">
                            Join our design team
                        </BadgeGroup>
                        <BadgeGroup size="md" color="brand" theme="light" addonText="We're hiring!" className="md:hidden">
                            Join our design team
                        </BadgeGroup>
                    </a>

                    <h1 className="text-display-md text-primary md:text-display-lg lg:text-display-xl mt-4 font-medium">
                        Creating stylish, functional and memorable spaces
                    </h1>
                    <p className="text-tertiary mt-4 max-w-120 text-lg text-balance md:mt-6 md:text-xl">
                        We&apos;re a full-service interior design studio who specialize in simple and timeless spaces.
                    </p>
                    <div className="mt-8 flex w-full flex-col-reverse items-stretch gap-3 sm:w-auto sm:flex-row sm:items-start md:mt-12">
                        <Button size="xl" color="secondary" iconLeading={PlayCircle} href="/showreel">
                            Showreel
                        </Button>
                        <Button size="xl" href="/contact">
                            Chat to us
                        </Button>
                    </div>
                </div>
            </div>

            <div className="max-w-container mx-auto mt-16 w-full px-4 md:px-8">
                <GeometricShapes className="h-52 w-full md:h-60" />
            </div>
        </section>
    </div>
);
