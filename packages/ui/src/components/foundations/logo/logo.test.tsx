import { render } from "@testing-library/react";
import { axe } from "vitest-axe";
import { SmarteraLogo } from "./smartera-logo";
import { SmarteraLogoMinimal } from "./smartera-logo-minimal";

describe("SmarteraLogo", () => {
    it("renders and has no a11y violations", async () => {
        const { container } = render(<SmarteraLogo />);
        expect(container.textContent).toContain("Smartera");
        expect(await axe(container)).toHaveNoViolations();
    });

    it("merges a custom className", () => {
        const { container } = render(<SmarteraLogo className="custom-logo-class" />);
        expect(container.querySelector(".custom-logo-class")).toBeInTheDocument();
    });
});

describe("SmarteraLogoMinimal", () => {
    it("renders and has no a11y violations", async () => {
        const { container } = render(<SmarteraLogoMinimal />);
        expect(container.querySelector("svg")).toBeInTheDocument();
        expect(await axe(container)).toHaveNoViolations();
    });

    it("merges a custom className", () => {
        const { container } = render(<SmarteraLogoMinimal className="custom-mark-class" />);
        expect(container.querySelector(".custom-mark-class")).toBeInTheDocument();
    });
});
