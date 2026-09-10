"use client";

import { useState } from "react";
import { IMAGES } from "@/utils/demo-assets";
import { SignUpFormColumn } from "./base-components/form-column";
import type { Testimonial } from "./base-components/testimonial-overlay";
import { TestimonialOverlay } from "./base-components/testimonial-overlay";

const firstTestimonial: Testimonial = {
    quote: "We've been using Proper UI to kick start every new project and can't imagine working without it. It's incredible.",
    name: "Candice Wu",
    role: "Lead Designer, Layers",
    company: "Web Development Agency",
};

const testimonials: Testimonial[] = [
    firstTestimonial,
    {
        quote: "Our design system finally has one source of truth. Onboarding a new engineer now takes an afternoon.",
        name: "Drew Cano",
        role: "Head of Product, Circooles",
        company: "Analytics Platform",
    },
    {
        quote: "Proper UI paid for itself in the first sprint. Every screen we ship starts from one of its page examples.",
        name: "Kate Morrison",
        role: "Founder, Catalog",
        company: "Product Studio",
    },
];

/** Split signup page with a portrait on the right and a frosted testimonial card over its foot. */
export const SignupSplitQuoteImage01 = () => {
    const [index, setIndex] = useState(0);

    return (
        <section className="bg-primary grid min-h-screen grid-cols-1 lg:grid-cols-2">
            <SignUpFormColumn headerClassName="hidden px-8 pt-8 md:block" bodyClassName="md:pb-28" />

            <div className="relative hidden flex-1 flex-col justify-end overflow-hidden lg:flex">
                <img src={IMAGES.square[1].src} alt={IMAGES.square[1].alt} className="absolute inset-0 size-full object-cover" />

                <div className="z-10 bg-linear-to-t from-black/40 to-black/0 p-8 pt-24">
                    <TestimonialOverlay
                        testimonial={testimonials[index] ?? firstTestimonial}
                        onNavigate={(direction) => setIndex((current) => (current + direction + testimonials.length) % testimonials.length)}
                        className="ring-alpha-white/25 overflow-hidden rounded-2xl px-5 py-6 ring-1 backdrop-blur-md ring-inset"
                    />
                </div>
            </div>
        </section>
    );
};
