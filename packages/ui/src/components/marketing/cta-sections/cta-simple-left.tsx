import { Button } from "../../base/buttons/button";

/** A left-aligned headline with the actions pushed to the end of the row on large screens. */
export const CtaSimpleLeft = () => (
    <section className="bg-primary py-16 md:py-24">
        <div className="max-w-container mx-auto px-4 md:px-8">
            <div className="flex flex-col justify-between lg:flex-row">
                <div className="max-w-3xl">
                    <h2 className="text-display-sm text-primary md:text-display-md font-semibold">Start your free trial</h2>
                    <p className="text-tertiary mt-4 text-lg md:mt-5 md:text-xl">Join over 4,000+ startups already growing with Proper UI.</p>
                </div>

                <div className="mt-8 flex flex-col-reverse gap-3 self-stretch sm:flex-row sm:self-start lg:mt-0">
                    <Button size="xl" color="secondary">
                        Learn more
                    </Button>
                    <Button size="xl">Get started</Button>
                </div>
            </div>
        </div>
    </section>
);
