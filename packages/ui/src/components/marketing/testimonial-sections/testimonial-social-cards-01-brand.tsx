import { AVATARS, LOGOS } from "../../../utils/demo-assets";
import { AvatarLabelGroup } from "../../base/avatar/avatar-label-group";
import { VerifiedTick } from "../../base/avatar/base-components";

const reviews = [
    {
        logo: LOGOS[0],
        quote: "We've been using Proper UI to kick start every new project and can't imagine working without it.",
        author: AVATARS[6],
        role: `Project Manager, ${LOGOS[0].name}`,
    },
    {
        logo: LOGOS[1],
        quote: "Proper UI has become an essential part of our design process. It speeds up our workflow and ensures every project starts with a solid foundation.",
        author: AVATARS[4],
        role: `COO, ${LOGOS[1].name}`,
    },
    {
        logo: LOGOS[2],
        quote: "Every project starts with Proper UI, and it's made a huge difference in our output. It's a game-changer for our design team.",
        author: AVATARS[7],
        role: `Designer, ${LOGOS[2].name}`,
    },
    {
        logo: LOGOS[3],
        quote: "Using Proper UI has streamlined our entire design process. It's an invaluable part of our studio!",
        author: AVATARS[9],
        role: `Design Engineer, ${LOGOS[3].name}`,
    },
] as const;

/** The two-column review cards on the brand-colored section background. */
export const TestimonialSocialCards01Brand = () => (
    <section className="bg-brand-section flex flex-col items-center gap-16 py-16 lg:py-24">
        <div className="max-w-container flex flex-col items-center gap-4 px-4 text-center lg:gap-5 lg:px-8">
            <h2 className="text-display-sm lg:text-display-md text-primary_on-brand font-semibold">Our reviews</h2>
            <p className="text-tertiary_on-brand text-lg lg:text-xl">Hear first-hand from our incredible community of customers.</p>
        </div>

        <div className="max-w-container grid grid-cols-1 gap-5 px-4 lg:grid-cols-2 lg:gap-6 lg:px-8">
            {reviews.map((review) => (
                <div
                    key={review.author.name}
                    className="bg-brand-section_subtle flex flex-col gap-12 rounded-xl p-6 shadow-xs lg:min-h-64 lg:justify-between lg:gap-0 lg:p-8"
                >
                    <div className="flex flex-col items-start gap-3">
                        {/* `invert` is a documented asset swap: the placeholder wordmarks ship as a single mono set
                            instead of the reference's paired colour/white files. */}
                        <img src={review.logo.src} alt={review.logo.name} className="block h-8 object-contain invert lg:hidden" />
                        <blockquote className="text-primary_on-brand text-lg font-medium lg:text-xl">{review.quote}</blockquote>
                    </div>

                    <div className="flex justify-between">
                        <AvatarLabelGroup
                            size="lg"
                            src={review.author.src}
                            alt={review.author.name}
                            avatarClassName="bg-primary"
                            title={
                                <span className="text-primary_on-brand relative flex items-center gap-1">
                                    {review.author.name}
                                    <VerifiedTick size="lg" />
                                </span>
                            }
                            subtitle={<span className="text-tertiary_on-brand">{review.role}</span>}
                        />

                        <img src={review.logo.src} alt="" className="hidden h-8 object-contain opacity-85 invert lg:block" />
                    </div>
                </div>
            ))}
        </div>
    </section>
);
