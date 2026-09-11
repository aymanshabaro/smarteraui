"use client";

import { ArrowLeft } from "@properui/icons";
import { IMAGES } from "../../../utils/demo-assets";
import { Button } from "../../base/buttons/button";

/** A 404 headline and actions on the left, with a full-height image on the right. */
export const NotFoundSplitImage02 = () => (
    <section className="bg-primary relative flex min-h-screen flex-col gap-16 py-16 lg:grid lg:grid-cols-2 lg:items-center lg:gap-0 lg:py-0">
        <div className="flex h-full lg:flex-1 lg:py-24">
            <div className="flex w-full items-center justify-center px-4 md:px-8">
                <div className="flex flex-col items-start gap-8 md:w-140 md:gap-12">
                    <div className="flex flex-col gap-4 md:gap-6">
                        <h1 className="text-display-md text-primary md:text-display-lg lg:text-display-xl font-semibold">Page not found</h1>
                        <p className="text-tertiary text-lg md:max-w-lg md:text-xl">
                            Sorry, the page you are looking for doesn&apos;t exist or has been moved. Here are some helpful links:
                        </p>
                    </div>

                    <div className="flex flex-col-reverse gap-3 self-stretch md:flex-row md:self-auto">
                        <Button size="xl" color="secondary" iconLeading={ArrowLeft}>
                            Go back
                        </Button>
                        <Button size="xl">Take me home</Button>
                    </div>
                </div>
            </div>
        </div>

        <div className="relative h-60 w-full px-4 md:h-95 md:px-8 lg:h-full lg:px-0">
            <img src={IMAGES.landscape[1].src} alt={IMAGES.landscape[1].alt} className="size-full bg-center object-cover object-top lg:absolute lg:inset-0" />
        </div>
    </section>
);
