import { AvatarLabelGroup } from "@/components/base/avatar/avatar-label-group";
import { VerifiedTick } from "@/components/base/avatar/base-components";
import { RatingStars } from "@/components/foundations/rating/rating-stars";
import { AVATARS } from "@/utils/demo-assets";

const reviews = [
    { author: AVATARS[6], quote: "We've been using Proper to kick start every new project and can't imagine working without it." },
    { author: AVATARS[9], quote: "From concept to completion, Proper helps us deliver outstanding designs faster than ever." },
    { author: AVATARS[11], quote: "Every project starts with Proper which has 10x'd our output. It saves us time while keeping the quality top-notch." },
    { author: AVATARS[2], quote: "Proper has quickly become our go-to resource for every design project. The results are consistently amazing." },
    { author: AVATARS[7], quote: "Proper offers exactly what we need to get started quickly. It's helped us cut down on design time significantly!" },
    { author: AVATARS[3], quote: "Proper offers everything we need to get started on UI projects quickly. We go from zero to one, insanely fast." },
] as const;

/** A three-column wall of rated quotes attributed by social handle. */
export const TestimonialSocialCards02 = () => (
    <section className="bg-primary flex flex-col items-center gap-16 py-16 lg:py-24">
        <div className="max-w-container flex flex-col items-center gap-4 px-4 text-center lg:gap-5 lg:px-8">
            <h2 className="text-display-sm lg:text-display-md text-primary font-semibold">Wall of love</h2>
            <p className="text-tertiary text-lg lg:text-xl">Hear first-hand from our incredible community of customers.</p>
        </div>

        <div className="max-w-container grid grid-cols-1 gap-5 px-4 lg:grid-cols-3 lg:gap-6 lg:px-8">
            {reviews.map((review) => (
                <div key={review.author.name} className="bg-secondary flex flex-col items-start gap-8 rounded-xl p-6 lg:justify-between lg:p-8">
                    <div className="flex flex-col items-start gap-4">
                        <RatingStars aria-hidden="true" className="gap-1" />
                        <blockquote className="text-md text-primary font-medium">{review.quote}</blockquote>
                    </div>

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
                        subtitle={review.author.username}
                    />
                </div>
            ))}
        </div>
    </section>
);
