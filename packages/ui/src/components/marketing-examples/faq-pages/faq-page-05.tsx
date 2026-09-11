import { sortCx } from "../../../utils/cx";
import { Button } from "../../base/buttons/button";
import { FaqAccordion01 } from "../../marketing/faq-sections/faq-accordion-01";
import { FeaturesIntegrationsIcons02 } from "../../marketing/features-sections/features-integrations-icons-02";
import { FooterLarge06 } from "../../marketing/footers/footer-large-06";
import { FloatingSimpleWithFooter } from "../../marketing/header-navigations/floating-simple-with-footer";
import { NewsletterSimpleCentered } from "../../marketing/newsletter-cta-sections/newsletter-simple-centered";

const styles = sortCx({
    // The page alternates surfaces, so these sections sit on the secondary background.
    onSecondary: "[&>section]:bg-secondary",
});

/**
 * FAQ page 05 — a floating header over a centered help hero, the divided FAQ accordion on the
 * tinted surface, an integrations grid, a newsletter sign-up and the brand newsletter footer.
 */
export const FaqPage05 = () => (
    <div className="bg-primary">
        <FloatingSimpleWithFooter />

        <section className="bg-primary py-16 md:py-24">
            <div className="max-w-container mx-auto px-4 md:px-8">
                <div className="mx-auto flex w-full max-w-3xl flex-col items-center text-center">
                    <span className="text-brand-secondary md:text-md text-sm font-semibold">FAQs</span>
                    <h1 className="text-display-md text-primary md:text-display-lg mt-3 font-semibold">We&apos;re here to help</h1>
                    <p className="text-tertiary mt-4 text-lg md:mt-6 md:text-xl">Have questions? We&apos;re here to help.</p>

                    <div className="mt-8 flex flex-col-reverse gap-3 self-stretch sm:mt-12 sm:flex-row sm:self-center">
                        <Button size="xl" color="secondary">
                            Chat to sales
                        </Button>
                        <Button size="xl">Get started</Button>
                    </div>
                </div>
            </div>
        </section>

        <div className={styles.onSecondary}>
            <FaqAccordion01 />
        </div>

        <FeaturesIntegrationsIcons02 />

        <div className={styles.onSecondary}>
            <NewsletterSimpleCentered />
        </div>

        <FooterLarge06 />
    </div>
);
