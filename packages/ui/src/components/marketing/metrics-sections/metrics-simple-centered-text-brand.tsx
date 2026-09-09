"use client";

import { Fragment } from "react";
import { ZapFast } from "@smarteraui/icons";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";

const metrics = [
    { value: "400+", label: "Projects completed" },
    { value: "600%", label: "Return on investment" },
    { value: "10k", label: "Global downloads" },
];

/** The centered metric row on the brand background, led by a solid featured icon. */
export const MetricsSimpleCenteredTextBrand = () => (
    <section className="bg-brand-section py-16 md:py-24">
        <div className="max-w-container mx-auto px-4 md:px-8">
            <div className="flex flex-col gap-12 md:gap-16">
                <div className="flex w-full flex-col items-center self-center text-center md:max-w-3xl">
                    <FeaturedIcon icon={ZapFast} size="xl" theme="dark" color="brand" />

                    <h2 className="text-display-sm text-primary_on-brand md:text-display-md mt-4 font-semibold md:mt-6">Build something great</h2>
                    <p className="text-secondary_on-brand mt-4 text-lg md:mt-5 md:text-xl">Everything you need to build modern UI and great products.</p>
                </div>

                <dl className="flex w-full flex-col justify-center gap-8 md:max-w-3xl md:flex-row md:gap-4 md:self-center">
                    {metrics.map((metric, index) => (
                        <Fragment key={metric.label}>
                            {index > 0 && <div aria-hidden="true" className="border-brand_alt hidden border-l md:block" />}

                            <div className="flex flex-1 flex-col-reverse gap-3 text-center">
                                <dt className="text-tertiary_on-brand text-lg font-semibold">{metric.label}</dt>
                                <dd className="text-display-lg text-primary_on-brand md:text-display-xl font-semibold">{metric.value}</dd>
                            </div>
                        </Fragment>
                    ))}
                </dl>
            </div>
        </div>
    </section>
);
