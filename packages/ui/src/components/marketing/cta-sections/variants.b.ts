import { CtaAbstractImages } from "./cta-abstract-images";
import { CtaAbstractImagesBrand } from "./cta-abstract-images-brand";
import { CtaCardVertical } from "./cta-card-vertical";
import { CtaCardVerticalBrand } from "./cta-card-vertical-brand";
import { CtaIphoneMockup03 } from "./cta-iphone-mockup-03";
import { CtaScreenMockup01 } from "./cta-screen-mockup-01";
import { CtaScreenMockup02 } from "./cta-screen-mockup-02";
import { CtaScreenMockup04 } from "./cta-screen-mockup-04";
import { CtaSimpleCenteredBrand } from "./cta-simple-centered-brand";
import { CtaSimpleLogos01 } from "./cta-simple-logos-01";
import { CtaSimpleLogos01Brand } from "./cta-simple-logos-01-brand";
import { CtaSimpleLogos02Brand } from "./cta-simple-logos-02-brand";
import { CtaSplitImage02 } from "./cta-split-image-02";
import { CtaSplitImageQuote01 } from "./cta-split-image-quote-01";
import { CtaSplitImageQuote04 } from "./cta-split-image-quote-04";

/** Part B of the CTA section variants, keyed by docs route slug. Merged into `variants.ts` by the orchestrator. */
export const variantsB = {
    "cta-screen-mockup-01": CtaScreenMockup01,
    "cta-screen-mockup-04": CtaScreenMockup04,
    "cta-card-vertical": CtaCardVertical,
    "cta-simple-logos-01-brand": CtaSimpleLogos01Brand,
    "cta-card-vertical-brand": CtaCardVerticalBrand,
    "cta-simple-logos-01": CtaSimpleLogos01,
    "cta-split-image-02": CtaSplitImage02,
    "cta-split-image-quote-01": CtaSplitImageQuote01,
    "cta-split-image-quote-04": CtaSplitImageQuote04,
    "cta-iphone-mockup-03": CtaIphoneMockup03,
    "cta-screen-mockup-02": CtaScreenMockup02,
    "cta-abstract-images": CtaAbstractImages,
    "cta-simple-centered-brand": CtaSimpleCenteredBrand,
    "cta-simple-logos-02-brand": CtaSimpleLogos02Brand,
    "cta-abstract-images-brand": CtaAbstractImagesBrand,
} as const;
