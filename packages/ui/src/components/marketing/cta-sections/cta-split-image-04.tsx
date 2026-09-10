import { Button } from "@/components/base/buttons/button";
import { IMAGES } from "@/utils/demo-assets";

/** A branded card with the copy on the start edge and a portrait image on the end edge. */
export const CtaSplitImage04 = () => (
    <section className="bg-primary py-16 md:py-24">
        <div className="max-w-container mx-auto px-4 md:px-8">
            <div className="bg-brand-section flex flex-col overflow-hidden rounded-2xl shadow-xl md:flex-row md:items-center md:rounded-3xl">
                <div className="flex flex-1 flex-col px-6 pt-10 pb-12 lg:p-16">
                    <h2 className="text-display-sm text-primary_on-brand md:text-display-md font-semibold">Give us a shot</h2>
                    <p className="text-tertiary_on-brand mt-4 text-lg md:mt-5 md:text-xl">Join over 4,000+ startups already growing with Proper.</p>

                    <div className="mt-8 flex w-full flex-col-reverse items-stretch gap-3 md:mt-12 md:flex-row md:items-start">
                        <Button size="xl" color="secondary">
                            Learn more
                        </Button>
                        <Button size="xl">Get started</Button>
                    </div>
                </div>

                <img src={IMAGES.square[0].src} alt="Proper customer at work" className="h-70 w-full object-cover md:h-100 md:w-95 lg:w-120" />
            </div>
        </div>
    </section>
);
