"use client";

import { Camera01, Link01 } from "@smarteraui/icons";
import { Avatar } from "@/components/base/avatar/avatar";
import { BadgeGroup } from "@/components/base/badges/badge-groups";
import { Button } from "@/components/base/buttons/button";
import { Form } from "@/components/base/form/form";
import { Input } from "@/components/base/input/input";
import { Facebook, LinkedIn, X } from "@/components/foundations/social-icons";
import { sortCx } from "@/utils/cx";
import { AVATARS, IMAGES } from "@/utils/demo-assets";

const quoted = AVATARS[0];

const contributors = [
    { ...AVATARS[1], role: "Product Manager" },
    { ...AVATARS[2], role: "Product Manager" },
    { ...AVATARS[6], role: "Frontend Engineer" },
];

const tableOfContents = ["Introduction", "Software and tools", "Other resources", "Conclusion"];

const styles = sortCx({
    /** Links inside prose keep the prose underline but need our focus ring. */
    proseLink: "outline-focus-ring rounded-xs focus-visible:outline-2 focus-visible:outline-offset-2",
    /** The tinted panel that closes the article. */
    callout: "not-prose bg-secondary text-tertiary my-8 rounded-2xl px-5 py-6 text-lg md:my-12 md:p-8 [&>p+p]:mt-4.5",
    /** The horizontal rules that separate the sidebar blocks. */
    divider: "border-secondary w-full border-t",
    /** The small brand-coloured heading used above each sidebar block. */
    railHeading: "text-md text-brand-secondary font-semibold",
});

const contributorList = (
    <ul className="flex flex-col gap-6">
        {contributors.map((contributor) => (
            <li key={contributor.name} className="flex items-center gap-3">
                <Avatar size="lg" src={contributor.src} alt={contributor.name} />
                <div>
                    <p className="text-md text-primary font-semibold">{contributor.name}</p>
                    <p className="text-md text-tertiary">{contributor.role}</p>
                </div>
            </li>
        ))}
    </ul>
);

const shareButtons = (
    <>
        <Button size="md" color="secondary" aria-label="Copy link" iconLeading={Link01} />
        <Button size="md" color="secondary" aria-label="Share on X" iconLeading={<X data-icon="leading" className="size-5" />} />
        <Button size="md" color="secondary" aria-label="Share on LinkedIn" iconLeading={<LinkedIn data-icon="leading" className="size-5" />} />
        <Button size="md" color="secondary" aria-label="Share on Facebook" iconLeading={<Facebook data-icon="leading" className="size-5" />} />
    </>
);

