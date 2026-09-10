"use client";

import type { CSSProperties, HTMLAttributes, ReactNode } from "react";
import { createContext, useContext, useMemo, useState, useSyncExternalStore } from "react";
import { useLocale } from "react-aria";
import type {
    ColorAreaProps as AriaColorAreaProps,
    ColorPickerProps as AriaColorPickerProps,
    ColorSliderProps as AriaColorSliderProps,
} from "react-aria-components";
import {
    ColorArea as AriaColorArea,
    ColorField as AriaColorField,
    ColorPicker as AriaColorPicker,
    ColorPickerStateContext as AriaColorPickerStateContext,
    ColorSlider as AriaColorSlider,
    ColorSwatch as AriaColorSwatch,
    ColorSwatchPicker as AriaColorSwatchPicker,
    ColorSwatchPickerItem as AriaColorSwatchPickerItem,
    ColorThumb as AriaColorThumb,
    Input as AriaInput,
    parseColor as AriaParseColor,
    SliderTrack as AriaSliderTrack,
    TextField as AriaTextField,
} from "react-aria-components";
import { Dropper, Plus } from "@smarteraui/icons";
import { Button } from "@/components/base/buttons/button";
import { Select } from "@/components/base/select/select";
import { cx, sortCx } from "@/utils/cx";
import { TAILWIND_PALETTE, TAILWIND_PALETTE_COLUMNS } from "./color-picker-colors";

/** A parsed React Aria color value. */
export type ColorValue = ReturnType<typeof AriaParseColor>;

/** The color notations offered by `ColorPicker.ColorFormatSelect`. */
export type ColorPickerFormat = "hex" | "rgb" | "css" | "hsl" | "hsb";

const styles = sortCx({
    common: {
        panel: "bg-primary ring-secondary_alt relative flex flex-col overflow-clip shadow-xl ring-1",
        area: "ring-alpha-black/10 relative aspect-square w-full shrink-0 rounded-lg ring-[0.5px] ring-inset",
        thumb: "border-fg-white outline-focus-ring size-5 cursor-grab rounded-full border-[3px] shadow-md outline-0 focus-visible:outline-2 focus-visible:outline-offset-2",
        sliderTrack: "ring-alpha-black/10 relative h-3 w-full cursor-pointer rounded-full ring-[0.5px] ring-inset",
        swatchList: "flex flex-wrap gap-2",
        swatch: "ring-alpha-black/10 size-full rounded-full ring-1 ring-inset",
        // Shared shell for every field box: the ring/focus treatment of `base/input` without its layout.
        fieldBox:
            "bg-primary ring-primary focus-within:ring-brand relative flex place-content-center place-items-center transition-shadow duration-100 ease-linear ring-1 ring-inset focus-within:z-10 focus-within:ring-2",
        fieldInput: "text-primary w-full min-w-0 bg-transparent text-sm outline-hidden",
        fieldSwatch: "ring-alpha-black/10 size-4 shrink-0 rounded-full ring-1 ring-inset",
        sectionHeader: "flex items-center gap-3",
        sectionTitle: "flex-1 text-sm font-semibold",
    },
    panelSizes: {
        sm: "rounded-xl",
        md: "rounded-2xl",
    },
    swatchSizes: {
        sm: "size-4",
        md: "size-5",
    },
    titleColors: {
        primary: "text-primary",
        secondary: "text-secondary",
        tertiary: "text-tertiary",
    },
});

/* -------------------------------------------------------------------------------------------------
 * Format context
 * ----------------------------------------------------------------------------------------------- */

interface ColorPickerFormatContextValue {
    format: ColorPickerFormat;
    setFormat: (format: ColorPickerFormat) => void;
}

const ColorPickerFormatContext = createContext<ColorPickerFormatContextValue | null>(null);

/**
 * Reads the color picker state provided by `ColorPicker.Provider`. Throws when used outside one so
 * the mistake surfaces at render time instead of as a silent no-op.
 */
export const useColorPicker = () => {
    const state = useContext(AriaColorPickerStateContext);

    if (!state) {
        throw new Error("useColorPicker() must be used inside a <ColorPicker.Provider>.");
    }

    return state;
};

const useColorPickerFormat = () => {
    const context = useContext(ColorPickerFormatContext);

    if (!context) {
        throw new Error("ColorPicker format sub-components must be used inside a <ColorPicker.Provider>.");
    }

    return context;
};

