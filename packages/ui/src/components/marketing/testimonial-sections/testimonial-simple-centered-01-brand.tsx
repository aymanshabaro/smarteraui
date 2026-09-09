import { Avatar } from "@/components/base/avatar/avatar";
import { RatingStars } from "@/components/foundations/rating/rating-stars";
import { AVATARS, LOGOS } from "@/utils/demo-assets";

const review = {
    quote: "Love the simplicity of the service and the prompt customer support. We can't imagine working without it.",
    author: AVATARS[4],
    role: `Head of Design, ${LOGOS[0].name}`,
};

/** The centered single-quote testimonial on the brand-colored section background. */
export const TestimonialSimpleCentered01Brand = () => (
    <section className="bg-brand-section py-16 md:py-24">
        <div className="max-w-container mx-auto px-4 md:px-8">
            <div className="flex flex-col items-center gap-10">
                <figure className="flex max-w-270 flex-col gap-8 text-center">
                    <blockquote className="text-display-sm md:text-display-md text-primary_on-brand font-medium text-balance">{review.quote}</blockquote>

                    <figcaption className="flex flex-col items-center gap-4">
                        <div className="flex flex-col items-center gap-4">
                            <Avatar size="lg" border className="bg-primary" src={review.author.src} alt={review.author.name} />

                            <div className="flex flex-col gap-1">
                                <p className="text-primary_on-brand text-lg font-semibold">{review.author.name}</p>
                                <cite className="text-md text-tertiary_on-brand not-italic">{review.role}</cite>
                            </div>
                        </div>

                        <RatingStars aria-hidden="true" className="gap-1" />
                    </figcaption>
                </figure>
            </div>
        </div>
    </section>
);
