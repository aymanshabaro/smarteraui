"use client";

import { ArrowNext, ArrowPrevious, ArrowUpRight } from "@properui/icons";
import { Carousel } from "@/components/application/carousel/carousel-base";
import { Button } from "@/components/base/buttons/button";
import { Dribbble, LinkedIn, X } from "@/components/foundations/social-icons";
import { sortCx } from "@/utils/cx";
import { LOGOS, avatar } from "@/utils/demo-assets";

const styles = sortCx({
    /** The portrait slide: the photo fills it and the frosted panel is flush with its bottom edge. */
    slide: "relative flex aspect-[0.65] w-full max-w-70 flex-col justify-end md:aspect-[0.75] md:max-w-96",
    image: "absolute inset-0 z-0 size-full cursor-grab object-cover",
    scrim: "z-10 bg-linear-to-t from-black/40 to-black/0 pt-16 md:pt-20 lg:pt-24",
    panel: "relative bg-primary/30 px-5 pt-5 pb-6 text-white backdrop-blur-[10px] before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-alpha-white/30",
    socialLink: "outline-focus-ring flex rounded-xs text-white focus-visible:outline-2 focus-visible:outline-offset-2",
    /** The round previous/next controls under the carousel. */
    control:
        "group flex size-12 items-center justify-center rounded-full bg-primary ring-1 ring-secondary backdrop-blur transition duration-100 ease-linear ring-inset hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-50 md:size-14",
    controlIcon: "size-5 text-fg-quaternary transition-inherit-all group-hover:text-fg-quaternary_hover md:size-6",
});

const socials = [
    { label: "X", href: "https://x.com/", icon: X },
    { label: "LinkedIn", href: "https://www.linkedin.com/", icon: LinkedIn },
    { label: "Dribbble", href: "https://dribbble.com/", icon: Dribbble },
];

const team = [
    { photo: avatar(0), role: "Founder & CEO", bio: `Former co-founder of ${LOGOS[0].name}. Early staff at ${LOGOS[1].name} and ${LOGOS[2].name}.` },
    { photo: avatar(1), role: "Engineering Manager", bio: `Lead engineering teams at ${LOGOS[3].name}, ${LOGOS[4].name}, and ${LOGOS[5].name}.` },
    { photo: avatar(2), role: "Product Manager", bio: `Former PM for ${LOGOS[0].name}, ${LOGOS[1].name}, and ${LOGOS[2].name}.` },
    { photo: avatar(3), role: "Frontend Developer", bio: `Former frontend dev for ${LOGOS[3].name}, ${LOGOS[4].name}, and ${LOGOS[5].name}.` },
    { photo: avatar(4), role: "Backend Developer", bio: `Lead backend dev at ${LOGOS[0].name}. Former ${LOGOS[1].name} and ${LOGOS[2].name}.` },
    { photo: avatar(5), role: "Product Designer", bio: `Founding design team at ${LOGOS[3].name}. Former ${LOGOS[4].name} and ${LOGOS[5].name}.` },
];

/** A draggable row of portrait slides with frosted captions and round previous/next controls. */
export const TeamSectionImageGlass04 = () => (
    <section className="bg-primary overflow-hidden py-16 md:py-24">
        <div className="max-w-container mx-auto px-4 md:px-8">
            <div className="flex w-full flex-col justify-between md:flex-row">
                <div className="flex flex-1 flex-col">
                    <h2 className="text-display-sm md:text-display-md text-primary font-semibold">We&apos;re a fast-growing team</h2>
                    <p className="text-tertiary mt-4 text-lg md:mt-5 md:text-xl">
                        We&apos;re always on the lookout for passionate, dynamic, and talented individuals.
                    </p>
                </div>

                <div className="mt-8 flex flex-col gap-3 self-stretch md:mt-0 md:flex-row-reverse md:justify-center md:self-start">
                    <Button size="xl">We&apos;re hiring!</Button>
                    <Button size="xl" color="secondary">
                        Read our principles
                    </Button>
                </div>
            </div>

            <Carousel.Root aria-label="Our team" className="mt-12 md:mt-16">
                <Carousel.Content overflowHidden={false} className="gap-6 pe-4 md:gap-8 md:pe-8">
                    {team.map((member) => (
                        <Carousel.Item key={member.photo.name} className={styles.slide}>
                            <img src={member.photo.src} alt={member.photo.name} className={styles.image} />

                            <div className={styles.scrim}>
                                <div className={styles.panel}>
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-xl font-semibold">{member.photo.name}</h3>
                                        <ArrowUpRight aria-hidden="true" className="size-6 rtl:-scale-x-100" />
                                    </div>

                                    <p className="text-md mt-2 font-semibold">{member.role}</p>
                                    <p className="md:text-md mt-0.5 text-sm">{member.bio}</p>

                                    <ul className="mt-4 flex gap-5">
                                        {socials.map(({ label, href, icon: Icon }) => (
                                            <li key={label}>
                                                <a
                                                    href={href}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    aria-label={`${member.photo.name} on ${label}`}
                                                    className={styles.socialLink}
                                                >
                                                    <Icon aria-hidden="true" className="size-5" />
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
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
    </section>
);
