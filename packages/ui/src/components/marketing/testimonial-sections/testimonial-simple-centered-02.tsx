import { AVATARS, LOGOS } from "../../../utils/demo-assets";
import { Avatar } from "../../base/avatar/avatar";

const review = {
    logo: LOGOS[2],
    quote: "We've been using Proper UI to kick start every new project and can't imagine working without it.",
    author: AVATARS[11],
    role: `Product Manager, ${LOGOS[2].name}`,
};

/** A centered quote introduced by the customer's logo. */
export const TestimonialSimpleCentered02 = () => (
    <section className="bg-primary py-16 md:py-24">
        <div className="max-w-container mx-auto px-4 md:px-8">
            <figure className="flex w-full shrink-0 snap-start flex-col gap-8 text-center">
                {/* `dark:invert` is a documented asset swap: the placeholder wordmarks ship as a single mono
                    set instead of the reference's paired colour/white files. */}
                <img alt={review.logo.name} src={review.logo.src} className="h-10 self-center object-contain dark:invert" />

                <blockquote className="text-display-sm md:text-display-lg text-primary font-medium">{review.quote}</blockquote>

                <figcaption className="flex justify-center">
                    <div className="flex flex-col items-center gap-4">
                        <Avatar size="lg" border src={review.author.src} alt={review.author.name} />

                        <div className="flex flex-col gap-1">
                            <p className="text-primary text-lg font-semibold">{review.author.name}</p>
                            <cite className="text-md text-tertiary not-italic">{review.role}</cite>
                        </div>
                    </div>
                </figcaption>
            </figure>
        </div>
    </section>
);
