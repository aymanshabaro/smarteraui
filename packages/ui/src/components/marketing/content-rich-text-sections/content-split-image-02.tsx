"use client";

import { Camera01, Link01 } from "@properui/icons";
import { Avatar } from "@/components/base/avatar/avatar";
import { Button } from "@/components/base/buttons/button";
import { Facebook, LinkedIn, X } from "@/components/foundations/social-icons";
import { sortCx } from "@/utils/cx";
import { AVATARS, IMAGES } from "@/utils/demo-assets";

const author = AVATARS[6];
const quoted = AVATARS[0];

const styles = sortCx({
    /** Links inside prose keep the prose underline but need our focus ring. */
    proseLink: "outline-focus-ring rounded-xs focus-visible:outline-2 focus-visible:outline-offset-2",
    /** The tinted panel that closes the article. */
    callout: "not-prose bg-secondary text-tertiary my-8 rounded-2xl px-5 py-6 text-lg md:my-12 md:p-8 [&>p+p]:mt-4.5",
});

/** A half-and-half header with the portrait framed on a tinted panel. */
export const ContentSplitImage02 = () => (
    <div className="bg-primary">
        <div className="flex flex-col gap-16 py-16 md:flex-row md:gap-0 md:py-0">
            <div className="flex md:w-1/2 md:items-end md:justify-end md:py-24">
                <div className="flex w-full max-w-(--breakpoint-sm) flex-col px-4 md:px-8">
                    <span className="text-brand-secondary md:text-md text-sm font-semibold">13 Jan 2027 • 10 min read</span>
                    <h1 className="text-display-md text-primary md:text-display-lg mt-3 font-semibold md:mt-4">Our top 10 JavaScript frameworks to use</h1>
                    <p className="text-tertiary mt-4 text-lg md:mt-6 md:max-w-120 md:text-xl">
                        JavaScript frameworks make development easy with extensive features and functionality.
                    </p>

                    <div className="mt-8 flex items-center gap-3 md:mt-12">
                        <Avatar size="lg" src={author.src} alt={author.name} />
                        <div>
                            <p className="text-md text-primary font-semibold">{author.name}</p>
                            <p className="text-md text-tertiary">Frontend Engineer</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="md:bg-secondary flex items-center justify-center px-4 md:h-180 md:w-1/2 md:p-8">
                <img alt="" className="h-100 w-full object-cover md:h-140 md:w-100" src={IMAGES.square[0].src} />
            </div>
        </div>

        <div className="max-w-container mx-auto px-4 pb-16 md:px-8 md:py-24">
            <div className="mx-auto max-w-prose md:max-w-180">
                <div className="prose md:prose-lg mx-auto">
                    <h2>Introduction</h2>
                    <p>
                        Framework comparisons age badly, so this list is organised by the decision you are actually making rather than by benchmark. Most of the
                        time that decision is about hiring and maintenance, not milliseconds.
                    </p>
                    <p>
                        The honest summary is that the top five choices are all fine. What separates them is the shape of the team you already have and the
                        shape of the problem you are solving.
                    </p>

                    <figure>
                        <img className="h-60 md:h-120" src={IMAGES.landscape[0].src} alt="" />
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
                        Start with rendering. If most of your pages are content, pick something that renders on the server by default. If most of your pages are
                        an application behind a login, that constraint mostly disappears and ergonomics matter more.
                    </p>

                    <figure>
                        <blockquote>
                            <p>We changed framework twice in four years and both migrations cost more than every performance win they delivered, combined.</p>
                        </blockquote>
                        <figcaption className="not-prose text-md mt-6 md:mt-8">
                            — {quoted.name}, <cite className="not-italic">Product Designer</cite>
                        </figcaption>
                    </figure>

                    <p>
                        Then look at the escape hatches. Every framework is pleasant inside the paved path; what matters is how much work it takes to do the one
                        unusual thing your product needs, because you will need it in month three.
                    </p>
                    <p>
                        Finally, weigh the ecosystem the way you would weigh a dependency. A smaller framework with three maintained integrations you need beats
                        a popular one with none.
                    </p>

                    <h3>Software and tools</h3>
                    <p>
                        Whatever you choose, standardise the surrounding tooling on day one. Formatting, linting and a single test runner remove more friction
                        over a year than any framework feature adds.
                    </p>
                    <p>
                        Keep the build understandable. If nobody on the team can explain what happens between source and bundle, upgrades stop happening and you
                        inherit a museum.
                    </p>

                    <h3>Other resources</h3>
                    <p>Three questions will settle most framework arguments faster than a benchmark:</p>
                    <ol>
                        <li>Who on this team has shipped it to production before?</li>
                        <li>What does the upgrade path look like for the last two major versions?</li>
                        <li>How long does a new hire take to make their first safe change?</li>
                    </ol>

                    <figure>
                        <img className="h-60 md:h-120" src={IMAGES.landscape[4].src} alt="" />
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
                        None of this is a recommendation to stop learning new tools. It is a recommendation to be honest about which costs land on you and which
                        land on whoever is on call in eighteen months.
                    </p>
                    <p>Pick the boring option unless you can name the specific problem the interesting one solves.</p>

                    <div className={styles.callout}>
                        <h2 className="text-display-xs text-primary mb-4 font-semibold">Conclusion</h2>
                        <p>The framework is rarely the bottleneck. The bottleneck is how quickly a new person can change something without breaking it.</p>
                        <p>Optimise for that and most of the other trade-offs stop mattering within a quarter.</p>
                        <p>Choose what your team can maintain, write down why, and revisit the decision only when the reason stops being true.</p>
                    </div>
                </div>

                <div className="border-secondary -mt-px flex flex-col items-start justify-between gap-y-6 border-t pt-6 md:flex-row md:items-center">
                    <p className="text-md text-tertiary font-semibold">Share this post</p>

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
