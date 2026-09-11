import { IMAGES } from "../../../utils/demo-assets";
import { Button } from "../../base/buttons/button";

/** A centered CTA on a tinted band, with a wide image overlapping its bottom edge. */
export const CtaSplitImage03 = () => (
    <section className="bg-primary">
        <div className="bg-secondary pt-16 pb-28 md:pt-24 md:pb-40">
            <div className="max-w-container mx-auto px-4 md:px-8">
                <div className="mx-auto flex w-full max-w-3xl flex-col items-center text-center">
                    <p className="text-brand-secondary md:text-md text-sm font-semibold">Get started</p>
                    <h2 className="text-display-sm text-primary md:text-display-md mt-3 font-semibold">
                        <span className="max-md:hidden">Start your 30-day free trial</span>
                        <span className="md:hidden">Start your free trial</span>
                    </h2>
                    <p className="text-tertiary mt-4 text-lg md:mt-5 md:text-xl">Join over 4,000+ startups already growing with Proper UI.</p>

                    <div className="mt-8 flex w-full flex-col-reverse gap-3 md:w-auto md:flex-row">
                        <Button size="xl" color="secondary">
                            Learn more
                        </Button>
                        <Button size="xl">Get started</Button>
                    </div>
                </div>
            </div>
        </div>

        <div className="max-w-container mx-auto -mt-16 px-4 pb-16 md:-mt-24 md:px-8 md:pb-24">
            <img src={IMAGES.landscape[1].src} alt="Conversation" className="h-70 w-full object-cover md:h-129" />
        </div>
    </section>
);
