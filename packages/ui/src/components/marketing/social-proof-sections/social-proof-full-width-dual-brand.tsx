import { cx } from "../../../utils/cx";
import { LOGOS } from "../../../utils/demo-assets";

// The reference row holds ten wordmarks; the placeholder set ships six, so it is cycled to keep the
// two-row density and the "last two are desktop only" rule intact.
const logos = [...LOGOS, ...LOGOS.slice(0, 4)];

/** The two-row logo wall on the brand-colored section background. */
export const SocialProofFullWidthDualBrand = () => (
    <section className="bg-brand-section py-16 md:py-24">
        <div className="max-w-container mx-auto px-4 md:px-8">
            <div className="flex flex-col gap-8">
                <p className="text-md text-tertiary_on-brand text-center font-medium">Join 4,000+ companies already growing</p>

                <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 md:gap-y-6">
                    {logos.map((logo, index) => (
                        <img
                            key={`${logo.name}-${index}`}
                            src={logo.src}
                            alt={logo.name}
                            // The section background is always dark, so the mono placeholder wordmarks are inverted
                            // unconditionally — this stands in for the reference's separate white logo files.
                            className={cx("h-9 opacity-85 invert md:h-10", index >= logos.length - 2 && "max-md:hidden")}
                        />
                    ))}
                </div>
            </div>
        </div>
    </section>
);
