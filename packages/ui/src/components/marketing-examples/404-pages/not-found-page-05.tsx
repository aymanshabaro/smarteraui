import { NotFoundSimple06 } from "../../app-examples/404-sections/not-found-simple-06";
import { FooterLarge05 } from "../../marketing/footers/footer-large-05";
import { HeaderDropdownSimple } from "../../marketing/header-navigations/header-dropdown-simple";

/** A marketing 404 page: header navigation, a centered error section with a divided help list, and a newsletter footer. */
export const NotFoundPage05 = () => (
    <div className="bg-primary">
        <HeaderDropdownSimple />

        <NotFoundSimple06 />

        {/*
         * The page body above only reaches an <h1>, but FooterLarge05's link columns are <h4>s.
         * These visually hidden headings restore the intermediate levels so the document
         * outline doesn't skip from 1 to 4 (axe: heading-order); FooterLarge05 itself is a
         * shared component outside this folder's ownership, so it can't be changed here.
         */}
        <h2 className="sr-only">Footer</h2>
        <h3 className="sr-only">Footer navigation</h3>
        <FooterLarge05 />
    </div>
);
