"use client";

import { ArrowLeft, SearchLg } from "@smarteraui/icons";
import { Button } from "@/components/base/buttons/button";
import { Form } from "@/components/base/form/form";
import { Input } from "@/components/base/input/input";

/** The oversized "404" watermark that sits behind the copy on desktop. */
const WatermarkNumerals = () => (
    <svg
        aria-hidden="true"
        width="880"
        height="357"
        viewBox="0 0 880 357"
        fill="none"
        className="text-bg-tertiary absolute left-1/2 z-0 hidden -translate-x-1/2 md:block"
    >
        <text x="440" y="310" textAnchor="middle" fontSize="420" fontWeight="600" fill="currentColor">
            404
        </text>
    </svg>
);

/** A centred 404 with a site search, set against an oversized numeric watermark. */
export const NotFoundSimple05 = () => (
    <section className="bg-primary flex min-h-screen flex-col overflow-hidden py-16 md:px-20 md:py-24">
        <div className="relative flex h-full grow justify-center px-4 md:px-8 md:pt-[15vh]">
            <WatermarkNumerals />

            <div className="relative z-10 flex w-full max-w-3xl flex-col items-center justify-start gap-8 md:gap-12 md:pt-[75px]">
                <div className="z-10 flex w-full flex-col gap-4 text-center md:gap-6">
                    <h1 className="text-display-md text-primary md:text-display-lg lg:text-display-xl font-semibold">We lost this page</h1>
                    <p className="text-tertiary text-lg md:text-xl">The page you are looking for doesn&apos;t exist or has been moved.</p>
                </div>

                <Form className="z-10 flex w-full flex-col items-center justify-center gap-4 md:max-w-120 md:flex-row">
                    <Input isRequired size="lg" type="search" name="search" icon={SearchLg} placeholder="Search our site" inputClassName="md:py-3!" />

                    <Button type="submit" size="lg" color="secondary" className="w-full md:hidden">
                        Search
                    </Button>
                    <Button type="submit" size="xl" color="secondary" className="max-md:hidden">
                        Search
                    </Button>
                </Form>

                <div className="z-10 flex flex-col-reverse gap-3 self-stretch md:flex-row md:self-auto">
                    <Button size="xl" color="secondary" iconLeading={ArrowLeft}>
                        Go back
                    </Button>
                    <Button size="xl">Go home</Button>
                </div>
            </div>
        </div>
    </section>
);
