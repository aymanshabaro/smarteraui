import type { ComponentType } from "react";
import { HeaderCenteredButtons } from "./header-centered-buttons";
import { HeaderCenteredButtonsBrand } from "./header-centered-buttons-brand";
import { HeaderCenteredSearch } from "./header-centered-search";
import { HeaderCenteredSearchBrand } from "./header-centered-search-brand";
import { HeaderLeftTabs } from "./header-left-tabs";
import { HeaderLeftTabsBrand } from "./header-left-tabs-brand";
import { HeaderSpaceBetween } from "./header-space-between";
import { HeaderSpaceBetweenBrand } from "./header-space-between-brand";
import { HeaderSpaceBetweenEmail } from "./header-space-between-email";
import { HeaderSpaceBetweenEmailBrand } from "./header-space-between-email-brand";
import { HeroAbstractAngles02 } from "./hero-abstract-angles-02";
import { HeroCardMockup03 } from "./hero-card-mockup-03";
import { HeroCardMockup06 } from "./hero-card-mockup-06";
import { HeroCardMockup09 } from "./hero-card-mockup-09";
import { HeroColorCard01 } from "./hero-color-card-01";
import { HeroColorCard04 } from "./hero-color-card-04";
import { HeroGeometricShapes03 } from "./hero-geometric-shapes-03";
import { HeroIphoneMockup02 } from "./hero-iphone-mockup-02";
import { HeroScreenMockup01 } from "./hero-screen-mockup-01";
import { HeroScreenMockup04 } from "./hero-screen-mockup-04";
import { HeroScreenMockup07 } from "./hero-screen-mockup-07";
import { HeroSimpleText01 } from "./hero-simple-text-01";
import { HeroSplitForm01 } from "./hero-split-form-01";
import { HeroSplitImage01 } from "./hero-split-image-01";
import { HeroSplitImage04 } from "./hero-split-image-04";

/** Part A of the header section variants, keyed by docs route slug. Merged into `variants.ts`. */
export const variantsA = {
    "hero-split-image-01": HeroSplitImage01,
    "hero-split-image-04": HeroSplitImage04,
    "hero-split-form-01": HeroSplitForm01,
    "hero-abstract-angles-02": HeroAbstractAngles02,
    "hero-screen-mockup-01": HeroScreenMockup01,
    "hero-screen-mockup-04": HeroScreenMockup04,
    "hero-screen-mockup-07": HeroScreenMockup07,
    "hero-iphone-mockup-02": HeroIphoneMockup02,
    "hero-color-card-01": HeroColorCard01,
    "hero-color-card-04": HeroColorCard04,
    "hero-card-mockup-03": HeroCardMockup03,
    "hero-card-mockup-06": HeroCardMockup06,
    "hero-card-mockup-09": HeroCardMockup09,
    "hero-simple-text-01": HeroSimpleText01,
    "hero-geometric-shapes-03": HeroGeometricShapes03,
    "header-centered-buttons": HeaderCenteredButtons,
    "header-centered-search": HeaderCenteredSearch,
    "header-left-tabs": HeaderLeftTabs,
    "header-space-between": HeaderSpaceBetween,
    "header-space-between-email": HeaderSpaceBetweenEmail,
    "header-centered-buttons-brand": HeaderCenteredButtonsBrand,
    "header-centered-search-brand": HeaderCenteredSearchBrand,
    "header-left-tabs-brand": HeaderLeftTabsBrand,
    "header-space-between-brand": HeaderSpaceBetweenBrand,
    "header-space-between-email-brand": HeaderSpaceBetweenEmailBrand,
} as const satisfies Record<string, ComponentType>;
