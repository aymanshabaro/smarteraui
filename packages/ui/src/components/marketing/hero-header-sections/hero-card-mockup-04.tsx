"use client";

import { PlayCircle } from "@properui/icons";
import { cx } from "../../../utils/cx";
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

/** The blurred four-colour bloom that shines through the frosted cards. */
const CardBloom = () => (
    <div aria-hidden="true" className="absolute -top-4 -left-4 z-0 grid grid-cols-2 blur-3xl">
        <div className="bg-utility-pink-500 size-20 rounded-ss-full opacity-30" />
        <div className="bg-utility-orange-500 size-20 rounded-se-full opacity-50" />
        <div className="bg-utility-blue-500 size-20 rounded-es-full opacity-30" />
        <div className="bg-utility-green-500 size-20 rounded-ee-full opacity-30" />
    </div>
);

/** One frosted card in the isometric stack. */
const StackedCard = ({ cardHolder, className }: { cardHolder: string; className?: string }) => (
    <div className={cx("relative overflow-hidden rounded-2xl", className)}>
        <CardBloom />
        <CreditCard type="transparent" company="Proper UI." cardHolder={cardHolder} />
    </div>
);

/**
 * Hero card mockup 04 — split hero with an isometric stack of frosted cards floating on the
 * brand section colour.
 */
export const HeroCardMockup04 = () => (
    <div className="bg-secondary relative overflow-hidden">
        <BackgroundPattern pattern="grid" size="md" className="absolute top-0 left-1/2 z-0 hidden max-w-none -translate-x-1/2 md:block" />
        <BackgroundPattern pattern="grid" size="sm" className="absolute top-0 left-1/2 z-0 max-w-none -translate-x-1/2 md:hidden" />

        <MarketingHeader items={navItems} />

        <section className="relative py-16 md:pb-24">
            <div className="max-w-container mx-auto grid grid-cols-1 items-center gap-16 px-4 md:px-8 lg:grid-cols-2 lg:gap-16">
                <div className="flex max-w-3xl flex-col items-start">
                    <a href="/whats-new" className="outline-focus-ring rounded-[10px] focus-visible:outline-2 focus-visible:outline-offset-2">
                        <BadgeGroup size="lg" color="brand" theme="modern" addonText="What's new?" className="hidden md:flex">
                            Instantly issue virtual cards
                        </BadgeGroup>
                        <BadgeGroup size="md" color="brand" theme="modern" addonText="What's new?" className="md:hidden">
                            Instantly issue virtual cards
                        </BadgeGroup>
                    </a>

                    <h1 className="text-display-md text-primary md:text-display-lg lg:text-display-xl mt-4 font-semibold">
                        No more business banking headaches
                    </h1>
                    <p className="text-tertiary mt-4 max-w-120 text-lg text-balance md:mt-6 md:text-xl">
                        Proper UI is a next-gen financial technology company in the process of reinventing banking.
                    </p>

                    <div className="mt-8 flex w-full flex-col-reverse items-stretch gap-3 md:mt-12 md:flex-row md:items-start">
                        <Button size="xl" color="secondary" iconLeading={PlayCircle} href="/demo">
                            Demo
                        </Button>
                        <Button size="xl" href="/signup">
                            Sign up
                        </Button>
                    </div>
                </div>

                <div className="bg-brand-section relative -mx-4 flex h-80 items-center justify-center md:mx-0 md:h-120 lg:h-full lg:min-h-140">
                    <div className="translate-x-[34px] translate-y-[3px] -space-y-[116.5px] md:translate-x-[53px] md:translate-y-[37px] md:-space-y-[83px]">
                        <div className="relative z-3 translate-y-[22px] rotate-[29.9deg]">
                            <StackedCard
                                cardHolder={AVATARS[2].name}
                                className="[transform:scale(var(--scale))_rotateX(63deg)_rotateY(1deg)_rotateZ(51deg)_skewX(14deg)] [--scale:1.365] md:[--scale:2.1]"
                            />
                        </div>
                        <div className="relative z-2 translate-y-[10px] rotate-[14.8deg]">
                            <StackedCard
                                cardHolder={AVATARS[0].name}
                                className="[transform:scale(var(--scale))_rotateX(63deg)_rotateY(1deg)_rotateZ(51deg)_skewX(14deg)] [--scale:1.365] md:[--scale:2.099]"
                            />
                        </div>
                        <StackedCard
                            cardHolder={AVATARS[1].name}
                            className="z-1 [transform:scale(var(--scale))_rotateX(63deg)_rotateY(1deg)_rotateZ(51deg)_skewX(14deg)] [--scale:1.365] md:[--scale:2.1]"
                        />
                    </div>
                </div>
            </div>
        </section>
    </div>
);