/* -------------------------------------------------------------------------------------------------
 * Provider
 * ----------------------------------------------------------------------------------------------- */

export interface ColorPickerProviderProps extends Omit<AriaColorPickerProps, "children"> {
    /**
     * The notation initially selected in the format selector.
     * @default "hex"
     */
    defaultFormat?: ColorPickerFormat;
    /** Called when the user picks a different notation in the format selector. */
    onFormatChange?: (format: ColorPickerFormat) => void;
    children: ReactNode;
}

const ColorPickerProvider = ({ defaultFormat = "hex", onFormatChange, children, ...props }: ColorPickerProviderProps) => {
    const [format, setFormatState] = useState<ColorPickerFormat>(defaultFormat);

    const formatContext = useMemo<ColorPickerFormatContextValue>(
        () => ({
            format,
            setFormat: (next) => {
                setFormatState(next);
                onFormatChange?.(next);
            },
        }),
        [format, onFormatChange],
    );

    return (
        <AriaColorPicker {...props}>
            <ColorPickerFormatContext.Provider value={formatContext}>{children}</ColorPickerFormatContext.Provider>
        </AriaColorPicker>
    );
};

/* -------------------------------------------------------------------------------------------------
 * Panel
 * ----------------------------------------------------------------------------------------------- */

export interface ColorPickerPanelProps extends HTMLAttributes<HTMLDivElement> {
    /**
     * Corner radius of the floating card.
     * @default "md"
     */
    size?: keyof typeof styles.panelSizes;
}

const ColorPickerPanel = ({ size = "md", className, ...props }: ColorPickerPanelProps) => (
    <div {...props} className={cx(styles.common.panel, styles.panelSizes[size], className)} />
);

/* -------------------------------------------------------------------------------------------------
 * Saturation / brightness area
 * ----------------------------------------------------------------------------------------------- */

export interface ColorPickerAreaProps extends Omit<AriaColorAreaProps, "className" | "children" | "style"> {
    className?: string;
}

const ColorPickerArea = ({ className, ...props }: ColorPickerAreaProps) => (
    // `colorSpace` is explicit so a hex/rgb value handed to the provider still resolves the
    // saturation and brightness channels this area edits.
    <AriaColorArea colorSpace="hsb" xChannel="saturation" yChannel="brightness" {...props} className={cx(styles.common.area, className)}>
        <AriaColorThumb className={({ isDragging }) => cx(styles.common.thumb, isDragging && "cursor-grabbing")} />
    </AriaColorArea>
);

/* -------------------------------------------------------------------------------------------------
 * Channel sliders
 * ----------------------------------------------------------------------------------------------- */

interface ColorPickerChannelSliderProps extends Omit<AriaColorSliderProps, "className" | "children" | "style" | "channel"> {
    /** Renders the current channel colour as a dot before the track. */
    hasSwatch?: boolean;
    /** Renders the formatted channel value after the track. */
    hasValue?: boolean;
    className?: string;
    /** Class name applied to the gradient track. */
    trackClassName?: string;
}

/** Hue slider display colour: the pure hue at full saturation and brightness. */
const getHueSwatchColor = (color: ColorValue) => color.toFormat("hsb").withChannelValue("saturation", 100).withChannelValue("brightness", 100).toString("hex");

const ColorPickerChannelSlider = ({
    channel,
    hasSwatch,
    hasValue,
    className,
    trackClassName,
    ...props
}: ColorPickerChannelSliderProps & { channel: "hue" | "alpha" }) => {
    const { locale } = useLocale();
    const state = useColorPicker();
    const hsbColor = state.color.toFormat("hsb");

    const slider = (
        <AriaColorSlider colorSpace="hsb" {...props} channel={channel} className={cx("w-full", !hasSwatch && !hasValue && className)}>
            <AriaSliderTrack className={cx(styles.common.sliderTrack, trackClassName)}>
                <AriaColorThumb className={({ isDragging }) => cx(styles.common.thumb, isDragging && "cursor-grabbing")} />
            </AriaSliderTrack>
        </AriaColorSlider>
    );

    if (!hasSwatch && !hasValue) return slider;

    return (
        <div className={cx("flex items-center gap-3", className)}>
            {hasSwatch && (
                <span
                    aria-hidden="true"
                    className={cx(styles.common.fieldSwatch)}
                    style={{ background: channel === "hue" ? getHueSwatchColor(state.color) : state.color.toString("hex") }}
                />
            )}

            <div className="flex-1">{slider}</div>

            {hasValue && <span className="text-primary shrink-0 text-sm">{hsbColor.formatChannelValue(channel, locale)}</span>}
        </div>
    );
};

