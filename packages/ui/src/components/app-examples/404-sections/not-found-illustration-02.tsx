"use client";

import { SearchLg } from "@properui/icons";
import { Button } from "@/components/base/buttons/button";
import { Form } from "@/components/base/form/form";
import { Input } from "@/components/base/input/input";
import { cx } from "@/utils/cx";

/** Half the width of a numeral's stroke — the construction grid the glyphs are drawn on. */
const R = 31;

/** One geometric "4", drawn as construction circles, a diagonal stroke and a crossbar. */
const Numeral4 = ({ x }: { x: number }) => (
    <g>
        <circle cx={x + 92} cy={32} r={R} />
        <circle cx={x + 92} cy={132} r={R} />
        <circle cx={x + 31} cy={100} r={R} />
        <circle cx={x + 153} cy={100} r={R} />
        <path d={`M${x + 61} 32 L${x + 1} 131`} />
        <path d={`M${x + 123} 32 L${x + 62} 131`} />
        <path d={`M${x + 1} 69 H${x + 153}`} />
        <path d={`M${x + 31} 131 H${x + 153}`} />
        <path d={`M${x + 61} 32 V132`} />
        <path d={`M${x + 123} 32 V132`} />
    </g>
);

/** One geometric "0": an annulus with a construction circle at each quadrant. */
const Numeral0 = ({ x }: { x: number }) => (
    <g>
        <circle cx={x} cy={82} r={81} />
        <circle cx={x} cy={82} r={40} />
        <circle cx={x} cy={31} r={R} />
        <circle cx={x} cy={133} r={R} />
        <circle cx={x - 51} cy={82} r={R} />
        <circle cx={x + 51} cy={82} r={R} />
    </g>
);

/** The "404" drawn as typographic construction geometry. */
const Numerals404 = ({ className }: { className?: string }) => (
    <svg aria-hidden="true" viewBox="0 0 514 164" fill="none" stroke="currentColor" className={cx("shrink-0", className)}>
        <path d="M0 0.5 H514" />
        <path d="M0 163.5 H514" />
        <Numeral4 x={0} />
        <Numeral0 x={257} />
        <Numeral4 x={360} />
    </svg>
);

/** A maintenance 404 with a site search, beside the numerals drawn as construction geometry. */
export const NotFoundIllustration02 = () => (
    <section className="bg-primary grid flex-1 py-16 md:min-h-screen md:py-24">
        <div className="max-w-container mx-auto grid w-full grid-cols-1 items-start gap-8 px-4 md:items-center md:px-8 lg:grid-cols-2">
            <div className="mx-auto flex max-w-3xl flex-col items-start gap-8 md:gap-12 md:pe-8">
                <Numerals404 className="text-bg-tertiary w-[282px] lg:hidden" />

                <div className="flex flex-col gap-4 md:gap-6">
                    <div className="flex flex-col gap-3">
                        <span className="text-brand-secondary text-md font-semibold">404 error</span>
                        <h1 className="text-display-md text-primary md:text-display-lg lg:text-display-xl font-semibold">Under maintenance</h1>
                    </div>
                    <p className="text-tertiary text-lg md:max-w-120 md:text-xl">
                        Sorry, the page you are looking for doesn&apos;t exist or has been moved. Try searching our site:
                    </p>
                </div>

                <Form className="flex w-full flex-col items-stretch gap-4 md:max-w-120 md:flex-row md:items-start">
                    <Input isRequired size="lg" type="search" name="search" icon={SearchLg} placeholder="Search our site" inputClassName="md:py-3!" />

                    <Button type="submit" size="lg" className="md:hidden">
                        Search
                    </Button>
                    <Button type="submit" size="xl" className="max-md:hidden">
                        Search
                    </Button>
                </Form>
            </div>

            <div className="relative hidden items-center justify-center lg:flex">
                <Numerals404 className="text-fg-quaternary w-full max-w-[514px]" />
            </div>
        </div>
    </section>
);
