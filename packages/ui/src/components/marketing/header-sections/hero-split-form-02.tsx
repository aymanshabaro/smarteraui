"use client";

import { Check } from "@properui/icons";
import { Button } from "../../base/buttons/button";
import { SocialButton } from "../../base/buttons/social-button";
import { Form } from "../../base/form/form";
import { Input } from "../../base/input/input";
import { ProperLogoMinimal } from "../../foundations/logo/proper-logo-minimal";
import { BackgroundPattern } from "../../shared-assets/background-patterns";
import type { MarketingNavItemType } from "../header-navigations/base-components/header";
import { MarketingHeader } from "../header-navigations/base-components/header";
import { SimpleResourcesMenu } from "../header-navigations/base-components/menus";

const navItems: MarketingNavItemType[] = [
    { label: "Products", menu: <SimpleResourcesMenu /> },
    { label: "Services", menu: <SimpleResourcesMenu /> },
    { label: "Pricing", href: "/pricing" },
    { label: "Resources", menu: <SimpleResourcesMenu /> },
    { label: "About", href: "/about" },
];

const benefits = ["Share inboxes with your team", "Deliver instant answers and embed answers", "Solve a problem or close a sale in real-time with chat"];

/**
 * Hero split form 02 — a benefit list beside a sign-up card that sits on a tinted
 * panel from `md` up and goes edge-to-edge below it.
 */
export const HeroSplitForm02 = () => (
    <div className="bg-primary relative overflow-hidden">
        <BackgroundPattern pattern="grid" size="sm" className="absolute top-0 left-1/2 z-0 hidden max-w-none -translate-x-1/2 md:block" />
        <BackgroundPattern pattern="grid" size="sm" className="absolute top-0 left-1/2 z-0 max-w-none -translate-x-1/2 md:hidden" />

        <MarketingHeader items={navItems} />

        <section className="relative md:pt-16 md:pb-24">
            <div className="max-w-container mx-auto flex w-full flex-col items-center md:gap-24 md:px-8 lg:flex-row lg:justify-between lg:gap-8">
                <div className="flex w-full flex-col items-start px-4 pt-16 pb-12 md:p-0">
                    <h1 className="text-display-md text-primary md:text-display-lg lg:text-display-xl font-semibold">
                        Super simplified
                        <br />
                        customer service
                    </h1>
                    <p className="text-tertiary mt-4 max-w-120 text-lg text-balance md:mt-6 md:text-xl">
                        Powerful, self-serve product and growth analytics to help you convert, engage, and retain more.
                    </p>

                    <ul className="mt-8 flex flex-col gap-4 ps-2 md:mt-12">
                        {benefits.map((benefit) => (
                            <li key={benefit} className="flex gap-3">
                                <div className="bg-success-secondary text-featured-icon-light-fg-success flex size-7 shrink-0 items-center justify-center rounded-full">
                                    <Check aria-hidden="true" className="size-4 stroke-[2.5px]" />
                                </div>
                                <span className="text-tertiary text-lg text-balance">{benefit}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="bg-primary md:bg-tertiary w-full px-4 md:max-w-lg md:rounded-3xl md:p-10">
                    <Form className="border-secondary bg-primary border-t pt-12 pb-16 md:rounded-2xl md:border-none md:p-8">
                        <div className="flex flex-col items-center gap-6">
                            <ProperLogoMinimal className="hidden size-10 md:block" />
                            <div className="flex flex-col gap-2 text-center md:gap-3">
                                <h2 className="text-display-xs text-primary md:text-display-sm font-semibold">Create an account</h2>
                                <p className="text-tertiary text-md">Start your 30-day free trial</p>
                            </div>
                        </div>

                        <div className="mt-8 flex flex-col gap-5 md:mt-8">
                            <Input isRequired size="lg" label="Name" name="name" placeholder="Enter your name" hideRequiredIndicator />
                            <Input isRequired size="lg" type="email" label="Email" name="email" placeholder="Enter your email" hideRequiredIndicator />
                        </div>

                        <div className="mt-6 flex flex-col gap-4 md:mt-8">
                            <Button type="submit" size="lg">
                                Get started
                            </Button>
                            <SocialButton social="google" theme="gray" size="lg">
                                Sign up with Google
                            </SocialButton>
                        </div>

                        <div className="mt-8 flex justify-center gap-1 md:mt-8">
                            <span className="text-tertiary text-sm">Already have an account?</span>
                            <Button href="/login" color="link-color" size="md">
                                Log in
                            </Button>
                        </div>
                    </Form>
                </div>
            </div>
        </section>
    </div>
);
