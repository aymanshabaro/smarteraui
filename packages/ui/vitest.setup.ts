import "@testing-library/jest-dom/vitest";
import { expect } from "vitest";
import * as matchers from "vitest-axe/matchers";

expect.extend(matchers);

// jsdom does not implement matchMedia; `useBreakpoint` and Recharts' responsive wrappers call it.
if (typeof window !== "undefined" && typeof window.matchMedia !== "function") {
    window.matchMedia = (query: string) =>
        ({
            matches: false,
            media: query,
            onchange: null,
            addListener: () => {},
            removeListener: () => {},
            addEventListener: () => {},
            removeEventListener: () => {},
            dispatchEvent: () => false,
        }) as MediaQueryList;
}

// jsdom implements neither observer. embla-carousel and Recharts' ResponsiveContainer both need
// one, and Recharts additionally needs a non-zero box: it renders nothing at width 0, which would
// silently empty every chart test. So ResizeObserver reports a plausible size once on observe.
const OBSERVED_BOX = { width: 800, height: 600 };

class TestResizeObserver implements ResizeObserver {
    constructor(private readonly callback: ResizeObserverCallback) {}

    observe(target: Element) {
        const contentRect = { ...OBSERVED_BOX, top: 0, left: 0, bottom: OBSERVED_BOX.height, right: OBSERVED_BOX.width, x: 0, y: 0 };
        const box = [{ inlineSize: OBSERVED_BOX.width, blockSize: OBSERVED_BOX.height }];
        this.callback(
            [{ target, contentRect, borderBoxSize: box, contentBoxSize: box, devicePixelContentBoxSize: box } as unknown as ResizeObserverEntry],
            this,
        );
    }
    unobserve() {}
    disconnect() {}
}

class NoopObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
    takeRecords() {
        return [];
    }
}

if (typeof window !== "undefined") {
    if (typeof window.ResizeObserver !== "function") window.ResizeObserver = TestResizeObserver as unknown as typeof ResizeObserver;
    if (typeof window.IntersectionObserver !== "function") window.IntersectionObserver = NoopObserver as unknown as typeof IntersectionObserver;

    // Recharts also reads layout off the element itself, which jsdom always reports as 0.
    for (const [prop, value] of [
        ["offsetWidth", OBSERVED_BOX.width],
        ["offsetHeight", OBSERVED_BOX.height],
    ] as const) {
        if (!Object.getOwnPropertyDescriptor(window.HTMLElement.prototype, prop)?.get) {
            Object.defineProperty(window.HTMLElement.prototype, prop, { configurable: true, get: () => value });
        }
    }
}
