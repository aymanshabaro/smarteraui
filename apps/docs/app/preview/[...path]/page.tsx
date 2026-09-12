import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { demos } from "~/lib/demos";
import { variants } from "~/lib/variants";

/**
 * Bare, chrome-less render of one example. Two shapes:
 *   /preview/<demoFile>/<Export>
 *   /preview/variant/<section>/<slug>/<variant>
 * Used by "Open in new tab", the screenshot scripts and `pnpm shots:thumbs`.
 *
 * Optional `?preset=<name>` (additive, default-off): wraps the rendered example in a div whose
 * inline style overrides the brand ramp and radius custom properties, so the landing page's
 * "consistency" section (Priority 5 of the improvement brief) can demonstrate one token change
 * propagating across several full-page examples at once. Unrecognised or absent `preset` values
 * render exactly as before.
 */

type Params = { params: Promise<{ path: string[] }>; searchParams: Promise<{ preset?: string | string[] }> };

export const metadata: Metadata = { robots: { index: false, follow: false } };

const resolve = (path: string[]) => {
    if (path[0] === "variant") {
        const [, section, slug, variant] = path;
        if (!section || !slug || !variant) return undefined;
        return (variants[slug] ?? []).find((entry) => entry.section === section && entry.variant === variant);
    }

    const [demoFile, exportName] = path;
    const component = demoFile && exportName ? demos[`${demoFile}:${exportName}`] : undefined;
    return component ? { component } : undefined;
};

type BrandRamp = Record<50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950, string>;

const rgb = (r: number, g: number, b: number) => `rgb(${r} ${g} ${b})`;

/**
 * Every custom property in `packages/ui/src/styles/theme.css`'s light theme that reads
 * `var(--color-brand-<n>)` (verified by grepping that file). Redeclaring only the primitive
 * `--color-brand-*` scale on a wrapper below `:root` would not be enough: a custom property's
 * `var()` references are resolved using the values cascaded at the element that declares that
 * property, and these are all declared once in the library's own `:root` block. Overriding the
 * derived names directly here, at the wrapper that actually surrounds the example, is what makes
 * the swap visible through the iframe.
 */
const brandDerived = (ramp: BrandRamp): Record<string, string> => ({
    "--color-utility-brand-50": ramp[50],
    "--color-utility-brand-50_alt": ramp[50],
    "--color-utility-brand-100": ramp[100],
    "--color-utility-brand-100_alt": ramp[100],
    "--color-utility-brand-200": ramp[200],
    "--color-utility-brand-200_alt": ramp[200],
    "--color-utility-brand-300": ramp[300],
    "--color-utility-brand-300_alt": ramp[300],
    "--color-utility-brand-400": ramp[400],
    "--color-utility-brand-400_alt": ramp[400],
    "--color-utility-brand-500": ramp[500],
    "--color-utility-brand-500_alt": ramp[500],
    "--color-utility-brand-600": ramp[600],
    "--color-utility-brand-600_alt": ramp[600],
    "--color-utility-brand-700": ramp[700],
    "--color-utility-brand-700_alt": ramp[700],
    "--color-utility-brand-800": ramp[800],
    "--color-utility-brand-800_alt": ramp[800],
    "--color-utility-brand-900": ramp[900],
    "--color-utility-brand-900_alt": ramp[900],
    "--color-text-brand-secondary": ramp[700],
    "--color-text-brand-tertiary": ramp[600],
    "--color-text-brand-primary": ramp[900],
    "--color-text-secondary_on-brand": ramp[200],
    "--color-text-tertiary_on-brand": ramp[200],
    "--color-text-quaternary_on-brand": ramp[300],
    "--color-text-brand-tertiary_alt": ramp[600],
    "--color-text-brand-secondary_hover": ramp[800],
    "--color-border-brand": ramp[500],
    "--color-border-brand_alt": ramp[600],
    "--color-fg-brand-secondary": ramp[500],
    "--color-fg-brand-primary": ramp[600],
    "--color-fg-brand-secondary_hover": ramp[600],
    "--color-bg-brand-primary": ramp[50],
    "--color-bg-brand-solid": ramp[600],
    "--color-bg-brand-solid_hover": ramp[700],
    "--color-bg-brand-secondary": ramp[100],
    "--color-bg-brand-primary_alt": ramp[50],
    "--color-bg-brand-section": ramp[800],
    "--color-bg-brand-section_subtle": ramp[700],
    "--color-featured-icon-light-fg-brand": ramp[600],
    "--color-focus-ring": ramp[500],
    "--color-footer-button-fg": ramp[200],
    "--color-icon-fg-brand": ramp[600],
    "--color-icon-fg-brand_on-brand": ramp[200],
    "--color-slider-handle-border": ramp[600],
    // Tailwind utilities don't read the semantic names above directly — this file also declares a
    // second, per-utility-category alias layer (`--background-color-*`, `--text-color-*`,
    // `--border-color-*`, `--ring-color-*`, `--outline-color-*`, `--text-decoration-color-*`) that
    // `bg-*`, `text-*`, `border-*`, `ring-*`, `outline-*` and `decoration-*` utilities actually
    // consume (e.g. `.ring-brand { --tw-ring-color: var(--ring-color-brand); }`). Missing this layer
    // was caught live in the dev server: radius updated but ring/border/background colours on
    // components using these utilities (verified on `dashboard-04`'s highlighted metric card) did
    // not, because `--ring-color-brand` was still only declared once, at `:root`, pointing at the
    // *original* `--color-border-brand`.
    "--background-color-brand-primary": ramp[50],
    "--background-color-brand-solid": ramp[600],
    "--background-color-brand-solid_hover": ramp[700],
    "--background-color-brand-secondary": ramp[100],
    "--background-color-brand-primary_alt": ramp[50],
    "--background-color-brand-section": ramp[800],
    "--background-color-brand-section_subtle": ramp[700],
    "--background-color-border-brand": ramp[500],
    "--background-color-border-brand_alt": ramp[600],
    "--text-color-brand-secondary": ramp[700],
    "--text-color-brand-tertiary": ramp[600],
    "--text-color-brand-primary": ramp[900],
    "--text-color-secondary_on-brand": ramp[200],
    "--text-color-tertiary_on-brand": ramp[200],
    "--text-color-quaternary_on-brand": ramp[300],
    "--text-color-brand-tertiary_alt": ramp[600],
    "--text-color-brand-secondary_hover": ramp[800],
    "--border-color-brand": ramp[500],
    "--border-color-brand_alt": ramp[600],
    "--border-color-brand-solid": ramp[600],
    "--border-color-brand-solid_hover": ramp[700],
    "--ring-color-brand": ramp[500],
    "--ring-color-brand_alt": ramp[600],
    "--ring-color-brand-solid": ramp[600],
    "--ring-color-brand-solid_hover": ramp[700],
    "--outline-color-brand": ramp[500],
    "--outline-color-brand_alt": ramp[600],
    "--outline-color-brand-solid": ramp[600],
    "--outline-color-brand-solid_hover": ramp[700],
    "--text-decoration-color-brand": ramp[500],
    "--text-decoration-color-brand_alt": ramp[600],
    "--text-decoration-color-brand-primary": ramp[900],
    "--text-decoration-color-brand-secondary": ramp[700],
    "--text-decoration-color-brand-tertiary": ramp[600],
});

