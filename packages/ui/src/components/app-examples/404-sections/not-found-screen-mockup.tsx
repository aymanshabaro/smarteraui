"use client";

import { ArrowLeft } from "@properui/icons";
import { IMAGES } from "../../../utils/demo-assets";
import { Button } from "../../base/buttons/button";

/** A maintenance notice beside a desktop screen mockup that bleeds off the right edge. */
export const NotFoundScreenMockup = () => (
    <section className="bg-primary flex min-h-screen items-start justify-center py-16 md:items-center md:pb-24 lg:overflow-hidden lg:px-20">
        <div className="relative mx-auto flex w-full flex-col items-center justify-center gap-16 px-4 md:px-8 lg:flex-row">
            <div className="flex w-full max-w-140 flex-col items-start gap-8 text-center md:gap-12 md:text-start">
                <div className="flex flex-col gap-4 md:gap-6">
                    <div className="flex flex-col gap-3">
                        <p className="text-brand-secondary text-md font-semibold">404 error</p>
                        <h1 className="text-display-md text-primary md:text-display-lg lg:text-display-xl font-semibold">Under maintenance</h1>
                    </div>
                    <p className="text-tertiary text-lg md:max-w-120 md:text-xl">
                        The page you&apos;re looking for is currently under maintenance and will be back soon. Stay tuned!
                    </p>
                </div>

                <div className="flex flex-col-reverse gap-3 self-stretch md:flex-row md:self-auto">
                    <Button size="xl" color="secondary" iconLeading={ArrowLeft}>
                        Go back
                    </Button>
                    <Button size="xl">Go home</Button>
                </div>
            </div>

            <div className="lg:-me-100">
                {/* Screen mockup bezel: outer frame, inner shadow ring, then the screen itself. */}
                <div className="bg-primary ring-utility-neutral-300 rounded-[9.03px] p-[0.9px] shadow-lg ring-[0.56px] ring-inset md:rounded-[26.95px] md:p-[3.5px] md:ring-[1.68px]">
                    <div className="bg-primary shadow-modern-mockup-inner-md md:shadow-modern-mockup-inner-lg rounded-[7.9px] p-0.5 md:rounded-[23.58px] md:p-1">
                        <div className="bg-utility-neutral-50 ring-utility-neutral-200 relative overflow-hidden rounded-[6.77px] ring-[0.56px] md:rounded-[20.21px] md:ring-[1.68px]">
                            <img
                                src={IMAGES.landscape[5].src}
                                alt="Dashboard mockup showing the Proper UI application interface"
                                className="object-cover object-left-top lg:max-h-168.5 lg:max-w-none"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
);
