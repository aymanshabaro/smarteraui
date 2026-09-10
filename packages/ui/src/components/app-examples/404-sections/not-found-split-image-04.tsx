"use client";

import { ArrowLeft } from "@properui/icons";
import { BadgeWithDot } from "@/components/base/badges/badges";
import { Button } from "@/components/base/buttons/button";
import { IMAGES } from "@/utils/demo-assets";

/** A badged 404 stacked above an image that fills the remaining height. */
export const NotFoundSplitImage04 = () => (
    <section className="bg-primary grid min-h-screen py-16 md:pb-24 lg:px-20">
        <div className="mx-auto flex h-full w-full flex-col items-center justify-center gap-16 px-4 md:px-8 lg:flex-row lg:gap-8">
            <div className="flex w-full max-w-140 flex-col items-start gap-8 md:gap-12">
                <div className="flex flex-col gap-4 md:gap-6">
                    <div className="flex flex-col gap-3 md:gap-4">
                        <span className="w-max">
                            <BadgeWithDot type="modern" size="lg" color="brand">
                                404 error
                            </BadgeWithDot>
                        </span>
                        <h1 className="text-display-md text-primary md:text-display-lg lg:text-display-xl font-semibold">Page not found</h1>
                    </div>
                    <p className="text-tertiary max-w-lg text-lg md:text-xl">
                        Sorry, the page you are looking for doesn&apos;t exist. <br className="max-md:hidden" /> Here are some helpful links:
                    </p>
                </div>

                <div className="flex flex-col-reverse gap-3 self-stretch md:flex-row md:self-auto">
                    <Button size="xl" color="secondary" iconLeading={ArrowLeft}>
                        Go back
                    </Button>
                    <Button size="xl">Go home</Button>
                </div>
            </div>

            <div className="relative h-70 w-full md:h-110 lg:h-full lg:max-h-none">
                <img src={IMAGES.landscape[3].src} alt={IMAGES.landscape[3].alt} className="absolute inset-0 size-full object-cover" />
            </div>
        </div>
    </section>
);
