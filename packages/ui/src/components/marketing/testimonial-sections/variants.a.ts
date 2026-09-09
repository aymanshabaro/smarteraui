import type { ComponentType } from "react";
import { TestimonialAbstractImage } from "./testimonial-abstract-image";
import { TestimonialCard } from "./testimonial-card";
import { TestimonialCardBrand } from "./testimonial-card-brand";
import { TestimonialCardSplitImage } from "./testimonial-card-split-image";
import { TestimonialCardSplitImageBrand } from "./testimonial-card-split-image-brand";
import { TestimonialCaseStudyCards } from "./testimonial-case-study-cards";
import { TestimonialGlassmorphicCards01 } from "./testimonial-glassmorphic-cards-01";
import { TestimonialGlassmorphicCards02 } from "./testimonial-glassmorphic-cards-02";
import { TestimonialGlassmorphicCards03 } from "./testimonial-glassmorphic-cards-03";
import { TestimonialSimpleCentered01 } from "./testimonial-simple-centered-01";
import { TestimonialSimpleCentered01Brand } from "./testimonial-simple-centered-01-brand";
import { TestimonialSimpleCentered02 } from "./testimonial-simple-centered-02";
import { TestimonialSimpleCentered02Brand } from "./testimonial-simple-centered-02-brand";
import { TestimonialSimpleCentered03 } from "./testimonial-simple-centered-03";
import { TestimonialSimpleCentered03Brand } from "./testimonial-simple-centered-03-brand";
import { TestimonialSimpleLeftAligned } from "./testimonial-simple-left-aligned";
import { TestimonialSimpleLeftAlignedBrand } from "./testimonial-simple-left-aligned-brand";
import { TestimonialSocialCards01 } from "./testimonial-social-cards-01";
import { TestimonialSocialCards01Brand } from "./testimonial-social-cards-01-brand";
import { TestimonialSocialCards02 } from "./testimonial-social-cards-02";
import { TestimonialSocialCards02Brand } from "./testimonial-social-cards-02-brand";
import { TestimonialSocialCards03 } from "./testimonial-social-cards-03";
import { TestimonialSocialCards03Brand } from "./testimonial-social-cards-03-brand";
import { TestimonialSplitImage01 } from "./testimonial-split-image-01";
import { TestimonialSplitImage02 } from "./testimonial-split-image-02";
import { TestimonialSplitImage03 } from "./testimonial-split-image-03";

/** The testimonial section variants built by part A, keyed by their docs route slug. */
export const variantsA = {
    "testimonial-simple-centered-01": TestimonialSimpleCentered01,
    "testimonial-simple-left-aligned": TestimonialSimpleLeftAligned,
    "testimonial-split-image-03": TestimonialSplitImage03,
    "testimonial-glassmorphic-cards-02": TestimonialGlassmorphicCards02,
    "testimonial-card": TestimonialCard,
    "testimonial-social-cards-02": TestimonialSocialCards02,
    "testimonial-simple-centered-02-brand": TestimonialSimpleCentered02Brand,
    "testimonial-card-brand": TestimonialCardBrand,
    "testimonial-social-cards-02-brand": TestimonialSocialCards02Brand,
    "testimonial-simple-centered-02": TestimonialSimpleCentered02,
    "testimonial-split-image-01": TestimonialSplitImage01,
    "testimonial-abstract-image": TestimonialAbstractImage,
    "testimonial-glassmorphic-cards-03": TestimonialGlassmorphicCards03,
    "testimonial-card-split-image": TestimonialCardSplitImage,
    "testimonial-social-cards-03": TestimonialSocialCards03,
    "testimonial-simple-centered-03-brand": TestimonialSimpleCentered03Brand,
    "testimonial-card-split-image-brand": TestimonialCardSplitImageBrand,
    "testimonial-social-cards-03-brand": TestimonialSocialCards03Brand,
    "testimonial-simple-centered-03": TestimonialSimpleCentered03,
    "testimonial-split-image-02": TestimonialSplitImage02,
    "testimonial-glassmorphic-cards-01": TestimonialGlassmorphicCards01,
    "testimonial-case-study-cards": TestimonialCaseStudyCards,
    "testimonial-social-cards-01": TestimonialSocialCards01,
    "testimonial-simple-centered-01-brand": TestimonialSimpleCentered01Brand,
    "testimonial-simple-left-aligned-brand": TestimonialSimpleLeftAlignedBrand,
    "testimonial-social-cards-01-brand": TestimonialSocialCards01Brand,
} as const satisfies Record<string, ComponentType>;
