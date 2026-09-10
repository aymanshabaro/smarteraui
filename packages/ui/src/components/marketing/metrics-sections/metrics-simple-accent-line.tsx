"use client";

import { ArrowRight, ZapFast } from "@properui/icons";
import { Button } from "@/components/base/buttons/button";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";

const metrics = [
    { value: "400+", label: "Projects completed", cta: "View projects", href: "/projects" },
    { value: "600%", label: "Return on investment", cta: "Learn more", href: "/roi" },
    { value: "10k", label: "Global downloads", cta: "Download now", href: "/downloads" },
    { value: "200+", label: "5-star reviews", cta: "View reviews", href: "/reviews" },
];

/** Four metrics with a per-metric link, each marked by a brand accent rule that turns vertical from `md` up. */
export const MetricsSimpleAccentLine = () => (
    <section className="bg-primary py-16 md:py-24">
        <div className="max-w-container mx-auto px-4 md:px-8">
            <div className="flex flex-col gap-12 md:gap-16">
                <div className="flex w-full flex-col items-center self-center text-center md:max-w-3xl">
                    <FeaturedIcon icon={ZapFast} size="xl" theme="modern" color="gray" />

                    <h2 className="text-display-sm text-primary md:text-display-md mt-4 font-semibold md:mt-6">Build something great</h2>
                    <p className="text-tertiary mt-4 text-lg md:mt-5 md:text-xl">Everything you need to build modern UI and great products.</p>
                </div>

                <dl className="flex flex-col justify-between gap-10 md:flex-row md:gap-8">
                    {metrics.map((metric) => (
                        <div
                            key={metric.label}
                            className="border-fg-brand-primary_alt grid flex-1 grid-cols-[1fr_auto] items-start gap-x-4 border-t-2 pt-4 md:grid-cols-1 md:border-s-2 md:border-t-0 md:ps-6 md:pt-0"
                        >
                            <dd className="text-display-lg text-brand-tertiary_alt col-start-1 row-start-1 font-semibold">{metric.value}</dd>
                            <dt className="text-primary col-start-1 row-start-2 mt-1 text-lg font-semibold">{metric.label}</dt>

                            <dd className="col-start-2 row-span-2 row-start-1 md:col-start-1 md:row-span-1 md:row-start-3 md:mt-4">
                                <Button size="lg" color="link-color" href={metric.href} iconTrailing={ArrowRight}>
                                    {metric.cta}
                                </Button>
                            </dd>
                        </div>
                    ))}
                </dl>
            </div>
        </div>
    </section>
);
