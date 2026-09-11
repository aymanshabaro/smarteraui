"use client";

import { SearchLg } from "@properui/icons";
import { IMAGES } from "../../../utils/demo-assets";
import { Button } from "../../base/buttons/button";
import { Form } from "../../base/form/form";
import { Input } from "../../base/input/input";

/** A conversational 404 with a stacked search form beside a full-height image. */
export const NotFoundSplitImage03 = () => (
    <section className="bg-primary relative flex flex-col gap-16 py-16 lg:grid lg:min-h-screen lg:grid-cols-2 lg:items-center lg:gap-0 lg:py-0">
        <div className="flex h-full lg:py-24">
            <div className="flex w-full items-center justify-center px-4 md:px-8">
                <div className="flex flex-col items-start gap-8 md:gap-12 lg:pe-8">
                    <div className="flex max-w-132 flex-col gap-4 md:gap-6">
                        <h1 className="text-display-md text-primary md:text-display-lg lg:text-display-xl font-semibold">
                            Uh oh, we can&apos;t find that page...
                        </h1>
                        <p className="text-tertiary text-lg md:max-w-120 md:text-xl">
                            Sorry, the page you are looking for doesn&apos;t exist or has been moved. Try searching our site:
                        </p>
                    </div>

                    <Form className="flex w-full flex-col items-center justify-center gap-4 self-stretch md:max-w-120 md:flex-row md:self-auto">
                        <Input isRequired size="lg" type="search" name="search" icon={SearchLg} placeholder="Search our site" inputClassName="md:py-3!" />

                        <Button type="submit" size="xl" className="w-full">
                            Search
                        </Button>
                    </Form>
                </div>
            </div>
        </div>

        <div className="relative h-60 w-full px-4 md:h-95 md:px-8 lg:h-full lg:px-0">
            <img src={IMAGES.landscape[2].src} alt={IMAGES.landscape[2].alt} className="size-full bg-center object-cover object-top lg:absolute lg:inset-0" />
        </div>
    </section>
);
