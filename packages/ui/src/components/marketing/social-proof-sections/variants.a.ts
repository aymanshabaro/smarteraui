import type { ComponentType } from "react";
import { SocialProofCard } from "./social-proof-card";
import { SocialProofCardBrand } from "./social-proof-card-brand";
import { SocialProofCards } from "./social-proof-cards";
import { SocialProofCardsBrand } from "./social-proof-cards-brand";
import { SocialProofFullWidth } from "./social-proof-full-width";
import { SocialProofFullWidthBrand } from "./social-proof-full-width-brand";
import { SocialProofFullWidthDual } from "./social-proof-full-width-dual";
import { SocialProofFullWidthDualBrand } from "./social-proof-full-width-dual-brand";
import { SocialProofFullWidthMasked } from "./social-proof-full-width-masked";
import { SocialProofFullWidthMaskedBrand } from "./social-proof-full-width-masked-brand";
import { SocialProofPressBrand } from "./social-proof-press-brand";
import { SocialProofPressMentions } from "./social-proof-press-mentions";

/** The social proof section variants built by part A, keyed by their docs route slug. */
export const variantsA = {
    "social-proof-full-width": SocialProofFullWidth,
    "social-proof-card": SocialProofCard,
    "social-proof-full-width-brand": SocialProofFullWidthBrand,
    "social-proof-card-brand": SocialProofCardBrand,
    "social-proof-full-width-dual": SocialProofFullWidthDual,
    "social-proof-press-mentions": SocialProofPressMentions,
    "social-proof-full-width-dual-brand": SocialProofFullWidthDualBrand,
    "social-proof-press-brand": SocialProofPressBrand,
    "social-proof-full-width-masked": SocialProofFullWidthMasked,
    "social-proof-cards": SocialProofCards,
    "social-proof-full-width-masked-brand": SocialProofFullWidthMaskedBrand,
    "social-proof-cards-brand": SocialProofCardsBrand,
} as const satisfies Record<string, ComponentType>;
