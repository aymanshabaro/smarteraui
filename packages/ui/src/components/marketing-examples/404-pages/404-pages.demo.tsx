import { NotFoundPage01 } from "./not-found-page-01";

/**
 * The spec names this export `404PageExample`, which is not a legal JS identifier (and
 * `gen-demos` only detects `export const <Name> =`), so the digits move inward. The docs
 * page renders the same variant the reference preview does: `not-found-page-01`.
 */
export const Page404Example = () => (
    <div className="bg-primary w-full">
        <NotFoundPage01 />
    </div>
);
