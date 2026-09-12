/**
 * Parses a Claude Code `--output-format stream-json` transcript into the ordered list of lines the
 * hero video's "replay" clip renders in Claude Code's own terminal style.
 *
 * One JSON object per line. Known shapes (see scripts/record-demos.ts's header for the full spec):
 *   {"type":"system","subtype":"init",...}
 *   {"type":"assistant","message":{"role":"assistant","content":[...]}}
 *   {"type":"user","message":{"role":"user","content":[...]}}
 *   {"type":"result","subtype":"success",...}
 *
 * Content blocks: {"type":"text","text":"..."}, {"type":"tool_use","id":"...","name":"...",
 * "input":{...}}, {"type":"tool_result","tool_use_id":"...","content":"..." | [{"type":"text",
 * "text":"..."}]}. Everything else (e.g. "thinking" blocks, unknown top-level types) is skipped —
 * this is intentionally defensive since the exact shape wasn't verified against a real transcript
 * when this parser was written (see the report for whether it later was).
 */

export type ReplayLine = { text: string; dim: boolean };

type ContentBlock = {
    type: string;
    text?: string;
    id?: string;
    name?: string;
    input?: Record<string, unknown>;
    tool_use_id?: string;
    content?: unknown;
};

type StreamMessage = { role: string; content: ContentBlock[] | string };
type StreamEvent = { type: string; message?: StreamMessage; [key: string]: unknown };

/** Result content can be a plain string or an array of content blocks (only "text" blocks carry
 *  anything renderable here) — collapse either into one newline-joined string. */
function extractText(content: unknown): string {
    if (typeof content === "string") return content;
    if (Array.isArray(content)) {
        return content
            .map((block) => (block && typeof block === "object" && typeof (block as ContentBlock).text === "string" ? (block as ContentBlock).text! : ""))
            .filter(Boolean)
            .join("\n");
    }
    return "";
}

function firstString(input: Record<string, unknown> | undefined, keys: string[]): string | null {
    if (!input) return null;
    for (const key of keys) {
        const value = input[key];
        if (typeof value === "string" && value.length > 0) return value;
    }
    return null;
}

/** Formats a tool_use block the way Claude Code's own CLI prints it: `Bash(<command>)`,
 *  `Write(<path>)`, etc. Falls back to whatever the input's most identifying field is for tools
 *  outside this short list (Glob, TodoWrite, ...), rather than guessing at a bespoke format. */
function formatToolCall(name: string, input: Record<string, unknown> | undefined): string {
    let arg: string;
    switch (name) {
        case "Bash":
            arg = (firstString(input, ["command"]) ?? "").replace(/\s*\n\s*/g, " ");
            break;
        case "Write":
        case "Edit":
        case "Read":
            arg = firstString(input, ["file_path", "path"]) ?? "";
            break;
        case "Grep":
        case "Glob":
            arg = firstString(input, ["pattern"]) ?? "";
            break;
        default: {
            const generic = firstString(input, ["file_path", "path", "command", "pattern", "query"]);
            if (generic) {
                arg = generic;
            } else if (input && Array.isArray(input.todos)) {
                arg = `${input.todos.length} items`;
            } else {
                arg = "";
            }
        }
    }
    return `⏺ ${name}(${arg})`;
}

/** Up to two non-empty result lines shown under a tool call, dimmed and prefixed like Claude
 *  Code's own `⎿` marker; any remainder is collapsed to a single "+N lines" line (no ellipsis
 *  character, per this project's copy rules) rather than the CLI's own "… +N lines". */
function formatResultLines(raw: string): ReplayLine[] {
    const lines = raw
        .split("\n")
        .map((l) => l.trimEnd())
        .filter((l) => l.length > 0);
    if (lines.length === 0) return [];
    const shown = lines.slice(0, 2);
    const out: ReplayLine[] = shown.map((line, i) => ({ text: `${i === 0 ? "⎿ " : "   "}${line}`, dim: true }));
    const remainder = lines.length - shown.length;
    if (remainder > 0) out.push({ text: `   +${remainder} lines`, dim: true });
    return out;
}

export type ParsedTranscript = { lines: ReplayLine[]; warnings: string[] };

export function parseTranscript(raw: string): ParsedTranscript {
    const warnings: string[] = [];
    const rawLines = raw.split("\n").filter((l) => l.trim().length > 0);

    const events: StreamEvent[] = [];
    for (const [i, rawLine] of rawLines.entries()) {
        try {
            events.push(JSON.parse(rawLine) as StreamEvent);
        } catch {
            warnings.push(`line ${i + 1}: not valid JSON, skipped`);
        }
    }

    // First pass: index tool_result content by tool_use_id (results arrive in later "user" events).
    const resultsByCallId = new Map<string, string>();
    for (const event of events) {
        if (event.type !== "user" || !event.message) continue;
        const content = event.message.content;
        if (!Array.isArray(content)) continue;
        for (const block of content) {
            if (block.type === "tool_result" && typeof block.tool_use_id === "string") {
                resultsByCallId.set(block.tool_use_id, extractText(block.content));
            }
        }
    }

    // Second pass: walk assistant events in order, emitting plain text lines and tool-call lines
    // (with their matched result lines, if any) in the order they actually happened.
    const lines: ReplayLine[] = [];
    for (const event of events) {
        if (event.type !== "assistant" || !event.message) continue;
        const content = event.message.content;
        if (!Array.isArray(content)) continue;
        for (const block of content) {
            if (block.type === "text" && typeof block.text === "string") {
                for (const textLine of block.text.split("\n").map((l) => l.trim())) {
                    if (textLine.length > 0) lines.push({ text: textLine, dim: false });
                }
            } else if (block.type === "tool_use" && typeof block.name === "string") {
                lines.push({ text: formatToolCall(block.name, block.input), dim: false });
                const resultRaw = block.id ? resultsByCallId.get(block.id) : undefined;
                if (resultRaw) lines.push(...formatResultLines(resultRaw));
            }
            // Other block types (e.g. "thinking") are intentionally skipped — not real
            // terminal-visible content.
        }
    }

    if (lines.length === 0) warnings.push("no assistant text or tool_use content found in transcript");
    return { lines, warnings };
}
