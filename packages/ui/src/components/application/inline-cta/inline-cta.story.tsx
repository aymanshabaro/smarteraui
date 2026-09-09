import type { FC } from "react";
import * as Demos from "./inline-cta.demo";

export default {
    title: "Application components/Inline CTAs",
    decorators: [
        (Story: FC) => (
            <div className="bg-primary flex min-h-screen w-full items-center justify-center p-8">
                <Story />
            </div>
        ),
    ],
};

export const InlineCTAExample = () => <Demos.InlineCTAExample />;
InlineCTAExample.storyName = "Inline CTA example";

export const Actions = () => <Demos.Actions />;
Actions.storyName = "Actions";

export const EmailField = () => <Demos.EmailField />;
EmailField.storyName = "Email field";

export const ChangePlan = () => <Demos.ChangePlan />;
ChangePlan.storyName = "Change plan";

export const UpgradePlan = () => <Demos.UpgradePlan />;
UpgradePlan.storyName = "Upgrade plan";

export const PaymentMethod = () => <Demos.PaymentMethod />;
PaymentMethod.storyName = "Payment method";

export const Receipt = () => <Demos.Receipt />;
Receipt.storyName = "Receipt";
