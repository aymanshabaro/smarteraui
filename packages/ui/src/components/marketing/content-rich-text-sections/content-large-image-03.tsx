"use client";

import { Camera01, Link01, Mail01 } from "@properui/icons";
import { sortCx } from "../../../utils/cx";
import { AVATARS, IMAGES } from "../../../utils/demo-assets";
import { Avatar } from "../../base/avatar/avatar";
import { BadgeGroup } from "../../base/badges/badge-groups";
import { Button } from "../../base/buttons/button";
import { Form } from "../../base/form/form";
import { Input } from "../../base/input/input";
import { FeaturedIcon } from "../../foundations/featured-icon/featured-icon";
import { Facebook, LinkedIn, X } from "../../foundations/social-icons";

const author = AVATARS[6];
const quoted = AVATARS[0];

const styles = sortCx({
    /** Links inside prose keep the prose underline but need our focus ring. */
    proseLink: "outline-focus-ring rounded-xs focus-visible:outline-2 focus-visible:outline-offset-2",
    /** Underlined inline link used inside the newsletter hint. */
    hintLink:
        "outline-focus-ring decoration-utility-neutral-300 rounded-xs underline underline-offset-3 focus-visible:outline-2 focus-visible:outline-offset-2",
});

/** A left-aligned header with a metadata row, plus an article body beside a newsletter card. */
export const ContentLargeImage03 = () => (
    <div className="bg-primary">
        <div className="max-w-container mx-auto px-4 py-16 md:px-8 md:py-24">
            <div className="w-full max-w-3xl">
                <BadgeGroup color="brand" addonText="Leadership" iconTrailing={null} className="pe-3">
                    8 min read
                </BadgeGroup>

                <h1 className="text-display-md text-primary md:text-display-lg mt-4 font-semibold">Bill Walsh leadership lessons</h1>
                <p className="text-tertiary mt-4 text-lg md:mt-6 md:text-xl">
                    Like to know the secrets of turning a two-win season into three championships? It starts with the standard, not the scoreboard.
                </p>
            </div>

            <div className="mt-16 w-full">
                <img className="h-60 w-full object-cover md:h-160" src={IMAGES.landscape[5].src} alt="" />

                <div className="mt-8 flex items-start justify-between gap-24">
                    <dl className="flex gap-12">
                        <div>
                            <dt className="text-brand-secondary text-sm font-semibold">Written by</dt>
                            <dd className="text-primary mt-3 text-lg font-medium">{author.name}</dd>
                        </div>
                        <div>
                            <dt className="text-brand-secondary text-sm font-semibold">Published on</dt>
                            <dd className="text-primary mt-3 text-lg font-medium">17 Jan 2027</dd>
                        </div>
                    </dl>

                    <div className="hidden gap-3 md:flex">
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

        <div className="max-w-container mx-auto px-4 pb-16 md:px-8 md:pb-24">
            <div className="mx-auto flex max-w-180 flex-col justify-center gap-12 md:items-start lg:max-w-none lg:flex-row lg:gap-24">
                <div className="prose md:prose-lg max-w-180">
                    <h2>Introduction</h2>
                    <p>
                        The standard of performance is not a slogan, it is a list. Where you park, how you answer the phone, what a meeting agenda looks like.
                        None of it wins a game on its own and all of it decides what the team believes is normal.
                    </p>
                    <p>
                        Walsh took over a team that had won two games and spent his first year fixing things that had nothing to do with football. The record
                        did not move. The behaviour did, and the record followed a season later.
                    </p>

                    <figure>
                        <img className="h-60 md:h-120" src={IMAGES.landscape[6].src} alt="" />
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
                        The lesson translates cleanly to software teams. You cannot instruct people to care about quality, but you can decide what a normal pull
                        request looks like, and then hold that line when the quarter gets tight.
                    </p>

                    <figure>
                        <blockquote>
                            <p>Champions behave like champions before they are champions. The standard comes first, the results arrive later.</p>
                        </blockquote>
                        <figcaption className="not-prose text-md mt-6 flex gap-3 md:mt-8">
                            <Avatar size="lg" src={quoted.src} alt={quoted.name} />
                            <div>
                                <p className="text-md text-primary font-semibold">{quoted.name}</p>
                                <cite className="text-md text-tertiary not-italic">Product Designer</cite>
                            </div>
                        </figcaption>
                    </figure>

                    <p className="max-lg:hidden">
                        The uncomfortable part is that the standard has to apply first to the person setting it. A leader who ships without review has already
                        told the team what the rule really is, whatever the{" "}
                        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid -- placeholder href for a marketing section */}
                        <a href="#" className={styles.proseLink}>
                            written policy
                        </a>{" "}
                        says.
                    </p>
                    <p>
                        Keep it small enough to remember. Three or four behaviours, written where people can see them, revisited when they stop being true
                        rather than quietly abandoned.
                    </p>

                    <h3>Software and tools</h3>
                    <p>
                        Tooling can enforce a standard but it cannot invent one. Linters, templates and checklists are useful precisely because someone has
                        already decided what good looks like and encoded it.
                    </p>
                    <p>
                        Where teams go wrong is buying the tool first and hoping the agreement follows. It never does; you end up with a rule nobody chose and a
                        warning everybody mutes.
                    </p>

                    <h3>Other resources</h3>
                    <p>If you are setting a standard for the first time, three habits carry most of the weight:</p>
                    <ol>
                        <li>Write down the behaviour, not the outcome you hope it produces.</li>
                        <li>Apply it to yourself in public before you apply it to anyone else.</li>
                        <li>Review it every quarter and delete anything the team has stopped believing.</li>
                    </ol>

                    <figure>
                        <img className="h-60 md:h-120" src={IMAGES.landscape[7].src} alt="" />
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
                </div>

                <div className="lg:max-w-sm lg:min-w-85">
                    <Form className="bg-secondary ring-secondary flex flex-col gap-8 self-start rounded-2xl p-6 shadow-xs ring-1 ring-inset md:p-8">
                        <FeaturedIcon size="xl" color="gray" theme="modern" icon={Mail01} />

                        <div className="flex flex-col gap-6">
                            <div className="flex flex-col gap-1">
                                <h2 className="text-primary text-xl font-semibold">Weekly newsletter</h2>
                                <p className="text-md text-tertiary">
                                    No spam. Just the latest releases and tips, interesting articles, and exclusive interviews in your inbox every week.
                                </p>
                            </div>

                            <div className="flex flex-col gap-4">
                                <Input
                                    isRequired
                                    size="lg"
                                    type="email"
                                    name="email"
                                    placeholder="Enter your email"
                                    hint={
                                        <span>
                                            Read about our {/* eslint-disable-next-line jsx-a11y/anchor-is-valid -- placeholder href for a marketing section */}
                                            <a href="#" className={styles.hintLink}>
                                                privacy policy
                                            </a>
                                            .
                                        </span>
                                    }
                                />
                                <Button type="submit" size="lg">
                                    Subscribe
                                </Button>
                            </div>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    </div>
);
