import { AVATARS, LOGOS } from "../../../utils/demo-assets";
import { Avatar } from "../../base/avatar/avatar";

const review = {
    industry: "Financial Services",
    quote: "Proper UI has saved us thousands of hours of work. We're able to spin up projects and features faster.",
    author: AVATARS[11],
    role: `Web Developer, ${LOGOS[1].name}`,
};

/** The card testimonial with a brand-colored card on the page background. */
export const TestimonialCardBrand = () => (
    <section className="bg-primary py-16 md:py-24">
        <div className="max-w-container mx-auto px-4 md:px-8">
            <figure className="bg-brand-section flex flex-col gap-6 rounded-2xl px-6 py-10 text-center text-balance md:gap-8 md:px-8 md:py-12 lg:p-16">
                <div className="flex flex-col gap-3">
                    <span className="text-secondary_on-brand text-sm font-semibold">{review.industry}</span>
                    <blockquote className="text-display-xs sm:text-display-sm md:text-display-md font-medium text-white">{review.quote}</blockquote>
                </div>

                <figcaption className="flex justify-center">
                    <div className="flex flex-col items-center gap-4">
                        <Avatar size="lg" border className="bg-primary" src={review.author.src} alt={review.author.name} />

                        <div className="flex flex-col gap-1">
                            <p className="text-md text-primary_on-brand font-semibold">{review.author.name}</p>
                            <cite className="text-tertiary_on-brand text-sm not-italic">{review.role}</cite>
                        </div>
                    </div>
                </figcaption>
            </figure>
        </div>
    </section>
);
