import { render } from "@testing-library/react";
import { axe } from "vitest-axe";
import * as IntegrationIcons from "./index";

describe("Integration icons", () => {
    for (const [name, Icon] of Object.entries(IntegrationIcons)) {
        it(`${name} has no a11y violations`, async () => {
            const { container } = render(<Icon aria-hidden="true" data-testid={name} />);
            expect(container.querySelector(`[data-testid="${name}"]`)).toBeInTheDocument();
            expect(await axe(container)).toHaveNoViolations();
        });

        it(`${name} renders the grayscale variant`, async () => {
            const { container } = render(<Icon aria-hidden="true" data-testid={`${name}-grayscale`} grayscale />);
            expect(container.querySelector(`[data-testid="${name}-grayscale"]`)).toBeInTheDocument();
            expect(await axe(container)).toHaveNoViolations();
        });
    }
});
