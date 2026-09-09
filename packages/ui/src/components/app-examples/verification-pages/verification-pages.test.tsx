import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import "vitest-axe/extend-expect";
import { variantsA } from "./variants.a";
import * as Demos from "./verification-pages.demo";

describe("Verification pages (part A)", () => {
    for (const [name, Demo] of Object.entries(Demos)) {
        it(`${name} has no a11y violations`, async () => {
            const { container } = render(<Demo />);
            expect(await axe(container)).toHaveNoViolations();
        });
    }

    for (const [slug, Variant] of Object.entries(variantsA)) {
        it(`${slug} has no a11y violations`, async () => {
            const { container } = render(<Variant />);
            expect(await axe(container)).toHaveNoViolations();
        });
    }

    it("exposes the 3 part A variants", () => {
        expect(Object.keys(variantsA)).toHaveLength(3);
    });

    it("addresses the verification email to the demo persona", () => {
        const { getByText } = render(<Demos.VerificationPageExample />);
        expect(getByText("olivia@smartera.com")).toBeInTheDocument();
    });

    it("renders a four-slot code field per breakpoint on the manual code step", () => {
        const Variant = variantsA["step-2-enter-code-manually"];
        const { getAllByLabelText } = render(<Variant />);
        // One slot per breakpoint copy of the field: mobile (sm) and desktop (md).
        expect(getAllByLabelText("Enter digit 1 of 4")).toHaveLength(2);
        expect(getAllByLabelText("Enter digit 4 of 4")).toHaveLength(2);
    });

    it("offers a resend link on the success step", () => {
        const Variant = variantsA["step-3-success"];
        const { getByRole } = render(<Variant />);
        expect(getByRole("link", { name: "Click to resend" })).toBeInTheDocument();
    });
});
