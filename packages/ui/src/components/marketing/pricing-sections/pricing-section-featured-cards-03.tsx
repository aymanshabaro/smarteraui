import type { FC } from "react";
import { CheckCircle, LayersTwo01, Zap } from "@smarteraui/icons";
import { Button } from "@/components/base/buttons/button";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";

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
            "Access to basic features",
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
        features: ["200+ integrations", "Advanced reporting", "Up to 20 individual users", "40 GB individual data", "Priority chat and email support"],
    },
];

/** A left copy column beside two tinted cards whose modern featured icon straddles the top edge. */
export const PricingSectionFeaturedCards03 = () => (
    <section className="bg-primary py-16 md:py-24">
        <div className="max-w-container mx-auto px-4 md:px-8">
            <div className="flex flex-col gap-16 xl:flex-row">
                <div className="w-full max-w-3xl xl:max-w-md">
                    <span className="text-brand-secondary md:text-md block text-sm font-semibold">Upgrade</span>
                    <h2 className="text-display-sm text-primary md:text-display-md mt-3 hidden font-semibold md:flex">Pricing plans that scale</h2>
                    <h2 className="text-display-sm text-primary md:text-display-md mt-3 flex font-semibold md:hidden">Pricing plans that scale with you</h2>
                    <p className="text-tertiary mt-4 text-lg md:mt-5">Simple, transparent pricing that grows with you. Try any plan free for 30 days.</p>
                </div>

                <div className="grid w-full grid-cols-1 items-start gap-12 md:-ml-2 md:grid-cols-2 md:gap-8">
                    {plans.map((plan) => (
                        <div key={plan.name} className="bg-secondary relative flex flex-col rounded-2xl">
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                <FeaturedIcon size="lg" color="gray" theme="modern" icon={plan.icon} />
                            </div>

                            <div className="flex flex-col items-center px-6 pt-12 text-center md:px-8">
                                <h3 className="text-primary text-xl font-semibold">{plan.name}</h3>
                                <p className="text-display-md text-primary md:text-display-lg mt-2 font-semibold">{plan.price}</p>
                                <p className="text-md text-tertiary mt-2">{plan.note}</p>
                            </div>

                            <ul className="flex flex-col gap-4 px-6 py-8 md:px-8 md:pt-8 md:pb-10">
                                {plan.features.map((feature) => (
                                    <li key={feature} className="flex gap-3">
                                        <CheckCircle className="text-fg-brand-primary size-6 shrink-0" />
                                        <span className="text-tertiary text-md">{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <div className="mt-auto flex flex-col gap-3 px-6 pb-8 md:px-8">
                                <Button size="xl">Get started</Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </section>
);
