import { Button } from "@/components/base/buttons/button";

/** The centered CTA on the permanently branded section background. */
export const CtaSimpleCenteredBrand = () => (
    <section className="bg-brand-section py-16 md:py-24">
        <div className="max-w-container mx-auto px-4 md:px-8">
            <div className="flex flex-col justify-center text-center">
                <h2 className="text-display-sm text-primary_on-brand md:text-display-md font-semibold">Start your free trial</h2>
                <p className="text-tertiary_on-brand mt-4 text-lg md:mt-5 md:text-xl">Join over 4,000+ startups already growing with Proper UI.</p>

                <div className="mt-8 flex flex-col-reverse gap-3 self-stretch md:mt-8 md:flex-row md:self-center">
                    <Button size="xl" color="secondary" className="shadow-xs! ring-0">
                        Learn more
                    </Button>
                    <Button size="xl">Get started</Button>
                </div>
            </div>
        </div>
    </section>
);
