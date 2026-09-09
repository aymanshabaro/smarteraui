"use client";

import { ArrowRight, Code01, Image01, Keyboard01, Moon01, Package, Palette, SwitchHorizontal01, Terminal, Type01 } from "@smarteraui/icons";
import { Button } from "@smarteraui/ui/components/base/buttons/button";
import { FeaturedIcon } from "@smarteraui/ui/components/foundations/featured-icon/featured-icon";

/**
 * Features grid.
 *
 * Copied from `marketing/features-sections/features-simple-icons-03` — the eyebrow/heading
 * block, the responsive icon grid and the per-item link button are that section's. Only the
 * copy and the link targets are ours, and every target is a real page on this site.
 */

const features = [
    {
        title: "Accessible because of React Aria",
        subtitle:
            "Every interactive primitive is a React Aria Component, so focus management, keyboard navigation and ARIA come from Adobe's implementation rather than ours.",
        icon: Keyboard01,
        cta: "Introduction",
        href: "/docs/introduction",
    },
    {
        title: "Tailwind v4 semantic tokens",
        subtitle:
            "Components only ever name semantic tokens — bg-primary, text-tertiary, bg-brand-solid. The palette lives in one @theme block, so restyling never means touching a component.",
        icon: Palette,
        cta: "Theming guide",
        href: "/docs/theming",
    },
    {
        title: "One typographic scale",
        subtitle:
            "Display and body sizes are tokens too — text-display-lg, text-md — so a heading in a marketing hero and a heading in a dashboard sit on the same scale.",
        icon: Type01,
        cta: "Typography guide",
        href: "/docs/typography",
    },
    {
        title: "Dark mode without a second design",
        subtitle:
            "A .dark-mode class on the html element repoints every token. There is no parallel set of dark: utilities to maintain, and no component that only looks right in one mode.",
        icon: Moon01,
        cta: "Dark mode guide",
        href: "/docs/dark-mode",
    },
    {
        title: "Right-to-left from the start",
        subtitle:
            "Spacing, borders and icon direction use logical properties — ps, me, start, end — so an RTL locale is a dir attribute, not a stylesheet fork.",
        icon: SwitchHorizontal01,
        cta: "RTL guide",
        href: "/docs/rtl",
    },
    {
        title: "TypeScript, strict",
        subtitle:
            "The whole library type-checks under strict mode and ships its own types. Props are the reference API, documented inline, so your editor answers most questions before the docs do.",
        icon: Code01,
        cta: "Installation",
        href: "/docs/installation",
    },
    {
        title: "A CLI that copies code in",
        subtitle:
            "npx smarteraui@latest add <component> writes the .tsx into your project and installs what it needs. No wrapper package to fight when a design decision has to change — you own the file.",
        icon: Terminal,
        cta: "CLI reference",
        href: "/docs/cli",
    },
    {
        title: "Tree-shakeable source",
        subtitle:
            "The package ships as ES modules of plain TSX with per-component entry points, so a bundler only ever keeps the components you actually imported.",
        icon: Package,
        cta: "Browse components",
        href: "/components",
    },
    {
        title: "Assets in the box",
        subtitle:
            "Line icons, avatars, flags, illustrations and background patterns ship alongside the components, so a pasted example renders complete instead of full of broken images.",
        icon: Image01,
        cta: "Icons and assets",
        href: "/docs/icons",
    },
];

export const LandingFeatures = () => (
    <section aria-labelledby="what-you-get" className="bg-secondary py-16 md:py-24">
        <div className="max-w-container mx-auto w-full px-4 md:px-8">
            <div className="flex w-full max-w-3xl flex-col">
                <span className="text-brand-secondary md:text-md text-sm font-semibold">Why Smartera UI</span>
                <h2 id="what-you-get" className="text-display-sm text-primary md:text-display-md mt-3 font-semibold">
                    The boring parts, already handled
                </h2>
                <p className="text-tertiary mt-4 text-lg md:mt-5 md:text-xl">
                    Accessibility, theming, dark mode and text direction are decisions a design system should only make once. Smartera UI makes them at the
                    token layer so your product code never has to.
                </p>
            </div>

            <div className="mt-12 md:mt-16">
                <ul className="grid w-full grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 md:gap-y-16 lg:grid-cols-3">
                    {features.map((feature) => (
                        <li key={feature.title}>
                            <div className="flex max-w-sm flex-col gap-4">
                                <FeaturedIcon icon={feature.icon} size="lg" color="gray" theme="modern" className="hidden md:inline-flex" />
                                <FeaturedIcon icon={feature.icon} size="md" color="gray" theme="modern" className="inline-flex md:hidden" />
                                <div>
                                    <h3 className="text-primary text-lg font-semibold">{feature.title}</h3>
                                    <p className="text-md text-tertiary mt-1">{feature.subtitle}</p>
                                </div>
                                <Button color="link-color" size="lg" href={feature.href} iconTrailing={<ArrowRight />}>
                                    {feature.cta}
                                </Button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    </section>
);
