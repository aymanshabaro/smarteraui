import { Avatar } from "@/components/base/avatar/avatar";
import { Button } from "@/components/base/buttons/button";
import { Form } from "@/components/base/form/form";
import { Input } from "@/components/base/input/input";
import { RatingStars } from "@/components/foundations/rating/rating-stars";
import type { MarketingNavItemType } from "@/components/marketing/header-navigations/base-components/header";
import { MarketingHeader } from "@/components/marketing/header-navigations/base-components/header";
import { ProductsMenu, SimpleResourcesMenu } from "@/components/marketing/header-navigations/base-components/menus";
import { AVATARS, IMAGES } from "@/utils/demo-assets";

const navItems: MarketingNavItemType[] = [
    { label: "Products", menu: <ProductsMenu /> },
    { label: "Services", menu: <ProductsMenu /> },
    { label: "Pricing", href: "/pricing" },
    { label: "Resources", menu: <SimpleResourcesMenu /> },
    { label: "About", href: "/about" },
];

const reviewers = AVATARS.slice(0, 5);

/**
 * Split hero with social proof: headline, email capture and an overlapping avatar row
 * with a five-star rating, beside a portrait that fills its column from `lg` up.
 */
export const HeroSplitImage04 = () => (
    <>
        <MarketingHeader items={navItems} />

        <section className="bg-primary py-16 md:pb-24">
            <div className="max-w-container mx-auto grid grid-cols-1 items-center gap-16 px-4 md:px-8 lg:grid-cols-2 lg:gap-8">
                <div className="flex max-w-3xl flex-col items-start lg:pe-8">
                    <h1 className="text-display-md text-primary md:text-display-lg lg:text-display-xl font-semibold">People who care about your growth</h1>
                    <p className="text-tertiary mt-4 max-w-lg text-lg text-balance md:mt-6 md:text-xl">
                        Powerful, self-serve product and growth analytics to help you convert, engage, and retain more.
                    </p>

                    <Form className="mt-8 flex w-full flex-col items-stretch gap-4 md:mt-12 md:max-w-120 md:flex-row md:items-start">
                        <Input
                            isRequired
                            size="lg"
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            aria-label="Enter your email"
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

                <div className="relative lg:h-full lg:min-h-160">
                    <img
                        className="inset-0 h-70 w-full object-cover md:h-110 lg:absolute lg:h-full"
                        src={IMAGES.landscape[1].src}
                        alt={IMAGES.landscape[1].alt}
                    />
                </div>
            </div>
        </section>
    </>
);
