import { render } from "@testing-library/react";
import { beforeAll, describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import "vitest-axe/extend-expect";
import * as Demos from "./carousel.demo";

// embla-carousel drives itself off browser APIs jsdom does not implement: `window.matchMedia`
// (read unconditionally while resolving its, possibly empty, `breakpoints` option — and
// `Array.prototype.map` throws if the callback isn't callable even on an empty array),
// `IntersectionObserver` (slides-in-view tracking) and `ResizeObserver` (auto re-init on resize).
// Polyfill all three for this file only.
beforeAll(() => {
    if (typeof window.matchMedia !== "function") {
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

    if (typeof window.IntersectionObserver !== "function") {
        class IntersectionObserverStub implements IntersectionObserver {
            readonly root = null;
            readonly rootMargin = "";
            readonly thresholds: ReadonlyArray<number> = [];
            observe() {}
            unobserve() {}
            disconnect() {}
            takeRecords(): IntersectionObserverEntry[] {
                return [];
            }
        }
        window.IntersectionObserver = IntersectionObserverStub;
    }

    if (typeof window.ResizeObserver !== "function") {
        class ResizeObserverStub implements ResizeObserver {
            observe() {}
            unobserve() {}
            disconnect() {}
        }
        window.ResizeObserver = ResizeObserverStub;
    }
});

describe("Carousel", () => {
    for (const [name, Demo] of Object.entries(Demos)) {
        it(`${name} has no a11y violations`, async () => {
            const { container } = render(<Demo />);
            expect(await axe(container)).toHaveNoViolations();
        });
    }

    it("renders every slide as a labelled group within a carousel region", () => {
        const { getByRole, getAllByRole } = render(<Demos.CarouselMd />);

        expect(getByRole("region")).toBeTruthy();
        expect(getAllByRole("group")).toHaveLength(3);
    });

    it("disables the previous trigger on the first slide and labels both triggers", () => {
        const { getByRole } = render(<Demos.CarouselMd />);

        // jsdom performs no layout, so embla measures every slide as zero-width and cannot tell
        // whether the track overflows — `canScrollNext` is therefore not asserted here, only the
        // `canScrollPrev` state (always false on the first slide, regardless of measured width)
        // and that both triggers are present and labelled.
        expect(getByRole("button", { name: "Previous slide" })).toBeDisabled();
        expect(getByRole("button", { name: "Next slide" })).toBeTruthy();
    });

    it("renders a pagination dot per slide", () => {
        const { getByRole } = render(<Demos.CarouselLg />);

        expect(getByRole("navigation", { name: "Pagination Navigation" })).toBeTruthy();
    });
});
