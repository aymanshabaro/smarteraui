"use client";

import { ArrowRight, SearchLg } from "@properui/icons";
import { IMAGES } from "../../../utils/demo-assets";
import { Button } from "../../base/buttons/button";
import { Form } from "../../base/form/form";
import { Input } from "../../base/input/input";

/** The onward links listed under the search form. */
const links = [
    { title: "Documentation", description: "Dive in to learn all about our product." },
    { title: "Our blog", description: "Read the latest posts on our blog." },
    { title: "Chat to support", description: "Our friendly team is here to help." },
];

/** A 404 with a site search and helpful links, beside a full-height image. */
export const NotFoundSplitImage05 = () => (
    <section className="bg-primary grid min-h-screen flex-1 py-16 md:py-24 lg:px-20">
        <div className="flex h-full flex-col items-center justify-center gap-16 px-4 md:px-8 lg:flex-row lg:gap-8">
            <div className="flex w-full max-w-140 flex-col items-start gap-8 md:gap-12">
                <div className="flex flex-col gap-4 md:gap-6">
                    <div className="flex flex-col gap-3">
                        <p className="text-brand-secondary text-md font-semibold">404 error</p>
                        <h1 className="text-display-md text-primary md:text-display-lg lg:text-display-xl font-semibold">We lost this page</h1>
                    </div>
                    <p className="text-tertiary max-w-lg text-lg md:text-xl">Sorry, the page you are looking for doesn&apos;t exist.</p>
                </div>

                <Form className="flex h-max w-full max-w-120 flex-col gap-4 self-stretch md:flex-row md:self-auto">
                    <Input isRequired size="lg" type="search" name="search" icon={SearchLg} placeholder="Search our site" inputClassName="md:py-3!" />

                    <Button type="submit" size="xl">
                        Search
                    </Button>
                </Form>

                <ul className="grid w-full grid-cols-1 gap-6">
                    {links.map((link) => (
                        <li key={link.title} className="flex flex-col items-start gap-1 text-start">
                            <Button href="#" size="xl" color="link-color" iconTrailing={ArrowRight}>
                                {link.title}
                            </Button>
                            <p className="text-tertiary text-md">{link.description}</p>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="size-full flex-1">
                <div className="relative size-full overflow-hidden">
                    <img
                        src={IMAGES.landscape[4].src}
                        alt={IMAGES.landscape[4].alt}
                        className="h-70 w-full object-cover object-center md:h-110 lg:absolute lg:inset-0 lg:h-full"
                    />
                </div>
            </div>
        </div>
    </section>
);
