import { LOGOS, avatar } from "../../../utils/demo-assets";
import { Button } from "../../base/buttons/button";

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

/** A centered intro with calls to action above a grid of square portrait cards. */
export const TeamSectionImageCard01 = () => (
    <section className="bg-primary py-16 md:py-24">
        <div className="max-w-container mx-auto px-4 md:px-8">
            <div className="mx-auto flex w-full max-w-3xl flex-col items-center text-center">
                <span className="text-brand-secondary md:text-md text-sm font-semibold">We&apos;re hiring!</span>
                <h2 className="text-display-sm md:text-display-md text-primary mt-3 font-semibold">Meet our team</h2>
                <p className="text-tertiary mt-4 text-lg md:mt-5 md:text-xl">
                    Our philosophy is simple: hire a team of diverse, passionate people and foster a culture that empowers you to do your best work.
                </p>

                <div className="mt-8 flex flex-col gap-3 self-stretch sm:flex-row-reverse sm:justify-center">
                    <Button size="xl">Open positions</Button>
                    <Button size="xl" color="secondary">
                        About us
                    </Button>
                </div>
            </div>

            <div className="mt-12 md:mt-16">
                <ul className="grid w-full grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 md:gap-y-12 lg:grid-cols-3 xl:grid-cols-4">
                    {team.map((member) => (
                        <li key={member.photo.name} className="flex flex-col gap-4">
                            <img src={member.photo.src} alt={member.photo.name} className="aspect-square w-full object-cover" />

                            <div>
                                <h3 className="text-primary text-lg font-semibold">{member.photo.name}</h3>
                                <p className="text-md text-brand-secondary">{member.role}</p>
                                <p className="text-md text-tertiary mt-2">{member.bio}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    </section>
);
