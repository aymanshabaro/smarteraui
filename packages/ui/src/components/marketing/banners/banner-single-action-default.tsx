"use client";

import { Stars02 } from "@smarteraui/icons";
import { Button } from "@/components/base/buttons/button";
import { CloseButton } from "@/components/base/buttons/close-button";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";

/** An announcement banner with a featured icon, supporting copy and a single call to action. Default palette, floating card layout. */
export const BannerSingleActionDefault = () => (
    <section className="bg-secondary ring-secondary_alt relative mx-2 mb-4 flex flex-col gap-3 rounded-xl p-4 shadow-lg ring-1 md:m-0 md:flex-row md:items-center md:p-3">
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
    </section>
);
