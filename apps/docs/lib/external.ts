import { GITHUB_BRANCH, GITHUB_ORG, GITHUB_REPO, SITE_NAME, absoluteUrl, markdownUrl } from "./site";

/**
 * "Open in <tool>" destinations. Every one of them is handed the public URL of the
 * page's plain-markdown twin (`/<route>.md`), which is what the LLM tools can read.
 */

const prompt = (title: string, url: string) => `Read ${url} and help me use the ${title} component from ${SITE_NAME}.`;

export const chatGptUrl = (pathname: string, title: string) =>
    `https://chatgpt.com/?hints=search&q=${encodeURIComponent(prompt(title, absoluteUrl(markdownUrl(pathname))))}`;

export const claudeUrl = (pathname: string, title: string) =>
    `https://claude.ai/new?q=${encodeURIComponent(prompt(title, absoluteUrl(markdownUrl(pathname))))}`;

export const boltUrl = (pathname: string, title: string) => `https://bolt.new/?prompt=${encodeURIComponent(prompt(title, absoluteUrl(markdownUrl(pathname))))}`;

export const v0Url = (pathname: string) => `https://v0.dev/chat/api/open?url=${encodeURIComponent(absoluteUrl(markdownUrl(pathname)))}`;

/** StackBlitz opens the demo file straight from the repository. */
export const stackBlitzUrl = (sourcePath: string) =>
    `https://stackblitz.com/github/${GITHUB_ORG}/${GITHUB_REPO}/tree/${GITHUB_BRANCH}/${sourcePath.replace(/^\//, "")}`;
