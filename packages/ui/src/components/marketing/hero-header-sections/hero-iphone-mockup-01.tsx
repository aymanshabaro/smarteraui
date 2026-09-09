import { BadgeGroup } from "@/components/base/badges/badge-groups";
import { AppStoreButton, GooglePlayButton } from "@/components/base/buttons/app-store-buttons";
import type { MarketingNavItemType } from "@/components/marketing/header-navigations/base-components/header";
import { MarketingHeader } from "@/components/marketing/header-navigations/base-components/header";
import { SimpleResourcesMenu } from "@/components/marketing/header-navigations/base-components/menus";
import { BackgroundPattern } from "@/components/shared-assets/background-patterns";
import { IPhoneMockup } from "@/components/shared-assets/mockups/iphone-mockup";
import { IMAGES } from "@/utils/demo-assets";

const navItems: MarketingNavItemType[] = [
    { label: "Products", menu: <SimpleResourcesMenu /> },
    { label: "Services", menu: <SimpleResourcesMenu /> },
    { label: "Pricing", href: "/pricing" },
    { label: "Resources", menu: <SimpleResourcesMenu /> },
    { label: "About", href: "/about" },
];

/**
 * Hero iPhone mockup 01 — announcement badge, headline and app-store buttons beside a
 * floating iPhone frame on a faint grid background.
 */
export const HeroIphoneMockup01 = () => (
    <div className="bg-primary relative overflow-hidden">
        <BackgroundPattern pattern="grid" size="md" className="absolute -top-2 left-1/2 z-0 hidden max-w-none -translate-x-1/2 md:block" />
        <BackgroundPattern pattern="grid" size="sm" className="absolute top-0 left-1/2 z-0 max-w-none -translate-x-1/2 md:hidden" />

        <MarketingHeader items={navItems} />

        <section className="relative overflow-hidden pt-16 md:py-24">
            <div className="max-w-container mx-auto flex flex-col gap-16 px-4 md:px-8 lg:flex-row lg:items-center lg:gap-16">
                <div className="flex w-full max-w-3xl flex-1 flex-col items-start">
                    <a href="/features" className="outline-focus-ring rounded-[10px] focus-visible:outline-2 focus-visible:outline-offset-2">
                        <BadgeGroup size="lg" color="brand" theme="modern" addonText="New feature" className="hidden md:flex">
                            Personalized coaching in-app
                        </BadgeGroup>
                        <BadgeGroup size="md" color="brand" theme="modern" addonText="New feature" className="md:hidden">
                            Personalized coaching in-app
                        </BadgeGroup>
                    </a>

                    <h1 className="text-display-md text-primary md:text-display-lg lg:text-display-xl mt-4 font-semibold">
                        Portfolio performance tracking made easy
                    </h1>
                    <p className="text-tertiary mt-4 text-lg text-balance md:mt-6 md:text-xl">
                        Designed by marketers. Smartera gives you the guidance, data and innovation you need to become a better marketer.
                    </p>

                    <div className="mt-8 flex gap-3 md:mt-12">
                        <AppStoreButton size="lg" href="/ios" />
                        <GooglePlayButton size="lg" href="/android" />
                    </div>
                </div>

                <div className="relative flex h-90 w-full items-start justify-center lg:h-160 lg:max-w-lg lg:items-center">
                    <div aria-hidden="true" className="bg-secondary absolute top-24 size-133 rounded-full lg:top-auto" />
                    <IPhoneMockup image={IMAGES.landscape[0].src} className="drop-shadow-iphone-mockup relative h-[579px] w-71 md:h-auto md:w-[313px]" />
                </div>
            </div>
        </section>
    </div>
);
