"use client";

import { SearchLg } from "@properui/icons";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
import { CtaAbstractImages } from "@/components/marketing/cta-sections/cta-abstract-images";
import { FaqAccordion02 } from "@/components/marketing/faq-sections/faq-accordion-02";
import { FooterLarge08 } from "@/components/marketing/footers/footer-large-08";
import { HeaderDropdownSimple } from "@/components/marketing/header-navigations/header-dropdown-simple";
import { NewsletterCardVertical } from "@/components/marketing/newsletter-cta-sections/newsletter-card-vertical";

/**
 * FAQ page 06 — a permanently dark header and search hero, the card accordion, a "still have
 * questions" panel, the photo-collage trial CTA and a newsletter card over the inline footer.
 */
export const FaqPage06 = () => (
    <div className="bg-primary">
        {/* The header and hero share one permanently dark band (03-theming §Per-section theme override). */}
        <div className="dark-mode bg-primary">
            <HeaderDropdownSimple />

            <section className="bg-primary py-16 md:py-24">
                <div className="max-w-container mx-auto px-4 md:px-8">
                    <div className="mx-auto flex w-full max-w-3xl flex-col items-center text-center">
                        <span className="text-brand-secondary md:text-md text-sm font-semibold">Support</span>
                        <h1 className="text-display-md text-primary md:text-display-lg mt-3 font-semibold">Everything you need to know</h1>
                        <p className="text-tertiary mt-4 text-lg md:mt-6 md:text-xl">
                            Need something cleared up? Here are our most frequently asked questions.
                        </p>

                        <div className="mt-8 w-full sm:mt-12 sm:w-80">
                            <Input size="lg" type="search" icon={SearchLg} aria-label="Search" placeholder="Search" wrapperClassName="sm:py-0.5" />
                        </div>
                    </div>
                </div>
            </section>
        </div>

        <FaqAccordion02 />

        <section className="bg-primary py-16 md:py-24">
            <div className="max-w-container mx-auto px-4 md:px-8">
                <div className="bg-secondary flex flex-col items-center rounded-2xl px-6 py-10 text-center lg:p-16">
                    <h2 className="text-display-sm text-primary xl:text-display-md font-semibold">Still have questions?</h2>
                    <p className="text-tertiary mt-4 text-lg md:mt-5 lg:text-xl">Join over 4,000+ startups already growing with Proper.</p>

                    <div className="mt-8 flex flex-col-reverse gap-3 self-stretch sm:flex-row sm:self-center">
                        <Button size="xl" color="secondary">
                            Learn more
                        </Button>
                        <Button size="xl">Get started</Button>
                    </div>
                </div>
            </div>
        </section>

        <CtaAbstractImages />

        <NewsletterCardVertical />

        <FooterLarge08 />
    </div>
);
