#!/usr/bin/env node
/**
 * smarteraui CLI — init / add / list / search / diff / login.
 * Spec: docs/cli.md (commands, components.json, auto-detection).
 */
import { Command } from "commander";
import { runAdd } from "./commands/add.js";
import { runDiff } from "./commands/diff.js";
import { runInit } from "./commands/init.js";
import { runList } from "./commands/list.js";
import { runLogin } from "./commands/login.js";
import { runSearch } from "./commands/search.js";
import { CancelledError } from "./prompt.js";
import { DEFAULT_REGISTRY_URL, RegistryError } from "./registry.js";
import { log } from "./ui.js";

const REGISTRY_HELP = `registry directory or base URL (default: $REGISTRY_URL or ${DEFAULT_REGISTRY_URL})`;

/** Wraps a command action so expected failures print one line instead of a stack trace. */
function guard<A extends unknown[]>(action: (...args: A) => Promise<void>): (...args: A) => Promise<void> {
    return async (...args: A) => {
        try {
            await action(...args);
        } catch (error) {
            if (error instanceof CancelledError) {
                log.warn("Cancelled.");
                process.exitCode = 130;
                return;
            }
            log.error(error instanceof RegistryError ? error.message : ((error as Error).message ?? String(error)));
            if (process.env.SMARTERAUI_DEBUG) console.error(error);
            process.exitCode = 1;
        }
    };
}

const program = new Command();

program
    .name("smarteraui")
    .description("Add Smartera UI components to your project")
    .version("0.1.0")
    .option("--cwd <dir>", "run against another directory", process.cwd());

program
    .command("init")
    .description("Configure this project: components.json, theme tokens, cx util and the ThemeProvider")
    .option("--nextjs", "treat this project as Next.js instead of auto-detecting")
    .option("--vite", "treat this project as Vite instead of auto-detecting")
    .option("--manual", "write the files but do not edit the app entry point")
    .option("--overwrite", "replace components.json and any files that already exist")
    .option("--registry <source>", REGISTRY_HELP)
    .option("-y, --yes", "accept every default; never prompt")
    .action(guard(async (options) => runInit({ ...options, cwd: program.opts().cwd })));

program
    .command("add")
    .description("Add components (or `add example <name>` for a full page example) and their dependencies")
    .argument("[components...]", "component names, or `example <name>`")
    .option("--all", "add every component in the registry")
    .option("--overwrite", "replace files that already exist")
    .option("--path <dir>", "put component files in this directory instead of the components alias")
    .option("--dry-run", "print what would change without writing anything")
    .option("--registry <source>", REGISTRY_HELP)
    .option("-y, --yes", "accept every default; never prompt")
    .action(guard(async (components: string[], options) => runAdd(components, { ...options, cwd: program.opts().cwd })));

program
    .command("list")
    .description("List available components with layer and description")
    .option("--layer <layer>", "filter by layer, e.g. base, application, marketing")
    .option("--type <type>", "filter by type: component, example, util, hook, style")
    .option("--json", "print the raw index rows")
    .option("--registry <source>", REGISTRY_HELP)
    .option("-y, --yes", "accept every default; never prompt")
    .action(guard(async (options) => runList({ ...options, cwd: program.opts().cwd })));

program
    .command("search")
    .description("Fuzzy search over component names, descriptions and example names")
    .argument("<query>")
    .option("--limit <n>", "maximum results", "20")
    .option("--registry <source>", REGISTRY_HELP)
    .option("-y, --yes", "accept every default; never prompt")
    .action(guard(async (query: string, options) => runSearch(query, { ...options, cwd: program.opts().cwd })));

program
    .command("diff")
    .description("Show local modifications against the registry version")
    .argument("[component]", "component to compare; omit to check everything already installed")
    .option("--registry <source>", REGISTRY_HELP)
    .option("-y, --yes", "accept every default; never prompt")
    .action(guard(async (component: string | undefined, options) => runDiff(component, { ...options, cwd: program.opts().cwd })));

program
    .command("login")
    .description("Store a registry token at ~/.smarteraui/auth.json (private registries only)")
    .option("--token <token>", "use this token instead of prompting")
    .option("--registry <source>", REGISTRY_HELP)
    .option("-y, --yes", "accept every default; never prompt")
    .action(guard(async (options) => runLogin({ ...options, cwd: program.opts().cwd })));

program.parseAsync().catch((error: unknown) => {
    log.error((error as Error).message);
    process.exit(1);
});
