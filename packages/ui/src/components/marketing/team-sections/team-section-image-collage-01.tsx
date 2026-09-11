import { ArrowUpRight } from "@properui/icons";
import { cx, sortCx } from "../../../utils/cx";
import { LOGOS, avatar } from "../../../utils/demo-assets";
import { Button } from "../../base/buttons/button";
import { Dribbble, LinkedIn, X } from "../../foundations/social-icons";

const styles = sortCx({
    /** The portrait tile: the photo fills it and the frosted panel is pinned to its bottom. */
    tile: "relative flex w-full flex-col justify-end",
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

/**
 * `span` places the tile in the desktop mosaic; the small tiles drop their bio and
 * social row at `lg` because the mosaic leaves them too little room.
 */
const team = [
    {
        photo: avatar(0),
        role: "Founder & CEO",
        bio: `Former co-founder of ${LOGOS[0].name}. Early staff at ${LOGOS[1].name} and ${LOGOS[2].name}.`,
        span: "lg:col-span-2 lg:row-span-2",
        isCompact: false,
    },
    {
        photo: avatar(1),
        role: "Engineering Manager",
        bio: `Lead engineering teams at ${LOGOS[3].name}, ${LOGOS[4].name}, and ${LOGOS[5].name}.`,
        span: "",
        isCompact: true,
    },
    {
        photo: avatar(2),
        role: "Product Manager",
        bio: `Former PM for ${LOGOS[0].name}, ${LOGOS[1].name}, and ${LOGOS[2].name}.`,
        span: "",
        isCompact: true,
    },
    {
        photo: avatar(3),
        role: "Frontend Developer",
        bio: `Former frontend dev for ${LOGOS[3].name}, ${LOGOS[4].name}, and ${LOGOS[5].name}.`,
        span: "lg:row-span-2",
        isCompact: false,
    },
    {
        photo: avatar(4),
        role: "Backend Developer",
        bio: `Lead backend dev at ${LOGOS[0].name}. Former ${LOGOS[1].name} and ${LOGOS[2].name}.`,
        span: "",
        isCompact: true,
    },
    {
        photo: avatar(5),
        role: "Product Designer",
        bio: `Founding design team at ${LOGOS[3].name}. Former ${LOGOS[4].name} and ${LOGOS[5].name}.`,
        span: "",
        isCompact: true,
    },
    {
        photo: avatar(6),
        role: "UI Designer",
        bio: `Founding design team at ${LOGOS[3].name}. Former ${LOGOS[4].name} and ${LOGOS[5].name}.`,
        span: "lg:col-span-2 lg:row-span-2",
        isCompact: false,
    },
    {
        photo: avatar(7),
        role: "UI Designer",
        bio: `Lead product design at ${LOGOS[0].name}. Former ${LOGOS[1].name} and ${LOGOS[2].name}.`,
        span: "",
        isCompact: true,
    },
];

/** A centered intro above a mosaic of portraits, each captioned with a frosted card. */
export const TeamSectionImageCollage01 = () => (
    <section className="bg-primary py-16 md:py-24">
        <div className="max-w-container mx-auto px-4 md:px-8">
            <div className="mx-auto flex w-full max-w-3xl flex-col items-center text-center">
                <span className="text-brand-secondary md:text-md text-sm font-semibold">Join our team</span>
                <h2 className="text-display-sm md:text-display-md text-primary mt-3 font-semibold">We&apos;re just getting started</h2>
                <p className="text-tertiary mt-4 text-lg md:mt-5 md:text-xl">
                    Our philosophy is simple: hire a team of diverse, passionate people and foster a culture that empowers you to do your best work.
                </p>

                <div className="mt-8 flex flex-col-reverse gap-3 self-stretch sm:flex-row sm:justify-center">
                    <Button size="xl" color="secondary">
                        Read our principles
                    </Button>
                    <Button size="xl">We&apos;re hiring!</Button>
                </div>
            </div>

            <div className="mt-12 md:mt-16">
                <ul className="grid w-full auto-rows-[432px] grid-cols-1 gap-6 sm:grid-cols-2 lg:auto-rows-[360px] lg:grid-cols-3">
                    {team.map((member) => (
                        <li key={member.photo.name} className={cx(styles.tile, member.span)}>
                            <img src={member.photo.src} alt={member.photo.name} className={styles.image} />

                            <div className={styles.scrim}>
                                <div className={styles.panel}>
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-xl font-semibold">{member.photo.name}</h3>
                                        <ArrowUpRight aria-hidden="true" className="size-6 rtl:-scale-x-100" />
                                    </div>

                                    <p className="text-md mt-2 font-semibold">{member.role}</p>
                                    <p className={cx("md:text-md mt-0.5 text-sm", member.isCompact && "lg:hidden")}>{member.bio}</p>

                                    <ul className={cx("mt-4 flex gap-5", member.isCompact && "lg:hidden")}>
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
