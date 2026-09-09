"use client";

import { useState } from "react";
import { ContentDivider } from "@/components/application/content-divider/content-divider";
import { Button } from "@/components/base/buttons/button";
import { SocialButton } from "@/components/base/buttons/social-button";
import { Form } from "@/components/base/form/form";
import { Input } from "@/components/base/input/input";
import { SmarteraLogoMinimal } from "@/components/foundations/logo/smartera-logo-minimal";
import { IMAGES } from "@/utils/demo-assets";
import { LogInPrompt } from "./base-components/page-parts";
import type { Testimonial } from "./base-components/testimonial-overlay";
import { TestimonialOverlay } from "./base-components/testimonial-overlay";

const firstTestimonial: Testimonial = {
    quote: "Smartera has saved us thousands of hours of work. We're able to spin up projects faster and take on more clients.",
    name: "Orlando Diggs",
    role: "Product Manager, Hourglass",
    company: "Web Design Agency",
};

const testimonials: Testimonial[] = [
    firstTestimonial,
    {
        quote: "The components are the closest thing to a shared language our design and engineering teams have ever had.",
        name: "Andi Lane",
        role: "Design Director, Quotient",
        company: "Fintech Platform",
    },
    {
        quote: "Every new marketing page now ships the same week it is briefed. That was unthinkable a year ago.",
        name: "Koray Okumus",
        role: "Growth Lead, Sisyphus",
        company: "Developer Tools",
    },
];

/** Split image signup that leads with social providers and frames the testimonial in a rounded card. */
export const SignupSplitQuoteImage02 = () => {
    const [index, setIndex] = useState(0);

    return (
        <section className="bg-primary grid min-h-screen grid-cols-1 lg:grid-cols-2">
            <div className="bg-primary flex flex-1 justify-center px-4 py-12 md:items-center md:px-8">
                <div className="flex w-full flex-col gap-8 sm:max-w-90">
                    <div className="flex flex-col items-center justify-center gap-6 text-center">
                        <SmarteraLogoMinimal className="size-8" />

                        <div className="flex flex-col gap-2 md:gap-3">
                            <h1 className="text-primary md:text-display-xs text-xl font-semibold">Create an account</h1>
                            <p className="text-tertiary text-md">Start your 30-day free trial.</p>
                        </div>
                    </div>

                    <Form className="flex flex-col gap-6">
                        <div className="flex flex-col gap-3">
                            <SocialButton social="google" theme="color" size="lg">
                                Sign up with Google
                            </SocialButton>
                            <SocialButton social="facebook" theme="color" size="lg">
                                Sign up with Facebook
                            </SocialButton>
                            <SocialButton social="apple" theme="color" size="lg">
                                Sign up with Apple
                            </SocialButton>
                        </div>

                        <ContentDivider>
                            <span className="text-tertiary text-sm font-medium">OR</span>
                        </ContentDivider>

                        <div className="flex flex-col gap-4">
                            <Input isRequired size="lg" name="email" type="text" placeholder="Enter your email" />
                            <Button type="submit" size="lg">
                                Get started
                            </Button>
                        </div>
                    </Form>

                    <LogInPrompt />
                </div>
            </div>

            <div className="relative hidden flex-1 overflow-hidden py-6 pe-6 lg:flex">
                <div className="relative flex flex-1 flex-col justify-end overflow-hidden rounded-[20px]">
                    <img src={IMAGES.square[2].src} alt={IMAGES.square[2].alt} className="absolute inset-0 size-full object-cover" />

                    <div className="z-10 rounded-b-[20px] bg-linear-to-t from-black/40 to-black/0 pt-24">
                        <TestimonialOverlay
                            testimonial={testimonials[index] ?? firstTestimonial}
                            onNavigate={(direction) => setIndex((current) => (current + direction + testimonials.length) % testimonials.length)}
                            className="before:bg-alpha-white/30 relative rounded-b-[20px] p-8 pt-[31px] backdrop-blur-[10px] before:absolute before:inset-x-0 before:top-0 before:h-px"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};
