import { AppStoreButton, GooglePlayButton } from "@/components/base/buttons/app-store-buttons";
import { IPhoneMockup } from "@/components/shared-assets/mockups/iphone-mockup";
import { IMAGES } from "@/utils/demo-assets";

/** App-store CTA with a phone mockup floating over a soft decorative ellipse. */
export const CtaIphoneMockup01 = () => (
    <section className="bg-primary overflow-hidden pt-16 md:py-24">
        <div className="max-w-container relative mx-auto grid w-full grid-cols-1 gap-16 px-4 md:px-8 lg:grid-cols-2 lg:items-center">
            <div className="z-20 flex max-w-3xl flex-col items-start">
                <h2 className="text-display-sm text-primary md:text-display-md lg:text-display-lg font-semibold">Growth performance tracking made easy</h2>
                <p className="text-tertiary mt-4 text-lg md:mt-6 md:text-xl">Start your 30-day free trial today.</p>

                <div className="mt-8 flex w-full gap-3 md:mt-12">
                    <AppStoreButton size="lg" href="#" />
                    <GooglePlayButton size="lg" href="#" />
                </div>
            </div>

            <div className="relative min-h-90 md:min-h-100 md:w-full">
                {/* Decorative halo behind the device. */}
                <div aria-hidden="true" className="bg-secondary absolute -bottom-24 left-1/2 h-104 w-133 -translate-x-1/2 rounded-full" />

                <IPhoneMockup
                    image={IMAGES.square[0].src}
                    className="drop-shadow-iphone-mockup absolute top-0 right-1/2 w-full max-w-71 translate-x-1/2 md:max-w-78.5"
                />
            </div>
        </div>
    </section>
);
