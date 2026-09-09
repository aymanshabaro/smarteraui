/** Static facts about this documentation site. Kept in one place so links stay consistent. */

export const SITE_NAME = "Smartera UI";

/** Absolute origin, used for canonical URLs, the sitemap and the "open in <LLM>" links. */
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://smarteraui.com";

export const GITHUB_ORG = "aymanshabaro";
export const GITHUB_REPO = "smarteraui";
export const GITHUB_URL = `https://github.com/${GITHUB_ORG}/${GITHUB_REPO}`;
export const GITHUB_BRANCH = "main";

/** The CLI package name used by every `npx … add <slug>` snippet. */
export const CLI_PACKAGE = "smarteraui";

/** Placeholder for the top-bar "Sign in" action until the product has real auth. */
export const SIGN_IN_URL = process.env.NEXT_PUBLIC_SIGN_IN_URL ?? GITHUB_URL;

export const absoluteUrl = (pathname: string) => `${SITE_URL}${pathname.startsWith("/") ? pathname : `/${pathname}`}`;

/** Plain-markdown twin of a docs route (`/components/buttons` → `/components/buttons.md`). */
export const markdownUrl = (pathname: string) => `${pathname.replace(/\/$/, "")}.md`;

export const githubSourceUrl = (sourcePath: string) => `${GITHUB_URL}/tree/${GITHUB_BRANCH}/${sourcePath.replace(/^\//, "")}`;
