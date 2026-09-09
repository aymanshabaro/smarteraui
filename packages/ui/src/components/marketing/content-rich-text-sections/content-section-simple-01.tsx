"use client";

import { ChartBreakoutSquare } from "@smarteraui/icons";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";

/** A headline column paired with a rich-text column, introduced by a featured icon. */
export const ContentSectionSimple01 = () => (
    <section className="bg-primary py-16 md:py-24">
        <div className="max-w-container mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 gap-12 md:gap-16 lg:grid-cols-2">
                <div className="max-w-3xl lg:col-span-1">
                    <FeaturedIcon size="xl" color="brand" theme="light" icon={ChartBreakoutSquare} className="hidden md:flex" />
                    <FeaturedIcon size="lg" color="brand" theme="light" icon={ChartBreakoutSquare} className="md:hidden" />

                    <h2 className="text-display-sm text-primary md:text-display-md mt-5 font-semibold">Beautiful analytics to grow smarter</h2>
                    <p className="text-tertiary mt-4 text-lg md:mt-5 md:text-xl">
                        Powerful, self-serve product and growth analytics to help you convert, engage, and retain more users.
                    </p>
                </div>

                <div className="prose md:prose-lg">
                    <p>
                        Most teams already collect more than enough data. What they are missing is a shared place to look at it, and a shared vocabulary for
                        describing what they see when they get there.
                    </p>

                    <h2>How we can help</h2>

                    <p>
                        Smartera connects to the tools you already run and builds a single event model on top of them. Activation, retention and revenue are
                        defined once, reviewed by the whole team, and then used everywhere — dashboards, alerts and the weekly report all read from the same
                        definitions.
                    </p>
                    <p>
                        The result is fewer arguments about whose number is right and more time spent on the question underneath. Every metric links back to the
                        query that produced it, so anyone can check the working without waiting on an analyst.
                    </p>
                </div>
            </div>
        </div>
    </section>
);
