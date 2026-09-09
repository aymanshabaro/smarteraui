import { Button } from "@/components/base/buttons/button";

/** The card CTA on a branded panel: copy on the start edge, actions on the end edge from `lg`. */
export const CtaCardVerticalBrand = () => (
    <section className="bg-primary py-16 md:py-24">
        <div className="max-w-container mx-auto px-4 md:px-8">
            <div className="bg-brand-section flex flex-col gap-x-8 gap-y-8 rounded-2xl px-6 py-10 lg:flex-row lg:p-16">
                <div className="flex max-w-3xl flex-1 flex-col">
                    <h2 className="text-display-sm text-primary_on-brand md:text-display-md font-semibold">
                        <span className="hidden md:inline">Start your 30-day free trial</span>
                        <span className="md:hidden">Start your free trial</span>
                    </h2>
                    <p className="text-tertiary_on-brand mt-4 text-lg md:mt-5 lg:text-xl">Join over 4,000+ startups already growing with Smartera.</p>
                </div>

                <div className="flex flex-col-reverse items-stretch gap-3 sm:flex-row sm:items-start">
                    <Button size="xl" color="secondary" className="shadow-xs! ring-0">
                        Learn more
                    </Button>
                    <Button size="xl">Get started</Button>
                </div>
            </div>
        </div>
    </section>
);
