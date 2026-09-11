"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import { cx } from "../../../utils/cx";
import { Button } from "../../base/buttons/button";
import { CloseButton } from "../../base/buttons/close-button";
import { Tabs } from "../tabs/tabs";
import type { ColorPickerSavedColorsProps } from "./color-picker";
import { ColorPicker as ColorPickerRoot } from "./color-picker";
import { BRAND_SWATCH_COLORS, GRAY_SWATCH_COLORS, NEUTRAL_SAVED_COLORS, SAVED_COLORS, SWATCH_PICKER_COLORS } from "./color-picker-colors";

/** Centres a floating card the way the reference previews do. */
const DemoStage = ({ children }: { children: ReactNode }) => <div className="flex items-center justify-center p-4">{children}</div>;

/** Saved swatch row that grows as the user presses "Add". */
const SavedColorsWithAdd = ({ colors: initialColors, ...props }: ColorPickerSavedColorsProps) => {
    const [colors, setColors] = useState(initialColors);

    return (
        <ColorPickerRoot.SavedColors
            {...props}
            colors={colors}
            onAdd={(color) => {
                const hex = color.toString("hex").toUpperCase();
                setColors((current) => (current.includes(hex) ? current : [...current, hex]));
            }}
        />
    );
};

/** Area + sliders + value row + saved colors — the body shared by the first two examples. */
const SolidColorPickerBody = ({ className }: { className?: string }) => (
    <div className={cx("flex w-full flex-col gap-4 p-5", className)}>
        <div className="flex flex-col gap-4">
            <ColorPickerRoot.Area />

            <div className="flex flex-col gap-4">
                <div className="flex items-start gap-3">
                    <ColorPickerRoot.EyeDropper />

                    <div className="flex flex-1 flex-col gap-3">
                        <ColorPickerRoot.HueSlider />
                        <ColorPickerRoot.AlphaSlider />
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <ColorPickerRoot.ColorFormatSelect />
                    <ColorPickerRoot.ColorValueInput />
                </div>
            </div>
        </div>

        <SavedColorsWithAdd colors={SAVED_COLORS} label="Saved" />
    </div>
);

/** The empty Gradient/Image tabs of the tabbed example — the reference only renders Solid. */
const PlaceholderTabPanel = ({ children }: { children: ReactNode }) => (
    <div className="text-tertiary flex h-96 items-center justify-center px-5 pt-3 pb-5 text-center text-sm">{children}</div>
);

export const ColorPickerExample = () => (
    <DemoStage>
        <ColorPickerRoot.Provider defaultValue="#7F56D9">
            <ColorPickerRoot.Panel className="w-80">
                <Tabs defaultSelectedKey="solid">
                    <div className="relative flex w-full items-start px-5 pt-5">
                        <Tabs.List type="underline" className="w-full">
                            <Tabs.Item id="solid" label="Solid" />
                            <Tabs.Item id="gradient" label="Gradient" />
                            <Tabs.Item id="image" label="Image" />
                        </Tabs.List>

                        <CloseButton slot={null} label="Close" className="absolute end-2 top-2" />
                    </div>

                    <Tabs.Panel id="solid" className="w-full outline-hidden">
                        <SolidColorPickerBody className="pt-3" />
                    </Tabs.Panel>

                    <Tabs.Panel id="gradient" className="w-full outline-hidden">
                        <PlaceholderTabPanel>Pick a gradient preset or build your own.</PlaceholderTabPanel>
                    </Tabs.Panel>

                    <Tabs.Panel id="image" className="w-full outline-hidden">
                        <PlaceholderTabPanel>Upload an image to use as the fill.</PlaceholderTabPanel>
                    </Tabs.Panel>
                </Tabs>
            </ColorPickerRoot.Panel>
        </ColorPickerRoot.Provider>
    </DemoStage>
);

export const ColorPicker = () => (
    <DemoStage>
        <ColorPickerRoot.Provider defaultValue="#7F56D9">
            <ColorPickerRoot.Panel className="w-80">
                <SolidColorPickerBody />
            </ColorPickerRoot.Panel>
        </ColorPickerRoot.Provider>
    </DemoStage>
);

export const ColorSwatchPicker = () => (
    <DemoStage>
        <ColorPickerRoot.Provider defaultValue="#7F56D9">
            <ColorPickerRoot.Panel className="w-55">
                <div className="px-1 pt-1">
                    <ColorPickerRoot.Preview />
                </div>

                <div className="flex flex-col gap-4 p-4">
                    <ColorPickerRoot.Swatches colors={SWATCH_PICKER_COLORS} label="Saved colors" />
                    <ColorPickerRoot.ColorValueInput className="w-full flex-none" />
                </div>
            </ColorPickerRoot.Panel>
        </ColorPickerRoot.Provider>
    </DemoStage>
);

