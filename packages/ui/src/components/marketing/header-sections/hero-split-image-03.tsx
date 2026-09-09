"use client";

import type { SVGProps } from "react";
import { PlayCircle } from "@smarteraui/icons";
import { FileUpload } from "@/components/application/file-upload/file-upload-base";
import { Button } from "@/components/base/buttons/button";
import type { MarketingNavItemType } from "@/components/marketing/header-navigations/base-components/header";
import { MarketingHeader } from "@/components/marketing/header-navigations/base-components/header";
import { SimpleResourcesMenu } from "@/components/marketing/header-navigations/base-components/menus";
import { IMAGES } from "@/utils/demo-assets";

const navItems: MarketingNavItemType[] = [
    { label: "Products", menu: <SimpleResourcesMenu /> },
    { label: "Services", menu: <SimpleResourcesMenu /> },
    { label: "Pricing", href: "/pricing" },
    { label: "Resources", menu: <SimpleResourcesMenu /> },
    { label: "About", href: "/about" },
];

const MB = 1024 * 1024;

/**
 * Decorative field of short slanted strokes. Replaces the reference's hosted accent SVG so
 * the library ships no external image. Purely presentational — always `aria-hidden`.
 */
// TODO(orchestrator): candidate for components/shared-assets/background-patterns
const TickField = (props: SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 298 408" fill="none" aria-hidden="true" {...props}>
        {Array.from({ length: 17 }).map((_, row) =>
            Array.from({ length: 12 }).map((_, column) => {
                const x = 8 + column * 24;
                const y = 8 + row * 24;
                const leans = (row + column) % 2 === 0;

                return (
                    <line
                        key={`${row}-${column}`}
                        x1={leans ? x : x + 10}
                        y1={y}
                        x2={leans ? x + 10 : x}
                        y2={y + 14}
                        stroke="currentColor"
                        strokeWidth={1.5}
                        strokeLinecap="round"
                    />
                );
            }),
        )}
    </svg>
);

/**
 * Split hero with the copy on the start edge and a tall portrait image with a rounded
 * start corner on the end edge, overlaid with floating upload cards from `lg` up.
 */
export const HeroSplitImage03 = () => (
    <>
        <MarketingHeader items={navItems} className="bg-primary" />

        <section className="bg-primary overflow-hidden py-16 md:pb-24">
            <div className="max-w-container mx-auto grid grid-cols-1 items-center gap-16 px-4 md:px-8 lg:grid-cols-2 lg:gap-8">
                <div className="flex max-w-3xl flex-col items-start lg:pe-8">
                    <h1 className="text-display-md text-primary md:text-display-lg lg:text-display-xl font-semibold">People who care about your growth</h1>
                    <p className="text-tertiary mt-4 max-w-lg text-lg text-balance md:mt-6 md:text-xl">
                        Powerful, self-serve product and growth analytics to help you convert, engage, and retain more.
                    </p>

                    <div className="mt-8 flex w-full flex-col-reverse items-stretch gap-3 sm:flex-row sm:items-start md:mt-12">
                        <Button size="xl" color="secondary" iconLeading={PlayCircle}>
                            Demo
                        </Button>
                        <Button size="xl">Sign up</Button>
                    </div>
                </div>

                <div className="relative lg:h-full lg:min-h-160">
                    <ul className="absolute -start-18 bottom-9 z-10 hidden w-92 flex-col gap-3 select-none lg:flex">
                        <FileUpload.ListItemProgressBar
                            name="Smartera Podcast – Episode 1.mp3"
                            size={20 * MB}
                            progress={100}
                            className="bg-alpha-white/90 ring-secondary_alt ring backdrop-blur-lg"
                        />
                        <FileUpload.ListItemProgressBar
                            name="Smartera Podcast – Episode 2.mp3"
                            size={16 * MB}
                            progress={80}
                            className="bg-alpha-white/90 ring-secondary_alt ring backdrop-blur-lg"
                        />
                    </ul>

                    <div className="absolute end-5 top-6 z-10 translate-x-1/2 md:-top-10">
                        <TickField className="text-fg-quaternary hidden w-48.5 opacity-30 md:block md:w-74.5" />
                    </div>

                    <img
                        src={IMAGES.landscape[0].src}
                        alt={IMAGES.landscape[0].alt}
                        className="inset-0 h-70 w-full rounded-ss-[64px] object-cover md:h-110 md:rounded-ss-[92px] lg:absolute lg:h-full lg:rounded-ss-[160px]"
                    />
                </div>
            </div>
        </section>
    </>
);
