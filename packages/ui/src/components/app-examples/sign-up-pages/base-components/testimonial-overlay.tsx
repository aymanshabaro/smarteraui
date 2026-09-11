"use client";

import { ArrowLeft, ArrowRight } from "@properui/icons";
import { cx } from "../../../../utils/cx";
import { RatingStars } from "../../../foundations/rating/rating-stars";

export interface Testimonial {
    /** The quoted sentence. */
    quote: string;
    /** The person being quoted. */
    name: string;
    /** Their role and company. */
    role: string;
    /** What the company does. */
    company: string;
}

export interface TestimonialOverlayProps {
    /** The testimonial to display. */
    testimonial: Testimonial;
    /** Called with `-1` or `1` when a navigation arrow is pressed. */
    onNavigate?: (direction: -1 | 1) => void;
    /** The class name applied to the frosted card. */
    className?: string;
}

/** The frosted glass testimonial card that sits over the portrait on the split image pages. */
export const TestimonialOverlay = ({ testimonial, onNavigate, className }: TestimonialOverlayProps) => (
    <figure className={cx("bg-alpha-white/30 flex flex-col gap-8", className)}>
        <q className="text-display-sm font-semibold text-balance text-white">{testimonial.quote}</q>

        <figcaption className="flex flex-col gap-3">
            <div className="flex flex-row items-start justify-between gap-4">
                <p className="md:text-display-xs text-xl font-semibold whitespace-nowrap text-white">{testimonial.name}</p>
                <RatingStars rating={5} starClassName="text-fg-white" className="hidden gap-1 md:flex" />
            </div>

            <div className="flex flex-row justify-between gap-3">
                <div className="flex w-full flex-col gap-1">
                    <cite className="text-md font-semibold whitespace-nowrap text-white not-italic">{testimonial.role}</cite>
                    <p className="text-sm font-medium whitespace-nowrap text-white">{testimonial.company}</p>
                </div>

                <div className="flex gap-8">
                    <button
                        type="button"
                        aria-label="Previous review"
                        onClick={() => onNavigate?.(-1)}
                        className="group outline-focus-ring flex size-8 cursor-pointer items-center justify-center rounded-full border border-white/50 transition duration-100 ease-linear hover:border-white/40 focus-visible:outline-2 focus-visible:outline-offset-2 md:size-14"
                    >
                        <ArrowLeft aria-hidden="true" className="text-fg-white transition-inherit-all size-5 group-hover:opacity-70 md:size-6" />
                    </button>
                    <button
                        type="button"
                        aria-label="Next review"
                        onClick={() => onNavigate?.(1)}
                        className="group outline-focus-ring flex size-8 cursor-pointer items-center justify-center rounded-full border border-white/50 transition duration-100 ease-linear hover:border-white/40 focus-visible:outline-2 focus-visible:outline-offset-2 md:size-14"
                    >
                        <ArrowRight aria-hidden="true" className="text-fg-white transition-inherit-all size-5 group-hover:opacity-70 md:size-6" />
                    </button>
                </div>
            </div>
        </figcaption>
    </figure>
);
