"use client";

import { Camera01, Link01 } from "@smarteraui/icons";
import { Avatar } from "@/components/base/avatar/avatar";
import { Button } from "@/components/base/buttons/button";
import { Facebook, LinkedIn, X } from "@/components/foundations/social-icons";
import { sortCx } from "@/utils/cx";
import { AVATARS, IMAGES } from "@/utils/demo-assets";

const author = AVATARS[0];

const styles = sortCx({
    /** Links rendered inside prose keep the prose underline but need our focus ring. */
    proseLink: "outline-focus-ring rounded-xs focus-visible:outline-2 focus-visible:outline-offset-2",
    /** The tinted panel that closes the article. */
    callout: "not-prose bg-secondary text-tertiary my-10 rounded-2xl px-5 py-6 text-lg md:my-12 md:p-8 [&>p+p]:mt-4.5",
});

/** A long-form article body with figures, a pull quote, a closing callout and an author footer. */
export const ContentSectionRichText01 = () => (
    <section className="bg-primary py-16 md:py-24">
        <div className="max-w-container mx-auto px-4 md:px-8">
            <div className="mx-auto max-w-prose md:max-w-180">
                <div className="prose md:prose-lg mx-auto">
                    <p className="lead">
                        A good review does two things at once: it shows the work, and it shows the thinking behind the work. Most decks only manage the first.
                        Here is the structure we use at Smartera to do both without doubling the length.
                    </p>

                    <hr />

                    <h2>Introduction</h2>
                    <p>
                        Every review starts from the same place: the people in the room did not watch the work happen. They arrive with their own context, their
                        own deadlines, and about four minutes of patience. The job of the first slide is to give them a reason to spend the next twenty.
                    </p>
                    <p>
                        So we open with the decision rather than the process. What are we asking for, what changes if we get it, and what happens if we do
                        nothing. Everything after that slide exists to support the answer, and anything that does not gets cut before the meeting rather than
                        skipped during it. You can read more about how we{" "}
                        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid -- placeholder href for a marketing section */}
                        <a href="#" className={styles.proseLink}>
                            structure research
                        </a>{" "}
                        before a review.
                    </p>

                    <figure>
                        <img className="h-60 md:h-120" src={IMAGES.landscape[0].src} alt="" />
                        <figcaption>
                            <Camera01 aria-hidden="true" className="text-utility-neutral-400 size-4" />
                            <span>
                                Image from the {/* eslint-disable-next-line jsx-a11y/anchor-is-valid -- placeholder href for a marketing section */}
                                <a href="#" className={styles.proseLink}>
                                    Smartera brand library
                                </a>
                            </span>
                        </figcaption>
                    </figure>

                    <p>
                        Sequence matters more than polish. When a reviewer can predict what comes next they stop bracing for surprises and start giving you real
                        feedback, which is the only thing the meeting was ever for.
                    </p>

                    <figure>
                        <blockquote>
                            <p>
                                The best review we ever ran lasted eleven minutes. We had answered every objection on the slide before anyone had to raise it.
                            </p>
                        </blockquote>
                        <figcaption className="not-prose text-md mt-6 md:mt-8">
                            — {author.name}, <cite className="not-italic">Product Designer</cite>
                        </figcaption>
                    </figure>

                    <p>
                        Write the objections down first. Ask the two people most likely to disagree what they would push back on, put those answers in the deck,
                        and credit them by name when you present. Disagreement handled in advance reads as rigour; disagreement handled live reads as a gap.
                    </p>
                    <p>
                        Keep one idea per slide and one sentence per idea. If a slide needs a paragraph it is really two slides, and the second one is usually
                        the interesting half. Long appendices are fine — nobody minds page forty as long as pages one through ten were honest.
                    </p>
                    <p>
                        Rehearse the transitions rather than the words. The sentences come out differently every time, but the order does not, and the order is
                        what people repeat a week later to someone who was not in the room.
                    </p>

                    <h3>Software and tools</h3>
                    <p>
                        We build decks in whatever the team already has open. Tooling arguments cost more hours than they save, and no reviewer has ever
                        approved a budget because the typography was set in the right application.
                    </p>
                    <p>
                        What does matter is a shared source for the numbers. Every figure links back to the dashboard that produced it, so when someone asks
                        where sixty-two per cent came from the answer takes four seconds instead of a follow-up email.
                    </p>

                    <h3>Other resources</h3>
                    <p>If you are putting a review together for the first time, three habits carry most of the weight:</p>
                    <ol>
                        <li>Write the recommendation before you write anything else.</li>
                        <li>Show one artefact per claim — a clip, a chart or a quote — and never more than one.</li>
                        <li>End with the decision you need and the date you need it by.</li>
                    </ol>

                    <figure>
                        <img className="h-110 md:h-210" src={IMAGES.square[1].src} alt="" />
                        <figcaption>
                            <Camera01 aria-hidden="true" className="text-utility-neutral-400 size-4" />
                            <span>
                                Image from the {/* eslint-disable-next-line jsx-a11y/anchor-is-valid -- placeholder href for a marketing section */}
                                <a href="#" className={styles.proseLink}>
                                    Smartera brand library
                                </a>
                            </span>
                        </figcaption>
                    </figure>

                    <p>
                        None of this is unique to design reviews. The same shape works for engineering proposals, pricing changes and hiring plans, because the
                        constraint is identical: attention is short and trust is earned in the first minute.
                    </p>
                    <p>
                        Start with the ask, defend it with the smallest possible amount of evidence, and leave the room with a decision. Everything else is
                        decoration.
                    </p>

                    <div className={styles.callout}>
                        <h2 className="text-display-xs text-primary mb-4 font-semibold">Conclusion</h2>
                        <p>A review is not a performance. It is a request for a decision, made in public, with the reasoning attached.</p>
                        <p>
                            Teams that treat it that way spend less time presenting and more time building, because the decisions actually survive the week
                            after the meeting.
                        </p>
                        <p>
                            Write the ask first. Cut anything that does not support it. Then hand the room the smallest set of facts that makes the answer
                            obvious.
                        </p>
                    </div>
                </div>

                <div className="border-secondary -mt-px flex flex-col items-start justify-between gap-y-8 border-t pt-6 md:flex-row">
                    <div className="flex items-center gap-3 md:gap-4">
                        <Avatar size="lg" className="md:size-14" src={author.src} alt={author.name} />
                        <div>
                            <p className="text-md text-primary font-semibold md:text-lg">{author.name}</p>
                            <p className="text-md text-tertiary">Product Designer, Smartera</p>
                        </div>
                    </div>

                    <div className="flex gap-3">
                        <Button size="md" color="secondary" iconLeading={Link01}>
                            Copy link
                        </Button>
                        <Button size="md" color="secondary" aria-label="Share on X" iconLeading={<X data-icon="leading" className="size-5" />} />
                        <Button size="md" color="secondary" aria-label="Share on LinkedIn" iconLeading={<LinkedIn data-icon="leading" className="size-5" />} />
                        <Button size="md" color="secondary" aria-label="Share on Facebook" iconLeading={<Facebook data-icon="leading" className="size-5" />} />
                    </div>
                </div>
            </div>
        </div>
    </section>
);
