import { Camera01 } from "@smarteraui/icons";
import { Avatar } from "@/components/base/avatar/avatar";
import { BadgeGroup } from "@/components/base/badges/badge-groups";
import { Badge } from "@/components/base/badges/badges";
import { sortCx } from "@/utils/cx";
import { AVATARS, IMAGES, LOGOS } from "@/utils/demo-assets";

const author = AVATARS[7];
const quoted = AVATARS[0];

const styles = sortCx({
    /** Links inside prose keep the prose underline but need our focus ring. */
    proseLink: "outline-focus-ring rounded-xs focus-visible:outline-2 focus-visible:outline-offset-2",
    /** The tinted panel that closes the article. */
    callout: "not-prose bg-secondary text-tertiary my-8 rounded-2xl px-5 py-6 text-lg md:my-12 md:p-8 [&>p+p]:mt-4.5",
});

/** A tall companion image on the start edge with the header and article stacked beside it. */
export const ContentAlternative01 = () => (
    <div className="bg-primary">
        <div className="max-w-container bg-primary mx-auto grid grid-cols-1 gap-16 px-4 pb-16 md:px-8 md:pb-24 lg:grid-cols-2 lg:gap-16 lg:pt-16">
            <img className="hidden h-160 object-cover lg:block" src={IMAGES.square[3].src} alt="" />

            <div className="flex flex-col justify-center gap-16 pt-16 lg:gap-32 lg:pt-32">
                <div className="flex flex-col items-start">
                    <BadgeGroup theme="modern" color="brand" addonText="12 Jan 2027" iconTrailing={null} className="pe-3">
                        Customer Success
                    </BadgeGroup>

                    <h1 className="text-display-md text-primary md:text-display-lg mt-4 font-semibold">Podcast: creating a better CX community</h1>
                    <p className="text-tertiary mt-4 text-lg md:mt-8 md:text-xl">
                        Starting a community does not need to be complicated, but how do you get started? We asked the people who have already done it.
                    </p>

                    <div className="mt-8 flex items-center gap-3 md:mt-12">
                        <Avatar size="lg" src={author.src} alt={author.name} />
                        <div>
                            <p className="text-md text-primary font-semibold">{author.name}</p>
                            <p className="text-md text-tertiary">CX Lead, {LOGOS[0].name}</p>
                        </div>
                    </div>

                    <img className="mt-16 h-60 w-full object-cover md:h-110 lg:hidden" src={IMAGES.square[3].src} alt="" />
                </div>

                <div className="mx-auto max-w-prose lg:max-w-180">
                    <div className="prose-centered-quote prose md:prose-lg mx-auto">
                        <p className="lead">
                            Every customer community starts as a support queue with better manners. The ones that last are the ones that stop being run by
                            support within the first year.
                        </p>

                        <hr />

                        <h2>Introduction</h2>
                        <p>
                            The first mistake is launching a forum. A forum is a building; what you need at the start is a reason for twenty people to talk to
                            each other, which is usually a recurring problem rather than a platform.
                        </p>
                        <p>
                            Find the problem, host the conversation somewhere your customers already are, and only build the destination once people are annoyed
                            that the conversation keeps getting lost.
                        </p>

                        <figure>
                            <img className="h-60 md:h-96" src={IMAGES.landscape[0].src} alt="" />
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
                            Moderation is the whole job. Not deleting things — deciding what the room is for, saying it out loud, and repeating it patiently for
                            eighteen months.
                        </p>

                        <figure>
                            <blockquote>
                                <p>Our community grew the month we stopped answering every question ourselves and started thanking the people who did.</p>
                            </blockquote>
                            <figcaption className="not-prose mt-6 inline-flex flex-col items-center md:mt-8">
                                <Avatar size="md" src={quoted.src} alt={quoted.name} />
                                <p className="text-md text-primary mt-3 font-semibold">{quoted.name}</p>
                                <cite className="text-md text-tertiary mt-0.5 not-italic">Product Designer</cite>
                            </figcaption>
                        </figure>

                        <p>
                            Give the most helpful members something they cannot buy: early access, a direct line to the product team, and public credit. None of
                            these cost money and all of them are harder to fake than a discount code.
                        </p>
                        <p>
                            Publish what you are working on and what you have rejected. A roadmap without rejections reads as marketing; one with them reads as
                            a conversation.
                        </p>

                        <h3>Software and tools</h3>
                        <p>
                            Pick whatever your customers already have open. Migrating a community is far more expensive than migrating a database, because the
                            data walks away if it disagrees with the move.
                        </p>
                        <p>
                            Keep search working. Almost all of the value of a mature community is people finding an answer written three years ago by somebody
                            who has since moved on.
                        </p>

                        <h3>Other resources</h3>
                        <p>If you are starting from nothing, three moves matter more than the rest:</p>
                        <ol>
                            <li>Name the problem the community exists to solve.</li>
                            <li>Show up every week, in public, for six months.</li>
                            <li>Hand the microphone to a member before you feel ready to.</li>
                        </ol>

                        <figure>
                            <img className="h-60 md:h-96" src={IMAGES.landscape[4].src} alt="" />
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
                            The metric to watch is not membership. It is the share of questions answered by somebody who does not work for you, and how quickly
                            that happens.
                        </p>
                        <p>When that number stops depending on your team being awake, you have a community rather than a channel.</p>

                        <div className={styles.callout}>
                            <h2 className="text-display-xs text-primary mb-4 font-semibold">Conclusion</h2>
                            <p>
                                Communities are not launched, they are hosted. The work is showing up consistently and making room for other people to be
                                useful.
                            </p>
                            <p>Start with a problem worth gathering around, keep the room clearly defined, and give credit away as fast as you can.</p>
                            <p>The platform decision can wait until the conversation is already happening somewhere less convenient.</p>
                        </div>
                    </div>

                    <div className="border-secondary -mt-px border-t pt-6">
                        <div className="flex gap-2">
                            <Badge color="sky">Product</Badge>
                            <Badge color="pink">Tools</Badge>
                            <Badge color="pink">SaaS</Badge>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);
