import { NotFoundSplitImage01 } from "../../app-examples/404-sections/not-found-split-image-01";
import { FooterLarge01 } from "../../marketing/footers/footer-large-01";
import { HeaderDropdownSimple } from "../../marketing/header-navigations/header-dropdown-simple";

/** A marketing 404 page: header navigation, a split-image error section with site search, and a six-column footer. */
export const NotFoundPage01 = () => (
    <div className="bg-primary">
        <HeaderDropdownSimple />

        <NotFoundSplitImage01 />

        {/*
         * The page body above only reaches an <h1>, but FooterLarge01's link columns are <h4>s.
         * These visually hidden headings restore the intermediate levels so the document
         * outline doesn't skip from 1 to 4 (axe: heading-order); FooterLarge01 itself is a
         * shared component outside this folder's ownership, so it can't be changed here.
         */}
        <h2 className="sr-only">Footer</h2>
        <h3 className="sr-only">Footer navigation</h3>
        <FooterLarge01 />
    </div>
);
