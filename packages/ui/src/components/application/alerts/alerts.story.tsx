import type { FC } from "react";
import * as Demos from "./alerts.demo";

export default {
    title: "Application components/Alerts",
    decorators: [
        (Story: FC) => (
            <div className="bg-primary flex min-h-screen w-full items-center justify-center p-8">
                <Story />
            </div>
        ),
    ],
};

export const AlertExample = () => <Demos.AlertExample />;
AlertExample.storyName = "Alert example";

export const FloatingDefault = () => <Demos.FloatingDefault />;
FloatingDefault.storyName = "Floating default";

export const FloatingBrand = () => <Demos.FloatingBrand />;
FloatingBrand.storyName = "Floating brand";

export const FloatingGray = () => <Demos.FloatingGray />;
FloatingGray.storyName = "Floating gray";

export const FloatingError = () => <Demos.FloatingError />;
FloatingError.storyName = "Floating error";

export const FloatingWarning = () => <Demos.FloatingWarning />;
FloatingWarning.storyName = "Floating warning";

export const FloatingSuccess = () => <Demos.FloatingSuccess />;
FloatingSuccess.storyName = "Floating success";

export const FullWidthDefault = () => <Demos.FullWidthDefault />;
FullWidthDefault.storyName = "Full-width default";

export const FullWidthBrand = () => <Demos.FullWidthBrand />;
FullWidthBrand.storyName = "Full-width brand";

export const FullWidthGray = () => <Demos.FullWidthGray />;
FullWidthGray.storyName = "Full-width gray";

export const FullWidthError = () => <Demos.FullWidthError />;
FullWidthError.storyName = "Full-width error";

export const FullWidthWarning = () => <Demos.FullWidthWarning />;
FullWidthWarning.storyName = "Full-width warning";

export const FullWidthSuccess = () => <Demos.FullWidthSuccess />;
FullWidthSuccess.storyName = "Full-width success";
