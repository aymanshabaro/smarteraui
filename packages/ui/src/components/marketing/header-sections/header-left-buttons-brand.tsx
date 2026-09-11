import { Button } from "../../base/buttons/button";

/** Left-aligned page header with a button pair, rendered on the brand section background. */
export const HeaderLeftButtonsBrand = () => (
    <section className="bg-brand-section py-16 md:py-24">
        <div className="max-w-container mx-auto px-4 md:px-8">
            <div className="flex w-full max-w-3xl flex-col">
                <span className="text-secondary_on-brand md:text-md text-sm font-semibold">Pricing</span>
                <h1 className="text-display-md text-primary_on-brand md:text-display-lg mt-3 font-semibold">Plans that fit your scale</h1>
                <p className="text-tertiary_on-brand mt-4 text-lg md:mt-6 md:text-xl">
                    Simple, transparent pricing that grows with you. Try any plan free for 30 days.
                </p>

                <div className="mt-8 flex flex-col-reverse gap-3 sm:mt-12 sm:flex-row">
                    <Button size="xl" color="secondary">
                        Chat to sales
                    </Button>
                    <Button size="xl">Get started</Button>
                </div>
            </div>
        </div>
    </section>
);
