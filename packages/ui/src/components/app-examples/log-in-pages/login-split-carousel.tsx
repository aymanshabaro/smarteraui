"use client";

import { ChevronLeft, ChevronRight } from "@properui/icons";
import { Carousel, useCarousel } from "@/components/application/carousel/carousel-base";
import { PaginationDot } from "@/components/application/pagination/pagination-dot";
import { Button } from "@/components/base/buttons/button";
import { SocialButton } from "@/components/base/buttons/social-button";
import { Checkbox } from "@/components/base/checkbox/checkbox";
import { Form } from "@/components/base/form/form";
import { Input } from "@/components/base/input/input";
import { ProperLogo } from "@/components/foundations/logo/proper-logo";
import { ProperLogoMinimal } from "@/components/foundations/logo/proper-logo-minimal";

const months = ["Jan", "Mar", "May", "Jul", "Sep", "Nov", "Dec"];

const slides = [
    {
        title: "Welcome to your new dashboard",
        description: "Sign in to explore changes we've made.",
        lines: ["M0 74 L60 68 L120 58 L180 62 L240 46 L300 38 L360 30 L420 22", "M0 88 L60 86 L120 78 L180 80 L240 70 L300 64 L360 58 L420 50"],
    },
    {
        title: "Track every metric that matters",
        description: "Sign in to see this month's numbers.",
        lines: ["M0 80 L60 62 L120 66 L180 50 L240 52 L300 36 L360 34 L420 20", "M0 94 L60 84 L120 82 L180 72 L240 68 L300 58 L360 52 L420 44"],
    },
    {
        title: "Share reports with your team",
        description: "Sign in to pick up where you left off.",
        lines: ["M0 70 L60 72 L120 54 L180 56 L240 40 L300 42 L360 26 L420 24", "M0 90 L60 88 L120 74 L180 76 L240 62 L300 60 L360 48 L420 46"],
    },
    {
        title: "Built for the way you work",
        description: "Sign in to explore changes we've made.",
        lines: ["M0 78 L60 60 L120 64 L180 46 L240 48 L300 32 L360 28 L420 18", "M0 92 L60 82 L120 80 L180 68 L240 66 L300 54 L360 50 L420 40"],
    },
];

/** Wires the carousel's scroll state into the brand-coloured dot indicator row. */
const CarouselDots = () => {
    const { selectedIndex, scrollSnaps, api } = useCarousel();

    return <PaginationDot isBrand page={selectedIndex + 1} total={scrollSnaps.length} onPageChange={(page) => api?.scrollTo(page - 1)} />;
};

/** The "Users over time" mini chart card with its floating active-users gauge. */
const DashboardPreview = ({ lines }: { lines: string[] }) => (
    <div className="relative flex pb-10">
        <div className="bg-primary ring-secondary_alt flex h-65 w-108 flex-col overflow-hidden rounded-xl p-5 shadow-2xl ring-1">
            <div className="text-primary text-sm font-semibold">Users over time</div>

            <div className="relative flex min-h-0 min-w-0 flex-1 items-center">
                <div aria-hidden="true" className="absolute inset-0 flex size-full flex-col justify-between py-3">
                    {Array.from({ length: 6 }).map((_, index) => (
                        <span key={index} className="bg-border-tertiary h-px w-full" />
                    ))}
                </div>

                <svg viewBox="0 0 420 110" fill="none" preserveAspectRatio="none" aria-hidden="true" className="relative max-h-full w-full max-w-full">
                    {lines.map((d, index) => (
                        <path
                            key={d}
                            d={d}
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className={index === 0 ? "text-fg-brand-primary" : "text-fg-brand-secondary_alt"}
                        />
                    ))}
                </svg>
            </div>

            <ul className="flex justify-between px-2">
                {months.map((month) => (
                    <li key={month} className="text-tertiary text-xs">
                        {month}
                    </li>
                ))}
            </ul>
        </div>

        <div className="bg-alpha-white/90 absolute -end-10 bottom-0 flex size-48 items-center justify-center rounded-xl backdrop-blur">
            <svg viewBox="0 0 120 120" fill="none" aria-hidden="true" className="h-full max-h-full w-full max-w-full">
                <circle cx="60" cy="60" r="46" strokeWidth="8" stroke="currentColor" className="text-fg-brand-primary opacity-25" />
                <circle
                    cx="60"
                    cy="60"
                    r="46"
                    strokeWidth="8"
                    strokeLinecap="round"
                    stroke="currentColor"
                    strokeDasharray="216 289"
                    transform="rotate(-90 60 60)"
                    className="text-fg-brand-primary"
                />
                <circle cx="60" cy="60" r="34" strokeWidth="8" stroke="currentColor" className="text-fg-brand-primary opacity-25" />
                <circle
                    cx="60"
                    cy="60"
                    r="34"
                    strokeWidth="8"
                    strokeLinecap="round"
                    stroke="currentColor"
                    strokeDasharray="128 214"
                    transform="rotate(-90 60 60)"
                    className="text-fg-brand-secondary_alt"
                />
            </svg>

            <div className="absolute flex flex-col items-center text-center md:gap-0.5">
                <p className="text-tertiary text-xs font-medium">Active users</p>
                <p className="text-primary text-xl font-semibold">1,000</p>
            </div>
        </div>
    </div>
);

/** Split log in page with a brand-coloured product carousel filling the right half. */
export const LoginSplitCarousel = () => (
    <section className="bg-primary grid min-h-screen grid-cols-1 lg:grid-cols-2">
        <div className="bg-primary flex flex-col">
            <div className="flex flex-1 justify-center px-4 py-12 md:items-center md:px-8 md:py-32">
                <div className="flex w-full flex-col gap-8 sm:max-w-90">
                    <div className="flex flex-col gap-6 md:gap-20">
                        <ProperLogo className="max-md:hidden" />
                        <ProperLogoMinimal className="size-8 origin-center scale-[1.2] md:hidden" />

                        <div className="flex flex-col gap-2 md:gap-3">
                            <h1 className="text-primary md:text-display-xs text-xl font-semibold">Log in</h1>
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

            <footer className="hidden p-8 pt-11 lg:block">
                <p className="text-tertiary text-sm">© Proper UI 2077</p>
            </footer>
        </div>

        <div className="bg-brand-section relative hidden items-center justify-center overflow-hidden lg:flex">
            <Carousel.Root aria-label="Product highlights" className="z-10 flex w-full flex-col items-center gap-12">
                <Carousel.Content>
                    {slides.map((slide) => (
                        <Carousel.Item key={slide.title} className="w-full">
                            <div className="flex flex-col items-center gap-12">
                                <DashboardPreview lines={slide.lines} />

                                <div className="flex flex-col gap-2 text-center">
                                    <p className="text-primary_on-brand text-xl font-semibold">{slide.title}</p>
                                    <p className="text-tertiary_on-brand text-md font-medium">{slide.description}</p>
                                </div>
                            </div>
                        </Carousel.Item>
                    ))}
                </Carousel.Content>

                <div className="flex items-center justify-center gap-16">
                    <Carousel.PrevTrigger className="outline-focus-ring cursor-pointer rounded-full p-2 transition duration-100 ease-linear focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                        <ChevronLeft className="text-fg-white size-5" />
                    </Carousel.PrevTrigger>

                    <CarouselDots />

                    <Carousel.NextTrigger className="outline-focus-ring cursor-pointer rounded-full p-2 transition duration-100 ease-linear focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                        <ChevronRight className="text-fg-white size-5" />
                    </Carousel.NextTrigger>
                </div>
            </Carousel.Root>
        </div>
    </section>
);
