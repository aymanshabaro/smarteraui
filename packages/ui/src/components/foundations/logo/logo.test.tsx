import { render } from "@testing-library/react";
import { axe } from "vitest-axe";
import { ProperLogo } from "./proper-logo";
import { ProperLogoMinimal } from "./proper-logo-minimal";

describe("ProperLogo", () => {
    it("renders and has no a11y violations", async () => {
        const { container } = render(<ProperLogo />);
        expect(container.textContent).toContain("Proper");
        expect(await axe(container)).toHaveNoViolations();
    });

    it("merges a custom className", () => {
        const { container } = render(<ProperLogo className="custom-logo-class" />);
        expect(container.querySelector(".custom-logo-class")).toBeInTheDocument();
    });
});

describe("ProperLogoMinimal", () => {
    it("renders and has no a11y violations", async () => {
        const { container } = render(<ProperLogoMinimal />);
        expect(container.querySelector("svg")).toBeInTheDocument();
        expect(await axe(container)).toHaveNoViolations();
    });

    it("merges a custom className", () => {
        const { container } = render(<ProperLogoMinimal className="custom-mark-class" />);
        expect(container.querySelector(".custom-mark-class")).toBeInTheDocument();
    });
});
