"use client";

import type { CSSProperties, FC } from "react";
import { Check, LayersThree01, LayersTwo01, Zap } from "@properui/icons";
import { Badge } from "../../base/badges/badges";
import { Button } from "../../base/buttons/button";
import { Toggle } from "../../base/toggle/toggle";
import { FeaturedIcon } from "../../foundations/featured-icon/featured-icon";

interface Plan {
    icon: FC<{ className?: string }>;
    name: string;
    price: string;
    note: string;
    features: string[];
}

const plans: Plan[] = [
    {
        icon: Zap,
        name: "Basic plan",
        price: "$10/mth",
        note: "Billed annually.",
        features: [
            "Access to all basic features",
            "Basic reporting and analytics",
            "Up to 10 individual users",
            "20 GB individual data",
            "Basic chat and email support",
        ],
    },
    {
        icon: LayersTwo01,
        name: "Business plan",
        price: "$20/mth",
        note: "Billed annually.",
        features: [
            "200+ integrations",
            "Advanced reporting and analytics",
            "Up to 20 individual users",
            "40 GB individual data",
            "Priority chat and email support",
        ],
    },
    {
        icon: LayersThree01,
        name: "Enterprise plan",
        price: "$40/mth",
        note: "Billed annually.",
        features: [
            "Advanced custom fields",
            "Audit log and data history",
            "Unlimited individual users",
            "Unlimited individual data",
            "Personalized + priority service",
        ],
    },
];

/**
 * Named grid lines for the skewed stripe band. Tailwind cannot express custom line names,
 * so the template stays an inline style.
 *
 * TODO(orchestrator): candidate for `shared-assets/background-patterns` — the same band is
 * inlined in `marketing/hero-header-sections/hero-abstract-angles-0*.tsx`.
 */
const stripeGrid: CSSProperties = {
    gridTemplateRows: "repeat(3, var(--stripe-height))",
    gridTemplateColumns:
        "[viewport-start] 1fr [left-gutter-start] repeat(var(--gutter-columns), var(--column-width)) [left-gutter-end content-start] repeat(var(--content-columns), var(--column-width)) [content-end right-gutter-start] repeat(var(--gutter-columns), var(--column-width)) [right-gutter-end] 1fr [viewport-end]",
};

const stripes: { area: string; className: string }[] = [
    { area: "2 / left-gutter-start / auto / span 5", className: "bg-utility-brand-100_alt" },
    { area: "3 / viewport-start / auto / span 4", className: "bg-utility-brand-400_alt" },
    { area: "1 / span 7 / auto / viewport-end", className: "bg-utility-brand-400_alt" },
    { area: "2 / span 8 / auto / right-gutter-end", className: "bg-utility-brand-200_alt" },
    { area: "3 / span 3 / auto / viewport-end", className: "bg-utility-brand-100_alt" },
];

/** The skewed band of brand-tinted stripes running behind the plan grid. */
const AngledStripes = () => (
    <div aria-hidden="true" className="absolute top-0 h-108 w-full overflow-hidden pt-[152px] md:pt-[94px] 2xl:h-128 2xl:pt-[136px]">
        <div className="-skew-y-[7deg] [--column-width:minmax(0,calc(1280px/var(--content-columns)))] [--content-columns:12] [--gutter-columns:4] [--stripe-height:34px] sm:[--stripe-height:48px] lg:[--stripe-height:72px]">
            <div className="bg-utility-brand-50_alt absolute bottom-[var(--stripe-height)] h-110 w-full" />
            <div className="relative grid h-full" style={stripeGrid}>
                {stripes.map((stripe) => (
                    <div key={stripe.area} style={{ gridArea: stripe.area }} className={stripe.className} />
                ))}
            </div>
        </div>
    </div>
);

/** A tinted brand header with an annual-billing switch, over plan cards on a skewed stripe band. */
export const PricingAbstractAngles = () => (
    <section className="bg-primary">
        <div className="bg-utility-brand-50_alt pt-16 md:pt-24">
            <div className="max-w-container mx-auto px-4 md:px-8">
                <div className="mx-auto flex w-full max-w-3xl flex-col items-center text-center">
                    <Badge size="lg" color="brand" className="hidden bg-transparent md:flex">
                        Pricing plans
                    </Badge>
                    <Badge size="md" color="brand" className="bg-transparent md:hidden">
                        Pricing plans
                    </Badge>

                    <h2 className="text-display-md text-brand-primary md:text-display-lg mt-4 font-semibold">Plans for all sizes</h2>
                    <p className="text-brand-secondary mt-4 text-lg md:mt-6 md:text-xl">
                        Simple, transparent pricing that grows with you. Try any plan free for 30 days.
                    </p>

                    <div className="mt-8 flex md:mt-12">
                        <div className="relative z-10 inline-flex gap-3">
                            <Toggle size="md" id="annual-pricing" />
                            <label htmlFor="annual-pricing" className="text-md text-brand-primary font-medium select-none">
                                Annual pricing <span className="text-brand-secondary">(save 20%)</span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className="relative py-16 md:py-24">
            <AngledStripes />

            <div className="max-w-container relative mx-auto px-4 md:px-8">
                <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 md:gap-8 xl:grid-cols-3">
                    {plans.map((plan) => (
                        <div key={plan.name} className="bg-primary ring-secondary_alt flex flex-col overflow-hidden rounded-2xl shadow-lg ring-1">
                            <div className="flex flex-col items-center px-6 pt-6 text-center md:px-8 md:pt-8">
                                <FeaturedIcon size="lg" color="gray" theme="modern" icon={plan.icon} />
                                <h3 className="text-brand-secondary mt-4 text-xl font-semibold">{plan.name}</h3>
                                <p className="text-display-md text-primary md:text-display-lg mt-2 font-semibold">{plan.price}</p>
                                <p className="text-md text-tertiary mt-2">{plan.note}</p>
                            </div>

                            <ul className="flex flex-col gap-4 px-6 pt-8 pb-6 md:p-8 md:pb-10">
                                {plan.features.map((feature) => (
                                    <li key={feature} className="flex gap-3">
                                        <div className="bg-brand-primary text-featured-icon-light-fg-brand flex size-6 shrink-0 items-center justify-center rounded-full">
                                            <Check className="size-3.5" />
                                        </div>
                                        <span className="text-tertiary text-md">{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <div className="border-secondary bg-secondary mt-auto flex flex-col gap-3 rounded-b-2xl border-t px-6 pt-6 pb-8 md:p-8">
                                <Button size="xl">Get started</Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </section>
);
