"use client";

import { ArrowLeft, ArrowRight } from "@properui/icons";
import { BadgeWithDot } from "@/components/base/badges/badges";
import { Button } from "@/components/base/buttons/button";

/** The onward links offered under the actions. */
const links = [
    { title: "Documentation", description: "Dive in to learn all about our product." },
    { title: "Our blog", description: "Read the latest posts on our blog." },
    { title: "Chat to support", description: "Our friendly team is here to help." },
];

/** A left-aligned 404 with a status badge and a list of helpful links. */
export const NotFoundSimple02 = () => (
    <section className="bg-primary flex min-h-screen items-start justify-center py-16 md:items-center md:py-24">
        <div className="max-w-container mx-auto w-full px-4 md:px-8">
            <div className="flex w-full max-w-3xl flex-col gap-8 md:gap-12">
                <div className="flex flex-col gap-4 md:gap-6">
                    <div className="flex flex-col gap-3 md:gap-4">
                        <div>
                            <BadgeWithDot type="modern" size="lg" color="brand">
                                404 error
                            </BadgeWithDot>
                        </div>
                        <h1 className="text-display-md text-primary md:text-display-lg lg:text-display-xl font-semibold">Page not found</h1>
                    </div>
                    <p className="text-tertiary text-lg md:text-xl">Sorry, the page you are looking for doesn&apos;t exist.</p>
                </div>

                <div className="flex flex-col-reverse gap-3 sm:flex-row">
                    <Button size="xl" color="secondary" iconLeading={ArrowLeft}>
                        Go back
                    </Button>
                    <Button size="xl">Go home</Button>
                </div>

                <ul className="flex flex-col gap-6">
                    {links.map((link) => (
                        <li key={link.title} className="flex flex-col items-start gap-1">
                            <Button href="#" size="xl" color="link-color" iconTrailing={ArrowRight}>
                                {link.title}
                            </Button>
                            <p className="text-tertiary text-md">{link.description}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    </section>
);
