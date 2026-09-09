import type { ComponentType } from "react";
import { TeamSectionImageCard01 } from "./team-section-image-card-01";
import { TeamSectionImageCard02 } from "./team-section-image-card-02";
import { TeamSectionImageCard03 } from "./team-section-image-card-03";
import { TeamSectionImageCard04 } from "./team-section-image-card-04";
import { TeamSectionImageCollage01 } from "./team-section-image-collage-01";
import { TeamSectionImageCollage02 } from "./team-section-image-collage-02";
import { TeamSectionImageGlass01 } from "./team-section-image-glass-01";
import { TeamSectionImageGlass02 } from "./team-section-image-glass-02";
import { TeamSectionImageGlass03 } from "./team-section-image-glass-03";
import { TeamSectionImageGlass04 } from "./team-section-image-glass-04";
import { TeamSectionSimple01 } from "./team-section-simple-01";
import { TeamSectionSimple02 } from "./team-section-simple-02";
import { TeamSectionSimple03 } from "./team-section-simple-03";
import { TeamSectionSimple04 } from "./team-section-simple-04";

/** The team section variants built by part A, keyed by their docs route slug. */
export const variantsA = {
    "team-section-simple-01": TeamSectionSimple01,
    "team-section-simple-02": TeamSectionSimple02,
    "team-section-simple-03": TeamSectionSimple03,
    "team-section-simple-04": TeamSectionSimple04,
    "team-section-image-card-01": TeamSectionImageCard01,
    "team-section-image-card-02": TeamSectionImageCard02,
    "team-section-image-card-03": TeamSectionImageCard03,
    "team-section-image-card-04": TeamSectionImageCard04,
    "team-section-image-glass-01": TeamSectionImageGlass01,
    "team-section-image-glass-02": TeamSectionImageGlass02,
    "team-section-image-glass-03": TeamSectionImageGlass03,
    "team-section-image-glass-04": TeamSectionImageGlass04,
    "team-section-image-collage-01": TeamSectionImageCollage01,
    "team-section-image-collage-02": TeamSectionImageCollage02,
} as const satisfies Record<string, ComponentType>;
