import { LOGOS } from "../../../utils/demo-assets";

/** The full-width logo row on the brand-colored section background. */
export const SocialProofFullWidthBrand = () => (
    <section className="bg-brand-section py-16 md:py-24">
        <div className="max-w-container mx-auto px-4 md:px-8">
            <div className="flex flex-col gap-8">
                <p className="text-md text-tertiary_on-brand text-center font-medium">Join 4,000+ companies already growing</p>

                <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 xl:gap-x-6">
                    {LOGOS.map((logo) => (
                        // The section background is always dark, so the mono placeholder wordmarks are inverted
                        // unconditionally — this stands in for the reference's separate white logo files.
                        <img key={logo.name} src={logo.src} alt={logo.name} className="h-9 opacity-85 invert md:h-10" />
                    ))}
                </div>
            </div>
        </div>
    </section>
);
