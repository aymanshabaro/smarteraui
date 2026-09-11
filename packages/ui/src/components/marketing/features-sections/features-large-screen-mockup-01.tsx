import { IMAGES } from "../../../utils/demo-assets";
import { ScreenMockup } from "./mockups.a";

export const FeaturesLargeScreenMockup01 = () => (
    <section className="bg-primary py-16 md:pt-24 md:pb-0">
        <div className="max-w-container mx-auto w-full px-4 md:px-8">
            <div className="mx-auto flex w-full max-w-3xl flex-col items-center text-center">
                <span className="text-brand-secondary md:text-md text-sm font-semibold">Features</span>
                <h2 className="text-display-sm text-primary md:text-display-md mt-3 font-semibold">Cutting-edge features for advanced analytics</h2>
                <p className="text-tertiary mt-4 text-lg md:mt-5 md:text-xl">
                    Powerful, self-serve product and growth analytics to help you convert, engage, and retain more users. Trusted by over 4,000 startups.
                </p>
            </div>
        </div>

        <div className="max-w-container mx-auto mt-12 w-full px-4 md:mt-16 md:max-h-105 md:overflow-hidden md:px-8 lg:max-h-140">
            <ScreenMockup size="lg">
                <img src={IMAGES.landscape[0].src} alt={IMAGES.landscape[0].alt} className="size-full object-cover" />
            </ScreenMockup>
        </div>
    </section>
);
