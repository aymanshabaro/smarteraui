"use client";

import { ArrowNext, ArrowPrevious } from "@properui/icons";
import { sortCx } from "../../../utils/cx";
import { AVATARS, IMAGES } from "../../../utils/demo-assets";
import { Carousel } from "../../application/carousel/carousel-base";
import { Avatar } from "../../base/avatar/avatar";
import { Badge } from "../../base/badges/badges";

const author = AVATARS[10];
const quoted = AVATARS[0];

const gallery = [IMAGES.square[0], IMAGES.square[1], IMAGES.square[2], IMAGES.square[3], IMAGES.landscape[0]];

const styles = sortCx({
    /** Links inside prose keep the prose underline but need our focus ring. */
    proseLink: "outline-focus-ring rounded-xs focus-visible:outline-2 focus-visible:outline-offset-2",
    /** The tinted panel that closes the article. */
    callout: "not-prose bg-secondary text-tertiary my-8 rounded-2xl px-5 py-6 text-lg md:my-12 md:p-8 [&>p+p]:mt-4.5",
    /** The round previous/next controls under the gallery. */
    control:
        "group bg-primary ring-secondary hover:bg-secondary flex size-12 items-center justify-center rounded-full ring-1 backdrop-blur transition duration-100 ease-linear ring-inset disabled:cursor-not-allowed disabled:opacity-50 md:size-14",
    controlIcon: "text-fg-quaternary transition-inherit-all group-hover:text-fg-quaternary_hover size-5 md:size-6",
});

