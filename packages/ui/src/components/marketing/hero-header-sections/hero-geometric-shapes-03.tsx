"use client";

import type { SVGProps } from "react";
import { PlayCircle } from "@properui/icons";
import { BadgeGroup } from "../../base/badges/badge-groups";
import { Button } from "../../base/buttons/button";
import { BackgroundPattern } from "../../shared-assets/background-patterns";
import { HeaderDropdownSimple } from "../header-navigations/header-dropdown-simple";

/**
 * Decorative composition of brand-tinted geometric shapes that fills the right half of the hero.
 * Drawn inline so it inherits the brand palette in both themes instead of shipping two raster files.
 */
const GeometricShapes = (props: SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 640 720" fill="none" preserveAspectRatio="xMidYMid slice" aria-hidden="true" {...props}>
        <rect width="640" height="720" className="fill-utility-brand-50" />
        <circle cx="452" cy="196" r="164" className="fill-utility-brand-200" />
        <rect x="88" y="256" width="288" height="288" rx="24" className="fill-utility-brand-500" />
        <path d="M356 720 L520 432 L640 720 Z" className="fill-utility-brand-700" />
        <path d="M0 96 L188 96 L0 380 Z" className="fill-utility-brand-300" />
        <circle cx="152" cy="640" r="72" className="fill-utility-brand-400" />
    </svg>
);

/** Interior-design hero: copy on the left, a stack of brand geometric shapes filling the right half. */
export const HeroGeometricShapes03 = () => (
    <div className="bg-primary relative overflow-hidden">
        <BackgroundPattern pattern="grid" size="sm" className="absolute top-0 left-1/2 z-0 hidden max-w-none -translate-x-1/2 md:block" />
        <BackgroundPattern pattern="grid" size="sm" className="absolute top-0 left-1/2 z-0 max-w-none -translate-x-1/2 md:hidden" />

        <HeaderDropdownSimple />

        <section className="relative py-16 lg:flex lg:min-h-180 lg:items-center lg:py-24">
            <div className="max-w-container mx-auto flex w-full items-center px-4 md:px-8">
                <div className="flex flex-col items-start md:max-w-3xl lg:w-1/2 lg:pe-8">
                    <a href="/careers" className="outline-focus-ring rounded-[10px] focus-visible:outline-2 focus-visible:outline-offset-2">
                        <BadgeGroup className="hidden md:flex" size="lg" color="brand" theme="modern" addonText="We're hiring!">
                            Join our design team
                        </BadgeGroup>
                        <BadgeGroup className="md:hidden" size="md" color="brand" theme="modern" addonText="We're hiring!">
                            Join our design team
                        </BadgeGroup>
                    </a>

                    <h1 className="text-display-md text-primary md:text-display-lg lg:text-display-xl mt-4 font-medium">
                        Creating stylish, functional and memorable spaces
                    </h1>
                    <p className="text-tertiary mt-4 max-w-lg text-lg text-balance md:mt-6 md:text-xl">
                        We&apos;re a full-service interior design studio who specialize in simple and timeless spaces.
                    </p>

                    <div className="mt-8 flex w-full flex-col-reverse items-stretch gap-3 sm:flex-row sm:items-start md:mt-12">
                        <Button size="xl" color="secondary" iconLeading={PlayCircle}>
                            Showreel
                        </Button>
                        <Button size="xl">Chat to us</Button>
                    </div>
                </div>
            </div>

            <div className="relative mt-16 w-full px-4 md:h-95 md:px-8 lg:absolute lg:inset-y-0 lg:end-0 lg:mt-0 lg:h-full lg:w-1/2 lg:px-0">
                <GeometricShapes className="h-60 w-full object-cover md:size-full" />
            </div>
        </section>
    </div>
);
