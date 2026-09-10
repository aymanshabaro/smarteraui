"use client";

import { ArrowLeft, SearchLg } from "@properui/icons";
import { Button } from "@/components/base/buttons/button";
import { Illustration } from "@/components/shared-assets/illustrations";

/** A 404 paired with the searching-cloud illustration. */
export const NotFoundIllustration01 = () => (
    <section className="bg-primary grid min-h-screen flex-1 py-16 md:py-24">
        <div className="max-w-container mx-auto grid h-full grid-cols-1 items-center gap-8 px-4 md:grid-cols-2 md:px-8">
            <div className="flex h-full flex-1 flex-col items-start gap-8 md:justify-center md:gap-12 md:pe-8">
                <div className="md:hidden">
                    <Illustration type="cloud" size="sm">
                        <SearchLg aria-hidden="true" className="size-6" />
                    </Illustration>
                </div>

                <div className="flex flex-col items-start gap-4 md:gap-6">
                    <div className="flex flex-col gap-3">
                        <span className="text-brand-secondary text-md font-semibold">404 error</span>
                        <h1 className="text-display-md text-primary md:text-display-lg lg:text-display-xl font-semibold">Page not found</h1>
                    </div>
                    <p className="text-tertiary max-w-120 text-lg md:text-xl">
                        Sorry, the page you are looking for doesn&apos;t exist. <br className="max-md:hidden" /> Here are some helpful links:
                    </p>
                </div>

                <div className="flex flex-col-reverse gap-3 self-stretch md:flex-row md:self-auto">
                    <Button size="xl" color="secondary" iconLeading={ArrowLeft}>
                        Go back
                    </Button>
                    <Button size="xl">Take me home</Button>
                </div>
            </div>

            <div className="relative hidden h-full flex-1 items-center justify-center px-14 md:flex">
                <Illustration type="cloud" size="lg" className="relative h-64 w-100 shrink-0 xl:h-87.25 xl:w-120" childrenClassName="size-22 xl:size-30.5">
                    <SearchLg aria-hidden="true" className="size-12 xl:size-15" />
                </Illustration>
            </div>
        </div>
    </section>
);
