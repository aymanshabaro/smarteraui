import { BannerCountdownBrand } from "./banner-countdown-brand";
import { BannerCountdownBrandFullWidth } from "./banner-countdown-brand-full-width";
import { BannerCountdownDefault } from "./banner-countdown-default";
import { BannerCountdownDefaultFullWidth } from "./banner-countdown-default-full-width";
import { BannerDualActionBrand } from "./banner-dual-action-brand";
import { BannerDualActionBrandFullWidth } from "./banner-dual-action-brand-full-width";
import { BannerDualActionDefault } from "./banner-dual-action-default";
import { BannerDualActionDefaultFullWidth } from "./banner-dual-action-default-full-width";
import { BannerSingleActionBrand } from "./banner-single-action-brand";
import { BannerSingleActionBrandFullWidth } from "./banner-single-action-brand-full-width";
import { BannerSingleActionDefault } from "./banner-single-action-default";
import { BannerSingleActionDefaultFullWidth } from "./banner-single-action-default-full-width";
import { BannerSlimBrand } from "./banner-slim-brand";
import { BannerSlimBrandFullWidth } from "./banner-slim-brand-full-width";
import { BannerSlimDefault } from "./banner-slim-default";
import { BannerSlimDefaultFullWidth } from "./banner-slim-default-full-width";
import { BannerTextFieldBrand } from "./banner-text-field-brand";
import { BannerTextFieldBrandFullWidth } from "./banner-text-field-brand-full-width";
import { BannerTextFieldDefault } from "./banner-text-field-default";
import { BannerTextFieldDefaultFullWidth } from "./banner-text-field-default-full-width";

/** Part A of the banner variants, keyed by docs route slug. Merged into `variants.ts` by the orchestrator. */
export const variantsA = {
    "banner-text-field-default": BannerTextFieldDefault,
    "banner-single-action-brand": BannerSingleActionBrand,
    "banner-slim-default": BannerSlimDefault,
    "banner-text-field-brand-full-width": BannerTextFieldBrandFullWidth,
    "banner-dual-action-default-full-width": BannerDualActionDefaultFullWidth,
    "banner-slim-brand-full-width": BannerSlimBrandFullWidth,
    "banner-countdown-default-full-width": BannerCountdownDefaultFullWidth,
    "banner-text-field-brand": BannerTextFieldBrand,
    "banner-dual-action-default": BannerDualActionDefault,
    "banner-slim-brand": BannerSlimBrand,
    "banner-single-action-default-full-width": BannerSingleActionDefaultFullWidth,
    "banner-dual-action-brand-full-width": BannerDualActionBrandFullWidth,
    "banner-countdown-default": BannerCountdownDefault,
    "banner-countdown-brand-full-width": BannerCountdownBrandFullWidth,
    "banner-single-action-default": BannerSingleActionDefault,
    "banner-dual-action-brand": BannerDualActionBrand,
    "banner-text-field-default-full-width": BannerTextFieldDefaultFullWidth,
    "banner-single-action-brand-full-width": BannerSingleActionBrandFullWidth,
    "banner-slim-default-full-width": BannerSlimDefaultFullWidth,
    "banner-countdown-brand": BannerCountdownBrand,
} as const;
