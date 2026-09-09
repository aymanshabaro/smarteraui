import type { FC } from "react";
import * as ColorPickers from "./color-picker.demo";

export default {
    title: "Application components/Color pickers",
    decorators: [
        (Story: FC) => (
            <div className="bg-primary flex min-h-screen w-full items-center justify-center p-8">
                <Story />
            </div>
        ),
    ],
};

export const ColorPickerExample = () => <ColorPickers.ColorPickerExample />;
ColorPickerExample.storyName = "Color picker example";

export const ColorPicker = () => <ColorPickers.ColorPicker />;
ColorPicker.storyName = "Color picker";

export const ColorSwatchPicker = () => <ColorPickers.ColorSwatchPicker />;
ColorSwatchPicker.storyName = "Color swatch picker";

export const SavedSwatchesSmall = () => <ColorPickers.SavedSwatchesSmall />;
SavedSwatchesSmall.storyName = "Saved swatches small";

export const SavedSwatchesMedium = () => <ColorPickers.SavedSwatchesMedium />;
SavedSwatchesMedium.storyName = "Saved swatches medium";

export const BrandSwatches = () => <ColorPickers.BrandSwatches />;
BrandSwatches.storyName = "Brand swatches";

export const GraySwatches = () => <ColorPickers.GraySwatches />;
GraySwatches.storyName = "Gray swatches";

export const MinimalPicker = () => <ColorPickers.MinimalPicker />;
MinimalPicker.storyName = "Minimal picker";

export const HueSlider = () => <ColorPickers.HueSlider />;
HueSlider.storyName = "Hue slider";

export const TransparencySlider = () => <ColorPickers.TransparencySlider />;
TransparencySlider.storyName = "Transparency slider";

export const PalettePicker = () => <ColorPickers.PalettePicker />;
PalettePicker.storyName = "Palette picker";
