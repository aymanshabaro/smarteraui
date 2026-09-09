import type { GradientPreset } from "./gradient-picker-utils";

/** The two-stop purple gradient the examples open on. */
export const DEFAULT_GRADIENT_STOPS = [
    { color: "#7F56D9", position: 0 },
    { color: "#432E73", position: 100 },
];

/** The nine presets shown under "Saved" in the gradient picker examples. */
export const SAVED_GRADIENTS: GradientPreset[] = [
    {
        id: "periwinkle-blush",
        angle: 180,
        stops: [
            { color: "#A5C0EE", position: 0 },
            { color: "#FBC5EC", position: 100 },
        ],
    },
    {
        id: "orchid-haze",
        angle: 180,
        stops: [
            { color: "#FBC2EB", position: 0 },
            { color: "#A18CD1", position: 100 },
        ],
    },
    {
        id: "cotton-candy",
        angle: 180,
        stops: [
            { color: "#FFD1FF", position: 0 },
            { color: "#FAD0C4", position: 100 },
        ],
    },
    {
        id: "peach-coral",
        angle: 225,
        stops: [
            { color: "#FAD0C4", position: 0 },
            { color: "#FF9A9E", position: 100 },
        ],
    },
    {
        id: "rose-salmon",
        angle: 180,
        stops: [
            { color: "#FECFEF", position: 0 },
            { color: "#FF989C", position: 100 },
        ],
    },
    {
        id: "sunset-lilac",
        angle: 135,
        stops: [
            { color: "#FAD0C4", position: 0 },
            { color: "#F1A7F1", position: 50 },
            { color: "#C4A0E8", position: 100 },
        ],
    },
    {
        id: "pale-mauve",
        angle: 180,
        stops: [
            { color: "#E6DEE9", position: 0 },
            { color: "#FDCAF1", position: 100 },
        ],
    },
    {
        id: "desert-dusk",
        angle: 135,
        stops: [
            { color: "#D4C1AD", position: 0 },
            { color: "#C7A4B6", position: 50 },
            { color: "#B0A0CB", position: 100 },
        ],
    },
    {
        id: "lavender-clay",
        angle: 0,
        stops: [
            { color: "#CFC7F8", position: 0 },
            { color: "#EBBBA7", position: 100 },
        ],
    },
];
