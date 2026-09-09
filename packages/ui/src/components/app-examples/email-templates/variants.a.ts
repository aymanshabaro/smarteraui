import { ImageWelcome } from "./image-welcome";
import { Mockup01 } from "./mockup-01";
import { Mockup02 } from "./mockup-02";
import { SimpleInvite } from "./simple-invite";
import { SimpleVerification } from "./simple-verification";
import { SimpleWelcome01 } from "./simple-welcome-01";
import { SimpleWelcome02 } from "./simple-welcome-02";
import { VideoWelcome01 } from "./video-welcome-01";
import { VideoWelcome02 } from "./video-welcome-02";
import { VideoWelcome03 } from "./video-welcome-03";

/** Part A of the email template variants, keyed by docs route slug. Merged into `variants.ts` by the orchestrator. */
export const variantsA = {
    "simple-welcome-01": SimpleWelcome01,
    "simple-verification": SimpleVerification,
    "video-welcome-02": VideoWelcome02,
    "mockup-02": Mockup02,
    "simple-welcome-02": SimpleWelcome02,
    "image-welcome": ImageWelcome,
    "video-welcome-03": VideoWelcome03,
    "simple-invite": SimpleInvite,
    "video-welcome-01": VideoWelcome01,
    "mockup-01": Mockup01,
} as const;
