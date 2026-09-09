/**
 * Console output helpers. Every command uses these so colours and prefixes stay consistent.
 */
import kleur from "kleur";
import ora from "ora";

const isInteractive = () => Boolean(process.stdout.isTTY) && !process.env.CI;

export const log = {
    plain: (message = "") => console.log(message),
    info: (message: string) => console.log(`${kleur.cyan("info")}  ${message}`),
    success: (message: string) => console.log(`${kleur.green("done")}  ${message}`),
    warn: (message: string) => console.log(`${kleur.yellow("warn")}  ${message}`),
    error: (message: string) => console.error(`${kleur.red("error")} ${message}`),
    step: (message: string) => console.log(`${kleur.dim("·")}     ${message}`),
    title: (message: string) => console.log(`\n${kleur.bold(message)}`),
};

export interface Spinner {
    update(text: string): void;
    succeed(text?: string): void;
    fail(text?: string): void;
    stop(): void;
}

/** A spinner that degrades to plain log lines when stdout is not a TTY (CI, pipes, the smoke test). */
export function spinner(text: string): Spinner {
    if (!isInteractive()) {
        let current = text;
        return {
            update: (next) => {
                current = next;
            },
            succeed: (message) => log.success(message ?? current),
            fail: (message) => log.error(message ?? current),
            stop: () => undefined,
        };
    }

    const instance = ora({ text, spinner: "dots" }).start();
    return {
        update: (next) => {
            instance.text = next;
        },
        succeed: (message) => {
            instance.succeed(message);
        },
        fail: (message) => {
            instance.fail(message);
        },
        stop: () => {
            instance.stop();
        },
    };
}

export { kleur };
