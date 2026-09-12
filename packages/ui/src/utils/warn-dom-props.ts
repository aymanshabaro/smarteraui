// This file is copied into consumer projects, many of which have no @types/node (a Vite
// scaffold, for one), where a bare `process` fails their build with TS2591. A module-scoped
// declaration satisfies the type checker without touching the global, and the literal
// `process.env.NODE_ENV` token is kept so bundlers can still strip the whole call in production.
declare const process: { env: { NODE_ENV?: string } } | undefined;
/**
 * Tracks which `component:prop` pairs have already warned, so a component re-rendering (or many
 * instances of it on the same page) doesn't spam the console with the same message. Exported only
 * so tests can reset state between cases.
 */
export const warnedProps = new Set<string>();

/**
 * Warns, once per component + prop, when a caller passes a native DOM prop name where this
 * library expects the React Aria equivalent — e.g. `onClick` instead of `onPress`, `disabled`
 * instead of `isDisabled`. These are easy mistakes: the DOM name often still "works" (React
 * forwards unrecognized props to the underlying element in some cases, or the prop is silently
 * ignored because our components destructure a specific prop name), so nothing throws and nothing
 * type-errors when the two happen to share a compatible type — the bug just quietly does the wrong
 * thing at runtime. `tsc` cannot catch this class of bug, so this is a development-only, runtime
 * check.
 *
 * A no-op in production: every call is gated on `process.env.NODE_ENV !== "production"`, and the
 * check itself never touches `props` or logs anything once that gate is closed.
 *
 * @example
 * warnDomProps("Button", props, { onClick: "onPress", disabled: "isDisabled" });
 *
 * @param component Display name of the component doing the check, used in the warning message.
 * @param props The component's incoming props (or any prop-shaped object) to check.
 * @param domToAriaProp Map of native DOM prop name -> the React Aria prop name to suggest instead.
 */
export function warnDomProps(component: string, props: Record<string, unknown>, domToAriaProp: Record<string, string>): void {
    if (typeof process !== "undefined" && process.env.NODE_ENV === "production") return;

    for (const domProp in domToAriaProp) {
        if (!Object.prototype.hasOwnProperty.call(props, domProp) || props[domProp] === undefined) continue;

        const ariaProp = domToAriaProp[domProp];
        const key = `${component}:${domProp}`;

        if (warnedProps.has(key)) continue;
        warnedProps.add(key);

        console.warn(`[@properui/ui] <${component}> received \`${domProp}\`, which this component ignores. Did you mean \`${ariaProp}\`?`);
    }
}