export type ColorPickerSliderProps = ColorPickerChannelSliderProps;

const ColorPickerHueSlider = (props: ColorPickerSliderProps) => <ColorPickerChannelSlider {...props} channel="hue" />;

const ColorPickerAlphaSlider = (props: ColorPickerSliderProps) => <ColorPickerChannelSlider {...props} channel="alpha" />;

/* -------------------------------------------------------------------------------------------------
 * Eye dropper
 * ----------------------------------------------------------------------------------------------- */

type EyeDropperConstructor = new () => { open: () => Promise<{ sRGBHex: string }> };

const isEyeDropperSupported = () => typeof window !== "undefined" && "EyeDropper" in window;

// `useSyncExternalStore` keeps the server snapshot `false` so the button is never rendered during
// SSR (where `window` is absent) and appears on hydration only where the API exists.
const subscribeToNothing = () => () => {};

export interface ColorPickerEyeDropperProps {
    /**
     * Accessible name for the icon-only button.
     * @default "Pick a color from the screen"
     */
    label?: string;
    className?: string;
}

const ColorPickerEyeDropper = ({ label = "Pick a color from the screen", className }: ColorPickerEyeDropperProps) => {
    const state = useColorPicker();
    const isSupported = useSyncExternalStore(
        subscribeToNothing,
        () => isEyeDropperSupported(),
        () => false,
    );

    // The reference hides the control entirely in browsers without the API rather than
    // showing a button that cannot do anything.
    if (!isSupported) return null;

    const openEyeDropper = async () => {
        const EyeDropper = (window as unknown as { EyeDropper: EyeDropperConstructor }).EyeDropper;

        try {
            const { sRGBHex } = await new EyeDropper().open();
            state.setColor(AriaParseColor(sRGBHex));
        } catch {
            // The user dismissed the picker — nothing to do.
        }
    };

    return <Button size="sm" color="secondary" aria-label={label} iconLeading={Dropper} onPress={openEyeDropper} className={className} />;
};

/* -------------------------------------------------------------------------------------------------
 * Format select
 * ----------------------------------------------------------------------------------------------- */

const FORMAT_ITEMS: { id: ColorPickerFormat; label: string }[] = [
    { id: "hex", label: "Hex" },
    { id: "rgb", label: "RGB" },
    { id: "css", label: "CSS" },
    { id: "hsl", label: "HSL" },
    { id: "hsb", label: "HSB" },
];

export interface ColorPickerColorFormatSelectProps {
    /**
     * Accessible name for the selector.
     * @default "Color format"
     */
    label?: string;
    className?: string;
}

const ColorPickerColorFormatSelect = ({ label = "Color format", className }: ColorPickerColorFormatSelectProps) => {
    const { format, setFormat } = useColorPickerFormat();

    return (
        <Select
            size="sm"
            aria-label={label}
            items={FORMAT_ITEMS}
            selectedKey={format}
            onSelectionChange={(key) => setFormat(key as ColorPickerFormat)}
            className={cx("w-20 shrink-0", className)}
        >
            {(item) => <Select.Item {...item} />}
        </Select>
    );
};

/* -------------------------------------------------------------------------------------------------
 * Color value input
 * ----------------------------------------------------------------------------------------------- */

/** Free-text field used for every notation except hex, which gets React Aria's `ColorField`. */
const ColorPickerFormattedField = ({ format, label }: { format: Exclude<ColorPickerFormat, "hex">; label: string }) => {
    const state = useColorPicker();
    const [draft, setDraft] = useState<string | null>(null);

    const formatted = state.color.toString(format === "css" ? "css" : format);

    const commit = () => {
        if (draft === null) return;

        try {
            state.setColor(AriaParseColor(draft));
        } catch {
            // Leave the committed colour untouched when the text cannot be parsed.
        }

        setDraft(null);
    };

    return (
        <AriaTextField aria-label={label} value={draft ?? formatted} onChange={setDraft} onBlur={commit} className="flex flex-1 items-center gap-2 px-2.5 py-2">
            <AriaColorSwatch className={styles.common.fieldSwatch} />
            <AriaInput
                spellCheck={false}
                autoComplete="off"
                className={styles.common.fieldInput}
                onKeyDown={(event) => {
                    if (event.key === "Enter") commit();
                    if (event.key === "Escape") setDraft(null);
                }}
            />
        </AriaTextField>
    );
};

