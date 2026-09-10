/**
 * Every fact the landing page states, in one place.
 *
 * The counts are measured, not marketing. Re-derive them after `pnpm registry:build`:
 *
 *   node -e "const r=require('./packages/registry/dist/index.json').components;
 *     const n=(l,t)=>r.filter(c=>c.layer===l&&c.type===t).length;
 *     console.log({
 *       groups: n('base','component')+n('application','component')+n('marketing','component'),
 *       sections: n('marketing','example'),
 *       pages: n('marketing-examples','example')+n('app-examples','example'),
 *     })"
 *
 *   node -e "console.log(require('./packages/registry/dist/index.json').components.length)"  # registry entries
 *
 *   find packages/ui/src/components -name '*.test.tsx' | wc -l   # test suites
 *   grep -rl toHaveNoViolations packages/ui/src/components | wc -l  # …all of which run axe
 */

/** Canonical origin. The registry and `/llms.txt` below are the URLs an agent is pointed at. */
export const SITE_ORIGIN = "https://smarteraui.com";

/** Where the CLI resolves components from by default, and what an agent can fetch directly. */
export const REGISTRY_URL = `${SITE_ORIGIN}/r`;

/** The index an LLM crawls to find the plain-markdown twin of every documentation page. */
export const LLMS_TXT_URL = `${SITE_ORIGIN}/llms.txt`;

/** Every entry in `packages/registry/dist/index.json` — components, examples, hooks, utils and styles. */
export const REGISTRY_ENTRIES = 797;

/** Public repository. Deliberately local to the landing page: `~/lib/site` still points at the docs org. */
export const REPO_URL = "https://github.com/aymanshabaro/smarteraui";

/** The npm package the install snippet adds. */
export const PACKAGE_NAME = "@smarteraui/ui";

export const INSTALL_COMMAND = `npm i ${PACKAGE_NAME}`;

/** Component groups per layer — one folder in `packages/ui/src/components/<layer>`, one registry `component` entry. */
export const LAYER_COUNTS = { base: 19, application: 32, marketing: 18 } as const;

/** Component groups across the three published layers (19 + 32 + 18). */
export const COMPONENT_GROUPS = LAYER_COUNTS.base + LAYER_COUNTS.application + LAYER_COUNTS.marketing;

/** Registry `example` entries in the `marketing` layer — the section variants. */
export const SECTION_VARIANTS = 446;

/** Registry `example` entries in the `marketing-examples` layer — complete marketing pages. */
export const MARKETING_PAGE_EXAMPLES = 105;

/** Registry `example` entries in the `app-examples` layer — dashboards, settings and auth pages. */
export const APP_PAGE_EXAMPLES = 128;

/** Every full page example, across both layers. */
export const PAGE_EXAMPLES = MARKETING_PAGE_EXAMPLES + APP_PAGE_EXAMPLES;

/** Vitest suites under `packages/ui/src/components`; every one of them asserts zero axe violations. */
export const TEST_SUITES = 118;

/** Section variants and full page examples together — everything an agent can compose a screen from. */
export const COMPOSABLE_VARIANTS = SECTION_VARIANTS + PAGE_EXAMPLES;
