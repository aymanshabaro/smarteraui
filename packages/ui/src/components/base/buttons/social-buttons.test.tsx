import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import { SocialButton } from "@/components/base/buttons/social-button";
import * as Demos from "@/components/base/buttons/social-buttons.demo";

describe("Social buttons", () => {
    for (const [name, Demo] of Object.entries(Demos)) {
        it(`${name} has no a11y violations`, async () => {
            const { container } = render(<Demo />);
            expect(await axe(container)).toHaveNoViolations();
        });
    }
});

describe("SocialButton", () => {
    it("renders the label text", () => {
        render(<SocialButton social="google">Sign in with Google</SocialButton>);
        expect(screen.getByRole("button", { name: "Sign in with Google" })).toBeInTheDocument();
    });
});
