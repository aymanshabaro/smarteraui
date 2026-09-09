"use client";

import { Fragment } from "react";
import { CheckCircle, HelpCircle, Minus } from "@smarteraui/icons";
import { Tab, TabList, TabPanel, Tabs } from "@/components/application/tabs/tabs";
import { Badge } from "@/components/base/badges/badges";
import { Button } from "@/components/base/buttons/button";
import { Tooltip, TooltipTrigger } from "@/components/base/tooltip/tooltip";
import { cx } from "@/utils/cx";

interface Plan {
    name: string;
    price: string;
    description: string;
    isPopular?: boolean;
}

/** `true`/`false` render as an included/excluded marker, a string renders as the plan's allowance. */
type FeatureValue = boolean | string;

interface Feature {
    name: string;
    hint: string;
    values: [FeatureValue, FeatureValue, FeatureValue];
}

const plans: Plan[] = [
    { name: "Basic", price: "10", description: "Basic features for up to 10 employees with everything you need.", isPopular: true },
    { name: "Business", price: "20", description: "Advanced features and reporting, better workflows and automation." },
    { name: "Enterprise", price: "40", description: "Personalized service and enterprise security for large teams." },
];

const groups: { title: string; features: Feature[] }[] = [
    {
        title: "Overview",
        features: [
            { name: "Basic features", hint: "Everything you need to get your team started.", values: [true, true, true] },
            { name: "Users", hint: "The number of seats included in the plan.", values: ["10", "20", "Unlimited"] },
            { name: "Individual data", hint: "Storage available to each member of your team.", values: ["20 GB", "40 GB", "Unlimited"] },
            { name: "Support", hint: "Chat and email support from our team.", values: [true, true, true] },
            { name: "Automated workflows", hint: "Trigger actions automatically when your data changes.", values: [false, true, true] },
            { name: "200+ integrations", hint: "Connect Smartera to the tools your team already uses.", values: [false, true, true] },
        ],
    },
    {
        title: "Reporting and analytics",
        features: [
            { name: "Analytics", hint: "Dashboards covering usage, activity and performance.", values: ["Basic", "Advanced", "Advanced"] },
            { name: "Export reports", hint: "Download any report as CSV or PDF.", values: [true, true, true] },
            { name: "Scheduled reports", hint: "Send reports to your inbox on a recurring schedule.", values: [true, true, true] },
            { name: "API Access", hint: "Query your data programmatically through our REST API.", values: [false, true, true] },
            { name: "Advanced reports", hint: "Build multi-source reports with custom breakdowns.", values: [false, true, true] },
            { name: "Saved reports", hint: "Keep report configurations for your whole team.", values: [false, true, true] },
            { name: "Customer properties", hint: "Store custom attributes against every customer record.", values: [false, false, true] },
            { name: "Custom fields", hint: "Model your own data with bespoke fields.", values: [false, false, true] },
        ],
    },
    {
        title: "User access",
        features: [
            { name: "SSO/SAML authentication", hint: "Let your team sign in with your identity provider.", values: [true, true, true] },
            { name: "Advanced permissions", hint: "Fine-grained roles for every part of the product.", values: [false, true, true] },
            { name: "Audit log", hint: "A record of every change made in your workspace.", values: [false, false, true] },
            { name: "Data history", hint: "Restore any record to an earlier point in time.", values: [false, false, true] },
        ],
    },
];

/** Tuple lookup helper — `values` always has one entry per plan, but the index signature is not literal. */
const valueFor = (feature: Feature, planIndex: number): FeatureValue => feature.values[planIndex] ?? false;

const FeatureHint = ({ feature }: { feature: Feature }) => (
    <Tooltip title={feature.hint}>
        <TooltipTrigger
            aria-label={`More information about ${feature.name}`}
            className="text-fg-quaternary hover:text-fg-quaternary_hover focus:text-fg-quaternary_hover cursor-pointer transition duration-100"
        >
            <HelpCircle className="ml-1 inline-block size-4" />
        </TooltipTrigger>
    </Tooltip>
);

