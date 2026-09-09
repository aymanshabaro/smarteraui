import type { ReactNode } from "react";
import { CheckCircle } from "@smarteraui/icons";
import { Badge } from "@/components/base/badges/badges";
import { Button } from "@/components/base/buttons/button";

interface Plan {
    name: string;
    price: string;
    note: string;
    isPopular?: boolean;
    /** Copy above the feature list — the bold fragment names the plan this one builds on. */
    inherits: ReactNode;
}

const features = [
    "Access to basic features",
    "Basic reporting and analytics",
    "Up to 10 individual users",
    "20 GB individual data",
    "Basic chat and email support",
];

const plans: Plan[] = [
    {
        name: "Basic plan",
        price: "$10",
        note: "Basic features for up to 10 users.",
        isPopular: true,
        inherits: (
            <>
                Everything in <span className="text-md font-semibold">Starter</span> plus....
            </>
        ),
    },
    {
        name: "Business plan",
        price: "$20",
        note: "Advanced features and reporting.",
        inherits: (
            <>
                Everything in <span className="text-md font-semibold">Basic</span> plus....
            </>
        ),
    },
    {
        name: "Enterprise plan",
        price: "$40",
        note: "Unlimited features.",
        inherits: (
            <>
                Everything in <span className="text-md font-semibold">Business</span> plus....
            </>
        ),
    },
];

/** Three plan cards whose paired actions sit above a bordered feature panel. */
export const PricingSectionSimpleCards03 = () => (
    <section className="bg-primary py-16 md:py-24">
        <div className="max-w-container mx-auto px-4 md:px-8">
            <div className="mx-auto flex w-full max-w-3xl flex-col items-center text-center">
                <span className="text-brand-secondary md:text-md text-sm font-semibold">Pricing</span>
                <h2 className="text-display-sm text-primary md:text-display-md mt-3 font-semibold">Plans that fit your scale</h2>
                <p className="text-tertiary mt-4 text-lg md:mt-5 md:text-xl">Simple, transparent pricing that grows with you. Try any plan free for 30 days.</p>
            </div>

            <div className="mt-12 grid w-full grid-cols-1 gap-4 md:mt-16 md:grid-cols-2 md:gap-8 xl:grid-cols-3">
                {plans.map((plan) => (
                    <div key={plan.name} className="bg-primary ring-secondary_alt flex flex-col overflow-hidden rounded-2xl shadow-lg ring-1">
                        <div className="flex flex-col p-6 pb-8 md:p-8">
                            <div className="flex justify-between">
                                <h3 className="text-tertiary text-lg font-semibold">{plan.name}</h3>
                                {plan.isPopular && (
                                    <Badge size="lg" color="brand">
                                        Popular
                                    </Badge>
                                )}
                            </div>

                            <div className="mt-4 flex items-end gap-1">
                                <p className="text-display-lg text-primary md:text-display-xl font-semibold">{plan.price}</p>
                                <span className="text-md text-tertiary pb-2 font-medium">per month</span>
                            </div>

                            <p className="text-md text-tertiary mt-4">{plan.note}</p>

                            <div className="mt-8 flex flex-col gap-3 self-stretch">
                                <Button size="xl">Get started</Button>
                                <Button size="xl" color="secondary">
                                    Chat to sales
                                </Button>
                            </div>
                        </div>

                        <div className="ring-secondary flex flex-col gap-6 px-6 pt-8 pb-10 ring-1 md:px-8">
                            <div>
                                <p className="text-md text-primary font-semibold uppercase">Features</p>
                                <p className="text-md text-tertiary mt-1">{plan.inherits}</p>
                            </div>

                            <ul className="flex flex-col gap-4">
                                {features.map((feature) => (
                                    <li key={feature} className="flex gap-3">
                                        <CheckCircle className="text-fg-brand-primary size-6 shrink-0" />
                                        <span className="text-tertiary text-md">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </section>
);
