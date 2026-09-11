/**
 * Step-by-step setup guide content for the four agent platform cards, ported verbatim from the
 * supplied `script.js`'s `setupGuides` object. Copy is intentionally unchanged.
 */

export type GuideKey = "claude" | "codex" | "cursor" | "lovable";

export type SetupGuide = {
    name: string;
    logo: string;
    title: string;
    intro: string;
    copyLabel: string;
    copyValue: string;
    steps: Array<{ title: string; description: string }>;
};

export const SETUP_GUIDES: Record<GuideKey, SetupGuide> = {
    claude: {
        name: "Claude Code",
        logo: "/claude.svg",
        title: "Teach Claude Code to use Proper UI",
        intro: "Run this once from the root of your project. Claude then loads the Proper UI skill automatically whenever UI work comes up.",
        copyLabel: "Run in your project terminal",
        copyValue: "npx @properui/cli@latest agent init --client claude",
        steps: [
            { title: "Open the project terminal", description: "Go to the root of the React, Next.js or Vite project Claude Code will edit." },
            {
                title: "Install the project skill",
                description:
                    "The CLI writes .claude/skills/properui/SKILL.md and adds a small pointer to CLAUDE.md without replacing your existing instructions.",
            },
            {
                title: "Describe the screen",
                description: "Claude inspects the project, searches Proper UI, installs matching components and verifies the result.",
            },
        ],
    },
    codex: {
        name: "Codex",
        logo: "/codex.svg",
        title: "Teach Codex to use Proper UI",
        intro: "Run this once from the root of your project. Codex receives both the portable skill and repository-level rules.",
        copyLabel: "Run in your project terminal",
        copyValue: "npx @properui/cli@latest agent init --client codex",
        steps: [
            { title: "Open the project terminal", description: "Go to the repository Codex will work inside." },
            {
                title: "Install the skill and rules",
                description: "The CLI writes .agents/skills/properui/SKILL.md and appends a marked Proper UI block to AGENTS.md without overwriting it.",
            },
            {
                title: "Ask Codex for the page",
                description: "Codex runs info --json, searches for the best primitive or full-page example, adds it and checks the build.",
            },
        ],
    },
    cursor: {
        name: "Cursor",
        logo: "/cursor.svg",
        title: "Teach Cursor Agent to use Proper UI",
        intro: "Run this once from the project root. Cursor gets an always-on rule in the exact format its Agent mode reads.",
        copyLabel: "Run in your project terminal",
        copyValue: "npx @properui/cli@latest agent init --client cursor",
        steps: [
            { title: "Open Cursor's terminal", description: "Open the repository where you want to use Proper UI." },
            { title: "Create the Cursor rule", description: "The CLI writes .cursor/rules/properui.mdc with alwaysApply enabled." },
            {
                title: "Prompt in Agent mode",
                description: "Cursor searches the registry before writing markup and composes the chosen Proper UI components.",
            },
        ],
    },
    lovable: {
        name: "Lovable",
        logo: "/lovable.svg",
        title: "Add Proper UI to Lovable Knowledge",
        intro: "Lovable runs in the browser, so it cannot read a local skill file. Give it the public Proper UI skill through project Knowledge instead.",
        copyLabel: "Copy this Skill URL",
        copyValue: "https://github.com/properui/properui/blob/main/skills/properui/SKILL.md",
        steps: [
            { title: "Open project settings", description: "In Lovable, open your project's Knowledge or Custom instructions panel." },
            { title: "Paste the Proper UI Skill", description: "Paste the public GitHub URL below so Lovable can read the complete workflow." },
            {
                title: "Prompt with Proper UI",
                description:
                    "Describe the page and mention Proper UI. Lovable installs the npm package in its Vite project and uses the registry instead of generic markup.",
            },
        ],
    },
};

export const EXAMPLE_PROMPT = "Build a polished pricing page using Proper UI. Search the registry and use an existing full-page example if one fits.";
