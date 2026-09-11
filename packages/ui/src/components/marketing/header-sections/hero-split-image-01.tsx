"use client";

import { ArrowRight } from "@properui/icons";
import { IMAGES } from "../../../utils/demo-assets";
import { BadgeGroup } from "../../base/badges/badge-groups";
import { Button } from "../../base/buttons/button";
import { Form } from "../../base/form/form";
import { Input } from "../../base/input/input";
import type { MarketingNavItemType } from "../header-navigations/base-components/header";
import { MarketingHeader } from "../header-navigations/base-components/header";
import { ProductsMenu, SimpleResourcesMenu } from "../header-navigations/base-components/menus";

const navItems: MarketingNavItemType[] = [
    { label: "Products", menu: <ProductsMenu /> },
    { label: "Services", menu: <ProductsMenu /> },
    { label: "Pricing", href: "/pricing" },
    { label: "Resources", menu: <SimpleResourcesMenu /> },
    { label: "About", href: "/about" },
];

/** The announcement chip repeats at two sizes so the copy can shrink on mobile. */
const announcement = { addonText: "We're hiring!", children: "Join our remote team" };

/**
 * Split hero: copy and an email capture on the start half, a full-bleed photo pinned to
 * the end half from `lg` up. Below `lg` the photo drops underneath the copy.
 */
export const HeroSplitImage01 = () => (
    <>
        <MarketingHeader items={navItems} />

        <section className="bg-primary relative py-16 lg:flex lg:min-h-180 lg:items-center lg:py-24">
            <div className="max-w-container mx-auto flex w-full items-center px-4 md:px-8">
                <div className="flex flex-col items-start md:max-w-3xl lg:w-1/2 lg:pe-8">
                    <a href="/careers" className="outline-focus-ring rounded-[10px] focus-visible:outline-2 focus-visible:outline-offset-2">
                        <BadgeGroup size="lg" color="brand" theme="modern" iconTrailing={ArrowRight} className="hidden md:flex" {...announcement} />
                        <BadgeGroup size="md" color="brand" theme="modern" iconTrailing={ArrowRight} className="md:hidden" {...announcement} />
                    </a>

                    <h1 className="text-display-md text-primary md:text-display-lg lg:text-display-xl mt-4 font-semibold">People who care about your growth</h1>
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
                </div>
            </div>

            <div className="relative mt-16 h-60 w-full px-4 md:h-95 md:px-8 lg:absolute lg:inset-y-0 lg:end-0 lg:mt-0 lg:h-full lg:w-1/2 lg:px-0">
                <img className="inset-0 size-full object-cover lg:absolute" src={IMAGES.landscape[0].src} alt={IMAGES.landscape[0].alt} />
            </div>
        </section>
    </>
);
