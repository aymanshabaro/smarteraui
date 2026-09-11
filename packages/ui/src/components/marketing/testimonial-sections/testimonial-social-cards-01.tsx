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

/** Two columns of bordered review cards, each badged with the customer's logo. */
export const TestimonialSocialCards01 = () => (
    <section className="bg-primary flex flex-col items-center gap-16 py-16 lg:py-24">
        <div className="max-w-container flex flex-col items-center gap-4 px-4 text-center lg:gap-5 lg:px-8">
            <h2 className="text-display-sm lg:text-display-md text-primary font-semibold">Our reviews</h2>
            <p className="text-tertiary text-lg lg:text-xl">Hear first-hand from our incredible community of customers.</p>
        </div>

        <div className="max-w-container grid grid-cols-1 gap-5 px-4 lg:grid-cols-2 lg:gap-6 lg:px-8">
            {reviews.map((review) => (
                <div
                    key={review.author.name}
                    className="bg-primary_alt ring-secondary flex flex-col gap-12 rounded-xl p-6 shadow-xs ring-1 lg:min-h-64 lg:justify-between lg:gap-0 lg:p-8"
                >
                    <div className="flex flex-col items-start gap-3">
                        {/* `dark:invert` is a documented asset swap: the placeholder wordmarks ship as a single mono
                            set instead of the reference's paired colour/white files. */}
                        <img src={review.logo.src} alt={review.logo.name} className="h-8 object-contain lg:hidden dark:invert" />
                        <blockquote className="text-primary text-lg font-medium lg:text-xl">{review.quote}</blockquote>
                    </div>

                    <div className="flex justify-between">
                        <AvatarLabelGroup
                            size="lg"
                            src={review.author.src}
                            alt={review.author.name}
                            title={
                                <span className="relative flex items-center gap-1">
                                    {review.author.name}
                                    <VerifiedTick size="lg" />
                                </span>
                            }
                            subtitle={review.role}
                        />

                        <img src={review.logo.src} alt="" className="h-8 object-contain max-lg:hidden dark:invert" />
                    </div>
                </div>
            ))}
        </div>
    </section>
);
