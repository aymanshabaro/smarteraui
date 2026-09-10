"use client";

import { PlayCircle } from "@properui/icons";
import { Button } from "@/components/base/buttons/button";
import { HeaderDropdownSimple } from "@/components/marketing/header-navigations/header-dropdown-simple";
import { BackgroundPattern } from "@/components/shared-assets/background-patterns";
import { IMAGES, LOGOS } from "@/utils/demo-assets";

const LogoRow = ({ className, logoClassName }: { className: string; logoClassName: string }) => (
    <div className={className}>
        {LOGOS.map((logo) => (
            <img key={logo.name} src={logo.src} alt={logo.name} className={logoClassName} />
        ))}
    </div>
);

/** Two-column hero on a grid backdrop: copy plus a customer logo wall beside a laptop screenshot. */
export const HeroScreenMockup02 = () => (
    <div className="bg-secondary relative overflow-hidden">
        <BackgroundPattern pattern="circle" size="sm" className="absolute top-0 left-1/2 z-0 hidden max-w-none -translate-x-1/2 md:block" />
        <BackgroundPattern pattern="circle" size="sm" className="absolute top-0 left-1/2 z-0 max-w-none -translate-x-1/2 md:hidden" />

        <HeaderDropdownSimple />

        <section className="relative overflow-hidden py-16 md:py-24">
            <div className="max-w-container mx-auto grid grid-cols-1 items-center justify-items-center gap-16 px-4 md:px-8 lg:grid-cols-2 lg:justify-items-start lg:gap-16">
                <div className="flex max-w-3xl flex-col items-center text-center lg:items-start lg:text-start">
                    <h1 className="text-display-md text-primary md:text-display-lg lg:text-display-xl font-semibold">Beautiful analytics to grow smarter</h1>
                    <p className="text-tertiary mt-4 max-w-lg text-lg text-balance md:mt-6 md:text-xl">
                        Powerful, self-serve product and growth analytics to help you convert, engage, and retain more users.
                    </p>

                    <div className="mt-8 flex w-full flex-col-reverse items-stretch gap-3 sm:w-auto sm:flex-row sm:items-start md:mt-12">
                        <Button size="xl" color="secondary" iconLeading={PlayCircle}>
                            Demo
                        </Button>
                        <Button size="xl">Sign up</Button>
                    </div>

                    <div className="mt-16 hidden flex-col gap-6 lg:flex">
                        <p className="text-md text-tertiary font-medium">Trusted by 4,000+ companies</p>
                        <LogoRow className="flex flex-wrap justify-start gap-4" logoClassName="h-10 object-contain" />
                    </div>
                </div>

                <div className="relative lg:h-full lg:min-h-149.5">
                    <img
                        src={IMAGES.landscape[4].src}
                        alt="Laptop screen mockup showing the application interface"
                        className="inset-0 w-full max-w-none object-cover md:h-90 md:w-auto lg:absolute lg:h-full lg:object-left"
                    />
                </div>

                <div className="flex max-w-3xl flex-col gap-8 lg:hidden">
                    <p className="text-md text-tertiary text-center font-medium">Trusted by 4,000+ companies</p>
                    <LogoRow className="flex flex-wrap justify-center gap-x-8 gap-y-4" logoClassName="h-9 object-contain" />
                </div>
            </div>
        </section>
    </div>
);
