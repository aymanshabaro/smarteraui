"use client";

import { Stars02 } from "@properui/icons";
import { Button } from "../../base/buttons/button";
import { CloseButton } from "../../base/buttons/close-button";
import { FeaturedIcon } from "../../foundations/featured-icon/featured-icon";

/** An announcement banner with a featured icon, supporting copy and a single call to action. Default palette, full-bleed layout. */
export const BannerSingleActionDefaultFullWidth = () => (
    <section className="border-primary bg-secondary relative border-t md:border-t-0 md:border-b">
        <div className="max-w-container mx-auto flex flex-col gap-3 p-4 md:flex-row md:items-center md:px-8 md:py-3">
            <div className="flex flex-1 flex-col gap-3 md:w-0 md:flex-row md:items-center">
                <FeaturedIcon icon={Stars02} size="md" color="gray" theme="modern" />

                <div className="flex flex-col gap-0.5 overflow-hidden lg:flex-row lg:gap-1.5">
                    <p className="text-secondary text-sm font-semibold md:truncate">We&apos;ve just announced our Series A!</p>
                    <p className="text-tertiary text-sm md:truncate">Read about it from our CEO.</p>
                </div>
            </div>

            <div className="flex flex-col gap-2 md:flex-row">
                <Button href="/blog/series-a" size="sm" color="secondary">
                    Read update
                </Button>

                <div className="absolute end-2 top-2 flex shrink-0 items-center justify-center md:static">
                    <CloseButton slot={null} size="sm" label="Dismiss" />
                </div>
            </div>
        </div>
    </section>
);
