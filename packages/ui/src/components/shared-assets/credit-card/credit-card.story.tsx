import type { FC } from "react";
import * as Demos from "./credit-card.demo";

export default {
    title: "Base components/Credit Cards",
    decorators: [
        (Story: FC) => (
            <div className="bg-secondary flex min-h-screen w-full items-center justify-center overflow-auto p-8">
                <Story />
            </div>
        ),
    ],
};

export const CreditCardExample = () => <Demos.CreditCardExample />;
CreditCardExample.storyName = "Credit card example";

export const CustomizationExample = () => <Demos.CustomizationExample />;
CustomizationExample.storyName = "Customization example";

export const SizesExample = () => <Demos.SizesExample />;
SizesExample.storyName = "Sizes example";

export const Transparent = () => <Demos.Transparent />;
Transparent.storyName = "Transparent";

export const TransparentGradient = () => <Demos.TransparentGradient />;
TransparentGradient.storyName = "Transparent gradient";

export const BrandDark = () => <Demos.BrandDark />;
BrandDark.storyName = "Brand dark";

export const BrandLight = () => <Demos.BrandLight />;
BrandLight.storyName = "Brand light";

export const GrayDark = () => <Demos.GrayDark />;
GrayDark.storyName = "Gray dark";

export const GrayLight = () => <Demos.GrayLight />;
GrayLight.storyName = "Gray light";

export const TransparentStrip = () => <Demos.TransparentStrip />;
TransparentStrip.storyName = "Transparent strip";

export const GrayStrip = () => <Demos.GrayStrip />;
GrayStrip.storyName = "Gray strip";

export const GradientStrip = () => <Demos.GradientStrip />;
GradientStrip.storyName = "Gradient strip";

export const SalmonStrip = () => <Demos.SalmonStrip />;
SalmonStrip.storyName = "Salmon strip";

export const GrayStripVertical = () => <Demos.GrayStripVertical />;
GrayStripVertical.storyName = "Gray strip vertical";

export const GradientStripVertical = () => <Demos.GradientStripVertical />;
GradientStripVertical.storyName = "Gradient strip vertical";

export const SalmonStripVertical = () => <Demos.SalmonStripVertical />;
SalmonStripVertical.storyName = "Salmon strip vertical";
