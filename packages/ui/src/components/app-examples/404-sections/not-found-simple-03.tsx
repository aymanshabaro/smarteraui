"use client";

import { ArrowLeft, ArrowRight, BookOpen01, CodeSquare02, MessageChatCircle, SearchLg } from "@properui/icons";
import { Button } from "../../base/buttons/button";
import { FeaturedIcon } from "../../foundations/featured-icon/featured-icon";
import { BackgroundPattern } from "../../shared-assets/background-patterns";

/** The onward links, shown as cards below the actions on small screens. */
const links = [
    { title: "Documentation", description: "Dive in to learn all about our product.", cta: "Start learning", icon: CodeSquare02 },
    { title: "Our blog", description: "Read the latest posts on our blog.", cta: "View latest posts", icon: BookOpen01 },
    { title: "Chat to us", description: "Can't find what you're looking for?", cta: "Chat to our team", icon: MessageChatCircle },
];

/** A centred 404 with a featured search icon over a fading grid pattern. */
export const NotFoundSimple03 = () => (
    <section className="bg-primary flex min-h-screen items-center justify-center overflow-hidden py-16 md:py-24">
        <div className="max-w-container mx-auto w-full grow px-4 md:px-8">
            <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-16 text-center">
                <div className="flex flex-col items-center justify-center gap-8 md:gap-12">
                    <div className="z-10 flex flex-col items-center justify-center gap-4 md:gap-6">
                        <div className="relative">
                            <FeaturedIcon icon={SearchLg} size="xl" theme="modern" color="gray" className="z-10 hidden md:flex" />
                            <FeaturedIcon icon={SearchLg} size="lg" theme="modern" color="gray" className="z-10 md:hidden" />

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

                        <h1 className="text-display-md text-primary md:text-display-lg lg:text-display-xl z-10 font-semibold">Page not found</h1>
                        <p className="text-tertiary z-10 text-lg md:text-xl">
                            The page you are looking for doesn&apos;t exist. <br className="max-md:hidden" /> Here are some helpful links:
                        </p>
                    </div>

                    <div className="z-10 flex flex-col-reverse gap-3 self-stretch md:flex-row md:self-auto">
                        <Button size="xl" color="secondary" iconLeading={ArrowLeft}>
                            Go back
                        </Button>
                        <Button size="xl">Take me home</Button>
                    </div>
                </div>

                <div className="z-10 md:hidden">
                    <ul className="grid w-full grid-cols-1 justify-items-center gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
                        {links.map((link) => (
                            <li key={link.title} className="flex max-w-sm flex-col items-center gap-4 text-center">
                                <FeaturedIcon icon={link.icon} size="md" theme="modern" color="gray" />

                                <div className="flex flex-col gap-1 text-center">
                                    <h2 className="text-primary text-lg font-semibold">{link.title}</h2>
                                    <p className="text-tertiary text-md">{link.description}</p>
                                </div>

                                <Button href="#" size="lg" color="link-color" iconTrailing={ArrowRight} className="whitespace-pre">
                                    {link.cta}
                                </Button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    </section>
);
