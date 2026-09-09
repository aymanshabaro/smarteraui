import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import "vitest-axe/extend-expect";
import { variantsB } from "./variants.b";

const FooterSmall03Brand = variantsB["footer-small-03-brand"];
const FooterSmall04 = variantsB["footer-small-04"];

describe("Marketing footers (part B)", () => {
    for (const [slug, Variant] of Object.entries(variantsB)) {
        it(`${slug} has no a11y violations`, async () => {
            const { container } = render(<Variant />);
            expect(await axe(container)).toHaveNoViolations();
        });
    }

    it("exposes all 20 part B variants", () => {
        expect(Object.keys(variantsB)).toHaveLength(20);
    });

    it("renders each variant inside a contentinfo landmark", () => {
        for (const Variant of Object.values(variantsB)) {
            const { getByRole, unmount } = render(<Variant />);
            expect(getByRole("contentinfo")).toBeInTheDocument();
            unmount();
        }
    });

    it("labels every social link with its network name", () => {
        const { getAllByRole } = render(<FooterSmall03Brand />);
        const labels = getAllByRole("link").map((link) => link.getAttribute("aria-label"));
        expect(labels).toEqual(["X", "LinkedIn", "Facebook", "GitHub", "AngelList", "Dribbble", "Layers"]);
    });

    it("marks the newsletter input as a required email field", () => {
        const { getByPlaceholderText } = render(<FooterSmall04 />);
        const input = getByPlaceholderText("Enter your email");
        expect(input).toHaveAttribute("type", "email");
        expect(input).toBeRequired();
    });
});
