import { Button } from "@/components/base/buttons/button";
import { IMAGES } from "@/utils/demo-assets";

/** A centered CTA above a wide desktop screen mockup that bleeds off the bottom edge. */
export const CtaScreenMockup03 = () => (
    <section className="bg-primary overflow-hidden py-16 md:pt-24 md:pb-0">
        <div className="max-w-container mx-auto px-4 md:px-8">
            <div className="flex flex-col justify-center text-center">
                <h2 className="text-display-sm text-primary md:text-display-md font-semibold">
                    <span className="hidden md:inline">Start your 30-day free trial</span>
                    <span className="md:hidden">Start your free trial</span>
                </h2>
                <p className="text-tertiary mt-4 text-lg md:mt-5 md:text-xl">Join over 4,000+ startups already growing with Smartera.</p>

                <div className="mt-8 flex flex-col-reverse gap-3 self-stretch md:flex-row md:self-center">
                    <Button size="xl" color="secondary">
                        Learn more
                    </Button>
                    <Button size="xl">Get started</Button>
                </div>
            </div>
        </div>

        <div className="max-w-container mx-auto mt-16 w-full px-4 md:max-h-100 md:overflow-hidden md:px-8">
            {/* Screen mockup bezel: outer frame, inner shadow ring, then the screen itself. */}
            <div className="bg-primary ring-utility-neutral-300 size-full rounded-[9.03px] p-[0.9px] shadow-lg ring-[0.56px] ring-inset md:rounded-[32px] md:p-1 md:ring-[2px]">
                <div className="bg-primary shadow-modern-mockup-inner-md md:shadow-modern-mockup-inner-lg size-full rounded-[7.9px] p-0.5 md:rounded-[28px] md:p-[5.4px]">
                    <div className="bg-utility-neutral-50 ring-utility-neutral-200 relative size-full overflow-hidden rounded-[6.77px] ring-[0.56px] md:rounded-[24px] md:ring-[2px]">
                        <img
                            src={IMAGES.landscape[2].src}
                            alt="Dashboard mockup showing the Smartera application interface"
                            className="size-full object-cover"
                        />
                    </div>
                </div>
            </div>
        </div>
    </section>
);
