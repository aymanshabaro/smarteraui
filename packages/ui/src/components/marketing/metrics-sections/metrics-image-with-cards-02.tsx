"use client";

import { PlayCircle } from "@smarteraui/icons";
import { Button } from "@/components/base/buttons/button";
import { IMAGES } from "@/utils/demo-assets";

const metrics = [
    { value: "400+", label: "Projects completed", description: "We've helped build over 400 projects with great companies." },
    { value: "600%", label: "Return on investment", description: "We've helped build over 400 projects with great companies." },
    { value: "10k", label: "Global downloads", description: "Our free UI kit has been downloaded over 10k times." },
];

/** A brand header block with actions, overlapped by frosted metric cards sitting on a photo. */
export const MetricsImageWithCards02 = () => (
    <section className="bg-primary">
        <div className="bg-brand-section pt-16 pb-28 md:pt-24 md:pb-40">
            <div className="max-w-container mx-auto px-4 md:px-8">
                <div className="mx-auto flex w-full flex-col items-center text-center md:max-w-3xl">
                    <p className="text-secondary_on-brand md:text-md text-sm font-semibold">Launch faster</p>
                    <h2 className="text-display-sm text-primary_on-brand md:text-display-md mt-3 font-semibold">Build something great</h2>
                    <p className="text-secondary_on-brand mt-4 text-lg md:mt-5 md:text-xl">Everything you need to build modern UI and great products.</p>

                    <div className="mt-8 flex w-full flex-col-reverse gap-3 md:mt-8 md:w-auto md:flex-row">
                        <Button size="xl" color="secondary" iconLeading={PlayCircle} className="shadow-xs! ring-0">
                            Demo
                        </Button>
                        <Button size="xl">Get started</Button>
                    </div>
                </div>
            </div>
        </div>

        <div className="max-w-container mx-auto -mt-16 px-4 pb-16 md:-mt-24 md:px-8 md:pb-24">
            <div className="relative">
                <img src={IMAGES.landscape[4].src} alt="" className="absolute inset-0 size-full object-cover" />

                <dl className="relative grid grid-cols-1 gap-8 px-6 py-8 md:grid-cols-2 md:p-16 lg:grid-cols-3">
                    {metrics.map((metric) => (
                        <div
                            key={metric.label}
                            className="bg-alpha-white/80 ring-alpha-white/60 rounded-2xl p-6 text-center ring-1 backdrop-blur-lg ring-inset"
                        >
                            <dd className="text-display-lg text-brand-tertiary_alt md:text-display-xl font-semibold">{metric.value}</dd>
                            <dt className="mt-3 flex flex-col gap-1">
                                <span className="text-primary text-lg font-semibold">{metric.label}</span>
                                <span className="text-md text-tertiary">{metric.description}</span>
                            </dt>
                        </div>
                    ))}
                </dl>
            </div>
        </div>
    </section>
);
