import { Check } from "@properui/icons";
import { cx } from "../../../utils/cx";
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

const benefits = ["Instantly issue virtual corporate cards", "Control spending before it happens", "Automate your expense management"];

const privacyHint = (
    <span>
        We care about your data in our{" "}
        <a href="/privacy" className="outline-focus-ring rounded-xs underline underline-offset-3 focus-visible:outline-2 focus-visible:outline-offset-2">
            privacy policy
        </a>
        .
    </span>
);

/** The benefit list moves from under the copy to its own column at `lg`, so it renders twice. */
const BenefitList = ({ className }: { className?: string }) => (
    <ul className={cx("flex shrink-0 flex-col", className)}>
        {benefits.map((benefit) => (
            <li key={benefit} className="flex gap-3">
                <div className="bg-success-secondary text-featured-icon-light-fg-success flex size-7 shrink-0 items-center justify-center rounded-full md:size-8">
                    <Check aria-hidden="true" className="size-4 stroke-[2.5px]" />
                </div>
                <span className="text-tertiary pt-0.5 text-lg md:pt-0">{benefit}</span>
            </li>
        ))}
    </ul>
);

/** Hero for a card product: benefit list plus email capture, over a wide card photo. */
export const HeroCardMockup08 = () => (
    <div className="bg-primary relative overflow-hidden">
        <BackgroundPattern pattern="grid" size="sm" className="absolute top-0 left-1/2 z-0 hidden max-w-none -translate-x-1/2 md:block" />
        <BackgroundPattern pattern="grid" size="sm" className="absolute top-0 left-1/2 z-0 max-w-none -translate-x-1/2 md:hidden" />

        <MarketingHeader items={navItems} />

        <section className="relative py-16 md:py-24">
            <div className="max-w-container mx-auto flex w-full flex-col justify-between gap-8 px-4 md:px-8 lg:flex-row lg:items-end">
                <div className="flex max-w-3xl flex-1 flex-col items-start">
                    <h1 className="text-display-md text-primary md:text-display-lg lg:text-display-xl font-semibold">
                        Simple, transparent business credit cards
                    </h1>
                    <p className="text-tertiary mt-4 text-lg text-balance md:mt-6 md:text-xl">
                        Mo money, no problems. Proper UI is a next-generation financial technology company in the process of reinventing banking. 30-day free
                        trial.
                    </p>

                    <BenefitList className="mt-8 gap-4 ps-2 lg:hidden" />

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

                <BenefitList className="hidden gap-5 ps-4 pb-6 lg:flex" />
            </div>

            <div className="max-w-container relative mt-16 w-full px-4 md:mx-auto md:px-8">
                <img
                    src={IMAGES.landscape[7].src}
                    alt="Proper UI business credit cards"
                    className="h-68 w-full overflow-hidden rounded-2xl object-cover md:h-120"
                />
            </div>
        </section>
    </div>
);
