import { BadgeGroup } from "@/components/base/badges/badge-groups";
import { Button } from "@/components/base/buttons/button";
import { Form } from "@/components/base/form/form";
import { Input } from "@/components/base/input/input";
import type { MarketingNavItemType } from "@/components/marketing/header-navigations/base-components/header";
import { MarketingHeader } from "@/components/marketing/header-navigations/base-components/header";
import { SimpleResourcesMenu } from "@/components/marketing/header-navigations/base-components/menus";
import { BackgroundPattern } from "@/components/shared-assets/background-patterns";
import { CreditCard } from "@/components/shared-assets/credit-card/credit-card";
import { AVATARS } from "@/utils/demo-assets";

const navItems: MarketingNavItemType[] = [
    { label: "Products", menu: <SimpleResourcesMenu /> },
    { label: "Services", menu: <SimpleResourcesMenu /> },
    { label: "Pricing", href: "/pricing" },
    { label: "Resources", menu: <SimpleResourcesMenu /> },
    { label: "About", href: "/about" },
];

/** The rotated wall of cards, row by row, top to bottom. */
const cardRows = [
    { indent: true, types: ["brand-dark", "gray-dark", "brand-dark"] },
    { indent: false, types: ["gradient-strip-vertical", "gradient-strip", "salmon-strip"] },
    { indent: true, types: ["gray-dark", "brand-dark"] },
    { indent: false, types: ["salmon-strip"] },
] as const;

/**
 * Hero card mockup 11 — a half-and-half hero: recruiting badge, headline and email capture
 * on the left, a rotated wall of credit cards filling the right half.
 */
export const HeroCardMockup11 = () => (
    <div className="bg-primary relative overflow-hidden">
        <BackgroundPattern pattern="grid" size="md" className="absolute top-0 left-1/2 z-0 hidden max-w-none -translate-x-1/2 md:block" />
        <BackgroundPattern pattern="grid" size="sm" className="absolute top-0 left-1/2 z-0 max-w-none -translate-x-1/2 md:hidden" />

        <MarketingHeader items={navItems} />

        <section className="relative overflow-hidden py-16 lg:flex lg:min-h-180 lg:py-0">
            <div className="max-w-container mx-auto w-full px-4 md:px-8">
                <div className="flex flex-col items-start md:max-w-3xl lg:w-1/2 lg:pe-8 lg:pt-32 lg:pb-24">
                    <a href="/careers" className="outline-focus-ring rounded-[10px] focus-visible:outline-2 focus-visible:outline-offset-2">
                        <BadgeGroup size="lg" color="brand" theme="modern" addonText="We're hiring!" className="hidden md:flex">
                            Join our remote team
                        </BadgeGroup>
                        <BadgeGroup size="md" color="brand" theme="modern" addonText="We're hiring!" className="md:hidden">
                            Join our remote team
                        </BadgeGroup>
                    </a>

                    <h1 className="text-display-md text-primary md:text-display-lg lg:text-display-xl mt-4 font-semibold">Smart business credit cards</h1>
                    <p className="text-tertiary mt-4 text-lg text-balance md:mt-6 md:max-w-lg md:text-xl">
                        Powerful, self-serve product and growth analytics to help you convert, engage, and retain more.
                    </p>

                    <Form className="mt-8 flex w-full flex-col items-stretch gap-4 md:mt-12 md:max-w-120 md:flex-row md:items-start">
                        <Input
                            isRequired
                            size="lg"
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            wrapperClassName="py-0.5"
                            hint={
                                <span>
                                    We care about your data in our{" "}
                                    <a
                                        href="/privacy"
                                        className="outline-focus-ring rounded-xs underline underline-offset-3 focus-visible:outline-2 focus-visible:outline-offset-2"
                                    >
                                        privacy policy
                                    </a>
                                    .
                                </span>
                            }
                        />
                        <Button type="submit" size="xl">
                            Get started
                        </Button>
                    </Form>
                </div>
            </div>

            <div className="bg-secondary relative mt-16 h-80 w-full px-4 md:h-95 md:px-8 lg:absolute lg:inset-y-0 lg:end-0 lg:mt-0 lg:h-full lg:w-1/2 lg:px-0">
                <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 overflow-hidden sm:ps-[30vw] lg:overflow-visible lg:ps-0">
                    <div className="flex w-max [transform:scale(0.585)_rotate(30deg)_translate(-87px,799px)] flex-col gap-4 lg:[transform:rotate(30deg)_translate(186px,291px)]">
                        {cardRows.map((row, rowIndex) => (
                            <div key={rowIndex} className={row.indent ? "flex gap-4 ps-40" : "flex gap-4"}>
                                {row.types.map((type, cardIndex) => (
                                    <CreditCard key={cardIndex} type={type} company="Proper." cardHolder={AVATARS[1].name} />
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    </div>
);
