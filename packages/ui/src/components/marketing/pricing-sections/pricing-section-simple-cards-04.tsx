import type { ReactNode } from "react";
import { Check } from "@smarteraui/icons";
import { Badge } from "@/components/base/badges/badges";
import { Button } from "@/components/base/buttons/button";

interface Plan {
    name: string;
    description: string;
    price: string;
    isPopular?: boolean;
    /** Copy above the feature grid — the bold fragment names the plan this one builds on. */
    inherits: ReactNode;
    features: string[];
}

const plans: Plan[] = [
    {
        name: "Basic plan",
        description: "Our most popular plan for small teams.",
        price: "10",
        inherits: (
            <>
                Everything in our <span className="text-md font-semibold">free plan</span> plus....
            </>
        ),
        features: [
            "Access to basic features",
            "Basic reporting + analytics",
            "Up to 10 individual users",
            "20 GB individual data",
            "Basic chat support",
            "Attend events",
            "Automatic updates",
            "Backup your account",
            "Audit log and notes",
            "Feature requests",
        ],
    },
    {
        name: "Business plan",
        description: "Advanced features and reporting.",
        price: "20",
        isPopular: true,
        inherits: (
            <>
                Everything in our <span className="text-md font-semibold">basic plan</span> plus....
            </>
        ),
        features: [
            "200+ integrations",
            "Advanced reporting",
            "Up to 20 individual users",
            "40 GB individual data",
            "Priority chat support",
            "Advanced custom fields",
            "Audit log and data history",
            "Backup your account",
            "Personalized service",
            "+ many more...",
        ],
    },
];

/** Two wide plan cards, centered heading, features laid out in two check columns. */
export const PricingSectionSimpleCards04 = () => (
    <section className="bg-primary py-16 md:py-24">
        <div className="max-w-container mx-auto px-4 md:px-8">
            <div className="mx-auto flex w-full max-w-3xl flex-col items-center text-center">
                <span className="text-brand-secondary md:text-md text-sm font-semibold">Pricing</span>
                <h2 className="text-display-sm text-primary md:text-display-md mt-3 font-semibold">Plans that fit your scale</h2>
                <p className="text-tertiary mt-4 text-lg md:mt-5 md:text-xl">Simple, transparent pricing that grows with you. Try any plan free for 30 days.</p>
            </div>

            <div className="mx-auto mt-12 grid w-full max-w-xl grid-cols-1 gap-4 md:mt-16 md:gap-8 xl:max-w-none xl:grid-cols-2">
                {plans.map((plan) => (
                    <div key={plan.name} className="bg-primary ring-secondary_alt flex flex-col overflow-hidden rounded-2xl shadow-lg ring-1">
                        <div className="flex flex-col-reverse gap-4 px-6 pt-6 pb-8 md:flex-row md:justify-between md:gap-8 md:px-8 md:pt-8 md:pb-6">
                            <div className="flex flex-col gap-1">
                                <div className="flex items-center gap-2">
                                    <h3 className="text-primary text-xl font-semibold">{plan.name}</h3>
                                    {plan.isPopular && <Badge color="brand">Popular</Badge>}
                                </div>
                                <p className="text-md text-tertiary">{plan.description}</p>
                            </div>

                            <div className="flex items-baseline gap-1">
                                <span className="text-display-md text-primary -translate-y-[5px] font-semibold md:-translate-y-[15px]">$</span>
                                <span className="text-display-lg text-primary md:text-display-xl font-semibold">{plan.price}</span>
                                <span className="text-md text-tertiary font-medium">per month</span>
                            </div>
                        </div>

                        <div className="border-secondary flex flex-col gap-6 border-t px-6 py-8 md:px-8 md:pt-8 md:pb-10">
                            <div className="flex flex-col gap-1">
                                <p className="text-md text-primary font-semibold">FEATURES</p>
                                <p className="text-md text-tertiary">{plan.inherits}</p>
                            </div>

                            <ul className="grid grid-cols-1 gap-x-8 gap-y-4 md:grid-cols-2">
                                {plan.features.map((feature) => (
                                    <li key={feature} className="flex gap-3">
                                        <div className="bg-success-secondary text-featured-icon-light-fg-success flex size-6 shrink-0 items-center justify-center rounded-full">
                                            <Check className="size-3.5" />
                                        </div>
                                        <span className="text-tertiary text-md">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="border-secondary mt-auto flex flex-col gap-3 border-t px-6 pt-6 pb-8 md:p-8">
                            <Button size="xl">Get started</Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </section>
);
