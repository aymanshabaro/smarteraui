import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import "vitest-axe/extend-expect";
import * as Demos from "./sign-up-pages.demo";
import { variantsA } from "./variants.a";

describe("Sign up pages", () => {
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

    it("exposes the 21 part A variants", () => {
        expect(Object.keys(variantsA)).toHaveLength(21);
    });

    it("renders exactly one level-1 heading per variant", () => {
        for (const [slug, Variant] of Object.entries(variantsA)) {
            const { getAllByRole, unmount } = render(<Variant />);
            expect(getAllByRole("heading", { level: 1 }), slug).toHaveLength(1);
            unmount();
        }
    });

    it("labels every field of the shared credential form", () => {
        const { getByRole, getByLabelText } = render(<Demos.SignUpPageExample />);

        // The required marker is part of the label, so the accessible name is "Name *".
        expect(getByRole("textbox", { name: /^Name/ })).toBeInTheDocument();
        expect(getByRole("textbox", { name: /^Email/ })).toBeInTheDocument();
        expect(getByLabelText(/^Password/)).toBeInTheDocument();
        expect(getByRole("button", { name: "Get started" })).toBeInTheDocument();
        expect(getByRole("button", { name: "Sign up with Google" })).toBeInTheDocument();
    });

    it("marks the current step of the sidebar progress tracker", () => {
        const Variant = variantsA["signup-sidebar-progress-02"];
        const { getByText } = render(<Variant />);

        expect(getByText("Choose a password", { selector: "p" }).closest("li")).toHaveAttribute("aria-current", "step");
    });

    it("offers the three social providers on the social logins page", () => {
        const Variant = variantsA["signup-simple-social-logins"];
        const { getByRole } = render(<Variant />);

        expect(getByRole("button", { name: "Sign up with Google" })).toBeInTheDocument();
        expect(getByRole("button", { name: "Sign up with Facebook" })).toBeInTheDocument();
        expect(getByRole("button", { name: "Sign up with Apple" })).toBeInTheDocument();
    });
});