export const SavedSwatchesSmall = () => (
    <DemoStage>
        <ColorPickerRoot.Provider defaultValue="#171717">
            <ColorPickerRoot.Panel size="sm" className="w-52 gap-3 p-3">
                <ColorPickerRoot.Swatches colors={NEUTRAL_SAVED_COLORS} size="sm" label="Neutral colors" hasSelectionIndicator={false} />

                <div className="flex items-center gap-3">
                    <p className="text-primary text-sm font-semibold">Custom</p>
                    <ColorPickerRoot.ColorValueInput hasAlpha={false} label="Custom color" />
                </div>
            </ColorPickerRoot.Panel>
        </ColorPickerRoot.Provider>
    </DemoStage>
);

export const SavedSwatchesMedium = () => (
    <DemoStage>
        <ColorPickerRoot.Provider defaultValue="#171717">
            <ColorPickerRoot.Panel size="sm" className="w-62 gap-4 p-4">
                <SavedColorsWithAdd colors={NEUTRAL_SAVED_COLORS} label="Saved colors" titleColor="tertiary" hasSelectionIndicator={false} className="gap-4" />

                <ColorPickerRoot.ColorValueInput className="w-full flex-none" />
            </ColorPickerRoot.Panel>
        </ColorPickerRoot.Provider>
    </DemoStage>
);

export const BrandSwatches = () => (
    <DemoStage>
        <ColorPickerRoot.Panel size="sm" className="w-69 gap-4 p-4">
            <div className="flex items-start gap-3 text-sm">
                <p className="text-primary flex-1 font-semibold">Brand</p>
                <p className="text-quaternary">Tailwind CSS v4.3</p>
            </div>

            <ColorPickerRoot.Swatches colors={BRAND_SWATCH_COLORS} label="Brand colors" />

            <div className="flex items-start justify-between">
                <Button size="xs" color="link-gray" href="https://tailwindcss.com/docs/colors">
                    Docs
                </Button>
                <Button size="xs" color="link-gray">
                    Reset
                </Button>
            </div>
        </ColorPickerRoot.Panel>
    </DemoStage>
);

export const GraySwatches = () => (
    <DemoStage>
        <ColorPickerRoot.Panel size="sm" className="w-69 gap-4 p-4">
            <div className="flex items-start gap-3 text-sm">
                <p className="text-primary flex-1 font-semibold">Gray</p>
                <p className="text-quaternary">Tailwind CSS v4.3</p>
            </div>

            <ColorPickerRoot.Swatches colors={GRAY_SWATCH_COLORS} label="Gray colors" />

            <div className="flex items-start justify-between">
                <Button size="xs" color="link-gray" href="https://tailwindcss.com/docs/colors">
                    Docs
                </Button>
                <Button size="xs" color="link-gray">
                    Reset
                </Button>
            </div>
        </ColorPickerRoot.Panel>
    </DemoStage>
);

export const MinimalPicker = () => (
    <DemoStage>
        <ColorPickerRoot.Provider defaultValue="#7F56D9">
            <ColorPickerRoot.Panel size="sm" className="w-78">
                <div className="flex flex-col gap-4 p-4">
                    <div className="flex items-start gap-3">
                        <ColorPickerRoot.EyeDropper />

                        <div className="flex flex-1 flex-col gap-3">
                            <ColorPickerRoot.HueSlider />
                            <ColorPickerRoot.AlphaSlider />
                        </div>
                    </div>

                    <ColorPickerRoot.ColorValueInput />
                </div>
            </ColorPickerRoot.Panel>
        </ColorPickerRoot.Provider>
    </DemoStage>
);

export const HueSlider = () => (
    <DemoStage>
        <ColorPickerRoot.Provider defaultValue="hsb(259, 100%, 100%)">
            <ColorPickerRoot.Panel size="sm" className="w-78">
                <ColorPickerRoot.HueSlider hasSwatch hasValue className="p-4" />
            </ColorPickerRoot.Panel>
        </ColorPickerRoot.Provider>
    </DemoStage>
);

export const TransparencySlider = () => (
    <DemoStage>
        <ColorPickerRoot.Provider defaultValue="#7F56D9">
            <ColorPickerRoot.Panel size="sm" className="w-78">
                <ColorPickerRoot.AlphaSlider hasSwatch hasValue className="p-4" />
            </ColorPickerRoot.Panel>
        </ColorPickerRoot.Provider>
    </DemoStage>
);

export const PalettePicker = () => (
    <DemoStage>
        <ColorPickerRoot.Provider defaultValue="#4F46E5">
            <ColorPickerRoot.Panel className="w-95">
                <div className="flex flex-col gap-4 p-5">
                    <ColorPickerRoot.Palette />

                    <div className="flex flex-col gap-3">
                        <p className="text-secondary text-sm font-semibold">Opacity</p>
                        <ColorPickerRoot.AlphaSlider />
                    </div>

                    <div className="flex items-center gap-3">
                        <ColorPickerRoot.ColorFormatSelect />
                        <ColorPickerRoot.ColorValueInput />
                    </div>

                    <SavedColorsWithAdd colors={SAVED_COLORS} label="Saved" />
                </div>
            </ColorPickerRoot.Panel>
        </ColorPickerRoot.Provider>
    </DemoStage>
);
