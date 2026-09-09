/**
 * Pure canvas helpers for the image picker's live preview. Kept free of React so the
 * drawing logic (fill mode, rotation, tonal adjustments) can be unit tested and reasoned
 * about independently of the component tree.
 */

/** How the source image is fit into the (always square) preview canvas. */
export type FillMode = "fill" | "fit" | "crop" | "tile";

/** The seven tonal adjustment sliders, each ranging from -100 to 100 with 0 as neutral. */
export type AdjustmentKey = "exposure" | "contrast" | "saturation" | "temperature" | "tint" | "highlights" | "shadows";

export type Adjustments = Record<AdjustmentKey, number>;

export const ADJUSTMENT_KEYS: AdjustmentKey[] = ["exposure", "contrast", "saturation", "temperature", "tint", "highlights", "shadows"];

export const ADJUSTMENT_LABELS: Record<AdjustmentKey, string> = {
    exposure: "Exposure",
    contrast: "Contrast",
    saturation: "Saturation",
    temperature: "Temperature",
    tint: "Tint",
    highlights: "Highlights",
    shadows: "Shadows",
};

export const FILL_MODES: FillMode[] = ["fill", "fit", "crop", "tile"];

export const FILL_MODE_LABELS: Record<FillMode, string> = {
    fill: "Fill",
    fit: "Fit",
    crop: "Crop",
    tile: "Tile",
};

export const DEFAULT_ADJUSTMENTS: Adjustments = ADJUSTMENT_KEYS.reduce((acc, key) => {
    acc[key] = 0;
    return acc;
}, {} as Adjustments);

const clamp8 = (value: number) => (value < 0 ? 0 : value > 255 ? 255 : value);

const hasNonZeroAdjustment = (adjustments: Adjustments) => ADJUSTMENT_KEYS.some((key) => adjustments[key] !== 0);

/**
 * Draws `image` into `canvas` cropped/scaled/tiled per `fillMode`, rotated by `rotationDeg`
 * (a multiple of 90) around the canvas center, then applies the tonal `adjustments` as a
 * per-pixel pass. The canvas is always square, so rotating by 90/180/270 never changes the
 * available drawing box.
 */
export function renderImageToCanvas(
    canvas: HTMLCanvasElement,
    image: HTMLImageElement,
    fillMode: FillMode,
    rotationDeg: number,
    adjustments: Adjustments,
): void {
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const size = canvas.width;
    const imageWidth = image.naturalWidth || image.width;
    const imageHeight = image.naturalHeight || image.height;
    if (!imageWidth || !imageHeight) return;

    ctx.clearRect(0, 0, size, size);
    ctx.save();
    ctx.translate(size / 2, size / 2);
    ctx.rotate((rotationDeg * Math.PI) / 180);
    ctx.beginPath();
    ctx.rect(-size / 2, -size / 2, size, size);
    ctx.clip();
    drawWithFillMode(ctx, image, fillMode, -size / 2, -size / 2, size, size, imageWidth, imageHeight);
    ctx.restore();

    if (hasNonZeroAdjustment(adjustments)) {
        applyAdjustments(ctx, size, size, adjustments);
    }
}

function drawWithFillMode(
    ctx: CanvasRenderingContext2D,
    image: HTMLImageElement,
    fillMode: FillMode,
    x: number,
    y: number,
    boxW: number,
    boxH: number,
    imageW: number,
    imageH: number,
): void {
    switch (fillMode) {
        case "fill": {
            ctx.drawImage(image, x, y, boxW, boxH);
            return;
        }
        case "fit": {
            const scale = Math.min(boxW / imageW, boxH / imageH);
            const w = imageW * scale;
            const h = imageH * scale;
            ctx.drawImage(image, x + (boxW - w) / 2, y + (boxH - h) / 2, w, h);
            return;
        }
        case "crop": {
            const scale = Math.max(boxW / imageW, boxH / imageH);
            const w = imageW * scale;
            const h = imageH * scale;
            ctx.drawImage(image, x + (boxW - w) / 2, y + (boxH - h) / 2, w, h);
            return;
        }
        case "tile": {
            for (let tileY = y; tileY < y + boxH; tileY += imageH) {
                for (let tileX = x; tileX < x + boxW; tileX += imageW) {
                    ctx.drawImage(image, tileX, tileY, imageW, imageH);
                }
            }
            return;
        }
    }
}

/**
 * Applies exposure/contrast/saturation/temperature/tint/highlights/shadows as a single
 * per-pixel pass. This is a practical approximation of each adjustment (not a colorimetric
 * model) chosen to be cheap enough to run on every slider change.
 */
function applyAdjustments(ctx: CanvasRenderingContext2D, width: number, height: number, adjustments: Adjustments): void {
    const imageData = ctx.getImageData(0, 0, width, height);
    const data = imageData.data;

    const exposureOffset = (adjustments.exposure / 100) * 128;
    const contrastFactor = 1 + adjustments.contrast / 100;
    const saturationFactor = 1 + adjustments.saturation / 100;
    const temperatureShift = (adjustments.temperature / 100) * 40;
    const tintShift = (adjustments.tint / 100) * 40;

    for (let i = 0; i < data.length; i += 4) {
        let r = (data[i] ?? 0) + exposureOffset;
        let g = (data[i + 1] ?? 0) + exposureOffset;
        let b = (data[i + 2] ?? 0) + exposureOffset;

        // Contrast, pivoted around mid-gray.
        r = (r - 128) * contrastFactor + 128;
        g = (g - 128) * contrastFactor + 128;
        b = (b - 128) * contrastFactor + 128;

        // Saturation, blended against the pixel's luminance.
        const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
        r = luminance + (r - luminance) * saturationFactor;
        g = luminance + (g - luminance) * saturationFactor;
        b = luminance + (b - luminance) * saturationFactor;

        // Temperature (red/blue) and tint (green/magenta) color shifts.
        r += temperatureShift - tintShift / 2;
        g += tintShift;
        b += -temperatureShift - tintShift / 2;

        // Highlights and shadows, weighted by how bright/dark the pixel already is.
        const tone = 0.299 * r + 0.587 * g + 0.114 * b;
        if (adjustments.highlights !== 0 && tone > 128) {
            const delta = (adjustments.highlights / 100) * 60 * ((tone - 128) / 127);
            r += delta;
            g += delta;
            b += delta;
        }
        if (adjustments.shadows !== 0 && tone < 128) {
            const delta = (adjustments.shadows / 100) * 60 * ((128 - tone) / 128);
            r += delta;
            g += delta;
            b += delta;
        }

        data[i] = clamp8(r);
        data[i + 1] = clamp8(g);
        data[i + 2] = clamp8(b);
    }

    ctx.putImageData(imageData, 0, 0);
}
