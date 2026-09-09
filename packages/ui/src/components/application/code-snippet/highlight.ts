/**
 * Minimal, dependency-free syntax tokeniser used by `CodeSnippet`.
 *
 * The reference implementation highlights with Shiki, which is not a dependency of this
 * package, so snippets are rendered as pre-tokenised spans carrying semantic token classes
 * instead. The grammars below cover the shapes a docs/marketing snippet needs (JS/TS object
 * literals, imports, and shell install commands); anything richer should be tokenised with a
 * real highlighter and handed to `CodeSnippet` through its `lines` prop.
 */

/** The categories a token can fall into. Each maps to one semantic colour class. */
export type CodeTokenType = "plain" | "comment" | "keyword" | "string" | "constant" | "function";

export interface CodeToken {
    /** The token category, used to pick the semantic colour class. */
    type: CodeTokenType;
    /** The literal source text of the token. */
    content: string;
}

/** One rendered line of code: its tokens, in source order. An empty array is a blank line. */
export type CodeLine = CodeToken[];

/** The grammars the built-in tokeniser understands. */
export type CodeLanguage = "javascript" | "typescript" | "jsx" | "tsx" | "json" | "bash" | "shell" | "plaintext";

const JS_KEYWORDS = new Set([
    "as",
    "async",
    "await",
    "break",
    "case",
    "catch",
    "class",
    "const",
    "continue",
    "default",
    "delete",
    "do",
    "else",
    "enum",
    "export",
    "extends",
    "finally",
    "for",
    "from",
    "function",
    "if",
    "implements",
    "import",
    "in",
    "instanceof",
    "interface",
    "let",
    "new",
    "of",
    "return",
    "satisfies",
    "static",
    "switch",
    "throw",
    "try",
    "type",
    "typeof",
    "var",
    "void",
    "while",
    "yield",
]);

const JS_LITERALS = new Set(["true", "false", "null", "undefined", "NaN", "Infinity", "this", "super"]);

/** Keywords after which the next identifier is the name being declared. */
const JS_DECLARATIONS = new Set(["class", "const", "function", "interface", "let", "var"]);

const JS_TOKEN_RE =
    /(?<comment>\/\/[^\n]*|\/\*[\s\S]*?\*\/)|(?<string>'(?:\\.|[^'\\])*'|"(?:\\.|[^"\\])*"|`(?:\\.|[^`\\])*`)|(?<number>\d[\d_]*(?:\.\d+)?)|(?<word>[A-Za-z_$][\w$]*)|(?<operator>=>|===|!==|==|!=|<=|>=|&&|\|\||\?\?|[=+\-*/%<>!&|?])|[\s\S]/g;

const BASH_TOKEN_RE = /(?<comment>#[^\n]*)|(?<string>'(?:\\.|[^'\\])*'|"(?:\\.|[^"\\])*")|(?<operator>&&|\|\||[|;])|(?<word>[^\s'"#;|&]+)|[\s\S]/g;

const scanJavaScript = (code: string): CodeToken[] => {
    const tokens: CodeToken[] = [];
    let previous: CodeToken | undefined;

    for (const match of code.matchAll(JS_TOKEN_RE)) {
        const content = match[0];
        const groups = match.groups ?? {};
        let type: CodeTokenType = "plain";

        if (groups.comment) {
            type = "comment";
        } else if (groups.string) {
            type = "string";
        } else if (groups.number) {
            type = "constant";
        } else if (groups.operator) {
            type = "keyword";
        } else if (groups.word) {
            // Look ahead past horizontal whitespace: an identifier followed by `(` is a call,
            // and one followed by `:` is a property key — never a keyword, so object literals
            // keep properties like `type:` and `default:` in the plain colour.
            let next = (match.index ?? 0) + content.length;
            while (code[next] === " " || code[next] === "\t") next++;

            const isPropertyKey = code[next] === ":";

            if (!isPropertyKey && JS_KEYWORDS.has(content)) {
                type = "keyword";
            } else if (!isPropertyKey && JS_LITERALS.has(content)) {
                type = "constant";
            } else if (code[next] === "(") {
                type = "function";
            } else if (previous?.type === "keyword" && JS_DECLARATIONS.has(previous.content)) {
                type = "constant";
            }
        }

        tokens.push({ type, content });

        if (type !== "comment" && content.trim()) {
            previous = { type, content };
        }
    }

    return tokens;
};

const scanShell = (code: string): CodeToken[] => {
    const tokens: CodeToken[] = [];
    let isCommandStart = true;

    for (const match of code.matchAll(BASH_TOKEN_RE)) {
        const content = match[0];
        const groups = match.groups ?? {};
        let type: CodeTokenType = "plain";

        if (groups.comment) {
            type = "comment";
        } else if (groups.string) {
            type = "string";
        } else if (groups.operator) {
            type = "keyword";
            isCommandStart = true;
        } else if (groups.word) {
            if (/^--?[A-Za-z]/.test(content)) {
                type = "constant";
            } else if (isCommandStart) {
                type = "function";
                isCommandStart = false;
            }
        } else if (content.includes("\n")) {
            isCommandStart = true;
        }

        tokens.push({ type, content });
    }

    return tokens;
};

/** Splits a flat token stream into lines, merging neighbouring tokens of the same type. */
const toLines = (tokens: CodeToken[]): CodeLine[] => {
    let line: CodeLine = [];
    const lines: CodeLine[] = [line];

    for (const token of tokens) {
        const segments = token.content.split("\n");

        segments.forEach((segment, index) => {
            if (index > 0) {
                line = [];
                lines.push(line);
            }

            if (!segment) return;

            const last = line[line.length - 1];

            if (last && last.type === token.type) {
                last.content += segment;
            } else {
                line.push({ type: token.type, content: segment });
            }
        });
    }

    return lines;
};

/**
 * Tokenises `code` into renderable lines.
 *
 * @param code The source to tokenise. A single trailing newline is ignored so snippets
 * written as template literals do not render a stray blank line.
 * @param language The grammar to use. Unknown languages fall back to unstyled text.
 */
export const highlight = (code: string, language: CodeLanguage = "javascript"): CodeLine[] => {
    const source = code.replace(/\n$/, "");

    switch (language) {
        case "bash":
        case "shell":
            return toLines(scanShell(source));
        case "plaintext":
            return toLines([{ type: "plain", content: source }]);
        default:
            return toLines(scanJavaScript(source));
    }
};
