"use client";

import { Camera01, Link01 } from "@properui/icons";
import { sortCx } from "../../../utils/cx";
import { AVATARS, IMAGES } from "../../../utils/demo-assets";
import { Avatar } from "../../base/avatar/avatar";
import { BadgeGroup } from "../../base/badges/badge-groups";
import { Badge } from "../../base/badges/badges";
import { Button } from "../../base/buttons/button";
import { Facebook, LinkedIn, X } from "../../foundations/social-icons";

const author = AVATARS[5];
const quoted = AVATARS[0];

const tableOfContents = ["Introduction", "Software and tools", "Other resources", "Conclusion"];

const styles = sortCx({
    /** Links inside prose keep the prose underline but need our focus ring. */
    proseLink: "outline-focus-ring rounded-xs focus-visible:outline-2 focus-visible:outline-offset-2",
    /** The tinted panel that closes the article. */
    callout: "not-prose bg-secondary text-tertiary my-8 rounded-2xl px-5 py-6 text-lg md:my-12 md:p-8 [&>p+p]:mt-4.5",
    /** The horizontal rules that separate the sidebar blocks. */
    divider: "border-secondary w-full border-t",
});

const shareButtons = (
    <>
        <Button size="md" color="secondary" aria-label="Copy link" iconLeading={Link01} />
        <Button size="md" color="secondary" aria-label="Share on X" iconLeading={<X data-icon="leading" className="size-5" />} />
        <Button size="md" color="secondary" aria-label="Share on LinkedIn" iconLeading={<LinkedIn data-icon="leading" className="size-5" />} />
        <Button size="md" color="secondary" aria-label="Share on Facebook" iconLeading={<Facebook data-icon="leading" className="size-5" />} />
    </>
);

