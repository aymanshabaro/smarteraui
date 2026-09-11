"use client";

import { Fragment } from "react";
import { ZapFast } from "@properui/icons";
import { FeaturedIcon } from "../../foundations/featured-icon/featured-icon";

const metrics = [
    { value: "400+", label: "Projects completed" },
    { value: "600%", label: "Return on investment" },
    { value: "10k", label: "Global downloads" },
];

/** A featured icon, centered heading and three metrics separated by vertical rules from `md` up. */
export const MetricsSimpleCenteredText = () => (
    <section className="bg-primary py-16 md:py-24">
        <div className="max-w-container mx-auto px-4 md:px-8">
            <div className="flex flex-col gap-12 md:gap-16">
                <div className="flex w-full flex-col items-center self-center text-center md:max-w-3xl">
                    <FeaturedIcon icon={ZapFast} size="xl" theme="light" color="brand" />

                    <h2 className="text-display-sm text-primary md:text-display-md mt-4 font-semibold md:mt-6">Build something great</h2>
                    <p className="text-tertiary mt-4 text-lg md:mt-5 md:text-xl">Everything you need to build modern UI and great products.</p>
                </div>

                <dl className="flex w-full flex-col justify-center gap-8 md:max-w-3xl md:flex-row md:gap-4 md:self-center">
                    {metrics.map((metric, index) => (
                        <Fragment key={metric.label}>
                            {index > 0 && <div aria-hidden="true" className="border-secondary hidden border-s md:block" />}

                            <div className="flex flex-1 flex-col-reverse gap-3 text-center">
                                <dt className="text-primary text-lg font-semibold">{metric.label}</dt>
                                <dd className="text-display-lg text-brand-tertiary_alt md:text-display-xl font-semibold">{metric.value}</dd>
                            </div>
                        </Fragment>
                    ))}
                </dl>
            </div>
        </div>
    </section>
);
