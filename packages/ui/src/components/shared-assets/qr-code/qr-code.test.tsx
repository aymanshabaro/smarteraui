import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import * as Demos from "./qr-code.demo";

describe("QR code", () => {
    for (const [name, Demo] of Object.entries(Demos)) {
        it(`${name} has no a11y violations`, async () => {
            const { container } = render(<Demo />);
            expect(await axe(container)).toHaveNoViolations();
        });
    }

    it("renders the corner frame handles", () => {
        const { container } = render(<Demos.DefaultExample />);
        expect(container.querySelectorAll(".border-brand_alt")).toHaveLength(4);
    });
});
