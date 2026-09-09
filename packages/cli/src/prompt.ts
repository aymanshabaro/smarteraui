/**
 * Thin wrapper over `prompts` so `--yes` and non-TTY runs never block.
 */
import prompts from "prompts";

export class CancelledError extends Error {
    constructor() {
        super("Cancelled.");
    }
}

export const canPrompt = () => Boolean(process.stdin.isTTY) && Boolean(process.stdout.isTTY) && !process.env.CI;

const onCancel = () => {
    throw new CancelledError();
};

/** Yes/no question. Returns `fallback` when `--yes` was passed or stdin is not a TTY. */
export async function confirm(message: string, options: { yes?: boolean; fallback: boolean }): Promise<boolean> {
    if (options.yes || !canPrompt()) return options.fallback;
    const answer = await prompts({ type: "confirm", name: "value", message, initial: options.fallback }, { onCancel });
    return Boolean(answer.value);
}

/** Free-text question. Returns `initial` when `--yes` was passed or stdin is not a TTY. */
export async function ask(message: string, options: { yes?: boolean; initial: string }): Promise<string> {
    if (options.yes || !canPrompt()) return options.initial;
    const answer = await prompts({ type: "text", name: "value", message, initial: options.initial }, { onCancel });
    return typeof answer.value === "string" && answer.value.trim() ? answer.value.trim() : options.initial;
}

/** Masked question used by `login`. */
export async function askSecret(message: string): Promise<string> {
    if (!canPrompt()) return "";
    const answer = await prompts({ type: "password", name: "value", message }, { onCancel });
    return typeof answer.value === "string" ? answer.value.trim() : "";
}
