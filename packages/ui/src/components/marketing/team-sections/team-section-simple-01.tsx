import { avatar } from "../../../utils/demo-assets";
import { Avatar } from "../../base/avatar/avatar";

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

/** A centered intro above a responsive grid of circular portraits with name and role. */
export const TeamSectionSimple01 = () => (
    <section className="bg-primary py-16 md:py-24">
        <div className="max-w-container mx-auto px-4 md:px-8">
            <div className="mx-auto flex w-full max-w-3xl flex-col items-center text-center">
                <span className="text-brand-secondary md:text-md text-sm font-semibold">We&apos;re hiring!</span>
                <h2 className="text-display-sm md:text-display-md text-primary mt-3 font-semibold">Meet our team</h2>
                <p className="text-tertiary mt-4 text-lg md:mt-5 md:text-xl">
                    Our philosophy is simple: hire a team of diverse, passionate people and foster a culture that empowers you to do your best work.
                </p>
            </div>

            <div className="mt-12 md:mt-16">
                <ul className="grid w-full grid-cols-1 justify-items-center gap-x-8 gap-y-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {team.map((member) => (
                        <li key={member.photo.name} className="flex flex-col items-center gap-4 md:gap-5">
                            <Avatar size="2xl" border src={member.photo.src} alt={member.photo.name} className="size-20 md:size-24" />

                            <div className="text-center">
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
