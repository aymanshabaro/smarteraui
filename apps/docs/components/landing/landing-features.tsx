"use client";

import { ArrowRight, Code01, Image01, Keyboard01, LayoutAlt01, Moon01, Palette, SwitchHorizontal01, Terminal, Type01 } from "@properui/icons";
import { Button } from "@properui/ui/components/base/buttons/button";
import { FeaturedIcon } from "@properui/ui/components/foundations/featured-icon/featured-icon";

/**
 * Features grid.
 *
 * Copied from `marketing/features-sections/features-simple-icons-03` — the eyebrow/heading
 * block, the responsive icon grid and the per-item link button are that section's. Only the
 * copy and the link targets are ours, and every target is a real page on this site.
 *
 * Each entry names a property of the library that narrows what an assistant can get wrong.
 */

const features = [
    {
        title: "A closed vocabulary, not infinite Tailwind",
        subtitle:
            "Left to itself a model reaches for bg-[#7f56d9] and p-[13px]. Components here only ever name semantic tokens — bg-primary, text-tertiary, bg-brand-solid — so generated markup lands on the system instead of near it.",
        icon: Palette,
        cta: "Theming guide",
        href: "/docs/theming",
    },
    {
        title: "Accessibility the model never had to know",
        subtitle:
            "Every interactive primitive is a React Aria Component, so focus management, keyboard navigation and ARIA come from Adobe's implementation. Generated code inherits them whether or not the prompt mentioned them.",
        icon: Keyboard01,
        cta: "Introduction",
        href: "/docs/introduction",
    },
    {
        title: "A wrong prop fails the build",
        subtitle:
            "The library type-checks under strict mode and ships its own types, so a hallucinated prop or a mistyped variant is a compile error your agent can read and fix — not a silent runtime shrug.",
        icon: Code01,
        cta: "Installation",
        href: "/docs/installation",
    },
    {
        title: "The agent edits files you own",
        subtitle:
            "npx @properui/cli@latest add <component> writes plain .tsx into your project. There is no opaque wrapper between the generated code and the thing on screen, so a review is just reading a diff.",
        icon: Terminal,
        cta: "CLI reference",
        href: "/docs/cli",
    },
    {
        title: "Dark mode without a second pass",
        subtitle:
            "A .dark-mode class on the html element repoints every token. No dark: utilities for a model to forget on half the elements, and no component that only looks right in one mode.",
        icon: Moon01,
        cta: "Dark mode guide",
        href: "/docs/dark-mode",
    },
    {
        title: "Right-to-left without a rewrite",
        subtitle:
            "Spacing, borders and icon direction use logical properties — ps, me, start, end. An RTL locale becomes a dir attribute rather than a second stylesheet nobody prompted for.",
        icon: SwitchHorizontal01,
        cta: "RTL guide",
        href: "/docs/rtl",
    },
    {
        title: "Variants to compose from, not invent",
        subtitle:
            "Marketing sections, dashboards, settings and auth screens ship as named variants. Ask for a pricing page and the answer is an existing file, not 300 lines of freshly imagined layout.",
        icon: LayoutAlt01,
        cta: "Browse components",
        href: "/components",
    },
    {
        title: "One typographic scale",
        subtitle:
            "Display and body sizes are tokens too — text-display-lg, text-md — so a heading generated into a marketing hero and one generated into a dashboard sit on the same scale.",
        icon: Type01,
        cta: "Typography guide",
        href: "/docs/typography",
    },
    {
        title: "Assets in the box",
        subtitle:
            "Line icons, avatars, flags, illustrations and background patterns ship alongside the components, so a generated screen renders complete instead of full of broken image placeholders.",
        icon: Image01,
        cta: "Icons and assets",
        href: "/docs/icons",
    },
];

export const LandingFeatures = () => (
    <section aria-labelledby="what-you-get" className="bg-secondary py-16 md:py-24">
        <div className="max-w-container mx-auto w-full px-4 md:px-8">
            <div className="flex w-full max-w-3xl flex-col">
                <span className="text-brand-secondary md:text-md text-sm font-semibold">Built for AI code generation</span>
                <h2 id="what-you-get" className="text-display-sm text-primary md:text-display-md mt-3 font-semibold">
                    Fewer ways for a model to go wrong
                </h2>
                <p className="text-tertiary mt-4 text-lg md:mt-5 md:text-xl">
                    Accessibility, theming, dark mode and text direction are decisions a design system should only make once. Making them at the token layer is
                    what keeps a generated screen on-system — there is simply less for the model to get wrong.
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
