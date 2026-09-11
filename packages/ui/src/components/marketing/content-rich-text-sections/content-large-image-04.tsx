"use client";

import { Link01 } from "@properui/icons";
import { sortCx } from "../../../utils/cx";
import { AVATARS, IMAGES } from "../../../utils/demo-assets";
import { Avatar } from "../../base/avatar/avatar";
import { Badge } from "../../base/badges/badges";
import { Button } from "../../base/buttons/button";
import { Facebook, LinkedIn, X } from "../../foundations/social-icons";

const author = AVATARS[0];

const styles = sortCx({
    /** Links inside prose keep the prose underline but need our focus ring. */
    proseLink: "outline-focus-ring rounded-xs focus-visible:outline-2 focus-visible:outline-offset-2",
    /** The tinted panel that closes the article. */
    callout: "not-prose bg-secondary text-tertiary my-8 rounded-2xl px-5 py-6 text-lg md:my-12 md:p-8 [&>p+p]:mt-4.5",
});

/** A branded header band with the hero image pulled up over its lower edge. */
export const ContentLargeImage04 = () => (
    <div className="bg-primary">
        <div className="bg-brand-section w-full py-16 pb-32 md:pt-24 md:pb-40">
            <div className="max-w-container mx-auto px-4 md:px-8">
                <div className="mx-auto flex w-full max-w-240 flex-col items-center text-center">
                    <span className="text-primary_on-brand md:text-md text-sm font-semibold">Design</span>
                    <h1 className="text-display-md text-tertiary_on-brand md:text-display-lg mt-3 font-semibold">What is wireframing?</h1>
                    <p className="text-primary_on-brand mt-4 max-w-3xl text-lg md:mt-6 md:text-xl">
                        An introduction to wireframing and its principles. Learn from the best in the industry with tips, tools and practices from those in the
                        know.
                    </p>

                    <div className="mt-8 flex items-center gap-3 text-start">
                        <Avatar size="lg" src={author.src} alt={author.name} />
                        <div>
                            <p className="text-md text-tertiary_on-brand font-semibold">{author.name}</p>
                            <p className="text-md text-primary_on-brand">20 Jan 2027</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className="max-w-container mx-auto px-4 pb-16 md:px-8 md:pb-24">
            <img className="mx-auto -mt-16 h-60 w-full object-cover md:-mt-24 md:h-160" src={IMAGES.landscape[1].src} alt="" />

            <div className="mx-auto max-w-prose pt-16 md:max-w-180 md:pt-24">
                <div className="prose md:prose-lg mx-auto">
                    <p className="lead">
                        A wireframe is an argument about hierarchy, made cheaply enough that you can be wrong twice before lunch. Everything else it appears to
                        be (layout, spacing, copy) is a side effect.
                    </p>

                    <hr />

                    <h2>Introduction</h2>
                    <p>
                        Wireframes exist because the alternative is arguing about a finished screen. Once a design has colour and photography in it, feedback
                        drifts towards taste, and the structural question you actually needed answered goes unasked.
                    </p>
                    <p>
                        Strip those out and the conversation changes. People stop saying they dislike the blue and start saying they cannot find the thing they
                        came for, which is the only feedback worth having at this stage.
                    </p>

                    <figure>
                        <img className="h-110 md:h-210" src={IMAGES.square[2].src} alt="" />
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
                        Keep the fidelity low enough that nobody mistakes it for a decision. Grey boxes and real words beat lorem ipsum and rounded corners
                        every time, because the words are what people will actually read.
                    </p>

                    <figure>
                        <blockquote>
                            <p>
                                If a wireframe takes more than an hour, it has stopped being a wireframe and started being a design you are now emotionally
                                attached to.
                            </p>
                        </blockquote>
                        <figcaption className="not-prose text-md mt-6 md:mt-8">
                            {author.name}, <cite className="not-italic">Product Designer</cite>
                        </figcaption>
                    </figure>

                    <p>
                        Write the real copy first, even if it is wrong. Layout follows language far more reliably than language follows layout, and a heading
                        you cannot write is usually a section you do not need.
                    </p>
                    <p>
                        Then test the smallest thing: give someone the wireframe and a task, and watch where they hesitate. Two people is enough to find the
                        problems that matter at this fidelity.
                    </p>

                    <h3>Software and tools</h3>
                    <p>
                        Any tool works. Paper works. What matters is that the artefact is quick to throw away, because a wireframe you are reluctant to delete
                        has already failed at its job.
                    </p>
                    <p>
                        If your team shares a component library, borrow only its spacing scale at this stage. Reaching for finished components pulls you into
                        visual decisions you have not earned yet.
                    </p>

                    <h3>Other resources</h3>
                    <p>Three habits carry most of the weight when you are starting out:</p>
                    <ol>
                        <li>Sketch three layouts before you refine one.</li>
                        <li>Use real content, in the real quantity you expect to have.</li>
                        <li>Show it to someone who was not in the room when you made it.</li>
                    </ol>

                    <figure>
                        <img className="h-86 md:h-120 lg:h-180" src={IMAGES.landscape[4].src} alt="" />
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
                        None of this is unique to interface design. The same shape works for API design and org charts, because the constraint is identical:
                        make the structure visible before it becomes expensive.
                    </p>
                    <p>Start rough, get it wrong quickly, and keep the version that answered the question rather than the one that looked best.</p>

                    <div className={styles.callout}>
                        <h2 className="text-display-xs text-primary mb-4 font-semibold">Conclusion</h2>
                        <p>A wireframe is a question, not a deliverable. If it does not have a question attached, it is decoration with the colour removed.</p>
                        <p>
                            Teams that treat it that way move faster, because the arguments happen while the work is still cheap to change rather than the week
                            before launch.
                        </p>
                        <p>Write the question, sketch the smallest thing that answers it, and throw away everything that did not.</p>
                    </div>
                </div>

                <div className="border-secondary -mt-px flex flex-col items-start justify-between gap-y-6 border-t pt-6 md:flex-row md:items-center">
                    <div className="flex gap-2">
                        <Badge color="sky">Design</Badge>
                        <Badge color="pink">Research</Badge>
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
    </div>
);
