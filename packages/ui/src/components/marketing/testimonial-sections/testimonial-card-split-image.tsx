import { AVATARS, IMAGES, LOGOS } from "../../../utils/demo-assets";
import { PlayButtonIcon } from "../../foundations/play-button-icon";
import { RatingStars } from "../../foundations/rating/rating-stars";

const review = {
    quote: "Love the simplicity of the service and the prompt customer support. We can't imagine working without it.",
    author: AVATARS[5],
    role: `Product Designer, ${LOGOS[4].name}`,
    portrait: IMAGES.square[1],
};

/** A filled card that pairs a rated quote with a video-style portrait panel. */
export const TestimonialCardSplitImage = () => (
    <section className="bg-primary py-16 md:py-24">
        <div className="max-w-container mx-auto px-4 md:px-8">
            <div className="bg-secondary grid grid-cols-1 items-center overflow-hidden rounded-2xl md:rounded-3xl lg:grid-cols-[auto_auto]">
                <div className="flex flex-1 flex-col gap-8 px-6 py-10 md:gap-8 md:px-8 md:py-12 lg:p-16">
                    <figure className="flex flex-col gap-8">
                        <div className="flex flex-col gap-4 md:gap-6">
                            <RatingStars aria-hidden="true" className="gap-1" />
                            <blockquote className="text-display-xs sm:text-display-sm md:text-display-md text-primary font-medium text-balance">
                                {review.quote}
                            </blockquote>
                        </div>

                        <figcaption className="flex flex-col gap-1">
                            <p className="text-primary text-lg font-semibold">&mdash; {review.author.name}</p>
                            <cite className="text-md text-tertiary not-italic">{review.role}</cite>
                        </figcaption>
                    </figure>
                </div>

                <div className="relative flex h-70 w-full items-center justify-center overflow-hidden sm:h-full sm:min-h-90 lg:min-h-112 lg:w-120">
                    <img alt="" src={review.portrait.src} className="absolute inset-0 size-full object-cover" />
                    <span aria-hidden="true" className="absolute flex size-full items-center justify-center">
                        <PlayButtonIcon className="size-16" />
                    </span>
                </div>
            </div>
        </div>
    </section>
);
