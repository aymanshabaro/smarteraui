"use client";

import { Link as AriaLink } from "react-aria-components";
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

/** The wall of love on the brand-colored section background, with linked social handles. */
export const TestimonialSocialCards02Brand = () => (
    <section className="bg-brand-section flex flex-col items-center gap-16 py-16 lg:py-24">
        <div className="max-w-container flex flex-col items-center gap-4 px-4 text-center lg:gap-5 lg:px-8">
            <h2 className="text-display-sm lg:text-display-md text-primary_on-brand font-semibold">Wall of love</h2>
            <p className="text-tertiary_on-brand text-lg lg:text-xl">Hear first-hand from our incredible community of customers.</p>
        </div>

        <div className="max-w-container grid grid-cols-1 gap-5 px-4 lg:grid-cols-3 lg:gap-6 lg:px-8">
            {reviews.map((review) => (
                <div key={review.author.name} className="bg-brand-section_subtle flex flex-col items-start gap-8 rounded-xl p-6 lg:justify-between lg:p-8">
                    <div className="flex flex-col items-start gap-4">
                        <RatingStars aria-hidden="true" className="gap-1" />
                        <blockquote className="text-md text-primary_on-brand font-medium">{review.quote}</blockquote>
                    </div>

                    <AriaLink href="#" className="group outline-focus-ring flex cursor-pointer rounded focus-visible:outline-2 focus-visible:outline-offset-2">
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
                            subtitle={<span className="text-tertiary_on-brand underline decoration-1 underline-offset-4">{review.author.username}</span>}
                        />
                    </AriaLink>
                </div>
            ))}
        </div>
    </section>
);
