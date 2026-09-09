import type { FC } from "react";
import * as Radio from "@/components/base/radio-buttons/radio-buttons.demo";

export default {
    title: "Base components/Radio buttons",
    decorators: [
        (Story: FC) => (
            <div className="bg-primary flex min-h-screen w-full p-4">
                <Story />
            </div>
        ),
    ],
};

export const RadioButtonExample = () => <Radio.RadioButtonExample />;
RadioButtonExample.storyName = "Radio button example";

export const WithLabel = () => <Radio.WithLabel />;
WithLabel.storyName = "With label";

export const WithLabelAndHint = () => <Radio.WithLabelAndHint />;
WithLabelAndHint.storyName = "With label and hint";

export const Disabled = () => <Radio.Disabled />;
Disabled.storyName = "Disabled";

export const DisabledIndividualOption = () => <Radio.DisabledIndividualOption />;
DisabledIndividualOption.storyName = "Disabled individual option";

export const Sizes = () => <Radio.Sizes />;
Sizes.storyName = "Sizes";

export const IconSimple = () => <Radio.IconSimple />;
IconSimple.storyName = "Icon simple";

export const IconCard = () => <Radio.IconCard />;
IconCard.storyName = "Icon card";

export const Avatar = () => <Radio.Avatar />;
Avatar.storyName = "Avatar";

export const PaymentIcon = () => <Radio.PaymentIcon />;
PaymentIcon.storyName = "Payment icon";

export const RadioButton = () => <Radio.RadioButton />;
RadioButton.storyName = "Radio button";

export const Checkbox = () => <Radio.Checkbox />;
Checkbox.storyName = "Checkbox";
