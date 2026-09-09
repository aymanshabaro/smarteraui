import { TeamPage01 } from "./team-page-01";
import { TeamPage02 } from "./team-page-02";
import { TeamPage03 } from "./team-page-03";
import { TeamPage04 } from "./team-page-04";
import { TeamPage05 } from "./team-page-05";
import { TeamPage06 } from "./team-page-06";
import { TeamPage07 } from "./team-page-07";
import { TeamPage08 } from "./team-page-08";
import { TeamPage09 } from "./team-page-09";
import { TeamPage10 } from "./team-page-10";

/** Part A of the team page variants, keyed by their docs route slug. */
export const variantsA = {
    "team-page-01": TeamPage01,
    "team-page-04": TeamPage04,
    "team-page-07": TeamPage07,
    "team-page-10": TeamPage10,
    "team-page-02": TeamPage02,
    "team-page-05": TeamPage05,
    "team-page-08": TeamPage08,
    "team-page-03": TeamPage03,
    "team-page-06": TeamPage06,
    "team-page-09": TeamPage09,
} as const;
