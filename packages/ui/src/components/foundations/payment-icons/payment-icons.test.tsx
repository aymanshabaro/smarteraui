import { render } from "@testing-library/react";
import { axe } from "vitest-axe";
import * as PaymentIcons from "./index";

describe("Payment icons", () => {
    for (const [name, Icon] of Object.entries(PaymentIcons)) {
        it(`${name} has no a11y violations`, async () => {
            const { container } = render(<Icon aria-hidden="true" data-testid={name} />);
            expect(container.querySelector(`[data-testid="${name}"]`)).toBeInTheDocument();
            expect(await axe(container)).toHaveNoViolations();
        });
    }
});
