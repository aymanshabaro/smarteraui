"use client";

import { Button } from "@/components/base/buttons/button";

/**
 * Pricing page header: the eyebrow sits above a headline/paragraph pair that splits
 * into a `1fr 480px` grid from `lg` up, with the call-to-action pair below.
 */
export const HeaderSpaceBetweenButtons = () => (
    <section className="bg-primary py-16 md:py-24">
        <div className="max-w-container mx-auto px-4 md:px-8">
            <div className="text-brand-secondary md:text-md mb-3 text-sm font-semibold">Pricing</div>

            <div className="grid grid-cols-[minmax(auto,768px)] gap-x-16 lg:grid-cols-[1fr_480px]">
                <h1 className="text-display-md text-primary md:text-display-lg font-semibold">Plans that fit your scale</h1>
                <p className="text-tertiary mt-4 text-lg md:mt-6 md:text-xl lg:mt-3 lg:h-0">
                    Simple, transparent pricing that grows with you. Try any plan free for 30 days.
                </p>

                <div className="mt-8 flex flex-col-reverse gap-3 sm:mt-8 sm:flex-row">
                    <Button color="secondary" size="xl">
                        Chat to sales
                    </Button>
                    <Button size="xl">Get started</Button>
                </div>
            </div>
        </div>
    </section>
);
