import { IMAGES } from "../../../utils/demo-assets";
import { AppStoreButton, GooglePlayButton } from "../../base/buttons/app-store-buttons";
import { BackgroundPattern } from "../../shared-assets/background-patterns";
import { IPhoneMockup } from "../../shared-assets/mockups/iphone-mockup";
import { HeaderDropdownSimple } from "../header-navigations/header-dropdown-simple";

/** Two-column hero with app-store badges and an iPhone frame overlapping a desktop screenshot. */
export const HeroIphoneMockup02 = () => (
    <div className="bg-secondary relative overflow-hidden">
        <BackgroundPattern pattern="circle" size="sm" className="absolute top-0 left-1/2 z-0 hidden max-w-none -translate-x-1/2 md:block" />
        <BackgroundPattern pattern="circle" size="sm" className="absolute top-0 left-1/2 z-0 max-w-none -translate-x-1/2 md:hidden" />

        <HeaderDropdownSimple />

        <section className="relative overflow-hidden pt-16 md:py-24">
            <div className="max-w-container mx-auto flex flex-col gap-16 px-4 md:px-8 lg:flex-row lg:items-center lg:gap-16">
                <div className="flex w-full max-w-3xl flex-1 flex-col">
                    <h1 className="text-display-md text-primary md:text-display-lg lg:text-display-xl font-semibold">#1 paid ads tracking app for marketers</h1>
                    <p className="text-tertiary mt-4 max-w-120 text-lg text-balance md:mt-6 md:text-xl">
                        Designed by marketers, for marketers. Proper UI gives you the guidance, data and innovation you need to become a better marketer.
                    </p>

                    <div className="mt-8 flex gap-3 md:mt-12">
                        <AppStoreButton size="lg" href="/download/ios" />
                        <GooglePlayButton size="lg" href="/download/android" />
                    </div>
                </div>

                <div className="relative flex h-90 w-full items-start justify-center lg:h-142 lg:max-w-144 lg:flex-1 lg:items-center">
                    <img
                        src={IMAGES.landscape[0].src}
                        alt="Dashboard mockup showing the application interface"
                        className="shadow-3xl ring-screen-mockup-border absolute start-24 top-0 h-128 max-w-3xl rounded-[10px] object-cover ring-4 max-lg:hidden"
                    />
                    <IPhoneMockup
                        image={IMAGES.square[1].src}
                        className="drop-shadow-iphone-mockup start-0 top-18 h-[579px] w-71 lg:absolute lg:h-auto lg:w-61 lg:drop-shadow-none"
                    />
                </div>
            </div>
        </section>
    </div>
);
