import type { ComponentType } from "react";
import { FeaturesAlternatingLayout03 } from "./features-alternating-layout-03";
import { FeaturesCenterMockup01 } from "./features-center-mockup-01";
import { FeaturesIconsAndImage01 } from "./features-icons-and-image-01";
import { FeaturesIconsAndImage04 } from "./features-icons-and-image-04";
import { FeaturesIconsAndMockup02 } from "./features-icons-and-mockup-02";
import { FeaturesIconsAndMockup05 } from "./features-icons-and-mockup-05";
import { FeaturesIconsAndMockup07 } from "./features-icons-and-mockup-07";
import { FeaturesIconsAndMockup08 } from "./features-icons-and-mockup-08";
import { FeaturesIntegrationsIcons01 } from "./features-integrations-icons-01";
import { FeaturesIntegrationsIcons03 } from "./features-integrations-icons-03";
import { FeaturesIntegrationsIcons04 } from "./features-integrations-icons-04";
import { FeaturesLargeScreenMockup02 } from "./features-large-screen-mockup-02";
import { FeaturesSimpleIcons02 } from "./features-simple-icons-02";
import { FeaturesSimpleIcons02Brand } from "./features-simple-icons-02-brand";
import { FeaturesSimpleIcons03Brand } from "./features-simple-icons-03-brand";
import { FeaturesTabsMockup01 } from "./features-tabs-mockup-01";
import { FeaturesTabsMockup03 } from "./features-tabs-mockup-03";
import { FeaturesTabsMockup04 } from "./features-tabs-mockup-04";
import { FeaturesTabsMockup06 } from "./features-tabs-mockup-06";
import { FeaturesTabsMockup07 } from "./features-tabs-mockup-07";
import { FeaturesTabsMockup09 } from "./features-tabs-mockup-09";
import { FeaturesTabsMockup10 } from "./features-tabs-mockup-10";
import { FeaturesTabsMockup12 } from "./features-tabs-mockup-12";

/** Part B of the features section variants, keyed by docs route slug. Merged into `variants.ts` by the orchestrator. */
export const variantsB = {
    "features-icons-and-mockup-07": FeaturesIconsAndMockup07,
    "features-large-screen-mockup-02": FeaturesLargeScreenMockup02,
    "features-tabs-mockup-03": FeaturesTabsMockup03,
    "features-tabs-mockup-06": FeaturesTabsMockup06,
    "features-tabs-mockup-09": FeaturesTabsMockup09,
    "features-tabs-mockup-12": FeaturesTabsMockup12,
    "features-integrations-icons-03": FeaturesIntegrationsIcons03,
    "features-simple-icons-02-brand": FeaturesSimpleIcons02Brand,
    "features-alternating-layout-03": FeaturesAlternatingLayout03,
    "features-simple-icons-02": FeaturesSimpleIcons02,
    "features-icons-and-image-01": FeaturesIconsAndImage01,
    "features-icons-and-image-04": FeaturesIconsAndImage04,
    "features-center-mockup-01": FeaturesCenterMockup01,
    "features-icons-and-mockup-02": FeaturesIconsAndMockup02,
    "features-icons-and-mockup-05": FeaturesIconsAndMockup05,
    "features-icons-and-mockup-08": FeaturesIconsAndMockup08,
    "features-tabs-mockup-01": FeaturesTabsMockup01,
    "features-tabs-mockup-04": FeaturesTabsMockup04,
    "features-tabs-mockup-07": FeaturesTabsMockup07,
    "features-tabs-mockup-10": FeaturesTabsMockup10,
    "features-integrations-icons-01": FeaturesIntegrationsIcons01,
    "features-integrations-icons-04": FeaturesIntegrationsIcons04,
    "features-simple-icons-03-brand": FeaturesSimpleIcons03Brand,
} as const satisfies Record<string, ComponentType>;
