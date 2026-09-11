import type { FC } from "react";
import * as Inputs from "./inputs.demo";

export default {
    title: "Base components/Inputs",
    decorators: [
        (Story: FC) => (
            <div className="bg-primary flex min-h-screen w-full max-w-xs p-4">
                <Story />
            </div>
        ),
    ],
};

export const InputExample = () => <Inputs.InputExample />;
InputExample.storyName = "Input example";

export const Default = () => <Inputs.Default />;

export const Disabled = () => <Inputs.Disabled />;

export const Invalid = () => <Inputs.Invalid />;

export const Sizes = () => <Inputs.Sizes />;

export const LeadingIcon = () => <Inputs.LeadingIcon />;
LeadingIcon.storyName = "Leading icon";

export const LeadingDropdown = () => <Inputs.LeadingDropdown />;
LeadingDropdown.storyName = "Leading dropdown";

export const TrailingDropdown = () => <Inputs.TrailingDropdown />;
TrailingDropdown.storyName = "Trailing dropdown";

export const LeadingText = () => <Inputs.LeadingText />;
LeadingText.storyName = "Leading text";

export const PaymentInput = () => <Inputs.PaymentInput />;
PaymentInput.storyName = "Payment input";

export const TrailingButton = () => <Inputs.TrailingButton />;
TrailingButton.storyName = "Trailing button";

export const FileUpload = () => <Inputs.FileUpload />;
FileUpload.storyName = "File upload";

export const PasswordInput = () => <Inputs.PasswordInput />;
PasswordInput.storyName = "Password input";

export const DateInput = () => <Inputs.DateInput />;
DateInput.storyName = "Date input";

export const NumberInputHorizontal = () => <Inputs.NumberInputHorizontal />;
NumberInputHorizontal.storyName = "Number input horizontal";

export const NumberInputVertical = () => <Inputs.NumberInputVertical />;
NumberInputVertical.storyName = "Number input vertical";

export const TagInput = () => <Inputs.TagInput />;
TagInput.storyName = "Tag input";

export const TagInputOuter = () => <Inputs.TagInputOuter />;
TagInputOuter.storyName = "Tag input outer";
