import { Avatar } from "@/components/base/avatar/avatar";
import { Button } from "@/components/base/buttons/button";
import { SocialButton } from "@/components/base/buttons/social-button";
import { Form } from "@/components/base/form/form";
import { Input } from "@/components/base/input/input";
import { SmarteraLogoMinimal } from "@/components/foundations/logo/smartera-logo-minimal";
import { RatingStars } from "@/components/foundations/rating/rating-stars";
import type { MarketingNavItemType } from "@/components/marketing/header-navigations/base-components/header";
import { MarketingHeader } from "@/components/marketing/header-navigations/base-components/header";
import { ProductsMenu, SimpleResourcesMenu } from "@/components/marketing/header-navigations/base-components/menus";
import { AVATARS } from "@/utils/demo-assets";

const navItems: MarketingNavItemType[] = [
    { label: "Products", menu: <ProductsMenu /> },
    { label: "Services", menu: <ProductsMenu /> },
    { label: "Pricing", href: "/pricing" },
    { label: "Resources", menu: <SimpleResourcesMenu /> },
    { label: "About", href: "/about" },
];

const reviewers = AVATARS.slice(0, 5);

/** The hand-drawn flourish that points from the copy across to the sign-up card. */
const LoopingArrow = ({ className }: { className?: string }) => (
    <svg width="317" height="155" viewBox="0 0 317 155" fill="none" aria-hidden="true" className={className}>
        <path
            d="M2 3c1 57 21 105 72 125 40 15 76-3 77-33 1-19-16-27-27-18-13 11-6 38 14 51 30 20 92 20 156 3"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
        />
        <path d="M289 143l26-12-21-16" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

/**
 * Split hero that pairs the pitch with a sign-up card. The card is a full-bleed panel on
 * mobile and a rounded, capped surface from `md` up; the two halves sit side by side at `lg`.
 */
export const HeroSplitForm01 = () => (
    <>
        <MarketingHeader items={navItems} />

        <section className="bg-primary relative md:pt-16 md:pb-24">
            <div className="max-w-container mx-auto flex w-full flex-col items-center md:gap-24 md:px-8 lg:flex-row lg:justify-between lg:gap-8">
                <div className="flex w-full flex-col items-start px-4 pt-16 pb-12 md:p-0">
                    <h1 className="text-display-md text-primary md:text-display-lg lg:text-display-xl font-semibold">
                        Super simplified <br />
                        customer service
                    </h1>
                    <p className="text-tertiary mt-4 max-w-120 text-lg text-balance md:mt-6 md:text-xl">
                        Powerful, self-serve product and growth analytics to help you convert, engage, and retain more.
                    </p>

                    <div className="mt-8 flex items-center gap-4 md:mt-12">
                        <div className="inline-flex -space-x-3 overflow-hidden">
                            {reviewers.map((reviewer) => (
                                <Avatar key={reviewer.src} size="md" src={reviewer.src} alt={reviewer.name} className="ring-bg-primary ring-[1.5px]" />
                            ))}
                        </div>

                        <div className="flex flex-col gap-0.5">
                            <div className="flex items-center gap-2">
                                <RatingStars rating={5} className="items-center gap-1" starClassName="relative shrink-0 grow-0" />
                                <span className="text-md text-secondary font-semibold">5.0</span>
                            </div>
                            <p className="text-md text-tertiary font-medium">from 200+ reviews</p>
                        </div>
                    </div>
                </div>

                <div className="bg-secondary relative w-full px-4 pt-12 pb-16 md:max-w-110 md:rounded-2xl md:px-10 md:py-8">
                    <div className="absolute hidden xl:bottom-12 xl:block xl:-translate-x-[107%]">
                        <LoopingArrow className="text-fg-brand-secondary" />
                    </div>
                    <div className="absolute end-0 top-0 hidden translate-x-48 -translate-y-32 -scale-x-100 -rotate-90 md:block lg:hidden">
                        <LoopingArrow className="text-fg-brand-secondary" />
                    </div>

                    <Form>
                        <div className="flex flex-col items-center gap-6">
                            <SmarteraLogoMinimal className="hidden size-10 md:block" />

                            <div className="flex flex-col gap-2 text-center md:gap-3">
                                <h2 className="text-display-xs text-primary md:text-display-sm font-semibold">Create an account</h2>
                                <p className="text-md text-tertiary">Start your 30-day free trial</p>
                            </div>
                        </div>

                        <div className="mt-8 flex flex-col gap-5 md:mt-6">
                            <Input isRequired size="lg" label="Name" name="name" placeholder="Enter your name" hideRequiredIndicator />
                            <Input isRequired size="lg" type="email" label="Email" name="email" placeholder="Enter your email" hideRequiredIndicator />
                        </div>

                        <div className="mt-6 flex flex-col gap-4">
                            <Button type="submit" size="lg">
                                Get started
                            </Button>
                            <SocialButton social="google" theme="color" size="lg">
                                Sign up with Google
                            </SocialButton>
                        </div>

                        <div className="mt-8 flex justify-center gap-1 md:mt-6">
                            <span className="text-tertiary text-sm">Already have an account?</span>
                            <Button color="link-color" size="md" href="/login">
                                Log in
                            </Button>
                        </div>
                    </Form>
                </div>
            </div>
        </section>
    </>
);