export interface ColorPickerColorValueInputProps {
    /**
     * Whether the trailing alpha percentage box is rendered.
     * @default true
     */
    hasAlpha?: boolean;
    /**
     * Accessible name for the color text field.
     * @default "Hex color"
     */
    label?: string;
    className?: string;
}

const ColorPickerColorValueInput = ({ hasAlpha = true, label = "Hex color", className }: ColorPickerColorValueInputProps) => {
    const { format } = useColorPickerFormat();

    return (
        <div className={cx("flex flex-1 shadow-xs", className)}>
            <div className={cx(styles.common.fieldBox, "flex-1", hasAlpha ? "rounded-s-lg" : "rounded-lg")}>
                {format === "hex" ? (
                    <AriaColorField aria-label={label} className="flex flex-1 items-center gap-2 px-2.5 py-2">
                        <AriaColorSwatch className={styles.common.fieldSwatch} />
                        <AriaInput className={styles.common.fieldInput} />
                    </AriaColorField>
                ) : (
                    <ColorPickerFormattedField format={format} label={label} />
                )}
            </div>

            {hasAlpha && (
                <div className={cx(styles.common.fieldBox, "-ms-px w-14 shrink-0 rounded-e-lg")}>
                    <AriaColorField channel="alpha" aria-label="Alpha" className="flex w-full items-center">
                        <AriaInput className={cx(styles.common.fieldInput, "px-2.5 py-2")} />
                    </AriaColorField>
                </div>
            )}
        </div>
    );
};

/* -------------------------------------------------------------------------------------------------
 * Swatches
 * ----------------------------------------------------------------------------------------------- */

/**
 * Fully transparent sentinel handed to `ColorSwatchPicker` when the grid must not track the
 * picker's current color: it is a real value (the prop is required) that no opaque swatch matches.
 */
const NO_SWATCH_SELECTED = "#00000000";

export interface ColorPickerSwatchesProps {
    /** The colors to render, as CSS color strings. */
    colors: string[];
    /**
     * Diameter of each swatch.
     * @default "md"
     */
    size?: keyof typeof styles.swatchSizes;
    /**
     * Accessible name for the swatch grid.
     * @default "Colors"
     */
    label?: string;
    /**
     * Whether the swatch matching the picker's current color is outlined. Set to `false` for a
     * palette that only reports picks and never mirrors the picker's value.
     * @default true
     */
    hasSelectionIndicator?: boolean;
    /** Called with the color the user picked. */
    onSelect?: (color: ColorValue) => void;
    className?: string;
}

const ColorPickerSwatches = ({ colors, size = "md", label = "Colors", hasSelectionIndicator = true, onSelect, className }: ColorPickerSwatchesProps) => (
    <AriaColorSwatchPicker
        aria-label={label}
        onChange={onSelect}
        value={hasSelectionIndicator ? undefined : NO_SWATCH_SELECTED}
        className={cx(styles.common.swatchList, className)}
    >
        {colors.map((color) => (
            <AriaColorSwatchPickerItem
                key={color}
                color={color}
                // `--swatch-color` drives the selected outline so it always matches the swatch itself.
                style={{ "--swatch-color": color } as CSSProperties}
                className={({ isSelected, isFocusVisible }) =>
                    cx(
                        "cursor-pointer rounded-full outline-0",
                        styles.swatchSizes[size],
                        isSelected && "outline-2 outline-offset-2 outline-(--swatch-color)",
                        isFocusVisible && "outline-focus-ring outline-2 outline-offset-2",
                    )
                }
            >
                <AriaColorSwatch className={styles.common.swatch} />
            </AriaColorSwatchPickerItem>
        ))}
    </AriaColorSwatchPicker>
);

export interface ColorPickerSavedColorsProps extends ColorPickerSwatchesProps {
    /**
     * Section title shown above the grid.
     * @default "Saved"
     */
    title?: ReactNode;
    /**
     * Semantic token used for the section title.
     * @default "secondary"
     */
    titleColor?: keyof typeof styles.titleColors;
    /** When provided, renders an "Add" button that reports the color currently held by the picker. */
    onAdd?: (color: ColorValue) => void;
}

