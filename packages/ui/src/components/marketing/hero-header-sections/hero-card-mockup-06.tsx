"use client";

import type { CSSProperties } from "react";
import { PlayCircle } from "@properui/icons";
import { Button } from "@/components/base/buttons/button";
import { HeaderDropdownSimple } from "@/components/marketing/header-navigations/header-dropdown-simple";
import { BackgroundPattern } from "@/components/shared-assets/background-patterns";
import { CreditCard } from "@/components/shared-assets/credit-card/credit-card";
import { AVATARS } from "@/utils/demo-assets";

/** The five cards of the fan, ordered left to right, each with its own rotation and offset. */
const cards = [
    { holder: AVATARS[1].name, rotate: 30, x: -59, y: 39 },
    { holder: AVATARS[0].name, rotate: 60, x: -38, y: 10 },
    { holder: AVATARS[2].name, rotate: 90, x: 0, y: 0 },
    { holder: AVATARS[3].name, rotate: 120, x: 36, y: 10 },
    { holder: AVATARS[4].name, rotate: 150, x: 59, y: 39 },
];

const fanTransform = (card: (typeof cards)[number]) =>
    ({
        "--transform-mobile": `scale(0.7) translate(${card.x}px, ${card.y}px) rotate(${card.rotate}deg)`,
        "--transform-desktop": `scale(1.77) translate(${card.x}px, ${card.y}px) rotate(${card.rotate}deg)`,
    }) as CSSProperties;

/** Fintech hero on a full-bleed brand background, with a fan of virtual cards and a soft light bloom. */
export const HeroCardMockup06 = () => (
    <div className="bg-brand-section relative overflow-hidden">
        <BackgroundPattern pattern="grid" size="sm" className="absolute -top-2 left-1/2 z-0 hidden max-w-none -translate-x-1/2 opacity-20 md:block" />
        <BackgroundPattern pattern="grid" size="sm" className="absolute top-0 left-1/2 z-0 max-w-none -translate-x-1/2 opacity-20 md:hidden" />

        {/* The band is permanently brand-dark, so the header chrome is scoped to the dark theme. */}
        <div className="dark-mode">
            <HeaderDropdownSimple />
        </div>

        <section className="relative overflow-hidden pt-16 md:pt-24 md:pb-0">
            {/* Soft light bloom in the bottom corner — the reference ships a raster; this is the same effect in CSS. */}
            <div
                aria-hidden="true"
                className="bg-utility-brand-400/40 pointer-events-none absolute -end-2/3 -bottom-12 size-160 rounded-full opacity-90 blur-3xl sm:-end-1/3 md:size-256"
            />

            <div className="max-w-container mx-auto w-full px-4 md:px-8">
                <div className="mx-auto flex max-w-3xl flex-col md:items-center md:text-center">
                    <span className="text-secondary_on-brand md:text-md text-sm font-semibold">Super. Simple. Banking.</span>
                    <h1 className="text-display-md text-primary_on-brand md:text-display-lg lg:text-display-2xl mt-3 font-semibold">
                        Banking technology that has your back.
                    </h1>
                    <p className="text-tertiary_on-brand mt-4 max-w-3xl text-lg text-balance md:mt-6 md:text-xl">
                        Simple, transparent banking. No hidden fees and free overdrafts.
                    </p>

                    <div className="mt-8 flex w-full flex-col-reverse items-stretch gap-3 sm:w-auto sm:flex-row sm:items-start md:mt-12">
                        <Button size="xl" color="secondary" iconLeading={PlayCircle} className="shadow-xs! ring-0">
                            Demo
                        </Button>
                        <Button size="xl">Sign up</Button>
                    </div>
                </div>
            </div>

            <div className="max-w-container mx-auto mt-16 w-full md:px-8">
                <div className="flex h-46 items-end justify-center md:h-114">
                    <div className="flex -translate-y-[53px] items-start justify-end md:translate-y-2">
                        {cards.map((card) => (
                            <div
                                key={card.holder}
                                style={fanTransform(card)}
                                className="absolute origin-right [transform:var(--transform-mobile)] md:[transform:var(--transform-desktop)]"
                            >
                                <CreditCard type="transparent-gradient" company="Proper UI." cardHolder={card.holder} cardExpiration="06/28" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    </div>
);
