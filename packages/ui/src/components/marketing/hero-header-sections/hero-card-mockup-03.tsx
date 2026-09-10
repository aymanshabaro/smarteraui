"use client";

import type { CSSProperties } from "react";
import { PlayCircle } from "@properui/icons";
import { BadgeGroup } from "@/components/base/badges/badge-groups";
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

/** Centred fintech hero with a fan of virtual cards spread across a brand-coloured band. */
export const HeroCardMockup03 = () => (
    <div className="bg-primary relative overflow-hidden">
        <BackgroundPattern pattern="grid" size="sm" className="absolute -top-2 left-1/2 z-0 hidden max-w-none -translate-x-1/2 md:block" />
        <BackgroundPattern pattern="grid" size="sm" className="absolute top-0 left-1/2 z-0 max-w-none -translate-x-1/2 md:hidden" />

        <HeaderDropdownSimple />

        <section className="relative overflow-hidden pt-16 md:pt-24 md:pb-0">
            <div className="max-w-container mx-auto w-full px-4 md:px-8">
                <div className="mx-auto flex max-w-5xl flex-col md:items-center md:text-center">
                    <a href="/cards" className="outline-focus-ring rounded-[10px] focus-visible:outline-2 focus-visible:outline-offset-2">
                        <BadgeGroup className="hidden md:flex" size="lg" color="brand" theme="modern" addonText="What's new?">
                            Instantly issue virtual cards
                        </BadgeGroup>
                        <BadgeGroup className="md:hidden" size="md" color="brand" theme="modern" addonText="What's new?">
                            Instantly issue virtual cards
                        </BadgeGroup>
                    </a>

                    <h1 className="text-display-md text-primary md:text-display-lg lg:text-display-xl mt-4 font-semibold">No more banking headaches</h1>
                    <p className="text-tertiary mt-4 max-w-3xl text-lg text-balance md:mt-6 md:text-xl">
                        Mo money, no problems. Proper UI is a next-generation financial technology company in the process of reinventing
                        <span className="max-md:hidden"> banking. 30-day free trial.</span>
                    </p>

                    <div className="mt-8 flex w-full flex-col-reverse items-stretch gap-3 sm:w-auto sm:flex-row sm:items-start md:mt-12">
                        <Button size="xl" color="secondary" iconLeading={PlayCircle}>
                            Demo
                        </Button>
                        <Button size="xl">Sign up</Button>
                    </div>
                </div>
            </div>

            <div className="max-w-container mx-auto mt-16 w-full md:px-8">
                <div className="bg-brand-section flex h-51 items-end justify-center md:h-129">
                    <div className="flex -translate-y-[53px] items-start justify-end md:translate-y-3">
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
