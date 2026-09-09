import { Button } from "@smarteraui/ui/components/base/buttons/button";
import { INSTALL_COMMAND } from "./content";

/**
 * Closing call to action.
 *
 * Copied from `marketing/cta-sections/cta-card-horizontal-brand` — the rounded brand-section
 * card, its `on-brand` type ramp and the reversed action row are that section's.
 */
export const LandingCta = () => (
    <section aria-labelledby="get-started" className="bg-primary py-16 md:py-24">
        <div className="max-w-container mx-auto px-4 md:px-8">
            <div className="bg-brand-section flex flex-col items-center rounded-2xl px-6 py-10 text-center lg:p-16">
                <h2 id="get-started" className="text-display-sm text-primary_on-brand xl:text-display-md font-semibold text-balance">
                    Your next screen is already half built
                </h2>
                <p className="text-tertiary_on-brand mt-4 text-lg text-balance md:mt-5 lg:text-xl">
                    Install the package, or let the CLI copy the source in. Either way you can read every line of it.
                </p>
                <p className="text-secondary_on-brand mt-6 font-mono text-sm md:text-base">{INSTALL_COMMAND}</p>

                {/* On the brand card the white button reads as the loud one, so `Get started` takes `secondary`. */}
                <div className="mt-8 flex flex-col-reverse gap-3 self-stretch sm:flex-row sm:self-center">
                    <Button size="xl" href="/components">
                        Browse components
                    </Button>
                    <Button size="xl" color="secondary" href="/docs/installation">
                        Get started
                    </Button>
                </div>
            </div>
        </div>
    </section>
);
