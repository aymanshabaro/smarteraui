import { codeToHtml } from "shiki";

/**
 * Server-side syntax highlighting. Both themes are emitted at once: `github-light`
 * inline and `github-dark` as CSS variables, so a `.dark-mode` ancestor (the page
 * theme *or* a single preview block) switches the colours without re-highlighting.
 */
export const highlight = (code: string, lang = "tsx") =>
    codeToHtml(code, {
        lang,
        themes: { light: "github-light", dark: "github-dark" },
    });
