"use client";

import type { ReactNode, RefObject } from "react";
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import type { DropEvent, DropItem, FileDropItem } from "@react-types/shared";
import type { Key as AriaKey, Selection as AriaSelection, SliderProps as AriaSliderProps } from "react-aria-components";
import {
    DropZone as AriaDropZone,
    FileTrigger as AriaFileTrigger,
    Slider as AriaSlider,
    SliderThumb as AriaSliderThumb,
    SliderTrack as AriaSliderTrack,
} from "react-aria-components";
import { ChevronDown, RefreshCw01, UploadCloud02 } from "@smarteraui/icons";
import { Button } from "@/components/base/buttons/button";
import { ButtonUtility } from "@/components/base/buttons/button-utility";
import { Dropdown } from "@/components/base/dropdown/dropdown";
import { cx } from "@/utils/cx";
import type { AdjustmentKey, Adjustments, FillMode } from "./image-picker-canvas";
import { ADJUSTMENT_KEYS, ADJUSTMENT_LABELS, DEFAULT_ADJUSTMENTS, FILL_MODES, FILL_MODE_LABELS, renderImageToCanvas } from "./image-picker-canvas";

/** The backing resolution the preview canvas is rendered at (scaled down by CSS to fit the layout). */
const CANVAS_SIZE = 640;

interface ImagePickerContextValue {
    /** Object URL for the currently selected image, or `null` when nothing has been picked. */
    imageUrl: string | null;
    /** Replaces the current image (or clears it, when passed `null`). */
    setImageFile: (file: File | null) => void;
    fillMode: FillMode;
    setFillMode: (mode: FillMode) => void;
    /** Current rotation in degrees, always a multiple of 90. */
    rotation: number;
    /** Rotates the image 90 degrees clockwise. */
    rotate: () => void;
    adjustments: Adjustments;
    setAdjustment: (key: AdjustmentKey, value: number) => void;
    resetAdjustments: () => void;
    canvasRef: RefObject<HTMLCanvasElement | null>;
    isDisabled?: boolean;
}

const ImagePickerContext = createContext<ImagePickerContextValue | null>(null);

const useImagePickerContext = () => {
    const context = useContext(ImagePickerContext);
    if (!context) {
        throw new Error("ImagePicker sub-components must be rendered within an <ImagePicker.Provider>.");
    }
    return context;
};

const isFileDropItem = (item: DropItem): item is FileDropItem => item.kind === "file";

export interface ImagePickerProviderProps {
    children: ReactNode;
    /** Called with the selected image file whenever the user uploads or drops a new image, or clears it. */
    onImageChange?: (file: File | null) => void;
    /** Disables uploading, dropping and adjusting the image. */
    isDisabled?: boolean;
    /** The fill mode selected by default. @default "fill" */
    defaultFillMode?: FillMode;
}

/**
 * Holds the selected image, fill mode, rotation and tonal adjustments shared by every
 * `ImagePicker` sub-component. Sub-components can be composed independently as long as
 * they're rendered inside this provider.
 */
