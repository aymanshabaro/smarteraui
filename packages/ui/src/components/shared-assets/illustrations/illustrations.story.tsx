import type { FC } from "react";
import * as Demos from "./illustrations.demo";

export default {
    title: "Base components/Illustrations",
    decorators: [
        (Story: FC) => (
            <div className="bg-primary flex min-h-screen w-full items-center justify-center overflow-auto p-8">
                <Story />
            </div>
        ),
    ],
};

export const IllustrationExample = () => <Demos.IllustrationExample />;
IllustrationExample.storyName = "Illustration example";

export const BoxSm = () => <Demos.BoxSm />;
BoxSm.storyName = "Box sm";

export const BoxMd = () => <Demos.BoxMd />;
BoxMd.storyName = "Box md";

export const BoxLg = () => <Demos.BoxLg />;
BoxLg.storyName = "Box lg";

export const CloudSm = () => <Demos.CloudSm />;
CloudSm.storyName = "Cloud sm";

export const CloudMd = () => <Demos.CloudMd />;
CloudMd.storyName = "Cloud md";

export const CloudLg = () => <Demos.CloudLg />;
CloudLg.storyName = "Cloud lg";

export const CreditCardSm = () => <Demos.CreditCardSm />;
CreditCardSm.storyName = "Credit card sm";

export const CreditCardMd = () => <Demos.CreditCardMd />;
CreditCardMd.storyName = "Credit card md";

export const CreditCardLg = () => <Demos.CreditCardLg />;
CreditCardLg.storyName = "Credit card lg";

export const DocumentsSm = () => <Demos.DocumentsSm />;
DocumentsSm.storyName = "Documents sm";

export const DocumentsMd = () => <Demos.DocumentsMd />;
DocumentsMd.storyName = "Documents md";

export const DocumentsLg = () => <Demos.DocumentsLg />;
DocumentsLg.storyName = "Documents lg";
