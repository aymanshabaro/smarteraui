import type { FC } from "react";
import * as Demos from "./forgot-password-pages.demo";
import { variantsA } from "./variants.a";

export default {
    title: "Page examples/Forgot password pages",
    decorators: [
        (Story: FC) => (
            <div className="bg-primary min-h-screen w-full">
                <Story />
            </div>
        ),
    ],
};

export const ForgotPasswordPageExample = () => <Demos.ForgotPasswordPageExample />;
ForgotPasswordPageExample.storyName = "Forgot password page example";

export const Step1ForgotPassword = () => {
    const Variant = variantsA["step-1-forgot-password"];
    return <Variant />;
};
Step1ForgotPassword.storyName = "Step 1: Forgot password";

export const Step4Success = () => {
    const Variant = variantsA["step-4-success"];
    return <Variant />;
};
Step4Success.storyName = "Step 4: Success";

export const Step2CheckEmail = () => {
    const Variant = variantsA["step-2-check-email"];
    return <Variant />;
};
Step2CheckEmail.storyName = "Step 2: Check email";

export const StepSidebarVersion = () => {
    const Variant = variantsA["step-sidebar-version"];
    return <Variant />;
};
StepSidebarVersion.storyName = "Step sidebar version";

export const Step3SetNewPassword = () => {
    const Variant = variantsA["step-3-set-new-password"];
    return <Variant />;
};
Step3SetNewPassword.storyName = "Step 3: Set new password";
