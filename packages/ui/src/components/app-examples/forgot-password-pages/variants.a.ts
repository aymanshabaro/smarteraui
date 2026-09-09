import { Step1ForgotPassword } from "./step-1-forgot-password";
import { Step2CheckEmail } from "./step-2-check-email";
import { Step3SetNewPassword } from "./step-3-set-new-password";
import { Step4Success } from "./step-4-success";
import { StepSidebarVersion } from "./step-sidebar-version";

/** Part A of the forgot password page variants, keyed by docs route slug. Merged into `variants.ts` by the orchestrator. */
export const variantsA = {
    "step-1-forgot-password": Step1ForgotPassword,
    "step-4-success": Step4Success,
    "step-2-check-email": Step2CheckEmail,
    "step-sidebar-version": StepSidebarVersion,
    "step-3-set-new-password": Step3SetNewPassword,
} as const;