/** An interview header followed by a draggable image gallery and the article body. */
export const ContentAlternative02 = () => (
    <div className="bg-primary overflow-hidden">
        <div className="max-w-container mx-auto w-full px-4 py-16 md:px-8 md:py-24">
            <div className="max-w-3xl">
                <div className="text-brand-secondary md:text-md text-sm font-semibold">Published 13 Jan 2027</div>
                <h1 className="text-display-md text-primary md:text-display-lg mt-3 font-semibold">A conversation with Maker &amp; Co.</h1>
                <p className="text-tertiary mt-4 text-lg md:mt-6 md:text-xl">
                    Maker &amp; Co. are one of our favourite upcoming interior design studios. We caught up with the founders at their new workshop to talk
                    about everything they had to unlearn.
                </p>
            </div>

            <Carousel.Root aria-label="Studio photographs" className="mt-12 md:mt-16">
                <Carousel.Content overflowHidden={false} className="gap-6 pe-4 md:pe-8 lg:gap-8">
                    {gallery.map((image) => (
                        <Carousel.Item key={image.src} className="basis-auto">
                            <img alt="" src={image.src} className="size-auto max-h-90 max-w-90 cursor-grab object-contain lg:max-h-180 lg:max-w-180" />
                        </Carousel.Item>
                    ))}
                </Carousel.Content>

                <div className="mt-8 flex gap-4 md:gap-8">
                    <Carousel.PrevTrigger className={styles.control}>
                        <ArrowPrevious aria-hidden="true" className={styles.controlIcon} />
                    </Carousel.PrevTrigger>
                    <Carousel.NextTrigger className={styles.control}>
                        <ArrowNext aria-hidden="true" className={styles.controlIcon} />
                    </Carousel.NextTrigger>
                </div>
            </Carousel.Root>
        </div>

        <div className="max-w-container mx-auto px-4 pb-16 md:px-8 md:pb-24">
            <div className="mx-auto max-w-prose md:max-w-180">
                <div className="prose md:prose-lg mx-auto">
                    <h2>Introduction</h2>
                    <p>
                        The studio occupies the back half of a former joinery, which is either romantic or extremely cold depending on the month. The founders
                        moved in three years ago with a shared workbench and a rule that no project would be taken on twice.
                    </p>
                    <p>
                        That rule turned out to be the whole business model. Every commission has to teach them something, which sounds precious until you see
                        the catalogue and realise none of it repeats.
                    </p>

                    <figure>
                        <img className="h-110 md:h-240" src={IMAGES.square[1].src} alt="" />
                        <figcaption>
                            <span>
                                Image from the {/* eslint-disable-next-line jsx-a11y/anchor-is-valid -- placeholder href for a marketing section */}
                                <a href="#" className={styles.proseLink}>
                                    Proper UI brand library
                                </a>
                            </span>
                        </figcaption>
                    </figure>

                    <p>
                        We started by asking about the part nobody photographs: the four weeks between a signed brief and the first drawing, when the answer is
                        usually that the client wants something they have not been able to name yet.
                    </p>

                    <figure>
                        <blockquote>
                            <p>
                                Our best rooms are the ones where the client eventually told us what they actually wanted, which is never what they wrote down.
                            </p>
                        </blockquote>
                        <figcaption className="not-prose text-md mt-6 flex gap-3 md:mt-8">
                            <Avatar size="lg" src={quoted.src} alt={quoted.name} />
                            <div>
                                <p className="text-md text-primary font-semibold">{quoted.name}</p>
                                <cite className="text-md text-tertiary not-italic">Product Designer</cite>
                            </div>
                        </figcaption>
                    </figure>

                    <p>
                        Their process for getting there is deliberately unglamorous. Three visits before any drawing, photographs of everything the client
                        already owns, and a standing question about what they would take with them if they moved.
                    </p>
                    <p>
                        The answers rarely match the brief, and reconciling the two in public (with the client in the room) is where most of the real design
                        happens.
                    </p>

                    <h3>Software and tools</h3>
                    <p>
                        Almost none, by choice. Measurements go into one shared document, drawings are done by hand and scanned, and the only software either of
                        them will defend is the invoicing.
                    </p>
                    <p>
                        The argument is not nostalgia. It is that a rough drawing invites correction and a rendered one invites approval, and they would rather
                        be corrected early.
                    </p>

                    <h3>Other resources</h3>
                    <p>Asked what they would tell a studio starting now, they landed on three things:</p>
                    <ol>
                        <li>Visit the space three times before drawing anything.</li>
                        <li>Photograph what the client already owns and loves.</li>
                        <li>Charge for the thinking, not for the drawings.</li>
                    </ol>

                    <figure>
                        <img className="h-60 md:h-120" src={IMAGES.landscape[4].src} alt="" />
                        <figcaption>
                            <span>
                                Image from the {/* eslint-disable-next-line jsx-a11y/anchor-is-valid -- placeholder href for a marketing section */}
                                <a href="#" className={styles.proseLink}>
                                    Proper UI brand library
                                </a>
                            </span>
                        </figcaption>
                    </figure>

                    <p>
                        The workshop is expanding next spring, which they describe with a level of dread that suggests they know exactly what growth does to a
                        two-person studio.
                    </p>
                    <p>Their plan is to stay small enough that both founders are still on every job. We will check back in a year.</p>

                    <div className={styles.callout}>
                        <h2 className="text-display-xs text-primary mb-4 font-semibold">Conclusion</h2>
                        <p>The most useful idea from the whole conversation was the cheapest: show the rough version, and show it early.</p>
                        <p>It works in interiors for the same reason it works in software: approval is a worse signal than correction.</p>
                        <p>Maker &amp; Co. take on four commissions a year and are booked into next winter.</p>
                    </div>
                </div>

                <div className="border-secondary -mt-px flex flex-col items-start justify-between gap-y-6 border-t pt-6 md:flex-row">
                    <div className="flex items-center gap-3">
                        <Avatar size="lg" src={author.src} alt={author.name} />
                        <div>
                            <p className="text-md text-primary font-semibold">{author.name}</p>
                            <p className="text-md text-tertiary">Content Writer</p>
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <Badge color="brand">Design</Badge>
                        <Badge color="indigo">Architecture</Badge>
                        <Badge color="pink">Interviews</Badge>
                    </div>
                </div>
            </div>
        </div>
    </div>
);