/** Mobile cell: the value for one feature within a single plan's stacked table. */
const MobileValue = ({ value }: { value: FeatureValue }) => {
    if (typeof value === "string") {
        return <span className="text-tertiary block text-sm">{value}</span>;
    }

    return value ? (
        <>
            <CheckCircle className="text-fg-success-primary -my-1 size-6" />
            <span className="sr-only">Yes</span>
        </>
    ) : (
        <>
            <Minus className="text-fg-quaternary ml-auto size-5" />
            <span className="sr-only">No</span>
        </>
    );
};

/** Desktop cell: the value for one feature within one plan column of the comparison table. */
const DesktopValue = ({ value, planName }: { value: FeatureValue; planName: string }) => {
    if (typeof value === "string") {
        return <span className="text-tertiary block text-sm">{value}</span>;
    }

    return value ? (
        <>
            <CheckCircle className="text-fg-success-primary size-6" />
            <span className="sr-only">Included in {planName}</span>
        </>
    ) : (
        <>
            <Minus className="text-fg-quaternary mx-auto size-5" />
            <span className="sr-only">Not included in {planName}</span>
        </>
    );
};

/** A full plan comparison table — stacked per plan on small screens, one wide grid from `lg`. */
export const PricingLargeTable01 = () => (
    <section className="bg-primary">
        <div className="max-w-container mx-auto px-4 py-16 md:px-8 md:py-24">
            <div className="mx-auto flex w-full max-w-3xl flex-col items-center text-center">
                <span className="text-brand-secondary md:text-md text-sm font-semibold">Pricing</span>
                <h2 className="text-display-md text-primary md:text-display-lg mt-3 font-semibold">Compare our plans and find yours</h2>
                <p className="text-tertiary mt-4 text-lg md:mt-6 md:text-xl">Simple, transparent pricing that grows with you. Try any plan free for 30 days.</p>

                <Tabs defaultSelectedKey="monthly" className="w-full md:w-auto">
                    <TabList type="button-border" size="md" aria-label="Billing period" className="mt-8 w-full md:mt-12 md:w-auto [&_[role=tab]]:flex-1">
                        <Tab id="monthly" label="Monthly billing" />
                        <Tab id="annually" label="Annual billing" />
                    </TabList>

                    {/* The comparison table lives below the switch, so the panels only exist to satisfy the tabs' `aria-controls`. */}
                    <TabPanel id="monthly" />
                    <TabPanel id="annually" />
                </Tabs>
            </div>
        </div>

        <div className="lg:max-w-container w-full pb-16 md:px-8 md:pb-24 lg:mx-auto">
            {/* Stacked view: one table per plan. */}
            <div className="space-y-16 lg:hidden">
                {plans.map((plan, planIndex) => (
                    <section key={plan.name}>
                        <div className="mb-8 flex flex-col px-4">
                            <h3 className="text-primary flex items-center gap-2 text-xl font-semibold">
                                {plan.name}
                                {plan.isPopular && <Badge color="brand">Popular</Badge>}
                            </h3>
                            <p className="mt-4">
                                <span className="text-display-lg text-primary font-semibold">${plan.price}</span>
                                <span className="text-md text-tertiary ml-1.5 pb-2 font-medium">per month</span>
                            </p>
                            <p className="text-tertiary mt-4 text-sm">{plan.description}</p>

                            <div className="mt-6 flex flex-col gap-3">
                                <Button size="xl">Get started</Button>
                            </div>
                        </div>

                        {groups.map((group) => (
                            <table key={group.title} className="mb-8 w-full last:mb-0">
                                <caption className="text-brand-secondary px-4 pb-4 text-left text-sm font-semibold">{group.title}</caption>
                                <thead>
                                    <tr>
                                        <th className="sr-only" scope="col">
                                            Feature
                                        </th>
                                        <th className="sr-only" scope="col">
                                            Included
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {group.features.map((feature, index) => (
                                        <tr key={feature.name} className={cx(index % 2 === 0 && "bg-secondary_alt")}>
                                            <th className="text-primary flex py-4.5 pl-4 text-left text-sm font-medium" scope="row">
                                                {feature.name}
                                            </th>
                                            <td className="py-4.5 pr-4">
                                                <div className="flex items-center justify-end text-right">
                                                    <MobileValue value={valueFor(feature, planIndex)} />
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ))}

                        <div className="mt-8 flex flex-col gap-3 px-4">
                            <Button size="xl">Get started</Button>
                            <Button size="xl" color="secondary">
                                Chat to sales
                            </Button>
                        </div>
                    </section>
                ))}
            </div>

            {/* Wide view: every plan side by side. */}
            <div className="max-lg:hidden">
                <table className="h-px w-full table-fixed">
                    <caption className="sr-only">Pricing plan comparison</caption>
                    <thead>
                        <tr className="border-secondary border-b">
                            <th scope="col">
                                <span className="sr-only">Feature by plans</span>
                            </th>
                            {plans.map((plan) => (
                                <th key={plan.name} className="text-primary w-1/4 px-6 pt-0 pb-4 text-left text-xl font-semibold" scope="col">
                                    <p className="inline-flex items-center gap-2">
                                        {plan.name}
                                        {plan.isPopular && <Badge color="brand">Popular</Badge>}
                                    </p>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">
                                <span className="sr-only">Plan price</span>
                            </th>
                            {plans.map((plan) => (
                                <td key={plan.name} className="h-full px-6 py-8 align-top md:pb-12">
                                    <div className="flex h-full flex-col justify-between">
                                        <div className="flex flex-col">
                                            <p>
                                                <span className="text-display-lg text-primary font-semibold">${plan.price}</span>
                                                <span className="text-md text-tertiary ml-1.5 pb-2 font-medium">per month</span>
                                            </p>
                                            <p className="text-tertiary mt-4 text-sm">{plan.description}</p>
                                        </div>

                                        <div className="mt-6 flex flex-col gap-3">
                                            <Button size="xl">Get started</Button>
                                            <Button size="xl" color="secondary">
                                                Chat to sales
                                            </Button>
                                        </div>
                                    </div>
                                </td>
                            ))}
                        </tr>

                        {groups.map((group, groupIndex) => (
                            <Fragment key={group.title}>
                                <tr>
                                    <th
                                        className={cx("text-brand-secondary px-6 pb-4 text-left text-sm font-semibold", groupIndex === 0 ? "pt-0" : "pt-10")}
                                        colSpan={4}
                                        scope="colgroup"
                                    >
                                        {group.title}
                                    </th>
                                </tr>

                                {group.features.map((feature, index) => (
                                    <tr
                                        key={feature.name}
                                        className={cx(
                                            index % 2 === 0 && "bg-secondary_alt",
                                            index === group.features.length - 1 && "border-secondary border-b",
                                        )}
                                    >
                                        <th className="text-primary px-6 py-5.5 text-left text-sm font-medium" scope="row">
                                            {feature.name}
                                            <FeatureHint feature={feature} />
                                        </th>
                                        {plans.map((plan, planIndex) => (
                                            <td key={plan.name} className="px-6 py-5">
                                                <div className="flex items-center justify-center text-center">
                                                    <DesktopValue value={valueFor(feature, planIndex)} planName={plan.name} />
                                                </div>
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </Fragment>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr>
                            <th className="sr-only" scope="row">
                                Choose your plan
                            </th>
                            {plans.map((plan) => (
                                <td key={plan.name} className="px-6 pt-10 pb-8">
                                    <div className="flex flex-col gap-3">
                                        <Button size="xl">Get started</Button>
                                        <Button size="xl" color="secondary">
                                            Chat to sales
                                        </Button>
                                    </div>
                                </td>
                            ))}
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    </section>
);