/** A bleeding header image beside the title, with a contributor and newsletter rail alongside the article. */
export const ContentSplitImage03 = () => (
    <div className="bg-primary">
        <div className="max-w-container relative mx-auto grid grid-cols-1 items-center gap-16 px-4 pb-16 md:grid-cols-2 md:gap-8 md:px-8 md:pt-16 md:pb-24">
            <div className="flex max-w-180 flex-col items-start">
                <BadgeGroup theme="modern" color="brand" addonText="Product" iconTrailing={null} className="pr-3">
                    8 min read
                </BadgeGroup>

                <h1 className="text-display-md text-primary md:text-display-lg mt-4 font-semibold">Migrating your issue tracker in a week</h1>
                <p className="text-tertiary mt-4 text-lg md:mt-6 md:max-w-120 md:text-xl">
                    Moving projects, sprints and bug reports without losing history — and without a freeze the whole team resents.
                </p>
            </div>

            <img
                className="order-first -ms-4 h-60 w-screen max-w-none object-cover md:order-1 md:ms-0 md:h-160 md:w-full md:max-w-full"
                src={IMAGES.landscape[3].src}
                alt=""
            />
        </div>

        <div className="max-w-container mx-auto px-4 pb-16 md:px-8 md:pb-24">
            <div className="mx-auto flex justify-center gap-16">
                <div className="hidden w-70 flex-col gap-8 lg:flex">
                    <div className={styles.divider} />

                    <nav aria-label="Table of contents" className="flex flex-col gap-4">
                        <p className={styles.railHeading}>Table of contents</p>
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

                    <div className="flex flex-col gap-6">
                        <p className={styles.railHeading}>Contributors</p>
                        {contributorList}
                    </div>

                    <div className={styles.divider} />

                    <Form className="flex flex-col gap-4">
                        <p className={styles.railHeading}>Subscribe to our newsletter</p>
                        <Input isRequired size="lg" type="email" name="email" placeholder="Enter your email" />
                        <Button type="submit" size="lg">
                            Subscribe
                        </Button>
                    </Form>

                    <div className={styles.divider} />

                    <div className="flex gap-3">{shareButtons}</div>
                </div>

                <div className="max-w-prose lg:max-w-180">
                    <div className="prose-centered-quote prose md:prose-lg mx-auto">
                        <p className="lead">
                            Tracker migrations fail for the same reason data migrations fail: somebody promises to bring everything across, and then spends four
                            weeks discovering what everything means.
                        </p>

                        <hr />

                        <h2>Introduction</h2>
                        <p>
                            Decide what you are not migrating before you decide anything else. Closed issues older than a year, abandoned projects and the eight
                            custom fields nobody has filled in since 2024 can be archived rather than translated.
                        </p>
                        <p>
                            What remains is usually small enough to move in an afternoon. The week goes on agreeing states, owners and priorities — the things
                            that were never written down in the old tool either.
                        </p>

                        <figure>
                            <img className="h-60 md:h-120" src={IMAGES.landscape[6].src} alt="" />
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
                            Run both systems for exactly one sprint. Any longer and people learn to live with two sources of truth, which is worse than either
                            tool on its own.
                        </p>

                        <figure>
                            <blockquote>
                                <p>We archived sixty per cent of our backlog on the way across and not one person asked for any of it back.</p>
                            </blockquote>
                            <figcaption className="not-prose mt-6 inline-flex flex-col items-center md:mt-8">
                                <Avatar size="md" src={quoted.src} alt={quoted.name} />
                                <p className="text-md text-primary mt-3 font-semibold">{quoted.name}</p>
                                <cite className="text-md text-tertiary mt-0.5 not-italic">Product Designer</cite>
                            </figcaption>
                        </figure>

                        <p>
                            Map states before you map anything else. Most teams find they have three real states wearing seven different names, and collapsing
                            them is the single largest quality-of-life win of the whole exercise.
                        </p>
                        <p>
                            Keep identifiers stable where you can. Links in old pull requests, incident reports and customer emails will outlive the migration,
                            and a redirect costs an hour to set up.
                        </p>

                        <h3>Software and tools</h3>
                        <p>
                            Export to a flat file first, even if the destination has a direct importer. A CSV you can read is the only way to catch the fields
                            that silently did not come across.
                        </p>
                        <p>
                            Automate the import, then run it three times into a throwaway workspace. The third run is the one where you notice the attachments
                            are missing.
                        </p>

                        <h3>Other resources</h3>
                        <p>If you are planning a move, three decisions carry most of the risk:</p>
                        <ol>
                            <li>What are you deliberately leaving behind?</li>
                            <li>Who owns the mapping when two people disagree about a state?</li>
                            <li>When exactly does the old tool become read-only?</li>
                        </ol>

                        <figure>
                            <img className="h-110 md:h-240" src={IMAGES.square[2].src} alt="" />
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
                            The tool you land on matters less than the agreement you write on the way there. Most teams get a better process out of the
                            migration than they get out of the software.
                        </p>
                        <p>Set the read-only date first and work backwards from it.</p>

                        <div className={styles.callout}>
                            <h2 className="text-display-xs text-primary mb-4 font-semibold">Conclusion</h2>
                            <p>A migration is a chance to delete things. Teams that take it finish in a week; teams that do not are still going in March.</p>
                            <p>Agree the states, archive the rest, and make the old tool read-only on the day you said you would.</p>
                            <p>Everything else can be fixed afterwards, in the new tool, by the people who have to live in it.</p>
                        </div>
                    </div>

                    <div className="flex flex-col items-start justify-between gap-y-8 lg:hidden lg:flex-row">
                        <div className="flex flex-col gap-6">
                            <p className={styles.railHeading}>Contributors</p>
                            {contributorList}
                        </div>

                        <div className="flex gap-3">{shareButtons}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);
