"use client";

import type { SVGProps } from "react";
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

/**
 * Bauhaus-style composition of quarter circles, discs, leaves and striped blocks in brand tints.
 * Replaces the reference's three hosted `geo-shapes-*.svg` files so nothing is hotlinked; the
 * fixed pattern ids are safe to repeat because every instance defines the same stripe.
 */
// TODO(orchestrator): candidate for components/shared-assets/illustrations
const GeometricShapes = (props: SVGProps<SVGSVGElement>) => {
    // One 120pt cell per grid position, four across and four down.
    const cell = (column: number, row: number) => ({ x: column * 120, y: row * 120 });

    return (
        <svg viewBox="0 0 480 480" fill="none" aria-hidden="true" {...props}>
            <defs>
                <pattern id="smartera-geo-stripes-v" width="8" height="8" patternUnits="userSpaceOnUse">
                    <rect width="4" height="8" className="fill-utility-brand-400" />
                </pattern>
                <pattern id="smartera-geo-stripes-h" width="8" height="8" patternUnits="userSpaceOnUse">
                    <rect width="8" height="4" className="fill-utility-brand-400" />
                </pattern>
            </defs>

            {/* Row 1 */}
            <path d="M0 0h120v0a60 60 0 0 1-120 0z" className="fill-utility-brand-500" transform={`translate(${cell(0, 0).x} ${cell(0, 0).y})`} />
            <path d="M0 120a60 60 0 0 1 120 0z" className="fill-utility-brand-500" transform={`translate(${cell(0, 0).x} ${cell(0, 0).y})`} />
            <path d="M60 0a60 60 0 0 1 0 120z" className="fill-utility-brand-500" transform={`translate(${cell(1, 0).x} ${cell(1, 0).y})`} />
            <path d="M60 0a60 60 0 0 0 0 120z" fill="url(#smartera-geo-stripes-v)" transform={`translate(${cell(1, 0).x} ${cell(1, 0).y})`} />
            <circle cx="60" cy="60" r="60" className="fill-utility-brand-300" transform={`translate(${cell(2, 0).x} ${cell(2, 0).y})`} />
            <circle cx="60" cy="60" r="36" fill="url(#smartera-geo-stripes-v)" transform={`translate(${cell(2, 0).x} ${cell(2, 0).y})`} />
            <rect width="120" height="120" className="fill-utility-brand-700" transform={`translate(${cell(3, 0).x} ${cell(3, 0).y})`} />
            <path d="M20 20h80v80z" className="fill-utility-brand-50" transform={`translate(${cell(3, 0).x} ${cell(3, 0).y})`} />

            {/* Row 2 */}
            <rect width="120" height="60" fill="url(#smartera-geo-stripes-v)" transform={`translate(${cell(0, 1).x} ${cell(0, 1).y})`} />
            <path d="M0 60a60 60 0 0 0 120 0z" className="fill-utility-brand-700" transform={`translate(${cell(0, 1).x} ${cell(0, 1).y})`} />
            <path
                d="M120 0a120 120 0 0 1-120 120A120 120 0 0 1 120 0z"
                className="fill-utility-brand-500"
                transform={`translate(${cell(1, 1).x} ${cell(1, 1).y})`}
            />
            <path
                d="M0 0a120 120 0 0 1 120 120A120 120 0 0 1 0 0z"
                fill="url(#smartera-geo-stripes-h)"
                transform={`translate(${cell(2, 1).x} ${cell(2, 1).y})`}
            />
            <path d="M0 0a120 120 0 0 1 120 120H0z" className="fill-utility-brand-300" transform={`translate(${cell(3, 1).x} ${cell(3, 1).y})`} />

            {/* Row 3 */}
            <path
                d="M120 120A120 120 0 0 0 0 0v40a80 80 0 0 1 80 80z"
                className="fill-utility-brand-500"
                transform={`translate(${cell(0, 2).x} ${cell(0, 2).y})`}
            />
            <path d="M0 0h60v60H0z" className="fill-utility-brand-300" transform={`translate(${cell(1, 2).x} ${cell(1, 2).y})`} />
            <path d="M60 0h60L60 60z" className="fill-utility-brand-300" transform={`translate(${cell(1, 2).x} ${cell(1, 2).y})`} />
            <path d="M0 60h60v60z" className="fill-utility-brand-300" transform={`translate(${cell(1, 2).x} ${cell(1, 2).y})`} />
            <circle cx="60" cy="60" r="52" className="fill-utility-brand-800" transform={`translate(${cell(2, 2).x} ${cell(2, 2).y})`} />
            <rect width="120" height="120" fill="url(#smartera-geo-stripes-v)" transform={`translate(${cell(3, 2).x} ${cell(3, 2).y})`} />
            <rect x="28" y="28" width="64" height="64" className="fill-utility-brand-700" transform={`translate(${cell(3, 2).x} ${cell(3, 2).y})`} />

            {/* Row 4 */}
            <circle cx="60" cy="60" r="60" fill="url(#smartera-geo-stripes-v)" transform={`translate(${cell(0, 3).x} ${cell(0, 3).y})`} />
            <circle cx="60" cy="60" r="30" className="fill-utility-brand-300" transform={`translate(${cell(0, 3).x} ${cell(0, 3).y})`} />
            <path d="M0 0h120v120z" className="fill-utility-brand-500" transform={`translate(${cell(1, 3).x} ${cell(1, 3).y})`} />
            <path d="M120 0a120 120 0 0 1-120 120V0z" className="fill-utility-brand-600" transform={`translate(${cell(2, 3).x} ${cell(2, 3).y})`} />
            <path
                d="M0 120A120 120 0 0 1 120 0v40a80 80 0 0 0-80 80z"
                className="fill-utility-brand-500"
                transform={`translate(${cell(3, 3).x} ${cell(3, 3).y})`}
            />
        </svg>
    );
};

/** Studio-style hero: editorial copy on the start edge, a Bauhaus shape grid on the end edge. */
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
                        <Button size="xl" color="secondary" iconLeading={PlayCircle}>
                            Showreel
                        </Button>
                        <Button size="xl">Chat to us</Button>
                    </div>
                </div>

                <div className="relative lg:h-full lg:min-h-160">
                    <GeometricShapes className="size-full object-cover" />
                </div>
            </div>
        </section>
    </div>
);
