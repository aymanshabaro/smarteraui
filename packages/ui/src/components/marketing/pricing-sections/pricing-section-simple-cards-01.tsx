import type { FC } from "react";
import { Check, LayersThree01, LayersTwo01, Zap } from "@properui/icons";
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

/** The compact three-up plan grid: smaller display heading, round brand icons and a tinted action footer. */
export const PricingSectionSimpleCards01 = () => (
    <section className="bg-primary py-16 md:py-24">
        <div className="max-w-container mx-auto px-4 md:px-8">
            <div className="flex w-full max-w-3xl flex-col">
                <span className="text-brand-secondary md:text-md text-sm font-semibold">Pricing</span>
                <h2 className="text-display-sm text-primary md:text-display-md mt-3 font-semibold">Simple, transparent pricing</h2>
                <p className="text-tertiary mt-4 text-lg md:mt-5 md:text-xl">We believe Proper should be accessible to all companies, no matter the size.</p>
            </div>

            <div className="mt-12 grid w-full grid-cols-1 gap-4 md:mt-16 md:grid-cols-2 md:gap-8 xl:grid-cols-3">
                {plans.map((plan) => (
                    <div key={plan.name} className="bg-primary ring-secondary_alt flex flex-col overflow-hidden rounded-2xl shadow-lg ring-1">
                        <div className="flex flex-col items-center px-6 pt-6 text-center md:px-8 md:pt-8">
                            <FeaturedIcon size="lg" color="brand" theme="light" icon={plan.icon} />
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
    </section>
);
