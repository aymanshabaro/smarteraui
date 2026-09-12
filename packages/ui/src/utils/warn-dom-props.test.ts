import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { warnDomProps, warnedProps } from "./warn-dom-props";

describe("warnDomProps", () => {
    const originalNodeEnv = process.env.NODE_ENV;

    beforeEach(() => {
        warnedProps.clear();
        vi.spyOn(console, "warn").mockImplementation(() => {});
    });

    afterEach(() => {
        vi.restoreAllMocks();
        process.env.NODE_ENV = originalNodeEnv;
    });

    it("warns once in development when a DOM prop is used instead of its React Aria equivalent", () => {
        process.env.NODE_ENV = "development";

        warnDomProps("Button", { onClick: () => {} }, { onClick: "onPress", disabled: "isDisabled" });
        warnDomProps("Button", { onClick: () => {} }, { onClick: "onPress", disabled: "isDisabled" });

        expect(console.warn).toHaveBeenCalledTimes(1);
        expect(console.warn).toHaveBeenCalledWith(expect.stringContaining("onPress"));
    });

    it("warns again for a different prop on the same component", () => {
        process.env.NODE_ENV = "development";

        warnDomProps("Button", { onClick: () => {} }, { onClick: "onPress", disabled: "isDisabled" });
        warnDomProps("Button", { disabled: true }, { onClick: "onPress", disabled: "isDisabled" });

        expect(console.warn).toHaveBeenCalledTimes(2);
    });

    it("never warns in production", () => {
        process.env.NODE_ENV = "production";

        warnDomProps("Button", { onClick: () => {}, disabled: true }, { onClick: "onPress", disabled: "isDisabled" });

        expect(console.warn).not.toHaveBeenCalled();
    });

    it("does not warn when the offending prop is absent", () => {
        process.env.NODE_ENV = "development";

        warnDomProps("Checkbox", { isSelected: true }, { checked: "isSelected" });

        expect(console.warn).not.toHaveBeenCalled();
    });
});
