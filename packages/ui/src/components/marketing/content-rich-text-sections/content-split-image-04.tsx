"use client";

import { Link01 } from "@properui/icons";
import { sortCx } from "../../../utils/cx";
import { AVATARS, IMAGES, LOGOS } from "../../../utils/demo-assets";
import { Avatar } from "../../base/avatar/avatar";
import { Button } from "../../base/buttons/button";
import { Facebook, LinkedIn, X } from "../../foundations/social-icons";

const author = AVATARS[2];
const quoted = AVATARS[0];

const styles = sortCx({
    /** Links inside prose keep the prose underline but need our focus ring. */
    proseLink: "outline-focus-ring rounded-xs focus-visible:outline-2 focus-visible:outline-offset-2",
    /** The tinted panel that closes the article. */
    callout: "not-prose bg-secondary text-tertiary my-8 rounded-2xl px-5 py-6 text-lg md:my-12 md:p-8 [&>p+p]:mt-4.5",
});

/** A full-bleed header image beside the title, with a minimal pull quote in the body. */
export const ContentSplitImage04 = () => (
    <div className="bg-primary">
        <div className="grid grid-cols-1 items-center gap-16 md:grid-cols-2 md:justify-items-end md:gap-0">
            <div className="flex max-w-(--breakpoint-sm) flex-col items-start px-4 pb-16 md:w-full md:px-8 md:pb-0">
                <span className="text-brand-secondary md:text-md text-sm font-semibold">20 Jan 2027 • 10 min read</span>
                <h1 className="text-display-md text-primary md:text-display-lg mt-3 font-semibold md:mt-4">Building your API stack</h1>
                <p className="text-tertiary mt-4 text-lg md:mt-6 md:max-w-120 md:text-xl">
                    The rise of RESTful APIs has been met by a rise in tools for creating, testing and managing them.
                </p>

                <div className="mt-8 flex items-center gap-3 md:mt-12">
                    <Avatar size="lg" src={author.src} alt={author.name} />
                    <div>
                        <p className="text-md text-primary font-semibold">{author.name}</p>
                        <p className="text-md text-tertiary">Engineering Manager, {LOGOS[0].name}</p>
                    </div>
                </div>
            </div>

            <img
                className="order-first h-60 w-screen max-w-none object-cover md:order-1 md:h-180 md:w-full md:max-w-full"
                src={IMAGES.landscape[5].src}
                alt=""
            />
        </div>

        <div className="max-w-container mx-auto px-4 pb-16 md:px-8 md:py-24">
            <div className="mx-auto max-w-prose md:max-w-180">
                <div className="prose-minimal-quote prose md:prose-lg mx-auto">
                    <p className="lead">
                        An API stack is mostly a set of agreements: what a resource is called, what an error looks like, and who is allowed to change either.
                        Tools help, but only after those agreements exist.
                    </p>

                    <hr />

                    <h2>Introduction</h2>
                    <p>
                        Teams usually adopt tooling in the wrong order. They buy a gateway before they have a schema, and a schema before they have decided
                        whether the API is a product or an implementation detail.
                    </p>
                    <p>
                        Answer that question first. A public API is versioned, documented and slow to change. An internal one can be none of those things, and
                        pretending otherwise costs you a year of ceremony.
                    </p>

                    <figure>
                        <img className="h-86 md:h-180" src={IMAGES.square[1].src} alt="" />
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
                        Once that is settled, the stack more or less falls out of it. A schema you generate from, a mock server your client team can develop
                        against, and a contract test that fails the build when the two drift apart.
                    </p>

                    <figure>
                        <blockquote>
                            <p>
                                We stopped writing API documentation the day we started generating it. The documentation had been wrong for eight months and
                                nobody had noticed.
                            </p>
                        </blockquote>
                        <figcaption className="not-prose text-md mt-6 md:mt-8">
                            {quoted.name}, <cite className="not-italic">Product Designer</cite>
                        </figcaption>
                    </figure>

                    <p>
                        Errors deserve as much design attention as the happy path. A consistent error shape (a stable code, a human message and a
                        machine-readable field) removes more support tickets than any amount of endpoint tuning.
                    </p>
                    <p>
                        Pagination, filtering and sorting should look identical on every collection. Consumers learn the pattern once and stop reading your
                        docs, which is the outcome you want.
                    </p>

                    <h3>Software and tools</h3>
                    <p>
                        Generate the client, do not hand-write it. Hand-written clients drift, and the drift is discovered by a customer rather than by a test.
                    </p>
                    <p>
                        Keep the gateway thin. Every piece of business logic that ends up in routing configuration is logic your tests cannot see and your
                        engineers cannot grep for.
                    </p>

                    <h3>Other resources</h3>
                    <p>Three decisions do most of the work when you are assembling a stack:</p>
                    <ol>
                        <li>Is this API a product with users, or an internal boundary?</li>
                        <li>What breaks the build when the schema and the implementation disagree?</li>
                        <li>Who is allowed to add a field, and who has to be told?</li>
                    </ol>

                    <figure>
                        <img className="h-60 md:h-120" src={IMAGES.landscape[6].src} alt="" />
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
                        None of this requires a platform team. It requires one repository that owns the schema and one test that refuses to pass when reality
                        disagrees with it.
                    </p>
                    <p>Everything else in the stack is a convenience built on top of those two things.</p>

                    <div className={styles.callout}>
                        <h2 className="text-display-xs text-primary mb-4 font-semibold">Conclusion</h2>
                        <p>Pick the agreements first and the tools second. Tools chosen before agreements simply encode the confusion you already had.</p>
                        <p>Generate what you can, test the contract, and keep the error shape identical everywhere.</p>
                        <p>Do that and the stack stops being a stack and starts being a boundary people trust.</p>
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
