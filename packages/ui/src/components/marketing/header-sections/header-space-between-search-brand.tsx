"use client";

import { SearchLg } from "@properui/icons";
import { Input } from "@/components/base/input/input";

/**
 * The split support-centre page header with its search field, rendered on a solid
 * brand section with the on-brand text tokens.
 */
export const HeaderSpaceBetweenSearchBrand = () => (
    <section className="bg-brand-section py-16 md:py-24">
        <div className="max-w-container mx-auto px-4 md:px-8">
            <div className="text-secondary_on-brand md:text-md mb-3 text-sm font-semibold">Resources</div>

            <div className="grid grid-cols-[minmax(auto,768px)] gap-x-16 lg:grid-cols-[1fr_480px]">
                <h1 className="text-display-md text-primary_on-brand md:text-display-lg font-semibold">Support centre</h1>
                <p className="text-tertiary_on-brand mt-4 text-lg md:mt-6 md:text-xl lg:mt-3 lg:h-0">
                    Get help and support or learn how to use the newest features in Proper.
                </p>

                <div className="mt-8 w-full sm:mt-8 sm:w-80">
                    <Input size="lg" type="search" icon={SearchLg} placeholder="Search" aria-label="Search" wrapperClassName="sm:py-0.5" />
                </div>
            </div>
        </div>
    </section>
);
