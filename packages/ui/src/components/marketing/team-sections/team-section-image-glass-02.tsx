import { ArrowUpRight } from "@properui/icons";
import { Button } from "@/components/base/buttons/button";
import { Dribbble, LinkedIn, X } from "@/components/foundations/social-icons";
import { sortCx } from "@/utils/cx";
import { LOGOS, avatar } from "@/utils/demo-assets";

const styles = sortCx({
    /** The portrait tile: the photo fills it and the frosted panel is flush with its bottom edge. */
    tile: "relative flex h-108 w-full flex-col justify-end md:h-128",
    image: "absolute start-0 top-0 z-0 size-full object-cover",
    scrim: "z-10 bg-linear-to-t from-black/40 to-black/0 pt-16 md:pt-20 lg:pt-24",
    panel: "relative bg-primary/30 px-5 pt-5 pb-6 text-white backdrop-blur-[10px] before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-alpha-white/30",
    socialLink: "outline-focus-ring flex rounded-xs text-white focus-visible:outline-2 focus-visible:outline-offset-2",
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

/** A split intro row above full-bleed portraits with an edge-to-edge frosted caption bar. */
export const TeamSectionImageGlass02 = () => (
    <section className="bg-primary py-16 md:py-24">
        <div className="max-w-container mx-auto px-4 md:px-8">
            <div className="flex w-full flex-col justify-between md:flex-row">
                <div className="flex flex-1 flex-col">
                    <span className="text-brand-secondary md:text-md text-sm font-semibold">Our team</span>
                    <h2 className="text-display-sm md:text-display-md text-primary mt-3 font-semibold">Some of the people you&apos;ll be working with</h2>
                    <p className="text-tertiary mt-4 text-lg md:mt-5 md:text-xl">We&apos;re a 100% remote team spread all across the world. Join us!</p>
                </div>

                <div className="mt-8 flex flex-col gap-3 self-stretch md:mt-0 md:flex-row-reverse md:justify-center md:self-start">
                    <Button size="xl">Open positions</Button>
                    <Button size="xl" color="secondary">
                        About us
                    </Button>
                </div>
            </div>

            <div className="mt-12 md:mt-16">
                <ul className="grid w-full grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2 md:gap-y-8 lg:grid-cols-2 xl:grid-cols-3">
                    {team.map((member) => (
                        <li key={member.photo.name} className={styles.tile}>
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
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    </section>
);
