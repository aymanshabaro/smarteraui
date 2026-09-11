"use client";

import { Compass03, Link01 } from "@properui/icons";
import { sortCx } from "../../../utils/cx";
import { AVATARS, IMAGES } from "../../../utils/demo-assets";
import { Avatar } from "../../base/avatar/avatar";
import { Button } from "../../base/buttons/button";
import { Facebook, LinkedIn, X } from "../../foundations/social-icons";

const author = AVATARS[0];

const styles = sortCx({
    /** Links inside prose keep the prose underline but need our focus ring. */
    proseLink: "outline-focus-ring rounded-xs focus-visible:outline-2 focus-visible:outline-offset-2",
    /** The underlined byline link in the header. */
    bylineLink: "outline-focus-ring rounded-xs underline underline-offset-3 focus-visible:outline-2 focus-visible:outline-offset-2",
    /** The tinted panel that closes the article. */
    callout: "not-prose bg-secondary text-tertiary my-8 rounded-2xl px-5 py-6 text-lg md:my-12 md:p-8 [&>p+p]:mt-4.5",
});

/** An editorial header set against a full-height image, with a two-line display title. */
export const ContentAlternative03 = () => (
    <div className="bg-primary">
        <div className="grid grid-cols-1 gap-16 px-4 py-16 md:grid-cols-2 md:justify-items-start md:gap-0 md:p-0">
            <div className="flex w-full max-w-(--breakpoint-sm) flex-col justify-between md:ps-16 md:pe-8 md:pt-24 md:pb-16">
                <Compass03 aria-hidden="true" className="text-fg-quaternary size-6" />

                <h1 className="text-display-md text-primary md:text-display-lg mt-4 font-semibold">
                    Roy&apos;s Peak <br />
                    <span className="text-quaternary">Wanaka, New Zealand</span>
                </h1>
                <p className="text-tertiary mt-4 text-lg md:mt-6 md:text-xl">
                    New Zealand is famous for hiking trails that weave their way through some genuinely unreasonable landscapes. This one is the most
                    photographed of them, and still worth the queue.
                </p>

                <div className="mt-8 flex items-center gap-3 md:mt-auto">
                    <Avatar size="lg" src={author.src} alt={author.name} />
                    <div>
                        <p className="text-md text-primary font-semibold">{author.name}</p>
                        <p className="text-md text-tertiary">
                            Published in {/* eslint-disable-next-line jsx-a11y/anchor-is-valid -- placeholder href for a marketing section */}
                            <a href="#" className={styles.bylineLink}>
                                Adventure
                            </a>
                        </p>
                    </div>
                </div>
            </div>

            <img alt="" className="h-80 w-full object-cover md:order-first md:h-200" src={IMAGES.landscape[5].src} />
        </div>

        <div className="max-w-container mx-auto px-4 pb-16 md:px-8 md:py-24">
            <div className="mx-auto max-w-prose md:max-w-180">
                <div className="prose-minimal-quote prose md:prose-lg mx-auto">
                    <p className="lead">
                        Sixteen kilometres, twelve hundred metres of climb, and no shade for any of it. The track is not technical, which is exactly why people
                        underestimate it.
                    </p>

                    <hr />

                    <h2>Introduction</h2>
                    <p>
                        The trailhead sits six kilometres outside town on the lakefront road. There is a car park, a long-drop toilet and a sign that tells you
                        the return trip takes five to six hours, which is honest rather than optimistic.
                    </p>
                    <p>
                        From the gate the track climbs immediately and does not stop. It is farmland for the first two hours — open, exposed and grazed — and
                        the views arrive early enough that most people stop far too often in the first kilometre.
                    </p>

                    <figure>
                        <img className="h-60 md:h-120" src={IMAGES.landscape[1].src} alt="" />
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
                        The famous photograph is taken from a spur about forty minutes below the summit. There is usually a line for it, and the light is best
                        before nine, which means leaving the car park in the dark.
                    </p>

                    <figure>
                        <blockquote>
                            <p>Everyone photographs the spur and nobody photographs the last forty minutes, which is the part you actually remember.</p>
                        </blockquote>
                        <figcaption className="not-prose text-md mt-6 md:mt-8">
                            — {author.name}, <cite className="not-italic">Product Designer</cite>
                        </figcaption>
                    </figure>

                    <p>
                        Above the spur the farmland gives way to tussock and the wind picks up properly. The summit itself is a trig point and a view down the
                        length of the lake, and it is almost always ten degrees colder than the car park.
                    </p>
                    <p>
                        Coming down is harder on the knees than going up is on the lungs. Poles help more than they look like they should, and the last hour is
                        the one where people turn ankles.
                    </p>

                    <h3>Software and tools</h3>
                    <p>
                        Download the map before you leave town; reception disappears about twenty minutes above the gate and does not return until you are on
                        the way back down.
                    </p>
                    <p>
                        Three litres of water per person in summer, more than you think in the way of sunscreen, and a layer you will not want to carry but will
                        want at the top.
                    </p>

                    <h3>Other resources</h3>
                    <p>If you are planning to walk it, three things decide how the day goes:</p>
                    <ol>
                        <li>Start before sunrise, both for the light and for the heat.</li>
                        <li>Check whether the track is closed for lambing — it usually is in October.</li>
                        <li>Book accommodation in town rather than driving in from Queenstown.</li>
                    </ol>

                    <figure>
                        <img className="h-60 md:h-120" src={IMAGES.landscape[7].src} alt="" />
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
                        It is a busy track and it will stay one. If solitude is the point, there are quieter climbs an hour further up the valley with almost
                        the same view and none of the queue.
                    </p>
                    <p>But if you are only in Wanaka for a day, this is the one to do, and it is worth setting an alarm for.</p>

                    <div className={styles.callout}>
                        <h2 className="text-display-xs text-primary mb-4 font-semibold">Conclusion</h2>
                        <p>Roy&apos;s Peak is not a hard walk, it is a long one, and the difference catches people out every summer.</p>
                        <p>Start early, carry more water than feels sensible, and give yourself six hours rather than four.</p>
                        <p>Do that and it is one of the best days on foot anywhere in the South Island.</p>
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
