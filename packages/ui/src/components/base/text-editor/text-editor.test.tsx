import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import { getPlainTextLength, stripHtml } from "./text-editor-commands";
import * as Demos from "./text-editor.demo";

describe("TextEditor", () => {
    for (const [name, Demo] of Object.entries(Demos)) {
        it(`${name} has no a11y violations`, async () => {
            const { container } = render(<Demo />);
            expect(await axe(container)).toHaveNoViolations();
        });
    }

    it("renders the editable area as a labelled multiline textbox", () => {
        render(<Demos.DefaultSm />);

        const textbox = screen.getByRole("textbox", { name: "Article body" });
        expect(textbox.getAttribute("contenteditable")).toBe("true");
        expect(textbox.getAttribute("aria-multiline")).toBe("true");
    });

    it("applies the size styles to the editable area", () => {
        const { unmount } = render(<Demos.DefaultSm />);
        expect(screen.getByRole("textbox", { name: "Article body" }).className).toContain("text-sm");
        unmount();

        render(<Demos.DefaultMd />);
        expect(screen.getByRole("textbox", { name: "Article body" }).className).toContain("text-md");
    });

    it("marks an empty editor so the placeholder shows", () => {
        render(<Demos.TextEditorExample />);

        const textbox = screen.getByRole("textbox", { name: "Note" });
        expect(textbox.getAttribute("data-empty")).toBe("true");
        expect(textbox.getAttribute("data-placeholder")).toBe("Write something...");
    });

    it("counts the characters left against maxLength", () => {
        render(<Demos.DefaultSm />);
        // The used count is read back from the editor rather than hard-coded, so editing the
        // demo copy cannot fail this test; 1744 is the demo's maxLength budget.
        const used = screen.getByRole("textbox", { name: "Article body" }).textContent?.length ?? 0;
        expect(screen.getByText(`${1744 - used} characters left`)).toBeDefined();
    });

    it("renders custom hint content instead of the counter", () => {
        render(<Demos.WithTooltip />);
        expect(screen.getByText("Select a text to show a tooltip.")).toBeDefined();
    });

    it("exposes the formatting toggles with keyboard shortcuts in their labels", () => {
        render(<Demos.DefaultMd />);

        expect(screen.getAllByRole("button", { name: "Bold ⌘B" }).length).toBeGreaterThan(0);
        expect(screen.getAllByRole("button", { name: "Italic ⌘I" }).length).toBeGreaterThan(0);
        expect(screen.getAllByRole("button", { name: "Underline ⌘U" }).length).toBeGreaterThan(0);
    });

    it("measures plain-text length without touching the DOM", () => {
        expect(stripHtml("<p>a &amp; b</p>")).toBe("a & b");
        expect(getPlainTextLength("<p><br></p>")).toBe(0);
    });
});
