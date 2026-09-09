"use client";

import type { FC } from "react";
import { ChartBreakoutCircle, DownloadCloud01, PlayCircle, Stars02, Zap } from "@smarteraui/icons";
import { Button } from "@/components/base/buttons/button";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";

const metrics: { value: string; label: string; icon: FC<{ className?: string }> }[] = [
    { value: "400+", label: "Projects completed", icon: Zap },
    { value: "600%", label: "Return on investment", icon: ChartBreakoutCircle },
    { value: "10k", label: "Global downloads", icon: DownloadCloud01 },
    { value: "200+", label: "5-star reviews", icon: Stars02 },
];

const Actions = () => (
    <>
        <Button size="xl" color="secondary" iconLeading={PlayCircle}>
            Demo
        </Button>
        <Button size="xl">Get started</Button>
    </>
);

/** Copy and actions on the start edge, a two-by-two grid of icon-led metrics on the end edge. */
export const MetricsSimpleWithActions02 = () => (
    <section className="bg-primary py-16 md:py-24">
        <div className="max-w-container mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 gap-12 md:gap-16 lg:grid-cols-2">
                <div className="flex flex-col items-start gap-8">
                    <div className="flex flex-col">
                        <h2 className="text-display-sm text-primary md:text-display-md font-semibold">Build something great</h2>
                        <p className="text-tertiary mt-4 text-lg md:mt-5 md:text-xl">Everything you need to build modern UI and great products.</p>
                    </div>

                    <div className="hidden gap-3.5 md:flex">
                        <Actions />
                    </div>
                </div>

                <dl className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2 md:gap-y-12">
                    {metrics.map((metric) => (
                        <div
                            key={metric.label}
                            className="grid grid-cols-1 justify-items-center text-center md:grid-cols-[auto_1fr] md:justify-items-start md:text-start"
                        >
                            <div aria-hidden="true" className="mb-4 md:row-span-2 md:me-4 md:mb-0 md:pt-1">
                                <FeaturedIcon icon={metric.icon} size="md" theme="light" color="brand" className="inline-flex md:hidden" />
                                <FeaturedIcon icon={metric.icon} size="lg" theme="light" color="brand" className="hidden md:inline-flex" />
                            </div>

                            <dd className="text-display-lg text-brand-tertiary_alt font-semibold">{metric.value}</dd>
                            <dt className="text-primary mt-1 text-lg font-semibold">{metric.label}</dt>
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
