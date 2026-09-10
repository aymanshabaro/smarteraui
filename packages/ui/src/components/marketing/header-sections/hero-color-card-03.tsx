import type { SVGProps } from "react";
import { Button } from "@/components/base/buttons/button";
import { Form } from "@/components/base/form/form";
import { Input } from "@/components/base/input/input";
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

const privacyHint = (
    <span className="text-tertiary_on-brand">
        We care about your data in our{" "}
        <a href="/privacy" className="outline-focus-ring rounded-xs underline underline-offset-3 focus-visible:outline-2 focus-visible:outline-offset-2">
            privacy policy
        </a>
        .
    </span>
);

/**
 * Centered hero inside a rounded brand-coloured card, with a framed dashboard mockup
 * overlapping the bottom edge of the card.
 */
export const HeroColorCard03 = () => (
    <div className="bg-secondary relative overflow-hidden">
        <MarketingHeader items={navItems} />

        <section className="relative overflow-hidden pb-16 md:pt-8 md:pb-24">
            <div className="absolute start-[-98px] top-1/2 hidden -translate-y-1/2 md:block">
                <TickField className="text-fg-brand-secondary w-48.5 opacity-30 md:w-74.5" />
            </div>
            <div className="absolute end-12 bottom-14 max-md:hidden">
                <TickField className="text-fg-brand-secondary w-48.5 opacity-30 md:w-74.5" />
            </div>

            <div className="max-w-container mx-auto md:px-8">
                <div className="bg-brand-section flex w-full flex-col items-center px-4 pt-16 pb-24 text-center md:rounded-3xl md:px-8 md:pt-24 md:pb-48">
                    <h1 className="text-display-md text-primary_on-brand md:text-display-lg lg:text-display-2xl max-w-3xl font-semibold">
                        Grow your users.
                        <br />
                        <span className="text-secondary_on-brand">Smarter.</span>
                    </h1>
                    <p className="text-tertiary_on-brand mt-4 max-w-3xl text-lg text-balance md:mt-6 md:text-xl">
                        Powerful, self-serve product and growth analytics to help you convert, engage, and retain more users.
                        <span className="max-md:hidden"> Trusted by over 4,000 startups.</span>
                    </p>

                    <Form className="mt-10 flex w-full flex-col items-stretch gap-4 md:mt-12 md:max-w-120 md:flex-row md:items-start">
                        <Input
                            isRequired
                            size="lg"
                            name="email"
                            type="email"
                            aria-label="Enter your email"
                            placeholder="Enter your email"
                            hint={privacyHint}
                            wrapperClassName="py-0.5 not-focus:ring-transparent"
                        />
                        <Button type="submit" size="xl">
                            Get started
                        </Button>
                    </Form>
                </div>

                <div className="relative mx-auto -mt-8 w-max max-w-full px-4 md:-mt-24 md:px-8">
                    <div className="relative rounded ring-6 ring-white/50 md:rounded-[10px] md:ring-8">
                        <div aria-hidden="true" className="md:shadow-3xl absolute inset-x-4 inset-y-0 h-full shadow-xl md:inset-x-7" />
                        <img
                            src={IMAGES.landscape[6].src}
                            alt="Proper dashboard mockup"
                            className="relative rounded object-cover md:rounded-[10px] lg:max-w-3xl"
                        />
                    </div>
                </div>
            </div>
        </section>
    </div>
);
