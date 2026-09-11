import { AVATARS, LOGOS } from "../../../utils/demo-assets";
import { Avatar } from "../../base/avatar/avatar";
import { RatingStars } from "../../foundations/rating/rating-stars";

const review = {
    quote: "Love the simplicity of the service and the prompt customer support. We can't imagine working without it.",
    author: AVATARS[4],
    role: `Head of Design, ${LOGOS[0].name}`,
};

/** A single centered quote with the author's avatar and a five-star rating underneath. */
export const TestimonialSimpleCentered01 = () => (
    <section className="bg-primary py-16 md:py-24">
        <div className="max-w-container mx-auto px-4 md:px-8">
            <div className="flex flex-col items-center gap-10">
                <figure className="flex max-w-270 flex-col gap-8 text-center">
                    <blockquote className="text-display-sm md:text-display-md text-primary font-medium text-balance">{review.quote}</blockquote>

                    <figcaption className="flex flex-col items-center gap-4">
                        <div className="flex flex-col items-center gap-4">
                            <Avatar size="lg" border src={review.author.src} alt={review.author.name} />

                            <div className="flex flex-col gap-1">
                                <p className="text-primary text-lg font-semibold">{review.author.name}</p>
                                <cite className="text-md text-tertiary not-italic">{review.role}</cite>
                            </div>
                        </div>

                        <RatingStars aria-hidden="true" className="gap-1" />
                    </figcaption>
                </figure>
            </div>
        </div>
    </section>
);
