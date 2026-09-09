import type { ComponentType } from "react";
import { HeaderCentered } from "./header-centered";
import { HeaderCenteredBrand } from "./header-centered-brand";
import { HeaderCenteredEmail } from "./header-centered-email";
import { HeaderCenteredEmailBrand } from "./header-centered-email-brand";
import { HeaderLeftButtons } from "./header-left-buttons";
import { HeaderLeftButtonsBrand } from "./header-left-buttons-brand";
import { HeaderLeftSearch } from "./header-left-search";
import { HeaderLeftSearchBrand } from "./header-left-search-brand";
import { HeaderSpaceBetweenTabs } from "./header-space-between-tabs";
import { HeaderSpaceBetweenTabsBrand } from "./header-space-between-tabs-brand";
import { HeroAbstractAngles01 } from "./hero-abstract-angles-01";
import { HeroAbstractAngles04 } from "./hero-abstract-angles-04";
import { HeroCardMockup02 } from "./hero-card-mockup-02";
import { HeroCardMockup05 } from "./hero-card-mockup-05";
import { HeroCardMockup08 } from "./hero-card-mockup-08";
import { HeroCardMockup11 } from "./hero-card-mockup-11";
import { HeroColorCard03 } from "./hero-color-card-03";
import { HeroGeometricShapes01 } from "./hero-geometric-shapes-01";
import { HeroIphoneMockup01 } from "./hero-iphone-mockup-01";
import { HeroIphoneMockup04 } from "./hero-iphone-mockup-04";
import { HeroScreenMockup03 } from "./hero-screen-mockup-03";
import { HeroScreenMockup06 } from "./hero-screen-mockup-06";
import { HeroSplitImage03 } from "./hero-split-image-03";
import { HeroSplitImage06 } from "./hero-split-image-06";

/** Part C of the header section variants, keyed by docs route slug. Merged into `variants.ts`. */
export const variantsC = {
    "hero-split-image-03": HeroSplitImage03,
    "hero-split-image-06": HeroSplitImage06,
    "hero-abstract-angles-01": HeroAbstractAngles01,
    "hero-abstract-angles-04": HeroAbstractAngles04,
    "hero-screen-mockup-03": HeroScreenMockup03,
    "hero-screen-mockup-06": HeroScreenMockup06,
    "hero-iphone-mockup-01": HeroIphoneMockup01,
    "hero-iphone-mockup-04": HeroIphoneMockup04,
    "hero-color-card-03": HeroColorCard03,
    "hero-card-mockup-02": HeroCardMockup02,
    "hero-card-mockup-05": HeroCardMockup05,
    "hero-card-mockup-08": HeroCardMockup08,
    "hero-card-mockup-11": HeroCardMockup11,
    "hero-geometric-shapes-01": HeroGeometricShapes01,
    "header-centered": HeaderCentered,
    "header-centered-email": HeaderCenteredEmail,
    "header-left-buttons": HeaderLeftButtons,
    "header-left-search": HeaderLeftSearch,
    "header-space-between-tabs": HeaderSpaceBetweenTabs,
    "header-centered-brand": HeaderCenteredBrand,
    "header-centered-email-brand": HeaderCenteredEmailBrand,
    "header-left-buttons-brand": HeaderLeftButtonsBrand,
    "header-left-search-brand": HeaderLeftSearchBrand,
    "header-space-between-tabs-brand": HeaderSpaceBetweenTabsBrand,
} as const satisfies Record<string, ComponentType>;
