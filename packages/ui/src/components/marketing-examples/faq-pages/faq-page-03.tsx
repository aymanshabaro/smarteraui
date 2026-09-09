import { Button } from "@/components/base/buttons/button";
import { CtaSimpleCentered } from "@/components/marketing/cta-sections/cta-simple-centered";
import { FaqSimple03 } from "@/components/marketing/faq-sections/faq-simple-03";
import { FeaturesIconsAndImage03 } from "@/components/marketing/features-sections/features-icons-and-image-03";
import { FooterLarge03 } from "@/components/marketing/footers/footer-large-03";
import type { MarketingNavItemType } from "@/components/marketing/header-navigations/base-components/header";
import { MarketingHeader } from "@/components/marketing/header-navigations/base-components/header";
import { SimpleResourcesMenu } from "@/components/marketing/header-navigations/base-components/menus";

const navItems: MarketingNavItemType[] = [
    { label: "Products", menu: <SimpleResourcesMenu /> },
    { label: "Services", menu: <SimpleResourcesMenu /> },
    { label: "Pricing", href: "/pricing" },
    { label: "Resources", menu: <SimpleResourcesMenu /> },
    { label: "About", href: "/about" },
];

/**
 * FAQ page 03 — a tinted header band whose headline sits beside its supporting copy, the
 * photo-backed FAQ layout, a feature announcement, a centered trial CTA and an app-store footer.
 */
export const FaqPage03 = () => (
    <div className="bg-primary">
        <MarketingHeader items={navItems} className="bg-secondary" />

        <section className="bg-secondary py-16 md:py-24">
            <div className="max-w-container mx-auto px-4 md:px-8">
                <p className="text-brand-secondary md:text-md mb-3 text-sm font-semibold">FAQs</p>

                {/* The paragraph is pulled level with the headline from `lg` by zeroing its height. */}
                <div className="grid grid-cols-[minmax(auto,768px)] gap-x-16 lg:grid-cols-[1fr_480px]">
                    <h1 className="text-display-md text-primary md:text-display-lg font-semibold">
                        How can we help<span className="max-md:hidden"> you</span>?
                    </h1>
                    <p className="text-tertiary mt-4 text-lg md:mt-6 md:text-xl lg:mt-3 lg:h-0">Have questions? We're here to help.</p>

                    <div className="mt-8 flex flex-col-reverse gap-3 sm:mt-8 sm:flex-row">
                        <Button color="secondary" size="xl">
                            Chat to sales
                        </Button>
                        <Button size="xl">Get started</Button>
                    </div>
                </div>
            </div>
        </section>

        <FaqSimple03 />

        <FeaturesIconsAndImage03 />

        <CtaSimpleCentered />

        <FooterLarge03 />
    </div>
);
