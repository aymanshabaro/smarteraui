import { getDemoSource } from "~/lib/demo-source";
import { demos } from "~/lib/demos";
import { highlight } from "~/lib/highlight";
import { PreviewFrame } from "./preview-frame";

/**
 * `<Preview id title height demo />` — the MDX block that renders one demo.
 * `demo` is always `"<demoFile>:<Export>"` (AGENT-BRIEF §5); a key that is not in the
 * generated demos map renders a placeholder rather than throwing.
 */
export const Preview = async ({ id, title, height = 320, demo }: { id: string; title: string; height?: number; demo: string }) => {
    const Demo = demos[demo];
    const source = getDemoSource(demo);
    const codeHtml = source ? await highlight(source.code) : undefined;
    const [demoFile, exportName] = demo.split(":");

    return (
        <PreviewFrame
            id={id}
            title={title}
            height={height}
            demoKey={demo}
            previewPath={`/preview/${demoFile ?? ""}/${exportName ?? ""}`}
            sourcePath={source?.filePath}
            code={source?.code}
            codeHtml={codeHtml}
        >
            {Demo ? <Demo /> : null}
        </PreviewFrame>
    );
};
