import { CheckCircle } from "@properui/icons";
import { Badge } from "../../base/badges/badges";
import { Button } from "../../base/buttons/button";

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
        note: "Our most popular plan.",
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
        note: "Growing teams up to 20 users.",
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
        note: "Advanced features + unlimited users.",
        features: [
            "Advanced custom fields",
            "Audit log and data history",
            "Unlimited individual users",
            "Unlimited individual data",
            "Personalized + priority service",
        ],
    },
];

/** A header band with paired actions, overlapped by badge-labelled plan cards. */
export const PricingGrayBadge = () => (
    <section className="bg-primary">
        <div className="pt-16 pb-32 md:pt-24 md:pb-48">
            <div className="max-w-container mx-auto px-4 md:px-8">
                <div className="mx-auto flex w-full max-w-3xl flex-col items-center text-center">
                    <p className="text-brand-secondary md:text-md text-sm font-semibold">Pricing</p>
                    <h2 className="text-display-md text-primary md:text-display-lg mt-3 font-semibold">Simple, transparent pricing</h2>
                    <p className="text-tertiary mt-4 text-lg md:mt-6 md:text-xl">
                        We believe Proper UI should be accessible to all companies, no matter the size.
                    </p>

                    <div className="mt-8 flex flex-col-reverse gap-3 self-stretch sm:flex-row sm:self-center md:mt-12">
                        <Button size="xl" color="secondary">
                            Chat to sales
                        </Button>
                        <Button size="xl">Get started</Button>
                    </div>
                </div>
            </div>
        </div>

        <div className="max-w-container m-auto -mt-16 px-4 pb-16 md:-mt-24 md:px-8 md:pb-24">
            <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 md:gap-8 xl:grid-cols-3">
                {plans.map((plan) => (
                    <div key={plan.name} className="bg-primary ring-secondary_alt flex flex-col overflow-hidden rounded-2xl shadow-lg ring-1">
                        <div className="flex flex-col items-center px-6 pt-6 pb-8 text-center md:px-8 md:pt-10">
                            <Badge size="lg" color="brand">
                                {plan.name}
                            </Badge>
                            <p className="text-display-md text-primary md:text-display-lg mt-4 font-semibold">{plan.price}</p>
                            <p className="text-md text-tertiary mt-2">{plan.note}</p>

                            <div className="mt-6 flex flex-col gap-3 self-stretch md:mt-4">
                                <Button size="xl">Get started</Button>
                                <Button size="xl" color="secondary">
                                    Chat to sales
                                </Button>
                            </div>
                        </div>

                        <div className="bg-border-secondary mx-6 h-px md:mx-8" />

                        <ul className="flex flex-col gap-4 px-6 pt-8 pb-10 md:px-8">
                            {plan.features.map((feature) => (
                                <li key={feature} className="flex gap-3">
                                    <CheckCircle className="text-fg-success-primary size-6 shrink-0" />
                                    <span className="text-tertiary text-md">{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    </section>
);
