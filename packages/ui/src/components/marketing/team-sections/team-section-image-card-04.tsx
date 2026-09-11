"use client";

import { ArrowNext, ArrowPrevious } from "@properui/icons";
import { sortCx } from "../../../utils/cx";
import { LOGOS, avatar } from "../../../utils/demo-assets";
import { Carousel } from "../../application/carousel/carousel-base";
import { Button } from "../../base/buttons/button";

const styles = sortCx({
    /** The round previous/next controls under the carousel. */
    control:
        "group flex size-12 items-center justify-center rounded-full bg-primary ring-1 ring-secondary backdrop-blur transition duration-100 ease-linear ring-inset hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-50 md:size-14",
    controlIcon: "size-5 text-fg-quaternary transition-inherit-all group-hover:text-fg-quaternary_hover md:size-6",
});

const team = [
    { photo: avatar(0), role: "Founder & CEO", bio: `Former co-founder of ${LOGOS[0].name}. Early staff at ${LOGOS[1].name} and ${LOGOS[2].name}.` },
    { photo: avatar(1), role: "Engineering Manager", bio: `Lead engineering teams at ${LOGOS[3].name}, ${LOGOS[4].name}, and ${LOGOS[5].name}.` },
    { photo: avatar(2), role: "Product Manager", bio: `Former PM for ${LOGOS[0].name}, ${LOGOS[1].name}, and ${LOGOS[2].name}.` },
    { photo: avatar(3), role: "Frontend Developer", bio: `Former frontend dev for ${LOGOS[3].name}, ${LOGOS[4].name}, and ${LOGOS[5].name}.` },
    { photo: avatar(4), role: "Backend Developer", bio: `Lead backend dev at ${LOGOS[0].name}. Former ${LOGOS[1].name} and ${LOGOS[2].name}.` },
    { photo: avatar(5), role: "Product Designer", bio: `Founding design team at ${LOGOS[3].name}. Former ${LOGOS[4].name} and ${LOGOS[5].name}.` },
    { photo: avatar(6), role: "UX Researcher", bio: `Lead user research for ${LOGOS[0].name}. Contractor for ${LOGOS[1].name} and ${LOGOS[2].name}.` },
    { photo: avatar(7), role: "Customer Success", bio: `Lead CX at ${LOGOS[3].name}. Former ${LOGOS[4].name} and ${LOGOS[5].name}.` },
];

/** A draggable row of square portrait cards with round previous/next controls underneath. */
export const TeamSectionImageCard04 = () => (
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
                    <Button size="xl">Open positions</Button>
                    <Button size="xl" color="secondary">
                        About us
                    </Button>
                </div>
            </div>

            <Carousel.Root aria-label="Our team" className="mt-12 md:mt-16">
                <Carousel.Content overflowHidden={false} className="cursor-grab gap-6 pe-4 md:gap-8 md:pe-8">
                    {team.map((member) => (
                        <Carousel.Item key={member.photo.name} className="flex max-w-70 flex-col gap-4 select-none">
                            <img src={member.photo.src} alt={member.photo.name} className="aspect-square w-full object-cover" />

                            <div>
                                <h3 className="text-primary text-lg font-semibold">{member.photo.name}</h3>
                                <p className="text-md text-brand-secondary">{member.role}</p>
                                <p className="text-md text-tertiary mt-2">{member.bio}</p>
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
