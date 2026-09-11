"use client";

import { PlayCircle } from "@properui/icons";
import { Button } from "../../base/buttons/button";

const metrics = [
    { value: "400+", label: "Projects completed", description: "We've helped build over 400 amazing projects." },
    { value: "600%", label: "Return on investment", description: "Our customers have reported an average of ~600% ROI." },
    { value: "10k", label: "Global downloads", description: "Our free UI kit has been downloaded over 10k times." },
    { value: "200+", label: "5-star reviews", description: "We're proud of our 5-star rating with over 200 reviews." },
];

const Actions = () => (
    <>
        <Button size="xl" color="secondary" iconLeading={PlayCircle}>
            Demo
        </Button>
        <Button size="xl">Get started</Button>
    </>
);

/** A left-aligned heading with actions beside it and a four-up metric row underneath. */
export const MetricsSimpleWithActions01 = () => (
    <section className="bg-primary py-16 md:py-24">
        <div className="max-w-container mx-auto px-4 md:px-8">
            <div className="flex flex-col gap-12 md:gap-16">
                <div className="flex items-start gap-8">
                    <div className="flex flex-1 flex-col">
                        <h2 className="text-display-sm text-primary md:text-display-md font-semibold">Build something great</h2>
                        <p className="text-tertiary mt-4 text-lg md:mt-5 md:text-xl">Everything you need to build modern UI and great products.</p>
                    </div>

                    <div className="hidden gap-3.5 md:flex">
                        <Actions />
                    </div>
                </div>

                <dl className="flex flex-col gap-8 md:flex-row">
                    {metrics.map((metric) => (
                        <div key={metric.label} className="flex flex-1 flex-col-reverse gap-3 text-center md:text-start">
                            <dt className="flex flex-col gap-2">
                                <span className="text-primary text-lg font-semibold">{metric.label}</span>
                                <span className="text-md text-tertiary hidden md:block">{metric.description}</span>
                            </dt>
                            <dd className="text-display-lg text-brand-tertiary_alt md:text-display-xl font-semibold">{metric.value}</dd>
                        </div>
                    ))}
                </dl>

                <div className="flex flex-col-reverse gap-3 md:hidden">
                    <Actions />
                </div>
            </div>
        </div>
    </section>
);
