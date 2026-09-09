/**
 * Re-export of the library's `cx` / `sortCx`.
 *
 * `@smarteraui/ui`'s export map points `./utils/*` at `./src/utils/*` without a file
 * extension, so `@smarteraui/ui/utils/cx` does not resolve. Until that entry is fixed
 * the docs app reaches the source directly — `packages/ui` is in `transpilePackages`,
 * so the file is compiled either way.
 */
export { cx, sortCx } from "../../../packages/ui/src/utils/cx";
