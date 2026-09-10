"use client";

import { PlayCircle } from "@properui/icons";
import { Button } from "@/components/base/buttons/button";
import type { MarketingNavItemType } from "@/components/marketing/header-navigations/base-components/header";
import { MarketingHeader } from "@/components/marketing/header-navigations/base-components/header";
import { SimpleResourcesMenu } from "@/components/marketing/header-navigations/base-components/menus";
import { BackgroundPattern } from "@/components/shared-assets/background-patterns";
import { CreditCard } from "@/components/shared-assets/credit-card/credit-card";
import { AVATARS } from "@/utils/demo-assets";

const navItems: MarketingNavItemType[] = [
    { label: "Products", menu: <SimpleResourcesMenu /> },
    { label: "Services", menu: <SimpleResourcesMenu /> },
    { label: "Pricing", href: "/pricing" },
    { label: "Resources", menu: <SimpleResourcesMenu /> },
    { label: "About", href: "/about" },
];

/**
 * Hero card mockup 05 — an eyebrow-led centred hero with two brand cards fanned across the
 * bottom edge of the section.
 */
export const HeroCardMockup05 = () => (
    <div className="bg-primary relative overflow-hidden">
        <BackgroundPattern pattern="grid" size="md" className="absolute -top-2 left-1/2 z-0 hidden max-w-none -translate-x-1/2 md:block" />
        <BackgroundPattern pattern="grid" size="sm" className="absolute top-0 left-1/2 z-0 max-w-none -translate-x-1/2 md:hidden" />

        <MarketingHeader items={navItems} />

        <section className="relative overflow-hidden py-16 md:pt-24 md:pb-0">
            <div className="max-w-container mx-auto w-full px-4 md:px-8">
                <div className="mx-auto flex max-w-3xl flex-col md:items-center md:text-center">
                    <span className="text-brand-secondary md:text-md text-sm font-semibold">Super. Simple. Banking.</span>
                    <h1 className="text-display-md text-primary md:text-display-lg lg:text-display-2xl mt-3 font-semibold">
                        Simple banking that works like magic.
                    </h1>
                    <p className="text-tertiary mt-4 max-w-3xl text-lg text-balance md:mt-6 md:text-xl">
                        Simple, transparent banking. No hidden fees and free overdrafts.
                    </p>

                    <div className="mt-8 flex w-full flex-col-reverse items-stretch gap-3 sm:w-auto sm:flex-row sm:items-start md:mt-12">
                        <Button size="xl" color="secondary" iconLeading={PlayCircle} href="/demo">
                            Demo
                        </Button>
                        <Button size="xl" href="/signup">
                            Sign up
                        </Button>
                    </div>
                </div>
            </div>

            <div className="max-w-container mx-auto mt-16 w-full md:px-8">
                <div className="flex h-53 items-center justify-center md:h-100 md:items-end">
                    <div className="flex">
                        <div className="[transform:scale(0.79)_translate(131px,11px)_rotate(30deg)] md:[transform:scale(1.77)_translate(12px,2px)_rotate(30deg)]">
                            <CreditCard type="brand-dark" company="Proper UI." cardHolder={AVATARS[1].name} />
                        </div>
                        <div className="[transform:scale(0.79)_translate(-98px,-1px)_rotate(30deg)] md:[transform:scale(1.77)_translate(5px,-11px)_rotate(30deg)]">
                            <CreditCard type="brand-dark" company="Proper UI." cardHolder={AVATARS[0].name} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
);
