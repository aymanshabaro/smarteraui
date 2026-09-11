import { NotFoundSplitImage03 } from "../../app-examples/404-sections/not-found-split-image-03";
import { FooterLarge02 } from "../../marketing/footers/footer-large-02";
import { HeaderDropdownSimple } from "../../marketing/header-navigations/header-dropdown-simple";

/** A marketing 404 page: header navigation, a search-first error section beside a full-bleed image, and a rated brand footer. */
export const NotFoundPage02 = () => (
    <div className="bg-primary">
        <HeaderDropdownSimple />

        <NotFoundSplitImage03 />

        {/*
         * The page body above only reaches an <h1>, but FooterLarge02's link columns are <h4>s.
         * These visually hidden headings restore the intermediate levels so the document
         * outline doesn't skip from 1 to 4 (axe: heading-order); FooterLarge02 itself is a
         * shared component outside this folder's ownership, so it can't be changed here.
         */}
        <h2 className="sr-only">Footer</h2>
        <h3 className="sr-only">Footer navigation</h3>
        <FooterLarge02 />
    </div>
);
