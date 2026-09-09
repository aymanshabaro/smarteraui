import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import "vitest-axe/extend-expect";
import { CodeSnippet } from "./code-snippet";
import * as Demos from "./code-snippet.demo";
import type { CodeLine } from "./highlight";
import { highlight } from "./highlight";

describe("CodeSnippet", () => {
    for (const [name, Demo] of Object.entries(Demos)) {
        it(`${name} has no a11y violations`, async () => {
            const { container } = render(<Demo />);
            expect(await axe(container)).toHaveNoViolations();
        });
    }

    it("renders one gutter number per line when showLineNumbers is set", () => {
        const { getByLabelText } = render(<CodeSnippet code={"const a = 1\n\nconst b = 2"} showLineNumbers aria-label="Snippet" />);
        const gutter = getByLabelText("Snippet").querySelector("[aria-hidden='true']");

        expect(gutter?.textContent).toBe("123");
    });

    it("omits the gutter by default", () => {
        const { getByLabelText } = render(<CodeSnippet code="const a = 1" aria-label="Snippet" />);

        expect(getByLabelText("Snippet").querySelector("[aria-hidden='true']")).toBeNull();
    });

    it("sits on a raised frame when isFramed is set", () => {
        const { getByLabelText } = render(<CodeSnippet code="const a = 1" isFramed aria-label="Snippet" />);
        const card = getByLabelText("Snippet").parentElement;

        expect(card?.className).toContain("shadow-lg");
        expect(card?.parentElement?.className).toContain("bg-secondary_alt");
    });

    it("renders a Show more control only when collapsedHeight is set", () => {
        const { queryByRole, rerender } = render(<CodeSnippet code="const a = 1" aria-label="Snippet" />);
        expect(queryByRole("button", { name: "Show more" })).toBeNull();

        rerender(<CodeSnippet code="const a = 1" collapsedHeight={350} aria-label="Snippet" />);
        expect(queryByRole("button", { name: "Show more" })).not.toBeNull();
    });

    it("renders one tab per item and only the selected panel", () => {
        const { getAllByRole, getByRole } = render(
            <CodeSnippet.Tabs
                aria-label="Package manager"
                items={[
                    { id: "npm", label: "npm", code: "npm i x", language: "bash" },
                    { id: "yarn", label: "yarn", code: "yarn add x", language: "bash" },
                ]}
            />,
        );

        expect(getAllByRole("tab")).toHaveLength(2);
        expect(getByRole("tab", { name: "npm" }).getAttribute("aria-selected")).toBe("true");
        expect(getAllByRole("tabpanel")).toHaveLength(1);
    });
});

describe("highlight", () => {
    const typesOf = (line: CodeLine = []) => line.map((token) => [token.type, token.content]);

    it("splits blank lines into empty arrays", () => {
        expect(highlight("const a = 1\n\nconst b = 2")).toHaveLength(3);
        expect(highlight("const a = 1\n\nconst b = 2")[1]).toEqual([]);
    });

    it("colours declarations, keywords, literals and calls the way the reference does", () => {
        const [line] = highlight("const schema = new Schema({");

        expect(typesOf(line)).toEqual([
            ["keyword", "const"],
            ["plain", " "],
            ["constant", "schema"],
            ["plain", " "],
            ["keyword", "="],
            ["plain", " "],
            ["keyword", "new"],
            ["plain", " "],
            ["function", "Schema"],
            ["plain", "({"],
        ]);
    });

    it("treats comments, strings and numbers as their own token types", () => {
        expect(typesOf(highlight("// note")[0])).toEqual([["comment", "// note"]]);
        expect(typesOf(highlight('  25: "rgb(1)",')[0])).toEqual([
            ["plain", "  "],
            ["constant", "25"],
            ["plain", ": "],
            ["string", '"rgb(1)"'],
            ["plain", ","],
        ]);
    });

    it("marks the leading word of a shell command as a call", () => {
        expect(typesOf(highlight("npm install @smarteraui/components", "bash")[0])).toEqual([
            ["function", "npm"],
            ["plain", " install @smarteraui/components"],
        ]);
    });

    it("leaves plaintext untouched", () => {
        expect(typesOf(highlight("Anything at all", "plaintext")[0])).toEqual([["plain", "Anything at all"]]);
    });
});
