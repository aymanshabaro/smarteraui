/**
 * Placeholder demo assets module.
 * Import demo assets only from this module, never by raw paths.
 * Regenerate with `pnpm gen:demo-assets`.
 */

/** Image source and alt text for demo purposes. */
export interface DemoImage {
    src: string;
    alt: string;
}

/** Avatar with name, initials, email, and username. */
export interface DemoAvatar extends DemoImage {
    name: string;
    initials: string;
    email: string;
    username: string;
}

/** Logo with name. */
export interface DemoLogo extends DemoImage {
    name: string;
}

/**
 * 12 placeholder portraits served from /demo/avatars (docs app public dir).
 */
export const AVATARS = [
    { src: "/demo/avatars/avatar-01.svg", alt: "Olivia Rhye", name: "Olivia Rhye", initials: "OR", email: "olivia@smartera.com", username: "@olivia" },
    { src: "/demo/avatars/avatar-02.svg", alt: "Phoenix Baker", name: "Phoenix Baker", initials: "PB", email: "phoenix@smartera.com", username: "@phoenix" },
    { src: "/demo/avatars/avatar-03.svg", alt: "Lana Steiner", name: "Lana Steiner", initials: "LS", email: "lana@smartera.com", username: "@lana" },
    { src: "/demo/avatars/avatar-04.svg", alt: "Demi Wilkinson", name: "Demi Wilkinson", initials: "DW", email: "demi@smartera.com", username: "@demi" },
    { src: "/demo/avatars/avatar-05.svg", alt: "Candice Wu", name: "Candice Wu", initials: "CW", email: "candice@smartera.com", username: "@candice" },
    { src: "/demo/avatars/avatar-06.svg", alt: "Natali Craig", name: "Natali Craig", initials: "NC", email: "natali@smartera.com", username: "@natali" },
    { src: "/demo/avatars/avatar-07.svg", alt: "Drew Cano", name: "Drew Cano", initials: "DC", email: "drew@smartera.com", username: "@drew" },
    { src: "/demo/avatars/avatar-08.svg", alt: "Orlando Diggs", name: "Orlando Diggs", initials: "OD", email: "orlando@smartera.com", username: "@orlando" },
    { src: "/demo/avatars/avatar-09.svg", alt: "Andi Lane", name: "Andi Lane", initials: "AL", email: "andi@smartera.com", username: "@andi" },
    { src: "/demo/avatars/avatar-10.svg", alt: "Kate Morrison", name: "Kate Morrison", initials: "KM", email: "kate@smartera.com", username: "@kate" },
    { src: "/demo/avatars/avatar-11.svg", alt: "Koray Okumus", name: "Koray Okumus", initials: "KO", email: "koray@smartera.com", username: "@koray" },
    { src: "/demo/avatars/avatar-12.svg", alt: "Ava Wright", name: "Ava Wright", initials: "AW", email: "ava@smartera.com", username: "@ava" },
] as const;

/**
 * Cycles through AVATARS for any index (i mod 12).
 */
export function avatar(i: number): DemoAvatar {
    return AVATARS[i % AVATARS.length] as DemoAvatar;
}

/**
 * Fully transparent avatar, for "no photo" states.
 */
export const AVATAR_TRANSPARENT: DemoImage = { src: "/demo/avatar-transparent.svg", alt: "No avatar" };

/**
 * Placeholder landscape and square images.
 */
export const IMAGES = {
    landscape: [
        { src: "/demo/landscape/landscape-01.svg", alt: "Placeholder landscape 1" },
        { src: "/demo/landscape/landscape-02.svg", alt: "Placeholder landscape 2" },
        { src: "/demo/landscape/landscape-03.svg", alt: "Placeholder landscape 3" },
        { src: "/demo/landscape/landscape-04.svg", alt: "Placeholder landscape 4" },
        { src: "/demo/landscape/landscape-05.svg", alt: "Placeholder landscape 5" },
        { src: "/demo/landscape/landscape-06.svg", alt: "Placeholder landscape 6" },
        { src: "/demo/landscape/landscape-07.svg", alt: "Placeholder landscape 7" },
        { src: "/demo/landscape/landscape-08.svg", alt: "Placeholder landscape 8" },
    ] as const,
    square: [
        { src: "/demo/square/square-01.svg", alt: "Placeholder square 1" },
        { src: "/demo/square/square-02.svg", alt: "Placeholder square 2" },
        { src: "/demo/square/square-03.svg", alt: "Placeholder square 3" },
        { src: "/demo/square/square-04.svg", alt: "Placeholder square 4" },
    ] as const,
} as const;

/**
 * 6 placeholder logo wordmarks.
 */
export const LOGOS = [
    { src: "/demo/logos/logo-01.svg", alt: "Layers", name: "Layers" },
    { src: "/demo/logos/logo-02.svg", alt: "Sisyphus", name: "Sisyphus" },
    { src: "/demo/logos/logo-03.svg", alt: "Circooles", name: "Circooles" },
    { src: "/demo/logos/logo-04.svg", alt: "Catalog", name: "Catalog" },
    { src: "/demo/logos/logo-05.svg", alt: "Quotient", name: "Quotient" },
    { src: "/demo/logos/logo-06.svg", alt: "Hourglass", name: "Hourglass" },
] as const;

/**
 * Placeholder video poster image.
 */
export const VIDEO_POSTER: DemoImage = { src: "/demo/video-poster.svg", alt: "Video placeholder" };

/**
 * Placeholder video source (local path to sample video).
 */
export const VIDEO_SRC = "/demo/video-sample.mp4";
