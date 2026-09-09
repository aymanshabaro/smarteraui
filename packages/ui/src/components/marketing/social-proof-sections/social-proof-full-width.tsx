import { LOGOS } from "@/utils/demo-assets";

/** A centered eyebrow line above a wrapping, full-width row of customer logos. */
export const SocialProofFullWidth = () => (
    <section className="bg-primary py-16 md:py-24">
        <div className="max-w-container mx-auto px-4 md:px-8">
            <div className="flex flex-col gap-8">
                <p className="text-md text-tertiary text-center font-medium">Join 4,000+ companies already growing</p>

                <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 xl:gap-x-6">
                    {LOGOS.map((logo) => (
                        // `dark:invert` is a documented asset swap: the placeholder wordmarks ship as a single
                        // mono set instead of the reference's paired colour/white files.
                        <img key={logo.name} src={logo.src} alt={logo.name} className="h-9 md:h-10 dark:invert" />
                    ))}
                </div>
            </div>
        </div>
    </section>
);
