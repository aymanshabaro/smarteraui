import type { FC } from "react";
import * as PinInputs from "@/components/base/input/pin-input.demo";

export default {
    title: "Base components/Verification code inputs",
    decorators: [
        (Story: FC) => (
            <div className="bg-primary flex min-h-screen w-full max-w-xs p-4">
                <Story />
            </div>
        ),
    ],
};

export const VerificationCodeInputExample = () => <PinInputs.VerificationCodeInputExample />;
VerificationCodeInputExample.storyName = "Verification code input example";

export const FourDigits = () => <PinInputs.FourDigits />;
FourDigits.storyName = "Four digits";

export const WithSeparator = () => <PinInputs.WithSeparator />;
WithSeparator.storyName = "With separator";

export const InputOTP = () => <PinInputs.InputOTP />;
InputOTP.storyName = "Input OTP";

export const Disabled = () => <PinInputs.Disabled />;

export const Sizes = () => <PinInputs.Sizes />;
