"use client";

import { CheckCircle, Terminal } from "@properui/icons";
import { CodeSnippet } from "@properui/ui/components/application/code-snippet/code-snippet";
import { Button } from "@properui/ui/components/base/buttons/button";
import { FeaturedIcon } from "@properui/ui/components/foundations/featured-icon/featured-icon";
import { COMPOSABLE_VARIANTS, LLMS_TXT_URL, REGISTRY_ENTRIES, REGISTRY_URL } from "./content";

/**
 * "Your agent does not have to guess".
 *
 * Copied from `marketing/features-sections/features-alternating-layout-01`, the same single-row
 * reduction `landing-theming` uses: copy column, featured icon and check-list from that section,
 * with `application/code-snippet` in place of the screen mockup.
 *
 * Every command in the snippet is real and every URL resolves — they are the three surfaces an
 * assistant actually drives, in the order it would drive them.
 */

const code = [
    "# 1. the index of every page, as plain markdown",
    `curl ${LLMS_TXT_URL}`,
    "",
    "# 2. one component: its source, props and dependencies",
    `curl ${REGISTRY_URL}/buttons.json`,
    "",
    "# 3. write the files into the project",
    "npx @properui/cli@latest add buttons date-picker",
].join("\n");

const bullets = [
    `${REGISTRY_ENTRIES} registry entries, each carrying the component's real source and its dependency list, so an assistant fetches code rather than recalling it.`,
    "Every documentation page has a plain-markdown twin indexed at /llms.txt — your agent reads the same reference you do, without parsing a rendered page.",
    "The add command resolves the dependency chain, rewrites imports to your configured alias and installs missing npm packages, so what it generates compiles on the first run.",
    `${COMPOSABLE_VARIANTS} named section and page variants to compose a screen from, instead of inventing layout token by token.`,
];

export const LandingAgents = () => (
    <section aria-labelledby="for-agents" className="bg-primary overflow-hidden py-16 md:py-24">
        <div className="max-w-container mx-auto grid w-full grid-cols-1 gap-10 px-4 md:gap-16 md:px-8 lg:grid-cols-2 lg:gap-24">
            <div className="max-w-xl flex-1 self-center">
                <FeaturedIcon icon={Terminal} size="lg" color="brand" theme="light" />
                <h2 id="for-agents" className="text-display-xs text-primary md:text-display-sm mt-5 font-semibold">
                    Your agent does not have to guess
                </h2>
                <p className="text-md text-tertiary mt-2 md:mt-4 md:text-lg">
                    A model writing UI from memory invents class names, props and markup that look plausible and do not compile. Proper UI is readable by
                    machines on purpose: a JSON registry, a markdown mirror of every page, and a CLI that writes the files. Nothing here is specific to one
                    assistant — anything that can fetch a URL or run a shell command can use it.
                </p>
                <ul className="mt-8 flex flex-col gap-4 ps-2 md:gap-5 md:ps-4">
                    {bullets.map((bullet) => (
                        <li key={bullet} className="flex gap-3">
                            <CheckCircle aria-hidden="true" className="text-fg-brand-primary size-7 shrink-0" />
                            <span className="text-md text-tertiary pt-0.5 md:pt-0 md:text-lg">{bullet}</span>
                        </li>
                    ))}
                </ul>
                <Button size="xl" color="secondary" href="/docs/cli" className="mt-8">
                    Read the CLI reference
                </Button>
            </div>

            <div className="w-full min-w-0 flex-1 self-center">
                <CodeSnippet isFramed code={code} language="bash" aria-label="How an assistant uses Proper UI" />
            </div>
        </div>
    </section>
);
