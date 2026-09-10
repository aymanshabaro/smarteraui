"use client";

import { useState } from "react";
import { ArrowNext, ArrowPrevious } from "@properui/icons";
import { Button } from "@/components/base/buttons/button";
import { SocialButton } from "@/components/base/buttons/social-button";
import { Checkbox } from "@/components/base/checkbox/checkbox";
import { Form } from "@/components/base/form/form";
import { Input } from "@/components/base/input/input";
import { ProperLogo } from "@/components/foundations/logo/proper-logo";
import { ProperLogoMinimal } from "@/components/foundations/logo/proper-logo-minimal";
import { RatingStars } from "@/components/foundations/rating/rating-stars";
import { AVATARS, IMAGES, LOGOS } from "@/utils/demo-assets";

const reviews = [
    {
        quote: "We've been using Proper to kick start every new project and can't imagine working without it. It's incredible.",
        author: AVATARS[11],
        role: `Founder, ${LOGOS[3].name}`,
        industry: "Web Design Agency",
        portrait: IMAGES.square[2],
    },
    {
        quote: "Proper has saved us thousands of hours of work. We're able to spin up projects faster and take on more clients.",
        author: AVATARS[5],
        role: `Head of Design, ${LOGOS[0].name}`,
        industry: "Web Development Agency",
        portrait: IMAGES.square[3],
    },
];

const triggerClass =
    "group outline-focus-ring flex size-12 cursor-pointer items-center justify-center rounded-full border border-white/50 transition duration-100 ease-linear hover:border-white/40 focus-visible:outline-2 focus-visible:outline-offset-2 md:size-14";

/** Split log in page with a portrait panel whose review sits in a frosted glass card. */
export const LoginSplitQuoteImage02 = () => {
    const [index, setIndex] = useState(0);
    const review = reviews[index]!;

    const go = (delta: number) => setIndex((current) => (current + delta + reviews.length) % reviews.length);

    return (
        <section className="bg-primary grid min-h-screen grid-cols-1 lg:grid-cols-2">
            <div className="relative flex justify-center px-4 py-12 md:items-center md:px-8">
                <div className="flex w-full flex-col gap-8 sm:max-w-90">
                    <div className="flex flex-col gap-6">
                        <header className="start-8 top-8 lg:absolute">
                            <ProperLogo className="max-lg:hidden" />
                            <ProperLogoMinimal className="size-8 origin-center scale-[1.2] lg:hidden" />
                        </header>

                        <div className="flex flex-col gap-2 md:gap-3">
                            <h1 className="text-primary md:text-display-xs text-xl font-semibold">Welcome back</h1>
                            <p className="text-tertiary text-md">Welcome back! Please enter your details.</p>
                        </div>
                    </div>

                    <Form className="flex flex-col gap-6">
                        <div className="flex flex-col gap-5">
                            <Input isRequired size="lg" name="email" type="email" label="Email" placeholder="Enter your email" />
                            <Input
                                isRequired
                                size="lg"
                                name="password"
                                type="password"
                                label="Password"
                                placeholder="••••••••••••"
                                inputClassName="placeholder:text-placeholder/50"
                            />
                        </div>

                        <div className="flex items-center">
                            <Checkbox name="remember" label="Remember for 30 days" />
                            <Button href="/forgot-password" color="link-color" size="md" className="ms-auto">
                                Forgot password
                            </Button>
                        </div>

                        <div className="flex flex-col gap-4">
                            <Button type="submit" size="lg">
                                Sign in
                            </Button>
                            <SocialButton social="google" size="lg">
                                Sign in with Google
                            </SocialButton>
                        </div>
                    </Form>

                    <footer className="absolute start-8 bottom-8 hidden md:flex">
                        <p className="text-tertiary text-sm">© Proper UI 2077</p>
                    </footer>

                    <div className="flex justify-center gap-1 text-center">
                        <span className="text-tertiary text-sm">Don&apos;t have an account?</span>
                        <Button href="/signup" color="link-color" size="md">
                            Sign up
                        </Button>
                    </div>
                </div>
            </div>

            <div className="relative hidden flex-col items-start justify-end overflow-hidden lg:flex">
                <img src={review.portrait.src} alt="" className="absolute inset-0 size-full object-cover" />

                <figure className="relative z-10 bg-linear-to-t from-black/40 to-black/0 p-8 pt-24">
                    <div className="bg-primary/25 flex h-max flex-col gap-8 overflow-hidden rounded-2xl px-5 py-6 ring-1 ring-white/30 backdrop-blur-[8px] ring-inset">
                        <q className="text-display-sm font-semibold text-balance text-white">{review.quote}</q>

                        <figcaption className="flex flex-col gap-3">
                            <div className="flex flex-row justify-between">
                                <p className="md:text-display-xs text-xl font-semibold whitespace-nowrap text-white">{review.author.name}</p>
                                <RatingStars className="hidden gap-1 md:flex" starClassName="text-fg-white" />
                            </div>

                            <div className="flex w-full flex-row gap-3">
                                <div className="flex w-full flex-col gap-1">
                                    <p className="text-md font-semibold whitespace-nowrap text-white">{review.role}</p>
                                    <p className="text-sm font-medium whitespace-nowrap text-white">{review.industry}</p>
                                </div>

                                <div className="flex gap-8">
                                    <button type="button" aria-label="Previous review" onClick={() => go(-1)} className={triggerClass}>
                                        <ArrowPrevious
                                            aria-hidden="true"
                                            className="text-fg-white transition-inherit-all size-5 group-hover:opacity-70 md:size-6"
                                        />
                                    </button>
                                    <button type="button" aria-label="Next review" onClick={() => go(1)} className={triggerClass}>
                                        <ArrowNext
                                            aria-hidden="true"
                                            className="text-fg-white transition-inherit-all size-5 group-hover:opacity-70 md:size-6"
                                        />
                                    </button>
                                </div>
                            </div>
                        </figcaption>
                    </div>
                </figure>
            </div>
        </section>
    );
};
