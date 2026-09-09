import { NewsletterCardHorizontal } from "./newsletter-card-horizontal";
import { NewsletterCardHorizontalBrand } from "./newsletter-card-horizontal-brand";
import { NewsletterCardVertical } from "./newsletter-card-vertical";
import { NewsletterCardVerticalBrand } from "./newsletter-card-vertical-brand";
import { NewsletterIphoneMockup01 } from "./newsletter-iphone-mockup-01";
import { NewsletterIphoneMockup02 } from "./newsletter-iphone-mockup-02";
import { NewsletterIphoneMockup03 } from "./newsletter-iphone-mockup-03";
import { NewsletterIphoneMockup04 } from "./newsletter-iphone-mockup-04";
import { NewsletterScreenMockup01 } from "./newsletter-screen-mockup-01";
import { NewsletterScreenMockup02 } from "./newsletter-screen-mockup-02";
import { NewsletterScreenMockup03 } from "./newsletter-screen-mockup-03";
import { NewsletterScreenMockup04 } from "./newsletter-screen-mockup-04";
import { NewsletterSimpleCentered } from "./newsletter-simple-centered";
import { NewsletterSimpleCenteredBrand } from "./newsletter-simple-centered-brand";
import { NewsletterSimpleLeft } from "./newsletter-simple-left";
import { NewsletterSimpleLeftBrand } from "./newsletter-simple-left-brand";

/** Part A of the newsletter CTA section variants, keyed by docs route slug. Merged into `variants.ts` by the orchestrator. */
export const variantsA = {
    "newsletter-iphone-mockup-01": NewsletterIphoneMockup01,
    "newsletter-iphone-mockup-04": NewsletterIphoneMockup04,
    "newsletter-screen-mockup-03": NewsletterScreenMockup03,
    "newsletter-card-horizontal-brand": NewsletterCardHorizontalBrand,
    "newsletter-simple-centered": NewsletterSimpleCentered,
    "newsletter-simple-left-brand": NewsletterSimpleLeftBrand,
    "newsletter-iphone-mockup-02": NewsletterIphoneMockup02,
    "newsletter-screen-mockup-01": NewsletterScreenMockup01,
    "newsletter-screen-mockup-04": NewsletterScreenMockup04,
    "newsletter-card-vertical": NewsletterCardVertical,
    "newsletter-simple-left": NewsletterSimpleLeft,
    "newsletter-iphone-mockup-03": NewsletterIphoneMockup03,
    "newsletter-screen-mockup-02": NewsletterScreenMockup02,
    "newsletter-card-horizontal": NewsletterCardHorizontal,
    "newsletter-card-vertical-brand": NewsletterCardVerticalBrand,
    "newsletter-simple-centered-brand": NewsletterSimpleCenteredBrand,
} as const;
