import { Check } from "@properui/icons";
import { Button } from "@/components/base/buttons/button";

interface Plan {
    name: string;
    price: string;
    note: string;
    features: string[];
}

const plans: Plan[] = [
    {
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

/** Flat brand-tinted plan panels — price first, then the plan name and a solid check list. */
export const PricingPrimaryCardSimple = () => (
    <section className="bg-primary py-16 md:py-24">
        <div className="max-w-container mx-auto px-4 md:px-8">
            <div className="flex w-full max-w-3xl flex-col">
                <p className="text-brand-secondary md:text-md text-sm font-semibold">Pricing</p>
                <h2 className="text-display-md text-primary md:text-display-lg mt-3 font-semibold">Simple, transparent pricing</h2>
                <p className="text-tertiary mt-4 text-lg md:mt-6 md:text-xl">We believe Proper UI should be accessible to all companies, no matter the size.</p>
            </div>

            <div className="mt-16 grid w-full grid-cols-1 gap-4 md:mt-24 md:grid-cols-2 md:gap-8 xl:grid-cols-3">
                {plans.map((plan) => (
                    <div key={plan.name} className="bg-brand-primary_alt">
                        <div className="flex flex-col items-center px-6 pt-10 text-center md:px-8 md:pt-10">
                            <p className="text-display-md text-brand-primary md:text-display-lg font-semibold">{plan.price}</p>
                            <h3 className="text-brand-primary mt-4 text-xl font-semibold">{plan.name}</h3>
                            <p className="text-md text-brand-secondary mt-1">{plan.note}</p>
                        </div>

                        <ul className="flex flex-col gap-4 px-6 py-8 md:px-8 md:pb-10">
                            {plan.features.map((feature) => (
                                <li key={feature} className="flex gap-3">
                                    <div className="bg-brand-solid flex size-6 shrink-0 items-center justify-center rounded-full text-white">
                                        <Check className="size-3.5" />
                                    </div>
                                    <span className="text-md text-brand-secondary">{feature}</span>
                                </li>
                            ))}
                        </ul>

                        <div className="flex flex-col gap-3 px-6 pb-8 md:px-8">
                            <Button size="xl">Get started</Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </section>
);
