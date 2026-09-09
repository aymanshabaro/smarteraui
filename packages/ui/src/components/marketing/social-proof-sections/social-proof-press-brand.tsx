import { LOGOS } from "@/utils/demo-assets";

// The reference lists five press outlets; the placeholder set has no press wordmarks, so the first
// five company logos stand in for them.
const outlets = LOGOS.slice(0, 5);

/** The press-mention row on the brand-colored section background. */
export const SocialProofPressBrand = () => (
    <section className="bg-brand-section py-16 md:py-24">
        <div className="max-w-container mx-auto px-4 md:px-8">
            <div className="flex flex-col gap-8">
                <p className="text-md text-tertiary_on-brand text-center font-medium">We&apos;ve been mentioned in the press</p>

                <div className="flex flex-col flex-wrap justify-center gap-x-8 gap-y-4 md:flex-row">
                    {outlets.map((logo) => (
                        // `object-contain` keeps the wordmark centered while the column layout stretches it on
                        // mobile; the always-dark background means the mono placeholder set is inverted outright.
                        <img key={logo.name} src={logo.src} alt={logo.name} className="h-8 object-contain opacity-85 invert md:h-10" />
                    ))}
                </div>
            </div>
        </div>
    </section>
);
