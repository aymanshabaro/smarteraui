import { highlight } from "~/lib/highlight";
import { getRegistryEntry } from "~/lib/registry";
import { CLI_PACKAGE } from "~/lib/site";
import { InstallTabs } from "./install-tabs";

/**
 * `<Install slug="badges" />` — CLI / Manual installation block.
 * Spec: docs/spec/00-foundation/08-docs-site.md, 09-cli-and-distribution.md
 */
export const Install = async ({ slug }: { slug: string }) => {
    const cliCode = `npx ${CLI_PACKAGE}@latest add ${slug}`;
    const cliHtml = await highlight(cliCode, "bash");
    const entry = getRegistryEntry(slug);

    return <InstallTabs slug={slug} cliCode={cliCode} cliHtml={cliHtml} files={entry?.files ?? []} dependencies={entry?.dependencies ?? []} />;
};
