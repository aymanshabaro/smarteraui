// Ambient type augmentation so `expect(await axe(container)).toHaveNoViolations()` and the
// jest-dom matchers type-check. Runtime matchers are registered in ../vitest.setup.ts.
/* eslint-disable @typescript-eslint/no-empty-object-type, @typescript-eslint/no-unused-vars */
import "@testing-library/jest-dom/vitest";
import "vitest";
import type { AxeMatchers } from "vitest-axe/matchers";

declare module "vitest" {
    interface Assertion<T = unknown> extends AxeMatchers {}
    interface AsymmetricMatchersContaining extends AxeMatchers {}
}
