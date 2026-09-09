import { Dribbble, LinkedIn, X } from "@/components/foundations/social-icons";
import { sortCx } from "@/utils/cx";
import { LOGOS, avatar } from "@/utils/demo-assets";

const styles = sortCx({
    /** The muted social link repeated under every member's bio. */
    socialLink:
        "text-fg-quaternary outline-focus-ring hover:text-fg-quaternary_hover flex rounded-xs transition duration-100 ease-linear focus-visible:outline-2 focus-visible:outline-offset-2",
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
    { photo: avatar(6), role: "UX Researcher", bio: `Lead user research for ${LOGOS[0].name}. Contractor for ${LOGOS[1].name} and ${LOGOS[2].name}.` },
    { photo: avatar(7), role: "Customer Success", bio: `Lead CX at ${LOGOS[3].name}. Former ${LOGOS[4].name} and ${LOGOS[5].name}.` },
];

/** Two columns of side-by-side portrait-and-bio rows under a wide intro. */
export const TeamSectionImageCard03 = () => (
    <section className="bg-primary py-16 md:py-24">
        <div className="max-w-container mx-auto px-4 md:px-8">
            <div className="flex flex-1 flex-col lg:max-w-(--breakpoint-md)">
                <span className="text-brand-secondary md:text-md text-sm font-semibold">Our team</span>
                <h2 className="text-display-sm md:text-display-md text-primary mt-3 font-semibold">Leadership team</h2>
                <p className="text-tertiary mt-4 text-lg md:mt-5 md:text-xl">
                    We&apos;re a cross-disciplinary team with a wealth of experience that loves to create great experiences for our customers.
                </p>
            </div>

            <ul className="grid grid-cols-1 gap-x-8 gap-y-12 pt-12 lg:grid-cols-2 lg:pt-16">
                {team.map((member) => (
                    <li key={member.photo.name} className="flex flex-col gap-4 sm:flex-row sm:gap-6">
                        <img src={member.photo.src} alt={member.photo.name} className="aspect-square w-full min-w-0 flex-1 object-cover sm:max-h-[273px]" />

                        <div className="min-w-0 flex-1">
                            <h3 className="text-primary text-lg font-semibold">{member.photo.name}</h3>
                            <p className="text-md text-brand-secondary">{member.role}</p>
                            <p className="text-md text-tertiary mt-2">{member.bio}</p>

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
                                            <Icon aria-hidden="true" className="size-6" />
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    </section>
);
