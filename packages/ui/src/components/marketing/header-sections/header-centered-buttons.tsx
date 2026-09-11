import { Button } from "../../base/buttons/button";

/**
 * Centered page header whose eyebrow, headline and paragraph sit above a pair of
 * actions that stack (primary on top) below `sm`.
 */
export const HeaderCenteredButtons = () => (
    <section className="bg-primary py-16 md:py-24">
        <div className="max-w-container mx-auto px-4 md:px-8">
            <div className="mx-auto flex w-full max-w-3xl flex-col items-center text-center">
                <span className="text-brand-secondary md:text-md text-sm font-semibold">Pricing</span>
                <h1 className="text-display-md text-primary md:text-display-lg mt-3 font-semibold">Plans that fit your scale</h1>
                <p className="text-tertiary mt-4 text-lg md:mt-6 md:text-xl">Simple, transparent pricing that grows with you. Try any plan free for 30 days.</p>

                <div className="mt-8 flex flex-col-reverse gap-3 self-stretch sm:mt-12 sm:flex-row sm:self-center">
                    <Button color="secondary" size="xl">
                        Chat to sales
                    </Button>
                    <Button size="xl">Get started</Button>
                </div>
            </div>
        </div>
    </section>
);
