import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import "vitest-axe/extend-expect";
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
});
