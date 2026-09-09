import { Button } from "@/components/base/buttons/button";
import { avatar } from "@/utils/demo-assets";

const team = [
    { photo: avatar(0), role: "Founder & CEO" },
    { photo: avatar(1), role: "Engineering Manager" },
    { photo: avatar(2), role: "Product Manager" },
    { photo: avatar(3), role: "Frontend Developer" },
    { photo: avatar(4), role: "Backend Developer" },
    { photo: avatar(5), role: "Product Designer" },
    { photo: avatar(6), role: "UX Researcher" },
    { photo: avatar(7), role: "Customer Success" },
];

/** A split intro row with calls to action above a grid of square portrait cards. */
export const TeamSectionImageCard02 = () => (
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
                <ul className="grid w-full grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {team.map((member) => (
                        <li key={member.photo.name} className="flex flex-col gap-4">
                            <img src={member.photo.src} alt={member.photo.name} className="aspect-square w-full object-cover" />

                            <div>
                                <h3 className="text-primary text-lg font-semibold">{member.photo.name}</h3>
                                <p className="text-md text-brand-secondary">{member.role}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    </section>
);
