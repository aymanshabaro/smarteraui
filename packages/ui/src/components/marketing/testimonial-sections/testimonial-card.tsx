import { Avatar } from "@/components/base/avatar/avatar";
import { AVATARS, LOGOS } from "@/utils/demo-assets";

const review = {
    industry: "Financial Services",
    quote: "Smartera has saved us thousands of hours of work. We're able to spin up projects and features faster.",
    author: AVATARS[11],
    role: `Web Developer, ${LOGOS[1].name}`,
};

/** A quote inside a rounded, filled card with a centered attribution. */
export const TestimonialCard = () => (
    <section className="bg-primary py-16 md:py-24">
        <div className="max-w-container mx-auto px-4 md:px-8">
            <figure className="bg-secondary flex flex-col gap-6 rounded-2xl px-6 py-10 text-center md:gap-8 md:px-8 md:py-12 lg:p-16">
                <div className="flex flex-col gap-3">
                    <span className="text-brand-secondary text-sm font-semibold">{review.industry}</span>
                    <blockquote className="text-display-xs sm:text-display-sm md:text-display-md text-primary font-medium">{review.quote}</blockquote>
                </div>

                <figcaption className="flex justify-center">
                    <div className="flex flex-col items-center gap-4">
                        <Avatar size="lg" border src={review.author.src} alt={review.author.name} />

                        <div className="flex flex-col gap-1">
                            <p className="text-md text-primary font-semibold">{review.author.name}</p>
                            <cite className="text-tertiary text-sm not-italic">{review.role}</cite>
                        </div>
                    </div>
                </figcaption>
            </figure>
        </div>
    </section>
);
