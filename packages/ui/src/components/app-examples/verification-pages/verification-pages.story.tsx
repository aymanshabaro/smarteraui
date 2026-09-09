import type { FC } from "react";
import { variantsA } from "./variants.a";
import * as Demos from "./verification-pages.demo";

export default {
    title: "Page examples/Verification pages",
    decorators: [
        (Story: FC) => (
            <div className="bg-primary min-h-screen w-full">
                <Story />
            </div>
        ),
    ],
};

export const VerificationPageExample = () => <Demos.VerificationPageExample />;
VerificationPageExample.storyName = "Verification page example";

export const Step1CheckEmail = () => {
    const Variant = variantsA["step-1-check-email"];
    return <Variant />;
};
Step1CheckEmail.storyName = "Step 1: Check email";

export const Step2EnterCodeManually = () => {
    const Variant = variantsA["step-2-enter-code-manually"];
    return <Variant />;
};
Step2EnterCodeManually.storyName = "Step 2: Enter code manually";

export const Step3Success = () => {
    const Variant = variantsA["step-3-success"];
    return <Variant />;
};
Step3Success.storyName = "Step 3: Success";
