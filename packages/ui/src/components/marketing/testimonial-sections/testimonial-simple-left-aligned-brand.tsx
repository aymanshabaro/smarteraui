import { RatingStars } from "@/components/foundations/rating/rating-stars";
import { AVATARS, IMAGES, LOGOS } from "@/utils/demo-assets";

const review = {
    quote: "Love the simplicity of the service and the prompt customer support. We can't imagine working without it.",
    author: AVATARS[2],
    role: `Head of Design, ${LOGOS[0].name}`,
    portrait: IMAGES.square[0],
};

/** The left-aligned portrait testimonial on the brand-colored section background. */
export const TestimonialSimpleLeftAlignedBrand = () => (
    <section className="bg-brand-section py-16 md:py-24">
        <div className="max-w-container mx-auto px-4 md:px-8">
            <figure className="flex flex-col gap-10 lg:flex-row lg:gap-32">
                <img alt="" src={review.portrait.src} className="size-[200px] rounded-2xl object-cover md:size-[328px]" />

                <div className="flex flex-col gap-8 md:ps-8">
                    <div className="flex flex-col gap-4 md:gap-6">
                        <RatingStars aria-hidden="true" className="gap-1" />
                        <blockquote className="text-display-xs md:text-display-md text-primary_on-brand font-medium text-balance">{review.quote}</blockquote>
                    </div>

                    <figcaption className="flex flex-col gap-1">
                        <p className="text-primary_on-brand text-lg font-semibold">&mdash; {review.author.name}</p>
                        <cite className="text-md text-tertiary_on-brand not-italic">{review.role}</cite>
                    </figcaption>
                </div>
            </figure>
        </div>
    </section>
);