const TEAL_RAMP: BrandRamp = {
    50: rgb(240, 253, 250),
    100: rgb(204, 251, 241),
    200: rgb(153, 246, 228),
    300: rgb(94, 234, 212),
    400: rgb(45, 212, 191),
    500: rgb(20, 184, 166),
    600: rgb(13, 148, 136),
    700: rgb(15, 118, 110),
    800: rgb(17, 94, 89),
    900: rgb(19, 78, 74),
    950: rgb(4, 47, 46),
};

/** Two curated presets (brief Priority 5): the shipped default, and a teal scale with a visibly tighter radius scale. */
const PRESETS: Record<string, CSSProperties> = {
    teal: {
        "--color-brand-50": TEAL_RAMP[50],
        "--color-brand-100": TEAL_RAMP[100],
        "--color-brand-200": TEAL_RAMP[200],
        "--color-brand-300": TEAL_RAMP[300],
        "--color-brand-400": TEAL_RAMP[400],
        "--color-brand-500": TEAL_RAMP[500],
        "--color-brand-600": TEAL_RAMP[600],
        "--color-brand-700": TEAL_RAMP[700],
        "--color-brand-800": TEAL_RAMP[800],
        "--color-brand-900": TEAL_RAMP[900],
        "--color-brand-950": TEAL_RAMP[950],
        ...brandDerived(TEAL_RAMP),
        "--radius-xs": "0px",
        "--radius-sm": "2px",
        "--radius-md": "4px",
        "--radius-lg": "6px",
        "--radius-xl": "8px",
        "--radius-2xl": "10px",
        "--radius-3xl": "12px",
        "--radius-4xl": "14px",
    } as CSSProperties,
};

export default async function PreviewPage({ params, searchParams }: Params) {
    const { path } = await params;
    const { preset: presetParam } = await searchParams;
    const match = resolve(path);
    if (!match) notFound();

    const Component = match.component;
    const preset = typeof presetParam === "string" ? PRESETS[presetParam] : undefined;

    return (
        <div className="bg-primary flex min-h-screen w-full flex-col items-center justify-center" style={preset}>
            <Component />
        </div>
    );
}
