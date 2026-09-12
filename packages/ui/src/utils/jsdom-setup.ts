/**
 * Six browser APIs that React Aria Components' interaction, collection, and overlay hooks
 * call unconditionally, all six missing from jsdom 25. An unguarded component that reaches
 * for one of these throws or silently no-ops the moment a test renders it; see
 * `apps/docs/content/docs/testing.mdx` for the interaction pitfalls this alone doesn't fix.
 *
 * Import this module once, before your component tests run (e.g. from a vitest/jest setup
 * file), as a side effect: `import "@/utils/jsdom-setup"`. Every shim is guarded with
 * `if (!("x" in ...))`, so importing this twice, or running the same test suite in a real
 * browser (Playwright, `happy-dom` with better coverage, etc.), never clobbers a real
 * implementation.
 *
 * Shim -> what in this kit needs it:
 *   window.matchMedia                  -> `useBreakpoint`, and Recharts' `ResponsiveContainer`
 *                                          (every chart demo) read it to branch on viewport size.
 *   window.ResizeObserver              -> Recharts' `ResponsiveContainer` and embla-carousel
 *                                          (`Carousel`) both size themselves off it. The shim
 *                                          reports a plausible non-zero box once on `observe()`,
 *                                          matching this repo's existing `vitest.setup.ts`
 *                                          Recharts fix: Recharts renders nothing at width 0,
 *                                          which would silently empty every chart test.
 *   window.IntersectionObserver        -> `useActiveItem` (slides-in-view tracking behind
 *                                          `Carousel`) and any lazy/visible-on-scroll section.
 *   Element.prototype.scrollIntoView   -> React Aria's collection focus management (`Select`,
 *                                          `ComboBox`, `Dropdown`/Menu, any `ListBox`) scrolls
 *                                          the newly highlighted option into view as arrow keys
 *                                          move the selection.
 *   *PointerCapture (set/has/release)  -> `usePress` and `useMove` (Slider thumb dragging, and
 *                                          the press handling behind every button, `Select`, and
 *                                          `ComboBox` trigger) capture the pointer so a press or
 *                                          drag keeps tracking it even after it leaves the
 *                                          element.
 *   HTMLElement.prototype.inert        -> React Aria's overlay layer (`ariaHideOutside`, used by
 *                                          `Modal`, `Dialog`, and every popover-backed component:
 *                                          `Select`, `ComboBox`, `Dropdown`) sets `.inert = true`
 *                                          on background siblings while the overlay is open.
 */

// `prop in target`, through a function call so TypeScript's "in" narrowing doesn't collapse
// `target`'s type to `never` inside the guard below. TypeScript's DOM lib declares several of
// these members (matchMedia, ResizeObserver, scrollIntoView, the PointerCapture trio) as always
// present on their interface, so narrowing on the literal expression would tell TypeScript the
// "doesn't have it" branch is unreachable, even though jsdom's actual runtime doesn't implement
// them. The indirection here is purely to keep that type-level fact from fighting the runtime
// reality this file exists to patch.
const has = (target: object, prop: string): boolean => prop in target;

// For the callable shims, presence is not enough. Vitest's jsdom environment pre-declares
// `window.matchMedia` as a property whose value is `undefined`, so `"matchMedia" in window` is
// true while calling it throws "matchMedia is not a function", and a presence check would skip
// the shim exactly when it is needed. Checking for a function is what the old vitest.setup.ts
// did, and it is the check that actually works.
const isFn = (target: object, prop: string): boolean => typeof (target as Record<string, unknown>)[prop] === "function";

if (typeof window !== "undefined") {
    // matchMedia: `useBreakpoint` and Recharts' `ResponsiveContainer`.
    if (!isFn(window, "matchMedia")) {
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

    // ResizeObserver: Recharts' `ResponsiveContainer`, embla-carousel (`Carousel`). Reports a
    // plausible box once on `observe()` so components that bail out at a reported width of 0
    // (Recharts) actually render their content in a test.
    if (!isFn(window, "ResizeObserver")) {
        const OBSERVED_BOX = { width: 800, height: 600 };

        class ShimResizeObserver implements ResizeObserver {
            constructor(private readonly callback: ResizeObserverCallback) {}

            observe(target: Element) {
                const contentRect = {
                    ...OBSERVED_BOX,
                    top: 0,
                    left: 0,
                    bottom: OBSERVED_BOX.height,
                    right: OBSERVED_BOX.width,
                    x: 0,
                    y: 0,
                };
                const box = [{ inlineSize: OBSERVED_BOX.width, blockSize: OBSERVED_BOX.height }];
                this.callback(
                    [
                        {
                            target,
                            contentRect,
                            borderBoxSize: box,
                            contentBoxSize: box,
                            devicePixelContentBoxSize: box,
                        } as unknown as ResizeObserverEntry,
                    ],
                    this,
                );
            }
            unobserve() {}
            disconnect() {}
        }

        window.ResizeObserver = ShimResizeObserver as unknown as typeof ResizeObserver;
    }

    // IntersectionObserver: `useActiveItem` (slides-in-view tracking behind `Carousel`).
    if (!isFn(window, "IntersectionObserver")) {
        class ShimIntersectionObserver implements IntersectionObserver {
            readonly root: Element | Document | null = null;
            readonly rootMargin: string = "";
            readonly thresholds: ReadonlyArray<number> = [];
            observe() {}
            unobserve() {}
            disconnect() {}
            takeRecords(): IntersectionObserverEntry[] {
                return [];
            }
        }

        window.IntersectionObserver = ShimIntersectionObserver as unknown as typeof IntersectionObserver;
    }

    // Element.prototype.scrollIntoView: React Aria scrolls the highlighted collection item
    // (Select/ComboBox/Menu option) into view as arrow keys move the selection.
    if (!isFn(window.Element.prototype, "scrollIntoView")) {
        window.Element.prototype.scrollIntoView = function scrollIntoView() {};
    }

    // *PointerCapture: `usePress`/`useMove` capture the pointer for the duration of a press or
    // drag (button/Select/ComboBox press handling, Slider thumb dragging).
    if (!isFn(window.Element.prototype, "setPointerCapture")) {
        window.Element.prototype.setPointerCapture = function setPointerCapture() {};
    }
    if (!isFn(window.Element.prototype, "releasePointerCapture")) {
        window.Element.prototype.releasePointerCapture = function releasePointerCapture() {};
    }
    if (!isFn(window.Element.prototype, "hasPointerCapture")) {
        window.Element.prototype.hasPointerCapture = function hasPointerCapture() {
            return false;
        };
    }

    // HTMLElement.prototype.inert: React Aria's overlay layer (`ariaHideOutside`) inerts
    // background siblings while a Modal, Dialog, or popover (Select, ComboBox, Dropdown) is
    // open. Backed by the `inert` attribute so it round-trips the way a real browser's does.
    if (!has(window.HTMLElement.prototype, "inert")) {
        Object.defineProperty(window.HTMLElement.prototype, "inert", {
            configurable: true,
            get(this: HTMLElement) {
                return this.hasAttribute("inert");
            },
            set(this: HTMLElement, value: boolean) {
                if (value) this.setAttribute("inert", "");
                else this.removeAttribute("inert");
            },
        });
    }
}

export {};
