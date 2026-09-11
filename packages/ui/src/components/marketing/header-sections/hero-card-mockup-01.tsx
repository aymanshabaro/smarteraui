"use client";

import type { CSSProperties } from "react";
import { PlayCircle } from "@properui/icons";
import { AVATARS } from "../../../utils/demo-assets";
import { BadgeGroup } from "../../base/badges/badge-groups";
import { Button } from "../../base/buttons/button";
import { BackgroundPattern } from "../../shared-assets/background-patterns";
import { CreditCard } from "../../shared-assets/credit-card/credit-card";
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

/** Each card is scaled and nudged differently on mobile and desktop. */
const cards = [
    {
        holder: AVATARS[1].name,
        type: "brand-dark",
        transform: {
            "--transform-mobile": "scale(0.79) translate(141px, 17px)",
            "--transform-desktop": "scale(1.77) translate(35px, 2px)",
        } as CSSProperties,
    },
    {
        holder: AVATARS[0].name,
        type: "transparent",
        transform: {
            "--transform-mobile": "scale(0.79) translate(-88px, 4px) rotate(30deg)",
            "--transform-desktop": "scale(1.77) translate(28px, -10.8px) rotate(30deg)",
        } as CSSProperties,
    },
] as const;

/**
 * Hero card mockup 01 — centered copy above a shelf of oversized credit cards that
 * sit flush with the bottom edge from `md` up.
 */
export const HeroCardMockup01 = () => (
    <div className="bg-primary relative overflow-hidden">
        <BackgroundPattern pattern="grid" size="sm" className="absolute -top-2 left-1/2 z-0 hidden max-w-none -translate-x-1/2 md:block" />
        <BackgroundPattern pattern="grid" size="sm" className="absolute top-0 left-1/2 z-0 max-w-none -translate-x-1/2 md:hidden" />

        <MarketingHeader items={navItems} isFloating />

        <section className="relative overflow-hidden py-16 md:pt-24 md:pb-0">
            <div className="max-w-container mx-auto w-full px-4 md:px-8">
                <div className="mx-auto flex max-w-5xl flex-col md:items-center md:text-center">
                    <a href="/features" className="outline-focus-ring rounded-[10px] focus-visible:outline-2 focus-visible:outline-offset-2">
                        <BadgeGroup size="lg" color="brand" theme="modern" addonText="What's new?" className="hidden md:flex">
                            Instantly issue virtual cards
                        </BadgeGroup>
                        <BadgeGroup size="md" color="brand" theme="modern" addonText="What's new?" className="md:hidden">
                            Instantly issue virtual cards
                        </BadgeGroup>
                    </a>

                    <h1 className="text-display-md text-primary md:text-display-lg lg:text-display-xl mt-4 font-semibold">No more banking headaches</h1>
                    <p className="text-tertiary mt-4 max-w-3xl text-lg text-balance md:mt-6 md:text-xl">
                        Mo money, no problems. Proper UI is a next-generation financial technology company in the process of reinventing banking. 30-day free
                        trial.
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
                <div className="bg-quaternary flex h-68 items-center justify-center md:h-120 md:items-end">
                    <div className="flex">
                        {cards.map((card) => (
                            <div
                                key={card.holder}
                                style={card.transform}
                                className="[transform:var(--transform-mobile)] md:[transform:var(--transform-desktop)]"
                            >
                                <CreditCard company="Proper UI." type={card.type} cardHolder={card.holder} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    </div>
);
