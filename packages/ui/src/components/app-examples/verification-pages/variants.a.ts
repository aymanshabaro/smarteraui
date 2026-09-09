import { Step1CheckEmail } from "./step-1-check-email";
import { Step2EnterCodeManually } from "./step-2-enter-code-manually";
import { Step3Success } from "./step-3-success";

/** Part A of the verification page variants, keyed by docs route slug. Merged into `variants.ts` by the orchestrator. */
export const variantsA = {
    "step-1-check-email": Step1CheckEmail,
    "step-2-enter-code-manually": Step2EnterCodeManually,
    "step-3-success": Step3Success,
} as const;