const ImagePickerProvider = ({ children, onImageChange, isDisabled, defaultFillMode = "fill" }: ImagePickerProviderProps) => {
    const [imageFile, setImageFileState] = useState<File | null>(null);
    const [fillMode, setFillMode] = useState<FillMode>(defaultFillMode);
    const [rotation, setRotation] = useState(0);
    const [adjustments, setAdjustments] = useState<Adjustments>(DEFAULT_ADJUSTMENTS);

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const imageElementRef = useRef<HTMLImageElement | null>(null);

    const setImageFile = useCallback(
        (file: File | null) => {
            setImageFileState(file);
            setRotation(0);
            setAdjustments(DEFAULT_ADJUSTMENTS);
            onImageChange?.(file);
        },
        [onImageChange],
    );

    // Derive the object URL from the selected file. Revoking is a side effect with no
    // corresponding state update, so it belongs in a cleanup-only effect rather than
    // triggering a re-render.
    const imageUrl = useMemo(() => (imageFile ? URL.createObjectURL(imageFile) : null), [imageFile]);

    useEffect(() => {
        return () => {
            if (imageUrl) URL.revokeObjectURL(imageUrl);
        };
    }, [imageUrl]);

    // Load the bitmap once per URL, then redraw whenever the URL, fill mode, rotation or
    // adjustments change.
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas || !imageUrl) return;

        let cancelled = false;
        const cached = imageElementRef.current;
        const image = cached && cached.src === imageUrl ? cached : new Image();

        const draw = () => {
            if (cancelled) return;
            imageElementRef.current = image;
            renderImageToCanvas(canvas, image, fillMode, rotation, adjustments);
        };

        if (image.complete && image.src === imageUrl) {
            draw();
        } else {
            image.onload = draw;
            image.src = imageUrl;
        }

        return () => {
            cancelled = true;
        };
    }, [imageUrl, fillMode, rotation, adjustments]);

    const rotate = useCallback(() => setRotation((previous) => (previous + 90) % 360), []);

    const setAdjustment = useCallback((key: AdjustmentKey, value: number) => {
        setAdjustments((previous) => ({ ...previous, [key]: value }));
    }, []);

    const resetAdjustments = useCallback(() => setAdjustments(DEFAULT_ADJUSTMENTS), []);

    const value = useMemo<ImagePickerContextValue>(
        () => ({ imageUrl, setImageFile, fillMode, setFillMode, rotation, rotate, adjustments, setAdjustment, resetAdjustments, canvasRef, isDisabled }),
        [imageUrl, setImageFile, fillMode, rotation, rotate, adjustments, setAdjustment, resetAdjustments, isDisabled],
    );

    return <ImagePickerContext.Provider value={value}>{children}</ImagePickerContext.Provider>;
};

export interface ImagePickerDropZoneProps {
    className?: string;
    /** Text shown under the upload button. @default "or drag and drop" */
    hint?: string;
    /** Label of the upload button. @default "Click to upload" */
    uploadLabel?: string;
}

/**
 * The square preview: renders the current image on a canvas (or a checkered "no image"
 * background), and lets the user replace it by clicking or dragging a new file onto it.
 */
const ImagePickerDropZone = ({ className, hint = "or drag and drop", uploadLabel = "Click to upload" }: ImagePickerDropZoneProps) => {
    const { imageUrl, setImageFile, canvasRef, isDisabled } = useImagePickerContext();

    const handleDrop = async (event: DropEvent) => {
        if (isDisabled) return;

        const fileItem = event.items.find(isFileDropItem);
        if (!fileItem) return;

        const file = await fileItem.getFile();
        if (!file.type.startsWith("image/")) return;

        setImageFile(file);
    };

    return (
        <AriaDropZone
            aria-label="Drop image to upload"
            isDisabled={isDisabled}
            onDrop={handleDrop}
            className={cx(
                "relative flex aspect-square w-full flex-col items-center justify-center overflow-hidden rounded-lg border-[0.5px] border-black/10 outline-hidden",
                isDisabled ? "cursor-not-allowed opacity-50" : "cursor-pointer",
                className,
            )}
        >
            <div
                aria-hidden="true"
                className="absolute inset-0 rounded-lg opacity-15"
                style={{ backgroundImage: "repeating-conic-gradient(#ccc 0% 25%, white 0% 50%)", backgroundSize: "32px 32px" }}
            />
            <div aria-hidden="true" className="absolute inset-0 rounded-lg bg-black/40" />
            <canvas ref={canvasRef} width={CANVAS_SIZE} height={CANVAS_SIZE} className={cx("absolute inset-0 size-full rounded-lg", !imageUrl && "hidden")} />

            <div className="relative flex flex-col items-center gap-2">
                <AriaFileTrigger
                    acceptedFileTypes={["image/*"]}
                    onSelect={(files) => {
                        const file = files?.[0];
                        if (file) setImageFile(file);
                    }}
                >
                    <Button
                        color="secondary"
                        size="sm"
                        iconLeading={UploadCloud02}
                        isDisabled={isDisabled}
                        className="outline-secondary_alt outline-1 outline-offset-0"
                    >
                        {uploadLabel}
                    </Button>
                </AriaFileTrigger>
                <p className="text-sm font-semibold text-white">{hint}</p>
            </div>
        </AriaDropZone>
    );
};

/**
 * A dropdown that lets the user pick between the four supported fill modes: fill, fit, crop
 * and tile. Can be used on its own within an `ImagePicker.Provider`.
 */
