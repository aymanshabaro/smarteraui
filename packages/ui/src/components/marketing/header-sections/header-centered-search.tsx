"use client";

import { SearchLg } from "@properui/icons";
import { Input } from "../../base/input/input";

/**
 * Centered support-centre header: eyebrow, headline, paragraph and a search field
 * that spans the viewport below `sm` and settles at 20rem above it.
 */
export const HeaderCenteredSearch = () => (
    <section className="bg-primary py-16 md:py-24">
        <div className="max-w-container mx-auto px-4 md:px-8">
            <div className="mx-auto flex w-full max-w-3xl flex-col items-center text-center">
                <span className="text-brand-secondary md:text-md text-sm font-semibold">Resources</span>
                <h1 className="text-display-md text-primary md:text-display-lg mt-3 font-semibold">Support centre</h1>
                <p className="text-tertiary mt-4 text-lg md:mt-6 md:text-xl">Get help and support or learn how to use the newest features in Proper UI.</p>

                <div className="mt-8 w-full sm:mt-12 sm:w-80">
                    <Input size="lg" type="search" icon={SearchLg} placeholder="Search" aria-label="Search" wrapperClassName="sm:py-0.5" />
                </div>
            </div>
        </div>
    </section>
);
