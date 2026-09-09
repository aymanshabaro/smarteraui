"use client";

import { ArrowLeft, ArrowRight, BookOpen01, Cube01, MessageChatCircle, SearchLg } from "@smarteraui/icons";
import { BadgeWithDot } from "@/components/base/badges/badges";
import { Button } from "@/components/base/buttons/button";
import { Form } from "@/components/base/form/form";
import { Input } from "@/components/base/input/input";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";
import { BackgroundPattern } from "@/components/shared-assets/background-patterns";

/** The onward links, listed as separated rows below the actions. */
const links = [
    { title: "Documentation", description: "Dive in to learn all about our product.", icon: Cube01 },
    { title: "Our blog", description: "Read the latest posts on our blog.", icon: BookOpen01 },
    { title: "Chat to us", description: "Can't find what you're looking for?", icon: MessageChatCircle },
];

/** A centred 404 badge over a grid pattern, with a mobile search and a divided link list. */
export const NotFoundSimple06 = () => (
    <section className="bg-primary overflow-hidden py-16 md:py-24">
        <div className="max-w-container mx-auto flex flex-col gap-8 px-4 md:gap-16 md:px-8">
            <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-8 text-center md:gap-12">
                <div className="flex flex-col items-center gap-4 md:gap-6">
                    <div className="flex flex-col justify-center gap-3">
                        <div className="flex flex-col items-center gap-4">
                            <div className="relative w-max">
                                <span className="relative z-10">
                                    <BadgeWithDot type="modern" size="lg" color="brand">
                                        404 error
                                    </BadgeWithDot>
                                </span>

                                <BackgroundPattern
                                    pattern="grid"
                                    size="lg"
                                    className="pointer-events-none absolute top-1/2 left-1/2 z-0 hidden -translate-x-1/2 -translate-y-1/2 md:block"
                                />
                                <BackgroundPattern
                                    pattern="grid"
                                    size="md"
                                    className="pointer-events-none absolute top-1/2 left-1/2 z-0 -translate-x-1/2 -translate-y-1/2 md:hidden"
                                />
                            </div>

                            <h1 className="text-display-md text-primary md:text-display-lg lg:text-display-xl z-10 font-semibold">
                                <span className="hidden md:inline">We can&apos;t find this page</span>
                                <span className="md:hidden">We lost this page</span>
                            </h1>
                        </div>
                    </div>

                    <p className="text-tertiary z-10 text-lg md:text-xl">The page you are looking for doesn&apos;t exist or has been moved.</p>
                </div>

                <Form className="z-10 flex w-full flex-col gap-4 md:hidden">
                    <Input isRequired size="lg" type="search" name="search" icon={SearchLg} placeholder="Search our site" inputClassName="md:py-3!" />

                    <Button type="submit" size="lg" color="secondary" className="w-full">
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

            <div className="mx-auto flex w-full items-center justify-center">
                <ul className="grid w-full grid-cols-1 gap-5 md:max-w-140">
                    {links.map((link) => (
                        <li
                            key={link.title}
                            className="border-secondary flex flex-col gap-4 border-t pt-5 text-left last:border-b last:pb-5 md:flex-row md:gap-5"
                        >
                            <FeaturedIcon icon={link.icon} size="lg" theme="modern" color="gray" className="hidden md:flex" />
                            <FeaturedIcon icon={link.icon} size="md" theme="modern" color="gray" className="md:hidden" />

                            <div className="flex w-full flex-row items-start justify-between gap-2 md:gap-5">
                                <div className="flex flex-col gap-1">
                                    <h2 className="text-primary text-lg font-semibold">{link.title}</h2>
                                    <p className="text-tertiary text-md">{link.description}</p>
                                </div>

                                <ArrowRight aria-hidden="true" className="text-fg-quaternary size-6 shrink-0" />
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    </section>
);
