import { ArrowUpRight } from "@properui/icons";
import { Button } from "@/components/base/buttons/button";
import { Dribbble, LinkedIn, X } from "@/components/foundations/social-icons";
import { sortCx } from "@/utils/cx";
import { LOGOS, avatar } from "@/utils/demo-assets";

const styles = sortCx({
    /** The portrait tile: the photo fills it and the frosted panel is pinned to its bottom. */
    tile: "relative flex aspect-[0.793] w-full flex-col justify-end md:aspect-[0.75]",
    image: "absolute start-0 top-0 z-0 size-full object-cover",
    scrim: "z-10 bg-linear-to-t from-black/40 to-black/0 p-3 pt-16 md:p-4 md:pt-20 lg:pt-24",
    panel: "rounded-xl bg-primary/30 px-4 pt-5 pb-6 text-white ring-1 ring-alpha-white/30 backdrop-blur-[10px] ring-inset md:px-5",
    socialLink: "outline-focus-ring flex rounded-xs text-white focus-visible:outline-2 focus-visible:outline-offset-2",
});

const socials = [
    { label: "X", href: "https://x.com/", icon: X },
    { label: "LinkedIn", href: "https://www.linkedin.com/", icon: LinkedIn },
    { label: "Dribbble", href: "https://dribbble.com/", icon: Dribbble },
];

const team = [
    { photo: avatar(0), role: "Founder & CEO", bio: `Former co-founder of ${LOGOS[0].name}. Early staff at ${LOGOS[1].name} and ${LOGOS[2].name}.` },
    { photo: avatar(2), role: "Product Manager", bio: `Former PM for ${LOGOS[0].name}, ${LOGOS[1].name}, and ${LOGOS[2].name}.` },
    { photo: avatar(1), role: "Engineering Manager", bio: `Lead engineering teams at ${LOGOS[3].name}, ${LOGOS[4].name}, and ${LOGOS[5].name}.` },
    { photo: avatar(3), role: "Frontend Developer", bio: `Former frontend dev for ${LOGOS[3].name}, ${LOGOS[4].name}, and ${LOGOS[5].name}.` },
];

/** An intro column beside a two-by-two grid of portraits with rounded frosted captions. */
export const TeamSectionImageGlass03 = () => (
    <section className="bg-primary py-16 md:py-24">
        <div className="max-w-container mx-auto px-4 md:px-8">
            <div className="flex flex-col gap-12 lg:flex-row lg:gap-16">
                <div className="flex shrink-0 flex-col items-start lg:w-90">
                    <span className="text-brand-secondary md:text-md text-sm font-semibold">Our team</span>
                    <h2 className="text-display-sm md:text-display-md text-primary mt-3 font-semibold">Leadership team</h2>
                    <p className="text-tertiary mt-4 text-lg md:mt-5 md:text-xl">
                        We&apos;re a cross-disciplinary team that loves to create great experiences for our customers.
                    </p>

                    <div className="mt-8 flex flex-col gap-3 self-stretch sm:flex-row sm:self-start lg:flex-row-reverse">
                        <Button size="xl">Open positions</Button>
                        <Button size="xl" color="secondary">
                            About us
                        </Button>
                    </div>
                </div>

                <ul className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2 md:gap-y-8 lg:grid-cols-2">
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
