import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import "vitest-axe/extend-expect";
import { variantsB } from "./variants.b";

describe("Hero header sections (part B)", () => {
    for (const [slug, Variant] of Object.entries(variantsB)) {
        it(`${slug} has no a11y violations`, async () => {
            const { container } = render(<Variant />);
            expect(await axe(container)).toHaveNoViolations();
        });
    }

    it("exposes all 22 part B variants", () => {
        expect(Object.keys(variantsB)).toHaveLength(22);
    });

    it("renders each variant with a single top-level heading", () => {
        for (const Variant of Object.values(variantsB)) {
            const { getAllByRole, unmount } = render(<Variant />);
            expect(getAllByRole("heading", { level: 1 })).toHaveLength(1);
            unmount();
        }
    });
});
