import type { ComponentType } from "react";
import { ContactCenteredMap } from "./contact-centered-map";
import { ContactFeaturesTabsMap01 } from "./contact-features-tabs-map-01";
import { ContactFormAndImage01 } from "./contact-form-and-image-01";
import { ContactIconCards02 } from "./contact-icon-cards-02";
import { ContactIconsAndFormBrand } from "./contact-icons-and-form-brand";
import { ContactIconsAndImageBrand } from "./contact-icons-and-image-brand";
import { ContactIconsAndMap02 } from "./contact-icons-and-map-02";
import { ContactIconsAndMap02Brand } from "./contact-icons-and-map-02-brand";
import { ContactSimpleForm01 } from "./contact-simple-form-01";
import { ContactSimpleForm03 } from "./contact-simple-form-03";
import { ContactSimpleForm04 } from "./contact-simple-form-04";
import { ContactSimpleIcons01 } from "./contact-simple-icons-01";
import { ContactSimpleIcons01Brand } from "./contact-simple-icons-01-brand";
import { ContactSimpleIcons02Brand } from "./contact-simple-icons-02-brand";
import { ContactSimpleIcons04 } from "./contact-simple-icons-04";
import { ContactSimpleIcons04Brand } from "./contact-simple-icons-04-brand";
import { ContactSimpleLinks02 } from "./contact-simple-links-02";
import { ContactVectorMap03 } from "./contact-vector-map-03";

/** Part B of the contact section variants, keyed by docs route slug. Merged into `variants.ts` by the orchestrator. */
export const variantsB = {
    "contact-centered-map": ContactCenteredMap,
    "contact-vector-map-03": ContactVectorMap03,
    "contact-simple-form-03": ContactSimpleForm03,
    "contact-simple-icons-01-brand": ContactSimpleIcons01Brand,
    "contact-simple-icons-04-brand": ContactSimpleIcons04Brand,
    "contact-icons-and-map-02-brand": ContactIconsAndMap02Brand,
    "contact-form-and-image-01": ContactFormAndImage01,
    "contact-simple-links-02": ContactSimpleLinks02,
    "contact-simple-icons-01": ContactSimpleIcons01,
    "contact-simple-icons-04": ContactSimpleIcons04,
    "contact-icons-and-map-02": ContactIconsAndMap02,
    "contact-icon-cards-02": ContactIconCards02,
    "contact-features-tabs-map-01": ContactFeaturesTabsMap01,
    "contact-simple-form-01": ContactSimpleForm01,
    "contact-simple-form-04": ContactSimpleForm04,
    "contact-simple-icons-02-brand": ContactSimpleIcons02Brand,
    "contact-icons-and-form-brand": ContactIconsAndFormBrand,
    "contact-icons-and-image-brand": ContactIconsAndImageBrand,
} as const satisfies Record<string, ComponentType>;
