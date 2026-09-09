"use client";

import { SearchLg } from "@smarteraui/icons";
import { Input } from "@/components/base/input/input";

/**
 * Support-centre page header: the eyebrow sits above a headline/paragraph pair that
 * splits into a `1fr 480px` grid from `lg` up, with a search field below.
 */
export const HeaderSpaceBetweenSearch = () => (
    <section className="bg-primary py-16 md:py-24">
        <div className="max-w-container mx-auto px-4 md:px-8">
            <div className="text-brand-secondary md:text-md mb-3 text-sm font-semibold">Resources</div>

            <div className="grid grid-cols-[minmax(auto,768px)] gap-x-16 lg:grid-cols-[1fr_480px]">
                <h1 className="text-display-md text-primary md:text-display-lg font-semibold">Support centre</h1>
                <p className="text-tertiary mt-4 text-lg md:mt-6 md:text-xl lg:mt-3 lg:h-0">
                    Get help and support or learn how to use the newest features in Smartera.
                </p>

                <div className="mt-8 w-full sm:mt-8 sm:w-80">
                    <Input size="lg" type="search" icon={SearchLg} placeholder="Search" aria-label="Search" wrapperClassName="sm:py-0.5" />
                </div>
            </div>
        </div>
    </section>
);
