"use client";

import { SearchLg } from "@properui/icons";
import { Input } from "../../base/input/input";

/** Left-aligned page header with a search field, rendered on the brand section background. */
export const HeaderLeftSearchBrand = () => (
    <section className="bg-brand-section py-16 md:py-24">
        <div className="max-w-container mx-auto px-4 md:px-8">
            <div className="flex w-full max-w-3xl flex-col">
                <span className="text-secondary_on-brand md:text-md text-sm font-semibold">Resources</span>
                <h1 className="text-display-md text-primary_on-brand md:text-display-lg mt-3 font-semibold">Support centre</h1>
                <p className="text-tertiary_on-brand mt-4 text-lg md:mt-6 md:text-xl">
                    Get help and support or learn how to use the newest features in Proper UI.
                </p>

                <div className="mt-8 w-full sm:mt-12 sm:w-80">
                    <Input size="lg" type="search" icon={SearchLg} aria-label="Search" placeholder="Search" wrapperClassName="sm:py-0.5" />
                </div>
            </div>
        </div>
    </section>
);
