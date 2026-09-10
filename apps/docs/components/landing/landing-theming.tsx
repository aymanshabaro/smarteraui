"use client";

import { CheckCircle, Palette } from "@properui/icons";
import { type CodeLine, CodeSnippet } from "@properui/ui/components/application/code-snippet/code-snippet";
import { Button } from "@properui/ui/components/base/buttons/button";
import { FeaturedIcon } from "@properui/ui/components/foundations/featured-icon/featured-icon";

/**
 * "Re-brand in one file".
 *
 * Copied from `marketing/features-sections/features-alternating-layout-01`, reduced to a single
 * row: the copy column, featured icon and check-list are that section's, and the screen mockup
 * it pairs them with is replaced by `application/code-snippet` — the file itself is the visual.
 */

/** The eleven brand steps, verbatim from `packages/ui/src/styles/theme.css` (lines 109–119). */
const BRAND_SCALE: [step: string, value: string][] = [
    ["50", "rgb(249 245 255)"],
    ["100", "rgb(244 235 255)"],
    ["200", "rgb(233 215 254)"],
    ["300", "rgb(214 187 251)"],
    ["400", "rgb(182 146 246)"],
    ["500", "rgb(158 119 237)"],
    ["600", "rgb(127 86 217)"],
    ["700", "rgb(105 65 198)"],
    ["800", "rgb(83 56 158)"],
    ["900", "rgb(66 48 125)"],
    ["950", "rgb(44 28 95)"],
];

const HEADER = "/* packages/ui/src/styles/theme.css */";

const code = [`${HEADER}\n@theme {`, ...BRAND_SCALE.map(([step, value]) => `    --color-brand-${step}: ${value};`), "}"].join("\n");

/**
 * Pre-tokenised so the custom properties and their values read apart. The built-in tokeniser
 * has no CSS grammar, and `plaintext` would flatten the whole block to one colour.
 */
const lines: CodeLine[] = [
    [{ type: "comment", content: HEADER }],
    [
        { type: "keyword", content: "@theme" },
        { type: "plain", content: " {" },
    ],
    ...BRAND_SCALE.map(([step, value]): CodeLine => [
        { type: "plain", content: "    " },
        { type: "constant", content: `--color-brand-${step}` },
        { type: "plain", content: ": " },
        { type: "function", content: value },
        { type: "plain", content: ";" },
    ]),
    [{ type: "plain", content: "}" }],
];

const bullets = [
    "Buttons, links, focus rings, badges, charts and every brand surface follow the scale.",
    "Light and dark mode both derive from it — there is no second palette to keep in step.",
    "Nothing else in the library hard-codes a colour, so no component needs a patch.",
];

export const LandingTheming = () => (
    <section aria-labelledby="rebrand" className="bg-secondary overflow-hidden py-16 md:py-24">
        <div className="max-w-container mx-auto grid w-full grid-cols-1 gap-10 px-4 md:gap-16 md:px-8 lg:grid-cols-2 lg:gap-24">
            <div className="max-w-xl flex-1 self-center">
                <FeaturedIcon icon={Palette} size="lg" color="brand" theme="light" />
                <h2 id="rebrand" className="text-display-xs text-primary md:text-display-sm mt-5 font-semibold">
                    Re-brand the whole system in one file
                </h2>
                <p className="text-md text-tertiary mt-2 md:mt-4 md:text-lg">
                    Proper UI ships one brand ramp of eleven steps. Change those eleven values in <code className="font-mono text-sm">theme.css</code> and every
                    component in the library follows — because components only ever name semantic tokens, never a palette class.
                </p>
                <ul className="mt-8 flex flex-col gap-4 ps-2 md:gap-5 md:ps-4">
                    {bullets.map((bullet) => (
                        <li key={bullet} className="flex gap-3">
                            <CheckCircle aria-hidden="true" className="text-fg-brand-primary size-7 shrink-0" />
                            <span className="text-md text-tertiary pt-0.5 md:pt-0 md:text-lg">{bullet}</span>
                        </li>
                    ))}
                </ul>
                <Button size="xl" color="secondary" href="/docs/theming" className="mt-8">
                    Read the theming guide
                </Button>
            </div>

            <div className="w-full min-w-0 flex-1 self-center">
                <CodeSnippet isFramed showLineNumbers code={code} lines={lines} aria-label="Brand colour tokens in theme.css" />
            </div>
        </div>
    </section>
);
