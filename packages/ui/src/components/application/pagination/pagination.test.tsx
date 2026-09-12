import { fireEvent, render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { axe } from "vitest-axe";
import "vitest-axe/extend-expect";
import { PaginationCardMinimal, PaginationCursor, PaginationPageDefault } from "./pagination";
import { Pagination } from "./pagination-base";
import * as Demos from "./pagination.demo";

describe("Pagination", () => {
    for (const [name, Demo] of Object.entries(Demos)) {
        it(`${name} has no a11y violations`, async () => {
            const { container } = render(<Demo />);
            expect(await axe(container)).toHaveNoViolations();
        });
    }

    it("renders the current page indicator", () => {
        const { getAllByText } = render(<Demos.PageDefault />);
        expect(getAllByText("1").length).toBeGreaterThan(0);
    });

    it("disables the previous trigger on the first page", () => {
        const { getAllByRole } = render(<Demos.PageDefault />);
        const prevButtons = getAllByRole("button", { name: "Previous Page" });
        expect(prevButtons[0]).toBeDisabled();
    });

    it("overrides the root's aria-label", () => {
        const { getByRole } = render(
            <Pagination.Root page={1} total={3} aria-label="Search results pages">
                <Pagination.Item value={1} isCurrent>
                    1
                </Pagination.Item>
            </Pagination.Root>,
        );
        expect(getByRole("navigation", { name: "Search results pages" })).toBeInTheDocument();
    });

    it("does not overwrite an asChild trigger's own visible text with the default aria-label", () => {
        const { getByRole } = render(
            <Pagination.Root page={2} total={3}>
                <Pagination.PrevTrigger asChild>
                    <button type="button">Înapoi</button>
                </Pagination.PrevTrigger>
            </Pagination.Root>,
        );
        // The child's own text names the button; no English "Previous Page" aria-label is forced onto it.
        const button = getByRole("button", { name: "Înapoi" });
        expect(button).not.toHaveAttribute("aria-label");
    });

    it("still falls back to the default aria-label for an icon-only asChild trigger", () => {
        const { getByRole } = render(
            <Pagination.Root page={2} total={3}>
                <Pagination.PrevTrigger asChild>
                    <button type="button" />
                </Pagination.PrevTrigger>
            </Pagination.Root>,
        );
        expect(getByRole("button", { name: "Previous Page" })).toBeInTheDocument();
    });

    it("accepts a `pageLabel` format function", () => {
        const { getByText } = render(<PaginationPageDefault page={1} total={3} pageLabel={(page, total) => `Pagina ${page} din ${total}`} />);
        expect(getByText("Pagina 1 din 3")).toBeInTheDocument();
    });

    it("accepts `previousLabel` and `nextLabel` overrides", () => {
        const { getByText } = render(<PaginationCardMinimal page={2} total={3} previousLabel="Înapoi" nextLabel="Înainte" />);
        expect(getByText("Înapoi")).toBeInTheDocument();
        expect(getByText("Înainte")).toBeInTheDocument();
    });

    it("PaginationCursor never renders a page total, and disables triggers with nowhere to go", () => {
        const onPrevious = vi.fn();
        const onNext = vi.fn();
        const { getByRole, queryByText } = render(<PaginationCursor hasPrevious={false} hasNext onPrevious={onPrevious} onNext={onNext} />);

        expect(queryByText(/of/)).toBeNull();
        expect(getByRole("button", { name: "Previous" })).toBeDisabled();

        fireEvent.click(getByRole("button", { name: "Next" }));
        expect(onNext).toHaveBeenCalledTimes(1);
        expect(onPrevious).not.toHaveBeenCalled();
    });
});
