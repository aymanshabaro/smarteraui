import { CtaCardHorizontal } from "./cta-card-horizontal";
import { CtaCardHorizontalBrand } from "./cta-card-horizontal-brand";
import { CtaIphoneMockup01 } from "./cta-iphone-mockup-01";
import { CtaIphoneMockup02 } from "./cta-iphone-mockup-02";
import { CtaIphoneMockup04 } from "./cta-iphone-mockup-04";
import { CtaScreenMockup03 } from "./cta-screen-mockup-03";
import { CtaSimpleCentered } from "./cta-simple-centered";
import { CtaSimpleLeft } from "./cta-simple-left";
import { CtaSimpleLeftBrand } from "./cta-simple-left-brand";
import { CtaSimpleLogos02 } from "./cta-simple-logos-02";
import { CtaSplitImage01 } from "./cta-split-image-01";
import { CtaSplitImage03 } from "./cta-split-image-03";
import { CtaSplitImage04 } from "./cta-split-image-04";
import { CtaSplitImageQuote02 } from "./cta-split-image-quote-02";
import { CtaSplitImageQuote03 } from "./cta-split-image-quote-03";

/** Part A of the CTA section variants, keyed by docs route slug. Merged into `variants.ts` by the orchestrator. */
export const variantsA = {
    "cta-simple-centered": CtaSimpleCentered,
    "cta-simple-logos-02": CtaSimpleLogos02,
    "cta-split-image-03": CtaSplitImage03,
    "cta-split-image-quote-02": CtaSplitImageQuote02,
    "cta-iphone-mockup-01": CtaIphoneMockup01,
    "cta-iphone-mockup-04": CtaIphoneMockup04,
    "cta-screen-mockup-03": CtaScreenMockup03,
    "cta-card-horizontal": CtaCardHorizontal,
    "cta-simple-left-brand": CtaSimpleLeftBrand,
    "cta-card-horizontal-brand": CtaCardHorizontalBrand,
    "cta-simple-left": CtaSimpleLeft,
    "cta-split-image-01": CtaSplitImage01,
    "cta-split-image-04": CtaSplitImage04,
    "cta-split-image-quote-03": CtaSplitImageQuote03,
    "cta-iphone-mockup-02": CtaIphoneMockup02,
} as const;
