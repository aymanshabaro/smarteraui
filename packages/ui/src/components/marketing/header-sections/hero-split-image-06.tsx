import { IMAGES } from "../../../utils/demo-assets";
import { Button } from "../../base/buttons/button";
import { Form } from "../../base/form/form";
import { Input } from "../../base/input/input";
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

const privacyHint = (
    <span>
        We care about your data in our{" "}
        <a href="/privacy" className="outline-focus-ring rounded-xs underline underline-offset-3 focus-visible:outline-2 focus-visible:outline-offset-2">
            privacy policy
        </a>
        .
    </span>
);

/**
 * Full-bleed hero: copy and an email capture form over a patterned background, with a tall
 * portrait pinned to the end edge from `lg` up and a hand-drawn arrow pointing back at the form.
 */
export const HeroSplitImage06 = () => (
    <div className="bg-primary relative overflow-hidden">
        <BackgroundPattern pattern="grid" size="md" className="absolute top-0 left-1/2 z-0 hidden max-w-none -translate-x-1/2 md:block" />
        <BackgroundPattern pattern="grid" size="sm" className="absolute top-0 left-1/2 z-0 max-w-none -translate-x-1/2 md:hidden" />

        <MarketingHeader items={navItems} />

        <section className="py-16 md:pb-24">
            <div className="max-w-container relative mx-auto grid grid-cols-1 gap-16 px-4 md:px-8 lg:min-h-160 lg:items-center">
                <div className="z-10 flex max-w-200 flex-col items-start">
                    <h1 className="text-display-md text-primary md:text-display-lg lg:text-display-xl font-semibold">
                        Customer service software for customer-first teams
                    </h1>
                    <p className="text-tertiary mt-4 max-w-xl text-lg text-balance md:mt-6 md:text-xl">
                        The best customer service software for customer-first teams. Industry-leading email and live chat support.
                    </p>

                    <Form className="mt-8 flex w-full flex-col items-stretch gap-4 md:mt-12 md:max-w-120 md:flex-row md:items-start">
                        <Input
                            isRequired
                            size="lg"
                            name="email"
                            type="email"
                            aria-label="Enter your email"
                            placeholder="Enter your email"
                            hint={privacyHint}
                            wrapperClassName="py-0.5"
                        />
                        <Button type="submit" size="xl">
                            Get started
                        </Button>
                    </Form>
                </div>

                <div className="relative lg:absolute lg:end-8 lg:top-0 lg:h-full lg:w-140">
                    <svg
                        viewBox="0 0 305 297"
                        fill="none"
                        aria-hidden="true"
                        className="text-fg-brand-secondary absolute start-4 -bottom-2 hidden w-76 -translate-x-1/2 lg:block"
                    >
                        <path d="M292 108C255 176 170 216 78 200" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
                        <path d="M112 168L74 200L108 231" stroke="currentColor" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>

                    <img src={IMAGES.square[0].src} alt={IMAGES.square[0].alt} className="inset-0 h-60 w-full object-cover md:h-110 lg:h-full" />
                </div>
            </div>
        </section>
    </div>
);
