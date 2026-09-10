"use client";

import { SearchLg } from "@properui/icons";
import { Button } from "@/components/base/buttons/button";
import { Form } from "@/components/base/form/form";
import { Input } from "@/components/base/input/input";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";
import { BackgroundPattern } from "@/components/shared-assets/background-patterns";
import { IMAGES } from "@/utils/demo-assets";

/** A 404 with a site search on the left and a full-bleed image on the right. */
export const NotFoundSplitImage01 = () => (
    <section className="bg-primary relative flex flex-col gap-16 overflow-hidden py-16 lg:grid lg:min-h-screen lg:grid-cols-2 lg:items-center lg:gap-0 lg:py-0">
        <div className="flex w-full items-center justify-center px-4 md:px-8">
            <div className="flex flex-col items-start gap-8 md:w-140 md:gap-12">
                <div className="flex flex-col gap-4 md:gap-6">
                    <div className="relative w-max">
                        <FeaturedIcon icon={SearchLg} size="xl" theme="modern" color="gray" className="z-10 hidden md:flex" />
                        <FeaturedIcon icon={SearchLg} size="lg" theme="modern" color="gray" className="z-10 md:hidden" />

                        <BackgroundPattern
                            pattern="circle"
                            size="lg"
                            className="pointer-events-none absolute top-1/2 left-1/2 z-0 hidden -translate-x-1/2 -translate-y-1/2 md:block"
                        />
                        <BackgroundPattern
                            pattern="circle"
                            size="md"
                            className="pointer-events-none absolute top-1/2 left-1/2 z-0 -translate-x-1/2 -translate-y-1/2 md:hidden"
                        />
                    </div>

                    <div className="z-10 flex flex-col gap-4 md:gap-6">
                        <h1 className="text-display-md text-primary md:text-display-lg lg:text-display-xl font-semibold">404 error</h1>
                        <p className="text-tertiary text-lg md:max-w-lg md:text-xl">
                            Sorry, the page you are looking for doesn&apos;t exist or has been moved. Try searching our site:
                        </p>
                    </div>
                </div>

                <Form className="z-10 flex w-full flex-col justify-center gap-4 md:max-w-120 md:flex-row md:items-center md:self-auto">
                    <Input isRequired size="md" type="search" name="search" icon={SearchLg} placeholder="Search our site" inputClassName="py-2.5! md:py-3!" />

                    <Button type="submit" size="xl">
                        Search
                    </Button>
                </Form>
            </div>
        </div>

        <div className="h-60 w-full px-4 md:h-95 md:px-8 lg:h-full lg:py-6 lg:ps-0 lg:pe-6">
            <div className="relative flex h-full flex-1">
                <img
                    src={IMAGES.landscape[0].src}
                    alt={IMAGES.landscape[0].alt}
                    className="size-full bg-center object-cover object-center lg:absolute lg:inset-0"
                />
            </div>
        </div>
    </section>
);
