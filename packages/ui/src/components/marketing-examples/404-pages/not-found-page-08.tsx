import { NotFoundSplitImage02 } from "../../app-examples/404-sections/not-found-split-image-02";
import { FooterLarge08 } from "../../marketing/footers/footer-large-08";
import { HeaderDropdownSimple } from "../../marketing/header-navigations/header-dropdown-simple";

/** A marketing 404 page: header navigation, a split-image error section with two actions, and a single-row newsletter footer. */
export const NotFoundPage08 = () => (
    <div className="bg-primary">
        <HeaderDropdownSimple />

        <NotFoundSplitImage02 />

        <FooterLarge08 />
    </div>
);
