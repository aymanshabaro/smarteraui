import { Button } from "@/components/base/buttons/button";

/** A centered card on the branded section background. */
export const CtaCardHorizontalBrand = () => (
    <section className="bg-primary py-16 md:py-24">
        <div className="max-w-container mx-auto px-4 md:px-8">
            <div className="bg-brand-section flex flex-col items-center rounded-2xl px-6 py-10 text-center lg:p-16">
                <h2 className="text-display-sm text-primary_on-brand xl:text-display-md font-semibold">
                    <span className="hidden md:inline">Start your 30-day free trial</span>
                    <span className="md:hidden">Start your free trial</span>
                </h2>
                <p className="text-tertiary_on-brand mt-4 text-lg md:mt-5 lg:text-xl">Join over 4,000+ startups already growing with Proper.</p>

                <div className="mt-8 flex flex-col-reverse gap-3 self-stretch sm:flex-row sm:self-center">
                    <Button size="xl" color="secondary">
                        Learn more
                    </Button>
                    <Button size="xl">Get started</Button>
                </div>
            </div>
        </div>
    </section>
);
