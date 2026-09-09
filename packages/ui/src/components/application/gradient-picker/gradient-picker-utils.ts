/** The gradient shapes offered by `GradientPicker.TypeSelect`. */
export type GradientType = "linear" | "radial" | "angular" | "diamond";

/** One color stop along the gradient line. */
export interface GradientStop {
    /** Stable identity, so a stop keeps its row while it is dragged past its neighbours. */
    id: string;
    /** CSS color string. */
    color: string;
    /** Position along the gradient line, 0–100. */
    position: number;
}

/** A stop without the generated id — the shape consumers pass in. */
export type GradientStopInput = Omit<GradientStop, "id"> & { id?: string };

/** A ready-made gradient offered by `GradientPicker.SavedGradients`. */
export interface GradientPreset {
    id: string;
    type?: GradientType;
    angle?: number;
    stops: Omit<GradientStop, "id">[];
}

/** Sorts a copy of the stops by ascending position. */
export const sortGradientStops = <T extends { position: number }>(stops: T[]): T[] => [...stops].sort((a, b) => a.position - b.position);

const toStopList = (stops: Pick<GradientStop, "color" | "position">[]) =>
    sortGradientStops(stops)
        .map((stop) => `${stop.color} ${stop.position}%`)
        .join(", ");

/**
 * Renders gradient stops as a value for the CSS `background` shorthand.
 *
 * `linear`, `radial` and `angular` map onto a single CSS gradient function. CSS has no diamond
 * gradient, so it is composed from four quadrant gradients that each run from the centre out to
 * their corner — which is what the L1 (diamond) metric looks like.
 */
export const toGradientCSS = (stops: Pick<GradientStop, "color" | "position">[], options: { type?: GradientType; angle?: number } = {}): string => {
    const { type = "linear", angle = 90 } = options;
    const list = toStopList(stops);

    switch (type) {
        case "radial":
            return `radial-gradient(circle at 50% 50%, ${list})`;
        case "angular":
            return `conic-gradient(from ${angle}deg at 50% 50%, ${list})`;
        case "diamond":
            return (
                [
                    ["to top left", "top left"],
                    ["to top right", "top right"],
                    ["to bottom left", "bottom left"],
                    ["to bottom right", "bottom right"],
                ] as const
            )
                .map(([direction, position]) => `linear-gradient(${direction}, ${list}) ${position} / 50% 50% no-repeat`)
                .join(", ");
        default:
            return `linear-gradient(${angle}deg, ${list})`;
    }
};

/** Clamps a number into an inclusive range. */
export const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

/** Normalises an angle into the 0–359 range. */
export const normalizeAngle = (angle: number) => ((angle % 360) + 360) % 360;

/**
 * Where the gradient line enters and leaves a square box, as percentages of that box.
 * CSS angles run clockwise from "to top", so 135° points at the bottom-right corner.
 */
export const getGradientEndpoints = (angle: number) => {
    const radians = (normalizeAngle(angle) * Math.PI) / 180;
    const dx = Math.sin(radians);
    // Screen coordinates grow downwards, so "up" is negative y.
    const dy = -Math.cos(radians);

    const scale = Math.min(dx === 0 ? Infinity : Math.abs(50 / dx), dy === 0 ? Infinity : Math.abs(50 / dy));

    return {
        start: { x: 50 - dx * scale, y: 50 - dy * scale },
        end: { x: 50 + dx * scale, y: 50 + dy * scale },
    };
};

/** The CSS angle whose end point lies at (x, y), given as percentages of a square box. */
export const getAngleFromPoint = (x: number, y: number) => normalizeAngle((Math.atan2(x - 50, 50 - y) * 180) / Math.PI);

const parseHexChannel = (hex: string, index: number) => parseInt(hex.slice(index, index + 2), 16);

/** Expands `#abc` / `#abcd` shorthand to the six or eight digit form. */
const expandHex = (hex: string) =>
    hex.length <= 5
        ? `#${hex
              .slice(1)
              .split("")
              .map((character) => character + character)
              .join("")}`
        : hex;

/**
 * The color the gradient shows at `position`, used when a click on the track inserts a stop.
 * Only hex stops are interpolated; anything else falls back to the nearest stop's color.
 */
export const getColorAtPosition = (stops: Pick<GradientStop, "color" | "position">[], position: number): string => {
    const sorted = sortGradientStops(stops);
    const first = sorted.at(0);
    const last = sorted.at(-1);

    if (!first || !last) return "#000000";

    const after = sorted.find((stop) => stop.position >= position);
    const before = [...sorted].reverse().find((stop) => stop.position <= position);

    if (!before) return first.color;
    if (!after) return last.color;
    if (before === after) return before.color;

    const start = expandHex(before.color);
    const end = expandHex(after.color);

    if (!/^#[0-9a-f]{6,8}$/i.test(start) || !/^#[0-9a-f]{6,8}$/i.test(end)) {
        return before.color;
    }

    const ratio = (position - before.position) / (after.position - before.position);
    const mix = (index: number) => Math.round(parseHexChannel(start, index) + (parseHexChannel(end, index) - parseHexChannel(start, index)) * ratio);

    return `#${[1, 3, 5]
        .map((index) => mix(index).toString(16).padStart(2, "0"))
        .join("")
        .toUpperCase()}`;
};