const ImagePickerFillModeSelect = () => {
    const { fillMode, setFillMode, isDisabled } = useImagePickerContext();

    const handleSelectionChange = (keys: AriaSelection) => {
        if (keys === "all") return;
        const [key] = Array.from(keys as Set<AriaKey>);
        if (typeof key === "string") setFillMode(key as FillMode);
    };

    return (
        <Dropdown.Root>
            <Button
                color="link-gray"
                size="xs"
                isDisabled={isDisabled}
                iconTrailing={<ChevronDown data-icon="trailing" aria-hidden="true" className="size-3! stroke-[2.5px]!" />}
            >
                {FILL_MODE_LABELS[fillMode]}
            </Button>

            <Dropdown.Popover className="w-36">
                <Dropdown.Menu selectionMode="single" selectedKeys={[fillMode]} onSelectionChange={handleSelectionChange} disallowEmptySelection>
                    {FILL_MODES.map((mode) => (
                        <Dropdown.Item key={mode} id={mode}>
                            {FILL_MODE_LABELS[mode]}
                        </Dropdown.Item>
                    ))}
                </Dropdown.Menu>
            </Dropdown.Popover>
        </Dropdown.Root>
    );
};

/** Rotates the image 90 degrees clockwise on each click. */
const ImagePickerRotateButton = () => {
    const { rotate, isDisabled } = useImagePickerContext();

    return <ButtonUtility color="tertiary" size="sm" icon={RefreshCw01} tooltip="Rotate image" onClick={rotate} isDisabled={isDisabled} />;
};

interface ImagePickerAdjustmentSliderProps extends Pick<AriaSliderProps<number>, "minValue" | "maxValue" | "step"> {
    label: string;
    value: number;
    onChange: (value: number) => void;
    isDisabled?: boolean;
}

const ImagePickerAdjustmentSlider = ({ label, value, onChange, isDisabled, minValue = -100, maxValue = 100, step = 1 }: ImagePickerAdjustmentSliderProps) => (
    <AriaSlider
        aria-label={label}
        value={value}
        onChange={onChange}
        minValue={minValue}
        maxValue={maxValue}
        step={step}
        isDisabled={isDisabled}
        className="flex items-center gap-3"
    >
        <span className="text-secondary w-[88px] shrink-0 text-sm font-semibold">{label}</span>
        <AriaSliderTrack className="border-primary bg-tertiary relative h-3 flex-1 cursor-pointer rounded-full border data-disabled:cursor-not-allowed">
            <AriaSliderThumb
                className={({ isDisabled: thumbDisabled, isFocusVisible, isDragging }) =>
                    cx(
                        "bg-fg-white ring-secondary_alt top-1/2 size-4 rounded-full shadow-md ring",
                        thumbDisabled ? "cursor-not-allowed" : isDragging ? "cursor-grabbing" : "cursor-grab",
                        isFocusVisible && "outline-focus-ring outline-2 outline-offset-2",
                    )
                }
            />
        </AriaSliderTrack>
    </AriaSlider>
);

export interface ImagePickerAdjustmentSlidersProps {
    className?: string;
}

/**
 * The seven tonal sliders (exposure, contrast, saturation, temperature, tint, highlights,
 * shadows). Can be used on its own within an `ImagePicker.Provider`.
 */
const ImagePickerAdjustmentSliders = ({ className }: ImagePickerAdjustmentSlidersProps) => {
    const { adjustments, setAdjustment, isDisabled } = useImagePickerContext();

    return (
        <div className={cx("flex flex-col gap-4", className)}>
            {ADJUSTMENT_KEYS.map((key) => (
                <ImagePickerAdjustmentSlider
                    key={key}
                    label={ADJUSTMENT_LABELS[key]}
                    value={adjustments[key]}
                    isDisabled={isDisabled}
                    onChange={(value) => setAdjustment(key, value)}
                />
            ))}
        </div>
    );
};

export const ImagePicker = {
    Provider: ImagePickerProvider,
    DropZone: ImagePickerDropZone,
    FillModeSelect: ImagePickerFillModeSelect,
    RotateButton: ImagePickerRotateButton,
    AdjustmentSliders: ImagePickerAdjustmentSliders,
};

export type { Adjustments, AdjustmentKey, FillMode } from "./image-picker-canvas";
