import { NotFoundSimple01 } from "./not-found-simple-01";

/**
 * The spec names this export `404SectionExample`, which is not a legal JS identifier
 * (and `gen-demos` only picks up `export const <Uppercase>…`), so the digits move inward.
 */
export const Section404Example = () => (
    <div className="bg-primary w-full">
        <NotFoundSimple01 />
    </div>
);