const ColorPickerSavedColorsAddButton = ({ onAdd }: { onAdd: (color: ColorValue) => void }) => {
    const state = useColorPicker();

    return (
        <Button size="xs" color="link-gray" iconLeading={Plus} onPress={() => onAdd(state.color)}>
            Add
        </Button>
    );
};

const ColorPickerSavedColors = ({
    title = "Saved",
    titleColor = "secondary",
    label = "Saved colors",
    onAdd,
    className,
    ...swatchProps
}: ColorPickerSavedColorsProps) => (
    <div className={cx("flex flex-col gap-3", className)}>
        <div className={styles.common.sectionHeader}>
            <p className={cx(styles.common.sectionTitle, styles.titleColors[titleColor])}>{title}</p>
            {onAdd && <ColorPickerSavedColorsAddButton onAdd={onAdd} />}
        </div>

        <ColorPickerSwatches {...swatchProps} label={label} />
    </div>
);

/* -------------------------------------------------------------------------------------------------
 * Palette
 * ----------------------------------------------------------------------------------------------- */

export interface ColorPickerPaletteProps {
    /**
     * The palette cells, laid out row-major.
     * @default the Tailwind CSS palette
     */
    colors?: string[];
    /**
     * How many cells per row.
     * @default 17
     */
    columns?: number;
    /**
     * Accessible name for the palette.
     * @default "Color palette"
     */
    label?: string;
    /** Called with the color the user picked. */
    onSelect?: (color: ColorValue) => void;
    className?: string;
}

const ColorPickerPalette = ({
    colors = TAILWIND_PALETTE,
    columns = TAILWIND_PALETTE_COLUMNS,
    label = "Color palette",
    onSelect,
    className,
}: ColorPickerPaletteProps) => (
    <AriaColorSwatchPicker
        aria-label={label}
        onChange={onSelect}
        style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
        className={cx("ring-alpha-black/10 grid overflow-clip rounded-lg ring-1 ring-inset", className)}
    >
        {colors.map((color) => (
            <AriaColorSwatchPickerItem
                key={color}
                color={color}
                className={({ isSelected, isFocusVisible }) =>
                    cx(
                        "relative aspect-square cursor-pointer",
                        isSelected && "outline-3 -outline-offset-3 outline-white",
                        isFocusVisible && "outline-focus-ring z-10 outline-2 -outline-offset-2",
                    )
                }
            >
                <AriaColorSwatch className="size-full" />
            </AriaColorSwatchPickerItem>
        ))}
    </AriaColorSwatchPicker>
);

/* -------------------------------------------------------------------------------------------------
 * Preview
 * ----------------------------------------------------------------------------------------------- */

export interface ColorPickerPreviewProps {
    className?: string;
}

/** Large block that previews the current color with its hex value written across it. */
const ColorPickerPreview = ({ className }: ColorPickerPreviewProps) => {
    const state = useColorPicker();

    return (
        <div
            className={cx("ring-alpha-black/10 flex h-32 w-full items-center justify-center rounded-xl ring-1 ring-inset", className)}
            style={{ background: state.color.toString("css") }}
        >
            <span className="flex items-center gap-1 text-lg font-semibold text-white">
                <span aria-hidden="true" className="opacity-50">
                    #
                </span>
                <span>{state.color.toString("hex").replace("#", "").toUpperCase()}</span>
            </span>
        </div>
    );
};

/* -------------------------------------------------------------------------------------------------
 * Compound export
 * ----------------------------------------------------------------------------------------------- */

export const ColorPicker = {
    Provider: ColorPickerProvider,
    Panel: ColorPickerPanel,
    Area: ColorPickerArea,
    HueSlider: ColorPickerHueSlider,
    AlphaSlider: ColorPickerAlphaSlider,
    EyeDropper: ColorPickerEyeDropper,
    ColorFormatSelect: ColorPickerColorFormatSelect,
    ColorValueInput: ColorPickerColorValueInput,
    Swatches: ColorPickerSwatches,
    SavedColors: ColorPickerSavedColors,
    Palette: ColorPickerPalette,
    Preview: ColorPickerPreview,
};
