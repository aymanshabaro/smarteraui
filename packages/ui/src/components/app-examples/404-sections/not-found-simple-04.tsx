"use client";

import { ArrowLeft, ArrowRight, BookOpen01, CodeSquare02, MessageChatCircle } from "@properui/icons";
import { Button } from "@/components/base/buttons/button";

/** The onward links, shown as filled cards under the headline. */
const links = [
    { title: "Documentation", description: "Dive in to learn all about our product.", cta: "Start learning", icon: CodeSquare02 },
    { title: "Our blog", description: "Read the latest posts on our blog.", cta: "View latest posts", icon: BookOpen01 },
    { title: "Chat to us", description: "Can't find what you're looking for?", cta: "Chat to our team", icon: MessageChatCircle },
];

/** A centred 404 above a three-up row of help cards. */
export const NotFoundSimple04 = () => (
    <section className="bg-primary py-16 md:py-24">
        <div className="max-w-container mx-auto flex flex-col gap-16 px-4 md:gap-24 md:px-8">
            <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-8 text-center md:gap-12">
                <div className="flex flex-col gap-4 md:gap-6">
                    <div className="flex flex-col gap-3">
                        <span className="text-brand-secondary text-md font-semibold">404 error</span>
                        <h1 className="text-display-md text-primary md:text-display-lg lg:text-display-xl font-semibold">We lost this page</h1>
                    </div>
                    <p className="text-tertiary text-lg md:text-xl">
                        We searched high and low, but couldn&apos;t find what you&apos;re looking for. <br className="max-md:hidden" /> Let&apos;s find a better
                        place for you to go.
                    </p>
                </div>

                <div className="flex flex-col-reverse gap-3 self-stretch md:flex-row md:self-auto">
                    <Button size="xl" color="secondary" iconLeading={ArrowLeft}>
                        Go back
                    </Button>
                    <Button size="xl">Go home</Button>
                </div>
            </div>

            <div className="mx-auto w-full">
                <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-8 md:grid-cols-3">
                    {links.map((link) => (
                        <li key={link.title} className="bg-secondary flex flex-col gap-8 p-5 text-start md:gap-12 md:p-6">
                            <link.icon aria-hidden="true" className="text-icon-fg-brand size-6" />

                            <div className="flex flex-col items-start gap-4 md:gap-5">
                                <div className="flex flex-col gap-1 md:gap-2">
                                    <h2 className="text-primary text-lg font-semibold">{link.title}</h2>
                                    <p className="text-tertiary text-md">{link.description}</p>
                                </div>

                                <Button href="#" size="lg" color="link-color" iconTrailing={ArrowRight}>
                                    {link.cta}
                                </Button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    </section>
);
