import type { ComponentType } from "react";
import { FeaturesAlternatingLayout01 } from "./features-alternating-layout-01";
import { FeaturesAlternatingLayout02 } from "./features-alternating-layout-02";
import { FeaturesAlternatingLayout04 } from "./features-alternating-layout-04";
import { FeaturesCenterMockup02 } from "./features-center-mockup-02";
import { FeaturesIconCards01 } from "./features-icon-cards-01";
import { FeaturesIconCards02 } from "./features-icon-cards-02";
import { FeaturesIconsAndImage02 } from "./features-icons-and-image-02";
import { FeaturesIconsAndImage03 } from "./features-icons-and-image-03";
import { FeaturesIconsAndMockup01 } from "./features-icons-and-mockup-01";
import { FeaturesIconsAndMockup03 } from "./features-icons-and-mockup-03";
import { FeaturesIconsAndMockup04 } from "./features-icons-and-mockup-04";
import { FeaturesIconsAndMockup06 } from "./features-icons-and-mockup-06";
import { FeaturesIntegrationsIcons02 } from "./features-integrations-icons-02";
import { FeaturesLargeScreenMockup01 } from "./features-large-screen-mockup-01";
import { FeaturesSimpleIcons01 } from "./features-simple-icons-01";
import { FeaturesSimpleIcons01Brand } from "./features-simple-icons-01-brand";
import { FeaturesSimpleIcons03 } from "./features-simple-icons-03";
import { FeaturesSimpleIcons04 } from "./features-simple-icons-04";
import { FeaturesSimpleIcons04Brand } from "./features-simple-icons-04-brand";
import { FeaturesTabsMockup02 } from "./features-tabs-mockup-02";
import { FeaturesTabsMockup05 } from "./features-tabs-mockup-05";
import { FeaturesTabsMockup08 } from "./features-tabs-mockup-08";
import { FeaturesTabsMockup11 } from "./features-tabs-mockup-11";

/** Part A of the features section variants, keyed by docs route slug. Merged into `variants.ts` by the orchestrator. */
export const variantsA = {
    "features-alternating-layout-01": FeaturesAlternatingLayout01,
    "features-alternating-layout-04": FeaturesAlternatingLayout04,
    "features-simple-icons-03": FeaturesSimpleIcons03,
    "features-icons-and-image-02": FeaturesIconsAndImage02,
    "features-icon-cards-01": FeaturesIconCards01,
    "features-center-mockup-02": FeaturesCenterMockup02,
    "features-icons-and-mockup-03": FeaturesIconsAndMockup03,
    "features-icons-and-mockup-06": FeaturesIconsAndMockup06,
    "features-large-screen-mockup-01": FeaturesLargeScreenMockup01,
    "features-tabs-mockup-02": FeaturesTabsMockup02,
    "features-tabs-mockup-05": FeaturesTabsMockup05,
    "features-tabs-mockup-08": FeaturesTabsMockup08,
    "features-tabs-mockup-11": FeaturesTabsMockup11,
    "features-integrations-icons-02": FeaturesIntegrationsIcons02,
    "features-simple-icons-01-brand": FeaturesSimpleIcons01Brand,
    "features-simple-icons-04-brand": FeaturesSimpleIcons04Brand,
    "features-alternating-layout-02": FeaturesAlternatingLayout02,
    "features-simple-icons-01": FeaturesSimpleIcons01,
    "features-simple-icons-04": FeaturesSimpleIcons04,
    "features-icons-and-image-03": FeaturesIconsAndImage03,
    "features-icon-cards-02": FeaturesIconCards02,
    "features-icons-and-mockup-01": FeaturesIconsAndMockup01,
    "features-icons-and-mockup-04": FeaturesIconsAndMockup04,
} as const satisfies Record<string, ComponentType>;
