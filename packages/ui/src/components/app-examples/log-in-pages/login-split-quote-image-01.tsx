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
import { AVATARS, IMAGES, LOGOS } from "@/utils/demo-assets";

const reviews = [
    {
        quote: "We've been using Proper to kick start every new project and can't imagine working without it.",
        author: AVATARS[4],
        role: `Lead Designer, ${LOGOS[0].name}`,
        industry: "Web Development Agency",
        portrait: IMAGES.square[0],
    },
    {
        quote: "Proper has saved us thousands of hours of work. We're able to spin up projects faster and take on more clients.",
        author: AVATARS[9],
        role: `Product Manager, ${LOGOS[5].name}`,
        industry: "Web Design Agency",
        portrait: IMAGES.square[1],
    },
];

const triggerClass =
    "group outline-focus-ring flex size-12 cursor-pointer items-center justify-center rounded-full border border-white/50 transition duration-100 ease-linear hover:border-white/40 focus-visible:outline-2 focus-visible:outline-offset-2 md:size-14";

/** Split log in page with a rounded portrait panel carrying a navigable customer review. */
export const LoginSplitQuoteImage01 = () => {
    const [index, setIndex] = useState(0);
    const review = reviews[index]!;

    const go = (delta: number) => setIndex((current) => (current + delta + reviews.length) % reviews.length);

    return (
        <section className="bg-primary grid min-h-screen lg:grid-cols-2">
            <div className="bg-primary relative flex w-full flex-1 flex-col">
                <header className="absolute start-0 top-0 hidden p-8 lg:block">
                    <ProperLogo />
                </header>

                <div className="flex flex-1 justify-center px-4 py-12 md:items-center md:px-8 md:py-0">
                    <div className="flex w-full flex-col gap-8 sm:max-w-90">
                        <div className="flex flex-col gap-6">
                            <ProperLogoMinimal className="size-8 origin-center scale-[1.2] lg:hidden" />

                            <div className="flex flex-col gap-2 lg:gap-3">
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

                        <div className="flex justify-center gap-1 text-center">
                            <span className="text-tertiary text-sm">Don&apos;t have an account?</span>
                            <Button href="/signup" color="link-color" size="md">
                                Sign up
                            </Button>
                        </div>
                    </div>
                </div>

                <footer className="absolute start-0 bottom-0 hidden p-8 pt-11 lg:block">
                    <p className="text-tertiary text-sm">© Proper UI 2077</p>
                </footer>
            </div>

            <figure className="relative hidden flex-1 flex-col items-start justify-end gap-6 overflow-hidden rounded-s-[80px] p-14 lg:flex">
                <img src={review.portrait.src} alt="" className="absolute inset-0 size-full rounded-s-[80px] object-cover brightness-95" />
                <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/10 from-20% to-transparent to-90%" />

                <q className="text-display-md relative z-10 font-medium text-white">{review.quote}</q>

                <figcaption className="relative z-10 flex w-full flex-col gap-3">
                    <p className="md:text-display-xs text-xl font-semibold text-white">{review.author.name}</p>

                    <div className="flex w-full gap-3">
                        <div className="flex w-full flex-col gap-0.5">
                            <p className="text-lg font-semibold text-white not-italic">{review.role}</p>
                            <p className="text-md font-medium text-white not-italic">{review.industry}</p>
                        </div>

                        <div className="flex gap-4 md:gap-8">
                            <button type="button" aria-label="Previous review" onClick={() => go(-1)} className={triggerClass}>
                                <ArrowPrevious aria-hidden="true" className="text-fg-white transition-inherit-all size-5 group-hover:opacity-70 md:size-6" />
                            </button>
                            <button type="button" aria-label="Next review" onClick={() => go(1)} className={triggerClass}>
                                <ArrowNext aria-hidden="true" className="text-fg-white transition-inherit-all size-5 group-hover:opacity-70 md:size-6" />
                            </button>
                        </div>
                    </div>
                </figcaption>
            </figure>
        </section>
    );
};
