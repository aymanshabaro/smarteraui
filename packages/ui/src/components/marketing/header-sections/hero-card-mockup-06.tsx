"use client";

import type { CSSProperties } from "react";
import { PlayCircle } from "@properui/icons";
import { AVATARS } from "../../../utils/demo-assets";
import { Button } from "../../base/buttons/button";
import { BackgroundPattern } from "../../shared-assets/background-patterns";
import { CreditCard } from "../../shared-assets/credit-card/credit-card";
import type { MarketingNavItemType } from "../header-navigations/base-components/header";
import { MarketingHeader } from "../header-navigations/base-components/header";
import { ProductsMenu, SimpleResourcesMenu } from "../header-navigations/base-components/menus";

const navItems: MarketingNavItemType[] = [
    { label: "Products", menu: <ProductsMenu /> },
    { label: "Services", menu: <ProductsMenu /> },
    { label: "Pricing", href: "/pricing" },
    { label: "Resources", menu: <SimpleResourcesMenu /> },
    { label: "About", href: "/about" },
];

/** Same fan geometry as `HeroCardMockup03`, here over an all-brand section. */
const fannedCards = [
    { holder: AVATARS[1].name, translate: "-59px, 39px", rotate: 30 },
    { holder: AVATARS[0].name, translate: "-38px, 10px", rotate: 60 },
    { holder: AVATARS[2].name, translate: "0px, 0px", rotate: 90 },
    { holder: AVATARS[3].name, translate: "36px, 10px", rotate: 120 },
    { holder: AVATARS[4].name, translate: "59px, 39px", rotate: 150 },
];

/**
 * Fintech hero on a full brand background: centered copy with a flat white primary
 * action, and the same fan of translucent cards closing the section.
 */
export const HeroCardMockup06 = () => (
    <div className="bg-brand-section relative overflow-hidden">
        <BackgroundPattern pattern="grid" size="sm" className="absolute -top-2 left-1/2 z-0 max-w-none -translate-x-1/2 opacity-20" />

        <MarketingHeader items={navItems} />

        <section className="relative overflow-hidden pt-16 md:pt-24 md:pb-0">
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
                        {/* On the brand surface the secondary button drops its ring and keeps a flat shadow. */}
                        <Button color="secondary" size="xl" iconLeading={PlayCircle} className="shadow-xs! ring-0">
                            Demo
                        </Button>
                        <Button size="xl">Sign up</Button>
                    </div>
                </div>
            </div>

            <div className="max-w-container mx-auto mt-16 w-full md:px-8">
                <div className="flex h-46 items-end justify-center md:h-114">
                    <div className="flex -translate-y-[53px] items-start justify-end md:translate-y-2">
                        {fannedCards.map((card) => (
                            <div
                                key={card.rotate}
                                className="absolute origin-right [transform:var(--transform-mobile)] md:[transform:var(--transform-desktop)]"
                                style={
                                    {
                                        "--transform-mobile": `scale(0.7) translate(${card.translate}) rotate(${card.rotate}deg)`,
                                        "--transform-desktop": `scale(1.77) translate(${card.translate}) rotate(${card.rotate}deg)`,
                                    } as CSSProperties
                                }
                            >
                                <CreditCard type="transparent-gradient" company="Proper UI." cardHolder={card.holder} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    </div>
);
