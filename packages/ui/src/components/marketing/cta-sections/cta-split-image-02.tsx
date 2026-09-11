import { IMAGES } from "../../../utils/demo-assets";
import { Button } from "../../base/buttons/button";

/** Copy on the start edge and a tall image on the end edge, both inside the container gutter. */
export const CtaSplitImage02 = () => (
    <section className="bg-primary py-16 md:py-24">
        <div className="max-w-container mx-auto grid w-full grid-cols-1 gap-12 px-4 md:gap-16 md:px-8 lg:grid-cols-2 lg:items-center">
            <div className="flex max-w-3xl flex-col items-start">
                <h2 className="text-display-sm text-primary md:text-display-md lg:text-display-lg font-semibold">
                    <span className="max-md:hidden">Join 4,000+ startups growing with Proper UI</span>
                    <span className="md:hidden">Start your free trial</span>
                </h2>
                <p className="text-tertiary mt-4 text-lg md:mt-6 md:text-xl">
                    <span className="md:hidden">Join over 4,000+ startups already growing with Proper UI.</span>
                    <span className="max-md:hidden">Start your 30-day free trial today.</span>
                </p>

                <div className="mt-8 flex w-full flex-col-reverse items-stretch gap-3 sm:flex-row sm:items-start md:mt-12">
                    <Button size="xl" color="secondary">
                        Learn more
                    </Button>
                    <Button size="xl">Get started</Button>
                </div>
            </div>

            <img src={IMAGES.square[3].src} alt="Proper UI customer at work" className="h-70 w-full object-cover md:h-95 lg:h-148" />
        </div>
    </section>
);