/** An overlapping header with a hand-drawn flourish, plus a table of contents beside the article. */
export const ContentSplitImage01 = () => (
    <div className="bg-primary">
        <div className="max-w-container relative mx-auto flex flex-col items-center px-4 py-16 md:flex-row md:px-8 md:pt-16 md:pb-24">
            <div className="flex max-w-180 flex-col items-start md:absolute">
                <BadgeGroup color="brand" addonText="Design" iconTrailing={null} className="pe-3">
                    8 min read
                </BadgeGroup>

                <h1 className="text-display-md text-primary md:text-display-xl mt-4 font-semibold">How collaboration makes us better designers</h1>
                <p className="text-tertiary mt-4 max-w-140 text-lg md:mt-6 md:text-xl">
                    Collaboration can make our teams stronger and our individual designs better. Here is how to do it better.
                </p>

                <div className="mt-8 flex items-center gap-3 md:mt-12">
                    <Avatar size="lg" src={author.src} alt={author.name} />
                    <div>
                        <p className="text-md text-primary font-semibold">{author.name}</p>
                        <p className="text-md text-tertiary">Published 14 Jan 2027</p>
                    </div>
                </div>
            </div>

            <img className="mt-16 h-100 w-full object-cover md:ms-auto md:mt-0 md:h-180 md:w-140 md:max-w-[50vw]" src={IMAGES.landscape[2].src} alt="" />

            <svg
                aria-hidden="true"
                className="text-fg-primary absolute start-1/2 bottom-[53px] hidden -translate-x-[62%] lg:block"
                width="349"
                height="337"
                viewBox="0 0 349 337"
                fill="none"
            >
                <path
                    d="M8 329C40 260 8 214 62 205c48-8 55 61 20 79-38 20-63-33-33-73 34-45 96 34 130 12 33-21-6-84 27-107 35-24 70 42 98 21"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="round"
                />
            </svg>
        </div>

        <div className="max-w-container mx-auto px-4 pb-16 md:px-8 md:pb-24">
            <div className="mx-auto flex justify-center gap-16">
                <div className="hidden w-60 flex-col gap-8 md:flex">
                    <div className={styles.divider} />

                    <nav aria-label="Table of contents" className="flex flex-col gap-4">
                        <p className="text-md text-brand-secondary font-semibold">Table of contents</p>
                        <ul className="flex flex-col gap-3">
                            {tableOfContents.map((entry) => (
                                <li key={entry}>
                                    <Button href="#" size="lg" color="link-gray">
                                        {entry}
                                    </Button>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <div className={styles.divider} />

                    <div className="flex gap-3">{shareButtons}</div>
                </div>

                <div className="max-w-prose md:max-w-180">
                    <div className="prose md:prose-lg mx-auto">
                        <p className="lead">
                            Designing alone is faster right up until the moment somebody else has to build, sell or support the thing you designed. After that
                            it is the slowest option available.
                        </p>

                        <hr />

                        <h2>Introduction</h2>
                        <p>
                            The version of collaboration most teams practise is really approval: work is made in private, shown at the end, and defended. It
                            looks collaborative because there is a meeting, but nothing about the design was ever genuinely up for discussion.
                        </p>
                        <p>
                            Real collaboration is earlier and less comfortable. It means showing the rough version, naming the parts you are unsure about, and
                            inviting the engineer to tell you which of your three layouts is going to cost a fortnight.
                        </p>

                        <figure>
                            <img className="h-60 md:h-120" src={IMAGES.landscape[0].src} alt="" />
                            <figcaption>Image from the Proper UI brand library</figcaption>
                        </figure>

                        <p>
                            The trade is straightforward: you give up some autonomy over the first draft and get back a design that survives contact with
                            production. Most designers find that a good deal after the first project.
                        </p>

                        <figure>
                            <blockquote>
                                <p>The best critique I ever got arrived two days into the work, not two weeks. It cost me an afternoon instead of a sprint.</p>
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
                            Structure helps. Say what kind of feedback you want before you show anything, and say what is already settled. Without that, every
                            review defaults to the loudest available opinion.
                        </p>
                        <p>
                            Write decisions down in the file rather than in a thread. A design with its reasoning attached can be handed to someone new; a
                            design without it has to be re-argued every time it is questioned.
                        </p>
                        <p>
                            And close the loop. Tell people what you did with their feedback, including the parts you rejected and why. Ignored feedback is how
                            you teach a team to stop giving it.
                        </p>

                        <h3>Software and tools</h3>
                        <p>
                            Shared files beat exported images, and comments beat screenshots pasted into chat. Beyond that, the tool matters far less than
                            whether people feel allowed to open it and poke at your work.
                        </p>
                        <p>
                            One rule worth enforcing: whatever the source of truth is, there is exactly one of it. Two half-current files cost more goodwill
                            than any feature ever bought.
                        </p>

                        <h3>Other resources</h3>
                        <p>If you want to make collaboration a habit rather than an event, start here:</p>
                        <ol>
                            <li>Share the version you would normally be embarrassed to share.</li>
                            <li>State the question you want answered before you present anything.</li>
                            <li>Record what changed and who changed your mind.</li>
                        </ol>

                        <figure>
                            <img className="h-110 md:h-240" src={IMAGES.square[3].src} alt="" />
                            <figcaption>
                                <Camera01 aria-hidden="true" className="text-utility-neutral-400 size-4" />
                                <span>
                                    Image from the {/* eslint-disable-next-line jsx-a11y/anchor-is-valid -- placeholder href for a marketing section */}
                                    <a href="#" className={styles.proseLink}>
                                        Proper UI brand library
                                    </a>
                                </span>
                            </figcaption>
                        </figure>

                        <p>
                            None of this requires a new process document. It requires one person to show unfinished work on purpose and to be visibly better off
                            for having done it.
                        </p>
                        <p>Do that twice and the rest of the team will follow without being asked.</p>

                        <div className={styles.callout}>
                            <h2 className="text-display-xs text-primary mb-4 font-semibold">Conclusion</h2>
                            <p>Collaboration is not a meeting. It is the decision to be wrong in front of people while it is still cheap.</p>
                            <p>
                                Teams that make that decision early ship designs that survive engineering, support and the second month of use, which is the
                                only test that counts.
                            </p>
                            <p>Show the rough version. Ask a specific question. Say what you did with the answer.</p>
                        </div>
                    </div>

                    <div className="border-secondary -mt-px flex flex-col items-start justify-between gap-y-6 border-t pt-6 md:flex-row">
                        <div className="flex gap-2">
                            <Badge color="brand">Design</Badge>
                            <Badge color="indigo">Research</Badge>
                        </div>

                        <div className="flex gap-3 md:hidden">{shareButtons}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);
