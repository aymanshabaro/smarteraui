import { ContentSectionSplitImage01 } from "@/components/marketing/content-rich-text-sections/content-section-split-image-01";
import { FaqAccordion03 } from "@/components/marketing/faq-sections/faq-accordion-03";
import { FooterLarge09 } from "@/components/marketing/footers/footer-large-09";
import { HeaderDropdownSimple } from "@/components/marketing/header-navigations/header-dropdown-simple";
import { NewsletterCardHorizontalBrand } from "@/components/marketing/newsletter-cta-sections/newsletter-card-horizontal-brand";

/** The full-bleed rule the reference page draws between two sections that share a background. */
const SectionDivider = () => (
    <div className="max-w-container mx-auto px-4 md:px-8">
        <hr className="bg-border-secondary h-px w-full border-none" />
    </div>
);

/**
 * FAQ page 07 — a left-aligned help-centre hero, the two-column FAQ accordion, a branded
 * newsletter card, an editorial "why we're different" section and a call-to-action footer.
 */
export const FaqPage07 = () => (
    <div className="bg-primary">
        <HeaderDropdownSimple />

        <section className="bg-primary py-16 md:py-24">
            <div className="max-w-container mx-auto px-4 md:px-8">
                <div className="flex w-full max-w-3xl flex-col">
                    <span className="text-brand-secondary md:text-md text-sm font-semibold">The FAQs</span>
                    <h1 className="text-display-md text-primary md:text-display-lg mt-3 font-semibold">Help centre</h1>
                    <p className="text-tertiary mt-4 text-lg md:mt-6 md:text-xl">Everything you need to know about the product and billing.</p>
                </div>
            </div>
        </section>

        <SectionDivider />

        <FaqAccordion03 />

        <NewsletterCardHorizontalBrand />

        <SectionDivider />

        <ContentSectionSplitImage01 />

        <FooterLarge09 />
    </div>
);
