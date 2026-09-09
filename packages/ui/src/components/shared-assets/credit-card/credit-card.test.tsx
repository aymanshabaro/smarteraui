import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import * as Demos from "./credit-card.demo";

describe("CreditCard", () => {
    for (const [name, Demo] of Object.entries(Demos)) {
        it(`${name} has no a11y violations`, async () => {
            const { container } = render(<Demo />);
            expect(await axe(container)).toHaveNoViolations();
        });
    }

    it("renders custom card details in the customization example", () => {
        const { getByText } = render(<Demos.CustomizationExample />);
        expect(getByText("Brex")).toBeTruthy();
        expect(getByText("Apple Inc.")).toBeTruthy();
    });

    it("renders default card details in the example", () => {
        const { getByText } = render(<Demos.CreditCardExample />);
        expect(getByText("Untitled.")).toBeTruthy();
        expect(getByText("OLIVIA RHYE")).toBeTruthy();
    });
});
