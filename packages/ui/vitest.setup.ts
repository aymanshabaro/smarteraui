import "@testing-library/jest-dom/vitest";
import { expect } from "vitest";
import * as matchers from "vitest-axe/matchers";
import "./src/utils/jsdom-setup";

expect.extend(matchers);

// `./src/utils/jsdom-setup` installs the six jsdom shims React Aria needs (matchMedia,
// ResizeObserver, IntersectionObserver, scrollIntoView, *PointerCapture, inert); see that
// file's top comment for which component needs which. It's the same shim this repo ships as
// the `jsdom-setup` registry util, imported here so the repo dogfoods the file it distributes.
//
// The one shim below that isn't part of that shared file: Recharts also reads layout off the
// element itself, which jsdom always reports as 0. `ResizeObserver`'s reported box (from
// `jsdom-setup`) doesn't cover this, so `offsetWidth`/`offsetHeight` are patched separately,
// here, kept local because it's a Recharts-test-only concern rather than a general React Aria
// requirement.
const OBSERVED_BOX = { width: 800, height: 600 };

if (typeof window !== "undefined") {
    for (const [prop, value] of [
        ["offsetWidth", OBSERVED_BOX.width],
        ["offsetHeight", OBSERVED_BOX.height],
    ] as const) {
        if (!Object.getOwnPropertyDescriptor(window.HTMLElement.prototype, prop)?.get) {
            Object.defineProperty(window.HTMLElement.prototype, prop, { configurable: true, get: () => value });
        }
    }
}
