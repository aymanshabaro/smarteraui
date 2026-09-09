import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import "vitest-axe/extend-expect";
import * as Demos from "./forgot-password-pages.demo";
import { variantsA } from "./variants.a";

describe("Forgot password pages (part A)", () => {
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

    it("exposes the 5 part A variants", () => {
        expect(Object.keys(variantsA)).toHaveLength(5);
    });

    it("labels the email field and submits with the reset action", () => {
        const { getByLabelText, getByRole } = render(<Demos.ForgotPasswordPageExample />);
        // The rendered label carries a trailing required marker, so match on its prefix.
        expect(getByLabelText(/^Email/)).toHaveAttribute("placeholder", "Enter your email");
        expect(getByRole("button", { name: "Reset password" })).toHaveAttribute("type", "submit");
    });

    it("asks for both password fields and lists the password rules", () => {
        const Variant = variantsA["step-3-set-new-password"];
        const { getByLabelText, getByText } = render(<Variant />);
        expect(getByLabelText(/^Password/)).toHaveAttribute("type", "password");
        expect(getByLabelText(/^Confirm password/)).toHaveAttribute("type", "password");
        expect(getByText("Must be at least 8 characters")).toBeInTheDocument();
        expect(getByText("Must contain one special character")).toBeInTheDocument();
    });

    it("marks the password step as current in the sidebar progress", () => {
        const Variant = variantsA["step-sidebar-version"];
        const { getByText } = render(<Variant />);
        expect(getByText("Choose a password").closest("li")).toHaveAttribute("aria-current", "step");
    });
});
