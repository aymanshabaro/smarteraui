import type { FC } from "react";
import * as Demos from "./email-templates.demo";
import { variantsA } from "./variants.a";

export default {
    title: "Page examples/Email templates",
    decorators: [
        (Story: FC) => (
            <div className="bg-secondary min-h-screen w-full">
                <Story />
            </div>
        ),
    ],
};

export const EmailTemplateExample = () => <Demos.EmailTemplateExample />;
EmailTemplateExample.storyName = "Email template example";

export const SimpleWelcome01 = () => {
    const Variant = variantsA["simple-welcome-01"];
    return <Variant />;
};
SimpleWelcome01.storyName = "Simple welcome 01";

export const SimpleVerification = () => {
    const Variant = variantsA["simple-verification"];
    return <Variant />;
};
SimpleVerification.storyName = "Simple verification";

export const VideoWelcome02 = () => {
    const Variant = variantsA["video-welcome-02"];
    return <Variant />;
};
VideoWelcome02.storyName = "Video welcome 02";

export const Mockup02 = () => {
    const Variant = variantsA["mockup-02"];
    return <Variant />;
};
Mockup02.storyName = "Mockup 02";

export const SimpleWelcome02 = () => {
    const Variant = variantsA["simple-welcome-02"];
    return <Variant />;
};
SimpleWelcome02.storyName = "Simple welcome 02";

export const ImageWelcome = () => {
    const Variant = variantsA["image-welcome"];
    return <Variant />;
};
ImageWelcome.storyName = "Image welcome";

export const VideoWelcome03 = () => {
    const Variant = variantsA["video-welcome-03"];
    return <Variant />;
};
VideoWelcome03.storyName = "Video welcome 03";

export const SimpleInvite = () => {
    const Variant = variantsA["simple-invite"];
    return <Variant />;
};
SimpleInvite.storyName = "Simple invite";

export const VideoWelcome01 = () => {
    const Variant = variantsA["video-welcome-01"];
    return <Variant />;
};
VideoWelcome01.storyName = "Video welcome 01";

export const Mockup01 = () => {
    const Variant = variantsA["mockup-01"];
    return <Variant />;
};
Mockup01.storyName = "Mockup 01";
