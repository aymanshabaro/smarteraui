import { ContactFeaturesTabsMap02 } from "./contact-features-tabs-map-02";
import { ContactFormAndImage02 } from "./contact-form-and-image-02";
import { ContactFormAndMap } from "./contact-form-and-map";
import { ContactIconCards01 } from "./contact-icon-cards-01";
import { ContactIconCards03 } from "./contact-icon-cards-03";
import { ContactIconsAndForm } from "./contact-icons-and-form";
import { ContactIconsAndImage } from "./contact-icons-and-image";
import { ContactIconsAndMap01 } from "./contact-icons-and-map-01";
import { ContactIconsAndMap01Brand } from "./contact-icons-and-map-01-brand";
import { ContactMap01 } from "./contact-map-01";
import { ContactMap02 } from "./contact-map-02";
import { ContactSimpleForm } from "./contact-simple-form";
import { ContactSimpleForm02 } from "./contact-simple-form-02";
import { ContactSimpleForm05 } from "./contact-simple-form-05";
import { ContactSimpleIcons02 } from "./contact-simple-icons-02";
import { ContactSimpleIcons03 } from "./contact-simple-icons-03";
import { ContactSimpleIcons03Brand } from "./contact-simple-icons-03-brand";
import { ContactSimpleLinks01 } from "./contact-simple-links-01";

/** Part A of the contact section variants, keyed by docs route slug. Merged into `variants.ts` by the orchestrator. */
export const variantsA = {
    "contact-simple-form": ContactSimpleForm,
    "contact-form-and-image-02": ContactFormAndImage02,
    "contact-map-01": ContactMap01,
    "contact-simple-icons-02": ContactSimpleIcons02,
    "contact-icons-and-form": ContactIconsAndForm,
    "contact-icons-and-image": ContactIconsAndImage,
    "contact-icon-cards-03": ContactIconCards03,
    "contact-features-tabs-map-02": ContactFeaturesTabsMap02,
    "contact-simple-form-02": ContactSimpleForm02,
    "contact-simple-form-05": ContactSimpleForm05,
    "contact-simple-icons-03-brand": ContactSimpleIcons03Brand,
    "contact-icons-and-map-01-brand": ContactIconsAndMap01Brand,
    "contact-form-and-map": ContactFormAndMap,
    "contact-simple-links-01": ContactSimpleLinks01,
    "contact-map-02": ContactMap02,
    "contact-simple-icons-03": ContactSimpleIcons03,
    "contact-icons-and-map-01": ContactIconsAndMap01,
    "contact-icon-cards-01": ContactIconCards01,
} as const;
