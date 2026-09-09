"use client";

import { useEffect, useState } from "react";

const screens = {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    "2xl": "1536px",
};

/**
 * Checks whether a particular Tailwind CSS viewport size applies.
 *
 * @param size The size to check, which must either be included in Tailwind CSS's
 * list of default screen sizes, or added to the Tailwind CSS config file.
 *
 * @returns A boolean indicating whether the viewport size applies.
 */
export const useBreakpoint = (size: "sm" | "md" | "lg" | "xl" | "2xl") => {
    const [matches, setMatches] = useState(typeof window !== "undefined" ? window.matchMedia(`(min-width: ${screens[size]})`).matches : true);

    useEffect(() => {
        const breakpoint = window.matchMedia(`(min-width: ${screens[size]})`);

        // Re-sync after hydration: the initial useState value is a server-safe guess,
        // this corrects it to the real viewport before subscribing to further changes.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMatches(breakpoint.matches);

        const handleChange = (value: MediaQueryListEvent) => setMatches(value.matches);

        breakpoint.addEventListener("change", handleChange);
        return () => breakpoint.removeEventListener("change", handleChange);
    }, [size]);

    return matches;
};
