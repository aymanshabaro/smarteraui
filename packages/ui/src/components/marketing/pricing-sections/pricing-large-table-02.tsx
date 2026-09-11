"use client";

import type { FC } from "react";
import { Fragment } from "react";
import { CheckCircle, HelpCircle, LayersThree01, LayersTwo01, Minus, Zap } from "@properui/icons";
import { cx } from "../../../utils/cx";
import { Tab, TabList, TabPanel, Tabs } from "../../application/tabs/tabs";
import { Button } from "../../base/buttons/button";
import { Slider } from "../../base/slider/slider";
import { Tooltip, TooltipTrigger } from "../../base/tooltip/tooltip";
import { FeaturedIcon } from "../../foundations/featured-icon/featured-icon";

interface Plan {
    icon: FC<{ className?: string }>;
    name: string;
    price: string;
    note: string;
    /** The column framed by the brand outline. */
    isHighlighted?: boolean;
}

/** `true`/`false` render as an included/excluded marker, a string renders as the plan's allowance. */
type FeatureValue = boolean | string;

interface Feature {
    name: string;
    hint: string;
    values: [FeatureValue, FeatureValue, FeatureValue];
}

const plans: Plan[] = [
    { icon: Zap, name: "Basic plan", price: "$10/mth", note: "Our most popular plan." },
    { icon: LayersTwo01, name: "Business plan", price: "$20/mth", note: "Best for growing teams.", isHighlighted: true },
    { icon: LayersThree01, name: "Enterprise plan", price: "$40/mth", note: "Best for large teams." },
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
            { name: "200+ integrations", hint: "Connect Proper UI to the tools your team already uses.", values: [false, true, true] },
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

/** The brand outline that frames the highlighted plan column, drawn per cell so the table can stay flat. */
const highlightCell = "border-brand border-x-2";

/** Tuple lookup helper — `values` always has one entry per plan, but the index signature is not literal. */
const valueFor = (feature: Feature, planIndex: number): FeatureValue => feature.values[planIndex] ?? false;

const FeatureHint = ({ feature }: { feature: Feature }) => (
    <Tooltip title={feature.hint}>
        <TooltipTrigger
            aria-label={`More information about ${feature.name}`}
            className="text-fg-quaternary hover:text-fg-quaternary_hover focus:text-fg-quaternary_hover cursor-pointer transition duration-100"
        >
            <HelpCircle className="ms-1 inline-block size-4" />
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
            <Minus className="text-fg-quaternary ms-auto size-5" />
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

/** A seat-slider and comparison table whose recommended plan is framed by a brand outline. */
export const PricingLargeTable02 = () => (
    <section className="bg-primary overflow-hidden">
        <div className="max-w-container mx-auto px-4 py-16 md:px-8 md:py-24">
            <div className="flex w-full max-w-3xl flex-col">
                <span className="text-brand-secondary md:text-md text-sm font-semibold">Pricing</span>
                <h2 className="text-display-md text-primary md:text-display-lg mt-3 font-semibold">Simple, transparent pricing</h2>
                <p className="text-tertiary mt-4 text-lg md:mt-6 md:text-xl">We believe Proper UI should be accessible to all companies, no matter the size.</p>

                <Tabs defaultSelectedKey="monthly" className="hidden md:flex">
                    <TabList type="button-border" size="md" aria-label="Billing period" className="w-max md:mt-12">
                        <Tab id="monthly" label="Monthly billing" />
                        <Tab id="annually" label="Annual billing" />
                    </TabList>

                    {/* The comparison table lives below the switch, so the panels only exist to satisfy the tabs' `aria-controls`. */}
                    <TabPanel id="monthly" />
                    <TabPanel id="annually" />
                </Tabs>
            </div>
        </div>

        <div className="max-w-container mx-auto h-14 w-full px-4 md:px-8">
            <div className="h-14 w-full px-4 md:pe-0">
                <Slider
                    aria-label="Number of users"
                    minValue={1}
                    maxValue={12}
                    step={1}
                    defaultValue={[1, 12]}
                    labelPosition="bottom"
                    labelFormatter={(value) => `${value} ${value === 1 ? "user" : "users"}`}
                />
            </div>
        </div>

        <div className="lg:max-w-container w-full py-16 md:px-8 md:py-24 lg:mx-auto">
            {/* Stacked view: one table per plan. */}
            <div className="space-y-16 lg:hidden">
                {plans.map((plan, planIndex) => (
                    <section key={plan.name}>
                        <div className="mb-8 flex flex-col px-4">
                            <FeaturedIcon size="md" color="gray" theme="modern" icon={plan.icon} />
                            <h3 className="text-brand-secondary mt-5 flex items-center gap-2 text-xl font-semibold">{plan.name}</h3>
                            <p className="text-display-md text-primary mt-2 font-semibold">{plan.price}</p>
                            <p className="text-md text-tertiary mt-2">{plan.note}</p>

                            <div className="mt-8 flex flex-col gap-3">
                                <Button size="xl">Get started</Button>
                            </div>
                        </div>

                        {groups.map((group, groupIndex) => (
                            <table key={group.title} className="mb-8 w-full last:mb-0">
                                <caption className={cx("text-brand-secondary px-4 pb-4 text-start text-sm font-semibold", groupIndex === 0 && "sr-only")}>
                                    {group.title}
                                </caption>
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
                                            <th className="text-primary flex py-4.5 ps-4 text-start text-sm font-medium" scope="row">
                                                {feature.name}
                                            </th>
                                            <td className="py-4.5 pe-4">
                                                <div className="flex items-center justify-end text-end">
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
                        </div>
                    </section>
                ))}
            </div>

            {/* Wide view: every plan side by side, with the recommended column framed. */}
            <div className="max-lg:hidden">
                <table className="h-px w-full table-fixed">
                    <caption className="sr-only">Pricing plan comparison</caption>
                    <thead>
                        <tr>
                            <th scope="col">
                                <span className="sr-only">Feature by plans</span>
                            </th>
                            {plans.map((plan) => (
                                <th key={plan.name} className="relative w-1/4 px-6 pt-6 pb-2" scope="col">
                                    {plan.isHighlighted && (
                                        <div
                                            aria-hidden="true"
                                            className="border-brand pointer-events-none absolute -inset-x-px inset-y-0 rounded-t-2xl border-x-2 border-t-2"
                                        />
                                    )}
                                    <div className="flex flex-col items-center gap-5 text-center">
                                        <FeaturedIcon size="md" color="gray" theme="modern" icon={plan.icon} />
                                        <p className="text-brand-secondary inline-flex items-center gap-2 text-xl font-semibold">{plan.name}</p>
                                    </div>
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
                                <td key={plan.name} className={cx("h-full px-6 pb-8 align-top md:pb-10", plan.isHighlighted && highlightCell)}>
                                    <div className="flex h-full flex-col items-center justify-between text-center">
                                        <div className="flex flex-col">
                                            <p className="text-display-lg text-primary font-semibold">{plan.price}</p>
                                            <p className="text-md text-tertiary mt-2">{plan.note}</p>
                                        </div>

                                        <div className="mt-8 flex w-full flex-col gap-3">
                                            <Button size="xl">Get started</Button>
                                        </div>
                                    </div>
                                </td>
                            ))}
                        </tr>

                        {groups.map((group, groupIndex) => (
                            <Fragment key={group.title}>
                                <tr className={cx(groupIndex === 0 && "sr-only")}>
                                    <th
                                        scope="colgroup"
                                        className={cx("text-brand-secondary px-6 pb-4 text-start text-sm font-semibold", groupIndex === 0 ? "pt-0" : "pt-10")}
                                    >
                                        {group.title}
                                    </th>
                                    {plans.map((plan) => (
                                        <td key={plan.name} className={cx("px-6 pb-4", plan.isHighlighted && highlightCell)} />
                                    ))}
                                </tr>

                                {group.features.map((feature, index) => (
                                    <tr key={feature.name} className={cx(index % 2 === 0 && "bg-secondary_alt")}>
                                        <th className="text-primary px-6 py-5.5 text-start text-sm font-medium" scope="row">
                                            {feature.name}
                                            <FeatureHint feature={feature} />
                                        </th>
                                        {plans.map((plan, planIndex) => (
                                            <td key={plan.name} className={cx("px-6 py-5", plan.isHighlighted && highlightCell)}>
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
                                <td key={plan.name} className="relative px-6 py-8">
                                    {plan.isHighlighted && (
                                        <div
                                            aria-hidden="true"
                                            className="border-brand pointer-events-none absolute -inset-x-px inset-y-0 rounded-b-2xl border-x-2 border-b-2"
                                        />
                                    )}
                                    <div className="flex flex-col gap-3">
                                        <Button size="xl">Get started</Button>
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
